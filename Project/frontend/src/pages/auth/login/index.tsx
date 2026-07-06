import icon_user from '../../../assets/img/icon_user.png'
import icon_cadeado from '../../../assets/img/icon_cadeado.png'

function Login() {

  return (
    <>
    <div>
        <span>Seja bem-vindo(a)!</span>

        <div>
            <input src='icon_user' placeholder="EDV" style={{height: '50px', width: '100px'}}></input>
            <input src='icon_cadeado' placeholder="Password" style={{height: '50px', width: '100px'}}></input>
        </div>

        <div>
            <button>ENTRAR</button>
        </div>
    </div>
    </>
  )
}

export default Login