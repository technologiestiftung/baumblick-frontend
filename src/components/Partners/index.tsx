import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'

export const Partners: FC = () => {
  const { t } = useTranslation('common')
  return (
    <div className="partners__wrapper">
      <div className="content-grid">
        <div className="partners__column-container">
          <div className="partners__column">
            <h4 className="partners__column-title">
              {t('home.partners.consortium')}
            </h4>
            <div className="partners__column__logo-list">
              <img
                src="/images/logos/logo-technologiestiftung-berlin.jpg"
                alt=""
                style={{ width: 280 }}
              />

              <img
                src="/images/logos/logo-birds-on-mars.jpg"
                alt=""
                style={{ width: 220 }}
              />

              <img src="/images/logos/logo-bezirksamt-mitte.jpg" alt="" />
            </div>
          </div>

          <div className="partners__column">
            <h4 className="partners__column-title">
              {t('home.partners.associated')}
            </h4>
            <div className="partners__column__logo-list">
              <img src="/images/logos/logo-bezirksamt-neukoelln.jpg" alt="" />

              <img
                src="/images/logos/logo-arbor-revital.jpg"
                alt=""
                style={{ width: 250 }}
              />
            </div>
          </div>

          <div className="partners__column">
            <h4 className="partners__column-title">
              {t('home.partners.funding')}
            </h4>
            <div className="partners__column__logo-list">
              <img
                src="/images/logos/logo-zug.jpg"
                alt=""
                style={{ width: 280 }}
              />

              <img src="/images/logos/logo-buns.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
