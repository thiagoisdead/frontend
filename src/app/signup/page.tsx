'use client'

import '@fontsource/special-gothic-expanded-one';
import '@fontsource/roboto';
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";

import { useState } from 'react';
import '../styles/style.css'
import dynamic from 'next/dynamic';

const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), { ssr: false });


export default function Home() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleCaptcha = (token: string | null) => {
    console.log("Token recebido:", token)
    setCaptchaToken(token)
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(email, password, name, captchaToken)
    if (!captchaToken) {
      alert('Resolva o captcha');
      return
    }
    setLoading(true)

    const res = await fetch("http://localhost:3001/api/user", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name, email: email, password: password, captchaToken: captchaToken })
    });
    setLoading(false)
    console.log(res)
  }


  return (
    <form onSubmit={handleSubmit}>
      <Box
        width="100%"
        height="100vh"
        sx={{
          background: "#eee8e8",
        }}
        display="flex"
        justifyContent="flex-end" // <- Aqui está o segredo
      >
        <Box
          display={"flex"}
          justifyContent={"flex-start"}
          width="35%"
          height="100%"
          flexDirection="column" // <- ESSA LINHA!
          sx={{
            bgcolor: '#eee8e8',
            borderLeft: '2px solid black'
          }}
        >
          <Box display={'flex'} alignItems={"center"} sx={{ width: '100%', mt: 2 }}>
            <Box sx={{ width: '50%', height: '100%', bgcolor: "#eee8e8" }}>
              <Typography textAlign={"center"} justifySelf={"center"} justifyItems={"center"}
                fontSize={40}
                sx={{
                  fontFamily: 'Roboto',
                  padding: 2,
                  color: 'black',
                }}>
                Register
              </Typography>
            </Box>
            <Box sx={{ width: '50%', height: '100%', bgcolor: "#eee8e8" }}>
              <Typography textAlign={"center"} justifyItems={"center"}
                fontSize={40}
                sx={{
                  fontFamily: 'Roboto',
                  padding: 2,
                  color: 'black',
                }}>
                Login
              </Typography>
            </Box>
          </Box>
          <Box display={"flex"} justifyContent={"center"}>
            <Box sx={{ width: '80%', height: '100%', mt: 5 }} >
              <FormControl fullWidth> 
                <TextField type='name' name='name' id='name' label={"Digite o Nome"} onChange={(e) => setName(e.target.value)}></TextField> 
              </FormControl>
            </Box>
          </Box>
          <Box display={"flex"} justifyContent={"center"}>
            <Box sx={{ width: '80%', height: '100%', mt: 5 }} >
              <FormControl fullWidth>
                <TextField type='email' name='email' id='email' label={"Digite o email"} onChange={(e) => setEmail(e.target.value)}
                >
                </TextField>
              </FormControl>
            </Box>
          </Box>
          <Box display={"flex"} justifyContent={"center"}>
            <Box sx={{ width: '80%', height: '100%', mt: 5 }} >
              <FormControl fullWidth>
                <TextField type='password' name='password' id='password' label={"Password"} onChange={(e) => setPassword(e.target.value)}
                >
                </TextField>
              </FormControl>
            </Box>
          </Box>
          <Box display="flex" justifyContent="center">
            <Box sx={{ width: '80%', mt: 5 }}>
              <ReCAPTCHA
                sitekey="6LeJSR4rAAAAAEDJ_MqWrv8-It_EEUGfYSbtgUbT"
                onChange={handleCaptcha}
              />
            </Box>
          </Box>
          <Box display="flex" justifyContent="center">
            <Box sx={{ width: '80%', mt: 5 }}>
              <Button type='submit' disabled={loading}>oiii</Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </form>
  );
}
