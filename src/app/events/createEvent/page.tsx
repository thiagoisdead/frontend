'use client'
import { Box, Button, FormControl, Step, StepButton, Stepper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import '../../styles/events.css'
import { Grid } from '@mui/system';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const steps = ['Nome do evento e descrição', 'Dias e Horários', 'Quantidade de Pessoas e Localização', 'Contatos e Preços', 'Permissões e proibições', 'Adicionais opcionais', 'Finalização'];

export default function EventStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const router = useRouter();


  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <Typography>Formulário de informações básicas</Typography>;
      case 1:
        return (
          <Grid container spacing={2}>
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
          </Grid>
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

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', }} className={"createEventSvg"}>
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
          p: 2,
          justifyContent: 'space-between',
        }}
      >
        <Grid container spacing={2} sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" bgcolor={'red'} width="100%" sx={{ height: 40 }}>
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
          <Grid size={{ xs: 12, lg: 12 }} display="flex" justifyContent="center" bgcolor={'orange'} alignItems="center">
            <Box sx={{ width: '100%' }}> 
              {renderStepContent(activeStep)}
            </Box>
          </Grid>


          {/* Stepper */}
          <Grid size={{ xs: 12 }}>
            <Stepper activeStep={activeStep} alternativeLabel nonLinear>
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
    </Box>
  );
}
