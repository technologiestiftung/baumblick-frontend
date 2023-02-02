import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '../_shared/postgrest'

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
        if (!searchParams.has('tree_id')) {
          return res
            .status(400)
            .json({ error: 'Missing tree_id search parameter' })
        }
        // TODO: Test rainfall function once it is implemented in the database
        const { data: rainfalls, error } = await postgrest.rpc('rainfall', {
          tree_id: searchParams.get('tree_id') as string,
        })
        if (error) {
          throw new Error(error.message)
        }
        if (!rainfalls) {
          throw new Error('data is undefined')
        }
        const initialValue = 0
        const sum: number = rainfalls
          .map((item) => item.rainfall_in_mm)
          .reduce((prev: number, curr: number) => prev + curr, initialValue)

        return res.status(200).json({ data: { sum_rainfall_in_mm: sum } })
      }
      default:
        return res
          .status(404)
          .json({ error: 'only GET method with tree_id search parameter' })
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
