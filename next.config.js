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
})

function testEnvVars() {
  console.info(
    'NEXT_PUBLIC_SUPABASE_SDK_URL',
    process.env.NEXT_PUBLIC_SUPABASE_SDK_URL
  )
}

testEnvVars()
