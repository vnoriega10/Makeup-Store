import {useState} from'react'
import '../styles/styles.css'


const SideBar = () => {
    const [open, setOpen] = useState(false)
    return (
        <div  className='bg-transparent py-10 flex top-0 right-0'>
            <button className='mr-4' onClick={() => setOpen(true)}>
                <svg className='svg-size' xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304z"></path>
                    <path d="M9 11v-5a3 3 0 0 1 6 0v5"></path>
                </svg>
            </button>

            <div className={`${!open && "hidden"} bg-stone-300/50 min-h-screen w-full fixed top-0 right-0 backdrop-blur-sm`} onClick={() => setOpen(false)}>
            </div>

            <div className={ `${open ? "w-80" : "w-[0px]"} bg-white min-h-screen w-80 fixed top-0 right-0 transition-all duration-500`}>
                <div className={`${!open && "hidden"} flex items-start justify-between p-5`}>
                    <h3 className='text-xl flex gap-4 items-center font-bold text-zinc-800'>Tu bolsa</h3>
                    <button className='ml-4 text-black mb-14' onClick={() => setOpen(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M18 6l-12 12"></path>
                            <path d="M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        
    )
}

export default SideBar