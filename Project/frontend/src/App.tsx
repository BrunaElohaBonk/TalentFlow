import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/auth/login"
import Perfil from "./pages/aprendiz/perfil"
import CadAprendiz from "./pages/instrutor/cadAprendiz"
import CadInstrutor from "./pages/instrutor/cadInstrutor"
import CadTurma from "./pages/instrutor/cadTurma"
import Dashboard from "./pages/instrutor/dashboard"
import Notificacao from "./pages/instrutor/notificacao"
import PerfilAprendiz from "./pages/instrutor/perfilAprendiz"
import PerfilInstrutor from "./pages/instrutor/perfilInstrutor"
import VerAprendiz from "./pages/instrutor/verAprendiz"
import VerInstrutor from "./pages/instrutor/verInstrutor"
import VerTurma from "./pages/instrutor/verTurma" 
import Loginout from "./pages/auth/loginout"

function App() {
  return (
    <> 
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/CadastrarAprendiz' element={<CadAprendiz />} />
          <Route path='/CadastrarInstrutor' element={<CadInstrutor />} />
          <Route path='/CadastrarTurma' element={<CadTurma />} />
          <Route path='/Dashboard' element={<Dashboard />} />
          <Route path='/Notificações' element={<Notificacao />} />
          <Route path='/PerfilAprendiz' element={<PerfilAprendiz />} />
          <Route path='/PerfilInstrutor' element={<PerfilInstrutor />} />
          <Route path='/Aprendiz' element={<VerAprendiz />} />
          <Route path='/Instrutor' element={<VerInstrutor />} />
          <Route path='/Turma' element={<VerTurma />} />
          <Route path='/perfil' element={<Perfil />} />
          <Route path='/Logout' element={<Loginout />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
