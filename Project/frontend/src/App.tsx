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
import Confirm_login from "./pages/auth/confirm_login"
import CadastrarUser from "./pages/instrutor/cadastrarUser"
import PrivateRoute from "./routes/privateRoutes"
import PublicRoute from "./routes/publicRoutes"

function App() {
  return (
    <> 
      <Routes>
        <Route path='/' element={<PublicRoute><Login /></PublicRoute>} />
        <Route path='/Cadastrar' element={<PrivateRoute tipo="instrutor"><CadastrarUser/></PrivateRoute>} />
        <Route path='/CadastrarTurma' element={<PrivateRoute tipo="instrutor"><CadTurma/></PrivateRoute>} />
        <Route path='/Home' element={<PrivateRoute tipo="instrutor"><Dashboard/></PrivateRoute>} />
        <Route path='/Notificações' element={<PrivateRoute tipo="instrutor"><Notificacao/></PrivateRoute>} />
        <Route path='/PerfilAprendiz/:edv' element={<PrivateRoute tipo="instrutor"><PerfilAprendiz/></PrivateRoute>} />
        <Route path='/PerfilInstrutor' element={<PrivateRoute tipo="instrutor"><PerfilInstrutor/></PrivateRoute>} />
        <Route path='/Aprendiz' element={<PrivateRoute tipo="instrutor"><VerAprendiz/></PrivateRoute>} />
        <Route path='/Instrutor' element={<PrivateRoute tipo="instrutor"><VerInstrutor/></PrivateRoute>} />
        <Route path='/Turma' element={<PrivateRoute tipo="instrutor"><VerTurma/></PrivateRoute>} />
        <Route path='/Perfil' element={<PrivateRoute tipo="aprendiz"><Perfil/></PrivateRoute>} />
        <Route path='/Confirm_login' element={<Confirm_login />} />
      </Routes>
    </>
  )
}

export default App
