'use client'

import '@fontsource/special-gothic-expanded-one';
import { useRouter } from 'next/navigation';
import '../styles/events.css'

import { Box, Typography, Paper } from "@mui/material";
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
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
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error)
        }
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <Box width={'100%'} height={'100%'} bgcolor={'red'} display={"flex"} alignItems={"center"} justifyContent={"center"}>
      <Box width={'65%'} mt={6} height={'60%'} gap={2} flexDirection={'row'} justifyContent={'space-between'} display={'flex'}>
        <Paper elevation={20} sx={{
          border: '2px ridge black', borderRadius: 5, width: '35%', height: '80%', display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', background: 'linear-gradient(135deg, #f9f9f9 0%, #5cceee 100%)', px: 5, transition: 'transform 0.2s ease-in-out', '&:hover': { transform: 'translateY(-5px)', }, cursor: 'pointer',
        }}
        onClick={() => router.push('/events/createEvent')}
        >
          <Typography
            mt={1.5}
            fontSize={30}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignSelf: 'initial',
              width: '100%',
              height: '10%',
            }}
          >
            Criar evento
          </Typography>
          <Typography
            mt={8}
            fontSize={25}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              height: '50%',
              textAlign: 'justify '
            }}
          >
            Marque eventos organizados, com todo mundo em sintonia no horário, local e no que levar, sem estresse e com muito mais diversão. Um churrasco, uma sinuca, um rolê com os amigos, oque vem hoje? 😉
          </Typography>
        </Paper>
        <Paper elevation={20} sx={{
          border: '2px ridge black', borderRadius: 5, width: '35%', height: '80%', display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', background: 'linear-gradient(135deg, #f9f9f9 0%, #5cceee 100%)', px: 5
        }}>
          <Typography
            mt={1.5}
            fontSize={30}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignSelf: 'initial',
              width: '100%',
              height: '10%',
            }}
          >
            Listar eventos
          </Typography>
          <Typography
            mt={8}
            fontSize={25}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              height: '50%',
              textAlign: 'justify '
            }}
          >
            bla bla bla listar evento
          </Typography>
        </Paper>
      </Box>

    </Box >
  );
}
