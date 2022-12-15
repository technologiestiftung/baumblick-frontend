import type { NextApiRequest, NextApiResponse } from 'next'
import { csrf } from 'src/lib/api/csrf'
import { supabaseServiceRoleClient } from './_shared/_supabase-service-role-client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
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
          'id' in body &&
          typeof body.id === 'string'
        ) {
          const { id, issue_type_id } = body
          // make call to supabase using SERVICE_ROLE_KEY
          // dont expose SERVICE_ROLE_KEY to client
          const { data: issues, error: issuesError } =
            await supabaseServiceRoleClient
              .from('issues')

              .insert([{ issue_type_id, id }])
          if (issuesError) {
            return res.status(400).json({ error: issuesError })
          }
          return res.status(201).json({ data: issues })
        } else {
          return res.status(400).json({
            error:
              'body is missing `id` of type `string` or `issue_type_id` of type `number`',
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
