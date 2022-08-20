import csurf from 'csurf'
import type { RequestHandler } from 'express'
// import type { NextApiRequest, NextApiResponse } from 'next'

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export function csrf(req: any, res: any): Promise<unknown> {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const middleware: RequestHandler = csurf({
      cookie: { httpOnly: true, sameSite: true, key: '_csurf_treewatch' },
    })
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    middleware(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}

export default csrf
// import Tokens from 'csrf'

// const options = {}
// const token = new Tokens(options)
// export const csurfer = {}
// export default csurfer
