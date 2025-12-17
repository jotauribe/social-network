import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { useUserRepository } from './hooks/useUserRepository';

const App = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useUserRepository();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        navigate('/feed');
      } else {
        navigate('/profile');
      }
    }
  }, [user, isLoading, navigate]);

  return null;
};

export default App;
