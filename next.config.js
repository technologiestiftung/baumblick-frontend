const nextTranslate = require('next-translate')
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

const mdx = withMDX({
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
})

const getUrlWithoutPath = (url) => {
  if (!url) return ''
  try {
    const newUrl = new URL(url)
    return `${newUrl.protocol}//${newUrl.hostname}`
  } catch (error) {
    console.error(error)
    return ''
  }
}

module.exports = nextTranslate({
  ...mdx,
  async headers() {
    const baseUrl = getUrlWithoutPath(process.env.NEXT_PUBLIC_BASE_URL)
    const vercelUrl = getUrlWithoutPath(`https://${process.env.VERCEL_URL}`)
    const matomoUrl = getUrlWithoutPath(process.env.NEXT_PUBLIC_MATOMO_URL)
    const tilesUrl = getUrlWithoutPath(process.env.NEXT_PUBLIC_TREE_TILES_URL)
    const basemapUrl = getUrlWithoutPath(
      process.env.NEXT_PUBLIC_MAPTILER_BASEMAP_URL
    )
    const postgrestUrl = getUrlWithoutPath(
      `${process.env.ML_PGREST_HOST}:${process.env.ML_PGREST_PORT}`
    )

    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              `default-src 'self'`,
              `script-src 'self' 'unsafe-eval'`,
              `style-src 'self' 'unsafe-inline'`,
              `font-src 'self' data:`,
              `img-src 'self' ${[
                baseUrl,
                vercelUrl,
                matomoUrl,
                tilesUrl,
                basemapUrl,
                postgrestUrl,
              ]
                .filter(Boolean)
                .join(' ')} data: blob:`,
              `frame-ancestors 'none'`,
              `worker-src 'self' blob:`,
              `child-src 'self' blob:`,
              `connect-src 'self' ${[
                baseUrl,
                vercelUrl,
                tilesUrl,
                basemapUrl,
                matomoUrl,
                postgrestUrl,
              ]
                .filter(Boolean)
                .join(' ')}`,
            ].join('; '),
          },
        ],
      },
    ]
  },
})
