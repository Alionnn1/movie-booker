export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isPhone(value: string): boolean {
  return /^\+?[0-9]{10,14}$/.test(value.replace(/\s/g, ''));
}

export function minLength(value: string, n: number): boolean {
  return value.length >= n;
}

export function isCardNumber(value: string): boolean {
  return /^[0-9]{16}$/.test(value.replace(/\s/g, ''));
}

export function isExpiry(value: string): boolean {
  const m = /^(0[1-9]|1[0-2])\/([0-9]{2})$/.exec(value.trim());
  if (!m) return false;
  const year = 2000 + Number(m[2]);
  const month = Number(m[1]);
  const now = new Date();
  return year > now.getFullYear() || (year === now.getFullYear() && month >= now.getMonth() + 1);
}

export function isCvv(value: string): boolean {
  return /^[0-9]{3,4}$/.test(value);
}
