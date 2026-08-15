import React from 'react';
import { Modal } from '../ui/Modal';
import { useAuth } from '../../context/AuthContext';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, authMode, openAuthModal } = useAuth();

  return (
    <Modal
      isOpen={isAuthModalOpen}
      onClose={closeAuthModal}
      maxWidth="md"
    >
      <div className="text-center pb-4">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-forest-900 text-gold-300 font-serif text-xl font-bold shadow-md mb-3">
          ⚔️
        </div>
        <h2 className="text-2xl font-bold font-serif text-forest-950">
          {authMode === 'signin' ? 'Welcome Back' : 'Join Chess Analytica'}
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          {authMode === 'signin'
            ? 'Access your Grandmaster-level telemetry and game insights'
            : 'Start analyzing your games with real-time engine evaluation'}
        </p>
      </div>

      {authMode === 'signin' ? (
        <SignInForm onSwitchToSignUp={() => openAuthModal('signup')} />
      ) : (
        <SignUpForm onSwitchToSignIn={() => openAuthModal('signin')} />
      )}
    </Modal>
  );
};
