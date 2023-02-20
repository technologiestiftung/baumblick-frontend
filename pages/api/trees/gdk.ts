import type { NextApiRequest, NextApiResponse } from 'next'

const SUPABASE_GDK_ANON_KEY = process.env.SUPABASE_GDK_ANON_KEY
const SUPABASE_GDK_API_URL = process.env.SUPABASE_GDK_API_URL
/**
 * Small wrapper to fetch the primary key id
 * from the giessdenkiez.de database API by looking it up
 * based on the gmlid used in qtree.
 * Used to create a link in the UI to direct users to the right tree
 * in the giessdenkiez.de.
 *
 * FInal link in giessdenkiez.de looks like this:
 * `https://www.giessdenkiez.de/tree/_1234567`
 * @example
 * fetch('/api/trees/gdk?gmlid=00008100:000be766')
 * // returns { data: [{ id: "_1234567", gmlid: '00008100:000be766' }] }
 * @example
 * $ curl "http://localhost:3000/api/trees/gdk?gmlid=00008100:000be766"
 * > { "data": [{ "id": "_1234567", "gmlid": "00008100:000be766" }] }
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (!SUPABASE_GDK_ANON_KEY) {
    const error = new Error('env var SUPABASE_GDK_ANON_KEY is missing')
    console.error(error)
    return res.status(500).json({ error })
  }
  if (!SUPABASE_GDK_API_URL) {
    const error = new Error('env var SUPABASE_GDK_API_URL is missing')
    console.error(error)
    return res.status(500).json({ error })
  }
  if (req.url === undefined) {
    const error = new Error('url is missing on req')
    console.error(error)
    return res.status(500).json({ error })
  }
  const url = new URL(
    req.url,
    `http://${req.headers.host ? req.headers.host : 'localhost'}`
  )

  const { searchParams } = url
  if (!searchParams.has('gmlid')) {
    return res.status(400).json({ error: 'Missing gmlid search parameter' })
  }
  switch (req.method) {
    case 'GET': {
      const response = await fetch(
        `${SUPABASE_GDK_API_URL}/rest/v1/trees?gmlid=eq.${
          searchParams.get('gmlid') as string
        }&select=id,gmlid`,
        {
          method: 'GET',
          headers: {
            apikey: SUPABASE_GDK_ANON_KEY,
            'Content-Type': 'application/json',
          },
        }
      )
      if (!response.ok) {
        const err = await response.text()
        return res.status(500).json({ error: `internal server error. ${err}` })
      }
      const data = (await response.json()) as Record<string, unknown>
      if (!data) {
        return res.status(500).json({ error: 'internal server error' })
      }
      return res.status(200).json({ data })
    }
    default: {
      return res.status(404).json({ error: 'only GET method allowed' })
    }
  }
}
