import { getTokenInfo } from "@/service/auth.service";

const GetRoleBasisUrl = () => {
  const tokenInfo = getTokenInfo();
  const isAdmin = tokenInfo?.role === "admin" || tokenInfo?.role === "super_admin";
  const isCustomer = tokenInfo?.role === "customer";
  const isSeller = tokenInfo?.role === "seller";
  
  if (isAdmin) {
    return "/admin";
  } else if (isCustomer) {
    return "/customer";
  } else if (isSeller) {
    ("/seller");
  }
};

export default GetRoleBasisUrl;
