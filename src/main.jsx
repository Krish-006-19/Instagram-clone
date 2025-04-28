import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App1 from './App1.jsx'
import store from './Redux/store'
import { Provider } from 'react-redux'
import { BooleanProvider } from './Context/BoolContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BooleanProvider>
      <App1 />
      </BooleanProvider>
    </Provider>
  </StrictMode>,
)
