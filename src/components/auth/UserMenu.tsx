
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();

  if (!user) return null;

  const getInitials = (email: string) => {
    return email.split('@')[0].slice(0, 2).toUpperCase();
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-cafe-gold/10 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Avatar className="w-8 h-8 border-2 border-cafe-gold/30">
          <AvatarImage src={user.user_metadata?.avatar_url} />
          <AvatarFallback className="bg-cafe-gold text-cafe-black text-sm font-bold">
            {getInitials(user.email || '')}
          </AvatarFallback>
        </Avatar>
        <span className="hidden md:block text-cafe-white text-sm font-medium">
          {user.user_metadata?.full_name || user.email?.split('@')[0]}
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-48 bg-cafe-black/95 backdrop-blur-xl border border-cafe-gold/20 rounded-lg shadow-2xl z-50"
          >
            <div className="p-3 border-b border-cafe-gold/20">
              <p className="text-cafe-white font-medium text-sm truncate">
                {user.user_metadata?.full_name || 'User'}
              </p>
              <p className="text-cafe-white/60 text-xs truncate">{user.email}</p>
            </div>
            
            <div className="p-2">
              <button className="w-full flex items-center space-x-3 p-2 text-cafe-white hover:bg-cafe-gold/10 rounded-lg transition-colors text-sm">
                <User className="w-4 h-4" />
                <span>Profile</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-2 text-cafe-white hover:bg-cafe-gold/10 rounded-lg transition-colors text-sm">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </div>
            
            <div className="p-2 border-t border-cafe-gold/20">
              <button
                onClick={signOut}
                className="w-full flex items-center space-x-3 p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default UserMenu;
