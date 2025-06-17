'use client'

import '@fontsource/special-gothic-expanded-one';
import '@fontsource/roboto';
import { Box, Button, Tab, Tabs, TextField, InputAdornment, IconButton, Grid } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { useState } from 'react';
import '../styles/home.css'
import dynamic from 'next/dynamic';
import { FormUser } from "../../types/userTypes"
import { useRouter } from 'next/navigation';
import useAuthRedirect from '@/hooks/useVerifyToken';
import DOMPurify from 'dompurify';

const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), { ssr: false });


export default function Home() {
  const [loading, setLoading] = useState(false);
  const [registerOrLogin, setRegisterOrLogin] = useState('register');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  useAuthRedirect();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [formData, setFormData] = useState<FormUser>({
    email: '',
    name: '',
    nickname: '',
    password: '',
  })
  const router = useRouter();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCaptcha = (token: string | null) => {
    console.log("Token recebido:", token)
    setCaptchaToken(token)
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaToken) {
      alert('Resolva o captcha');
      return
    }

    const sanitizedData = {
      email: DOMPurify.sanitize(formData.email || ""),
      name: formData.name ? DOMPurify.sanitize(formData.name) : "",
      nickname: formData.nickname ? DOMPurify.sanitize(formData.nickname) : "",
      password: DOMPurify.sanitize(formData.password || ""),
    };

    setLoading(true)
    if (registerOrLogin === 'register') {
      // const res = await fetch("http://localhost:3001/auth/signup", {
      const res = await fetch(`${apiUrl}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: sanitizedData.name, email: sanitizedData.email, password: sanitizedData.password, nickname: sanitizedData.nickname, captchaToken: captchaToken })
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
        console.log(errorData)
        console.log(res)
      }
      setLoading(false)
    }
    if (registerOrLogin === 'login') {
      // const res = await fetch("http://localhost:3001/auth/login", {
      const res = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email, password: formData.password, captchaToken: captchaToken })
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
        console.log(res)
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
        justifyContent="flex-end"
      >
        <Box sx={{ width: '75%', height: 'auto' }} className="bg2Svg" />
        <Box
          display={"flex"}
          justifyContent={"flex-start"}
          width="35%"
          height="100%"
          flexDirection="column"
          sx={{
            bgcolor: '#FFFAF0',
          }}
        >
          <Grid container spacing={2} sx={{ mt: 3, px: 6 }} rowSpacing={5}>
            <Grid size={{ xs: 12 }} sx={{ mb: 4 }}>
              <Tabs
                value={registerOrLogin}
                onChange={(event, newValue) => setRegisterOrLogin(newValue)}
                sx={{ width: '100%' }}
              >
                <Tab
                  value="register"
                  label="Registro"
                  sx={{
                    flex: 1,
                    color: 'black',
                    fontFamily: 'Roboto',
                    textTransform: 'none',
                    fontSize: { xs: '0.75rem', sm: '1rem', md: '1.5rem', lg: '2.5rem' },
                    cursor: 'pointer',
                  }}
                />
                <Tab
                  value="login"
                  label="Login"
                  sx={{
                    flex: 1,
                    color: 'black',
                    fontFamily: 'Roboto',
                    textTransform: 'none',
                    fontSize: { xs: '0.75rem', sm: '1rem', md: '1.5rem', lg: '2.5rem' },
                    cursor: 'pointer',
                  }}
                />
              </Tabs>
            </Grid>
            <>
              {registerOrLogin === 'register' && (
                <>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      autoFocus
                      fullWidth
                      type="text"
                      name="nickname"
                      required
                      id="nickname"
                      label="Digite o nome de usuário"
                      autoComplete="off"
                      onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      type="text"
                      name="name"
                      required
                      id="name"
                      label="Digite o Nome"
                      autoComplete="off"
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </Grid>
                </>
              )}

              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  autoFocus
                  type="email"
                  name="email"
                  required
                  id="email"
                  label="Digite o email"
                  autoComplete="off"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  id="password"
                  autoComplete="off"
                  label="Senha"
                  helperText={'A senha deve ter pelo menos 8 caracteres, incluir uma letra maiúscula, uma minúscula, um número e um caractere especial.'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <ReCAPTCHA
                  sitekey="6LeJSR4rAAAAAEDJ_MqWrv8-It_EEUGfYSbtgUbT"
                  onChange={handleCaptcha}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Button type="submit" variant="contained" fullWidth disabled={loading}>
                  Enviar
                </Button>
              </Grid>
            </>
          </Grid>

        </Box>
      </Box>
    </form >
  );
}
