import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle } from 'lucide-react';
import { Layout } from '@/components/layout';
import { Button, Input } from '@/components/ui';
import { validateEmail, validateRequired } from '@/utils/validation';

export function Contact() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    const emailError = validateEmail(email);
    if (emailError) newErrors.email = emailError;

    const subjectError = validateRequired(subject, '主题');
    if (subjectError) newErrors.subject = subjectError;

    const messageError = validateRequired(message, '内容');
    if (messageError) newErrors.message = messageError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold mb-2">联系我们</h1>
          <p className="text-gray-500">我们期待收到您的来信</p>
        </div>

        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
            <h2 className="text-xl font-medium mb-2">发送成功</h2>
            <p className="text-gray-500 mb-6">我们会尽快回复您的邮件</p>
            <Button variant="outline" onClick={() => setIsSuccess(false)}>
              继续发送
            </Button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="bg-white border border-gray-100 rounded-lg p-6 space-y-4">
              <Input
                label="您的邮箱"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="请输入邮箱地址"
                icon={<Mail size={18} />}
                error={errors.email}
              />

              <Input
                label="主题"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="请输入邮件主题"
                error={errors.subject}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  内容
                </label>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="请输入邮件内容"
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-400 placeholder:text-gray-400 resize-none"
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" loading={isSubmitting}>
              <Send size={18} className="mr-2" />
              发送邮件
            </Button>
          </motion.form>
        )}

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-[#E8E0D5]/30 rounded-lg p-6 text-center">
            <Mail size={24} className="mx-auto mb-3" />
            <h3 className="font-medium mb-1">邮箱</h3>
            <p className="text-sm text-gray-600">service@elegance.com</p>
          </div>
          <div className="bg-[#E8E0D5]/30 rounded-lg p-6 text-center">
            <Mail size={24} className="mx-auto mb-3" />
            <h3 className="font-medium mb-1">客服热线</h3>
            <p className="text-sm text-gray-600">400-888-8888</p>
            <p className="text-xs text-gray-500 mt-1">工作日 9:00-18:00</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
