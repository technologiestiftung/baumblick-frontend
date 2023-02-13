import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'
import classNames from 'classnames'

export const Hero: FC = () => {
  const { t } = useTranslation('common')
  return (
    <div
      className={classNames(
        'w-full h-screen grid grid-rows-[auto min-content] gap-0 bg-orange',
        'screen1200:grid-rows-[auto] screen1200:grid-cols-[1fr_1fr] screen1200:gap-6 screen1200:px-14',
        'screen1440:gap-8'
      )}
    >
      <div className="w-full overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src="/images/hero-image-1200px.png"
          alt=""
          aria-hidden={true}
        />
      </div>

      <div
        className={classNames(
          'font-sans font-semibold text-gray-900',
          'mt-2 mx-4 flex flex-col justify-center items-start pb-16'
        )}
      >
        <div>
          <h1 className="text-4xl mb-2">{t('home.hero.title')}</h1>
          <p className="text-base mb-20">{t('home.hero.text')}</p>
        </div>
      </div>
    </div>
  )
}
