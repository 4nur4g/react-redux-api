import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { store } from '@/redux/app/store';
import { Provider } from 'react-redux';
import { wrapper } from '@/redux/app/store';

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export default wrapper.withRedux(App);
