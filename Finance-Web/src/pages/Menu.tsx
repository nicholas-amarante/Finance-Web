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
            <div className='noise gradt min-h-screen w-full overflow-x-hidden flex flex-col justify-between relative pb-0'>        
                <div className="">
                    <Navbar/>
                </div>
                <div className='z-20'>
                    <ExpandableMenu/>
                </div>
                <div className="">
                    <Logo/>
                </div>
                
                <div className='w-full flex-1 flex items-end justify-center px-4 sm:px-6 lg:px-8 mt-16'>
                    <div className='bg-white w-full max-w-[1400px] min-h-[85vh] h-auto p-6 md:p-10 rounded-tl-3xl rounded-tr-3xl z-10 flex flex-col shadow-2xl justify-between'>{/*caixa central */}
                        
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 items-center mb-10 w-full'>{/*primeira linha*/}

                            <div className='flex flex-row sm:flex-row gap-4 sm:gap-6 justify-center md:justify-start items-center w-full'>{/*seletor*/}
                                <div className='flex flex-row items-center'>
                                    <p className='mr-2 font-medium text-gray-700'>Mês:</p>
                                    <MonthSelector selectedMonth={mesSelecionado} onMonthChange={setMesSelecionado}/>
                                </div>
                                <div className='flex flex-row items-center'>
                                    <p className='mr-2 font-medium text-gray-700'>Ano:</p>
                                    <YearSelector selectedYear={anoSelecionado} onYearChange={setAnoSelecionado} />
                                </div>
                            </div>

                            <div className='flex flex-col items-center bg-gray-50 px-6 py-4 rounded-2xl border border-gray-100 shadow-sm w-full max-w-md mx-auto'>
                                <div className='flex flex-col items-center bg-white px-6 py-2 rounded-xl border border-gray-100 min-w-[160px] shadow-sm mb-3 w-full text-center'>
                                    <span className='text-[10px] uppercase tracking-wider font-bold text-gray-400'>
                                        Saldo Atual
                                    </span>
                                    <p className='text-lg font-bold text-gray-800 mt-0.5'>
                                        {formatarMoeda(dashboard.totalCurrentBalance || 0)} {/* Use a variável do saldo geral aqui */}
                                    </p>
                                </div>
                                <div className="w-full text-center">
                                    <span className='text-[10px] uppercase tracking-wider font-bold text-gray-400 block mb-2'>
                                        Resumo Mensal
                                    </span>
                                    <div className='flex flex-row justify-around gap-2 items-center text-xs font-semibold text-gray-600 w-full'>
                                        <Link to="" className="hover:text-blue-600 transition">
                                            <p>Saldo: <span className="block text-gray-800 font-bold mt-0.5">{formatarMoeda(dashboard.balance)}</span></p>
                                        </Link>
                                        <Link to="" className="hover:text-green-600 transition">
                                            <p>Receita: <span className="block text-green-600 font-bold mt-0.5">{formatarMoeda(dashboard.totalIncome)}</span></p>
                                        </Link>
                                        <Link to="" className="hover:text-red-600 transition">
                                            <p>Despesas: <span className="block text-red-600 font-bold mt-0.5">{formatarMoeda(dashboard.totalExpense)}</span></p>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4 w-full justify-center md:justify-end items-center'>{/*botoes*/}
                                <div className="w-full sm:w-auto lg:w-1/2 max-w-[200px]">
                                    <Button className='w-full py-2.5 text-sm font-semibold tracking-wider' to='/transaction'>ADICIONAR</Button>
                                </div>
                                <div className="w-full sm:w-auto lg:w-1/2 max-w-[200px]">
                                    <Button className='w-full py-2.5 text-sm font-semibold tracking-wider' to='/transaction'>TRANSAÇÕES</Button>
                                </div>
                            </div>
                        </div>

                        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 w-full items-stretch'>{/*celular - empilha / desktop - lado a lado*/}

                            <div className='lg:col-span-5 bg-gray-50 rounded-2xl p-6 flex flex-col items-center justify-between border border-gray-100 min-h-[350px] lg:min-h-0'>
                                <h3 className='text-gray-700 font-bold mb-4 self-start'>Distribuição de Gastos</h3>
                                <div className='w-full flex-1 flex items-center justify-center max-h-[300px]'>
                                    <ChartDonut data={dadosGrafico}/>
                                </div>
                            </div>

                            <div className='lg:col-span-7 bg-gray-50 rounded-2xl p-6 flex flex-col border border-gray-100 min-h-[350px] lg:min-h-0 justify-between'>
                                <h3 className='text-gray-700 font-bold mb-4'>Últimas Transações</h3>
                                <div className='flex-1 overflow-y-auto pr-1 space-y-3 max-h-[320px]'>
                                    {dashboard.latestTransactions && dashboard.latestTransactions.length > 0?(
                                        dashboard.latestTransactions.map((transaction)=>(
                                            <div key={transaction.id} className='flex justify-between items-center p-3.5 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow'>
                                                <div className='flex items-center gap-3 min-w-0'>
                                                    <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold ${transaction.transactionType === 'INCOME' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                                        {transaction.transactionType === 'INCOME' ? '+' : '-'}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className='font-semibold text-gray-800 text-sm truncate'>{transaction.name}</p>
                                                        <p className='text-[11px] text-gray-400 truncate'>{formatarData(transaction.dateTime)} • {transaction.categoryName}</p>
                                                    </div>
                                                </div>

                                                <p className={`font-bold text-sm flex-shrink-0 ml-2 ${transaction.transactionType === 'INCOME' ? 'text-green-500' : 'text-red-500'}`}>
                                                    {transaction.transactionType === 'INCOME' ? '+' : '-'} {formatarMoeda(transaction.value)}
                                                </p>

                                            </div>
                                        ))):(
                                        <div className="h-full flex items-center justify-center">
                                            <p className="text-gray-400 text-center py-10">Nenhuma transação encontrada.</p>
                                        </div>
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