import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'
import { Button } from '@components/Button'
import { QTrees, Github } from '@components/Icons'

export const Outro: FC = () => {
  const { t } = useTranslation('common')
  return (
    <div className="outro__wrapper">
      <div className="content-grid">
        <div className="content-grid__default">
          <h2 className="text__h2--home">{t('home.outro.headline')}</h2>

          <p className="outro__text text-copy--home">
            {t('home.outro.text.1')}
          </p>

          <Button primary className="w-full mb-12">
            <Github className="text-gray-400" />
            {t('home.cta.github')}
          </Button>

          <p className="outro__text text-copy--home">
            {t('home.outro.text.2')}
          </p>

          <Button primary className="w-full">
            <QTrees className="text-gray-400" />
            {t('home.cta.project')}
          </Button>
        </div>
      </div>
    </div>
  )
}
