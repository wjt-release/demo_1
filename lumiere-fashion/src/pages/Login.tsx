import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { Layout } from '../components/layout';
import { Button, Input } from '../components/common';
import { useUserStore } from '../stores';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useUserStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setMessage('');

    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = '请输入邮箱地址';
    } else if (!validateEmail(email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }

    if (!password) {
      newErrors.password = '请输入密码';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    const result = await login(email, password);

    setIsLoading(false);

    if (result.success) {
      navigate('/');
    } else {
      setMessage(result.message);
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl lg:text-4xl text-primary-black mb-2">
              登录
            </h1>
            <p className="text-primary-gray">
              欢迎回来，请登录您的账户
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="邮箱地址"
              type="email"
              placeholder="请输入邮箱"
              value={email}
              onChange={e => setEmail(e.target.value)}
              error={errors.email}
            />

            <div className="relative">
              <Input
                label="密码"
                type={showPassword ? 'text' : 'password'}
                placeholder="请输入密码"
                value={password}
                onChange={e => setPassword(e.target.value)}
                error={errors.password}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-primary-gray hover:text-primary-black"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {message && (
              <p className="text-red-500 text-sm text-center">{message}</p>
            )}

            <Button type="submit" fullWidth disabled={isLoading}>
              {isLoading ? '登录中...' : '登录'}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-primary-gray">
              还没有账户？{' '}
              <Link to="/register" className="text-primary-black hover:underline">
                立即注册
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};
