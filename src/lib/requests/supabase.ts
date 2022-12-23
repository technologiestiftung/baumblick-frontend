import { createClient } from '@supabase/supabase-js'

/**
 * @deprecated
 */
export const getSupabaseCredentials = (): {
  url: string
  key: string
} => ({
  url: (
    process.env.NEXT_PUBLIC_SUPABASE_SDK_URL ||
    'https://your_supabase_url.supabase.co'
  ).toLowerCase(),
  key:
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    'eyJKhbGciOisJIUzI1Nd2iIsInR5cCsI6',
})

const { url, key } = getSupabaseCredentials()
const supabase = createClient(url, key)
/**
 * @deprecated
 */
export { supabase }
