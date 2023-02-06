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
            .select('tree_is,rainfall_in_mm')
            .eq('tree_id', searchParams.get('tree_id') as string)
        if (rainfall_mat_error) {
          throw new Error(rainfall_mat_error.message)
        }
        if (!rainfall_mat) {
          throw new Error('data is undefined')
        }

        // const { data: rainfalls, error } = await postgrest.rpc('rainfall', {
        //   tree_id: searchParams.get('tree_id') as string,
        // })
        // if (error) {
        //   throw new Error(error.message)
        // }
        // if (!rainfalls) {
        //   throw new Error('data is undefined')
        // }
        // const initialValue = 0
        // const sum: number = rainfalls
        //   /**
        //    * @hint types generate via postgrest are wrong on this fnction.
        //    * The return value of a rpc is alrready an array of objects
        //    * so we need to remove the aditional array in the function return value
        //    */
        //   .map((item) => item.rainfall_in_mm)
        //   .reduce((prev: number, curr: number) => prev + curr, initialValue)
        // console.log(rainfall_mat, sum)
        return res
          .status(200)
          .json({ data: { sum_rainfall_in_mm: rainfall_mat[0] } })
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
