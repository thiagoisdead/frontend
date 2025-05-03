'use client'

import '@fontsource/special-gothic-expanded-one';
import '../../src/app/styles/home.css';
import { useRouter } from 'next/navigation';

import { Box, Typography, Grid, Slide } from "@mui/material";
import { useEffect, useState } from 'react';
// app/page.tsx
import LogoutButton from '../components/signup/LogoutButton'; // ou o caminho relativo correto
import AnimatedIntro from '../components/home/firstText'; // ou o caminho relativo correto
import useAuthenticated from '@/hooks/useAuth';


import Image from 'next/image';



export default function Home() {
  const router = useRouter();

  const [showLogo, setShowLogo] = useState<boolean>(false);
  const {authenticated, user} = useAuthenticated();
  useEffect(() => {
    setShowLogo(true)
  }, [])

  return (
    <Box width={'100%'}>
      <Grid container sx={{
        width: '100%',
        maxWidth: '100%',
        px: 5,
        height: '9vh',
        m: 0,
        background: "#FFFAF0",
        alignItems: "center"
      }}>
        <Grid size={{ md: 4, sm: 4 }}>
          <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}>
            <Slide in={showLogo} timeout={500} direction='right'>
              <Image
                alt="logo"
                src="/images/haha.png"
                width={'120'}
                height={'40'}
                style={{
                  fill: 'black',
                  maxHeight: "100%",
                  maxWidth: "100%",
                  display: "block",
                }}
              />
            </Slide>
          </Box>
        </Grid>

        <Grid size={{ md: 4, sm: 4 }}>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            {/* <Typography
              fontSize={30}
              sx={{
                fontFamily: '"Special Gothic Expanded One", sans-serif',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                textAlign: 'center',
              }}
            >
              Okay, Where and When?
            </Typography> */}
          </Box>
        </Grid>

        <Grid size={{ md: 4, sm: 4 }}>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2 }}>
            {!authenticated ? (
              <Typography
                onClick={() => router.push('/signup')}
                // bgcolor="#ff3259"
                fontSize={20}
                sx={{
                  // color: 'white',
                  fontFamily: 'var(--font-mulish)',
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  borderRadius: 10,
                  '&:hover': {
                    cursor: 'pointer',
                    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)",
                  },
                  padding: 2,
                  textAlign: 'center',
                }}
              >
                Login/Registro
              </Typography>
            ) : (
              <>
                <Typography
                  onClick={() => router.push('/events')}
                  bgcolor="white"
                  fontSize={20}
                  sx={{
                    fontWeight: 0,
                    fontFamily: 'var(--font-mulish)',
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: 2,
                    '&:hover': {
                      cursor: 'pointer',
                      boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)",
                    },
                    padding: 2,
                    textAlign: 'center',
                  }}
                >
                  Eventos
                </Typography>

                <Typography
                  bgcolor="white"
                  fontSize={20}
                  sx={{
                    fontWeight: 0,
                    fontFamily: 'var(--font-mulish)',
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    // border: '1px outset black',
                    borderRadius: 2,
                    '&:hover': {
                      cursor: 'pointer',
                      boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)",
                    },
                    padding: 2,
                    textAlign: 'center',
                  }}
                >
                  {user?.name}
                </Typography>
                <LogoutButton />
              </>
            )}
          </Box>
        </Grid>
      </Grid>

      <Box sx={{
        width: 'auto', height: '93.75rem', paddingRight: 5, paddingLeft: 5, paddingTop: 5
      }} className="bgSvg">
        <AnimatedIntro />
      </Box>
    </Box>
  );
}
