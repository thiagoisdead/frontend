'use client'


import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const text1 = "Marcar eventos com seus amigos não era pra ser tão difícil.";
const text2 = "E não é, com Okay, Where and When?";

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const item = {
  hidden: { y: -50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
};

export default function AnimatedIntro() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        height: '10%',
        width: '90%',
        justifySelf: 'center',
        boxSizing: 'border-box',
        fontFamily: '"Special Gothic Expanded One", sans-serif',
        fontSize: 25,
        color: '#F5F5F5',
        textAlign: 'center',
      }}
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {text1.split(" ").map((word, index) => (
          <motion.span
            key={index}
            variants={item}
            style={{
              marginRight: "0.4rem",
              whiteSpace: "nowrap",
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>

      {/* Animação da segunda frase */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: text1.split(" ").length * 0.05 + 1.5,
          duration: 0.6,
        }}
      >
        <Typography
        fontSize={20}
          sx={{
            mt: 2,
            fontFamily: '"Special Gothic Expanded One", sans-serif',
          }}
        >
          {text2}
        </Typography>
      </motion.div>
    </Box>
  );
}
