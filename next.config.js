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

module.exports = nextTranslate({
  ...mdx,
  async headers() {
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
              `img-src 'self' ${process.env.NEXT_PUBLIC_MATOMO_URL} ${process.env.NEXT_PUBLIC_TREE_TILES_URL} ${process.env.NEXT_PUBLIC_MAPTILER_BASEMAP_URL} data: blob:`,
              `frame-ancestors 'none'`,
              `worker-src 'self' blob:`,
              `child-src 'self' blob:`,
              `connect-src 'self' ${process.env.NEXT_PUBLIC_SUPABASE_SDK_URL} ${process.env.NEXT_PUBLIC_TREE_TILES_URL} ${process.env.NEXT_PUBLIC_SUPABASE_PASSTHROUGH_URL} ${process.env.NEXT_PUBLIC_MAPTILER_BASEMAP_URL} ${process.env.NEXT_PUBLIC_MATOMO_URL} https://api.github.com https://api.maptiler.com`,
            ].join('; '),
          },
        ],
      },
    ]
  },
})
