import icon_logout from '../../assets/img/icon_logout.png'
import './logout.css'
import { useNavigate } from "react-router-dom"
import { useState } from "react"

function Logout({visible, setVisible}: any) {

  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/')
  }

  return (
    <>
    {visible && (
      <div className="logout-overlay">
        <div className="logout-card">

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