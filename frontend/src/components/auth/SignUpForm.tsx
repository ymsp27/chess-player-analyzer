import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, AtSign, Mail, Lock, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { calculatePasswordStrength } from '../../lib/utils';

const signUpSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

interface SignUpFormProps {
  onSwitchToSignIn: () => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ onSwitchToSignIn }) => {
  const { signup } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: 'Ananya R.',
      username: 'ananya_chess',
      email: 'ananya.r@chessanalytica.io',
      password: 'Password123!',
    },
  });

  const passwordValue = watch('password') || '';
  const strength = calculatePasswordStrength(passwordValue);

  const onSubmit = (data: SignUpFormData) => {
    signup(data.fullName, data.username, data.email);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* OAuth Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <button
          type="button"
          onClick={() => signup('Ananya R.', 'ananya_google', 'ananya.google@gmail.com')}
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
          onClick={() => signup('Ananya R.', 'ananya_github', 'ananya.git@github.com')}
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
          or sign up with email
        </span>
      </div>

      {/* Full Name */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
        <div className="relative">
          <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            {...register('fullName')}
            type="text"
            placeholder="Ananya R."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-800/20 focus:border-forest-800"
          />
        </div>
        {errors.fullName && <p className="text-[11px] text-rose-500 mt-1">{errors.fullName.message}</p>}
      </div>

      {/* Username */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">Username</label>
        <div className="relative">
          <AtSign className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            {...register('username')}
            type="text"
            placeholder="ananya_chess"
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-800/20 focus:border-forest-800"
          />
        </div>
        {errors.username && <p className="text-[11px] text-rose-500 mt-1">{errors.username.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
        <div className="relative">
          <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            {...register('email')}
            type="email"
            placeholder="ananya@chessanalytica.io"
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-800/20 focus:border-forest-800"
          />
        </div>
        {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email.message}</p>}
      </div>

      {/* Password */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
        <div className="relative">
          <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            {...register('password')}
            type="password"
            placeholder="••••••••••••"
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-800/20 focus:border-forest-800"
          />
        </div>
        {errors.password && <p className="text-[11px] text-rose-500 mt-1">{errors.password.message}</p>}

        {/* Interactive Password Strength Meter */}
        <div className="mt-2 space-y-1.5 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-500 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              Password Strength:
            </span>
            <span className="font-bold text-slate-800">{strength.label}</span>
          </div>

          <div className="flex items-center gap-1.5 h-1.5">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`flex-1 h-full rounded-full transition-all duration-300 ${
                  step <= strength.score ? strength.color : 'bg-slate-200'
                }`}
              />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-1 text-[10px] text-slate-500 pt-1">
            <span className={passwordValue.length >= 8 ? 'text-emerald-600 font-medium' : ''}>
              ✓ 8+ characters
            </span>
            <span className={/[A-Z]/.test(passwordValue) ? 'text-emerald-600 font-medium' : ''}>
              ✓ 1 uppercase letter
            </span>
            <span className={/[0-9]/.test(passwordValue) ? 'text-emerald-600 font-medium' : ''}>
              ✓ 1 number
            </span>
            <span className={/[^A-Za-z0-9]/.test(passwordValue) ? 'text-emerald-600 font-medium' : ''}>
              ✓ 1 special symbol
            </span>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-forest-900 hover:bg-forest-800 text-white rounded-xl font-semibold text-xs transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2 mt-2"
      >
        <CheckCircle2 className="w-4 h-4 text-gold-300" />
        Create Free Account
      </button>

      {/* Switch to Sign In */}
      <p className="text-center text-xs text-slate-500 pt-2">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToSignIn}
          className="text-forest-800 font-bold hover:underline"
        >
          Sign In
        </button>
      </p>
    </form>
  );
};
