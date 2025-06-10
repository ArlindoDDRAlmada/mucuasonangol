"use client";

import { useEffect, useRef, useMemo } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Station } from "../data";

// Fix for default icon issue with Webpack
// @ts-expect-error TS-FIX: This is a common Leaflet workaround for issues with Webpack and default icon URLs.
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Memoize icons to prevent recreation on every render
const statusIcons = {
  Disponível: new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png`,
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  }),
  "Stock baixo": new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png`,
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  }),
  Indisponível: new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png`,
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  }),
};

const getStatusIcon = (status: Station["status"]) => {
  return statusIcons[status];
};

interface MapViewProps {
  stations: Station[];
  selectedStation: Station | null;
  onSelectStation: (station: Station | null) => void;
  userLocation: [number, number] | null;
  onLocateUser: () => void;
}

const MapView = ({
  stations,
  selectedStation,
  onSelectStation,
  userLocation,
  onLocateUser,
}: MapViewProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  const luandaPosition: [number, number] = [-8.8368, 13.2343];
  const position = selectedStation?.coords || userLocation || luandaPosition;
  const zoom = selectedStation || userLocation ? 14 : 12;

  const userIcon = useMemo(
    () =>
      new L.Icon({
        iconUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      }),
    []
  );

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) return;

    // Clean up existing map
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Wait for container to be ready
    const initMap = () => {
      if (!mapRef.current) return;

      try {
        // Clear any existing Leaflet instance on the container
        const container = mapRef.current;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((container as any)._leaflet_id) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          delete (container as any)._leaflet_id;
        }

        // Create map
        const map = L.map(container, {
          center: position,
          zoom: zoom,
          zoomControl: true,
          attributionControl: true,
        });

        // Add OpenStreetMap tiles
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map);

        // Add locate control
        const LocateControl = L.Control.extend({
          onAdd: function () {
            const div = L.DomUtil.create("div", "leaflet-control leaflet-bar");
            div.style.backgroundColor = "white";
            div.style.padding = "4px";
            div.innerHTML = `
              <a href="#" title="A minha localização" style="display: flex; align-items: center; justify-content: center; width: 30px; height: 30px; text-decoration: none; color: #374151;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="3,11 22,2 13,21 11,13 3,11"></polygon>
                </svg>
              </a>
            `;

            div.onclick = (e) => {
              e.preventDefault();
              onLocateUser();
            };

            return div;
          },
        });

        new LocateControl({ position: "topright" }).addTo(map);

        mapInstanceRef.current = map;

        // Force map to invalidate size after initialization
        setTimeout(() => {
          if (mapInstanceRef.current) {
            mapInstanceRef.current.invalidateSize();
          }
        }, 100);
      } catch (error) {
        console.error("Error initializing map:", error);
      }
    };

    // Initialize with a small delay
    setTimeout(initMap, 100);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [onLocateUser, position, zoom]);

  // Update map view when position or zoom changes
  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(position, zoom);
    }
  }, [position, zoom]);

  // Update markers when stations change
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => {
      mapInstanceRef.current?.removeLayer(marker);
    });
    markersRef.current = [];

    // Add user location marker
    if (userLocation) {
      const userMarker = L.marker(userLocation, { icon: userIcon })
        .addTo(mapInstanceRef.current)
        .bindPopup("A sua localização");
      markersRef.current.push(userMarker);
    }

    // Add station markers
    stations.forEach((station) => {
      const marker = L.marker(station.coords, {
        icon: getStatusIcon(station.status),
      })
        .addTo(mapInstanceRef.current!)
        .bindPopup(
          `<div style="font-family: sans-serif;">
            <h3 style="font-weight: bold; font-size: 1rem; margin: 0 0 4px 0;">${station.name}</h3>
            <p style="margin: 0 0 4px 0;">${station.address}</p>
            <p style="font-weight: 600; margin: 0;">${station.status}</p>
          </div>`
        )
        .on("click", () => {
          onSelectStation(station);
        });

      markersRef.current.push(marker);
    });
  }, [stations, userLocation, userIcon, onSelectStation]);

  return (
    <div
      ref={mapRef}
      className="h-full w-full z-0"
      style={{
        minHeight: "400px",
        height: "100%",
        width: "100%",
      }}
    />
  );
};

export default MapView;
