import { createClient } from '@supabase/supabase-js'

if (process.env.SUPABASE_URL === undefined) {
  throw new Error('SUPABASE_URL is not defined')
}
if (process.env.SUPABASE_SERVICE_ROLE_KEY === undefined) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY is not defined')
}

export const supabaseServiceRoleClient = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)
