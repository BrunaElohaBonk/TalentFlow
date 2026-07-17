import './ver.css'
import icon_fechar from '../../../../assets/img/close.png'

interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    formacao: {
        id: number;
        curso: string;
        instituicao: string;
        situacao: string;
        periodoAtual: number;
        totalPeriodos: number;
        nivelFormacao: string;
        descricao: string;
        certificado: File | null;
    };
}


function FormacaoAcademicaVisualizar({
    visible,
    setVisible,
    formacao
}: Props) {


    if (!visible) {
        return null
    }


    return (

        <div className="formacaoVisualizar-overlay">


            <div className="formacaoVisualizar-card">


                <div className="formacaoVisualizar-header">

                    <h2>
                        Formação Acadêmica
                    </h2>


                    <div className="formacaoVisualizar-acoes">

                        <button
                            className="formacaoVisualizar-fechar"
                            onClick={() => setVisible(false)}
                        >

                            <img
                                src={icon_fechar}
                                alt="Fechar"
                            />

                        </button>

                    </div>


                </div>




                <div className="formacaoVisualizar-conteudo">


                    <div className="formacaoVisualizar-item">

                        <span>
                            Nome do Curso
                        </span>

                        <p>
                            {formacao.curso || "Não informado."}
                        </p>

                    </div>





                    <div className="formacaoVisualizar-item">

                        <span>
                            Nome da Instituição
                        </span>

                        <p>
                            {formacao.instituicao || "Não informado."}
                        </p>

                    </div>





                    <div className="formacaoVisualizar-item">

                        <span>
                            Situação
                        </span>

                        <p>
                            {formacao.situacao || "Não informado."}
                        </p>

                    </div>





                    {
                        formacao.situacao === "Cursando" && (

                            <div className="formacaoVisualizar-item">

                                <span>
                                    Período Atual
                                </span>

                                <p>
                                    {formacao.periodoAtual || "Não informado."}
                                </p>

                            </div>

                        )
                    }






                    <div className="formacaoVisualizar-item">

                        <span>
                            Total de Períodos
                        </span>

                        <p>
                            {formacao.totalPeriodos || "Não informado."}
                        </p>

                    </div>






                    <div className="formacaoVisualizar-item">

                        <span>
                            Nível de Formação
                        </span>

                        <p>
                            {formacao.nivelFormacao || "Não informado."}
                        </p>

                    </div>







                    <div className="formacaoVisualizar-item formacaoVisualizar-descricao">

                        <span>
                            Descrição
                        </span>

                        <p>
                            {formacao.descricao || "Não informado."}
                        </p>

                    </div>







                    <div className="formacaoVisualizar-item certificado-item">

                        <span>
                            Certificado
                        </span>


                        {
                            formacao.certificado ? (

                                <p>

                                    <img
                                        src={URL.createObjectURL(formacao.certificado)}
                                        alt="Certificado"
                                        className="certificado-img"
                                    />

                                </p>


                            ) : (

                                <p>
                                    Não incluído
                                </p>

                            )
                        }


                    </div>





                </div>


            </div>


        </div>

    )

}


export default FormacaoAcademicaVisualizar