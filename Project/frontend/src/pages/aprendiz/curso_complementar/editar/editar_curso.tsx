import './editar_curso.css'
import sair from '../../../../assets/img/close.png'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useDropzone } from "react-dropzone";
import download from '../../../../assets/img/icon download.png'
import api from '../../../../services/api'

interface ICurso {
    id_Curso?: number;
    Id_Profile?: number;
    certificado?: string | null;
    name_Curso: string;
    status_Cursos: "CONCLUIDO" | "CURSANDO" | "NAO_INFORMADO";
    data_Conclusao: string | null;
    carga_horaria: number | null;
}


interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setCursoComplementar: React.Dispatch<React.SetStateAction<boolean>>;
    id_perfil: number;
    cursoAtual:{
        id_Cursos:number;
        Id_Profile:number;
        name_Curso:string;
        status_Cursos:
        "CONCLUIDO" | "CURSANDO"|"NAO_INFORMADO";
        data_Conclusao:string;
        carga_horaria:number;
        certificado?: string|null;
    }
}

function EditarCursoComplementar({
    visible,
    setVisible,
    setCursoComplementar,
    cursoAtual,
    id_perfil,
}: Props) {
    const [arquivoCertificado, setArquivoCertificado] = useState<File | null>(null);


    const [curso, setCurso] = useState<ICurso>({
        id_Curso: cursoAtual.id_Curso,
        Id_Profile: cursoAtual.Id_Profile,
        certificado: null,
        name_Curso: cursoAtual.name_Curso,
        status_Cursos: cursoAtual.status_Cursos,
        data_Conclusao: cursoAtual.data_Conclusao,
        carga_horaria: cursoAtual.carga_horaria
    })

    const [nomeCertificado, setNomeCertificado] = useState("");

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            "image/*": [],

        },
        multiple: false,
        maxFiles: 1,
        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length > 0) {
                const arquivo = acceptedFiles[0];

                setArquivoCertificado(arquivo);
                setNomeCertificado(arquivo.name);
            }
        }

    })

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {

        const { name, value } = e.target;

        setCurso(prev => ({
            ...prev,
            [name]:
                name === "carga_horaria"
                    ? Number(value)
                    : value
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
            status_Cursos: e.target.value
        });

    }


    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        if (
            !curso.name_Curso ||
            !curso.status_Cursos ||
            !curso.carga_horaria
        ) {

            Swal.fire({
                title: 'Atenção!',
                text: 'Preencha todos os campos obrigatórios.',
                icon: 'warning',
                confirmButtonColor: '#2B83D5'
            })
            return;
        }

        if (!curso.data_Conclusao) {
            Swal.fire({
                title: 'Atenção!',
                text: 'Informe a data de conclusão.',
                icon: 'warning',
                confirmButtonColor: '#2B83D5'
            })
            return;
        }

        try {
            const usuario = localStorage.getItem("usuario");
            if (!usuario) return;
            const aprendizLogado = JSON.parse(usuario);
            const edv = aprendizLogado.user.EDV;
            console.log(curso.Id_Profile)

            await api.put(
                `http://localhost:8080/api/aprendiz/atualizarCursos/${edv}/${id_perfil}`,
                {
                    id_Curso: curso.id_Curso,
                    Id_Profile: curso.Id_Profile,
                    name_Curso: curso.name_Curso,
                    status_Cursos: curso.status_Cursos,
                    data_Conclusao: curso.data_Conclusao,
                    carga_horaria: curso.carga_horaria,
                }
            )
            // const formData = new FormData();

            // formData.append("certificado", arquivoCertificado!);

            // await api.post(`/curso/certificado/${id_perfil}`, formData);

            Swal.fire({
                title: 'Sucesso!',
                text: 'Curso complementar atualizado com sucesso.',
                icon: 'success',
                confirmButtonColor: '#2B83D5'
            })

            setVisible(false);

        } catch (error) {
            console.error(error)

            Swal.fire({
                title: 'Erro!',
                text: 'Não foi possível atualizar o curso complementar.',
                icon: 'error'
            })
        }
    }

    if (!visible) {
        return null
    }

    return (
        <div className="editarCurso-overlay" onClick={() => setVisible(false)}>
            <form onSubmit={handleSubmit} className="editarCurso-card" onClick={(e) => e.stopPropagation()}>
                <button type="button" className="editarCurso-fechar" onClick={() => {
                    setVisible(false)
                    setCursoComplementar(true)
                }}
                >
                    <img src={sair} alt="Fechar" />
                </button>
                <span className="editarCurso-titulo">Curso Complementar</span>
                <div className="editarCurso-container">
                    <div className="editarCurso-grupo">
                        <label className="editarCurso-label">Nome do Curso</label>
                        <input name="name_Curso" className="editarCurso-input" value={curso.name_Curso} onChange={handleChange} />
                    </div>
                    <div className="editarCurso-grupo">
                        <label className="editarCurso-label">Situação</label>
                        <FormControl>
                            <RadioGroup
                                row
                                name="situacao"
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
                    <div className="editarCurso-grupo">
                        <label className="editarCurso-label">Data de Conclusão</label>
                        <input type="text" name="data_Conclusao" maxLength={10} value={formatarData(curso.data_Conclusao ?? "")} onChange={handleDataConclusao} /></div>
                    <div className="editarCurso-grupo">
                        <label className="editarCurso-label">Carga Horária</label>
                        <input name="carga_horaria" className="editarCurso-input" value={curso.carga_horaria ?? 0} onChange={handleChange} />
                    </div>
                    <div className="editarCurso-grupo">
                        <label className="editarCurso-label">Certificado</label>
                        <div className="certificado-container"
                            {...getRootProps()}
                        >
                            <input {...getInputProps()} />
                            <p className="certificado-file">{nomeCertificado}</p>
                            <img src={download} className="certificado-upload" alt="upload" />
                        </div>
                    </div>
                    <div className="editarCurso-botoes">
                        <button className="editarCurso-salvar" type="submit">SALVAR MODIFICAÇÃO</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditarCursoComplementar

function formatarData(data: string) {
    if (!data) return "";
    if (data.includes("T")) {
        const [ano, mes, dia] = data.split("T")[0].split("-");

        return `${dia}/${mes}/${ano}`;
    }
    if (data.includes("/")) {
        return data;
    }
    return "";
}