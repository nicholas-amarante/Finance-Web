import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '../public/sf.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
  <>
    <div className="w-screen h-screen p-4">
      <div>
        <h1 className='h-1/6 m-auto text-center text-3xl font-bold text-white'>LOGIN</h1>
      </div>
      <div className='h-5/6 flex flex-col justify-center'>
        <div className='bg-orange-100 h-2/5 w-3xs md:w-2/5 md:h-1/3 m-auto rounded-lg flex flex-col justify-center'>
        <div className='text-center'>
          <p>
            Email
          </p>
          <input type="email" className='bg-white rounded-sm'/>
        </div>
        <div className='text-center'>
          <p>
            Password
          </p>
          <input type="password" className='bg-white rounded-sm'/>
        </div>
      </div>
      </div>
    </div>
  </>
  )
}

export default App
