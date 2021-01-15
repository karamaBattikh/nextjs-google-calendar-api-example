import "styles/globals.scss";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "next-auth/client";

function MyApp({ Component, pageProps }) {
  const { session } = pageProps;

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Provider
        session={session}
        options={{
          clientMaxAge: 60 * 60,
        }}
      >
        <Component {...pageProps} />
      </Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
