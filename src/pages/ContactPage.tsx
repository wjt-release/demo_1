import React from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const ContactPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('消息已发送，感谢您的反馈！');
  };

  return (
    <div className="container mx-auto px-4 py-20 flex justify-center">
      <div className="w-full max-w-2xl bg-white p-8 border border-gray-100 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold uppercase tracking-wider mb-8 text-center">联系我们</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="姓名" placeholder="您的姓名" required />
            <Input label="邮箱" type="email" placeholder="您的邮箱" required />
          </div>
          
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">留言内容</label>
            <textarea
              className="w-full h-32 px-3 py-2 text-sm border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none"
              placeholder="请输入您的留言..."
              required
            ></textarea>
          </div>

          <Button type="submit" size="lg" className="w-full uppercase tracking-widest mt-6">
            发送消息
          </Button>
        </form>

        <div className="mt-12 text-center text-sm text-gray-500 space-y-2">
          <p>客服邮箱: support@aura.com</p>
          <p>客服电话: 400-123-4567</p>
          <p>工作时间: 周一至周五 9:00 - 18:00</p>
        </div>
      </div>
    </div>
  );
};
