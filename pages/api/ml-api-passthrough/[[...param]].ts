import { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'cross-fetch'
import { envVarError } from '../_shared/_env-var-error'

const ml_pgrest_host = process.env.ML_PGREST_HOST
const ml_pgrest_port = process.env.ML_PGREST_PORT

export function setLimit(url: URL, amount: number): URL {
  const limit = url.searchParams.get('limit')
  if (limit) {
    if (parseInt(limit, 10) > amount) {
      url.searchParams.set('limit', `${amount}`)
    }
  } else {
    url.searchParams.set('limit', `${amount}`)
  }
  return url
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    if (ml_pgrest_port === undefined) {
      envVarError('ML_PGREST_PORT')
    }
    if (ml_pgrest_host === undefined) {
      envVarError('ML_PGREST_HOST')
    }

    switch (req.method) {
      case 'POST': // for migration purpose
      case 'GET': {
        if (!req.url) {
          return res.status(500).json({ error: 'Missing url in request' })
        }

        let url = new URL(
          req.url,
          `http://${req.headers.host ? req.headers.host : 'localhost'}`
        )

        const { searchParams } = url

        switch (url.pathname.replace('/api/ml-api-passthrough', '')) {
          case '/trees': {
            if (!searchParams.has('id')) {
              return res
                .status(400)
                .json({ error: 'Missing id search parameter' })
            }
            break
          }
          case '/forecast':
          case '/nowcast': {
            if (!searchParams.has('tree_id')) {
              return res
                .status(400)
                .json({ error: 'Missing tree_id search parameter' })
            }
            break
          }

          default: {
            break
          }
        }
        url = setLimit(url, 100_000)
        const targetUrl = `${ml_pgrest_host}:${ml_pgrest_port}${url.pathname.replace(
          '/api/ml-api-passthrough',
          ''
        )}${url.search}`
        const response = await fetch(targetUrl, {
          headers: {
            ContenType: 'application/json',
          },
        })

        if (!response.ok) {
          const message = await response.text()
          console.error(
            `Error fetching ${ml_pgrest_host}:${ml_pgrest_port} status: ${response.status} message: ${message}`
          )

          throw new Error(message)
        }
        const json = (await response.json()) as unknown
        if (url.pathname === '/') {
          const paths = Object.keys((json as { paths: string[] }).paths).filter(
            (p) => p !== '/' && p !== '/rpc/login'
          )
          if (!paths.includes(url.pathname)) {
            return res.status(404).json({ error: 'not found', message: paths })
          }
        }

        return res
          .status(req.method === 'POST' ? 201 : 200)
          .json({ data: json })
      }
      default:
        return res.status(404).json({ error: 'only POST method' })
    }
  } catch (err: unknown) {
    if (process.env.NODE_ENV !== 'production') console.error(err)
    if (err instanceof Error) {
      return res
        .status(500)
        .json({ message: 'internal server error', error: err.message })
    } else {
      return res.status(500).json({ error: 'internal server error' })
    }
  }
}
