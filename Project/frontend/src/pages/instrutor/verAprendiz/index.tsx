import { useEffect, useState } from "react";
import Header from "../../../components/header"
import Sidebar from "../../../components/sidebar"
import './verAprendiz.css'
import user from '../../../assets/img/icon_user.png'
import lupa from '../../../assets/img/pesquisar.png'
import lixeira from '../../../assets/img/lixeira.png'
import filter from '../../../assets/img/filter.png'
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Filtro from "../../../components/filter";
import api from "../../../services/api";

interface ITurma {
    id: number;
    nomeTurma: string;
    name_Curso: string;
    EDV_Instrutor: number;
    nomeInstrutor: string;
    Ativo: boolean;
}

interface IAprendiz {
    EDV: number;
    name: string;
    email_bosch: string;
    user_bosch: string;
    contato: string;
    data_nascimento: string;
    fotoPerfil: string | null;
    tipoUser: "APRENDIZ";
    Ativo: boolean;
    idTurma: number;

    data: {
        situacao_profissional: {
            nome_Setor: string;
            nome_Lider: string;
            cumprido_Estagio: boolean;
            bio_profissional: string;
        }[];

        formacao_academica: {
            id: number;
            name_Curso: string;
            nome_Institucao: string;
            status_Academico: "CONCLUIDO" | "CURSANDO";
            periodo_Atual: number;
            total_Periodo: number;
            nivel_formacao: string;
        }[];

        cursos_complementares: {
            id: number;
            name_Curso: string;
            status_Cursos: "CONCLUIDO" | "CURSANDO";
            data_Conclusao: string;
            carga_horaria: number;
        }[];

        idiomas: {
            id: number;
            nome_Idioma: string;
            nivel_Idioma: string;
        }[];
    };
}


