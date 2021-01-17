import "styles/globals.scss";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "next-auth/client";
import { ModalProvider } from "contexts/modal";

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
          clientMaxAge: 30 * 60,
        }}
      >
        <ModalProvider>
          <Component {...pageProps} />
          <div id="modal-root" />
        </ModalProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
