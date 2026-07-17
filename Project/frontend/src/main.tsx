import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { NotificacaoProvider } from './context/notificacaoContext.tsx'
import { AuthProvider } from './context/authContext.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <NotificacaoProvider>
              <App />
        </NotificacaoProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
