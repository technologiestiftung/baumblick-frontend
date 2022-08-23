import { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'cross-fetch'
import sql from '../_shared/_db'
//nextjs api route handler

const ml_pgrest_host = process.env.ML_PGREST_HOST
const ml_pgrest_user = process.env.ML_PGREST_USER
const ml_pgrest_password = process.env.ML_PGREST_PASSWORD
const ml_pgrest_port = process.env.ML_PGREST_PORT

function envVarError(missingVar: string): never {
  const prefix = 'Missing environment variable:'
  const msg = `${prefix} ${missingVar}`
  console.error(msg)
  throw new Error(msg)
}
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

interface LoginType {
  login: string
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    if (ml_pgrest_user === undefined) {
      envVarError('ML_PGREST_USER')
    }
    if (ml_pgrest_password === undefined) {
      envVarError('ML_PGREST_PASSWORD')
    }
    if (ml_pgrest_port === undefined) {
      envVarError('ML_PGREST_PORT')
    }
    if (ml_pgrest_host === undefined) {
      envVarError('ML_PGREST_HOST')
    }

    switch (req.method) {
      case 'POST': // for migration purpose
      case 'GET': {
        const result = await sql<
          LoginType[]
        >`SELECT api.login(${ml_pgrest_user}, ${ml_pgrest_password})`

        if (result.length === 0) {
          return res.status(401).json({ error: 'Unauthorized' })
        }
        const token = result[0].login.substring(1, result[0].login.length - 1)
        if (!req.url) {
          return res.status(400).json({ error: 'Missing url' })
        }

        let url = new URL(
          req.url,
          `http://${req.headers.host ? req.headers.host : 'localhost'}`
        )

        const { searchParams } = url

        switch (url.pathname.replace('/api/ml-api-passthrough', '')) {
          case '/trees': {
            if (!searchParams.has('gml_id')) {
              return res
                .status(400)
                .json({ error: 'Missing gml_id search parameter' })
            }
            break
          }
          case '/forecast':
          case '/nowcast': {
            if (!searchParams.has('baum_id')) {
              return res
                .status(400)
                .json({ error: 'Missing baum_id search parameter' })
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
          headers: { Authorization: `Bearer ${token}` },
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
            return res.status(400).json({ paths })
          }
        }

        return res.status(req.method === 'POST' ? 201 : 200).json({ json })
      }
      default:
        return res.status(404).json({ error: 'only POST method' })
    }
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'internal server error', err })
  }
}
