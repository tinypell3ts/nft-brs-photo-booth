const nextTranslate = require("next-translate");

/** @type {import('next').NextConfig} */
module.exports = nextTranslate({
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
});
