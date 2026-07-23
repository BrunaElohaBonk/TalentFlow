import icon_logout from '../../assets/img/icon_logout.png'
import './logout.css'
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../../context/authContext";

interface LogoutProps {
    visible:boolean;
    setVisible:(value:boolean)=>void;
}

function Logout({visible, setVisible}: LogoutProps) {
  const { logout } = useAuth();
  const navigate = useNavigate()
  const handleLogout = () => {
    console.log("clicou sair");
    logout();
    navigate('/', { replace: true });
}

  return (
    <>
    {visible && (
      <div className="logout-overlay" onClick={() => setVisible(false)}>
        <div className="logout-card" onClick={(e) => e.stopPropagation()}>

          <span className="logout-title">
            Deseja realizar o logout?
          </span>

          <img src={icon_logout} alt="logout" className="logout-image"/>

          <div className="logout-buttons">
            <button className="logout-cancel" onClick={() => setVisible(false)}>
              CANCELAR
            </button>

            <button className="logout-confirm" onClick={handleLogout}>
              SAIR
            </button>
          </div>

        </div>
      </div>
    )}

    </>
  )
}

export default Logout