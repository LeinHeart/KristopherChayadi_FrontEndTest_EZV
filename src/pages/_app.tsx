import type { AppProps } from 'next/app';
import { wrapper } from '../lib/store';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

// use wrapper to intergrate Redux with Next.js
export default wrapper.withRedux(MyApp);