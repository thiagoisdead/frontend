'use client';

import {
  Box,
  Fade,
  FormControl,
  Slide,
  Step,
  StepButton,
  Stepper,
  TextField,
  Typography
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
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
  "Vamos dar vida ao seu evento! Primeiro, crie um nome marcante e defina se será corporativo ou social, assim podemos falar exatamente na sua vibe.",
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
  const [step0Name, setStep0Name] = useState('');
  const [step0Type, setStep0Type] = useState('');

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

  // + useMemo para completed
  const completed = useMemo(() => {
    const step0Done = step0Name.trim() !== '' && step0Type.trim() !== '';
    return [step0Done, ...Array(steps.length - 1).fill(false)];
  }, [step0Name, step0Type]);

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={2} display={'flex'} bgcolor={'cyan'} alignContent={'center, space-beteween'} justifyContent={'center'} sx={{ height: '24rem' }}>
            <Grid size={{ lg: 8, sm: 6, xs: 12 }}>
              <FormControl fullWidth margin="normal">
                <TextField
                  fullWidth
                  label="Nome do Evento"
                  value={step0Name}
                  onChange={(e) => setStep0Name(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid size={{ lg: 6, sm: 6, xs: 12 }} display={'flex'} justifyContent={'center'} bgcolor={'yellow'} sx={{
              opacity: step0Name ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out',
            }}>
              <Image src={'/images/beer.svg'} alt='beer' width={200} height={200} />
            </Grid>
            <Grid
              size={{ lg: 6, sm: 6, xs: 12 }}
              display="flex"
              justifyContent="center"
              bgcolor="yellow"
              sx={{
                opacity: step0Name ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out',
              }}
            >
              <Image src={'/images/socialParty.svg'} alt='beer' width={200} height={200} />
            </Grid>
          </Grid>
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
            <Grid size={{ xs: 12, lg: 12 }} sx={{ height: '15%', display: 'flex', justifyContent: 'center', bgcolor: 'pink' }}>
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
            <Grid size={{ xs: 12, lg: 12 }} sx={{ height: '65%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} bgcolor={'red'}>
              <Box sx={{ width: '80%' }}>
                {mountContent && (
                  <Fade
                    in={contentVisible && stepTextDone}
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
            <Grid size={{ xs: 12 }} sx={{ bgcolor: 'green' }}>
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
