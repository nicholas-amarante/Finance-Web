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
                        mr-4
                        pt-0.5 pb-0.5 pl-1 pr-1
                        border-2
                        border-
                        ">
                            <a href="/login">Sign in</a>
                        </p>
                        <p className="
                        ml-4 mr-4
                        pt-0.5 pb-0.5 pl-1 pr-1
                        border-2 border-solid 
                        border-b-black
                        ">
                        <a href="/register">Sign up</a>
                        </p>
                    </div>
                    <div className='bg-white h-5/12 w-5/12'>

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