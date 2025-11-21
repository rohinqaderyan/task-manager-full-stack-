export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean;
  message: string;
}

export interface ValidationSchema {
  [key: string]: ValidationRule[];
}

export interface ValidationErrors {
  [key: string]: string;
}

export const validate = (data: any, schema: ValidationSchema): ValidationErrors => {
  const errors: ValidationErrors = {};

  Object.keys(schema).forEach((field) => {
    const value = data[field];
    const rules = schema[field];

    for (const rule of rules) {
      if (rule.required && (!value || value.toString().trim() === '')) {
        errors[field] = rule.message;
        break;
      }

      if (rule.minLength && value && value.length < rule.minLength) {
        errors[field] = rule.message;
        break;
      }

      if (rule.maxLength && value && value.length > rule.maxLength) {
        errors[field] = rule.message;
        break;
      }

      if (rule.pattern && value && !rule.pattern.test(value)) {
        errors[field] = rule.message;
        break;
      }

      if (rule.custom && value && !rule.custom(value)) {
        errors[field] = rule.message;
        break;
      }
    }
  });

  return errors;
};

// Common validation schemas
export const taskValidationSchema: ValidationSchema = {
  title: [
    { required: true, message: 'Title is required' },
    { minLength: 3, message: 'Title must be at least 3 characters' },
    { maxLength: 100, message: 'Title must not exceed 100 characters' },
  ],
  description: [
    { maxLength: 500, message: 'Description must not exceed 500 characters' },
  ],
};

export const userValidationSchema: ValidationSchema = {
  username: [
    { required: true, message: 'Username is required' },
    { minLength: 3, message: 'Username must be at least 3 characters' },
    { maxLength: 30, message: 'Username must not exceed 30 characters' },
    { pattern: /^[a-zA-Z0-9_]+$/, message: 'Username can only contain letters, numbers, and underscores' },
  ],
  email: [
    { required: true, message: 'Email is required' },
    { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format' },
  ],
  password: [
    { required: true, message: 'Password is required' },
    { minLength: 6, message: 'Password must be at least 6 characters' },
  ],
};
