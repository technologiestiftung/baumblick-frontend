import { Database } from '@lib/types/database'
import { PostgrestClient } from '@supabase/postgrest-js'
import { envVarError } from './_env-var-error'
const ml_pgrest_host = process.env.ML_PGREST_HOST
const ml_pgrest_port = process.env.ML_PGREST_PORT

export function createClient(
  token?: string
): PostgrestClient<Database, 'public', Database['public']> {
  if (ml_pgrest_port === undefined) {
    envVarError('ML_PGREST_PORT')
  }
  if (ml_pgrest_host === undefined) {
    envVarError('ML_PGREST_HOST')
  }
  if (token === undefined) {
    return new PostgrestClient(`${ml_pgrest_host}:${ml_pgrest_port}`)
  }
  return new PostgrestClient(`${ml_pgrest_host}:${ml_pgrest_port}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

// export const postgrest = new PostgrestClient(
//   `${ml_pgrest_host}:${ml_pgrest_port}`
// )
