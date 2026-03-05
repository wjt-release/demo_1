export const validateEmail = (email: string): string | null => {
  if (!email.trim()) {
    return '请输入邮箱地址';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return '请输入有效的邮箱地址';
  }
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) {
    return '请输入密码';
  }
  if (password.length < 6) {
    return '密码至少需要6个字符';
  }
  return null;
};

export const validateConfirmPassword = (password: string, confirmPassword: string): string | null => {
  if (!confirmPassword) {
    return '请确认密码';
  }
  if (password !== confirmPassword) {
    return '两次输入的密码不一致';
  }
  return null;
};

export const validatePhone = (phone: string): string | null => {
  if (!phone.trim()) {
    return '请输入手机号码';
  }
  const phoneRegex = /^1[3-9]\d{9}$/;
  if (!phoneRegex.test(phone)) {
    return '请输入有效的手机号码';
  }
  return null;
};

export const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value.trim()) {
    return `请输入${fieldName}`;
  }
  return null;
};
