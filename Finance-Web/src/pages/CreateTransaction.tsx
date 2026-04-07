import { Button } from '../components/Button';
import ExpandableMenu from '../components/ExpandableMenu';
import { Logo } from '../components/Logo';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import '../index.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function CreateTransaction(){
    const navigate=useNavigate();
    const [name, setName]=useState('');
    const [value, setValue]=useState('');
    const [transactionType, setTransactionType]=useState('');
    const [category, setCategory]=useState('');
    const [erro, setErro]=useState('');
    const [contas, setContas] = useState<{ value: string; label: string }[]>([]);
    const [bancos, setBancos] = useState<{ value: string; label: string }[]>([]);
    const [contaSelecionada, setContaSelecionada] = useState("");

    interface AccountFromBack{
        id: number;
        description:String;
        bank_name:String;
    }

    useEffect(()=>{
        const carregarContas=async()=>{
            try{
                const token=localStorage.getItem('tokenJwt');
                const response = await fetch('http://localhost:8080/api/accounts/my-accounts', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
                });
                if(response.ok){
                    const dados:AccountFromBack[]=await response.json();
                    const Contas=dados.map(conta=>({value: String(conta.bank_name), label: `${conta.description}`}));
                    const Bancos=dados.map(banco=>({value: String(banco.bank_name), label: `${banco.bank_name}`}));
                    setContas(Contas);
                    setBancos(Bancos);
                }
            }catch(error){
                console.error("Erro ao buscar contas do usuário: ", error);
            }
        };
        carregarContas();
    }, []);

    const handleCreateTransaction=async()=>{
        setErro('');
        if(!name || !value || !transactionType || !category){
            setErro('Por favor, preencha os campos obrigatorios')
        }

        try{
            const response=await fetch('/transaction', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    name:name,
                    value:value,
                    transactionType:transactionType,
                    category:category
                }),
            });
            if(!response.ok){
                throw new Error('Erro ao registrar transação. Tente novamente.')
            }
        }catch(error){
            console.error(erro);
            setErro('The connection to the server failed')
        }
    }

    return(
        <>
            <div className='noise gradt w-screen h-screen'>
                <div>
                    <ExpandableMenu/>
                </div>
                <div>
                    <Logo/>
                </div>
                <div className='w-screen h-screen flex items-end justify-center'>
                    <div className='w-10/12 lg:w-9/12 flex flex-col'>
                        <div className='flex flex-col'>
                            <h1 className='leading-relaxed font-p text-white mb-10 ml-6 text-4xl'>Criar Transação</h1>
                        </div>
                        <div className='bg-white w-full h-[65vh] p-10 rounded-tl-3xl z-10 rounded-tr-3xl flex flex-col justify-between overflow-y-auto '>

                            <form className='grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-9 font-p'>
                                <div className='md:col-span-4 flex flex-col gap-2'>
                                    <label htmlFor="font-medium">Nome</label>
                                    <Input type="text" className='' value={name} onChange={(e)=>setName(e.target.value)} placeholder="Digite seu nome*"/>
                                </div>
                                <div className='md:col-span-3 flex flex-col gap-2'>
                                    <label htmlFor="font-medium">Valor</label>
                                    <Input type="number" className='' value={value} onChange={(e)=>setValue(e.target.value)} placeholder="Digite um valor*"/>
                                </div>
                                <div className='md:col-span-2 flex flex-col gap-2'>
                                    <label htmlFor="font-medium" >Tipo</label>
                                    <Select name="" id="" className="">
                                        <option value="" disabled selected>Selecione o tipo</option>
                                        <option value="INCOME">Receita</option>
                                        <option value="EXPENSE">Despesa</option>
                                    </Select>
                                </div>
                                <div className='md:col-span-3 flex flex-col gap-2'>
                                    <label htmlFor="">Banco</label>
                                    <Select name="BankId" id="" options={bancos} value={contaSelecionada} onChange={(e)=>setContaSelecionada(e.target.value)}>
                                        <option value="" disabled selected>Selecione o banco</option>
                                    </Select>
                                </div>
                                <div className='md:col-span-2 flex flex-col gap-2'>
                                    <label htmlFor="">Conta</label>
                                    <Select name="accountId" id="" options={contas} value={contaSelecionada} onChange={(e) => setContaSelecionada(e.target.value)}>
                                        <option value="" disabled selected>Selecione a conta</option>
                                    </Select>
                                </div>
                                <div className='md:col-span-3 flex flex-col gap-2'>
                                    <label htmlFor="">Categoria</label>
                                    <Select name='categoryId' id="">
                                        <option value="">Selecione uma categoria</option>
                                    </Select>
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
                            <div className='flex flex-row m-auto h-[10vh] gap-6 mt-45'>
                                <div className='flex m-auto'>
                                    <Button className='w-30' onClick={handleCreateTransaction}>Enviar</Button>
                                </div>
                                <div className='flex m-auto'>
                                    <Button className='w-40' to='/menu'>Voltar ao menu</Button>
                                </div>
                            </div>
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