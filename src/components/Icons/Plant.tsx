import { FC, SVGProps } from 'react'

export const Plant: FC<SVGProps<SVGSVGElement>> = (props) => (
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
        d="M7 15 17 15 17 19C17 20.1045695 16.1045695 21 15 21L9 21C7.8954305 21 7 20.1045695 7 19L7 15ZM12 9C12 5.6862915 9.3137085 3 6 3L3 3 3 5C3 8.3137085 5.6862915 11 9 11L12 11M12 11C12 7.6862915 14.6862915 5 18 5L21 5 21 6C21 9.3137085 18.3137085 12 15 12L12 12"
      />
      <line
        x1="12"
        x2="12"
        y1="15"
        y2="9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </g>
  </svg>
)
