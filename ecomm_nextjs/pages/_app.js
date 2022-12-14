import '../styles/globals.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { useState, useEffect } from 'react';
import {useRouter} from 'next/router';
import Layout from '../components/Layout';
import {StateContext} from '../context/stateContext';
import {Toaster} from 'react-hot-toast';
import {InfinitySpin} from 'react-loader-spinner';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
const { NEXT_PAYPAL_CLIENT_ID } = process.env;



function Loading(){
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = url => (url !== router.asPath ) && setLoading(true);
    const handleComplete = url => (url === router.asPath) && setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
    
    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
      setLoading(false)
  }
  },)
  return loading && (
    <div className="spinner-wrapper">
          <InfinitySpin  className="spinner"
  width='200'
  color="#1d66c1"
/>
    </div>

  )
}


function MyApp({ Component, pageProps }) {
  return (
    <PayPalScriptProvider deferLoading={false} options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}}>
<StateContext>  
  <Layout>
    <Loading/>
    <Toaster/>
   
   <Component {...pageProps} />
  
  </Layout>
  </StateContext>
  </PayPalScriptProvider>
  )
}

export default MyApp
