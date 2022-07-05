import { FC, SVGProps } from 'react'

export const Map: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    {...props}
  >
    <g fill="none" fillRule="evenodd">
      <line
        x1="18"
        x2="18"
        y1="6"
        y2="6.01"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        d="M18,13 L14.5,8 C13.5691113,6.31751904 13.9670613,4.21075329 15.4475254,2.98375617 C16.9279895,1.75675905 19.0720105,1.75675905 20.5524746,2.98375617 C22.0329387,4.21075329 22.4308887,6.31751904 21.5,8 L18,13"
      />
      <polyline
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        points="10.5 4.75 9 4 3 7 3 20 9 17 15 20 21 17 21 15"
      />
      <line
        x1="9"
        x2="9"
        y1="4"
        y2="17"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1="15"
        x2="15"
        y1="15"
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
