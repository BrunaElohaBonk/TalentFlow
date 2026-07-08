import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/auth/login"
import Perfil from "./pages/aprendiz/perfil"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Perfil />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
