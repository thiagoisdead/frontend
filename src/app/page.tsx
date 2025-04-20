'use client'

import '@fontsource/special-gothic-expanded-one';
import '../../src/app/styles/style.css';
import { useRouter } from 'next/navigation';

import { Box, Typography } from "@mui/material";
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
  const [autenthicated, setAuthenticated] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
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
      } catch (error) {
        console.log(error)
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          py: 5,
          px: 5,
          background: "linear-gradient(135deg, #5cceee 0%, #24c0eb 100%)",
          m: 0,
          border: 0,
          width: '100%',
          maxWidth: '100vw',
          boxSizing: 'border-box',
        }}
      >
        <Box display="flex" justifyContent="flex-start" width="80%">
          <Typography
            // marginLeft={4}
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

        {autenthicated === false && (
          <Box display="flex" justifyContent="flex-end" gap={2} width="15%">
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
          </Box>
        )}
        {autenthicated === true && (
          <>
            <Box display="flex" justifyContent="flex-end" width="5%">
              <LogoutButton></LogoutButton>
            </Box>
            <Box display="flex" justifyContent="flex-end" width="1%">
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
          </>
        )}
      </Box>
    </Box>
  );
}
