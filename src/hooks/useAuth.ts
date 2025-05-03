import { useState, useEffect } from 'react';
import { BaseUser } from '@/types/userTypes';

const useAuthenticated = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<BaseUser | null>(null);


  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token: string | null = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token não encontrado. Faça login.');
        }

        const response = await fetch('http://localhost:3001/user/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.log('Perfil não existe');
          throw new Error('Erro ao buscar perfil');
        }

        const data = await response.json();
        setAuthenticated(true);
        setUser(data);
      } catch (error) {
        console.log(error instanceof Error ? error.message : error);
        setAuthenticated(false);
      }
    };

    fetchUserProfile();
  }, []);

  return { authenticated, user };
};

export default useAuthenticated;
