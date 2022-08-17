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

const cleanUrl = (url) => {
  const newUrl = new URL(url)
  return `${newUrl.protocol}//${newUrl.hostname}`
}

module.exports = nextTranslate({
  ...mdx,
  async headers() {
    const matomoUrl = cleanUrl(process.env.NEXT_PUBLIC_MATOMO_URL)
    const tilesUrl = cleanUrl(process.env.NEXT_PUBLIC_TREE_TILES_URL)
    const basemapUrl = cleanUrl(process.env.NEXT_PUBLIC_MAPTILER_BASEMAP_URL)
    const sdkUrl = cleanUrl(process.env.NEXT_PUBLIC_SUPABASE_SDK_URL)
    const passthroughUrl = cleanUrl(
      process.env.NEXT_PUBLIC_SUPABASE_PASSTHROUGH_URL
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
              `img-src 'self' ${matomoUrl} ${tilesUrl} ${basemapUrl} ${sdkUrl} data: blob:`,
              `frame-ancestors 'none'`,
              `worker-src 'self' blob:`,
              `child-src 'self' blob:`,
              `connect-src 'self' ${sdkUrl} ${tilesUrl} ${passthroughUrl} ${basemapUrl} ${matomoUrl}`,
            ].join('; '),
          },
        ],
      },
    ]
  },
})
