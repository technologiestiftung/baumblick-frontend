import type { NextApiRequest, NextApiResponse } from 'next'
import { csrf } from 'src/lib/api/csrf'
import { supabaseServiceRoleClient } from './_supabase-service-role-client'

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
          'gml_id' in body &&
          typeof body.gml_id === 'string'
        ) {
          const { gml_id, issue_type_id } = body
          // make call to supabase using SERVICE_ROLE_KEY
          // dont expose SERVICE_ROLE_KEY to client
          const { data: issues, error: issuesError } =
            await supabaseServiceRoleClient
              .from('issues')

              .insert([{ issue_type_id, gml_id }])
          if (issuesError) {
            return res.status(400).json({ error: issuesError })
          }
          return res.status(201).json({ issues })
        } else {
          return res.status(400).json({
            error:
              'body is missing `gml_id` of type `string` or `issue_type_id` of type `number`',
          })
        }
      }
      default:
        return res.status(404).json({ error: 'only POST method' })
    }
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'internal server error' })
  }
}
