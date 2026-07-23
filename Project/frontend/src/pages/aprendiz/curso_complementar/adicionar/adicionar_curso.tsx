import './adicionar_curso.css'
import sair from '../../../../assets/img/close.png'
import { useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useDropzone } from "react-dropzone";
import download from '../../../../assets/img/icon download.png'

interface ICurso {
    nomeCurso: string;
    situacao: string;
    dataConclusao: string;
    cargaHoraria: string;
    descricaoCurso: string;
    certificado: File | null;
}

interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setCursoComplementar: React.Dispatch<React.SetStateAction<boolean>>;
}

function AdicionarCursoComplementar({
    visible,
    setVisible,
    setCursoComplementar
}: Props) {

    const [curso, setCurso] = useState<ICurso>({
        nomeCurso: '',
        situacao: '',
        dataConclusao: '',
        cargaHoraria: '',
        descricaoCurso: '',
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

                setCurso((prev) => ({
                    ...prev,
                    certificado: arquivo
                }))
            }
        }
    })

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {

        setCurso({
            ...curso,
            [e.target.name]: e.target.value
        })

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
            dataConclusao: valor
        });
    }

    const handleSituacao = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        setCurso({
            ...curso,
            situacao: e.target.value
        });
    }

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (
            !curso.nomeCurso ||
            !curso.situacao ||
            !curso.dataConclusao ||
            !curso.cargaHoraria ||
            !curso.descricaoCurso
        ) {

            Swal.fire({
                title: 'Atenção!',
                text: 'Preencha todos os campos obrigatórios.',
                icon: 'warning',
                confirmButtonColor: '#2B83D5'
            })
            return;
        }

        try {
            await axios.post(
                `link backend`,
                {
                    ...curso
                }
            )

            Swal.fire({
                title: 'Sucesso!',
                text: 'Curso complementar cadastrado com sucesso.',
                icon: 'success',
                confirmButtonColor: '#2B83D5'
            })

            setVisible(false);

        } catch(error) {
            console.error(error)
            Swal.fire({
                title: 'Erro!',
                text: 'Não foi possível cadastrar o curso complementar.',
                icon: 'error'
            })
        }
    }

    if(!visible){
        return null;
    }

    return(
        <div className="adicionarCurso-overlay" onClick={() => setVisible(false)}>
            <form onSubmit={handleSubmit} className="adicionarCurso-card" onClick={(e) => e.stopPropagation()}>
                <button type="button" className="adicionarCurso-fechar" onClick={()=>{
                        setVisible(false)
                        setCursoComplementar(true)
                    }}
                >
                    <img src={sair} alt="Fechar"/>
                </button>
                <span className="adicionarCurso-titulo">Curso Complementar</span>
                <div className="adicionarCurso-container">
                    <div className="adicionarCurso-grupo">
                        <label className="adicionarCurso-label">Nome do Curso</label>
                        <input name="nomeCurso" className="adicionarCurso-input" value={curso.nomeCurso} onChange={handleChange}/>
                    </div>
                    <div className="adicionarCurso-grupo">
                        <label className="adicionarCurso-label">Situação</label>
                        <FormControl>
                            <RadioGroup
                                row
                                name="situacao"
                                value={curso.situacao}
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
                    </div>
                    <div className="adicionarCurso-grupo">
                        <label className="adicionarCurso-label">Data de Conclusão</label>
                        <input type="text" name="dataConclusao" maxLength={10} className="adicionarCurso-input" value={curso.dataConclusao} onChange={handleDataConclusao}/>
                    </div>
                    <div className="adicionarCurso-grupo">
                        <label className="adicionarCurso-label">Carga Horária</label>
                        <input name="cargaHoraria" className="adicionarCurso-input" value={curso.cargaHoraria} onChange={handleChange}/>
                    </div>
                    <div className="adicionarCurso-grupo">
                        <label className="adicionarCurso-label">Descrição do Curso</label>
                        <textarea name="descricaoCurso" className="adicionarCurso-textarea" value={curso.descricaoCurso} onChange={handleChange}/>
                    </div>
                    <div className="adicionarCurso-grupo">
                        <label className="adicionarCurso-label">Certificado</label>
                        <div className="certificado-container" {...getRootProps()}>
                            <input {...getInputProps()}/>
                            <p className="certificado-file">{nomeCertificado}</p>
                            <img src={download} className="certificado-upload" alt="upload"/>
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
