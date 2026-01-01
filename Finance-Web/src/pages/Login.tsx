import '../index.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ExpandableMenu from '../components/ExpandableMenu';
import { Button } from '../components/Button';
import { Logo } from '../components/Logo';

function Login() {
  const navigate=useNavigate();
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const [erro, setErro]=useState('');
  const [isMenuOpen, setIsMenuOpen]=useState(false);
  const isLoggedIn=useAuth();

  const toggleMenu=()=>{
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin=async(e:React.FormEvent)=>{
    e.preventDefault();
    setErro('');
    try{
      const response=await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body: JSON.stringify({email, password: password})
      });
      if(!response.ok){
        throw new Error('HTTP status not OK');
      }
      const data=await response.json();
      const token=data.token;
      localStorage.setItem('tokenJwt', token);
      navigate('/user');
    }catch(error){
      setErro('incorrect email or passowrd');
    }
  }

  return (
  <>
    <div className="noise gradt w-screen h-screen flex flex-row">
      <div className='absolute z-20'>
        <ExpandableMenu/>
      </div>
      <div>
        <Logo/>
      </div>
      <div className='relative z-10 flex h-screen w-12/12'>
        <div className='bg-white shadow-box-custom h-100 w-85 sm:h-5/12 md:h-7/12 sm:w-3/5 md:w-3/5 lg:w-1/2 xl:w-1/3 m-auto rounded-3xl'>{/*caixa central*/}
          <div className='font-p text-3xl h-3/12 w-1/1 flex flex-col'>
            <div className='m-auto'>
              <p>Login</p>
            </div>
          </div>
          <div className='h-5/12 w-12/12 flex flex-col mb-8'>
            <div className='h-1/1 w-4/6 m-auto'>{/*div-email*/}
              <p className='font-p'>
                Email
              </p>
              <input type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className='bg-gray-300 h-6/12 w-1/1 rounded-sm sm:w-12/12 lg:w-12/12 xl:w-1/1 mb-2.5 pt-4 pl-2 text-lg'/>
            </div>
            <div className='h-1/1 w-4/6 flex flex-col m-auto'>{/*div-senha*/}
              <p className='font-p'>
                Password
              </p>
              <input type="password" 
              value={password} 
              onChange={(e)=>setPassword(e.target.value)}
              className='bg-gray-300 h-6/12 w-1/1 rounded-sm sm:w-12/12 lg:w-12/12 xl:w-1/1 mb-2.5 pt-4 pl-2 text-lg'/>
            </div> 
          </div>
        <div className='text-center'>{/*div-botao*/}
          <Button type='button' onClick={handleLogin}>login</Button>
          {erro && <p className='text-red-500 mt-2'>{erro}</p>}
        </div>
      </div>
      </div>
    </div>
  </>
  )
}

export default Login