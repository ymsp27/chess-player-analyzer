import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

type SignInFormData = z.infer<typeof signInSchema>;

interface SignInFormProps {
  onSwitchToSignUp: () => void;
}

export const SignInForm: React.FC<SignInFormProps> = ({ onSwitchToSignUp }) => {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: 'ananya.r@chessanalytica.io',
      password: 'Password123!',
      rememberMe: true,
    },
  });

  const onSubmit = (data: SignInFormData) => {
    login(data.email);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* OAuth Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <button
          type="button"
          onClick={() => login('ananya.google@gmail.com')}
          className="flex items-center justify-center gap-2 py-2.5 px-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-xs font-semibold text-slate-700"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          Google
        </button>

        <button
          type="button"
          onClick={() => login('ananya.git@github.com')}
          className="flex items-center justify-center gap-2 py-2.5 px-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-xs font-semibold text-slate-700"
        >
          <svg className="w-4 h-4 fill-slate-800" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          GitHub
        </button>
      </div>

      <div className="relative flex items-center justify-center my-4">
        <div className="border-t border-slate-200 w-full" />
        <span className="bg-white px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider absolute">
          or sign in with email
        </span>
      </div>

      {/* Email */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">Email or Username</label>
        <div className="relative">
          <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            {...register('email')}
            type="text"
            placeholder="ananya.r@chessanalytica.io"
            className="w-full pl-9 pr-3 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-800/20 focus:border-forest-800"
          />
        </div>
        {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email.message}</p>}
      </div>

      {/* Password */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-xs font-semibold text-slate-700">Password</label>
          <button
            type="button"
            onClick={() => alert('Password reset link sent to your registered email address.')}
            className="text-[11px] font-semibold text-forest-800 hover:underline"
          >
            Forgot password?
          </button>
        </div>
        <div className="relative">
          <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            {...register('password')}
            type="password"
            placeholder="••••••••••••"
            className="w-full pl-9 pr-3 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-800/20 focus:border-forest-800"
          />
        </div>
        {errors.password && <p className="text-[11px] text-rose-500 mt-1">{errors.password.message}</p>}
      </div>

      {/* Remember Me */}
      <div className="flex items-center gap-2 pt-1">
        <input
          {...register('rememberMe')}
          type="checkbox"
          id="rememberMe"
          className="w-4 h-4 rounded border-slate-300 text-forest-800 focus:ring-forest-800/20"
        />
        <label htmlFor="rememberMe" className="text-xs text-slate-600 font-medium">
          Remember me for 30 days
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-forest-900 hover:bg-forest-800 text-white rounded-xl font-semibold text-xs transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2 mt-4"
      >
        <LogIn className="w-4 h-4 text-gold-300" />
        Sign In to Dashboard
      </button>

      {/* Demo Credentials Hint */}
      <div className="p-3 bg-gold-50/70 border border-gold-200 rounded-xl text-center">
        <p className="text-[11px] text-gold-900 font-medium">
          💡 Demo Mode Active: Logging in will load <strong>Ananya R. (Rating: 1850)</strong>
        </p>
      </div>

      {/* Switch to Sign Up */}
      <p className="text-center text-xs text-slate-500 pt-2">
        Don't have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToSignUp}
          className="text-forest-800 font-bold hover:underline"
        >
          Sign Up Free
        </button>
      </p>
    </form>
  );
};
