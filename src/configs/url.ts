// các link api không cần kiểm tra token
export const urlNoAuth: Array<string[]> = [
  ["auth/login", "post"],
  ["auth/refresh-token", "post"],
  // ["auth/login/facebook", "post"],
  // ["auth/login/google", "post"],
  // ["auth/register", "post"],
  // ["auth/active", "post"],
  // ["auth/forgot-password", "post"],
  ["auth/update-password", "post"],
  ["auth/forgot", "post"],
  ["auth/register", "post"],
  ["activations", "post"]
];