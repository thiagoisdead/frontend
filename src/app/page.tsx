'use client';


import '@fontsource/special-gothic-expanded-one';
import '../../src/app/styles/style.css';
import { useRouter } from 'next/navigation';

import { Box, Typography } from "@mui/material";

export default function Home() {
  const router = useRouter();
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        gap={2}
        sx={{
          py: 5,
          background: "linear-gradient(135deg, #5cceee 0%, #24c0eb 100%)",
          m: 0,
          border: 0,
          width: '100vw',
        }}
      >
        <Box display={"flex"} width={"80%"}>
          <Typography
            marginLeft={4}
            bgcolor="white"
            fontSize={20}
            sx={{
              fontFamily: '"Special Gothic Expanded One", sans-serif',
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: 2,
              padding: 2,
            }}
          >
            Okay, Where and When?
          </Typography>
        </Box>
        <Box display={"flex"} marginLeft={20} gap={2} width={"30%"}>
          <Typography
            onClick={() => router.push('/signup')}
            bgcolor="white"
            fontSize={20}
            sx={{
              fontWeight: 0,
              fontFamily: '"Special Gothic Expanded One", sans-serif',
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: 2,
              '&:hover': {
                cursor: 'pointer',
                boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)", // efeito ao passar o mouse
              },
              padding: 2,
            }}
          >
            Register/Login
          </Typography>
          <Typography
            bgcolor="white"
            fontSize={20}
            sx={{
              fontFamily: '"Special Gothic Expanded One", sans-serif',
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: 2,
              padding: 2,
            }}
          >
            Registro/Login
          </Typography>
        </Box>




      </Box>
    </Box>
  );
}
