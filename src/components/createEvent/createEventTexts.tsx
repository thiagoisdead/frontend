'use client';

import { Box } from '@mui/material';
import { motion } from 'framer-motion';

type AnimatedStepTextProps = {
  texts: string[];
  activeStep: number;
  onComplete?: () => void;
  mode?: 'letters' | 'words';
  // Velocidades separadas para cada modo (em segundos)
  letterStaggerDelay?: number;
  letterDuration?: number;
  wordStaggerDelay?: number;
  wordDuration?: number;
};

export default function StepText({
  texts,
  activeStep,
  onComplete,
  mode = 'words',
  letterStaggerDelay = 0.02,
  letterDuration = 0.3,
  wordStaggerDelay = 0.05,
  wordDuration = 0.4,
}: AnimatedStepTextProps) {
  const textToShow = texts[activeStep] || '';
  const items = mode === 'letters' ? Array.from(textToShow) : textToShow.split(' ');

  // define os valores de stagger e duration com base no modo
  const staggerDelay = mode === 'letters' ? letterStaggerDelay : wordStaggerDelay;
  const itemDuration = mode === 'letters' ? letterDuration : wordDuration;

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: staggerDelay },
    },
  };

  const itemVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: itemDuration },
    },
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        height: '100%',
        width: '100%',
        boxSizing: 'border-box',
        fontFamily: '"Special Gothic Expanded One", sans-serif',
        fontSize: 25,
        color: '#F5F5F5',
        textAlign: 'center',
      }}
    >
      <motion.div
        key={activeStep + mode}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        onAnimationComplete={onComplete}
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
      >
        {items.map((text, idx) => (
          <motion.span
            key={idx}
            variants={itemVariants}
            style={{
              fontFamily: 'roboto',
              color: 'black',
              marginRight:
                mode === 'words'
                  ? '0.4rem'
                  : text === ' '
                    ? '0.1rem'
                    : '0.02rem',
              whiteSpace: mode === 'words' ? 'nowrap' : 'pre',
            }}
          >
            {text}
          </motion.span>
        ))}
      </motion.div>
    </Box>
  );
}