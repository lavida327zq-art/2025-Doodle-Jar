import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StarData } from '../types';

interface NoteOverlayProps {
  selectedStar: StarData | null;
  currentQuestion: string | null;
  onClose: () => void;
  onPin: (answer: string) => void;
}

export const NoteOverlay: React.FC<NoteOverlayProps> = ({ selectedStar, currentQuestion, onClose, onPin }) => {
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    if (selectedStar) {
      setAnswer("");
    }
  }, [selectedStar]);

  const handlePinClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!answer.trim()) return;
    onPin(answer);
  };

  return (
    <AnimatePresence>
      {selectedStar && currentQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/20 backdrop-blur-sm" 
          />
          
          <motion.div
            layoutId={`star-${selectedStar.id}`}
            className="relative z-10 w-full max-w-sm aspect-square bg-yellow-100 shadow-xl flex flex-col p-8"
            style={{ 
              borderRadius: '2px 2px 25px 2px',
              filter: 'url(#squiggle)',
              transformOrigin: 'center'
            }}
          >
             {/* Pin / Tape graphic */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/50 transform -rotate-2" style={{ filter: 'url(#squiggle)' }}></div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex-1 flex flex-col items-center justify-center text-center space-y-6"
            >
              <div className="relative w-full">
                <h2 className="text-2xl text-gray-800 font-bold leading-relaxed min-h-[4rem]">
                   {currentQuestion}
                </h2>
              </div>

              <div className="w-full space-y-2">
                <input 
                  type="text" 
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Write your thought..."
                  className="w-full bg-transparent border-b-2 border-gray-400 focus:border-blue-500 outline-none text-xl text-center pb-1 font-hand placeholder:text-gray-400/70"
                  autoFocus
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 text-center"
            >
               <button 
                onClick={handlePinClick}
                disabled={!answer.trim()}
                className={`text-lg font-bold px-6 py-2 border-2 border-gray-700 rounded-full transition-all transform hover:scale-105 active:scale-95 ${
                  answer.trim() 
                    ? 'bg-white text-gray-800 shadow-md hover:bg-green-50' 
                    : 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed'
                }`}
                style={{ filter: 'url(#squiggle)' }}
               >
                 Pin It
               </button>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};