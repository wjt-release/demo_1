import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { Layout } from '@/components/layout';
import { Button, Input } from '@/components/common';
import { useAuthStore } from '@/stores/authStore';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, isLoading } = useAuthStore();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const from = (location.state as { from?: string })?.from || '/';

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (mode === 'register' && !formData.name.trim()) {
      newErrors.name = '请输入用户名';
    }

    if (!formData.email.trim()) {
      newErrors.email = '请输入邮箱地址';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }

    if (!formData.password) {
      newErrors.password = '请输入密码';
    } else if (formData.password.length < 6) {
      newErrors.password = '密码至少需要6个字符';
    }

    if (mode === 'register' && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '两次输入的密码不一致';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (mode === 'login') {
      const success = await login(formData.email, formData.password);
      if (success) {
        navigate(from, { replace: true });
      } else {
        setErrors({ email: '邮箱或密码错误' });
      }
    } else {
      const success = await register(formData.email, formData.password, formData.name);
      if (success) {
        navigate(from, { replace: true });
      } else {
        setErrors({ email: '该邮箱已被注册' });
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Layout hideFooter>
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-serif font-semibold text-neutral-900">
              {mode === 'login' ? '欢迎回来' : '创建账户'}
            </h1>
            <p className="text-sm text-neutral-500 mt-2">
              {mode === 'login'
                ? '登录您的账户，继续购物之旅'
                : '注册新账户，开启时尚之旅'}
            </p>
          </div>

          <div className="bg-white rounded-lg border border-neutral-100 p-6 md:p-8">
            <div className="flex mb-6">
              <button
                onClick={() => setMode('login')}
                className={`flex-1 py-2 text-sm font-medium border-b-2 transition-colors ${
                  mode === 'login'
                    ? 'border-neutral-900 text-neutral-900'
                    : 'border-transparent text-neutral-400 hover:text-neutral-600'
                }`}
              >
                登录
              </button>
              <button
                onClick={() => setMode('register')}
                className={`flex-1 py-2 text-sm font-medium border-b-2 transition-colors ${
                  mode === 'register'
                    ? 'border-neutral-900 text-neutral-900'
                    : 'border-transparent text-neutral-400 hover:text-neutral-600'
                }`}
              >
                注册
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                  />
                  <Input
                    placeholder="用户名"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    error={errors.name}
                    className="pl-10"
                  />
                </div>
              )}

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                />
                <Input
                  type="email"
                  placeholder="邮箱地址"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  error={errors.email}
                  className="pl-10"
                />
              </div>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="密码"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  error={errors.password}
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {mode === 'register' && (
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                  />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="确认密码"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange('confirmPassword', e.target.value)
                    }
                    error={errors.confirmPassword}
                    className="pl-10"
                  />
                </div>
              )}

              {mode === 'login' && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-neutral-300"
                    />
                    <span className="text-neutral-600">记住我</span>
                  </label>
                  <button
                    type="button"
                    className="text-neutral-600 hover:text-neutral-900"
                  >
                    忘记密码？
                  </button>
                </div>
              )}

              <Button type="submit" fullWidth isLoading={isLoading}>
                {mode === 'login' ? '登录' : '注册'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-neutral-500">
                {mode === 'login' ? (
                  <>
                    还没有账户？
                    <button
                      onClick={() => setMode('register')}
                      className="text-neutral-900 font-medium hover:underline ml-1"
                    >
                      立即注册
                    </button>
                  </>
                ) : (
                  <>
                    已有账户？
                    <button
                      onClick={() => setMode('login')}
                      className="text-neutral-900 font-medium hover:underline ml-1"
                    >
                      立即登录
                    </button>
                  </>
                )}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Login;
