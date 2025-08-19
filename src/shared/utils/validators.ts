export function getMissingFields(
  body: any,
  requiredFields: string[]
): string[] {
  return requiredFields.filter(
    (field) =>
      !body ||
      body[field] === undefined ||
      body[field] === null ||
      body[field] === ""
  );
}
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
export function validatePassword(password: string): boolean {
  // Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}
