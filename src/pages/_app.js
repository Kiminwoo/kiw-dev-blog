import '@/styles/globals.css?after'
import { Fragment } from 'react'
import GlobalStyles from '../../components/GlobalStyles';

export default function App({ Component, pageProps }) {
  return (
    <Fragment>
      <GlobalStyles />
      <Component {...pageProps} />
    </Fragment>
  )
}
