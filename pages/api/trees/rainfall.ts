import type { NextApiRequest, NextApiResponse } from 'next'
import sql from '../_shared/_db'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
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
        if (!searchParams.has('gml_id')) {
          return res
            .status(400)
            .json({ error: 'Missing gml_id search parameter' })
        }

        const result = await sql`SELECT
				jsonb_build_object(
				'type', 'Feature',
				'geometry',  ST_AsGeoJSON(grouped.geom)::jsonb,
				'properties', to_jsonb(grouped.*) - 'geom'
				) as geojson,
				grouped.weekday,
				grouped.daily_rainfall_sum_mm
			FROM (
				SELECT
					geometry AS geom,
					date_trunc('day', timestamp)::date AS weekday,
					sum(rainfall_mm) AS daily_rainfall_sum_mm
				FROM
					qtrees.api.radolan
				GROUP BY
					geometry,
					weekday) AS grouped
			WHERE ((weekday >= date_trunc('week', CURRENT_TIMESTAMP - INTERVAL '2 week')::date)
				and(weekday < date_trunc('week', CURRENT_TIMESTAMP)))
			AND ST_Contains(grouped.geom, (
					SELECT
						geometry FROM api.trees
					WHERE
						gml_id = ${searchParams.get('gml_id')}))
					ORDER BY weekday DESC
						;

					`

        return res.status(200).json({ result })
      }
      default:
        return res
          .status(404)
          .json({ error: 'only GET method with gml_id search parameter' })
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
