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

        const { data: rainfall_mat, error: rainfall_mat_error } =
          await postgrest
            .from('rainfall')
            .select('tree_id,rainfall_in_mm')
            .eq('tree_id', searchParams.get('tree_id') as string)
        if (rainfall_mat_error) {
          throw new Error(rainfall_mat_error.message)
        }
        if (!rainfall_mat) {
          throw new Error('data is undefined')
        }

        // currently there are no type definitions for the materialized view
        // that's why we just ignore the unsafe assignment for now
        // and type it ourselves
        const rainData = rainfall_mat as {
          tree_id: string
          rainfall_in_mm: number
        }[]
        return res.status(200).json({
          data: { sum_rainfall_in_mm: rainData[0].rainfall_in_mm },
        })
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
