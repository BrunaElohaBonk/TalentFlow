import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Legend } from "recharts";

interface Props {
    aprendizes: any[];
}

export function GraficoSetor({ aprendizes }: Props) {

    const dados = Object.values(
        aprendizes.reduce((acc, aprendiz) => {
            const setor = aprendiz.situacaoProfissional.nomeSetor;
            if (!acc[setor]) {
                acc[setor] = {setor, quantidade: 0};
            }
            acc[setor].quantidade++;
            return acc;
        }, {})
    );
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dados}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="setor" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="quantidade" fill="#193B82" radius={[10,10,0,0]}/>
            </BarChart>
        </ResponsiveContainer>
    );
}

export function GraficoEstagio({ aprendizes }: Props) {
    const estagiando = aprendizes.filter(aprendiz => aprendiz.situacaoProfissional.cumprindoEstagio).length;
    const dados = [
        {
            name:"Estagiando",
            value:estagiando,
            fill:"#193B82"
        },
        {
            name:"Não estagiando",
            value: aprendizes.length - estagiando,
            fill:"#35A7CF"
        }
    ];
    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie data={dados} dataKey="value" nameKey="name" outerRadius={100} label/>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
}

export function GraficoSuperior({ aprendizes }: Props) {
    const superior = aprendizes.filter(aprendiz => aprendiz.formacaoAcademica.some(formacao => formacao.nivelFormacao === "Graduação")).length;
    const dados = [
        {
            name:"Cursando",
            value: superior,
            fill:"#193B82"
        },
        {
            name:"Não cursando",
            value: aprendizes.length - superior,
            fill:"#35A7CF"
        }
    ];
    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie data={dados} dataKey="value" nameKey="name" innerRadius={70} outerRadius={110}/>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
}

export function GraficoCompetencias({ aprendizes }: Props) {
    const dadosCompetencias = Object.values(
        aprendizes.reduce((acc, aprendiz) => {aprendiz.competencias.forEach((competencia: any) => {
            const nome = competencia.nome;
            if (!acc[nome]) {
                acc[nome] = {competencia: nome, quantidade: 0};
            }
            acc[nome].quantidade++;
        });
            return acc;
        }, {} as Record<string, {competencia: string; quantidade: number;}>)
    );
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dadosCompetencias} layout="vertical" margin={{top: 10, right: 30, left: 20, bottom: 10}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis type="number"/>
                <YAxis type="category" dataKey="competencia" width={100}/>
                <Tooltip />
                <Bar dataKey="quantidade" fill="#35A7CF" radius={[0, 10, 10, 0]}/>
            </BarChart>
        </ResponsiveContainer>
    );
}

export function GraficoIdiomas({ aprendizes }: Props) {
    const dadosIdiomas = Object.values(
        aprendizes.reduce((acc, aprendiz) => {aprendiz.idiomas.forEach((idioma: any) => {
                const nome = idioma.idioma;
                if (!acc[nome]) {acc[nome] = { idioma: nome, quantidade: 0};}
                acc[nome].quantidade++;
            });
            return acc;
        }, {} as Record<string, { idioma: string; quantidade: number;}>)
    );
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dadosIdiomas} layout="vertical" margin={{ top: 10, right: 30, left: 20, bottom: 10}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis type="number"/>
                <YAxis type="category" dataKey="idioma" width={100}/>
                <Tooltip />
                <Bar dataKey="quantidade" fill="#193B82" radius={[0, 10, 10, 0]}/>
            </BarChart>
        </ResponsiveContainer>
    );
}