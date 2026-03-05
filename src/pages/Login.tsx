import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { Layout } from '@/components/layout';
import { Button, Input } from '@/components/ui';
import { useAuthStore } from '@/stores';
import { validateEmail, validatePassword, validateConfirmPassword } from '@/utils/validation';

type AuthMode = 'login' | 'register';

export function Login() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const { login, register } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: string })?.from || '/';

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    const emailError = validateEmail(email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(password);
    if (passwordError) newErrors.password = passwordError;

    if (mode === 'register') {
      if (!name.trim()) newErrors.name = '请输入用户名';
      const confirmError = validateConfirmPassword(password, confirmPassword);
      if (confirmError) newErrors.confirmPassword = confirmError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      if (mode === 'login') {
        const result = await login(email, password);
        if (result.success) {
          navigate(from, { replace: true });
        } else {
          setErrors({ form: result.error || '登录失败' });
        }
      } else {
        const result = await register(email, password, name);
        if (result.success) {
          navigate(from, { replace: true });
        } else {
          setErrors({ form: result.error || '注册失败' });
        }
      }
    } catch {
      setErrors({ form: '操作失败，请稍后重试' });
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setErrors({});
    setPassword('');
    setConfirmPassword('');
    setName('');
  };

  return (
    <Layout showFooter={false}>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold mb-2">
              {mode === 'login' ? '欢迎回来' : '创建账户'}
            </h1>
            <p className="text-gray-500">
              {mode === 'login' ? '登录您的账户继续购物' : '注册成为会员享受更多优惠'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <Input
                label="用户名"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="请输入用户名"
                icon={<User size={18} />}
                error={errors.name}
              />
            )}

            <Input
              label="邮箱"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="请输入邮箱地址"
              icon={<Mail size={18} />}
              error={errors.email}
            />

            <div className="relative">
              <Input
                label="密码"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="请输入密码"
                icon={<Lock size={18} />}
                error={errors.password}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[38px] text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {mode === 'register' && (
              <Input
                label="确认密码"
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="请再次输入密码"
                icon={<Lock size={18} />}
                error={errors.confirmPassword}
              />
            )}

            {errors.form && (
              <p className="text-sm text-red-500 text-center">{errors.form}</p>
            )}

            <Button
              type="submit"
              className="w-full"
              loading={isLoading}
            >
              {mode === 'login' ? '登录' : '注册'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              {mode === 'login' ? '还没有账户？' : '已有账户？'}
              <button
                onClick={switchMode}
                className="ml-1 text-black font-medium hover:underline"
              >
                {mode === 'login' ? '立即注册' : '立即登录'}
              </button>
            </p>
          </div>

          {mode === 'login' && (
            <div className="mt-4 text-center">
              <button className="text-sm text-gray-500 hover:text-gray-700">
                忘记密码？
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
}
