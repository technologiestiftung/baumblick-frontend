import { FC, SVGProps } from 'react'

export const ArrowsDiagonalMinimize2: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    {...props}
  >
    <g fill="none" fillRule="evenodd">
      <polygon points="0 0 24 0 24 24 0 24" />
      <polyline
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        points="18 10 14 10 14 6"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1="20"
        x2="14"
        y1="4"
        y2="10"
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
        points="6 14 10 14 10 18"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1="10"
        x2="4"
        y1="14"
        y2="20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </g>
  </svg>
)
