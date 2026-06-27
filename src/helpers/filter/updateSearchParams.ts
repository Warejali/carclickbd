export const updateSearchParams = (
  params: Record<string, string | undefined>,
  url: string = window.location.href,
) => {
  const currentUrl = new URL(url);

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      // Encode value and decode specific characters (e.g., `/`)
      const encodedValue = encodeURIComponent(value).replace(/%2F/g, "/");
      currentUrl.searchParams.set(key, encodedValue);
    } else {
      currentUrl.searchParams.delete(key);
    }
  });

  window.history.pushState({}, "", currentUrl);
};
