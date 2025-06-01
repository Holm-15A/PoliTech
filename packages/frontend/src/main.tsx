// スタイルのインポートを最初に
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import App from './App.tsx'
import { store } from './store'
import './index.css'

const theme = extendTheme({
  colors: {
    facebook: {
      50: '#E8F4FF',
      100: '#C1E0FF',
      200: '#9ACCFF',
      300: '#72B8FF',
      400: '#4BA4FF',
      500: '#3b5998', // Facebook blue
      600: '#344e86', // Darker Facebook blue
      700: '#2d4373',
      800: '#253860',
      900: '#1d2c4d',
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
)
