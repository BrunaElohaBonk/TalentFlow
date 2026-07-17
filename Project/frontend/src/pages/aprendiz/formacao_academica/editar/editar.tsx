import './editar.css'
import sair from '../../../../assets/img/close.png'
import { useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";

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
}

function EditarFormacaoAcademica({ visible, setVisible, id }: Props) {

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

    console.log("EDITAR FORMULAÇÃO ABERTO")

    return (

        <div className="editarFormacao-overlay">

            <form 
                onSubmit={handleSubmit}
                className="editarFormacao-card"
            >

                <button
                    type="button"
                    className="editarFormacao-fechar"
                    onClick={() => setVisible(false)}
                >

                    <img src={sair} alt="Fechar"/>

                </button>


                <span className="editarFormacao-titulo">
                    Formação Acadêmica
                </span>


                <div className="editarFormacao-container">


                    <div className="editarFormacao-grupo">

                        <input
                            name="curso"
                            placeholder="Nome do Curso"
                            className="editarFormacao-input"
                            value={formacao.curso}
                            onChange={handleChange}
                        />

                    </div>


                    <div className="editarFormacao-grupo">

                        <input
                            name="instituicao"
                            placeholder="Nome da Instituição"
                            className="editarFormacao-input"
                            value={formacao.instituicao}
                            onChange={handleChange}
                        />

                    </div>


                    <div className="editarFormacao-periodo">


                        <FormControl className="editarFormacao-radio">

                            <RadioGroup
                                row
                                value={formacao.situacao}
                                onChange={handleSituacao}
                            >

                                <FormControlLabel
                                    value="Concluído"
                                    control={
                                        <Radio
                                            sx={{
                                                color:"#2B83D5",
                                                "&.Mui-checked":{
                                                    color:"#2B83D5"
                                                }
                                            }}
                                        />
                                    }
                                    label="Concluído"
                                />


                                <FormControlLabel
                                    value="Cursando"
                                    control={
                                        <Radio
                                            sx={{
                                                color:"#2B83D5",
                                                "&.Mui-checked":{
                                                    color:"#2B83D5"
                                                }
                                            }}
                                        />
                                    }
                                    label="Cursando"
                                />

                            </RadioGroup>

                        </FormControl>



                        <div className="editarFormacao-periodos">

                            <input
                                name="periodoAtual"
                                placeholder="Período Atual"
                                className={
                                    formacao.situacao === "Concluído"
                                    ?
                                    "editarFormacao-input periodo-disabled"
                                    :
                                    "editarFormacao-input"
                                }
                                value={formacao.periodoAtual}
                                disabled={formacao.situacao === "Concluído"}
                                onChange={handleChange}
                            />


                            <input
                                name="totalPeriodos"
                                placeholder="Total de Períodos"
                                className="editarFormacao-input"
                                value={formacao.totalPeriodos}
                                onChange={handleChange}
                            />

                        </div>


                    </div>


                    <input
                        name="nivelFormacao"
                        placeholder="Nível de Formação"
                        className="editarFormacao-input"
                        value={formacao.nivelFormacao}
                        onChange={handleChange}
                    />


                    <textarea
                        name="descricao"
                        placeholder="Descrição do curso"
                        className="editarFormacao-textarea"
                        value={formacao.descricao}
                        onChange={handleChange}
                    />


                    <label className="editarFormacao-certificado">

                        Certificado

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleCertificado}
                        />

                    </label>



                    <button
                        type="submit"
                        className="editarFormacao-salvar"
                    >

                        SALVAR MODIFICAÇÃO

                    </button>


                </div>


            </form>

        </div>

    )

}


export default EditarFormacaoAcademica