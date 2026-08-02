import "./adicionar.css";
import sair from "../../../../assets/img/close.png";
import { useState } from "react";
import Swal from "sweetalert2";
import api from "../../../../services/api";
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useDropzone } from "react-dropzone";
import download from "../../../../assets/img/icon download.png";
import { useTheme } from "../../../../context/themeContext";

interface IFormacao {
    curso: string;
    instituicao: string;
    situacao: string;
    periodoAtual: string;
    totalPeriodos: string;
    nivelFormacao: string;
    certificado: File | null;
}

interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setFormacaoAcademica: React.Dispatch<React.SetStateAction<boolean>>;
    onSuccess: () => void;
    edv: number;
}

function AdicionarFormacaoAcademica({
    visible,
    setVisible,
    setFormacaoAcademica,
    onSuccess,
    edv
}: Props) {
    const { darkMode } = useTheme();
    const [formacao, setFormacao] = useState<IFormacao>({
        curso: "",
        instituicao: "",
        situacao: "",
        periodoAtual: "",
        totalPeriodos: "",
        nivelFormacao: "",
        certificado: null,
    });

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
                    certificado: arquivo,
                }));
            }
        },
    });

    const niveisFormacao = [
        "Ensino Médio",
        "Técnico",
        "Graduação",
        "Pós Graduação"
    ];

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormacao({
            ...formacao,
            [e.target.name]: e.target.value,
        });
    };

    const handleSituacao = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const valor = e.target.value;

        setFormacao({
            ...formacao,
            situacao: valor,
            periodoAtual:
                valor === "Concluído" ? "" : formacao.periodoAtual,
        });
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (
            !formacao.curso ||
            !formacao.instituicao ||
            !formacao.situacao ||
            !formacao.totalPeriodos ||
            !formacao.nivelFormacao

        ) {
            Swal.fire({
                title: "Atenção!",
                text: "Preencha todos os campos obrigatórios.",
                icon: "warning",
                confirmButtonColor: "#2B83D5",
            });

            return;
        }

        if (
            formacao.situacao === "Cursando" &&
            !formacao.periodoAtual
        ) {
            Swal.fire({
                title: "Atenção!",
                text: "Informe o período atual.",
                icon: "warning",
                confirmButtonColor: "#2B83D5",
            });

            return;
        }

        try {
             await api.post(
                `/aprendiz/adicionarFormacao/${edv}`,
                {
                    curso: formacao.curso,
                    instituicao: formacao.instituicao,
                    situacao: formacao.situacao,
                    periodoAtual: formacao.periodoAtual,
                    totalPeriodos: formacao.totalPeriodos,
                    nivelFormacao: formacao.nivelFormacao,
                    certificado: null
                }
            );

            Swal.fire({
                title: "Sucesso!",
                text: "Formação acadêmica cadastrada com sucesso.",
                icon: "success",
                confirmButtonColor: "#2B83D5",
            });

            setVisible(false);
            onSuccess();

            setFormacao({
                curso: "",
                instituicao: "",
                situacao: "",
                periodoAtual: "",
                totalPeriodos: "",
                nivelFormacao: "",
                certificado: null,
            });

            setNomeCertificado("");
        } catch (error) {
            console.error(error);

            Swal.fire({
                title: "Erro!",
                text: "Não foi possível cadastrar a formação.",
                icon: "error",
                confirmButtonColor: "#2B83D5",
            });
        }
    };

    if (!visible) return null;

    return (
        <div className="adicionarFormacao-overlay" onClick={() => setVisible(false)}>
            <form
                onSubmit={handleSubmit}
                className="adicionarFormacao-card"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    className="adicionarFormacao-fechar"
                    onClick={() => {
                        setVisible(false)
                        setFormacaoAcademica(true);
                    }}
                >
                    <img src={sair} alt="Fechar" />
                </button>

                <span className="adicionarFormacao-titulo">
                    Adicionar Formação Acadêmica
                </span>

                <div className="adicionarFormacao-container">

                    <div className="adicionarFormacao-grupo">
                        <label className="adicionarFormacao-label">
                            Nome do Curso
                        </label>

                        <input
                            name="curso"
                            className="adicionarFormacao-input"
                            value={formacao.curso}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="adicionarFormacao-grupo">
                        <label className="adicionarFormacao-label">
                            Nome da Instituição
                        </label>

                        <input
                            name="instituicao"
                            className="adicionarFormacao-input"
                            value={formacao.instituicao}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="adicionarFormacao-grupo">
                        <label className="adicionarFormacao-label">
                            Situação
                        </label>

                        <div className="adicionarFormacao-situacaoContainer">

                            <FormControl className="adicionarFormacao-radio">

                                <RadioGroup
                                    row
                                    value={formacao.situacao}
                                    onChange={handleSituacao}
                                >
                                    <FormControlLabel
                                        value="Concluído"
                                        control={<Radio />}
                                        label="Concluído"
                                    />

                                    <FormControlLabel
                                        value="Cursando"
                                        control={<Radio />}
                                        label="Cursando"
                                    />
                                </RadioGroup>

                            </FormControl>

                            <div className="adicionarFormacao-periodos">

                                <div className="adicionarFormacao-periodoGrupo">
                                    <label className="adicionarFormacao-label">
                                        Período Atual
                                    </label>

                                    <input
                                        name="periodoAtual"
                                        className={
                                            formacao.situacao ===
                                                "Cursando"
                                                ? "adicionarFormacao-input"
                                                : "adicionarFormacao-input periodo-disabled"
                                        }
                                        disabled={
                                            formacao.situacao !==
                                            "Cursando"
                                        }
                                        value={formacao.periodoAtual}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="adicionarFormacao-periodoGrupo">
                                    <label className="adicionarFormacao-label">
                                        Total de Períodos
                                    </label>

                                    <input
                                        name="totalPeriodos"
                                        className="adicionarFormacao-input"
                                        value={
                                            formacao.totalPeriodos
                                        }
                                        onChange={handleChange}
                                    />
                                </div>

                            </div>

                        </div>
                    </div>

                    <div className="adicionarFormacao-grupo">
                        <label className="adicionarFormacao-label">
                            Nível de Formação
                        </label>
                        <select name="nivelFormacao" className={`editarFormacao-input ${darkMode ? "dark" : ""}`} value={formacao.nivelFormacao} onChange={handleChange}>
                            <option value="">Selecione o nível</option>
                            {
                                niveisFormacao.map((item) => (
                                    <option key={item} value={item}>{item}</option>
                                ))
                            }
                        </select>
                    </div>


                    <div className="adicionarFormacao-grupo">
                        <label className="adicionarFormacao-label">
                            Certificado
                        </label>

                        <div
                            className="certificado-container"
                            {...getRootProps()}
                        >
                            <input {...getInputProps()} />

                            <p className="certificado-file">
                                {nomeCertificado ||
                                    "Selecione um certificado"}
                            </p>

                            <img
                                src={download}
                                alt="upload"
                                className="certificado-upload"
                            />
                        </div>
                    </div>

                    <div className="adicionarFormacao-botoes">
                        <button
                            type="submit"
                            className="adicionarFormacao-salvar"
                        >
                            ADICIONAR
                        </button>
                    </div>

                </div>
            </form>
        </div>
    );
}

export default AdicionarFormacaoAcademica;