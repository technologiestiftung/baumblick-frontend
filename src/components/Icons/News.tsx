import { FC, SVGProps } from 'react'

export const News: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    {...props}
  >
    <g fill="none" fillRule="evenodd">
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        d="M16,6 L19,6 C19.5522847,6 20,6.44771525 20,7 L20,18 C20,19.1045695 19.1045695,20 18,20 C16.8954305,20 16,19.1045695 16,18 L16,5 C16,4.44771525 15.5522847,4 15,4 L5,4 C4.44771525,4 4,4.44771525 4,5 L4,17 C4,18.6568542 5.34314575,20 7,20 L18,20"
      />
      <line
        x1="8"
        x2="12"
        y1="8"
        y2="8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1="8"
        x2="12"
        y1="12"
        y2="12"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1="8"
        x2="12"
        y1="16"
        y2="16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </g>
  </svg>
)
