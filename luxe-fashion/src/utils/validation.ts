export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password: string): { valid: boolean; message: string } => {
  if (password.length < 6) {
    return { valid: false, message: '密码长度至少6位' }
  }
  if (password.length > 20) {
    return { valid: false, message: '密码长度不能超过20位' }
  }
  return { valid: true, message: '' }
}

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^1[3-9]\d{9}$/
  return phoneRegex.test(phone)
}

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0
}

export const getPasswordStrength = (password: string): 'weak' | 'medium' | 'strong' => {
  let strength = 0
  if (password.length >= 8) strength++
  if (password.length >= 12) strength++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
  if (/\d/.test(password)) strength++
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++

  if (strength <= 2) return 'weak'
  if (strength <= 3) return 'medium'
  return 'strong'
}
