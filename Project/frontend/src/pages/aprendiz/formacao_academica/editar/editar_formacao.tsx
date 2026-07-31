import './editar_formacao.css'
import sair from '../../../../assets/img/close.png'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useDropzone } from "react-dropzone";
import download from '../../../../assets/img/icon download.png'
import { useTheme } from '../../../../context/themeContext'
import api from '../../../../services/api'

interface IFormacaoEditar {
    curso: string;
    instituicao: string;
    situacao: string;
    periodoAtual: string;
    totalPeriodos: string;
    nivelFormacao: string;
    descricao: string;
    certificado: File | null;
}

interface Formacao {
    id: number;
    Id_Profile: number;
    name_Curso: string;
    nome_Institucao: string;
    status_Academico: string;
    periodo_Atual: number;
    total_Periodo: number;
    nivel_formacao: string;
    certificado: string | null;
}

interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setFormacaoAcademica: React.Dispatch<React.SetStateAction<boolean>>;
    formacaoSelecionada: Formacao | null;
}

function EditarFormacaoAcademica({
    visible,
    setVisible,
    setFormacaoAcademica,
    formacaoSelecionada
}: Props) {
    const { darkMode } = useTheme();
    const [formacao, setFormacao] = useState<IFormacaoEditar>({
        curso: '',
        instituicao: '',
        situacao: '',
        periodoAtual: '',
        totalPeriodos: '',
        nivelFormacao: '',
        descricao: '',
        certificado: null
    })

    const niveisFormacao = [
        "Ensino Médio",
        "Técnico",
        "Graduação",
        "Pós Graduação"
    ];

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
                setNomeCertificado(arquivo.name);
                setFormacao((prev) => ({
                    ...prev,
                    certificado: arquivo
                }));
            }
        },
    });

    useEffect(() => {
        if (!formacaoSelecionada) return;

        setFormacao({
            curso: formacaoSelecionada.name_Curso,
            instituicao: formacaoSelecionada.nome_Institucao,
            situacao:
                formacaoSelecionada.status_Academico === "CURSANDO"
                    ? "Cursando"
                    : "Concluído",
            periodoAtual: String(formacaoSelecionada.periodo_Atual),
            totalPeriodos: String(formacaoSelecionada.total_Periodo),
            nivelFormacao: formacaoSelecionada.nivel_formacao,
            descricao: "",
            certificado: null
        });

    }, [formacaoSelecionada]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormacao({
            ...formacao,
            [e.target.name]: e.target.value
        })
    }

    const handleSituacao = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valor = e.target.value
        setFormacao({
            ...formacao,
            situacao: valor,
            periodoAtual: valor === "Concluído" ? "" : formacao.periodoAtual
        })
    }

    const handleCertificado = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormacao({
                ...formacao,
                certificado: e.target.files[0]
            })
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (
            !formacao.curso ||
            !formacao.instituicao ||
            !formacao.situacao ||
            !formacao.totalPeriodos ||
            !formacao.nivelFormacao
        ) {
            Swal.fire({
                title: 'Atenção!',
                text: 'Preencha todos os campos obrigatórios.',
                icon: 'warning',
                confirmButtonColor: '#2B83D5'
            })
            return
        }

        if (formacao.situacao === "Cursando" && !formacao.periodoAtual) {
            Swal.fire({
                title: 'Atenção!',
                text: 'Informe o período atual.',
                icon: 'warning',
                confirmButtonColor: '#2B83D5'
            })
            return
        }

        try {
            if (!formacaoSelecionada) return;

            const usuario = localStorage.getItem("usuario");

            if (!usuario) return;

            const aprendiz = JSON.parse(usuario);
            const EDV = aprendiz.user.EDV;

            let nivelFormacao = "";

            switch (formacao.nivelFormacao) {
                case "Ensino Médio":
                    nivelFormacao = "ENSINO_MEDIO";
                    break;

                case "Técnico":
                    nivelFormacao = "TECNICO";
                    break;

                case "Graduação":
                    nivelFormacao = "GRADUACAO";
                    break;

                case "Pós Graduação":
                    nivelFormacao = "POS_GRADUACAO";
                    break;

                default:
                    nivelFormacao = formacao.nivelFormacao;
            }

            const response = await api.put(
                `/aprendiz/atualizarFormacaoAcademica/${EDV}/${formacaoSelecionada.id}`,
                {
                    id: formacaoSelecionada.id,
                    name_Curso: formacao.curso,
                    nome_Institucao: formacao.instituicao,
                    status_Academico:
                        formacao.situacao === "Cursando"
                            ? "CURSANDO"
                            : "CONCLUIDO",
                    periodo_Atual: Number(formacao.periodoAtual),
                    total_Periodo: Number(formacao.totalPeriodos),
                    nivel_formacao: nivelFormacao,
                    certificado: formacao.certificado
                }
            )

            Swal.fire({
                title: 'Sucesso!',
                text: 'Formação acadêmica atualizada com sucesso.',
                icon: 'success',
                confirmButtonColor: '#2B83D5'
            })

            console.log(response.data)

            setVisible(false)

        } catch (error) {
            console.error('Erro ao atualizar:', error)
            Swal.fire({
                title: 'Erro!',
                text: 'Não foi possível atualizar a formação acadêmica.',
                icon: 'error',
                confirmButtonColor: '#2B83D5'
            })
        }
    }

    if (!visible) {
        return null
    }

    return (
        <div className="editarFormacao-overlay" onClick={() => setVisible(false)}>
            <form onSubmit={handleSubmit} className="editarFormacao-card" onClick={(e) => e.stopPropagation()}>
                <button type="button" className="editarFormacao-fechar" onClick={() => {
                    setVisible(false)
                    setFormacaoAcademica(true)
                }}
                >
                    <img src={sair} alt="Fechar" />
                </button>
                <span className="editarFormacao-titulo">Formação Acadêmica</span>
                <div className="editarFormacao-container">
                    <div className="editarFormacao-grupo">
                        <label className="editarFormacao-label">Nome do Curso</label>
                        <input name="curso" className="editarFormacao-input" value={formacao.curso} onChange={handleChange} />
                    </div>
                    <div className="editarFormacao-grupo">
                        <label className="editarFormacao-label">Nome da Instituição</label>
                        <input name="instituicao" className="editarFormacao-input" value={formacao.instituicao} onChange={handleChange} />
                    </div>
                    <div className="editarFormacao-grupo">
                        <label className="editarFormacao-label">Situação</label>
                        <div className="editarFormacao-situacaoContainer">
                            <FormControl className="editarFormacao-radio">
                                <RadioGroup
                                    row
                                    name="situacao"
                                    value={formacao.situacao}
                                    onChange={handleSituacao}
                                >
                                    <FormControlLabel
                                        value="Concluído"
                                        sx={{
                                            "& .MuiFormControlLabel-label": {
                                                fontFamily: "'Poppins', sans-serif",
                                                fontSize: "1rem",
                                                color: "#6a6a6a"
                                            }
                                        }}
                                        control={
                                            <Radio
                                                sx={{
                                                    color: "#2B83D5",
                                                    "&.Mui-checked": { color: "#2B83D5" },
                                                    "& .MuiSvgIcon-root": { fontSize: 24 }
                                                }}
                                            />
                                        }
                                        label="Concluído"
                                    />
                                    <FormControlLabel
                                        value="Cursando"
                                        sx={{
                                            "& .MuiFormControlLabel-label": {
                                                fontFamily: "'Poppins', sans-serif",
                                                fontSize: "1rem",
                                                color: "#6a6a6a"
                                            }
                                        }}
                                        control={
                                            <Radio
                                                sx={{
                                                    color: "#2B83D5",
                                                    "&.Mui-checked": { color: "#2B83D5" },
                                                    "& .MuiSvgIcon-root": { fontSize: 24 }
                                                }}
                                            />
                                        }
                                        label="Cursando"
                                    />
                                </RadioGroup>
                            </FormControl>
                            <div className="editarFormacao-periodos">
                                <div className="editarFormacao-periodoGrupo">
                                    <label className="editarFormacao-label">Período Atual</label>
                                    <input name="periodoAtual" className={formacao.situacao === "Cursando" ? "editarFormacao-input" : "editarFormacao-input periodo-disabled"} value={formacao.periodoAtual} disabled={formacao.situacao !== "Cursando"} onChange={handleChange} />
                                </div>
                                <div className="editarFormacao-periodoGrupo">
                                    <label className="editarFormacao-label">Total de Períodos</label>
                                    <input name="totalPeriodos" className="editarFormacao-input" value={formacao.totalPeriodos} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="editarFormacao-grupo">
                        <label className="editarFormacao-label">Nível de Formação</label>
                        <select name="nivelFormacao" className={`editarFormacao-input ${darkMode ? "dark" : ""}`} value={formacao.nivelFormacao} onChange={handleChange}>
                            <option value="">Selecione o nível</option>
                            {
                                niveisFormacao.map((item) => (
                                    <option key={item} value={item}>{item}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="editarFormacao-grupo">
                        <label className="editarFormacao-label">Certificado</label>
                        <div className="certificado-container" {...getRootProps()}>
                            <input {...getInputProps()} name="certificado" />
                            <p className="certificado-file">{nomeCertificado}</p>
                            <img src={download} alt="upload" className="certificado-upload" />
                        </div>
                    </div>
                    <div className="editarFormacao-botoes">
                        <button type="submit" className="editarFormacao-salvar">
                            SALVAR MODIFICAÇÃO
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditarFormacaoAcademica