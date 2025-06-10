"use client";

import React, { useState } from "react";
import { Eye, Share2, Bell, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { MockUserData } from "../data/mock-data";

type PrivacySettingsProps = {
  data: MockUserData["privacySettings"];
};

// A simple toggle switch component
const ToggleSwitch = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) => (
  <label className="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="sr-only peer"
    />
    <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
  </label>
);

const PrivacySettings: React.FC<PrivacySettingsProps> = ({ data }) => {
  const [settings, setSettings] = useState(data);

  const handleToggle = (
    key:
      | keyof MockUserData["privacySettings"]
      | `notificationPreferences.${keyof MockUserData["privacySettings"]["notificationPreferences"]}`
  ) => {
    setSettings((prev) => {
      const keys = key.split(".");
      if (keys.length > 1) {
        const [mainKey, subKey] = keys as [
          "notificationPreferences",
          keyof MockUserData["privacySettings"]["notificationPreferences"]
        ];
        return {
          ...prev,
          [mainKey]: {
            ...prev[mainKey],
            [subKey]: !prev[mainKey][subKey],
          },
        };
      }
      const simpleKey = key as keyof MockUserData["privacySettings"];
      return { ...prev, [simpleKey]: !prev[simpleKey] };
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6"
    >
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Privacidade e Segurança
      </h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50">
          <div className="flex items-center gap-3">
            <Eye className="text-blue-500" />
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Visibilidade do Perfil
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Quem pode ver o seu perfil.
              </p>
            </div>
          </div>
          <select
            value={settings.profileVisibility}
            onChange={(e) =>
              setSettings((s) => ({ ...s, profileVisibility: e.target.value }))
            }
            className="bg-gray-200 dark:bg-gray-700 border-none rounded-md p-1"
          >
            <option value="public">Público</option>
            <option value="friends">Amigos</option>
            <option value="private">Privado</option>
          </select>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50">
          <div className="flex items-center gap-3">
            <Share2 className="text-green-500" />
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Partilha de Dados
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Permitir personalização de ofertas.
              </p>
            </div>
          </div>
          <ToggleSwitch
            checked={settings.dataSharing}
            onChange={() => handleToggle("dataSharing")}
          />
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50">
          <div className="flex items-center gap-3">
            <Lock className="text-red-500" />
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Autenticação de 2 Fatores
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Aumente a segurança da sua conta.
              </p>
            </div>
          </div>
          <ToggleSwitch
            checked={settings.twoFactorAuth}
            onChange={() => handleToggle("twoFactorAuth")}
          />
        </div>

        <div>
          <div className="flex items-center gap-3 p-3">
            <Bell className="text-purple-500" />
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Notificações
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Escolha o que notificamos.
              </p>
            </div>
          </div>
          <div className="pl-10 space-y-2 mt-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">
                Promoções e Ofertas
              </span>
              <ToggleSwitch
                checked={settings.notificationPreferences.promotions}
                onChange={() =>
                  handleToggle("notificationPreferences.promotions")
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">
                Atualizações da App
              </span>
              <ToggleSwitch
                checked={settings.notificationPreferences.updates}
                onChange={() => handleToggle("notificationPreferences.updates")}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">
                Atividade da Comunidade
              </span>
              <ToggleSwitch
                checked={settings.notificationPreferences.community}
                onChange={() =>
                  handleToggle("notificationPreferences.community")
                }
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PrivacySettings;
