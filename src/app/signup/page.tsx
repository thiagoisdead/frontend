'use client'

import '@fontsource/special-gothic-expanded-one';
import '@fontsource/roboto';
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";

import { useState } from 'react';
import '../styles/style.css'
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), { ssr: false });


export default function Home() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [registerOrLogin, setRegisterOrLogin] = useState('register');
  const [password, setPassword] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const router = useRouter();


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
    if (registerOrLogin === 'register') {
      const res = await fetch("http://localhost:3001/auth/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickname: nickname, name: name, email: email, password: password, captchaToken: captchaToken })
      });
      if (res.ok) {
        const data = await res.json();  // Transforma a resposta em JSON
        if (data.token) {
          localStorage.setItem('token', data.token);
          router.push('/')
        }
        else {
          console.log('Erro ao receber o token:', data.message)
        }
      }
      else {
        const errorData = await res.json();
        console.log('Erro ao fazer registro:', errorData.message || "Erro desconhecido");
      }
      setLoading(false)
      console.log(res)
    }
    if (registerOrLogin === 'login') {
      const res = await fetch("http://localhost:3001/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password, captchaToken: captchaToken })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.token) {
          localStorage.setItem('token', data.token);
          router.push('/')
        } else {
          console.log("Erro ao receber o token:", data.message);
        }
      } else {
        const errorData = await res.json();
        console.log("Erro ao fazer login:", errorData.message || "Erro desconhecido");
      }
      setLoading(false);
      console.log(res)
    }
  }


  return (
    <form onSubmit={handleSubmit}>
      <Box
        width="100%"
        height="100vh"
        sx={{
          background: "#f9f9f9",
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
            bgcolor: '#f9f9f9',
            borderLeft: '2px solid black'
          }}
        >
          <Box mt={5}>
            <Box display={'flex'} alignItems={"center"} sx={{ width: '100%', mb: 4 }}>
              <Box sx={{ width: '50%', height: '100%', bgcolor: "#f9f9f9" }}>
                <Typography textAlign={"center"} justifySelf={"center"} justifyItems={"center"}
                  fontSize={40}
                  onClick={() => {
                    if (registerOrLogin === 'register') {
                      return;
                    }
                    else {
                      setRegisterOrLogin('register');
                    }
                  }}
                  sx={{
                    fontFamily: 'Roboto',
                    padding: 2,
                    color: 'black',
                    cursor: 'pointer',
                    borderBottom: registerOrLogin === 'register' ? '2px solid black' : 'none',
                  }}>
                  Register
                </Typography>
              </Box>
              <Box sx={{ width: '40%', height: '100%', bgcolor: "#f9f9f9" }}>
                <Typography textAlign={"center"} justifyItems={"center"}
                  fontSize={40}
                  onClick={() => {
                    if (registerOrLogin === 'login') {
                      return;
                    }
                    else {
                      setRegisterOrLogin('login');
                    }
                  }}
                  sx={{
                    fontFamily: 'Roboto',
                    padding: 2,
                    color: 'black',
                    cursor: 'pointer',
                    borderBottom: registerOrLogin === 'login' ? '2px solid black' : 'none',
                  }}>
                  Login
                </Typography>
              </Box>
            </Box>
            {registerOrLogin === 'register' && (
              <>
                <Box display={"flex"} justifyContent={"center"}>
                  <Box sx={{ width: '80%', height: '100%', mt: 5 }} >
                    <FormControl fullWidth>
                      <TextField type='text' name='nickname' required id='nickname' label={"Digite o nome de usuário"} onChange={(e) => setNickname(e.target.value)}></TextField>
                    </FormControl>
                  </Box>
                </Box>
                <Box display={"flex"} justifyContent={"center"}>
                  <Box sx={{ width: '80%', height: '100%', mt: 5 }} >
                    <FormControl fullWidth>
                      <TextField type='name' name='name' required id='name' label={"Digite o Nome"} onChange={(e) => setName(e.target.value)}></TextField>
                    </FormControl>
                  </Box>
                </Box>
              </>

            )}
            <Box display={"flex"} justifyContent={"center"}>
              <Box sx={{ width: '80%', height: '100%', mt: 5 }} >
                <FormControl fullWidth>
                  <TextField type='email' name='email' required id='email' label={"Digite o email"} onChange={(e) => setEmail(e.target.value)}>
                  </TextField>
                </FormControl>
              </Box>
            </Box>
            <Box display={"flex"} justifyContent={"center"}>
              <Box sx={{ width: '80%', height: '100%', mt: 5 }} >
                <FormControl fullWidth>
                  <TextField type='password' name='password' required id='password' label={"Password"} onChange={(e) => setPassword(e.target.value)}
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
                <Button type='submit' variant='contained' disabled={loading}>Enviar</Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </form >
  );
}
