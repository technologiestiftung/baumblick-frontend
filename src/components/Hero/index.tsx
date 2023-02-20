import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'
import classNames from 'classnames'
import { Button } from '@components/Button'

export const Hero: FC = () => {
  const { t } = useTranslation('common')

  return (
    <div
      className={classNames(
        'w-full h-[calc(100vh-4rem)] px-8 pt-4 pb-3 md:pb-12',
        'bg-orange',
        'grid grid-cols-12 gap-y-4 sm:gap-x-8'
      )}
    >
      <img
        className={classNames(
          'col-span-12 sm:col-span-6',
          'w-full h-full object-scale-down'
        )}
        src="/images/hero-illustration.svg"
        alt=""
        aria-hidden={true}
      />

      <div
        className={classNames(
          'col-span-12 sm:col-span-6 lg:col-span-4',
          'font-sans font-semibold text-gray-900',
          'flex items-center'
        )}
      >
        <div>
          <h1 className="text-4xl lg:text-5xl font-bold">
            {t('home.hero.title')}
          </h1>
          <p className="mt-3 lg:mt-4">{t('home.hero.text')}</p>
          <div
            className={classNames(
              'mt-5 md:mt-6 lg:mt-8',
              'flex flex-wrap gap-y-2.5 gap-x-4'
            )}
          >
            <Button href="/trees" primary className="w-full md:w-auto">
              {t('home.cta.findTree')}
            </Button>
            <Button href="#end-of-intro" className="w-full md:w-auto">
              {t('home.cta.learnMore')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
