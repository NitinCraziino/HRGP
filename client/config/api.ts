import { SERVER_URL } from ".";

export const authRoutes = {
  signup: `/auth/signup`,
  signin: `/auth/signin`,
  google: `${SERVER_URL}/auth/google`,
  forgotPassword: `/auth/forgot-password`,
  verifyVerificationCode: `/auth/verify-verification-code`,
  resetPassword: `/auth/reset-password`,
  resendVerificationCode: `/auth/resend-verification-code`,
};

export const userRoutes = {
  getUser: `/user`,
};

export const paymentRoutes = {
  createSubscription: `/payment/create-subscription`,
};

export const addressRoutes = {
  /*
     ! @params: postalCode: string 
     * add the postal code as a query param to get the address
     * eg: /address/12345
     */
  getAddress: `/address`,
};
