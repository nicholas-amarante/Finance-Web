import '../index.css'
import ExpandableMenu from '../components/ExpandableMenu';
import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';

function User(){
    
    return(
        <>
            <div className='noise gradt h-screen w-screen'>
                <div className='absolute z-20'>
                    <ExpandableMenu/>
                </div>
                <div>
                    <Logo/>
                </div>
                <div className='w-screen h-screen flex items-end justify-center z-10'>
                    <div className='bg-white w-11/12 h-10/12 p-10 rounded-tl-3xl rounded-tr-3xl z-20 flex flex-row'>{/*caixa central */}
                        <div>
                            {/* <button className='bg-gray-300 w-40 h-10 flex rounded-xl 
                            shadow-xl 
                            transition-all 
                            duration-500
                            hover:bg-white
                            hover:w-42
                            hover:h-11'>
                                <Link to="" className='flex items-center m-auto'>Create Transaction</Link>
                            </button> */}
                            <p>Mês: </p>
                            
                        </div>
                        <div>
                            <p>Saldo: </p>
                        </div>
                        <div>
                            <p>Receitas: </p>
                        </div>
                        <div>
                            <p>Despesas: </p>
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default User;