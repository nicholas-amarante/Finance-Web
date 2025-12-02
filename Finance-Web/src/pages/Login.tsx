import '../index.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import reactLogo from '../assets/react.svg';
import viteLogo from '../../public/sf.svg';
import { IoIosArrowForward } from "react-icons/io";

function Login() {
  const navigate=useNavigate();
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const [erro, setErro]=useState('');

  const handleLogin=async()=>{{/*promise*/}
    setErro('');
    try{
      const response=await fetch('http://localhost:8080/api/user/login', {
        method: 'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body: JSON.stringify({email, password: password})
      });
      if(!response.ok){
        throw new Error('login failed! Verifique suas credenciais.');
      }
      const data=await response.json();
      const token=data.token;
      localStorage.setItem('meu_token_jwt', token);
      {/*alert('Login successful!')*/}
      navigate('/home');
    }catch(error){
      setErro('Erro ao fazer ');
    }
  }

  return (
  <>
    <div className="noise gradt w-screen h-screen">{/*Fundo*/}
      <div className='relative z-10 menu'>
        <div className=''>
          <IoIosArrowForward className='IoIosArrowForward'/>
        </div>
      </div>
      <div className='relative z-10 h-screen flex flex-col justify-center'>{/*primeiro corpo*/}
        <div className='bg-white h-80 w-80 md:h-6/12 md:w-2/6 m-auto rounded-lg flex flex-col justify-center'>{/*caixa central*/}
        <div className='h-1/5 w-7/12 flex flex-col m-auto'>{/*div-email*/}
          <p className='font-p'>
            Email
          </p>
          <input type="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className='bg-gray-300 rounded-sm w-5/6 h-6/12 sm:w-10/12 lg:w-8/12 xl:w-1/1 mb-2.5  '/>
        </div>
        <div className='h-1/5 w-7/12 flex flex-col m-auto'>{/*div-senha*/}
          <p className='font-p'>
            Password
          </p>
          <input type="password" 
          value={password} 
          onChange={(e)=>setPassword(e.target.value)}
          className='bg-gray-300 rounded-sm w-5/6 h-6/12 sm:w-10/12 lg:w-8/12 xl:w-1/1 mb-2.5  '/>
        </div> 
        <div className='text-center'>{/*div-botao*/}
          <button onClick={handleLogin}
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
          '>enviar</button>
          {erro && <p className='text-red-500 mt-2'>{erro}</p>}
        </div>
      </div>
      </div>
    </div>
  </>
  )
}

export default Login