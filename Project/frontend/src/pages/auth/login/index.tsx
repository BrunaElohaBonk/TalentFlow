import { useNavigate } from "react-router-dom"


function Login() {

  const navigate = useNavigate() 

  return (
    <>
    <div {/*style={{box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px}} */}>
        <p>Seja bem-vindo!</p>

        <div style={{height: '50px', width: '100px', border: '3px'}}>
            <p>EDV</p>
            <p>Password</p>
        </div>

        <div>
            <button>ENTRAR</button>
        </div>
    </div>


    {/* <div style={{height: '100vh', width: '100vw', backgroundColor: 'Lavender', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{backgroundColor: 'white', height: '450px', width: '350px', borderRadius: '15px', padding: '20px'}}>
            <h1 style={{color: 'DarkMagenta', textAlign: 'center', marginTop: '50px'}}>Login</h1><br></br>
            <div style={{marginTop: '30px'}}>
                <span style={{fontWeight: 'bold'}}>Nome: </span><br></br>
                <input placeholder=' Digite o nome:' style={{height: '30px', width: '350px', borderRadius: '5px', border: 0, backgroundColor: 'lavender'}}></input><br></br><br></br>
                <span style={{fontWeight: 'bold'}}>Email: </span><br></br>
                <input placeholder=' Digite o email:' style={{height: '30px', width: '350px', borderRadius: '5px', border: 0, backgroundColor: 'lavender'}}></input><br></br><br></br>
                <span style={{fontWeight: 'bold'}}>Senha: </span><br></br>
                <input placeholder=' Digite a senha' style={{height: '30px', width: '350px', borderRadius: '5px', border: 0, backgroundColor: 'lavender'}}></input><br></br><br></br>
            </div>
            
            <div style={{display: 'flex', justifyContent: 'space-around', marginTop: '30px'}}>
              <button onClick={handleNavigateList} style={{height: '50px', width: '100px', backgroundColor: 'DarkMagenta', color: 'white', borderRadius: '10px', border: 0}}>Voltar</button>
              <button style={{height: '50px', width: '100px', backgroundColor: 'DarkMagenta', color: 'white', borderRadius: '10px', border: 0}}>Entrar</button>
            </div>
        </div>
        <br></br>
    </div> */}
    </>
  )
}

export default Login