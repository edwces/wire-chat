import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { queryClient } from "../lib/react-query";
import { WebSocketProvider } from "../modules/websocket/WebSocketProvider";
import { AppMetadata } from "../modules/meta";
import { ModalsProvider } from "@mantine/modals";
import { AddFriendsModal, UserSettingsModal } from "../modules/modals";
import { AuthProvider } from "../modules/auth/AuthProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AppMetadata />
      <QueryClientProvider client={queryClient}>
        <MantineProvider withNormalizeCSS withGlobalStyles>
          <ModalsProvider
            modals={{
              addFriendsModal: AddFriendsModal,
              userSettingsModal: UserSettingsModal,
            }}
          >
            <AuthProvider>
              <WebSocketProvider>
                <Component {...pageProps} />
              </WebSocketProvider>
            </AuthProvider>
          </ModalsProvider>
        </MantineProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
