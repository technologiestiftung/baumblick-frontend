import { FC, SVGProps } from 'react'

export const Plus: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    {...props}
  >
    <g fill="none" fillRule="evenodd">
      <polygon points="0 0 24 0 24 24 0 24" />
      <line
        x1="12"
        x2="12"
        y1="5"
        y2="19"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1="5"
        x2="19"
        y1="12"
        y2="12"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </g>
  </svg>
)
