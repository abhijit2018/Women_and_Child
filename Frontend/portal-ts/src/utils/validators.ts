/**
 * Lightweight client-side validation helpers.
 *
 * NOTE: Client-side validation is a UX convenience only. It is not a
 * security boundary — every field here must be re-validated and
 * sanitized again on the server before it touches a database or is
 * rendered anywhere.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+\-\s()]{7,15}$/;

export function isRequired(value: string): boolean {
  return typeof value === 'string' && value.trim().length > 0;
}

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

export function isValidPhone(value: string): boolean {
  return PHONE_RE.test(value.trim());
}

export function maxLength(value: string, max: number): boolean {
  return value.trim().length <= max;
}

/**
 * Strips characters with no legitimate place in plain-text form input,
 * as defense-in-depth against stored-XSS payloads. React already
 * escapes rendered text by default — this is a belt-and-braces extra,
 * not a replacement for proper server-side output encoding.
 */
export function sanitizeText(value: string): string {
  return value.replace(/[<>]/g, '').trim();
}

export type FieldRules = {
  required?: boolean;
  email?: boolean;
  phone?: boolean;
  maxLength?: number;
};

export function validateField(name: string, value: string, rules: FieldRules = {}): string {
  if (rules.required && !isRequired(value)) {
    return `${name} is required.`;
  }
  if (rules.email && value && !isValidEmail(value)) {
    return 'Please enter a valid email address.';
  }
  if (rules.phone && value && !isValidPhone(value)) {
    return 'Please enter a valid phone number.';
  }
  if (rules.maxLength && !maxLength(value, rules.maxLength)) {
    return `${name} must be ${rules.maxLength} characters or fewer.`;
  }
  return '';
}
