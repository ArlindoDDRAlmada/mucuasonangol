"use client";

import React, { useState } from "react";
import { User, Mail, Phone, MapPin, Edit, Save, X } from "lucide-react";
import { motion } from "framer-motion";
import { MockUserData } from "../data/mock-data";

type PersonalInfoProps = {
  data: MockUserData["personalInfo"];
};

const PersonalInfo: React.FC<PersonalInfoProps> = ({ data }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(data);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEdit = () => {
    if (isEditing) {
      // Here you would typically handle the save logic
      console.log("Saving data:", formData);
    }
    setIsEditing(!isEditing);
  };

  const cancelEdit = () => {
    setFormData(data);
    setIsEditing(false);
  };

  const InfoRow = ({
    icon: Icon,
    label,
    value,
    name,
    isEditing,
  }: {
    icon: React.ElementType;
    label: string;
    value: string;
    name: string;
    isEditing: boolean;
  }) => (
    <div className="flex items-center gap-4 py-3 border-b border-gray-200 dark:border-gray-700">
      <Icon className="text-blue-500" size={20} />
      <div className="flex-grow">
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        {isEditing ? (
          <input
            type="text"
            name={name}
            value={value}
            onChange={handleInputChange}
            className="w-full bg-transparent border-b-2 border-blue-500 focus:outline-none text-gray-900 dark:text-white"
          />
        ) : (
          <p className="font-medium text-gray-900 dark:text-white">{value}</p>
        )}
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Informações Pessoais
        </h2>
        <div className="flex gap-2">
          {isEditing && (
            <button
              onClick={cancelEdit}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <X size={20} />
            </button>
          )}
          <button
            onClick={toggleEdit}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors duration-300 shadow ${
              isEditing
                ? "bg-green-500 hover:bg-green-600"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isEditing ? <Save size={18} /> : <Edit size={18} />}
            {isEditing ? "Salvar" : "Editar"}
          </button>
        </div>
      </div>
      <div className="space-y-2">
        <InfoRow
          icon={User}
          label="Nome Completo"
          name="name"
          value={formData.name}
          isEditing={isEditing}
        />
        <InfoRow
          icon={Mail}
          label="Email"
          name="email"
          value={formData.email}
          isEditing={isEditing}
        />
        <InfoRow
          icon={Phone}
          label="Telefone"
          name="phone"
          value={formData.phone}
          isEditing={isEditing}
        />
        <InfoRow
          icon={MapPin}
          label="Localização"
          name="location"
          value={formData.location}
          isEditing={isEditing}
        />
      </div>
    </motion.div>
  );
};

export default PersonalInfo;
