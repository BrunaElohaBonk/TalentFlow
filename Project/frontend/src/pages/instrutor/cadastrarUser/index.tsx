import { useParams } from "react-router-dom";
import Header from "../../../components/header";
import Sidebar from "../../../components/sidebar";
import './cadastrarUser.css';
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

interface IUser {
    edv: number;
    name: string;
    turma: string;
    email: string;
    user: string;
    nascimento: Date;
    contato: number;
    senha: string;
}

function CadastrarUser() {
    const { id } = useParams();
    const [user, setUser] = useState<IUser>({
        edv: 0,
        name: '',
        turma: '',
        email: '',
        user: '',
        nascimento: new Date(''),
        contato: 0,
        senha: '',

    });
    const fetchUser = async () => {
        try {
            const response = await axios.get(`link backend`);
            const Usuario = response.data.response;
            setUser({
                edv: Usuario.edv || '',
                name: Usuario.name || '',
                turma: Usuario.turma?.toString() || '',
                email: Usuario.email || '',
                user: Usuario.user || '',
                nascimento: Usuario.nascimento || '',
                contato: Usuario.contato || '',
                senha: Usuario.senha || '',
            });
        } 
        catch (e) {
            console.error('Erro:', e);
        }
    };
    useEffect(() => {
        if (id) {
            fetchUser();
        }
    }, []);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user, 
            [e.target.name]: e.target.value});
    };
    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user.edv || !user.name || !user.turma || !user.email || !user.nascimento || !user.contato || !user.senha){
            Swal.fire({
                title: 'Atenção!',
                text: 'Preencha os campos obrigatórios!',
                icon: 'warning'
            });
            return;
        }
        try {
            const response = await axios.put(
                `link backend`,
                {
                    ...user
                }
            );
            Swal.fire({
                title: 'Sucesso!',
                text: 'Usuário cadastrado com sucesso!',
                icon: 'success'
            });
            console.log("Resposta API:", response.data);
        } 
        catch (e) {
            console.error('Erro ao cadastrar:', e);
            Swal.fire({
                title: 'Erro!',
                text: 'Não foi possível cadastrar o usuário',
                icon: 'error'
            });
        }
    };
    return (
        <div>
            <Header />
            <div className="cadTurma-container">
                <Sidebar />
                <div className="cadTurma-body">
                    <form onSubmit={handleSubmit} className="cadTurma-form">
                        <span className="cadTurma-titulo">Cadastrar Usuário</span>
                        <div className="cadTurma-conteudo">
                            <input name="name" placeholder="Nome da Turma" value={user.edv} onChange={handleChange} className="editar-input"/>
                            <input name="course" placeholder="Curso" value={user.name} onChange={handleChange} className="editar-input"/>
                            <input name="edvInstrutor" type="number" placeholder="EDV do Instrutor" value={user.turma} onChange={handleChange} className="editar-input"/>
                            <input name="instrutor" placeholder="Nome do Instrutor" value={user.email} onChange={handleChange} className="editar-input"/>
                            <input name="instrutor" placeholder="Nome do Instrutor" value={user.user} onChange={handleChange} className="editar-input"/>
                            <input name="instrutor" placeholder="Nome do Instrutor" value={user.email} onChange={handleChange} className="editar-input"/>
                            <input name="instrutor" placeholder="Nome do Instrutor" value={user.contato} onChange={handleChange} className="editar-input"/>
                            <input name="instrutor" placeholder="Nome do Instrutor" value={user.senha} onChange={handleChange} className="editar-input"/>
                        </div>
                        <div className="cadTurma-button">
                            <button type="submit" className="cadTurma-salvar">CONFIRMAR</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CadastrarUser;