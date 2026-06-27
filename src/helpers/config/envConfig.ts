export const getBaseUrl = (): string => {
  return (
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://carclickbd-api.vercel.app/api/v1" 
    
  );
};
