import { FC, SVGProps } from 'react'

export const WateringCan: FC<SVGProps<SVGSVGElement>> = (props) => (
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
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        d="M6.2921304,8.78353869 L13.2921314,8.79042652 C13.8440307,8.79195403 14.2911464,9.23950997 14.2921309,9.79141049 L14.2921309,16.7914105 C14.2921309,17.3436952 13.8444156,17.7914105 13.2921309,17.7914105 L6.29213088,17.7914105 C5.73984613,17.7914105 5.29213088,17.3436952 5.29213088,16.7914105 L5.29213088,9.78255471 C5.29114739,9.23026996 5.73886264,8.78255471 6.29114739,8.78255471 C6.29147538,8.78255471 6.29180337,8.78255487 6.2921304,8.78353869 Z"
        transform="rotate(45 9.792 13.287)"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        d="M13.0068796,6.55490769 C12.6217851,4.29626477 11.0165434,2.60218773 9.09476339,2.60218773 C6.8856244,2.60218773 5.09476339,4.84076398 5.09476339,7.60218773 C5.09476339,10.3636115 6.8856244,12.6021877 9.09476339,12.6021877"
        transform="rotate(45 9.05 7.602)"
      />
      <polyline
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        points="13.325 16.119 20.396 16.119 22.529 13.985 22.517 18.24 20.396 16.119"
      />
    </g>
  </svg>
)
