import '../index.css'
import ExpandableMenu from '../components/ExpandableMenu';
import { Logo } from '../components/Logo';
import {MonthSelector} from '../components/MonthSelector';
import { useEffect, useState } from 'react';
import { YearSelector } from '../components/YearSelector';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import { ChartDonut } from '../components/ChartDonut';

interface CategoryExpense{
    categoryName: string;
    totalAmount: number;
}

interface DashboardData{
        totalIncome:number;
        totalExpense:number;
        balance:number;
        expenseByCategory?: CategoryExpense[];
    }

function Menu(){
    const [dashboard, setDashboard]=useState<DashboardData>({balance:0, totalIncome:0, totalExpense:0, expenseByCategory:[]});
    const [mesSelecionado, setMesSelecionado]=useState('Janeiro');
    const [anoSelecionado, setAnoSelecionado]=useState(new Date().getFullYear());

    useEffect(()=>{
        const carregarDados=async()=>{
            const mesesMap:{[key:string]:number}={
                "Janeiro": 1, "Fevereiro": 2, "Março": 3, "Abril": 4,
                "Maio": 5, "Junho": 6, "Julho": 7, "Agosto": 8,
                "Setembro": 9, "Outubro": 10, "Novembro": 11, "Dezembro": 12
            }
            const mesNumero=mesesMap[mesSelecionado] || 1;

            try{
                const token = localStorage.getItem('tokenJwt');
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };
                const url=`http://localhost:8080/api/dashboard/by-monthly?month=${mesNumero}&year=${anoSelecionado}`;
                const urlCategorias = `http://localhost:8080/api/dashboard/by-category?month=${mesNumero}&year=${anoSelecionado}`;
                const [responseResumo, responseCategorias]=await Promise.all([
                    fetch(url, {method: 'GET', headers}),
                    fetch(urlCategorias, {method: 'GET', headers})
                ]) ;
                if(responseResumo.ok && responseCategorias.ok){
                    const dadosResumo=await responseResumo.json();
                    const dadosCategorias=await responseCategorias.json();
                    setDashboard({
                        balance: dadosResumo.balance,
                        totalIncome: dadosResumo.totalIncome,
                        totalExpense: dadosResumo.totalExpense,
                        expenseByCategory: dadosCategorias
                    });

                }else{
                    console.error("Erro ao buscar as informacoes", responseResumo.status);
                }
            }catch(erro){
                console.error("Erro de conexao", erro);
            }
        };
        carregarDados();
    }, [mesSelecionado, anoSelecionado]);//executa novamente caso o mes seja alterado


        const formatarMoeda=(valor:number)=>{
            return new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(valor);
        };

        const dadosGrafico=dashboard.expenseByCategory?.map(item=>({
            name: item.categoryName,
            value: Number(item.totalAmount)
        }))||[];
    
    return(
        <>
            <div className='noise gradt min-h-screen w-full overflow-x-hidden'>
                <div className='absolute z-20'>
                    <ExpandableMenu/>
                </div>
                <div>
                    <Logo/>
                </div>
                <div className='w-full min-h-screen flex items-end justify-center px-2 sm:px-4'>
                    <div className='bg-white w-full max-w-[1400px] min-h-[85vh] p-4 md:p-10 rounded-tl-3xl rounded-tr-3xl z-10 flex flex-col'>{/*caixa central */}
                        <div className='z-30 flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between mb-10'>{/*primeira linha*/}

                            <div className='flex flex-col sm:flex-row gap-4 sm:gap-6'>{/*seletor*/}
                                <div className='flex flex-row'>
                                    <p className='mr-3'>Mês: </p>
                                    <div className='-mt-1.5'>
                                        <MonthSelector selectedMonth={mesSelecionado} onMonthChange={setMesSelecionado}/>
                                    </div>
                                </div>
                                <div className='flex flex-row'>
                                    <p className='mr-3'>Ano: </p>
                                    <div className='-mt-1.5'>
                                        <YearSelector selectedYear={anoSelecionado} onYearChange={setAnoSelecionado} />
                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-col sm:flex-row gap-3 sm:gap-6 items-start sm:items-center bg-gray-50 px-4 py-3 rounded-xl w-full lg:w-auto'>
                                <Link to="">
                                    <p>Saldo: {formatarMoeda(dashboard.balance)}</p>
                                </Link>
                                <Link to="">
                                    <p>Receita: {formatarMoeda(dashboard.totalIncome)}</p>
                                </Link>
                                <Link to="">
                                    <p>Despesas: {formatarMoeda(dashboard.totalExpense)}</p>
                                </Link>
                            </div>

                            <div className='flex flex-col sm:flex-row gap-4 w-full lg:w-auto'>{/*botoes*/}
                                <div>
                                    <Button className='w-full sm:w-30 p-2' to='/transaction'>ADICIONAR</Button>
                                </div>
                                <div>
                                    <Button className='w-full sm:w-30 p-2' to='/transaction'>TRANSAÇÕES</Button>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col xl:flex-row gap-6 flex-1 min-h-0'> {/*celular - empilha / desktop - lado a lado*/}

                            <div className='flex-[1] bg-gray-50 rounded-2xl p-6 flex flex-col items-center justify-center border border-gray-100'>
                                <h3 className='text-gray-700 font-bold mb-4 self-start'>Distribuição de Gastos</h3>
                                <div className='w-full h-full flex items-center justify-center '>
                                    <ChartDonut data={dadosGrafico }/>
                                </div>
                            </div>

                            <div className='flex-[1.5] flex flex-col'>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Menu;
