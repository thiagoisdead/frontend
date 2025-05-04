'use client';

import {
  Box,
  Button,
  Fade,
  FormControl,
  Slide,
  Step,
  StepButton,
  Stepper,
  TextField,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import '@fontsource/special-gothic-expanded-one';

import '../../styles/events.css';
import { Grid } from '@mui/system';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import useAuthenticated from '@/hooks/useAuth';
import StepText from '@/components/createEvent/createEventTexts';

const steps = [
  'Nome e Tipo',
  'Data e Descrição',
  'Quantidade e Localização',
  'Contatos e Preços',
  'Permissões e proibições',
  'Adicionais opcionais',
  'Finalização',
];

const stepsTexts = [
  "Vamos dar vida ao seu evento! Primeiro, crie um nome marcante, e depois defina o tipo, assim podemos falar exatamente na sua vibe 😉",
  "Segundo passo bacana",
  "Terceiro com emoção",
  "Quarto super importante",
  "Quinto quase lá",
  "Sexto penúltimo!",
  "Sétimo parabéns!",
];

export default function EventStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [pendingStep, setPendingStep] = useState<number | null>(null);
  const [data, setData] = useState({
    step0Name: '',
    step0Type: '',
    // future fields:
    // step1Date: '',
    // step1Description: '',
  });


  const [showBox, setShowBox] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [stepTextDone, setStepTextDone] = useState(false);
  const [mountContent, setMountContent] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);

  const router = useRouter();
  const authenticated = useAuthenticated();

  useEffect(() => {
    const t = setTimeout(() => {
      setShowBox(true);
      setShowImage(true);
    }, 300);
    return () => clearTimeout(t);
  }, []);

  // 2. Reset quando muda de etapa
  useEffect(() => {
    setStepTextDone(false);
    setMountContent(false);
  }, [activeStep]);

  // 3. Montar conteúdo após animação terminar
  useEffect(() => {
    if (stepTextDone) {
      const t = setTimeout(() => setMountContent(true), 20);
      return () => clearTimeout(t);
    }
  }, [stepTextDone]);

  const handleChange = (key: string, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={2} display={'flex'}
            // bgcolor={'cyan'} 
            alignContent={'center, space-beteween'} justifyContent={'center'} sx={{ height: '25rem' }} mb={'2rem'}>
            <Grid size={{ lg: 8, sm: 6, xs: 12 }}>
              <FormControl fullWidth margin="normal">
                <TextField
                  fullWidth
                  label="Nome do Evento"
                  value={data?.step0Name}
                  onChange={(e) => handleChange('step0Name', e.target.value)}
                />
              </FormControl>
            </Grid>
            <Fade in={!!data?.step0Name} timeout={1000} unmountOnExit>
              <Grid size={{ lg: 6, sm: 6, xs: 12 }} display={'flex'} justifyContent={'center'} alignItems={'flex-start'}>
                <Typography className='informal' fontSize={20}>Informal, Social</Typography>
              </Grid>

            </Fade>
            <Fade in={!!data?.step0Name} timeout={1000} unmountOnExit>
              <Grid size={{ lg: 6, sm: 6, xs: 12 }} display={'flex'} justifyContent={'center'} alignItems={'flex-start'}>
                <Typography className='formal' fontSize={20}>Formal, Refinado</Typography>
              </Grid>
            </Fade>
            <Grid
              size={{ lg: 6, sm: 6, xs: 12 }}
              display="flex"
              justifyContent="center"
              alignItems="flex-end"
              // bgcolor="yellow"
              sx={{ width: 200, height: 200 }}

            >
              <Fade in={!!data?.step0Name} timeout={1000} unmountOnExit>
                <Button
                  sx={{
                    p: 0, // remove padding do botão
                    background: 'none', // remove background se quiser deixar só a imagem
                    boxShadow: 'none',
                  }}
                  onClick={() => handleChange('step0Type', 'informal')}                >
                  <Box
                    sx={{
                      animation: 'pulse 1.5s ease-in-out infinite',
                      '@keyframes pulse': {
                        '0%': { transform: 'scale(1)' },
                        '50%': { transform: 'scale(1.1)' },
                        '100%': { transform: 'scale(1)' },
                      },
                    }}

                  >
                    <Image src={'/images/beer.svg'} alt="beer" width={200} height={200} typeof="svg" draggable={false} />
                  </Box>
                </Button>
              </Fade>
            </Grid>

            <Grid
              size={{ lg: 6, sm: 6, xs: 12 }}
              display="flex"
              justifyContent="center"
              alignItems="flex-end"
              // bgcolor="yellow"
              sx={{ width: 200, height: 200 }}
            >
              <Fade in={!!data?.step0Name} timeout={500} unmountOnExit>
                <Button
                  sx={{
                    p: 0,
                    background: 'none', // remove background se quiser deixar só a imagem
                    // boxShadow: 'none',
                  }}
                  onClick={() => handleChange('step0Type', 'informal')}
                >
                  <Box
                    sx={{
                      animation: 'pulse 1.5s ease-in-out infinite',
                      '@keyframes pulse': {
                        '0%': { transform: 'scale(1)' },
                        '50%': { transform: 'scale(1.1)' },
                        '100%': { transform: 'scale(1)' },
                      },
                    }}
                  >
                    <Image src={'/images/formalParty.svg'} alt="beer" width={300} height={200} typeof="svg" draggable={false} />
                  </Box>
                </Button>
              </Fade>
            </Grid>


          </Grid >
        );
      case 1:
        return <Typography>Formulário do passo 2</Typography>;
      case 2:
      case 3:
      case 4:
      case 5:
        return <Typography>Revise e confirme seu evento</Typography>;
      default:
        return <Typography>Passo desconhecido</Typography>;
    }
  };

  if (!authenticated) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography>Carregando...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      className="createEventSvg"
    >
      <Slide in={showImage} timeout={300} direction="right">
        <Box sx={{ position: 'absolute', top: 0, left: 0, p: 4 }}>
          <Image
            alt="logo"
            onClick={() => router.push('/')}
            src="/images/haha.png"
            width={120}
            height={40}
            style={{ cursor: 'pointer', maxHeight: '100%', maxWidth: '100%', display: 'block' }}
          />
        </Box>
      </Slide>

      <Fade in={showBox} timeout={1000}>
        <Box
          sx={{
            width: '70%',
            height: '65%',
            bgcolor: 'white',
            border: '2px solid black',
            borderRadius: 4,
            display: 'flex',
            flexDirection: 'column',
            // boxSizing: 'border-box',
            p: 2,
            justifyContent: 'space-between',
          }}
        >
          <Grid
            container
            sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            {/* Animated Step Text */}
            <Grid size={{ xs: 12, lg: 12 }} sx={{ height: '15%', display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ width: '60%' }}>
                <StepText
                  texts={stepsTexts}
                  activeStep={activeStep}
                  onComplete={() => {
                    setStepTextDone(true);
                  }}
                  mode="words"
                  wordStaggerDelay={0.1}
                  wordDuration={0.6}
                />
              </Box>
            </Grid>

            {/* Form Content */}
            <Grid size={{ xs: 12, lg: 12 }} sx={{ height: '75%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Box sx={{ width: '100%', height: 'auto' }}>
                {mountContent && (
                  <Fade in={contentVisible && stepTextDone}
                    timeout={700}
                    onExited={() => {
                      if (pendingStep !== null) {
                        setActiveStep(pendingStep);
                        setPendingStep(null);
                        setStepTextDone(false);
                        setMountContent(false);
                        setTimeout(() => {
                          setMountContent(true);
                          setContentVisible(true);
                        }, 20);
                      }
                    }}
                  >
                    <Box sx={{ width: '100%' }}>{renderStepContent(activeStep)}</Box>
                  </Fade>
                )}
              </Box>
            </Grid>

            {/* Stepper */}
            <Grid size={{ xs: 12 }}>
              <Stepper activeStep={activeStep} alternativeLabel nonLinear>
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepButton
                      onClick={() => {
                        if (index !== activeStep) {
                          setContentVisible(false);
                          setPendingStep(index);
                        }
                      }}
                      disabled={index > activeStep + 1}
                    >
                      {steps[index]}
                    </StepButton>
                  </Step>
                ))}
              </Stepper>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Box>
  );
}
