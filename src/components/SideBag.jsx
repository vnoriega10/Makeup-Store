import {useState, useEffect} from'react'
import '../styles/styles.css'
import { Contador } from './Contador'
import { useStore } from '@nanostores/react'
import { isCartOpen, APIMakeups} from '../services/cartStore'

const SideBar = () => {
    
    const [open, setOpen] = useState(false)
    const $isCartOpen = useStore(isCartOpen);
    const $APIMakeups = useStore(APIMakeups);

    useEffect(() => {
        // Carga los productos almacenados en el localStorage
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
          const cartItems = JSON.parse(storedCartItems);
          Object.values(cartItems).forEach((item) => {
            APIMakeups.setKey(item.id, item);
          });
        }
    }, []);
    
    return(
        <div className='bg-transparent py-8 flex top-0 right-0'>
            <button className='mr-4' onClick={() => setOpen(true)}>
                <svg className='svg-size' xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304z"></path>
                    <path d="M9 11v-5a3 3 0 0 1 6 0v5"></path>
                </svg>
            </button>

            <div className={`${!open && "hidden"} bg-stone-300/50 min-h-screen w-full fixed top-0 right-0 backdrop-blur-sm`} onClick={() => setOpen(false)} >
            </div>

            <div className={ `${open ? "w-[420px]" : "w-[1px]"} bg-white min-h-screen w-[420px] fixed top-0 right-0 transition-all duration-500 shadow`}>
                    <div className={`${!open && "hidden"} flex items-center justify-between py-4 px-5 border-b`}>

                            <h3 className='text-2xl flex gap-4 items-center font-bold text-zinc-800'>Tu bolsa</h3>
                            <button className='text-black' onClick={() => setOpen(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M18 6l-12 12"></path>
                                    <path d="M6 6l12 12"></path>
                                </svg>
                            </button>
                    </div>
                <div className='flex-1 overflow-y-scroll min-h-screen'>
                    <div className='px-5'>
                        {Object.values($APIMakeups).length ? (
                                <ul className='divide-y divide-zinc-100'>
                                    {Object.values($APIMakeups).map(makeup => (
                                        <li key={makeup.id} className='grid py-4 grid-cols-12 gap-3'>
                                            <div className='overflow-hidden rounded-md col-span-3 lg:col-span-2'>
                                                <img src={makeup.image} alt={makeup.name} className='object-cover h-full object-center aspect-1'/>
                                            </div>
                                            <div className='col-span-7 lg:col-span-8 flex flex-col'>
                                                <h3 className='w-fit text-base font-semibold'>{makeup.name}</h3>
                                                <p className='text-sm'>{makeup.price.toFixed(3)}</p>
                                                <div className="flex text-sm pb-1">
                                                    <span className=" mr-1">Cantidad: </span><Contador/>
                                                </div>
        
                                            </div>
                                            <div className='col-span-2 items-center flex justify-between flex-col ml-2'>
                                                
                                                <div className="pt-4 text-zinc-500">
                                                    <button>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.4" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                            <path d="M4 7l16 0"></path>
                                                            <path d="M10 11l0 6"></path>
                                                            <path d="M14 11l0 6"></path>
                                                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                                                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ): <div> <p className="text-center pt-10 m-auto text-zinc-700 text-base">Tu bolsa está vacía</p> <a className={`${!open && "hidden"}`} onClick={() => setOpen(false)} href="/"><p className="text-center text-cyan-900 font-semibold">Agregar productos a mi bolsa</p></a></div>
                        }
                    </div>
                    
                </div>
                    
                
                
                
            </div>
        </div>
        
    )
}

export default SideBar

 

