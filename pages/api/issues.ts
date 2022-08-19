import type { NextApiRequest, NextApiResponse } from 'next'
import { csrf } from 'src/lib/api/csrf'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    switch (req.method) {
      case 'POST':
        try {
          await csrf(req, res)
          // make call to supabase using SERVICE_ROLE_KEY
          // dont expose SERVICE_ROLE_KEY to client
          res.status(201).json({ message: 'created issue' })
        } catch (error) {
          console.error(error)
          res.status(401).json({ message: 'not authorized' })
        }
        break
      default:
        res.status(404).json({ message: 'only POST method' })
        break
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'internal server error' })
  }
}
