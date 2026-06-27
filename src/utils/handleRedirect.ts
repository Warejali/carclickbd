const handleRedirect = (role: string, router: any) => {
  switch (role) {
    case "admin":
    case "super-admin":
      router.push("/admin");
      break;
    default:
      router.push("/");
      break;
  }
};

export default handleRedirect;
