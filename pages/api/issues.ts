import type { NextApiRequest, NextApiResponse } from 'next'
import { csrf } from 'src/lib/api/csrf'
import { envVarError } from './_shared/_env-var-error'
import { createClient } from './_shared/_postgrest'

const ml_pgrest_username = process.env.ML_PGREST_USER
const ml_pgrest_pass = process.env.ML_PGREST_PASSWORD
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    if (ml_pgrest_username === undefined) {
      envVarError('ML_PGREST_USER')
    }
    if (ml_pgrest_pass === undefined) {
      envVarError('ML_PGREST_PASSWORD')
    }
    const postgrest = createClient()

    switch (req.method) {
      case 'POST': {
        try {
          await csrf(req, res)
        } catch (csrfError) {
          return res.status(401).json({ error: 'not authorized' })
        }
        const body = req.body as Record<string, unknown>

        if (
          'issue_type_id' in body &&
          typeof body.issue_type_id === 'number' &&
          'tree_id' in body &&
          typeof body.tree_id === 'string'
        ) {
          // should make a call to login and get a token
          // with that token cunstruct a new authenticated client
          // and make a request with that to post an issue

          const { data: login, error: loginError } = await postgrest.rpc<
            'login',
            {
              Args: { username: string; pass: string }
              Returns: { token: string }
            }
          >('login', {
            username: ml_pgrest_username,
            pass: ml_pgrest_pass,
          })

          if (loginError) {
            return res.status(401).json({ error: 'internal server error' })
          }
          if (!login) {
            return res.status(401).json({ error: 'login failed' })
          }
          const { tree_id, issue_type_id } = body
          const authPostgrest = createClient(login[0].token)

          const { data: issues, error: issuesError } = await authPostgrest
            .from('issues')
            .insert([{ issue_type_id, tree_id: tree_id }])
          if (issuesError) {
            return res.status(400).json({ error: issuesError })
          }
          return res.status(201).json({ data: issues })
        } else {
          return res.status(400).json({
            error:
              'body is missing `tree_id` of type `string` or `issue_type_id` of type `number`',
          })
        }
      }
      default:
        return res.status(404).json({ error: 'only POST method' })
    }
  } catch (err: unknown) {
    console.error(err)
    if (err instanceof Error) {
      return res
        .status(500)
        .json({ message: 'internal server error', error: err.message })
    } else {
      return res.status(500).json({ error: 'internal server error' })
    }
  }
}
