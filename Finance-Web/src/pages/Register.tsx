import '../index.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExpandableMenu from '../components/ExpandableMenu';
import { Button } from '../components/Button';
import { Logo } from '../components/Logo';

function Register(){
    const navigate=useNavigate();
    const [name, setName]=useState('');
    const [email, setEmail]=useState('');
    const [cpf, setCpf]=useState('');
    const [password, setPassword]=useState('');
    const [erro, setErro]=useState('');
    const [isMenuOpen, setIsMenuOpen]=useState(false);

    const toggleMenu=()=>{
    setIsMenuOpen(!isMenuOpen);
    };




    const handleRegister=async()=>{
        setErro('');

        if(!name || !email || !cpf || !password){
            setErro('Por favor, preencha todos os campos.')
        }

        try{
            const response=await fetch('http://localhost:8080/api/user/register', {
                method: 'POST', 
                headers: {
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    name:name,
                    email:email,
                    cpf:cpf,
                    password:password

                }),
            });
            if(!response.ok){
                throw new Error('Erro ao registrar usuario. Tente novamente.');
            }
            alert('Usuario criado com sucesso!');
            navigate('http://localhost:5173/login');
        }catch(error){
            console.error(error);
            setErro('The connection to the server failed');
        }
    };


    return(
    <>
        <div className='noise gradt h-screen w-screen flex flex-row'>
            <div className='absolute z-20'>
                <ExpandableMenu/>
            </div>
            <div>
                <Logo/>
            </div>
            <div className='relative z-10 flex h-screen w-screen'>
                <div className='bg-white flex flex-col h-9/12 w-85 sm:w-7/12 lg:w-7/12 xl:w-5/10 m-auto rounded-3xl shadow-box-custom'>{/*central-box*/}
                    <div className='font-p text-3xl h-20 w-1/1 flex flex-col'>
                        <div className='m-auto'>
                            <p>Registrar</p>
                        </div>
                    </div>
                    <div className='h-7/12 w-11/12 flex ml-15'>
                        <div className='h-1/1 w-1/1 flex flex-col justify-center'>
                            <div className='h-3/11'>{/*name*/}
                                <p className='font-p pl-0.5'>Name</p>
                                <input type="text" 
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                                className='inputRegister w-11/12 sm:w-8/12 lg:w-8/12 xl:w-9/12'
                                />
                            </div>
                            <div className='h-3/11'>{/*email*/}
                                <p className='font-p pl-0.5'>Email</p>
                                <input type="email" 
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                className='inputRegister w-10/12 sm:w-6/12 lg:w-7/12 xl:w-8/12'
                                />
                            </div>
                            <div className='h-3/11'>{/*cpf*/}
                                <p className='font-p pl-0.5'>Cpf</p>
                                <input type="text" 
                                value={cpf}
                                onChange={(e)=>setCpf(e.target.value)}
                                className='inputRegister w-8/12 sm:w-4/12 lg:w-5/12 xl:w-5/12'
                                />
                            </div>
                            <div className='h-3/11'>{/*password*/}
                                <p className='font-p pl-0.5'>Password</p>
                                <input type="password" 
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                className='inputRegister w-9/12 sm:w-5/12 lg:w-6/12 xl:w-6/12'
                                />
                            </div>
                        </div>
                    </div>
                    <div className='mt-10 mb-10 ml-auto mr-auto'>{/*Botao */}
                        <Button onClick={handleRegister} className='w-21 hover:w-24'>register</Button>
                    </div>
                    {erro && <p className='text-red-500 text-center mt-2 font-Jura'>{erro}</p>}
                </div>
            </div>
        </div>
    </>
    )
}

export default Register;