const { withGlobalCss } = require('next-global-css')

const withConfig = withGlobalCss()

module.exports = withConfig(
  {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com'],
  }
 
}
)
