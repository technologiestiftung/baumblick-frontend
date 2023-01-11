import type { NextApiRequest, NextApiResponse } from 'next'
import { csrf } from 'src/lib/api/csrf'
import { envVarError } from './_shared/env-var-error'
import { createClient } from './_shared/postgrest'

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

          const { data: loginData, error: loginError } = await postgrest.rpc(
            'login',
            {
              username: ml_pgrest_username,
              pass: ml_pgrest_pass,
            }
          )

          if (loginError) {
            return res.status(401).json({ error: 'internal server error' })
          }
          if (!loginData) {
            return res.status(401).json({ error: 'login failed' })
          }

          const { tree_id, issue_type_id } = body

          //TODO: [QTREES-445] Improve types for postgrest-js. Typings for rpc function tell us that we get an array {token: string}[] but we get an object {token: string}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const authenticatedPostgrest = createClient(loginData.token)

          const { data: issues, error: issuesError } =
            await authenticatedPostgrest
              .from('issues')
              .insert([{ issue_type_id, tree_id: tree_id }])
              .select()
          if (issuesError) {
            console.error(issuesError)
            return res.status(400).json({ error: issuesError })
          }
          if (!issues) {
            return res.status(400).json({ error: 'no issues' })
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
