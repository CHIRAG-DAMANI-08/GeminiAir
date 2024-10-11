// components/TravelTipsModal.tsx
"use client";

import { useState } from 'react';
import { Modal } from "@/components/ui/animated-modal"; // Ensure this component is correctly implemented
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from 'framer-motion';

const travelTips = [
  "Check in online to save time at the airport.",
  "Arrive at the airport at least 2 hours before your flight.",
  "Pack light to avoid extra baggage fees.",
  "Keep your travel documents handy.",
  "Stay updated on flight status via the Akasa Air app.",
  "Bring snacks and entertainment for the flight.",
  "Wear comfortable clothing for a pleasant journey.",
  "Use a travel pillow for better comfort.",
  "Stay hydrated during your flight.",
  "Follow safety instructions provided by the crew."
];

interface TravelTipsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TravelTipsModal({ isOpen, onClose }: TravelTipsModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTip = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % travelTips.length);
  };

  const prevTip = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + travelTips.length) % travelTips.length);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} aria-labelledby="travel-tips-modal" aria-describedby="modal-description">
      <Card className="bg-gray-800">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Travel Tips for Akasa Air</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center p-4"
          >
            {travelTips[currentIndex]}
          </motion.div>
          <div className="flex justify-between w-full mt-4">
            <Button onClick={prevTip} className="bg-blue-600 hover:bg-blue-500">
              <span className="sr-only">Previous</span>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
            <Button onClick={nextTip} className="bg-blue-600 hover:bg-blue-500">
              <span className="sr-only">Next</span>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        </CardContent>
      </Card>
    </Modal>
  );
}