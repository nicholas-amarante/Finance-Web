import { useEffect, useState } from "react";
import ExpandableMenu from "../components/ExpandableMenu";
import { MoreVertical, TrendingUp, TrendingDown } from 'lucide-react';
import { Logo } from "../components/Logo";
import { Navbar } from "../components/Navbar";
import {MonthSelector} from '../components/MonthSelector';
import { YearSelector } from '../components/YearSelector';

interface Transaction{
    id:number;
    name:string;
    description:string;
    value:number;
    categoryName:string;
    transactionType:'INCOME'|'EXPENSE';
    dateTime:string;
    bank:string;
}

function Transactions(){
    const mesesMap:{[key:string]:number}={
        "Janeiro": 1, "Fevereiro": 2, "Março": 3, "Abril": 4,
        "Maio": 5, "Junho": 6, "Julho": 7, "Agosto": 8,
        "Setembro": 9, "Outubro": 10, "Novembro": 11, "Dezembro": 12
    }
    const nomesMeses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    const [isRangeActive, setIsRangeActive] = useState<boolean>(false);
    const dataAtual=new Date();
    const[transactions, setTransactions]=useState<Transaction[]>([]);

    const[page, setPage]=useState<number>(0);
    const [loading, setLoading]=useState<boolean>(false);
    const [isLastPage, setIsLastPage]=useState<boolean>(false);

    const [startMonth, setStartMonth] = useState<number>(dataAtual.getMonth()+1);
    const [startYear, setStartYear] = useState<number>(dataAtual.getFullYear());
    const [endMonth, setEndMonth] = useState<number>(dataAtual.getMonth()+1);
    const [endYear, setEndYear] = useState<number>(dataAtual.getFullYear());


    useEffect(() => {
        setPage(0);
        setTransactions([]);
        setIsLastPage(false);
    }, [startMonth, startYear, endMonth, endYear, isRangeActive]);

    useEffect(() => {
        const carregarDados = async () => {
            if (isLastPage && page !== 0) return;

            try {
                setLoading(true);
                const token = localStorage.getItem('tokenJwt');
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                };

                const startMFormatted = String(startMonth).padStart(2, '0');
                const startDate = `${startYear}-${startMFormatted}-01T00:00:00`;
                const finalM = isRangeActive ? endMonth : startMonth;
                const finalY = isRangeActive ? endYear : startYear;
                const lastDay = new Date(finalY, finalM, 0).getDate();
                const lastDayFormatted = String(lastDay).padStart(2, '0');
                const finalMFormatted = String(finalM).padStart(2, '0');
                const endDate = `${finalY}-${finalMFormatted}-${lastDayFormatted}T23:59:59`;

                const urlTransactions = `http://localhost:8080/api/transactions?startDate=${startDate}&endDate=${endDate}&page=${page}&size=20`;
                
                const responseTransactions = await fetch(urlTransactions, { method: 'GET', headers });

                if (responseTransactions.ok) {
                    const transactionData = await responseTransactions.json();

                    let newTransactions: Transaction[] = [];
                    if (transactionData && Array.isArray(transactionData.content)) {
                        newTransactions = transactionData.content;
                    } else if (Array.isArray(transactionData)) {
                        newTransactions = transactionData;
                    }

                    const isLast = transactionData?.last ?? transactionData?.lastPage ?? (newTransactions.length < 20);
                    setIsLastPage(Boolean(isLast));

                    if (page === 0) {
                        setTransactions(newTransactions);
                    } else {
                        setTransactions(prev => {
                            const listaAnterior = Array.isArray(prev) ? prev : [];
                            return [...listaAnterior, ...newTransactions];
                        });
                    }
                } else {
                    console.error("Erro ao buscar as informações", responseTransactions.status);
                }
            } catch (erro) {
                console.error("Erro de conexão", erro);
            } finally {
                setLoading(false);
            }
        };

        carregarDados();
    }, [page, startMonth, startYear, endMonth, endYear, isRangeActive]);

    const formatarMoeda=(valor:number)=>{
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor);
    }

    const formatarData = (dataIso: string) => {
        if (!dataIso) return "";
        const data = new Date(dataIso);
        return data.toLocaleDateString('pt-BR');
    };

    return(
        <>
            <div className='noise gradt font-p h-screen w-screen'>
                <div className='absolute z-20'>
                    <ExpandableMenu/>
                    <Logo/>
                </div>
                <div className="z-20">
                    <Navbar/>
                </div>
                <main className="w-screen h-screen flex items-end justify-center">
                    <div className="w-10/12 lg:w-9/11 flex flex-col">
                        <h1 className="text-3xl font-medium text-white mb-6 ml-4 tracking-wide">Transações</h1>
                        <section className="bg-white w-full h-[89vh] z-10 flex flex-col p-10 rounded-tl-3xl rounded-tr-3xl justify-between overflow-y-auto">
                            <div className="flex">
                                <div className="flex flex-row">
                                    
                                    <span className="text-black text-xs font-medium mr-2">
                                        {isRangeActive ? "De:" : ""}
                                    </span>

                                    <div className='flex flex-row mr-3'>
                                        <div className='-mt-1.5'>
                                            <MonthSelector className="w-30" 
                                            divInsideButtonClassName="p-1 ml-19" 
                                            ioIoArrowDownClassName="h-3.5 w-3.5" 
                                            selectedMonth={nomesMeses[startMonth-1]} 
                                            onMonthChange={(nomeDoMes) => setStartMonth(mesesMap[nomeDoMes])}/>
                                        </div>
                                    </div>
                                    <div className='flex flex-row'>
                                        <div className='-mt-1.5'>
                                            <YearSelector className="w-25" 
                                            divInsideButtonClassName="p-1 ml-14" 
                                            ioIoArrowDownClassName="h-3.5 w-3.5" 
                                            selectedYear={startYear} 
                                            onYearChange={setStartYear}/>
                                        </div>
                                    </div>
                                    
                                </div>
                                {isRangeActive &&(
                                    <div className="flex flex-row">
                                        <p className="text-black text-xs font-medium mr-2 ml-6">Até</p>
                                        <div className="-mt-1.5 mr-3">
                                            <MonthSelector className="w-30" 
                                            divInsideButtonClassName="p-1 ml-19" 
                                            ioIoArrowDownClassName="h-3.5 w-3.5" 
                                            selectedMonth={nomesMeses[endMonth-1]} 
                                            onMonthChange={(nomeDoMes) => setEndMonth(mesesMap[nomeDoMes])}/>
                                        </div>
                                        <div className="-mt-1.5">
                                            <YearSelector className="w-25" 
                                            divInsideButtonClassName="p-1 ml-14" 
                                            ioIoArrowDownClassName="h-3.5 w-3.5" 
                                            selectedYear={endYear} 
                                            onYearChange={setEndYear}/>
                                        </div>
                                    </div>
                                )}
                                <button 
                                        onClick={() => setIsRangeActive(!isRangeActive)}
                                        className={`flex flex-row -mt-1.5 ml-3 text-xs font-medium px-3 py-1.5 rounded-xl transition-all duration-200 ${
                                            isRangeActive 
                                                ? 'bg-red-500/20 text-red-600 border border-red-400/30 hover:bg-red-500/30' 
                                                : 'bg-blue-400 text-white hover:bg-blue-600 border-blue-800'
                                        }`}
                                    >
                                        {isRangeActive ? "✕ Cancelar Intervalo" : "+ Filtrar Período"}
                                </button>
                                
                            </div>
                            <div className="bg-green-100 hidden lg:grid lg:grid-cols-[140px_1.6fr_1fr_1fr_1fr_1fr_1.3fr_1px] px-6 text-xs font-semibold text-gray-400 text-center items-center mb-2">
                                <div></div>
                                <div className="text-left">Nome</div>
                                <div className="text-left">Descrição</div>
                                <div>Banco</div>
                                <div>Categoria</div>
                                <div>Valor</div>
                                <div></div>
                            </div>

                            <div className="lg:h-[620px] gap-7 flex flex-col justify-between overflow-y-auto scrollbar-thin pt-3" 
                            onScroll={(e)=>{const {scrollTop, clientHeight, scrollHeight} = e.currentTarget; 
                            if(scrollHeight - scrollTop <= clientHeight + 50 && !loading && !isLastPage) {setPage(prevPage=>prevPage+1);}
                            }}>

                                {transactions && transactions.map((item, index) => {
                                    if (!item) return null;
                                    const isIncome = item.transactionType === 'INCOME';
                                    const isEmpty = !item.name;
                                    const itemKey = item.id ? `tx-${item.id}` : `tx-fallback-${index}`;
        
                                return (
                                    <div key={itemKey} className='w-full min-h-[76px] flex flex-col items-center gap-3 p-2 rounded-2xl bg-gray-50/60 border border-gray-100 shadow-sm lg:px-5 lg:grid lg:grid-cols-[80px_1.5fr_1.5fr_1fr_1fr_1fr_1.2fr_10px] lg:gap-4 text-center text-sm transition-all duration-400 hover:bg-gray-100'>
                                        
                                        <div className={`h-12 w-13 rounded-xl flex items-center justify-center border ${
                                            isIncome 
                                                ? 'bg-green-50 border-green-100 text-green-600'
                                                : 'bg-red-50 border-red-100 text-red-500'
                                        }`}>
                                            {isIncome ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
                                        </div>
        
                                        {!isEmpty ? (
                                            <>
                                                {/* 2. Nome e Data */}
                                                <div className='flex flex-col text-center lg:text-left w-full'>
                                                    <span className='font-bold text-gray-800 text-base lg:text-sm'>{item.name || "Sem nome"}</span>
                                                    <span className='text-[10px] text-gray-400 mt-2'>{formatarData(item.dateTime)}</span>
                                                </div>
        
                                                {/* 3. Descrição */}
                                                <div className='relative group text-gray-500 text-center lg:text-left min-w-0 px-2 cursor-pointer'>
                                                    <p className='text-gray-500 text-center lg:text-left truncate w-full'>
                                                        {item.description || "Sem descricao"}
                                                    </p>

                                                    {item.description && (
                                                        <div className='absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col items-center z-30 pointer-events-none w-max max-w-xs'>
                                                            <span className='bg-gray-900 text-white text-xs rounded-lg py-1.5 px-3 shadow-lg font-medium text-center whitespace-normal break-words'>
                                                                {item.description}
                                                            </span>
                                                            <div className='w-2 h-2 bg-gray-900 rotate-45 -mt-1'></div>
                                                        </div>
                                                    )}
                                                </div>
        
                                                {/* 4. Banco */}
                                                <div className='text-gray-600 font-medium bg-white lg:bg-transparent px-3 py-1 rounded-full lg:p-0 border border-gray-200 lg:border-none'>
                                                    {item.bank || "-"}
                                                </div>
        
                                                {/* 6. Categoria */}
                                                <div className='text-gray-500 bg-gray-200/50 px-3 py-1 rounded-md text-xs font-semibold'>
                                                    {item.categoryName || "Geral"}
                                                </div>
        
                                                {/* 8. Valor Cadastrado (Caixa Branca de Destaque) */}
                                                <div className='font-bold text-gray-700 bg-white px-4 py-1.5 rounded-lg border border-gray-200/80 shadow-sm w-full max-w-[120px] lg:max-w-none'>
                                                    {formatarMoeda(item.value)}
                                                </div>
        
                                                {/* 10. Botão de Opções (Três Pontinhos) */}
                                                <button className='text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-200/50 transition-colors lg:ml-auto'>
                                                    <MoreVertical size={20} />
                                                </button>
                                            </>
                                        ) : (
                                            // Layout vazio para as linhas de marcação (Skeleton lines)
                                            <div className="col-span-9 w-full h-4 hidden lg:block" />
                                        )}
                                    </div>
                                );
                                })}

                                {loading && (
                                    <div className="text-center py-4 text-xs font-semibold text-gray-400 animate-pulse">
                                        Carregando mais transações...
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </>
    )
}

export default Transactions;