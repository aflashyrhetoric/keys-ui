module.exports = {
  async redirects() {
    return [
      {
        source: '/quiz',
        destination: '/configurator',
        permanent: true,
      },
    ]
  },
}