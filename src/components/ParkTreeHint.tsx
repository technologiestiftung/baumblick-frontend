import classNames from 'classnames'
import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'
import colors from 'src/style/colors'
import { RootsIllustration } from './RootsIllustration'

const HorizontalLine: FC<{ className?: string }> = ({ className }) => (
  <hr
    className={classNames(className, 'bg-gray-400 w-full h-px border-0 z-10')}
  />
)

export const ParkTreeHint: FC = () => {
  const { t } = useTranslation('common')

  return (
    <div className={classNames('bg-gray-300', 'h-60', 'z-10', 'relative')}>
      <div
        className={classNames(
          'absolute top-0',
          'w-full h-full',
          'flex justify-center'
        )}
      >
        <RootsIllustration
          color={colors.gray[200]}
          additionalClasses={classNames(
            'flex-shrink-0',
            'w-auto h-5/6',
            'mix-blend-multiply'
          )}
        />
      </div>
      <HorizontalLine className="absolute top-1/3" />
      <HorizontalLine className="absolute top-2/3" />
      <div
        className={classNames(
          'w-full h-full',
          'pt-8 pb-0',
          'flex items-end justify-center'
        )}
      >
        <p
          className={classNames(
            'w-full',
            'px-8 pt-6 pb-5',
            'bg-gray-100 rounded-t-2xl',
            'font-semibold leading-snug text-sm',
            'z-20'
          )}
        >
          {t('treeView.parkTreeHint')}
        </p>
      </div>
    </div>
  )
}
