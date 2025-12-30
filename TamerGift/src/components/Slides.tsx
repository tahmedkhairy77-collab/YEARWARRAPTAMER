

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface SlideData {
  id: string | number;
  content: React.ReactNode;
  bgColor: string;
  introTexts?: string[];
}

interface SlidesProps {
  slides: SlideData[];
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.8,
    zIndex: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.8
  })
};

export default function Slides({ slides }: SlidesProps) {
  const [[page, direction], setPage] = useState([0, 0]);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [showIntro, setShowIntro] = useState(true);

  // Ensure index stays within bounds
  const slideIndex = Math.max(0, Math.min(page, slides.length - 1));

  const currentSlide = slides[slideIndex];
  const introTexts = currentSlide?.introTexts || [];

  useEffect(() => {
    setCurrentTextIndex(0);
    setShowIntro(introTexts.length > 0);
  }, [slideIndex, introTexts.length]);

  useEffect(() => {
    if (!showIntro || introTexts.length === 0) return;

    if (currentTextIndex < introTexts.length) {
      const timer = setTimeout(() => {
        setCurrentTextIndex(prev => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      const finalTimer = setTimeout(() => {
        setShowIntro(false);
      }, 2000);
      return () => clearTimeout(finalTimer);
    }
  }, [currentTextIndex, showIntro, introTexts.length]);

  const paginate = (newDirection: number) => {
    const newIndex = page + newDirection;
    if (newIndex >= 0 && newIndex < slides.length) {
      setPage([newIndex, newDirection]);
    }
  };

  const goToSlide = (targetIndex: number) => {
    const safeIndex = Math.max(0, Math.min(targetIndex, slides.length - 1));
    if (safeIndex === page) return;
    const newDirection = safeIndex > page ? 1 : -1;
    setPage([safeIndex, newDirection]);
    setShowIntro(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (showIntro && introTexts.length > 0) {
      setShowIntro(false);
      return;
    }

    const { clientX, currentTarget } = e;
    const { width, left } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    
    // If clicking the right side, go next. Left side, go prev.
    if (x > width / 2) {
      paginate(1);
    } else {
      paginate(-1);
    }
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: '#111',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div 
        style={{ 
          width: '100%',
          maxWidth: '450px', 
          height: '100%', 
          background: currentSlide?.bgColor || '#000',
          position: 'relative',
          overflow: 'hidden',
          transition: 'background-color 0.5s ease',
          cursor: 'pointer',
          boxShadow: '0 0 20px rgba(0,0,0,0.5)'
        }}
        onClick={handleClick}
      >
        {/* Progress Bars */}
        <div style={{ 
          position: 'absolute', 
          top: 20, 
          left: 20, 
          right: 20, 
          display: 'flex', 
          gap: 8, 
          zIndex: 10 
        }}>
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Go to slide ${idx + 1}`}
              onClick={event => {
                event.stopPropagation();
                goToSlide(idx);
              }}
              style={{
                flex: 1,
                height: 6,
                backgroundColor: idx <= slideIndex ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)',
                borderRadius: 3,
                boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'background-color 0.3s ease',
                opacity: idx === slideIndex ? 1 : 0.6
              }}
            />
          ))}
        </div>

        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#231430',
              textAlign: 'center'
            }}
          >
            {showIntro && introTexts.length > 0 ? (
              <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <AnimatePresence>
                  {introTexts.map((text, index) => (
                    index < currentTextIndex && (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: index === currentTextIndex - 1 ? 1 : 0, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{
                          position: 'absolute',
                          fontSize: '2.5rem',
                          fontWeight: 'bold',
                          padding: '2rem'
                        }}
                      >
                        {text}
                      </motion.div>
                    )
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              currentSlide?.content
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}