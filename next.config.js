const { withGlobalCss } = require('next-global-css')
const withBundleAnalyzer = require('@next/bundle-analyzer')({enabled: process.env.ANALYZE === 'true'})

const withConfig = withGlobalCss()

module.exports = withBundleAnalyzer(
   withConfig(
  {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com'],
  }
 
}
)
)
