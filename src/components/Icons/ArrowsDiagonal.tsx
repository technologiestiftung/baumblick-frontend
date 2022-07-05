import { FC, SVGProps } from 'react'

export const ArrowsDiagonal: FC<SVGProps<SVGSVGElement>> = (props) => (
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
        points="16 4 20 4 20 8"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1="14"
        x2="20"
        y1="10"
        y2="4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      <polyline
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        points="8 20 4 20 4 16"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1="4"
        x2="10"
        y1="20"
        y2="14"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </g>
  </svg>
)
