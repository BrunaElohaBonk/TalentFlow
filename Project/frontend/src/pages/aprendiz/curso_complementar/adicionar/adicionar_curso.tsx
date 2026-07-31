import './adicionar_curso.css'
import sair from '../../../../assets/img/close.png'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useDropzone } from "react-dropzone";
import download from '../../../../assets/img/icon download.png'
import api from '../../../../services/api'

interface cursosComplementares {
    id?: number;
    Id_Profile?: number;
    certificado?: File | string;
    name_Curso: string;
    status_Cursos: "CONCLUIDO" | "CURSANDO" | "NAO_INFORMADO";
    data_Conclusao: string;
    carga_horaria: number | null;
};
interface user {
    edv: number;
}
interface Perfil {
    id: number,
    EDV_Aprendiz: number,
    cursos: cursosComplementares[],
}

interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setCursoComplementar: React.Dispatch<React.SetStateAction<boolean>>;
    id_profile: number
}

function AdicionarCursoComplementar({
    visible,
    setVisible,
    setCursoComplementar,
    id_profile
}: Props) {
    const [curso, setCurso] = useState<cursosComplementares>({
        name_Curso: "",
        status_Cursos: "NAO_INFORMADO",
        data_Conclusao: "",
        carga_horaria: null,
        certificado: "",
    })

    const [nomeCertificado, setNomeCertificado] = useState("");
    const [apireq, setApireq] = useState<Perfil | null>(null);

    const [aprendiz, setAprendiz] = useState<user | null>(null);

    useEffect(() => {
        async function carregarPerfil() {
            const usuario = localStorage.getItem("usuario");
            if (!usuario) return;
            const aprendizLogado = JSON.parse(usuario);
            const edv = aprendizLogado.user.EDV;
            setAprendiz({ edv });
        }
        carregarPerfil();
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            "image/*": [],
            "application/pdf": []
        },
        multiple: false,
        maxFiles: 1,
        onDrop: (acceptedFiles) => {

            if (acceptedFiles.length > 0) {
                const arquivo = acceptedFiles[0];

                setNomeCertificado(arquivo.name);

                setCurso((prev) => ({
                    ...prev,
                    certificado: arquivo,
                }));
            }
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        setCurso((prev) => ({
            ...prev,
            [name]:
                name === "carga_horaria"
                    ? Number(value)
                    : value,
        }));

    }


    const handleDataConclusao = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        let valor = e.target.value.replace(/\D/g, "");
        if (valor.length > 2) {
            valor = valor.replace(/^(\d{2})(\d)/, "$1/$2");
        }
        if (valor.length > 5) {
            valor = valor.replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3");
        }
        setCurso({
            ...curso,
            data_Conclusao: valor
        });
    }

    const handleSituacao = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        setCurso({
            ...curso,
            status_Cursos: e.target.value as cursosComplementares["status_Cursos"],
        });
    }

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (
            !curso.name_Curso ||
            !curso.data_Conclusao ||
            curso.carga_horaria === null
        ) {

            Swal.fire({
                title: 'Atenção!',
                text: 'Preencha todos os campos obrigatórios.',
                icon: 'warning',
                confirmButtonColor: '#2B83D5'
            })
            return;
        }
        if (!aprendiz) {
            Swal.fire({
                title: "Erro!",
                text: "Usuário não encontrado.",
                icon: "error"
            });
            return;
        }

        try {
            const partesData = curso.data_Conclusao.split("/");


            const dataFormatada = new Date(
                Number(partesData[2]),
                Number(partesData[1]) - 1,
                Number(partesData[0])
            );
            const response = await api.get(`/aprendiz/meuPerfil/${aprendiz.edv}`);
            const perfil = response.data.data;
             await api.put(`aprendiz/atualizarCursos/${aprendiz.edv}/${perfil.id}`, {
                id: curso.id,
                Id_Profile: curso.Id_Profile,
                name_Curso: curso.name_Curso,
                status_Cursos: curso.status_Cursos,
                data_Conclusao: dataFormatada,
                carga_horaria:  Number(curso.carga_horaria)
            }); 
            await api.put(`/curso/certificado/${curso.id}`,{
                certificado: curso.certificado
            })

            Swal.fire({
                title: 'Sucesso!',
                text: 'Curso complementar cadastrado com sucesso.',
                icon: 'success',
                confirmButtonColor: '#2B83D5'
            })

            setVisible(false);

        } catch (error) {
            console.error(
                "ERRO API:",
                error.response?.data || error
            );
            Swal.fire({
                title: 'Erro!',
                text: 'Não foi possível cadastrar o curso complementar.',
                icon: 'error'
            })
        }
    }

    if (!visible) {
        return null;
    }

    return (
        <div className="adicionarCurso-overlay" onClick={() => setVisible(false)}>
            <form onSubmit={handleSubmit} className="adicionarCurso-card" onClick={(e) => e.stopPropagation()}>
                <button type="button" className="adicionarCurso-fechar" onClick={() => {
                    setVisible(false)
                    setCursoComplementar(true)
                }}
                >
                    <img src={sair} alt="Fechar" />
                </button>
                <span className="adicionarCurso-titulo">Curso Complementar</span>
                <div className="adicionarCurso-container">
                    <div className="adicionarCurso-grupo">
                        <label className="adicionarCurso-label">Nome do Curso</label>
                        <input name="name_Curso" className="adicionarCurso-input" value={curso.name_Curso} onChange={handleChange} />
                    </div>
                    <div className="adicionarCurso-grupo">
                        <label className="adicionarCurso-label">Situação</label>
                        <FormControl>
                            <RadioGroup
                                row
                                name="status_Cursos"
                                value={curso.status_Cursos}
                                onChange={handleSituacao}
                            >
                                <FormControlLabel
                                    value="CONCLUIDO"

                                    control={
                                        <Radio
                                            sx={{
                                                color: "#2B83D5",
                                                "&.Mui-checked": {
                                                    color: "#2B83D5"
                                                }
                                            }}
                                        />
                                    }
                                    label="Concluído"
                                />
                                <FormControlLabel
                                    value="CURSANDO"

                                    control={
                                        <Radio
                                            sx={{
                                                color: "#2B83D5",
                                                "&.Mui-checked": {
                                                    color: "#2B83D5"
                                                }
                                            }}
                                        />
                                    }
                                    label="Cursando"
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className="adicionarCurso-grupo">
                        <label className="adicionarCurso-label">Data de Conclusão</label>
                        <input type="text" name="data_Conclusao" maxLength={10} className="adicionarCurso-input" value={curso.data_Conclusao ?? ""} onChange={handleDataConclusao} />
                    </div>
                    <div className="adicionarCurso-grupo">
                        <label className="adicionarCurso-label">Carga Horária</label>
                        <input name="carga_horaria" className="adicionarCurso-input" value={curso.carga_horaria} onChange={handleChange} />
                    </div>
                    <div className="adicionarCurso-grupo">
                        <label className="adicionarCurso-label">Certificado</label>
                        <div className="certificado-container" {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p className="certificado-file">{nomeCertificado}</p>
                            <img src={download} className="certificado-upload" alt="upload" />
                        </div>
                    </div>
                    <div className="adicionarCurso-botoes">
                        <button className="adicionarCurso-salvar" type="submit">
                            ADICIONAR
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AdicionarCursoComplementar
