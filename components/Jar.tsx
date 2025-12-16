import React from 'react';
import { motion } from 'framer-motion';
import { StarData } from '../types';

interface JarProps {
  stars: StarData[];
  onJarClick: () => void;
  isOpen: boolean;
  remainingCount: number;
}

export const Jar: React.FC<JarProps> = ({ stars, onJarClick, isOpen, remainingCount }) => {
  return (
    <div 
      onClick={onJarClick}
      className="relative w-56 h-72 mx-auto cursor-pointer group select-none transition-transform active:scale-95"
    >
      <svg 
        viewBox="0 0 200 260" 
        className="w-full h-full drop-shadow-md transition-transform duration-300 group-hover:scale-105"
        style={{ filter: 'url(#squiggle)' }}
      >
        {/* Jar Lid */}
        <path 
          d="M50,20 L50,10 L150,10 L150,20 Q160,20 160,30 L160,40 L40,40 L40,30 Q40,20 50,20 Z" 
          fill="none" 
          stroke="#4b5563" 
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line x1="40" y1="25" x2="160" y2="25" stroke="#4b5563" strokeWidth="2" />
        
        {/* Jar Body */}
        <path 
          d="M45,40 L45,220 Q45,250 75,250 L125,250 Q155,250 155,220 L155,40" 
          fill="rgba(255, 255, 255, 0.4)" 
          stroke="#4b5563" 
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Reflection Lines */}
        <path d="M140,60 Q145,100 140,140" fill="none" stroke="rgba(75, 85, 99, 0.3)" strokeWidth="2" strokeLinecap="round" />
        <path d="M55,220 Q50,230 65,235" fill="none" stroke="rgba(75, 85, 99, 0.3)" strokeWidth="2" strokeLinecap="round" />
      </svg>

      {/* Stars Container */}
      <div className="absolute inset-0 top-10 left-4 right-4 bottom-4 overflow-hidden pointer-events-none">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            layoutId={`star-${star.id}`}
            className="absolute"
            initial={{ 
              x: star.x, 
              y: star.y, 
              opacity: 1, 
              scale: star.scale, 
              rotate: star.rotation 
            }}
            animate={
              !isOpen ? {
                y: [star.y - 5, star.y + 5, star.y - 5],
                rotate: [star.rotation - 5, star.rotation + 5, star.rotation - 5],
              } : {
                 // Subtle fade if currently opening something
              }
            }
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: star.delay
            }}
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill={star.color} 
              stroke="#4b5563" 
              strokeWidth="1.5"
              strokeLinejoin="round"
              style={{ filter: 'url(#squiggle)' }}
            >
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </motion.div>
        ))}
      </div>
      
      {/* Label on Jar */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
         <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-sm border border-gray-400 rotate-[-2deg]" style={{ filter: 'url(#squiggle)' }}>
            <span className="text-2xl font-bold text-gray-700">{remainingCount}</span>
            <span className="block text-xs text-gray-500 uppercase tracking-widest">Left</span>
         </div>
      </div>
    </div>
  );
};