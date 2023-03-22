import { extendTheme } from '@chakra-ui/react'
import { config } from './config';

export const theme = extendTheme({
  config,
  colors:{
    blue:{
      50: '#d9fdff',
      100: '#b0f1fd',
      200: '#82e6f9',
      300: '#54dbf4',
      400: '#29d1f0',
      500: '#0fb8d6',
      600: '#008fa8',
      700: '#006679',
      800: '#003e4a',
      900: '#00161d',
    }
  },
  fonts: {
    heading: "Roboto",
    body: "Roboto",
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50'
      }
    }
  }
})