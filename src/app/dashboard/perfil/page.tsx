"use client";

import React from "react";
import { mockUserData } from "./data/mock-data";
import ProfileHeader from "./components/ProfileHeader";
import PersonalInfo from "./components/PersonalInfo";
import LoyaltySystem from "./components/LoyaltySystem";
import PrivacySettings from "./components/PrivacySettings";
import Achievements from "./components/Achievements";
import PersonalStats from "./components/PersonalStats";
import AIPersonalization from "./components/AIPersonalization";
import TransactionHistory from "./components/TransactionHistory";
import { motion } from "framer-motion";

const PerfilPage = () => {
  const user = mockUserData;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ProfileHeader
          personalInfo={user.personalInfo}
          loyalty={user.loyalty}
        />

        {/* Main Content Grid */}
        <main className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <PersonalStats data={user.personalStats} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <TransactionHistory />
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <AIPersonalization data={user.aiPersonalization} />
            <PersonalInfo data={user.personalInfo} />
            <LoyaltySystem />
            <Achievements />
            <PrivacySettings data={user.privacySettings} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default PerfilPage;
