'use client'

import '@fontsource/special-gothic-expanded-one';
import { useRouter } from 'next/navigation';
import '../styles/events.css'

import { Box, Typography, Paper } from "@mui/material";
// import { useEffect, useState } from 'react';
import useAuthenticated from '@/hooks/useAuth';

export default function Home() {
  const router = useRouter();

  const authenticated = useAuthenticated();

  if (!authenticated) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography>Carregando...</Typography>
      </Box>
    );
  }

  return (
    <Box width={'100%'} height={'100%'} className="eventsSvg" display={"flex"} alignItems={"center"} justifyContent={"center"}>
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
            Marque eventos organizados, com todo mundo em sintonia no horário, local e no que levar, sem estresse e com muito mais diversão. Um churrasco, uma sinuca, um rolê?, oque vem hoje? 😉
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
