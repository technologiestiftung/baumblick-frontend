import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'
import { Button } from '@components/Button'
import { QTrees, Github } from '@components/Icons'
import { ContentGrid, GridDefault } from '@components/ContentGrid'

export const Outro: FC = () => {
  const { t } = useTranslation('common')
  return (
    <div className="bg-orange py-[5.625rem] screen1200:py-[20vh]">
      <ContentGrid>
        <GridDefault>
          <h2 className="font-sans text-2xl font-normal tracking-normal text-left mb-4">
            {t('home.outro.headline')}
          </h2>

          <p className="mb-4 font-serif text-base font-normal tracking-normal">
            {t('home.outro.text.1')}
          </p>

          <Button
            primary
            href="https://github.com/technologiestiftung/baumblick-frontend/"
            className="w-full mb-12"
          >
            <Github className="text-gray-400" />
            {t('home.cta.github')}
          </Button>

          <p className="mb-4 font-serif text-base font-normal tracking-normal">
            {t('home.outro.text.2')}
          </p>

          <Button primary href="https://qtrees.ai/" className="w-full">
            <QTrees className="text-gray-400" />
            {t('home.cta.project')}
          </Button>
        </GridDefault>
      </ContentGrid>
    </div>
  )
}
