'use client'
import { Box, Button, Fade, FormControl, Slide, Step, StepButton, Stepper, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import '../../styles/events.css'
import { Grid } from '@mui/system';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import useAuthenticated from '@/hooks/useAuth';

const steps = ['Nome do evento e tipo', 'Dias, horários e descrição', 'Quantidade de Pessoas e Localização', 'Contatos e Preços', 'Permissões e proibições', 'Adicionais opcionais', 'Finalização'];

export default function EventStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [showContent, setShowContent] = useState(true);
  const [showBox, setShowBox] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const router = useRouter();

  const authenticated = useAuthenticated();

  useEffect(() => {
    setTimeout(() => {
      setShowBox(true)
      setShowImage(true)
    }, (300));
  }, [])


  const handleNext = () => {
    setShowContent(false); // inicia o fade-out
    setTimeout(() => {
      setActiveStep((prev) => prev + 1);
      setShowContent(true); // inicia o fade-in do próximo conteúdo
    }, 300); // Tempo deve coincidir com o `timeout` do Fade
  };

  const handleBack = () => {
    setShowContent(false);
    setTimeout(() => {
      setActiveStep((prev) => prev - 1);
      setShowContent(true);
    }, 300);
  };


  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <Typography>Formulário de informações básicas</Typography>;
      case 1:
        return (
          <>
            <Grid size={{ lg: 12, sm: 6, xs: 6 }}>
              <FormControl fullWidth margin='normal'>
                <Typography>Então vamos criar seu evento! Pra começar, de um nome a ele e o personalize</Typography>
              </FormControl>
            </Grid>
            <Grid size={{ lg: 6, sm: 6, xs: 6 }}>
              <FormControl fullWidth margin='normal'>
                <TextField fullWidth type='text' label={'Oii'}></TextField>
              </FormControl>
            </Grid>
            <Grid size={{ lg: 6, sm: 6, xs: 6 }}>
              <FormControl fullWidth margin='normal'>
                <TextField fullWidth type='text' label={'Oii'}></TextField>
              </FormControl>
            </Grid>
          </>
        )
      case 2:
        return <Typography>Revise e confirme seu evento</Typography>;
      case 3:
        return <Typography>Revise e confirme seu evento</Typography>;
      case 4:
        return <Typography>Revise e confirme seu evento</Typography>;
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
    <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', }} className={"createEventSvg"}>
      <Slide in={showImage} timeout={300} direction='right' draggable={false}>
        <Box sx={{ position: 'absolute', top: 0, left: 0, p: 4 }}>
          <Image
            alt="logo"
            onClick={() => router.push('/')}
            src="/images/haha.png"
            width={120}
            height={40}
            style={{
              cursor: 'pointer',
              maxHeight: "100%",
              maxWidth: "100%",
              display: "block",
            }}
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
            boxSizing: 'border-box',
            backgroundColor: 'blue',
            p: 2,
            justifyContent: 'space-between',
          }}
        >
          <Grid container spacing={2} sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center"
              bgcolor={'red'}
              width="100%" sx={{ height: 40 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Voltar
              </Button>

              <Typography variant="h6" align="center">
                {steps[activeStep]}
              </Typography>

              <Button
                variant="contained"
                onClick={handleNext}
                disabled={activeStep === steps.length - 1}
              >
                Avançar
              </Button>
            </Box>
            {/* Conteúdo do step */}
            <Grid size={{ xs: 12, lg: 12 }} sx={{ height: '60%' }} display="flex"
              bgcolor={'orange'}
              alignItems="center"
            >
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Fade in={showContent} timeout={400}>
                  <Grid container spacing={2} bgcolor={'cyan'} sx={{ width: '100%' }}>
                    {renderStepContent(activeStep)}
                  </Grid>
                </Fade>
              </Box>
            </Grid>


            {/* Stepper */}
            <Grid size={{ xs: 12 }} sx={{ mb: 3 }}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepButton onClick={() => setActiveStep(index)}>
                      {label}
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
