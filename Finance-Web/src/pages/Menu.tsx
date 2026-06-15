import '../index.css'
import ExpandableMenu from '../components/ExpandableMenu';
import { Logo } from '../components/Logo';
import {MonthSelector} from '../components/MonthSelector';
import { useEffect, useState } from 'react';
import { YearSelector } from '../components/YearSelector';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import { ChartDonut } from '../components/ChartDonut';
import { Navbar } from '../components/Navbar';

interface CategoryExpense{
    categoryName: string;
    totalAmount: number;
}

interface Transaction{
    id:number,
    name:string,
    description:string,
    value:number,
    categoryName:string,
    transactionType:'INCOME' | 'EXPENSE',
    dateTime:string
}

interface DashboardData{
        totalIncome:number;
        totalExpense:number;
        balance:number;
        expenseByCategory?: CategoryExpense[];
        latestTransactions?: Transaction[];
        totalCurrentBalance?: number;
    }

    
function Menu(){
    const mesesMap:{[key:string]:number}={
        "Janeiro": 1, "Fevereiro": 2, "Março": 3, "Abril": 4,
        "Maio": 5, "Junho": 6, "Julho": 7, "Agosto": 8,
        "Setembro": 9, "Outubro": 10, "Novembro": 11, "Dezembro": 12
    }
    const nomesMeses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];
    const [dashboard, setDashboard]=useState<DashboardData>({balance:0, totalIncome:0, totalExpense:0, expenseByCategory:[], latestTransactions:[], totalCurrentBalance:0});
    const [mesSelecionado, setMesSelecionado]=useState<string>(nomesMeses[new Date().getMonth()]);
    const [anoSelecionado, setAnoSelecionado]=useState(new Date().getFullYear());
    
    useEffect(()=>{
        const carregarDados=async()=>{
            const mesNumero=mesesMap[mesSelecionado] || mesesMap[new Date().getMonth()]

            try{
                const token = localStorage.getItem('tokenJwt');
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };
                const url=`http://localhost:8080/api/dashboard/by-monthly?month=${mesNumero}&year=${anoSelecionado}`;
                const urlCategorias = `http://localhost:8080/api/dashboard/by-category?month=${mesNumero}&year=${anoSelecionado}`;
                const urlTransactions=`http://localhost:8080/api/dashboard/ten-last`;
                const [responseResumo, responseCategorias, responseTransactions]=await Promise.all([
                    fetch(url, {method: 'GET', headers}),
                    fetch(urlCategorias, {method: 'GET', headers}),
                    fetch(urlTransactions, {method: 'GET', headers})
                ]) ;
                if(responseResumo.ok && responseCategorias.ok && responseTransactions.ok){
                    const dadosResumo=await responseResumo.json();
                    const dadosCategorias=await responseCategorias.json();
                    const dadosTransactions=await responseTransactions.json();
                    setDashboard({
                        balance: dadosResumo.balance,
                        totalIncome: dadosResumo.totalIncome,
                        totalExpense: dadosResumo.totalExpense,
                        expenseByCategory: dadosCategorias,
                        latestTransactions: Array.isArray(dadosTransactions) ? dadosTransactions.slice(0, 5) : [],
                        totalCurrentBalance: dadosResumo.totalCurrentBalance
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

        const formatarData = (dataStr: string) => {
            return new Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            }).format(new Date(dataStr));
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
                <div>
                    <Navbar/>
                </div>
                <div className='w-full min-h-screen flex items-end justify-center px-2 sm:px-4'>
                    <div className='bg-white w-full max-w-[1400px] min-h-[85vh] p-4 md:p-10 rounded-tl-3xl rounded-tr-3xl z-10 flex flex-col'>{/*caixa central */}
                        <div className='z-30 flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between mb-10'>{/*primeira linha*/}

                            <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 lg:-mt-20'>{/*seletor*/}
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

                            <div className='flex flex-col items-center bg-gray-50 px-6 py-2.5 rounded-xl border border-gray-100 shadow-sm'>
                                <div className='flex flex-col items-center bg-gray-50 px-5 py-2.5 rounded-xl border border-gray-100 min-w-[140px] shadow-sm'>
                                    <span className='text-[10px] uppercase tracking-wider font-bold text-gray-400'>
                                        Saldo Atual
                                    </span>
                                    <p className='text-base font-bold text-gray-800 mt-0.5'>
                                        {formatarMoeda(dashboard.totalCurrentBalance || 0)} {/* Use a variável do saldo geral aqui */}
                                    </p>
                                </div>
                                <div>
                                    <span className='text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1.5'>
                                        Resumo Mensal
                                    </span>
                                    <div className='flex flex-row gap-4 md:gap-6 items-center text-sm font-medium text-gray-700'>
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
                                </div>
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
                                    <ChartDonut data={dadosGrafico}/>
                                </div>
                            </div>

                            <div className='flex-[1.5] flex flex-col'>
                                <h3 className='text-gray-700 font-bold mb-4'>Últimas Transações</h3>
                                <div className='overflow-y-auto pr-2 space-y-3'>
                                    {dashboard.latestTransactions && dashboard.latestTransactions.length > 0?(
                                        dashboard.latestTransactions.map((transaction)=>(
                                            <div key={transaction.id} className='flex justify-between items-center p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow'>
                                                <div className='flex items-center gap-4'>
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${transaction.transactionType === 'INCOME' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                                        {transaction.transactionType === 'INCOME' ? '+' : '-'}
                                                    </div>
                                                    <div>
                                                        <p className='font-semibold text-gray-800'>{transaction.name}</p>
                                                        <p className='text-xs text-gray-400'>{formatarData(transaction.dateTime)} • {transaction.categoryName}</p>
                                                    </div>
                                                </div>

                                                <p className={`font-bold ${transaction.transactionType === 'INCOME' ? 'text-green-500' : 'text-red-500'}`}>
                                                    {transaction.transactionType === 'INCOME' ? '+' : '-'} {formatarMoeda(transaction.value)}
                                                </p>

                                            </div>
                                        )
                                    )):(
                                        <p className="text-gray-400 text-center py-10">Nenhuma transação encontrada.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Menu;
