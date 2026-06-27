export interface ISigninData {
  email: string;
  password: string;
}

export interface ISignUpData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IValidationResponse {
  message?: string;
}

export interface IForgotPassword {
  email: string;
}

export interface IResetPassword {
  newPassword: string;
  newConfirmPassword?: string;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword?: string;
}

export type IChangeEmail = {
  password: string;
  email: string;
};
