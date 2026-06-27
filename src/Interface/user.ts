export type IUser = {
  updatedAt: string;
  _id?: string;
  name: string;
  email: string;
  password: string;
  address: string;
  photo: string;
  role?: "customer" | "admin" | "super_admin" | "seller";
  accountType?: "personal" | "dealer";
  isDisabled?: "disable" | "enable";
  documents?: string[];
  membership?: "free" | "faid";
  contactNo?: string;
  profilePhoto?: string;
  passwordChangedAt?: Date;
  isEmailVerified?: boolean;
  isVerified?: boolean;
  totalProduct?: number; 
};

export type ICommonProfile = {
  id: string;
  name: string;
  profilePhoto?: string;
};

export interface ApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: IUser[];
}
