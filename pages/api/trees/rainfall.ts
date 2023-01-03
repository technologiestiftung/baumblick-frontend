import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '../_shared/_postgrest'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const postgrest = createClient()
    switch (req.method) {
      case 'GET': {
        if (req.url === undefined) {
          throw new Error('url is missing on req')
        }
        const url = new URL(
          req.url,
          `http://${req.headers.host ? req.headers.host : 'localhost'}`
        )

        const { searchParams } = url
        if (!searchParams.has('id')) {
          return res.status(400).json({ error: 'Missing id search parameter' })
        }
        // TODO: Test rainfall function once it is implemented in the database
        const { data: rainfalls, error } = await postgrest.rpc('rainfall', {
          id: searchParams.get('id') as string,
        })
        if (error) {
          throw new Error(error.message)
        }
        if (!rainfalls) {
          throw new Error('data is undefined')
        }

        const initialValue = 0
        // TODO: This might fail due to typing
        const sum = rainfalls[0]
          .map((item) => item.rainfall_in_mm)
          .reduce((prev, curr) => prev + curr, initialValue)

        return res
          .status(200)
          .json({ data: { table: rainfalls, sum_rainfall_in_mm: sum } })
      }
      default:
        return res
          .status(404)
          .json({ error: 'only GET method with id search parameter' })
    }
  } catch (error: unknown) {
    const statusCode = 500
    const defaultMessage = 'internal server error'

    if (error instanceof Error) {
      return res
        .status(statusCode)
        .json({ message: defaultMessage, error: error.message })
    } else {
      if (process.env.NODE_ENV === 'development') {
        console.error(error)
      }
      return res.status(statusCode).json({ error: defaultMessage })
    }
  }
}
