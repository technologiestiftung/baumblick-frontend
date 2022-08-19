import { FC } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import csrf from '@lib/api/csrf'
import classNames from 'classnames'

type CsrfTokenType = string

export const getServerSideProps: GetServerSideProps<{
  csrfToken: CsrfTokenType
}> = async ({ req, res }) => {
  await csrf(req, res)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const csrfToken = req.csrfToken() as CsrfTokenType
  return {
    props: { csrfToken },
  }
}

export const Issues: FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ csrfToken }) => {
  const apiRequest: (withHeader: boolean) => void = (withHeader = true) => {
    fetch('http://localhost:3000/api/issues', {
      method: 'POST',
      body: JSON.stringify({ test: 'test' }),
      headers: withHeader ? { 'CSRF-Token': csrfToken } : undefined,
    })
      .then((response) => {
        if (response.ok) {
          console.log('success')
          return response.json()
        }
        throw response.json()
      })
      .then((json) => {
        console.log(json)
      })
      .catch((error) => {
        console.log(error)
      })
    // axios
    //   .post(
    //     'http://localhost:3000/api/hello',
    //     {},
    //   )
    //   .then((res) => alert(`Hi ${res.data.name}`))
    //   .catch(() => alert('Not protected'))
  }
  return (
    <div>
      <h1>Issues</h1>
      <pre>
        <code>{JSON.stringify(csrfToken)}</code>
      </pre>
      <button
        className={classNames(
          'flex items-center pt-3 text-left w-full',
          'hover:bg-gray-100 rounded transition px-4 -ml-4',
          'group focus:outline-none focus:ring-2 focus:ring-gray-800',
          'focus:ring-gray-800 focus:z-10 relative'
        )}
        onClick={() => apiRequest(true)}
        type="button"
      >
        Dummy Call With CSRF Header
      </button>
      <button
        className={classNames(
          'flex items-center pt-3 text-left w-full',
          'hover:bg-gray-100 rounded transition px-4 -ml-4',
          'group focus:outline-none focus:ring-2 focus:ring-gray-800',
          'focus:ring-gray-800 focus:z-10 relative'
        )}
        onClick={() => apiRequest(false)}
        type="button"
      >
        Dummy Call Without CSRF Header
      </button>
    </div>
  )
}

export default Issues
