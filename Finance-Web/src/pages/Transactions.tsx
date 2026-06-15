import ExpandableMenu from "../components/ExpandableMenu";
import { Logo } from "../components/Logo";
import { Navbar } from "../components/Navbar";


function Transactions(){
    return(
        <>
            <div className='noise gradt h-screen w-screen flex flex-row'>
                <div className='absolute z-20'>
                    <ExpandableMenu/>
                </div>
                <div>
                    <Logo/>
                </div>
                <div>
                    <Navbar/>
                </div>

                <div>
                    
                </div>
            </div>
        </>
    )
}

export default Transactions;