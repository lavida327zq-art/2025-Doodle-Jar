import React, { useState, useMemo, useEffect } from 'react';
import { Jar } from './components/Jar';
import { NoteOverlay } from './components/NoteOverlay';
import { PinnedNote } from './components/PinnedNote';
import { SvgFilters } from './components/SvgFilters';
import { StarData, PinnedNoteData, StampType, NoteColor } from './types';
import { INITIAL_QUESTIONS } from './data/questions';

// Helper to generate visual stars based on count
// We limit the number of visible SVG stars to 20 to prevent clutter, 
// even if logic has 40 items.
const generateVisualStars = (count: number): StarData[] => {
  const visibleCount = Math.min(count, 20); 
  const colors = ['#fde047', '#bef264', '#fcd34d', '#86efac', '#93c5fd'];
  
  return Array.from({ length: visibleCount }).map((_, i) => ({
    id: `star-visual-${i}`,
    x: Math.random() * 140 + 20, 
    y: Math.random() * 120 + 60,
    scale: 0.6 + Math.random() * 0.4,
    rotation: Math.random() * 360,
    delay: Math.random() * 2,
    color: colors[Math.floor(Math.random() * colors.length)]
  }));
};

const getRandomStamp = (): StampType => {
  const stamps: StampType[] = ['rabbit', 'cat', 'bear', 'star', 'heart'];
  return stamps[Math.floor(Math.random() * stamps.length)];
};

const getRandomColor = (): NoteColor => {
  const colors: NoteColor[] = ['bg-yellow-100', 'bg-blue-100', 'bg-rose-100', 'bg-green-100', 'bg-orange-100'];
  return colors[Math.floor(Math.random() * colors.length)];
};

function App() {
  const [questions, setQuestions] = useState<string[]>(INITIAL_QUESTIONS);
  const [pinnedNotes, setPinnedNotes] = useState<PinnedNoteData[]>([]);
  
  // State for the currently opening note
  const [activeStar, setActiveStar] = useState<StarData | null>(null);
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);

  // Computed visual stars
  const visualStars = useMemo(() => generateVisualStars(questions.length), [questions.length]);

  const handleJarClick = () => {
    if (questions.length === 0 || activeStar) return;

    // 1. Get the next question
    const nextQuestion = questions[0];
    
    // 2. Create a temporary "active star" object for the animation origin
    // We make it start roughly from the center of the jar
    const tempStar: StarData = {
      id: `active-${Date.now()}`,
      x: 100, // Center of jar viewBox
      y: 130, 
      scale: 1,
      rotation: 0,
      delay: 0,
      color: '#fde047'
    };

    setActiveQuestion(nextQuestion);
    setActiveStar(tempStar);
  };

  const handlePin = (answer: string) => {
    if (!activeStar || !activeQuestion) return;

    const newNote: PinnedNoteData = {
      id: `note-${Date.now()}`,
      question: activeQuestion,
      answer,
      rotation: (Math.random() * 6) - 3, // -3 to +3 degrees
      color: getRandomColor(),
      stamp: getRandomStamp()
    };

    // 1. Add to wall
    setPinnedNotes(prev => [newNote, ...prev]);
    
    // 2. Permanently remove the question from the inventory
    setQuestions(prev => prev.slice(1));
    
    // 3. Reset active state
    setActiveStar(null);
    setActiveQuestion(null);
  };

  const handleClose = () => {
    // If they close without pinning, we don't remove the question?
    // User logic implies "Remove one star... pick next available". 
    // To strictly follow "Remove one permanently" upon click, we should technically remove it 
    // BUT usually in UX, if you cancel, you keep it. 
    // Let's assume cancelling keeps the star (simpler UX), pinning consumes it.
    setActiveStar(null);
    setActiveQuestion(null);
  };

  return (
    <div className="min-h-screen w-full bg-grid-paper relative overflow-hidden selection:bg-yellow-200 flex flex-col">
      <SvgFilters />
      
      {/* Header & Jar Section (Fixed Top) */}
      <div className="shrink-0 pt-8 pb-4 flex flex-col items-center justify-center relative z-20 bg-gradient-to-b from-white/80 to-transparent">
         <div className="text-center mb-6">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-700 tracking-wide rotate-[-2deg]" style={{ filter: 'url(#squiggle)' }}>
            2025 年度回顾
          </h1>
          {questions.length === 0 ? (
            <div className="mt-4 text-2xl font-bold text-green-600 animate-bounce">
              🎉 2025 年快乐！ 🎉
            </div>
          ) : (
            <p className="mt-2 text-lg text-gray-500 font-hand">
              有些日子值得被折叠珍藏
            </p>
          )}
        </div>

        <div className="relative">
          <Jar 
            stars={visualStars} 
            onJarClick={handleJarClick} 
            isOpen={!!activeStar} 
            remainingCount={questions.length}
          />
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-4 bg-gray-300/30 rounded-full blur-sm -z-10" />
        </div>
      </div>

      {/* Wall Section (Scrollable, Flex Layout) */}
      <div className="flex-1 overflow-y-auto no-scrollbar relative z-10 w-full">
         <div className="max-w-7xl mx-auto px-4 py-8 pb-32">
            {pinnedNotes.length === 0 && questions.length > 0 && (
              <div className="text-center text-gray-300 text-xl mt-12 font-hand rotate-1">
                回忆墙空空如也，点击星星开始记录吧。
              </div>
            )}
            
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {pinnedNotes.map((note) => (
                <PinnedNote key={note.id} data={note} />
              ))}
            </div>
         </div>
      </div>

      <NoteOverlay 
        selectedStar={activeStar} 
        currentQuestion={activeQuestion}
        onClose={handleClose}
        onPin={handlePin}
      />
    </div>
  );
}

export default App;