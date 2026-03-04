import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/useUserStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useUserStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('请输入邮箱和密码');
      return;
    }

    if (!isLogin && !name) {
      setError('请输入姓名');
      return;
    }

    // Mock Authentication
    if (isLogin) {
      // Login logic
      if (email === 'user@example.com' && password === 'password') {
        login({ id: '1', name: 'User', email });
        navigate('/');
      } else {
        setError('邮箱或密码错误');
      }
    } else {
      // Register logic
      login({ id: Date.now().toString(), name, email });
      navigate('/');
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 flex justify-center">
      <div className="w-full max-w-md bg-white p-8 border border-gray-100 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold uppercase tracking-wider mb-6 text-center">
          {isLogin ? '登录' : '注册'}
        </h1>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-3 mb-4 text-sm rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <Input
              label="姓名"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="请输入您的姓名"
            />
          )}
          
          <Input
            label="邮箱"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user@example.com"
          />
          
          <Input
            label="密码"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />

          <Button type="submit" size="lg" className="w-full uppercase tracking-widest mt-6">
            {isLogin ? '登录' : '注册'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-500">
            {isLogin ? '还没有账号？' : '已有账号？'}
          </span>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 font-medium text-black hover:underline"
          >
            {isLogin ? '立即注册' : '立即登录'}
          </button>
        </div>
      </div>
    </div>
  );
};
