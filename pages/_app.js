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
    <Provider session={session}>
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <Component {...pageProps} />
          <div id="modal-root" />
        </ModalProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
