import '../App.css';
import '../index.css'

function Register(){
    return(
    <>
        <div className='noise gradt h-screen w-screen flex flex-col'>
            <div className='realtive z-10 respMenu ml-5 mt-5 rounded-md'>
                <div className='bg-white'>

                </div>
            </div>
            <div className='relative z-10 h-9/12 w-12/12 m-auto justify-center'>
                    <div className='bg-white h-11/12 w-80 sm:w-7/12 lg:w-7/12 xl:w-4/10 m-auto rounded-lg flex flex-col justify-center'>{/*central-box*/}
                        <div className='h-7/12 ml-7'>
                            <div className='h-1/5'>{/*name*/}
                                <p className='font-p pl-0.5'>Name</p>
                                <input type="text" 
                                className='inputRegister w-11/12 sm:w-8/12 lg:w-8/12 xl:w-9/12'
                                />
                            </div>
                            <div className='h-1/5 '>{/*email*/}
                                <p className='font-p pl-0.5'>Email</p>
                                <input type="email" 
                                className='inputRegister w-10/12 sm:w-6/12 lg:w-7/12 xl:w-8/12'
                                />
                            </div>
                            <div className='h-1/5 '>{/*cpf*/}
                                <p className='font-p pl-0.5'>Cpf</p>
                                <input type="number" 
                                className='inputRegister w-8/12 sm:w-4/12 lg:w-5/12 xl:w-5/12'
                                />
                            </div>
                            <div className='h-1/5'>{/*password*/}
                                <p className='font-p pl-0.5'>Password</p>
                                <input type="text" 
                                className='inputRegister w-9/12 sm:w-5/12 lg:w-6/12 xl:w-6/12'
                                />
                            </div>
                            
                        </div>
                        <div className='mt-10 mb-10 ml-auto mr-auto'>{/*Botao */}
                            <button 
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
                    </div>
            </div>
        </div>
    </>
    )
}

export default Register;