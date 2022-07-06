import { FC, SVGProps } from 'react'

export const ArrowDownLeft: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    {...props}
  >
    <g fill="none" fillRule="evenodd">
      <line
        x1="17"
        x2="7"
        y1="7"
        y2="17"
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
        points="16 17 7 17 7 8"
        vectorEffect="non-scaling-stroke"
      />
    </g>
  </svg>
)
