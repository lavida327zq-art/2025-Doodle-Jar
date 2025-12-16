import React from 'react';
import { motion } from 'framer-motion';
import { PinnedNoteData } from '../types';
import { Stamp } from './Stamps';

interface PinnedNoteProps {
  data: PinnedNoteData;
}

export const PinnedNote: React.FC<PinnedNoteProps> = ({ data }) => {
  return (
    <motion.div
      layoutId={`star-${data.id}`}
      className={`relative w-64 h-64 ${data.color} shadow-sm p-6 flex flex-col items-center justify-center text-center overflow-hidden shrink-0`}
      style={{
        borderRadius: '2px 2px 15px 2px',
        filter: 'url(#squiggle)',
        rotate: `${data.rotation}deg`, // Apply rotation via style string
        marginBottom: '20px'
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      {/* Tape/Pin visual */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/40 transform -rotate-1 shadow-sm" />

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center gap-3 w-full">
        <p className="text-sm text-gray-500 font-hand leading-tight line-clamp-3 italic">
          "{data.question}"
        </p>
        <div className="w-full h-px bg-gray-400/20 my-1" />
        <p className="text-xl text-gray-800 font-hand font-bold leading-tight break-words">
          {data.answer}
        </p>
      </div>

      {/* The Stamp Animation */}
      <motion.div
        initial={{ scale: 2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 15, 
          mass: 1,
          delay: 0.6 
        }}
        className="absolute bottom-3 right-3 text-red-500/70 pointer-events-none transform rotate-12"
      >
        <div className="relative">
          <Stamp type={data.stamp} className="w-12 h-12" />
          {/* Outer Ring for Stamp effect */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-current opacity-50 scale-125" />
        </div>
      </motion.div>
    </motion.div>
  );
};