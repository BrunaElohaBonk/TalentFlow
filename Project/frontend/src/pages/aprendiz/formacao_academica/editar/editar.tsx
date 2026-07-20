import './editar.css'
import sair from '../../../../assets/img/close.png'
import { useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useDropzone } from "react-dropzone";
import download from '../../../../assets/img/icon download.png'

interface IFormacao {
    curso: string;
    instituicao: string;
    situacao: string;
    periodoAtual: string;
    totalPeriodos: string;
    nivelFormacao: string;
    descricao: string;
    certificado: File | null;
}

interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setFormacaoAcademica: React.Dispatch<React.SetStateAction<boolean>>;
    id: number;
}

function EditarFormacaoAcademica({ visible, setVisible, setFormacaoAcademica, id }: Props) {

    const [formacao, setFormacao] = useState<IFormacao>({
        curso: '',
        instituicao: '',
        situacao: '',
        periodoAtual: '',
        totalPeriodos: '',
        nivelFormacao: '',
        descricao: '',
        certificado: null
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

                setNomeCertificado(arquivo.name);

                setFormacao((prev) => ({
                    ...prev,
                    certificado: arquivo
                }));

            }

        },
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

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
            !formacao.nivelFormacao ||
            !formacao.descricao
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

            const response = await axios.put(
                `link backend/${id}`,
                {
                    ...formacao
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

        <div className="editarFormacao-overlay">

            <form
                onSubmit={handleSubmit}
                className="editarFormacao-card"
            >

                <button
                    type="button"
                    className="editarFormacao-fechar"
                    onClick={() => {
                        setVisible(false)
                        setFormacaoAcademica(true)
                    }}
                >

                    <img src={sair} alt="Fechar" />

                </button>


                <span className="editarFormacao-titulo">
                    Formação Acadêmica
                </span>


                <div className="editarFormacao-container">


                    <div className="editarFormacao-grupo">

                        <label className="editarFormacao-label">
                            Nome do Curso
                        </label>


                        <input
                            name="curso"
                            className="editarFormacao-input"
                            value={formacao.curso}
                            onChange={handleChange}
                        />

                    </div>


                    <div className="editarFormacao-grupo">

                        <label className="editarFormacao-label">
                            Nome da Instituição
                        </label>


                        <input
                            name="instituicao"
                            className="editarFormacao-input"
                            value={formacao.instituicao}
                            onChange={handleChange}
                        />

                    </div>


                    <div className="editarFormacao-grupo">

                        <label className="editarFormacao-label">
                            Situação
                        </label>


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

                                    <label className="editarFormacao-label">
                                        Período Atual
                                    </label>


                                    <input
                                        name="periodoAtual"
                                        className={
                                            formacao.situacao === "Cursando"
                                                ?
                                                "editarFormacao-input"
                                                :
                                                "editarFormacao-input periodo-disabled"
                                        }
                                        value={formacao.periodoAtual}
                                        disabled={formacao.situacao !== "Cursando"}
                                        onChange={handleChange}
                                    />

                                </div>



                                <div className="editarFormacao-periodoGrupo">

                                    <label className="editarFormacao-label">
                                        Total de Períodos
                                    </label>


                                    <input
                                        name="totalPeriodos"
                                        className="editarFormacao-input"
                                        value={formacao.totalPeriodos}
                                        onChange={handleChange}
                                    />

                                </div>


                            </div>


                        </div>


                    </div>
                    <div className="editarFormacao-grupo">

                        <label className="editarFormacao-label">
                            Nível de Formação
                        </label>


                        <input
                            name="nivelFormacao"
                            className="editarFormacao-input"
                            value={formacao.nivelFormacao}
                            onChange={handleChange}
                        />

                    </div>



                    <div className="editarFormacao-grupo">

                        <label className="editarFormacao-label">
                            Descrição
                        </label>


                        <textarea
                            name="descricao"
                            className="editarFormacao-textarea"
                            value={formacao.descricao}
                            onChange={handleChange}
                        />


                    </div>



                    <div className="editarFormacao-grupo">

                        <label className="editarFormacao-label">
                            Certificado
                        </label>


                        <div
                            className="certificado-container"
                            {...getRootProps()}
                        >

                            <input {...getInputProps()} name="certificado" />

                            <p className="certificado-file">
                                {nomeCertificado}
                            </p>


                            <img
                                src={download}
                                alt="upload"
                                className="certificado-upload"
                            />


                        </div>

                    </div>



                    <div className="editarFormacao-botoes">

                        <button
                            type="submit"
                            className="editarFormacao-salvar"
                        >

                            SALVAR MODIFICAÇÃO

                        </button>


                    </div>


                </div>


            </form>


        </div>

    )

}


export default EditarFormacaoAcademica