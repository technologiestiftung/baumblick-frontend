import '../src/style/global.css'
import I18nProvider from 'next-translate/I18nProvider'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import commoDE from '../locales/de/common.json'

export const decorators = [(Story) => translateDecorator(Story)]

const translateDecorator = (Story) => {
  return (
    <I18nProvider lang={'de'} namespaces={{ common: commoDE }}>
      <Story />
    </I18nProvider>
  )
}

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
    path: '/',
    asPath: '/',
    query: {},
    push() {},
    replace() {},
  },
}
