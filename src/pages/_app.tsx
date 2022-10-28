import type { AppType } from 'next/app';
import { withTRPC } from '@trpc/next';
import { loggerLink } from '@trpc/client/links/loggerLink';
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import superjson from 'superjson';

import { AppRouter } from '@/server/routers/_app';
import AuthGuard from '@/components/AuthGuard';
import { useAuthStore } from '@/store/auth.store';

import '../styles/globals.css';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <AuthGuard>
      <Component {...pageProps} />
    </AuthGuard>
  );
};

console.log('process.env.VERCEL_URL');
console.log(process.env.VERCEL_URL);

export default withTRPC<AppRouter>({
  config() {
    const url = process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/trpc`
      : 'http://localhost:3000/api/trpc';

    const links = [
      loggerLink(),
      httpBatchLink({
        maxBatchSize: 10,
        url,
      }),
    ];

    return {
      headers() {
        return {
          Authorization: 'Bearer ' + useAuthStore.getState().accessToken,
        };
      },
      links,
      transformer: superjson,
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 60,
          },
        },
      },
    };
  },
  ssr: false,
})(MyApp);
