import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { theme } from '../styles/theme';

import { AuthProvider } from '../contexts/AuthContext';
import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext';

import { QueryClientProvider } from 'react-query';
import { queryClient } from '../services/queryClient';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SidebarDrawerProvider>
          <ChakraProvider resetCSS theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </SidebarDrawerProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}
