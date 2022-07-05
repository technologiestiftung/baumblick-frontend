import { FC, SVGProps } from 'react'

export const Home: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    {...props}
  >
    <g fill="none" fillRule="evenodd">
      <polyline
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        points="5 12 3 12 12 3 21 12 19 12"
        vectorEffect="non-scaling-stroke"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5,12 L5,19 C5,20.1045695 5.8954305,21 7,21 L17,21 C18.1045695,21 19,20.1045695 19,19 L19,12"
        vectorEffect="non-scaling-stroke"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9,21 L9,15 C9,13.8954305 9.8954305,13 11,13 L13,13 C14.1045695,13 15,13.8954305 15,15 L15,21"
        vectorEffect="non-scaling-stroke"
      />
    </g>
  </svg>
)
