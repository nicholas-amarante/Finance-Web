import '../App.css';
import byteFoto from '../assets/byte.png';

function Home(){
    return(
    <>
        <div className="bg-gradient-to-bl from-[#404658] to-[#8A96BE] h-screen w-screen
        noise
        ">
            <div className="h-screen w-screen flex flex-col">
                <div className="h-screen w-screen flex flex-col">
                    <div className="mt-2.5 flex justify-end">
                        <p className="
                        font-p
                        bg-gray-500
                        hover:bg-gray-700
                        hover:text-white
                        mr-4
                        pt-1 pb-1 pl-3 pr-3
                        rounded-full
                        ">
                            <a href="/login">Sign in</a>
                        </p>
                        <p className="
                        font-p
                        text-white
                        bg-gray-800
                        hover:bg-gray-900
                        ml-4 mr-4
                        pt-1 pb-1 pl-3 pr-3
                        rounded-full
                        ">
                        <a href="/register">Sign up</a>
                        </p>
                    </div>
                    <div className='h-12/12 w-12/12 rounded-xl flex flex-col md:flex-row items-center justify-center'>
                        <div className='bg-gray-600 w-3/10 h-4/10 m-5 p-3 rounded-3xl'>
                            <p className='text-white'>
                                O que é a Byte Finance?
                            </p>
                            <p className='text-white'>
                                A Byte Finance é a sua nova ferramenta digital para o controle e gestão das suas finanças pessoais.
                            </p>
                        </div>
                        <div className='bg-gray-600 w-3/10 h-4/10 m-5 p-3 rounded-3xl'>
                            <p className='text-white'>
                                Como a Byte Finance te ajuda?
                            </p>
                            <p className='text-white'>
                                Ele te ajuda a transformar seus hábitos financeiros. Chega de surpresas no final do mês! Com ele, você registra seus gastos rapidamente, ajudando você a planejar, economizar e alcançar seus objetivos financeiros.
                            </p>
                        </div>
                    </div>
                    <div>
                        <img src={byteFoto} alt="" className="relative z-10 h-80"/>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </div>
    </>
    )
}

export default Home;