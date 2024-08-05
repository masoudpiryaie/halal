import React, {FC, createContext, useContext} from 'react'
import {IntlProvider, LocalizationProvider, loadMessages} from '@progress/kendo-react-intl'
import faMessages from '_metronic/i18n/messages/fa.kendo.json'
import {Helmet} from 'react-helmet'

loadMessages(faMessages, 'fa-IR')

const I18N_CONFIG_KEY = process.env.REACT_APP_I18N_CONFIG_KEY || 'i18nConfig'

type Props = {
  selectedLang: 'fa' | 'en'
}
const initialState: Props = {
  selectedLang: 'fa',
}

function getConfig(): Props {
  const ls = localStorage.getItem(I18N_CONFIG_KEY)
  if (ls) {
    try {
      return JSON.parse(ls) as Props
    } catch (er) {
      console.error(er)
    }
  }
  return initialState
}

// Side effect
export function setLanguage(lang: string) {
  localStorage.setItem(I18N_CONFIG_KEY, JSON.stringify({selectedLang: lang}))
  window.location.reload()
}

const I18nContext = createContext<Props>(initialState)

const useLang = () => {
  return useContext(I18nContext).selectedLang
}

const MetronicI18nProvider: FC = ({children}) => {
  const lang = getConfig()
  return (
    <I18nContext.Provider value={lang}>
      {/* <Helmet>
        {lang.selectedLang === 'fa' && <link rel='stylesheet' href='/media/css/style.rtl.css' />}
        {lang.selectedLang === 'en' && <link rel='stylesheet' href='/media/css/style.css' />}
      </Helmet> */}
      <LocalizationProvider language={lang.selectedLang === 'fa' ? 'fa-IR' : 'en-US'}>
        <IntlProvider locale={lang.selectedLang}>{children}</IntlProvider>
      </LocalizationProvider>
    </I18nContext.Provider>
  )
}

export {MetronicI18nProvider, useLang}
