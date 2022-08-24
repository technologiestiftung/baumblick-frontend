import { createClient } from '@supabase/supabase-js'

if (process.env.NEXT_PUBLIC_SUPABASE_SDK_URL === undefined) {
  throw new Error('NEXT_PUBLIC_SUPABASE_SDK_URL is not defined')
}
if (process.env.SUPABASE_SERVICE_ROLE_KEY === undefined) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY is not defined')
}

export const supabaseServiceRoleClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_SDK_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)
