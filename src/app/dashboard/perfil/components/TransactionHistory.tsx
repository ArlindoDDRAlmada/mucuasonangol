"use client";

import React from "react";
import { List } from "lucide-react";
import { motion } from "framer-motion";
import { mockUserData } from "../data/mock-data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TransactionHistory: React.FC = () => {
  const transactionHistory = mockUserData.transactionHistory;

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Concluído":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Pendente":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Falhou":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("pt-AO", options);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6"
    >
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <List />
        Histórico de Transações
      </h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactionHistory.map((txn, index) => (
              <motion.tr
                key={txn.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.05 }}
              >
                <TableCell className="font-medium">
                  {formatDate(txn.date)}
                </TableCell>
                <TableCell>
                  {txn.station} - {txn.fuelType}
                </TableCell>
                <TableCell>{txn.amount.toLocaleString()} Kz</TableCell>
                <TableCell>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusBadgeClass(
                      txn.status
                    )}`}
                  >
                    {txn.status}
                  </span>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
};

export default TransactionHistory;
