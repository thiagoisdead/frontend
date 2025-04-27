'use client'

import '@fontsource/special-gothic-expanded-one';
import '@fontsource/roboto';
import { Box, Button, FormControl, Tab, Tabs, TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { useState } from 'react';
import '../styles/home.css'
import dynamic from 'next/dynamic';
import { FormUser } from "../../types/userTypes"
import { useRouter } from 'next/navigation';
import useAuthRedirect from '@/hooks/useVerifyToken';

const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), { ssr: false });


export default function Home() {
  const [loading, setLoading] = useState(false);
  const [registerOrLogin, setRegisterOrLogin] = useState('register');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  useAuthRedirect();



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
    setLoading(true)
    if (registerOrLogin === 'register') {
      const res = await fetch("http://localhost:3001/auth/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickname: formData.nickname, name: formData.name, email: formData.email, password: formData.password, captchaToken: captchaToken })
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
        <Box sx={{ width: '75%', height: 'auto' }} className="bg2Svg">

        </Box>
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
          <Box mt={3}>
            <Box display={'flex'} alignItems={"center"} sx={{ width: '100%', mb: 4 }}>
              <Box sx={{ width: '100%' }}>
                <Tabs
                  value={registerOrLogin}
                  onChange={(event, newValue) => setRegisterOrLogin(newValue)}
                  sx={{ width: '100%', display: 'flex' }}
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
                      flex: 1, textTransform: 'none',
                      fontFamily: 'Roboto',
                      color: 'black',
                      fontSize: { xs: '0.75rem', sm: '1rem', md: '1.5rem', lg: '2.5rem' },
                      cursor: 'pointer',

                    }}
                  />
                </Tabs>
              </Box>
            </Box>
            {registerOrLogin === 'register' && (
              <>
                <Box display={"flex"} justifyContent={"center"}>
                  <Box sx={{ width: '80%', height: '100%', mt: 5 }} >
                    <FormControl fullWidth>
                      <TextField autoFocus type='text' name='nickname' required id='nickname' label={"Digite o nome de usuário"} autoComplete='off'

                        onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                      ></TextField>
                    </FormControl>
                  </Box>
                </Box>
                <Box display={"flex"} justifyContent={"center"}>
                  <Box sx={{ width: '80%', height: '100%', mt: 5 }} >
                    <FormControl fullWidth>
                      <TextField type='name' name='name' required id='name' label={"Digite o Nome"} autoComplete='off'
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      ></TextField>
                    </FormControl>
                  </Box>
                </Box>
              </>

            )}
            <Box display={"flex"} justifyContent={"center"}>
              <Box sx={{ width: '80%', height: '100%', mt: 5 }} >
                <FormControl fullWidth>
                  <TextField autoFocus type='email' name='email' required id='email' label={"Digite o email"} autoComplete='off'
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    slotProps={{
                      inputLabel: {
                        shrink: true, // Faz o label encolher sempre
                      },
                    }}
                  >
                  </TextField>
                </FormControl>
              </Box>
            </Box>
            <Box display={"flex"} justifyContent={"center"}>
              <Box sx={{ width: '80%', height: '100%', mt: 5 }} >
                <FormControl fullWidth>
                  <TextField
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    id="password"
                    autoComplete='off'
                    label="Senha"
                    slotProps={{
                      inputLabel: {
                        shrink: true, // Faz o label encolher sempre
                      },
                    }}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    value={formData.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                            sx={{ mr: 0.5 }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
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
