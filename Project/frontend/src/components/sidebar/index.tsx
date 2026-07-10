import './sidebar.css'
import { NavLink } from 'react-router-dom';
import sair from './../../assets/img/icon_logout.png'

function Sidebar(){
    return(
        <div className='sidebar-container'>
            <div className='sidebar-corpo'>
                <div className='sidebar-action'>
                    <NavLink to='/Home' className='sidebar-link'>
                        <span className='sidebar-routes'>Home</span>
                    </NavLink>
                    <NavLink to='/PerfilInstrutor' className='sidebar-link'>
                        <span className='sidebar-routes'>Perfil</span>
                    </NavLink>
                    <NavLink to='/Notificações' className='sidebar-link'>
                        <span className='sidebar-routes'>Histórico de Atualização</span>
                    </NavLink>
                    <NavLink to='/Aprendiz' className='sidebar-link'>
                        <span className='sidebar-routes'>Aprendizes</span>
                    </NavLink>
                    <NavLink to='/Turma' className='sidebar-link'>
                        <span className='sidebar-routes'>Turma</span>
                    </NavLink>
                    <NavLink to='/Instrutor' className='sidebar-link'>
                        <span className='sidebar-routes'>Instrutores</span>
                    </NavLink>
                    <NavLink to='/Cadastrar' className='sidebar-link'>
                        <span className='sidebar-routes'>Cadastrar Usuário</span>
                    </NavLink>
                    <NavLink to='/CadastrarTurma' className='sidebar-link'>
                        <span className='sidebar-routes'>Cadastrar Turma</span>
                    </NavLink>
                </div>
                <div className='sidebar-logout'>
                    <NavLink to='/Logout' className='sidebar-link'>
                        <img src={sair} alt="sair" className='sidebar-img'/>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;