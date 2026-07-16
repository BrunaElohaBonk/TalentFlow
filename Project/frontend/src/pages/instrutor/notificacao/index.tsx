import Header from "../../../components/header"
import Sidebar from "../../../components/sidebar"
import './notificacao.css'
import { notificacoes } from './notificacao'

interface INotificacao {
    id: number;
    nome: string;
    texto: string;
    dataHora: string;
}

function Notificacao(){
    // const [notificacoes, setNotificacoes] = useState<INotificacao[]>([]);
    // const fetchNotif = async () => {
    //     try {
    //         const response = await axios.get("URL_DO_BACKEND");

    //         console.log(response.data);

    //         setNotificacoes(response.data);
    //     } catch (error) {
    //         console.error(error);
    //         setNotificacoes([]);
    //     }
    // };

    // useEffect(() => {
    //     fetchNotif();
    // }, []);

    return(
        <div>
            <Header></Header>
            <div className="notificacao-container">
                <Sidebar/>
                <div className="notificacao-body">
                    <div className="notificacao-modal">
                        <h1 className="notificacao-titulo">Histórico de Atualização</h1>
                        <div className="notificacao-lista">
                            {notificacoes.map((item) => (
                                <div className="notificacao-card" key={item.id}>
                                    <span className="notificacao-nome">{item.nome}</span>
                                    <span className="notificacao-texto">{item.texto}</span>
                                    <span className="notificacao-texto">{item.dataHora}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Notificacao