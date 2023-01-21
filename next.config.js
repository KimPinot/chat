const production = (process.env.VERCEL_ENV || "development") === "production";
const VERCEL_ENV = process.env.VERCEL_ENV || "local";

function getExcludedConsole() {
  const excluded = ["error"];

  if (!production) {
    excluded.push("log");
    excluded.push("warn");
    excluded.push("dir");
    excluded.push("info");
    excluded.push("debug");
  }

  return excluded;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: {
      exclude: getExcludedConsole(),
    },
  },
  env: {
    production,
  },
  publicRuntimeConfig: {
    VERCEL_ENV,
    COMMIT_SHA: process.env.VERCEL_GIT_COMMIT_SHA || "local-development",
  },
  experimental: {
    appDir: true,
    swcPlugins: [["next-superjson-plugin", {}]],
  },
};

module.exports = nextConfig;
