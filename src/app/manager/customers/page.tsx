"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, Search } from "lucide-react";

// Assuming mock data will eventually come from a centralized mock-data.ts
// For now, extending the existing mockCustomers to meet requirements.
const mockCustomers = [
  {
    id: "USR001",
    name: "Ana Silva",
    email: "ana.silva@email.com",
    location: "Luanda",
    segment: "Frequente",
    totalSpent: 150000, // AOA
    lastVisit: "07/06/2025",
  },
  {
    id: "USR002",
    name: "Bruno Costa",
    email: "bruno.costa@email.com",
    location: "Viana",
    segment: "Ocasional",
    totalSpent: 50000,
    lastVisit: "20/05/2025",
  },
  {
    id: "USR003",
    name: "Carla Dias",
    email: "carla.dias@email.com",
    location: "Cacuaco",
    segment: "Novo",
    totalSpent: 20000,
    lastVisit: "05/06/2025",
  },
  {
    id: "USR004",
    name: "David Santos",
    email: "david.santos@email.com",
    location: "Luanda",
    segment: "Frequente",
    totalSpent: 250000,
    lastVisit: "08/06/2025",
  },
  {
    id: "USR005",
    name: "Elsa Ferreira",
    email: "elsa.ferreira@email.com",
    location: "Benfica",
    segment: "Inativo",
    totalSpent: 10000,
    lastVisit: "15/03/2025",
  },
  {
    id: "USR006",
    name: "Fernando Alves",
    email: "fernando.alves@email.com",
    location: "Talatona",
    segment: "VIP",
    totalSpent: 500000,
    lastVisit: "01/06/2025",
  },
  {
    id: "USR007",
    name: "Sofia Mendes",
    email: "sofia.mendes@email.com",
    location: "Kikolo",
    segment: "Frequente",
    totalSpent: 180000,
    lastVisit: "02/06/2025",
  },
];

type Customer = (typeof mockCustomers)[0];
type SortKey = keyof Customer;

const getSegmentColor = (segment: string) => {
  switch (segment) {
    case "VIP":
      return "bg-purple-100 text-purple-800";
    case "Frequente":
      return "bg-blue-100 text-blue-800";
    case "Ocasional":
      return "bg-gray-100 text-gray-800";
    case "Novo":
      return "bg-green-100 text-green-800";
    case "Inativo":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("pt-AO", {
    style: "currency",
    currency: "AOA",
  }).format(amount);
};

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: "ascending" | "descending";
  } | null>({ key: "name", direction: "ascending" });

  const sortedCustomers = useMemo(() => {
    const sortableItems = [...mockCustomers];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        // Handle number sorting for totalSpent
        if (sortConfig.key === "totalSpent") {
          const valA = a[sortConfig.key] as number;
          const valB = b[sortConfig.key] as number;
          if (valA < valB) {
            return sortConfig.direction === "ascending" ? -1 : 1;
          }
          if (valA > valB) {
            return sortConfig.direction === "ascending" ? 1 : -1;
          }
        }
        // Handle date sorting for lastVisit (assuming DD/MM/YYYY format)
        if (sortConfig.key === "lastVisit") {
          const parseDate = (dateString: string) => {
            const [day, month, year] = dateString.split("/").map(Number);
            return new Date(year, month - 1, day).getTime();
          };
          const valA = parseDate(a[sortConfig.key] as string);
          const valB = parseDate(b[sortConfig.key] as string);
          if (valA < valB) {
            return sortConfig.direction === "ascending" ? -1 : 1;
          }
          if (valA > valB) {
            return sortConfig.direction === "ascending" ? 1 : -1;
          }
        }

        // Default string comparison for other keys
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems.filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.segment.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sortConfig, searchTerm]);

  const requestSort = (key: SortKey) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Base de Dados de Clientes</CardTitle>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Procurar clientes..."
              className="pl-8 sm:w-[300px]"
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchTerm(e.target.value)
              }
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead onClick={() => requestSort("name")}>
                <Button variant="ghost">
                  Nome <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead onClick={() => requestSort("email")}>
                <Button variant="ghost">
                  Email <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead onClick={() => requestSort("location")}>
                <Button variant="ghost">
                  Localização <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead onClick={() => requestSort("segment")}>
                <Button variant="ghost">
                  Segmento <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead onClick={() => requestSort("totalSpent")}>
                <Button variant="ghost">
                  Total Gasto <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead onClick={() => requestSort("lastVisit")}>
                <Button variant="ghost">
                  Última Visita <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.location}</TableCell>
                <TableCell>
                  <Badge className={getSegmentColor(customer.segment)}>
                    {customer.segment}
                  </Badge>
                </TableCell>
                <TableCell>{formatCurrency(customer.totalSpent)}</TableCell>
                <TableCell>{customer.lastVisit}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
