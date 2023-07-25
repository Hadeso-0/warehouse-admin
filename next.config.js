/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["res.cloudinary.com"]
    },
    experimental: {
        // appDir: true,
        serverComponentsExternalPackages: ["@prisma/client", "bcrypt"]
    }
}

module.exports = nextConfig
