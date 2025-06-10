"use client";

import React, { useState, useEffect } from "react";
import {
  Fuel,
  ShoppingCart,
  Car,
  Wind,
  DollarSign,
  MapPin,
  SlidersHorizontal,
  Droplet,
} from "lucide-react";

export interface FiltersState {
  fuelType: string[];
  services: string[];
  distance: number;
  priceRange: { min: number; max: number };
}

interface FiltersProps {
  onFilterChange: (filters: FiltersState) => void;
}

const Filters = ({ onFilterChange }: FiltersProps) => {
  const [filters, setFilters] = useState<FiltersState>({
    fuelType: [],
    services: [],
    distance: 20,
    priceRange: { min: 150, max: 350 },
  });

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleFuelTypeChange = (fuel: string) => {
    setFilters((prev) => ({
      ...prev,
      fuelType: prev.fuelType.includes(fuel)
        ? prev.fuelType.filter((f) => f !== fuel)
        : [...prev.fuelType, fuel],
    }));
  };

  const handleServiceChange = (service: string) => {
    setFilters((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const fuelOptions = [
    { id: "gasoleo", name: "Gasóleo", icon: <Droplet size={16} /> },
    { id: "gasolina", name: "Gasolina", icon: <Fuel size={16} /> },
    { id: "gasDomestico", name: "Gás", icon: <Wind size={16} /> },
  ];

  const serviceOptions = [
    { id: "conveniencia", name: "Loja", icon: <ShoppingCart size={16} /> },
    { id: "lavagem", name: "Lavagem", icon: <Car size={16} /> },
    { id: "mecanica", name: "Mecânica", icon: <SlidersHorizontal size={16} /> },
    { id: "atm", name: "ATM", icon: <DollarSign size={16} /> },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
        <SlidersHorizontal size={20} /> Filtros Inteligentes
      </h3>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold text-gray-600">
            Combustível
          </label>
          <div className="flex flex-wrap gap-2 mt-2">
            {fuelOptions.map((fuel) => (
              <button
                key={fuel.id}
                onClick={() => handleFuelTypeChange(fuel.id)}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs rounded-full transition-colors ${
                  filters.fuelType.includes(fuel.id)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {fuel.icon} {fuel.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-600">
            Serviços
          </label>
          <div className="flex flex-wrap gap-2 mt-2">
            {serviceOptions.map((service) => (
              <button
                key={service.id}
                onClick={() => handleServiceChange(service.id)}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs rounded-full transition-colors ${
                  filters.services.includes(service.id)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {service.icon} {service.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="distance"
            className="text-sm font-semibold text-gray-600 flex justify-between"
          >
            <span>
              <MapPin size={14} className="inline mr-1" /> Distância
            </span>
            <span className="font-bold text-blue-600">
              {filters.distance} km
            </span>
          </label>
          <input
            id="distance"
            type="range"
            min="1"
            max="50"
            value={filters.distance}
            onChange={(e) =>
              setFilters((f) => ({ ...f, distance: Number(e.target.value) }))
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;
