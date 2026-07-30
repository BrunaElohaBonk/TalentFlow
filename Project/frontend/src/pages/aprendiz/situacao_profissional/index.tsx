import './situacao_profissional.css'
import icon_editar from '../../../assets/img/icon_editar.png'
import icon_fechar from '../../../assets/img/close.png'
import { useEffect, useState } from 'react';
import api from '../../../services/api';

interface Perfil {
    id: number,
    EDV_Aprendiz: number,
    situacao_profissional: SituacaoProfissional[],
}
interface SituacaoProfissional {
    id: number;
    Id_Profile: number;
    nome_Setor: string;
    nome_Lider: string;
    cumprido_Estagio: boolean;
    bio_profissional: string;
};
interface user {
    edv: number;
}

function SituacaoProfissional({ visible, setVisible, setEditarSituacao }: any) {
    const [apireq, setApireq] = useState<Perfil | null>(null);
    const [aprendiz, setAprendiz] = useState<user | null>(null);
    useEffect(() => {
        async function carregarPerfil() {
            const usuario = localStorage.getItem("usuario");
            if (!usuario) return;
            const aprendizLogado = JSON.parse(usuario);
            const edv = aprendizLogado.user.EDV;
            setAprendiz({ edv });

            const response = await api.get(`/aprendiz/meuPerfil/${edv}`);
            setApireq(response.data.data)
        }
        carregarPerfil();
    }, []);
    if (!visible) {

        return null
    }

    return (
        <>
            <div className="situacao-overlay" onClick={() => setVisible(false)}>
                <div className="situacao-card" onClick={(e) => e.stopPropagation()}>

                    <div className="situacao-header">
                        <h2 className='formacao-lista-titulo'>Situação Profissional</h2>
                        <div className="situacao-acoes">
                            <button className="situacao-editar" onClick={() => {
                                setVisible(false)
                                setEditarSituacao(true)
                            }}
                            >
                                <img src={icon_editar} alt="Editar" />
                            </button>
                            <button className="situacao-fechar" onClick={() => setVisible(false)}>
                                <img src={icon_fechar} alt="Fechar" />
                            </button>
                        </div>
                    </div>
                    <div className="situacao-conteudo">
                        <div className="situacao-item">
                            <span className='formacao-titulo'>Nome do Setor</span>
                            <p>{apireq?.situacao_profissional[0]?.nome_Setor || "Não informado."}</p>
                        </div>
                        <div className="situacao-item">
                            <span className='formacao-titulo'>Nome do Líder</span>
                            <p>{apireq?.situacao_profissional[0]?.nome_Lider || "Não informado."}</p>
                        </div>
                        <div className="situacao-item">
                            <span className='formacao-titulo'>Cumprindo Estágio?</span>
                            <p>
                                {
                                    apireq?.situacao_profissional[0]?.cumprido_Estagio === true
                                        ? "Sim"
                                        : apireq?.situacao_profissional[0]?.cumprido_Estagio === false
                                            ? "Não"
                                            : "Não informado."
                                }
                            </p>
                        </div>
                        <div className="situacao-item situacao-descricao">
                            <span className='formacao-titulo'>Situação atual e expectativas para o futuro</span>
                            <p>{apireq?.situacao_profissional[0]?.bio_profissional || "Não informado."}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SituacaoProfissional