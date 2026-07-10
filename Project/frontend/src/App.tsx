import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/auth/login"
import Perfil from "./pages/aprendiz/perfil"
import CadTurma from "./pages/instrutor/cadTurma"
import Dashboard from "./pages/instrutor/dashboard"
import Notificacao from "./pages/instrutor/notificacao"
import PerfilAprendiz from "./pages/instrutor/perfilAprendiz"
import PerfilInstrutor from "./pages/instrutor/perfilInstrutor"
import VerAprendiz from "./pages/instrutor/verAprendiz"
import VerInstrutor from "./pages/instrutor/verInstrutor"
import VerTurma from "./pages/instrutor/verTurma" 
import Logout from "./pages/auth/logout"
import Confirm_login from "./pages/auth/confirm_login"
import EditarPerfil from "./pages/auth/editarPerfil"
import CadastrarUser from "./pages/instrutor/cadastrarUser"

function App() {
  return (
    <> 
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Cadastrar' element={<CadastrarUser />} />
          <Route path='/CadastrarTurma' element={<CadTurma />} />
          <Route path='/Home' element={<Dashboard />} />
          <Route path='/Notificações' element={<Notificacao />} />
          <Route path='/PerfilAprendiz' element={<PerfilAprendiz />} />
          <Route path='/PerfilInstrutor' element={<PerfilInstrutor />} />
          <Route path='/Aprendiz' element={<VerAprendiz />} />
          <Route path='/Instrutor' element={<VerInstrutor />} />
          <Route path='/Turma' element={<VerTurma />} />
          <Route path='/Perfil' element={<Perfil />} />
          <Route path='/Logout' element={<Logout />} />
          <Route path='/Confirm_login' element={<Confirm_login />} />
          <Route path="/Editar/:edv" element={<EditarPerfil />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
