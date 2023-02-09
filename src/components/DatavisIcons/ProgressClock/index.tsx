import { FC } from 'react'
import classNames from 'classnames'
export interface ProgressClockPropType {
  progress: number
  strokeColorBackground?: string
  fillColor?: string
  className?: string
}

export const ProgressClock: FC<ProgressClockPropType> = ({
  progress,
  strokeColorBackground = '#9EA3AE',
  fillColor = '#111827',
  className,
}) => (
  <div
    className={classNames(
      'relative w-[50px] h-[50px] flex justify-center items-center',
      className
    )}
  >
    <div className="absolute z-[2] w-[25px] h-[25px] bg-white rounded-full" />
    <div
      className="absolute z-1 w-full h-full rounded-full"
      style={{
        background: `conic-gradient(${fillColor} 0deg ${
          progress * 360
        }deg, transparent ${progress * 360}deg 360deg)`,
      }}
    />
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M25 0V12.5"
        stroke={strokeColorBackground}
        strokeMiterlimit="10"
      />
      <path
        d="M7.32031 7.32031L16.1603 16.1603"
        stroke={strokeColorBackground}
        strokeMiterlimit="10"
      />
      <path
        d="M0 25H12.5"
        stroke={strokeColorBackground}
        strokeMiterlimit="10"
      />
      <path
        d="M7.32031 42.6798L16.1603 33.8398"
        stroke={strokeColorBackground}
        strokeMiterlimit="10"
      />
      <path
        d="M25 50V37.5"
        stroke={strokeColorBackground}
        strokeMiterlimit="10"
      />
      <path
        d="M42.6798 42.6798L33.8398 33.8398"
        stroke={strokeColorBackground}
        strokeMiterlimit="10"
      />
      <path
        d="M50 25H37.5"
        stroke={strokeColorBackground}
        strokeMiterlimit="10"
      />
      <path
        d="M42.6798 7.32031L33.8398 16.1603"
        stroke={strokeColorBackground}
        strokeMiterlimit="10"
      />
      <path
        d="M21.0898 0.310547L21.4798 2.78055"
        stroke={strokeColorBackground}
        strokeMiterlimit="10"
      />
      <path
        d="M17.2695 1.2207L18.0495 3.6007"
        stroke={strokeColorBackground}
        strokeMiterlimit="10"
      />
      <path
        d="M13.6504 2.7207L14.7904 4.9507"
        stroke={strokeColorBackground}
        strokeMiterlimit="10"
      />
      <path
        d="M10.3096 4.76953L11.7696 6.79953"
        stroke={strokeColorBackground}
        strokeMiterlimit="10"
      />
      <path
        d="M4.76953 10.3105L6.79953 11.7705"
        stroke={strokeColorBackground}
        strokeMiterlimit="10"
      />
      <path
        d="M2.71973 13.6504L4.94973 14.7904"
        stroke={strokeColorBackground}
        strokeMiterlimit="10"
      />
      <path
        d="M1.21973 17.2695L3.59973 18.0495"
        stroke={strokeColorBackground}
        strokeMiterlimit="10"
      />
      <path
        d="M0.30957 21.0898L2.77957 21.4798"
        stroke={strokeColorBackground}
        strokeMiterlimit="10"
      />
      <path
        d="M0.30957 28.9095L2.77957 28.5195"
        stroke={strokeColorBackground}
        strokeMiterlimit="10"
      />
      <path
        d="M1.21973 32.7292L3.59973 31.9492"
        stroke={strokeColorBackground}
        strokeMiterlimit="10"
      />
      <path
        d="M2.71973 36.3509L4.94973 35.2109"
        stroke={strokeColorBackground}
        strokeMiterlimit="10"
      />
      <path
        d="M4.76953 39.6905L6.79953 38.2305"
        stroke={strokeColorBackground}
        strokeMiterlimit="10"
      />
      <path
        d="M10.3096 45.2292L11.7696 43.1992"
        stroke={strokeColorBackground}
        strokeMiterlimit="10"
      />
      <path
        d="M13.6504 47.2808L14.7904 45.0508"
        stroke={strokeColorBackground}
        strokeMiterlimit="10"
      />
      <path
        d="M17.2695 48.7804L18.0495 46.4004"
        stroke={strokeColorBackground}
        strokeMiterlimit="10"
      />
      <path
        d="M21.0898 49.6907L21.4798 47.2207"
        stroke={strokeColorBackground}
        strokeMiterlimit="10"
      />
      <path
        d="M28.9095 49.6907L28.5195 47.2207"
        stroke={strokeColorBackground}
        strokeMiterlimit="10"
      />
      <path
        d="M32.7302 48.7804L31.9502 46.4004"
        stroke={strokeColorBackground}
        strokeMiterlimit="10"
      />
      <path
        d="M36.35 47.2808L35.21 45.0508"
        stroke={strokeColorBackground}
        strokeMiterlimit="10"
      />
      <path
        d="M39.6905 45.2292L38.2305 43.1992"
        stroke={strokeColorBackground}
        strokeMiterlimit="10"
      />
      <path
        d="M45.2302 39.6905L43.2002 38.2305"
        stroke={strokeColorBackground}
        strokeMiterlimit="10"
      />
      <path
        d="M47.2798 36.3509L45.0498 35.2109"
        stroke={strokeColorBackground}
        strokeMiterlimit="10"
      />
      <path
        d="M48.7804 32.7292L46.4004 31.9492"
        stroke={strokeColorBackground}
        strokeMiterlimit="10"
      />
      <path
        d="M49.6897 28.9095L47.2197 28.5195"
        stroke={strokeColorBackground}
        strokeMiterlimit="10"
      />
      <path
        d="M49.6897 21.0898L47.2197 21.4798"
        stroke={strokeColorBackground}
        strokeMiterlimit="10"
      />
      <path
        d="M48.7804 17.2695L46.4004 18.0495"
        stroke={strokeColorBackground}
        strokeMiterlimit="10"
      />
      <path
        d="M47.2798 13.6504L45.0498 14.7904"
        stroke={strokeColorBackground}
        strokeMiterlimit="10"
      />
      <path
        d="M45.2302 10.3105L43.2002 11.7705"
        stroke={strokeColorBackground}
        strokeMiterlimit="10"
      />
      <path
        d="M39.6905 4.76953L38.2305 6.79953"
        stroke={strokeColorBackground}
        strokeMiterlimit="10"
      />
      <path
        d="M36.35 2.7207L35.21 4.9507"
        stroke={strokeColorBackground}
        strokeMiterlimit="10"
      />
      <path
        d="M32.7302 1.2207L31.9502 3.6007"
        stroke={strokeColorBackground}
        strokeMiterlimit="10"
      />
      <path
        d="M28.9095 0.310547L28.5195 2.78055"
        stroke={strokeColorBackground}
        strokeMiterlimit="10"
      />
    </svg>
  </div>
)
