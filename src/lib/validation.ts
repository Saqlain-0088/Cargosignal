/** Shared validation helpers */

export const validators = {
  required: (v: string) => v.trim().length > 0 || "This field is required",
  email: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || "Enter a valid email address",
  password: (v: string) => v.length >= 8 || "Password must be at least 8 characters",
  containerNumber: (v: string) => v.trim().length >= 3 || "Enter a valid container / BL number",
  name: (v: string) => v.trim().length >= 2 || "Name must be at least 2 characters",
};

/** Run a list of validators and return the first error, or null */
export function validate(value: string, ...rules: ((v: string) => true | string)[]): string | null {
  for (const rule of rules) {
    const result = rule(value);
    if (result !== true) return result;
  }
  return null;
}

/** Validate a whole form object — returns { field: errorMsg } */
export function validateForm<T extends Record<string, string>>(
  values: T,
  rules: Partial<Record<keyof T, ((v: string) => true | string)[]>>
): Partial<Record<keyof T, string>> {
  const errors: Partial<Record<keyof T, string>> = {};
  for (const key in rules) {
    const fieldRules = rules[key];
    if (!fieldRules) continue;
    const err = validate(values[key] ?? "", ...fieldRules);
    if (err) errors[key] = err;
  }
  return errors;
}
