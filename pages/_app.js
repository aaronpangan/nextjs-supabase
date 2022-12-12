import '../styles/globals.css';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
function MyApp({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  const router = useRouter();

  useEffect(() => {
    supabaseClient.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {router.push('/');
      console.log(event)
    }
    });
  });

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Component {...pageProps} />
    </SessionContextProvider>
  );
}

export default MyApp;
