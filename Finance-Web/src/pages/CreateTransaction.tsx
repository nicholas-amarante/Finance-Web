import { Button } from '../components/Button';
import ExpandableMenu from '../components/ExpandableMenu';
import { Logo } from '../components/Logo';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import '../index.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SucessModal } from '../components/SuccessModal';
import { Navbar } from '../components/Navbar';

function CreateTransaction(){
    const navigate=useNavigate();
    const [name, setName]=useState('');
    const [value, setValue]=useState('');
    const [account, setAccount]=useState('');
    const [transactionType, setTransactionType]=useState('');

    const [bankSelected, setBankSelected]=useState("")
    const [accountSelected, setAccountSelected] = useState("");
    const [categorySelected, setCategorySelected] =useState("");

    const [erro, setErro]=useState('');
    const [errors, setErrors]=useState<{[key: string]: string}>({});

    const [accountsRaw, setAccountsRaw] = useState<any[]>([]);
    const [accounts, setAccounts] = useState<{ value: string; label: string }[]>([]);
    const [banks, setBanks] = useState<{ value: string; label: string }[]>([]);
    const [categorys, setCategorys] = useState<{value: string; label: string}[]>([]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    interface AccountFromBack{
        id: number;
        description:String;
        bank_name:String;
    }
    interface CategoryFromBack{
        name:String;
    }

    useEffect(()=>{//PUXA DO BACK ---
        const loadData=async()=>{
            try{
                const token=localStorage.getItem('tokenJwt');
                const headers={
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                };
                const [responseAccounts, responseCategorys] = await Promise.all([
                    fetch('http://localhost:8080/api/accounts/my-accounts', {method:'GET', headers}),
                    fetch('http://localhost:8080/api/category', {method:'GET', headers})
                ]);
                if(responseAccounts.ok && responseCategorys.ok){
                    const dataAccount:AccountFromBack[]=await responseAccounts.json();
                    const dataCategory:CategoryFromBack[]=await responseCategorys.json();
                    setAccountsRaw(dataAccount);

                    const Contas=dataAccount.map(conta=>({value: String(conta.id), label: `${conta.description}`}));
                    const Bancos=dataAccount.map(banco=>({value: String(banco.bank_name), label: `${banco.bank_name}`}));
                    setAccounts(Contas);
                    setBanks(Bancos);

                    const categorys=dataCategory.map(category=>({value: String(category.name), label: `${category.name}`}));
                    setCategorys(categorys);
                }
            }catch(error){
                console.error("Erro ao enviar", error);
            }
        };
        loadData();
    }, []);

    const validateFields=()=>{//VERIFICA OS CAMPOS ---
        const newErrors:{[key:string]: string}={};
        if(!name.trim()) newErrors.name="* Campo nome obrigatório";
        if(!value || Number(value)<=0) newErrors.value="* Campo valor deve ser maior que zero";
        if(!transactionType) newErrors.transactionType="* Campo tipo obrigatório";
        if(!accountSelected) newErrors.accounts="* Campo conta obrigatório";
        if(!categorySelected) newErrors.categorys="* Campo categoria obrigatório";
        setErrors(newErrors);
        return Object.keys(newErrors).length===0;
    }

    const bankOptions=Array.from(new Set(accountsRaw.map(a=> a.bank_name))) //FILTRA BASEADO NO BANCO ---
        .map(name=>({value:name, label:name}));
    const accountOptions=accountsRaw.filter(a=>a.bank_name===bankSelected)
        .map(a=>({value:String(a.id), label: a.description}));

    const handleCreateTransaction=async(e: React.FormEvent)=>{//POST PARA O ENDPOINT ---
        e.preventDefault(); //evita que a pagina recarregue

        if(!validateFields()) return;

        try{
            const token=localStorage.getItem('tokenJwt');
            const response=await fetch('http://localhost:8080/api/transactions', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                },
                body:JSON.stringify({
                    name:name,
                    value:value,
                    account_id:accountSelected,
                    transactionType:transactionType,
                    category:categorySelected
                }),
            });
            if(response.ok){
                setIsModalOpen(true);
            }else{
                setErro('Erro ao salvar a transação!')
            }
        }catch(error){
            console.error(erro);
            setErro('The connection to the server failed')
        }
    }

    return(
        <>
            <div className='noise gradt w-screen min-h-screen flex flex-col justify-between overflow-x-hidden'>
                <div className="">
                    <Navbar/>
                </div>
                <div>
                    <ExpandableMenu/>
                </div>
                <div>
                    <Logo/>
                </div>
                
                <div className='w-screen flex-1 flex items-center justify-center py-12'>
                    <div className='w-11/12 xl:w-10/12 flex flex-col'>
                        <div className='flex flex-col'>
                            <h1 className='leading-relaxed font-p text-white mb-6 ml-2 sm:ml-4 text-3xl sm:text-4xl'>Criar Transação</h1>
                        </div>

                        <div className='bg-white w-full h-auto p-6 sm:p-10 rounded-3xl flex flex-col justify-between shadow-2xl'>

                            <form className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6 font-p w-full'>
                                <div className='flex flex-col gap-1.5'>
                                    <label className="font-medium text-gray-700 text-sm">Nome</label>
                                    <Input type="text" name="name" className='w-full' value={name} onChange={(e)=>setName(e.target.value)} placeholder="Digite seu nome*"/>
                                    {errors.name&&<span className="text-red-500 text-xs">{errors.name}</span>}
                                </div>
                                <div className='flex flex-col gap-1.5'>
                                    <label className="font-medium text-gray-700 text-sm">Valor</label>
                                    <Input type="number" name="value" className='w-full' value={value} onChange={(e)=>setValue(e.target.value)} placeholder="Digite um valor*"/>
                                    {errors.value&&<span className="text-red-500 text-xs">{errors.value}</span>}
                                </div>
                                <div className='flex flex-col gap-1.5'>
                                    <label className="font-medium text-gray-700 text-sm">Tipo</label>
                                    <Select name="transactionType" id="" className='w-full' value={transactionType} onChange={(e)=>setTransactionType(e.target.value)}>
                                        <option value="" disabled selected>Selecione o tipo</option>
                                        <option value="INCOME">Receita</option>
                                        <option value="EXPENSE">Despesa</option>
                                    </Select>
                                    {errors.transactionType&&<span className="text-red-500 text-xs">{errors.transactionType}</span>}
                                </div>
                                <div className='flex flex-col gap-1.5'>
                                    <label className="font-medium text-gray-700 text-sm">Banco</label>
                                    <Select name="BankId" id="" className='w-full' options={bankOptions} value={bankSelected} onChange={(e)=>{setBankSelected(e.target.value); setAccountSelected(""); }}>
                                        <option value="" disabled selected>Selecione o banco</option>
                                    </Select>
                                </div>
                                <div className='md:col-span-3 flex flex-col gap-2'>
                                    <label htmlFor="">Conta</label>
                                    <Select name="accounts" id="" options={accountOptions} value={accountSelected} onChange={(e) => setAccountSelected(e.target.value)} disabled={!bankSelected}>
                                        <option value="" disabled selected>{bankSelected ? "Selecione a conta":"Selecione o banco primeiro"}</option>
                                    </Select>
                                    {errors.accounts&&<span className="text-red-500 text-xs">{errors.accounts}</span>}
                                </div>
                                <div className='flex flex-col gap-1.5'>
                                    <label className="font-medium text-gray-700 text-sm">Categoria</label>
                                    <Select name='categorys' id="" className='w-full' options={categorys} value={categorySelected} onChange={(e)=> setCategorySelected(e.target.value)}>
                                        <option value="" disabled selected>Selecione uma categoria</option>
                                    </Select>
                                    {errors.categorys&&<span className="text-red-500 text-xs">{errors.categorys}</span>}
                                </div>
                                <div className='md:col-span-3 flex flex-col gap-2'>
                                    <label htmlFor="font-medium">Fonte</label>
                                    <Select name="" id="" className=''>
                                        <option value="" disabled selected>Selecione a fonte</option>
                                    </Select>
                                </div>
                                <div className='md:col-span-3 flex flex-col gap-2'>
                                    <label htmlFor="font-medium">Destino</label>
                                    <Input type="text" className='' placeholder="Digite um destino(opcional)"/>
                                </div>

                                <div className='md:col-span-4 flex flex-col gap-2'>
                                    <label htmlFor="">Descrição</label>
                                    <Input type="text" className='' placeholder="Digite uma descrição(opcional)"/>
                                </div>
                            </form>

                           <div className='flex flex-col sm:flex-row justify-center items-center gap-4 mt-12 w-full'>
                                <div className='w-full sm:w-auto'>
                                    <Button className='w-full sm:w-40 py-2.5' onClick={handleCreateTransaction}>Enviar</Button>
                                </div>
                                <div className='w-full sm:w-auto'>
                                    <Button className='w-full sm:w-44 py-2.5' to='/menu'>Voltar ao menu</Button>
                                </div>
                            </div>

                            <SucessModal 
                                isOpen={isModalOpen} 
                                onClose={() => setIsModalOpen(false)}
                                title="Tudo certo!"
                                message="Sua transação foi registrada e o saldo da conta já foi atualizado."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateTransaction