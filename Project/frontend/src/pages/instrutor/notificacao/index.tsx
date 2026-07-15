import Header from "../../../components/header"
import Sidebar from "../../../components/sidebar"
import './notificacao.css'
import { notificacoes } from './notificacao'

function Notificacao(){
    return(
        <div>
            <Header></Header>
            <div className="notificacao-container">
                <Sidebar/>
                <div className="notificacao-body">
                    <div className="notificacao-modal">
                        <h1 className="notificacao-titulo">Histórico de Atualização</h1>
                            {notificacoes.map((item) => (
                                <div className="notificacao-card" key={item.id}>
                                    <span className="notificacao-nome">{item.usuario}</span>
                                    <span className="notificacao-texto">{item.acao}</span>
                                    <span className="notificacao-texto">{item.data}</span>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Notificacao