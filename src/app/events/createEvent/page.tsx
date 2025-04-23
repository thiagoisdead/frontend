'use client'
import { Box, Button, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import '../../styles/home.css'
import { Grid } from '@mui/system';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const steps = ['Nome do evento e Descrição', 'Dias e Horários', 'Quantidade de Pessoas e Localização', 'Contatos e Preços', 'Proibições', 'Adicionais opcionais', 'Finalização'];

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
        return <Grid container spacing={2}>
          <TextField type='text' label={'Oii'}></TextField>
        </Grid>
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
    <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ position: 'absolute', top: 0, left: 0, p: 5 }}>
        <Image
          alt="logo"
          onClick={() => router.push('/')}
          src="/images/haha.png"
          width={120} // valor em número, não string
          height={40}
          style={{
            maxHeight: "100%",
            maxWidth: "100%",
            display: "block",
          }}
        />
      </Box>

      <Box sx={{ width: '70%', height: '65%', bgcolor: 'white', border: '2px solid black', borderRadius: 4, display: 'flex', flexDirection: 'column', boxSizing: 'border-box', p: 2 }}>
        <Box sx={{ height: '100%', width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', widht: '100%', height: '10%', textAlign: 'center' }}>
            <Typography>{steps[activeStep]}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', widht: '100%', height: '10%', textAlign: 'center' }}>
            {renderStepContent(activeStep)}
          </Box>
          <Box>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Voltar
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={activeStep === steps.length - 1}
            >
              Avançar
            </Button>
          </Box>
          <Box sx={{ bgcolor: 'yellow' }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
