import ReactDOM from 'react-dom'
// Redux
// https://github.com/rt2zz/redux-persist
import {Provider} from 'react-redux'
import * as _redux from './setup'
import store from './setup/redux/Store'
// Axios
import axios from 'axios'
import {Chart, registerables} from 'chart.js'

// Apps
import {App} from './app/App'
import {MetronicI18nProvider} from './_metronic/i18n/Metronici18n'

import {ToastContainer} from 'react-toastify'
/**
 * TIP: Replace this style import with dark styles to enable dark mode
 *
 * import './_metronic/assets/sass/style.dark.scss'
 *
 * TIP: Replace this style import with rtl styles to enable rtl mode
 *
 * import './_metronic/assets/css/style.rtl.css'
 **/
import '@progress/kendo-theme-bootstrap/dist/all.css'
import './_metronic/assets/css/style.rtl.css'
import './_metronic/assets/sass/style.react.scss'
import 'react-toastify/dist/ReactToastify.css'
import './styles.css'

import faDateFields from 'cldr-dates-full/main/fa/dateFields.json'
import faGregorian from 'cldr-dates-full/main/fa/ca-gregorian.json'
import faGeneric from 'cldr-dates-full/main/fa/ca-generic.json'
import faTimeZoneNames from 'cldr-dates-full/main/fa/timeZoneNames.json'
import weekData from 'cldr-core/supplemental/weekData.json'
import {IntlProvider, LocalizationProvider, loadMessages, load} from '@progress/kendo-react-intl'
import faMessages from '_metronic/i18n/messages/fa.kendo.json'

load(faDateFields, faGregorian, faGeneric, faTimeZoneNames, weekData)
loadMessages(faMessages, 'fa-IR')

const {PUBLIC_URL} = process.env
_redux.setupAxios(axios, store)

Chart.register(...registerables)

ReactDOM.render(
  <MetronicI18nProvider>
    <Provider store={store}>
      {/* Asynchronously persist redux stores and show `SplashScreen` while it's loading. */}
      {/* <PersistGate persistor={persistor} loading={<div>Loading...</div>}> */}

      <App basename={PUBLIC_URL} />
      {/* </PersistGate> */}
      <ToastContainer rtl={true} />
    </Provider>
  </MetronicI18nProvider>,
  document.getElementById('root')
)
