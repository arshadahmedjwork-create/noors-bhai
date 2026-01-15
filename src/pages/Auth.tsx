
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageLayout from '@/components/layout/PageLayout';
import AuthForm from '@/components/auth/AuthForm';
import { useAuth } from '@/hooks/useAuth';

const Auth = () => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !loading) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <PageLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-cafe-white text-xl">Loading...</div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Branding */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-cafe-white mb-6 leading-tight">
                Welcome to
                <span className="block text-cafe-gold">Noor's Bhai Biryani</span>
              </h1>
              <p className="text-xl text-cafe-white/80 mb-8 leading-relaxed">
                Experience the authentic flavors of traditional biryani and join our community of food lovers.
              </p>
              <div className="hidden lg:block">
                <img
                  src="/assets/noors-logo.png"
                  alt="Noor's Bhai Biryani"
                  className="w-32 h-32 mx-auto lg:mx-0 object-contain filter drop-shadow-2xl"
                />
              </div>
            </motion.div>

            {/* Right Side - Auth Form */}
            <div className="flex justify-center lg:justify-end">
              <AuthForm mode={mode} onModeChange={setMode} />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Auth;
