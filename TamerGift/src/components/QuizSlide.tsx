import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ResultPopup, { type ResultStatus } from './ResultPopup';

export type QuizStage = 'question' | 'drumroll' | 'reveal';

export type QuizOptionContent =
  | { kind: 'text'; value: string }
  | { kind: 'image'; src: string; alt: string };

export interface QuizOption {
  id: string;
  content: QuizOptionContent;
  isCorrect: boolean;
}

interface QuizSlideProps {
  question: string;
  options: QuizOption[];
  accentColor?: string;
  revealMessage?: string;
}

const drumrollPopupDelay = 1400;
const drumrollDuration = 3300;

const optionGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gridAutoRows: '1fr',
  gap: '0.75rem',
  width: '100%',
  maxWidth: 280,
  margin: '0 auto'
};

export default function QuizSlide({
  question,
  options,
  accentColor = '#ffd369',
  revealMessage = 'The real MVP of our sweet talk was...'
}: QuizSlideProps) {
  const [stage, setStage] = useState<QuizStage>('question');
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showResultPopup, setShowResultPopup] = useState(false);

  const selectedOption = useMemo(
    () => options.find(option => option.id === selectedOptionId) ?? null,
    [options, selectedOptionId]
  );

  const correctOption = useMemo(
    () => options.find(option => option.isCorrect) ?? null,
    [options]
  );

  const resultStatus: ResultStatus | null =
    selectedOption ? (selectedOption.isCorrect ? 'correct' : 'incorrect') : null;

  useEffect(() => {
    if (stage !== 'drumroll') {
      setShowResultPopup(false);
      return;
    }

    const popupTimer = window.setTimeout(() => setShowResultPopup(true), drumrollPopupDelay);
    const revealTimer = window.setTimeout(() => setStage('reveal'), drumrollDuration);

    return () => {
      window.clearTimeout(popupTimer);
      window.clearTimeout(revealTimer);
    };
  }, [stage]);

  const handleOptionSelect = (optionId: string) => {
    if (stage !== 'question' || selectedOptionId) return;
    setSelectedOptionId(optionId);
    setStage('drumroll');
  };

  const preventNavigation = (event: React.MouseEvent) => {
    if (stage !== 'reveal') event.stopPropagation();
  };

  return (
    <div
      onClick={preventNavigation}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        gap: '2rem'
      }}
    >
      <AnimatePresence mode="wait">
        {stage === 'question' && (
          <motion.div
            key="quiz-question"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}
          >
            <motion.h2
              layout
              style={{
                fontSize: '2rem',
                fontWeight: 800,
                lineHeight: 1.2,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              {question}
            </motion.h2>

            {/* ✅ GRID FIX */}
            <div style={optionGridStyle}>
              {options.map(option => (
                <OptionCard
                  key={option.id}
                  option={option}
                  accentColor={accentColor}
                  disabled={stage !== 'question' || Boolean(selectedOptionId)}
                  onSelect={handleOptionSelect}
                />
              ))}
            </div>
          </motion.div>
        )}

        {stage === 'drumroll' && (
          <motion.div
            key="quiz-drumroll"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2rem'
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                fontSize: '2.5rem',
                fontWeight: 900,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textAlign: 'center'
              }}
            >
              Your Answer Isss 🥁
            </motion.div>

            <AnimatePresence>
              {showResultPopup && resultStatus && (
                <ResultPopup
                  status={resultStatus}
                  message={resultStatus === 'correct' ? 'Correct' : 'Incorrect'}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {stage === 'reveal' && correctOption && (
          <motion.div
            key="quiz-reveal"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          >
            <motion.h2
              layout
              style={{
                fontSize: '1.75rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              {revealMessage}
            </motion.h2>

            <div style={optionGridStyle}>
              {options.map(option => (
                <OptionCard
                  key={option.id}
                  option={option}
                  accentColor={accentColor}
                  disabled
                  highlight={option.id === correctOption.id ? 'correct' : 'default'}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ======================================================= */
/* =================== OPTION CARD ======================= */
/* ======================================================= */

interface OptionCardProps {
  option: QuizOption;
  accentColor: string;
  disabled?: boolean;
  highlight?: 'correct' | 'default';
  onSelect?: (id: string) => void;
}

function OptionCard({
  option,
  accentColor,
  disabled = false,
  highlight = 'default',
  onSelect
}: OptionCardProps) {
  const isDisabled = disabled || !onSelect;

  const borderColor = highlight === 'correct' ? accentColor : 'rgba(255,255,255,0.35)';
  const glow = highlight === 'correct' ? `0 0 25px ${accentColor}` : 'none';

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!isDisabled) onSelect?.(option.id);
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      disabled={isDisabled}
      whileHover={!isDisabled ? { y: -6, scale: 1.02 } : undefined}
      whileTap={!isDisabled ? { scale: 0.98 } : undefined}
      style={{
        border: `1.5px solid ${borderColor}`,
        boxShadow: glow,
        borderRadius: '1rem',
        background: 'rgba(0,0,0,0.2)',
        aspectRatio: '1 / 1', // ✅ KEY FIX
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: option.content.kind === 'text' ? '0.65rem' : '0',
        overflow: 'hidden',
        cursor: isDisabled ? 'default' : 'pointer'
      }}
    >
      {option.content.kind === 'text' ? (
        <span style={{ fontWeight: 600, lineHeight: 1.3, fontSize: '0.95rem' }}>
          {option.content.value}
        </span>
      ) : (
        <img
          src={option.content.src}
          alt={option.content.alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block'
          }}
        />
      )}
    </motion.button>
  );
}
