import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import Script from 'next/script';
import '../styles/globals.scss';
import 'line-awesome/dist/line-awesome/css/line-awesome.min.css';
import 'remixicon/fonts/remixicon.css';
import { Provider } from 'react-redux';
import { wrapper } from '../store';
import { Toaster } from 'react-hot-toast';
import Modal from 'react-modal';

const App = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  useEffect(() => {
    Modal.setAppElement('#__next');
  }, []);
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
            `}
      </Script>
      <Provider store={store}>
        <Component {...props.pageProps} />
      </Provider>
      <Toaster />
    </>
  );
};

export default App;
