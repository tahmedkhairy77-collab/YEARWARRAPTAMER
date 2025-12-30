import { motion } from 'framer-motion';

export type ResultStatus = 'correct' | 'incorrect';

interface ResultPopupProps {
  status: ResultStatus;
  message?: string;
  details?: string;
}

const statusTokens: Record<ResultStatus, { background: string; shadow: string; label: string }> = {
  correct: {
    background: 'rgba(33, 181, 115, 0.95)',
    shadow: '0 10px 25px rgba(33, 181, 115, 0.35)',
    label: 'Correct'
  },
  incorrect: {
    background: 'rgba(239, 68, 68, 0.95)',
    shadow: '0 10px 25px rgba(239, 68, 68, 0.35)',
    label: 'Incorrect'
  }
};

export default function ResultPopup({ status, message, details }: ResultPopupProps) {
  const tokens = statusTokens[status];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 280, damping: 24 }}
      style={{
        background: tokens.background,
        color: '#fff',
        padding: '1.25rem 2.25rem',
        borderRadius: '1.5rem',
        fontWeight: 700,
        fontSize: '1.5rem',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        boxShadow: tokens.shadow,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.35rem'
      }}
    >
      <span>{message ?? tokens.label}</span>
      {details ? (
        <span style={{ fontSize: '0.95rem', fontWeight: 500, letterSpacing: 0, textTransform: 'none' }}>
          {details}
        </span>
      ) : null}
    </motion.div>
  );
}
