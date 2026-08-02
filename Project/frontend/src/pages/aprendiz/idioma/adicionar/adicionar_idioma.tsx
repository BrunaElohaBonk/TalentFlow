import './adicionar_idoma.css'
import sair from '../../../../assets/img/close.png'
import { useState } from 'react'
import Swal from 'sweetalert2'
import api from '../../../../services/api'
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useDropzone } from "react-dropzone";
import download from '../../../../assets/img/icon download.png'

interface IIdioma {
    nomeIdioma: string;
    nivel: string;
    certificado: File | null;
}

interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setIdioma: React.Dispatch<React.SetStateAction<boolean>>;
    onSuccess: () => void;
    id: number;
    edv: number;
    carregarIdiomas: () => void;
}

function AdicionarIdioma({
    visible,
    setVisible,
    setIdioma,
    onSuccess,
    id,
    edv,
    carregarIdiomas
}: Props) {

    const [idioma, setIdiomaState] = useState<IIdioma>({
        nomeIdioma: '',
        nivel: '',
        certificado: null
    })

    const idiomas = [
        { label: "Alemão", value: "ALEMAO" },
        { label: "Árabe", value: "ARABE" },
        { label: "Coreano", value: "COREANO" },
        { label: "Espanhol", value: "ESPANHOL" },
        { label: "Francês", value: "FRANCES" },
        { label: "Inglês", value: "INGLES" },
        { label: "Italiano", value: "ITALIANO" },
        { label: "Japonês", value: "JAPONES" },
        { label: "Mandarim", value: "MANDARIM" },
        { label: "Russo", value: "RUSSO" },
        { label: "Tailandês", value: "TAILANDES" }
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
                setIdiomaState((prev) => ({
                    ...prev,
                    certificado: arquivo
                }))
            }
        }
    })

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setIdiomaState({
            ...idioma,
            [e.target.name]: e.target.value
        })
    }

    const handleNivel = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setIdiomaState({
            ...idioma,
            nivel: e.target.value
        })
    }

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        if (
            !idioma.nomeIdioma ||
            !idioma.nivel
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
            await api.post(`/aprendiz/adicionarIdioma/${edv}/${id}`, {
                nome_Idioma: idioma.nomeIdioma,
                nivel_Idioma: idioma.nivel
            })
            
            await Swal.fire({
                title: 'Sucesso!',
                text: 'Idioma adicionado com sucesso.',
                icon: 'success',
                confirmButtonColor: '#2B83D5'
            })
            setVisible(false);
            carregarIdiomas();
            onSuccess()
        } catch (error: any) {
            console.error("ERRO AO ADICIONAR IDIOMA:", error.response?.data || error);

            Swal.fire({
                title: 'Erro!',
                text: error.response?.data?.message || 'Não foi possível adicionar o idioma.',
                icon: 'error'
            })
        }
    }

    if (!visible) {
        return null
    }

    return (
        <div className="adicionarIdioma-overlay" onClick={() => setVisible(false)}>
            <form onSubmit={handleSubmit} className="adicionarIdioma-card" onClick={(e) => e.stopPropagation()}>
                <button
                    type="button"
                    className="adicionarIdioma-fechar"
                    onClick={() => {
                        setVisible(false);
                    }}
                >
                    <img src={sair} alt="Fechar" />
                </button>
                <span className="adicionarIdioma-titulo">Idioma</span>
                <div className="adicionarIdioma-container">
                    <div className="adicionarIdioma-grupo">
                        <label className="adicionarIdioma-label">Nome do Idioma</label>
                        <select name="nomeIdioma" className="adicionarIdioma-input" value={idioma.nomeIdioma} onChange={handleChange}>
                            <option value="">Selecione o idioma</option>
                            {
                                idiomas.map((item) => (
                                    <option key={item.value} value={item.value}>
                                        {item.label}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="adicionarIdioma-grupo">
                        <label className="adicionarIdioma-label">Nível</label>
                        <FormControl className="adicionarIdioma-radio">
                            <RadioGroup
                                row
                                name="nivel"
                                value={idioma.nivel}
                                onChange={handleNivel}
                            >
                                <FormControlLabel
                                    value="BASICO"
                                    control={
                                        <Radio
                                            sx={{
                                                color: "#2B83D5",
                                                "&.Mui-checked": {
                                                    color: "#2B83D5"
                                                },
                                                "& .MuiSvgIcon-root": {
                                                    fontSize: 24
                                                }
                                            }}
                                        />
                                    }
                                    label="Básico"
                                />
                                <FormControlLabel
                                    value="INTERMEDIARIO"
                                    control={
                                        <Radio
                                            sx={{
                                                color: "#2B83D5",
                                                "&.Mui-checked": {
                                                    color: "#2B83D5"
                                                },
                                                "& .MuiSvgIcon-root": {
                                                    fontSize: 24
                                                }
                                            }}
                                        />
                                    }
                                    label="Intermediário"
                                />
                                <FormControlLabel
                                    value="AVANCADO"
                                    control={
                                        <Radio
                                            sx={{
                                                color: "#2B83D5",
                                                "&.Mui-checked": {
                                                    color: "#2B83D5"
                                                },
                                                "& .MuiSvgIcon-root": {
                                                    fontSize: 24
                                                }
                                            }}
                                        />
                                    }
                                    label="Avançado"
                                />
                                <FormControlLabel
                                    value="FLUENTE"
                                    control={
                                        <Radio
                                            sx={{
                                                color: "#2B83D5",
                                                "&.Mui-checked": {
                                                    color: "#2B83D5"
                                                },
                                                "& .MuiSvgIcon-root": {
                                                    fontSize: 24
                                                }
                                            }}
                                        />
                                    }
                                    label="Fluente"
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className="adicionarIdioma-grupo">
                        <label className="adicionarIdioma-label">Certificado</label>
                        <div
                            className="certificado-container"
                            {...getRootProps()}
                        >
                            <input {...getInputProps()} />
                            <p className="certificado-file">{nomeCertificado}</p>
                            <img src={download} className="certificado-upload" alt="upload" />
                        </div>
                    </div>
                    <div className="adicionarIdioma-botoes">
                        <button className="adicionarIdioma-salvar" type="submit">
                            ADICIONAR
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )

}
export default AdicionarIdioma