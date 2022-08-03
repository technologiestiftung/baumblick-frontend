import ErrorPage from '@components/ErrorPage'
import { FC } from 'react'

export const FourOFour: FC = () => (
  <ErrorPage statusCode={404} message="Diese Seite wurde nicht gefunden" />
)

export default FourOFour
