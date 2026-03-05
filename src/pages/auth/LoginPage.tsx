import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/useUserStore';
import { Button } from '../../components/ui/Button';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const login = useUserStore((state) => state.login);
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    // Mock login
    login({
      id: 'user-1',
      email: data.email,
      name: 'Jane Doe',
      passwordHash: 'hashed_password',
    });
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tighter">LOGIN</h1>
          <p className="text-gray-500 mt-2">Welcome back to MODA.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              {...register('email')}
              type="email" 
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-black focus:border-black sm:text-sm"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              {...register('password')}
              type="password" 
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-black focus:border-black sm:text-sm"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <Button fullWidth type="submit" size="lg">
            SIGN IN
          </Button>
        </form>

        <div className="text-center text-sm text-gray-500">
          <p>Don't have an account? <Link to="/register" className="text-black font-medium hover:underline">Register</Link></p>
        </div>
      </div>
    </div>
  );
};
