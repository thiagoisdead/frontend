'use client'

import '@fontsource/special-gothic-expanded-one';
import '../../src/app/styles/style.css';
import { useRouter } from 'next/navigation';

import { Box, Typography, Grid } from "@mui/material";
import { useEffect, useState } from 'react';
// app/page.tsx
import LogoutButton from '../components/LogoutButton'; // ou o caminho relativo correto

interface User {
  name: string;
  email: string;
}

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [autenthicated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token: string | null = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token não encontrado. Faça login.');
        }

        const response = await fetch('http://localhost:3001/user/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar perfil');
        }

        const data = await response.json();
        console.log(data)
        setAuthenticated(true)
        setUser(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error)
        }
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <Box>

      <Grid container spacing={2} sx={{
        width: '100vw', maxWidth: '100vw', px: 5, height: '15vh', m: 0, background: "linear-gradient(135deg, #5cceee 0%, #24c0eb 100%)", display: 'flex', alignItems: "center"
      }}>
        <Grid size={{ md: 10.6 }}>
          <Box sx={{ width: 'auto', display: 'inline-block' }}>
            <Typography
              bgcolor="white"
              fontSize={20}
              sx={{
                fontFamily: '"Special Gothic Expanded One", sans-serif',
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: 2,
                padding: 2,
                whiteSpace: 'nowrap', // Evitar que o texto quebre
                overflow: 'hidden', // Impedir que ultrapasse o limite
                textOverflow: 'ellipsis', // Colocar "..." se o texto for muito longo
              }}
            >
              Okay, Where and When?
            </Typography>
          </Box>
        </Grid>

        {autenthicated === false && (
          <Grid size={{ md: 1.4 }}>
            <Box sx={{ width: 'auto', display: 'inline-block' }}>
              <Typography
                onClick={() => router.push('/signup')}
                bgcolor="white"
                fontSize={20}
                sx={{
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
            </Box>
          </Grid>)}
        {autenthicated === true && (
          <>
            <Grid size={{ md: 0.9 }}>
              <Box sx={{ width: 'auto', display: 'inline-block' }}>
                <Typography
                  // onClick={() => router.push('/signup')}
                  bgcolor="white"
                  fontSize={20}
                  sx={{
                    fontWeight: 0,
                    fontFamily: '"Special Gothic Expanded One", sans-serif',
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: 2,
                    '&:hover': {
                      cursor: 'pointer',
                      boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)",
                    },
                    padding: 2,
                  }}
                >
                  {user?.name}
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ md: 0.5 }}>
              <Box sx={{ width: 'auto', display: 'inline-block' }}>
                <LogoutButton></LogoutButton>
              </Box>
            </Grid>

          </>
        )
        }
      </Grid >
    </Box >
  );
}
