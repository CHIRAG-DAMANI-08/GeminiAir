"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GiDiamondTrophy, GiMedal } from 'react-icons/gi';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const ReactConfetti = dynamic(() => import('react-confetti'), { ssr: false });

// Define the Tier type
interface Tier {
  name: string;
  icon: React.ElementType;
  color: string;
  benefits: string[];
}

const tiers: Tier[] = [
  {
    name: "Silver",
    icon: GiMedal,
    color: "from-gray-400 to-gray-300",
    benefits: [
      "Earn 1 point for every $1 spent",
      "Priority boarding on all flights",
      "Exclusive discounts on select flights",
      "Free checked baggage (up to 1 bag)"
    ]
  },
  {
    name: "Gold",
    icon: GiMedal,
    color: "from-yellow-400 to-yellow-300",
    benefits: [
      "Earn 1.5 points for every $1 spent",
      "All Silver Tier benefits",
      "Access to lounge facilities at airports",
      "Free checked baggage (up to 2 bags)"
    ]
  },
  {
    name: "Platinum",
    icon: GiMedal,
    color: "from-gray-600 to-gray-500",
    benefits: [
      "Earn 2 points for every $1 spent",
      "All Gold Tier benefits",
      "Free upgrades to business class (subject to availability)",
      "Priority check-in and boarding"
    ]
  },
  {
    name: "Diamond",
    icon: GiDiamondTrophy,
    color: "from-blue-400 to-blue-300",
    benefits: [
      "Earn 3 points for every $1 spent",
      "All Platinum Tier benefits",
      "Personalized travel assistance",
      "Exclusive invites to VIP events and promotions"
    ]
  }
];

const HoverCard: React.FC<{ tier: Tier; onJoin: () => void; isJoined: boolean }> = ({ tier, onJoin, isJoined }) => {
  return (
    
    <div className="relative h-full group">
        
         <Link href="/" className="absolute top-4 left-4 flex items-center bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md transition-all duration-300">
                <span className="mr-2">Back to Dashboard</span>
        </Link>
      <motion.div
        className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.2 }
        }}
      />
      <motion.div
        className={`relative z-10 h-full bg-gradient-to-br ${tier.color} rounded-xl p-6 overflow-hidden`}
        initial={false}
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.2 }
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black to-gray-900 opacity-70 group-hover:opacity-50 transition-opacity duration-300" />
        <tier.icon className="relative z-10 w-12 h-12 mb-4 text-white" />
        <h3 className="relative z-10 text-2xl font-bold text-white mb-4">{tier.name} Tier</h3>
        <ul className="relative z-10 space-y-2 mb-6">
          {tier.benefits.map((benefit, index) => (
            <li key={index} className="text-sm text-gray-300">{benefit}</li>
          ))}
        </ul>
        <button
          onClick={onJoin}
          disabled={isJoined}
          className={`relative z-10 w-full ${
            isJoined
              ? 'bg-green-500 text-white cursor-default'
              : 'bg-white text-black hover:bg-gray-200'
          } transition-colors py-2 rounded`}
        >
          {isJoined ? 'Joined' : 'Join Now'}
        </button>
      </motion.div>
    </div>
  );
};

export default function LoyaltyProgram() {
  const [joinedTiers, setJoinedTiers] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleJoin = (tierName: string) => {
    if (!joinedTiers.includes(tierName)) {
      setJoinedTiers([...joinedTiers, tierName]);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000); // Stop confetti after 5 seconds
    }
  };

  const allTiersJoined = joinedTiers.length === tiers.length;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8">
      {showConfetti && <ReactConfetti />}
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
      >
        Akasa Air Loyalty Program
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center mb-12 max-w-2xl text-lg text-gray-300"
      >
        Elevate your travel experience with our exclusive loyalty tiers. 
        Unlock a world of benefits, from priority boarding to VIP events. 
        Your journey, your rewards – let's soar together!
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl">
        {tiers.map((tier, index) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <HoverCard
              tier={tier}
              onJoin={() => handleJoin(tier.name)}
              isJoined={joinedTiers.includes(tier.name)}
            />
          </motion.div>
        ))}
      </div>

      {!allTiersJoined && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Start Earning?</h2>
          <p className="mb-6 text-gray-300">Join our loyalty program today and start your journey to exclusive rewards!</p>
          <button
            onClick={() => handleJoin(tiers[0].name)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
          >
            Sign Up Now
          </button>
        </motion.div>
      )}
    </div>
  );
}