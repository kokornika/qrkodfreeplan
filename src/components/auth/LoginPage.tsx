import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  React.useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Bejelentkezés
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={['google', 'github']}
            redirectTo={`${window.location.origin}/dashboard`}
            localization={{
              variables: {
                sign_in: {
                  email_label: 'Email cím',
                  password_label: 'Jelszó',
                  button_label: 'Bejelentkezés',
                },
                sign_up: {
                  email_label: 'Email cím',
                  password_label: 'Jelszó',
                  button_label: 'Regisztráció',
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;