import './sidebar.css'
import { NavLink } from 'react-router-dom';
import sair from './../../assets/img/icon logout.png'

function Sidebar(){
    return(
        <div className='sidebar-container'>
            <div className='sidebar-corpo'>
                <div className='sidebar-action'>
                    <NavLink to='/CadastrarAprendiz' className='sidebar-link'>
                        <span>Cadastrar Aprendiz</span>
                    </NavLink>
                    <NavLink to='/CadastrarInstrutor' className='sidebar-link'>
                        <span>Cadastrar Instrutor</span>
                    </NavLink>
                    <NavLink to='/CadastrarTurma' className='sidebar-link'>
                        <span>Cadastrar Turma</span>
                    </NavLink>
                    <NavLink to='/Dashboard' className='sidebar-link'>
                        <span>Home</span>
                    </NavLink>
                    <NavLink to='/Notificações' className='sidebar-link'>
                        <span>Histórico de Atualização</span>
                    </NavLink>
                    <NavLink to='/PerfilInstrutor' className='sidebar-link'>
                        <span>Perfil</span>
                    </NavLink>
                    <NavLink to='/Aprendiz' className='sidebar-link'>
                        <span>Aprendizes</span>
                    </NavLink>
                    <NavLink to='/Instrutor' className='sidebar-link'>
                        <span>Instrutores</span>
                    </NavLink>
                    <NavLink to='/Turma' className='sidebar-link'>
                        <span>Turma</span>
                    </NavLink>
                </div>
                <div className='sidebar-loginout'>
                    <NavLink to='/Loginout' className='sidebar-link'>
                        <img src={sair} alt="sair" className='sidebar-img'/>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;