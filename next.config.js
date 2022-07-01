const { withGlobalCss } = require('next-global-css')

const withConfig = withGlobalCss()

module.exports = withConfig({
  /* Next.js config options here */
  reactStrictMode: true
})
