import './editar_idioma.css'
import sair from '../../../../assets/img/close.png'
import { useState } from 'react'
import Swal from 'sweetalert2'
import api from '../../../../services/api'
import { useDropzone } from "react-dropzone";
import download from '../../../../assets/img/icon download.png'
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";

interface IIdioma {
    nomeIdioma: string;
    nivel: string;
    certificado: File | null;
}

interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setIdioma: React.Dispatch<React.SetStateAction<boolean>>;
    id: number;
    edv: number;
    idiomaAtual: {
        nome_Idioma: string;
        nivel_Idioma: string;
        certificado: string | null;
    };
}

function EditarIdioma({
    visible,
    setVisible,
    id,
    edv,
    idiomaAtual
}: Props) {

    const [idioma, setIdiomaState] = useState<IIdioma>({
        nomeIdioma: idiomaAtual.nome_Idioma,
        nivel: idiomaAtual.nivel_Idioma,
        certificado: null
    });

    const [nomeCertificado, setNomeCertificado] = useState(
        idiomaAtual.certificado ?? ""
    );


    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            "image/*": []
        },
        multiple: false,
        maxFiles: 1,
        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length > 0) {
                const arquivo = acceptedFiles[0];

                setNomeCertificado(arquivo.name);

                setIdiomaState((prev) => ({
                    ...prev,
                    certificado: arquivo
                }));
            }
        }
    });


    const handleNivel = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setIdiomaState({
            ...idioma,
            nivel: e.target.value
        });
    };


    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (!idioma.nivel) {
            Swal.fire({
                title: 'Atenção!',
                text: 'Selecione o nível do idioma.',
                icon: 'warning',
                confirmButtonColor: '#2B83D5'
            });

            return;
        }


        try {

            await api.put(
                `/aprendiz/atualizarIdiomas/${edv}/${id}`,
                {
                    nome_Idioma: idioma.nomeIdioma,
                    nivel_Idioma: idioma.nivel,
                    certificado: idioma.certificado
                }
            );


            Swal.fire({
                title: 'Sucesso!',
                text: 'Idioma atualizado com sucesso.',
                icon: 'success',
                confirmButtonColor: '#2B83D5'
            });


            setVisible(false);


        } catch (error: any) {
            console.error("ERRO COMPLETO:", error);
            console.error("RESPOSTA BACK:", error.response?.data);

            console.error(
                "ERRO AO ATUALIZAR IDIOMA:",
                error.response?.data || error
            );


            Swal.fire({
                title: 'Erro!',
                text: 'Não foi possível atualizar o idioma.',
                icon: 'error'
            });
        }
    };


    if (!visible) {
        return null;
    }


    return (
        <div
            className="editarIdioma-overlay"
            onClick={() => setVisible(false)}
        >

            <form
                onSubmit={handleSubmit}
                className="editarIdioma-card"
                onClick={(e) => e.stopPropagation()}
            >

                <button
                    type="button"
                    className="editarIdioma-fechar"
                    onClick={() => setVisible(false)}
                >
                    <img src={sair} alt="Fechar" />
                </button>


                <span className="editarIdioma-titulo">
                    Idioma
                </span>


                <div className="editarIdioma-container">


                    <div className="editarIdioma-grupo">

                        <label className="editarIdioma-label">
                            Nome do Idioma
                        </label>


                        <input
                            className="editarIdioma-input"
                            value={idioma.nomeIdioma}
                            disabled
                        />

                    </div>



                    <div className="editarIdioma-grupo">

                        <label className="editarIdioma-label">
                            Nível
                        </label>


                        <FormControl>

                            <RadioGroup
                                row
                                value={idioma.nivel}
                                onChange={handleNivel}
                            >

                                <FormControlLabel
                                    value="BASICO"
                                    control={<Radio />}
                                    label="Básico"
                                />

                                <FormControlLabel
                                    value="INTERMEDIARIO"
                                    control={<Radio />}
                                    label="Intermediário"
                                />

                                <FormControlLabel
                                    value="AVANCADO"
                                    control={<Radio />}
                                    label="Avançado"
                                />

                                <FormControlLabel
                                    value="FLUENTE"
                                    control={<Radio />}
                                    label="Fluente"
                                />

                            </RadioGroup>

                        </FormControl>


                    </div>



                    <div className="editarIdioma-grupo">

                        <label className="editarIdioma-label">
                            Certificado
                        </label>


                        <div
                            className="certificado-container"
                            {...getRootProps()}
                        >

                            <input {...getInputProps()} />

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



                    <div className="editarIdioma-botoes">

                        <button
                            type="submit"
                            className="editarIdioma-salvar"
                        >
                            SALVAR MODIFICAÇÃO
                        </button>

                    </div>


                </div>


            </form>


        </div>
    );
}

export default EditarIdioma;