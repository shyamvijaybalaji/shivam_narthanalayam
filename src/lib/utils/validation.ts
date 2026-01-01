// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface ValidationError {
  field: string;
  message: string;
}

export function validateContactForm(data: {
  name?: string;
  email?: string;
  message?: string;
}): ValidationError[] {
  const errors: ValidationError[] = [];

  // Validate name
  if (!data.name || data.name.trim().length === 0) {
    errors.push({ field: 'name', message: 'Name is required' });
  } else if (data.name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Name must be at least 2 characters' });
  } else if (data.name.trim().length > 100) {
    errors.push({ field: 'name', message: 'Name must be less than 100 characters' });
  }

  // Validate email
  if (!data.email || data.email.trim().length === 0) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' });
  }

  // Validate message
  if (!data.message || data.message.trim().length === 0) {
    errors.push({ field: 'message', message: 'Message is required' });
  } else if (data.message.trim().length < 10) {
    errors.push({ field: 'message', message: 'Message must be at least 10 characters' });
  } else if (data.message.trim().length > 1000) {
    errors.push({ field: 'message', message: 'Message must be less than 1000 characters' });
  }

  return errors;
}

export function getFieldError(errors: ValidationError[], field: string): string | null {
  const error = errors.find(e => e.field === field);
  return error ? error.message : null;
}