function VerAprendiz(){
    const navigate = useNavigate()
    const [busca, setBusca] = useState("");
    const [filtro, setFiltro] = useState(false)
    const [aprendiz, setAprendiz] = useState<IAprendiz[]>([]);
    const [turma, setTurma] = useState<ITurma[]>([]);
    const buscarNomeTurma = (idTurma: number) => {
        console.log("idTurma:", idTurma);
        const turmaEncontrada = turma.find((item) => item.id === idTurma);
        console.log("Encontrada:", turmaEncontrada);
    
        return turmaEncontrada?.nomeTurma ?? "Sem turma";
    };
    const Idade = (dataNascimento: string) => {
        const nascimento = new Date(dataNascimento);
        const hoje = new Date();
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mes = hoje.getMonth() - nascimento.getMonth();
        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())
        ) {
            idade--;
        }
        return idade;
    };
    const [filtros, setFiltros] = useState({
        turmas: [] as number[],
        idadeMin: "",
        idadeMax: "",
        setores: [] as string[],
        idiomas: [] as string[],
        estagio: null as boolean | null,
        formacoes: [] as string[]
    });
    const normalizar = (texto: string) =>
    texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    const pesquisar = aprendiz
        .filter((item) => {
        if (filtros.turmas.length > 0) {
            const turmaDoAprendiz = item.idTurma;
            if (!filtros.turmas.includes(turmaDoAprendiz)) {
                return false;
            }
        }
        if (filtros.setores.length > 0) {
            const setorAprendiz = item.data.situacao_profissional[0]?.nome_Setor;
            const possuiSetor = filtros.setores.includes(setorAprendiz);
            if (!possuiSetor) {
                return false;
            }
        }
        if (filtros.idadeMin !== "" || filtros.idadeMax !== "") {
            const idade = Idade(item.data_nascimento);
            const idadeMin = filtros.idadeMin !== "" ? Number(filtros.idadeMin) : null;
            const idadeMax = filtros.idadeMax !== "" ? Number(filtros.idadeMax) : null;
            if (idadeMin !== null && idadeMax === null) {
                if (idade !== idadeMin) {
                    return false;
                }
            }
            if (idadeMin === null && idadeMax !== null) {
                if (idade > idadeMax) {
                    return false;
                }
            }
            if (idadeMin !== null && idadeMax !== null) {
                if (idadeMin === idadeMax) {
                    if (idade !== idadeMin) {
                        return false;
                    }
                } 
                else {
                    if (idade < idadeMin || idade > idadeMax) {
                        return false;
                    }
                }
            }
        }
        if (filtros.idiomas.length > 0) {
            const idiomasAprendiz = item.data.idiomas.map(
                i => i.nome_Idioma
            );
            const possuiIdioma = filtros.idiomas.some(idioma => idiomasAprendiz.includes(idioma));
            if (!possuiIdioma) {
                return false;
            }
        }
        if (filtros.formacoes.length > 0) {
            const formacoesAprendiz = item.data.formacao_academica.map(f => f.name_Curso);
            const possuiFormacao = filtros.formacoes.some(formacao => formacoesAprendiz.includes(formacao));
            if (!possuiFormacao) {
                return false;
            }
        }
        if (filtros.estagio !== null) {
            const estaEmEstagio = item.data.situacao_profissional[0]?.cumprido_Estagio; 
            if (estaEmEstagio !== filtros.estagio) {
                return false;
            }
        }
        return true;
    })
    .filter((item) => {
        const termo = normalizar(busca.trim());
        if (termo === "") return true;
        return (
            normalizar(item.name).includes(termo) ||
            normalizar(item.email_bosch).includes(termo) ||
            normalizar(item.user_bosch).includes(termo) ||
            normalizar(buscarNomeTurma(item.idTurma)).includes(termo) ||
            item.EDV.toString().includes(termo) ||
            item.contato.toString().includes(termo) ||
            new Date(item.data_nascimento).toLocaleDateString("pt-BR").includes(termo)
        );
    })
    .sort((a, b) =>
        a.name.localeCompare(b.name, "pt-BR")
    );
    const fetchTurmas = async () => {
        try {
            const response = await api.get("/turma/visualizarTurmas");
            console.log("TURMAS:", response.data);
            setTurma(response.data.filter((turma: ITurma) => turma.Ativo));
        } catch(error) {
            console.error("Erro ao buscar turmas:", error);
        }
    };
    const fetchAprendizes = async () => {
        try {
            const response = await api.get("/auth/buscaruser/APRENDIZ");
            const userAprendiz = response.data.filter((usuario: IAprendiz) => usuario.tipoUser === "APRENDIZ" && usuario.Ativo === true );
            console.log("USUARIO APRENDIZ:", userAprendiz);
            const aprendizesComPerfil = await Promise.all(
                userAprendiz.map(async (user : any) => {
                    console.log("edvs",user.EDV, user.tipoUser)
                    const perfilResponse = await api.get(`/aprendiz/perfil/${user.EDV}`);
                    const turmaResponse = await api.get(`/aprendiz/aprendiz/${user.EDV}`);

                    return {
                        ...user,
                        idTurma: turmaResponse.data.data.Id_Turma,
                        data: perfilResponse.data.data
                    };
                })
            );
            console.log("DATA DO APRENDIZ:", aprendizesComPerfil);
            console.log("APRENDIZES COMPLETOS:", aprendizesComPerfil);
            setAprendiz(aprendizesComPerfil);

        } 
        catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (EDV: number) => {
        console.log("EDV aprendiz para deletar:", EDV);

        const confirm = await Swal.fire({
            title: 'Tem certeza?',
            text: 'O aprendiz será removido da lista!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, remover!',
            cancelButtonText: 'Cancelar'
        });

        if (!confirm.isConfirmed) return;

        try {
            const response = await api.put(`/auth/deletarUser/${EDV}`);

            console.log("Resposta delete:", response.data);
            console.log("Status:", response.status);

            await fetchAprendizes();

            Swal.fire({
                title: 'Removido!',
                text: 'Aprendiz removido com sucesso!',
                icon: 'success'
            });

        } catch (error) {
            console.error('Erro ao remover:', error);

            Swal.fire({
                title: 'Erro!',
                text: 'Erro ao remover aprendiz',
                icon: 'error'
            });
    }
};
    useEffect(() => {
        fetchAprendizes();
        fetchTurmas();
    }, []); 

    return(
        <div className="aprendiz">
            <Header></Header>
            <Filtro visible={filtro} setVisible={setFiltro} filtros={filtros} setFiltros={setFiltros} aprendizes={aprendiz} turmas={turma}/>
            <div className="aprendiz-container">
                <Sidebar/>
                <div className="aprendiz-body">
                    <div className="aprendiz-pesquisa">
                        <div className="aprendiz-input-area">
                            <input type="text" className="aprendiz-input" placeholder="Pesquisar..." value={busca} onChange={(e) => setBusca(e.target.value)}/>
                            <button type="button" className="aprendiz-button-pesquisar"><img src={lupa} alt="lupa" className="img-lupa"/></button>
                        </div>
                        <button type="button" className="aprendiz-button-filtro"><img src={filter} alt="filtro" className="img-filter" onClick={() => setFiltro(true)}/></button>
                    </div>
                    <div className="aprendiz-card-area">
                        {pesquisar.length > 0 ? (
                            pesquisar.map((item) => (
                                <div className="aprendiz-modal" key={item.EDV}>
                                    <button className="aprendiz-btn-delete" onClick={() => handleDelete(item.EDV)}><img src={lixeira} alt="deletar" className="aprendiz-deletar"/></button>
                                    <div className="aprendiz-header">
                                        <img
                                            src={item.fotoPerfil ? item.fotoPerfil : user}
                                            alt="user"
                                            className="aprendiz-img"
                                        />
                                        <span className="aprendiz-titulo" title={item.name}>{item.name}</span>
                                    </div>
                                    <div className="aprendiz-conteudo">
                                        <span className="aprendiz-span" title={buscarNomeTurma(item.idTurma) || 'Sem Turma'}>{buscarNomeTurma(item.idTurma)}</span>
                                        <button onClick={() => navigate(`/PerfilAprendiz/${item.EDV}`)} className="aprendiz-button">Ver Dados do Aprendiz</button>
                                    </div>
                                </div>
                            ))
                        ) : (<p className="aprendiz-aviso">Nenhum aprendiz encontrado.</p>)}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default VerAprendiz