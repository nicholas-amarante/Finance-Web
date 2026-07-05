import { Button } from '../components/Button';
import ExpandableMenu from '../components/ExpandableMenu';
import { Logo } from '../components/Logo';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import '../index.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SucessModal } from '../components/SuccessModal';

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
            <div className='noise gradt w-screen h-screen'>
                <div className='absolute z-20'>
                    <ExpandableMenu/>
                </div>
                <div>
                    <Logo/>
                </div>
                <div className='w-screen h-screen flex items-end justify-center'>
                    <div className='w-10/12 lg:w-9/12 flex flex-col'>
                        <div className='flex flex-col'>
                            <h1 className='leading-relaxed font-p text-white mb-1 ml-6 text-4xl'>Criar Transação</h1>
                        </div>
                        <div className='bg-white w-full h-[80vh] p-10 rounded-tl-3xl z-10 rounded-tr-3xl flex flex-col justify-between overflow-y-auto '>

                            <form className='grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-9 font-p'>
                                <div className='md:col-span-4 flex flex-col gap-2'>
                                    <label htmlFor="font-medium">Nome</label>
                                    <Input type="text" name="name" className='' value={name} onChange={(e)=>setName(e.target.value)} placeholder="Digite seu nome*"/>
                                    {errors.name&&<span className="text-red-500 text-xs">{errors.name}</span>}
                                </div>
                                <div className='md:col-span-3 flex flex-col gap-2'>
                                    <label htmlFor="font-medium">Valor</label>
                                    <Input type="number" name="value" className='' value={value} onChange={(e)=>setValue(e.target.value)} placeholder="Digite um valor*"/>
                                    {errors.value&&<span className="text-red-500 text-xs">{errors.value}</span>}
                                </div>
                                <div className='md:col-span-2 flex flex-col gap-2'>
                                    <label htmlFor="font-medium" >Tipo</label>
                                    <Select name="transactionType" id="" value={transactionType} onChange={(e)=>setTransactionType(e.target.value)}>
                                        <option value="" disabled selected>Selecione o tipo</option>
                                        <option value="INCOME">Receita</option>
                                        <option value="EXPENSE">Despesa</option>
                                    </Select>
                                    {errors.transactionType&&<span className="text-red-500 text-xs">{errors.transactionType}</span>}
                                </div>
                                <div className='md:col-span-2 flex flex-col gap-2'>
                                    <label htmlFor="">Banco</label>
                                    <Select name="BankId" id="" options={bankOptions} value={bankSelected} onChange={(e)=>{setBankSelected(e.target.value); setAccountSelected(""); }}>
                                        <option value="" disabled selected>Selecione o banco</option>
                                    </Select>
                                </div>
                                <div className='md:col-span-3 flex flex-col gap-2'>
                                    <label htmlFor="">Reserva</label>
                                    <Select name="accounts" id="" options={accountOptions} value={accountSelected} onChange={(e) => setAccountSelected(e.target.value)} disabled={!bankSelected}>
                                        <option value="" disabled selected>{bankSelected ? "Selecione a conta":"Selecione o banco primeiro"}</option>
                                    </Select>
                                    {errors.accounts&&<span className="text-red-500 text-xs">{errors.accounts}</span>}
                                </div>
                                <div className='md:col-span-3 flex flex-col gap-2'>
                                    <label htmlFor="">Categoria</label>
                                    <Select name='categorys' id="" options={categorys} value={categorySelected} onChange={(e)=> setCategorySelected(e.target.value)}>
                                        <option value="" disabled selected>Selecione uma categoria</option>
                                    </Select>
                                    {errors.categorys&&<span className="text-red-500 text-xs">{errors.categorys}</span>}
                                </div>
                                {/* <div className='md:col-span-3 flex flex-col gap-2'>
                                    <label htmlFor="font-medium">Fonte</label>
                                    <Select name="" id="" className=''>
                                        <option value="" disabled selected>Selecione a fonte</option>
                                    </Select>
                                </div>
                                <div className='md:col-span-3 flex flex-col gap-2'>
                                    <label htmlFor="font-medium">Destino</label>
                                    <Input type="text" className='' placeholder="Digite um destino(opcional)"/>
                                </div>*/}

                                <div className='md:col-span-4 flex flex-col gap-2'>
                                    <label htmlFor="">Descrição</label>
                                    <Input type="text" className='' placeholder="Digite uma descrição(opcional)"/>
                                </div>
                            </form>
                            <div className='flex flex-row m-auto h-[10vh] gap-6 mt-45'>
                                <div className='flex m-auto'>
                                    <Button className='w-30' onClick={handleCreateTransaction}>Enviar</Button>
                                </div>
                                <div className='flex m-auto'>
                                    <Button className='w-40' to='/menu'>Voltar ao menu</Button>
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
                <div>

                </div>
            </div>
        </>
    )
}

export default CreateTransaction