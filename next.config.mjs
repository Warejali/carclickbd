/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
    domains: [
      "img.freepik.com",
      "i.ibb.co",
      "media.carsandbids.com",
      "as1.ftcdn.net",
      "shop.roadster.com",
      "www.mbusa.com",
      "cdn-icons-png.flaticon.com",
      "discordapp.com",
      "images.pexels.com",
      "images.unsplash.com",
      "content.copart.com",
      "cs.copart.com",
      "cdn.discordapp.com",
      "encrypted-tbn0.gstatic.com",
      "www.pngmart.com",
      "www.pngall.com",
      "cdn.pixabay.com"
    ],
  },
};

export default nextConfig;
