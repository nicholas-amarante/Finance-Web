import '../index.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";

function Register(){
    const navigate=useNavigate();
    const [name, setName]=useState('');
    const [email, setEmail]=useState('');
    const [cpf, setCpf]=useState('');
    const [password, setPassword]=useState('');
    const [erro, setErro]=useState('');

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
            setErro('Falha na conexao com servidor .');
        }
    };


    return(
    <>
        <div className='noise gradt h-screen w-screen flex flex-col'>
            <div className='realtive z-10 menu'>
                <div className=''>
                    <IoIosArrowForward className='IoIosArrowForward'/>
                </div>
            </div>
            <div className='relative z-10 h-9/12 w-12/12 m-auto justify-center'>
                    <div className='bg-white h-11/12 w-80 sm:w-7/12 lg:w-7/12 xl:w-4/10 m-auto rounded-lg flex flex-col justify-center'>{/*central-box*/}
                        <div className='h-7/12 ml-7'>
                            <div className='h-1/5'>{/*name*/}
                                <p className='font-p pl-0.5'>Name</p>
                                <input type="text" 
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                                className='inputRegister w-11/12 sm:w-8/12 lg:w-8/12 xl:w-9/12'
                                />
                            </div>
                            <div className='h-1/5 '>{/*email*/}
                                <p className='font-p pl-0.5'>Email</p>
                                <input type="email" 
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                className='inputRegister w-10/12 sm:w-6/12 lg:w-7/12 xl:w-8/12'
                                />
                            </div>
                            <div className='h-1/5 '>{/*cpf*/}
                                <p className='font-p pl-0.5'>Cpf</p>
                                <input type="text" 
                                value={cpf}
                                onChange={(e)=>setCpf(e.target.value)}
                                className='inputRegister w-8/12 sm:w-4/12 lg:w-5/12 xl:w-5/12'
                                />
                            </div>
                            <div className='h-1/5'>{/*password*/}
                                <p className='font-p pl-0.5'>Password</p>
                                <input type="password" 
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                className='inputRegister w-9/12 sm:w-5/12 lg:w-6/12 xl:w-6/12'
                                />
                            </div>
                            
                        </div>
                        <div className='mt-10 mb-10 ml-auto mr-auto'>{/*Botao */}
                            <button 
                            onClick={handleRegister}
                            className='
                            font-p
                            bg-black
                            text-white 
                            pt-2 pb-2 pl-3.5 pr-3.5 
                            rounded-md
                            hover:bg-[#8A96BE]
                            hover:text-black
                            hover:
                            active:bg-[#8A96BE]
                            transition-colors duration-500 delay-50
                            '>
                                registrar
                            </button>
                        </div>
                        {erro && <p className='text-red-500 text-center mt-2 font-Jura'>{erro}</p>}
                    </div>
            </div>
        </div>
    </>
    )
}

export default Register;