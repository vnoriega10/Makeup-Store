import {useState} from'react'
import '../styles/styles.css'
import { Contador } from './Contador'
import { useStore } from '@nanostores/react'
import { isCartOpen, APIMakeups, addCartItem } from '../services/cartStore'

const SideBar = () => {
    
    const [open, setOpen] = useState(false)
    const $isCartOpen = useStore(isCartOpen);
    const $APIMakeups = useStore(APIMakeups);

    return (
        <div  className='bg-transparent py-8 flex top-0 right-0'>
            <button className='mr-4' onClick={() => setOpen(true)}>
                <svg className='svg-size' xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304z"></path>
                    <path d="M9 11v-5a3 3 0 0 1 6 0v5"></path>
                </svg>
            </button>

            <div className={`${!open && "hidden"} bg-stone-300/50 min-h-screen w-full fixed top-0 right-0 backdrop-blur-sm`} onClick={() => setOpen(false)} >
            </div>

            <div className={ `${open ? "w-96" : "w-0"} bg-white min-h-screen w-96 fixed top-0 right-0 transition-all duration-500`}>
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
                                        <li key={makeup.id} className='grid py-8 grid-cols-12 gap-3'>
                                            <div className='overflow-hidden rounded-md col-span-3 lg:col-span-2'>
                                                <img src={makeup.image} alt={makeup.name} className='object-cover h-full object-center aspect-1'/>
                                            </div>
                                            <div className='col-span-7 lg:col-span-8 flex flex-col'>
                                                <h3 className='w-fit'>{makeup.name}</h3>
                                                <p className='text-sm'>{makeup.price.toFixed(3)}</p>
                                            </div>
                                            <div className='col-span-2 items-end flex justify-between flex-col'>
                                                <div className="flex text-center">
                                                    <button className="border border-zinc-500 px-2 text-sm" 
                                                        onClick={() => {const newQuantity = makeup.quantity + 1;
                                                        addCartItem({ id: makeup.id, quantity: 1 });
                                                        }}>
                                                    +</button>
                                                        <span>{makeup.quantity}</span>
                                                    <button className="border border-zinc-500 px-2 text-sm" 
                                                        onClick={() => {
                                                            if (makeup.quantity > 1) {
                                                                const newQuantity = makeup.quantity - 1;
                                                                addCartItem({ id: makeup.id, quantity: -1 });
                                                            }
                                                        }}>
                                                    -</button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ): <div> <p className="text-center pt-10 m-auto text-zinc-700 text-base">Tu bolsa está vacía</p> <a href="/"><p className="text-center text-cyan-900 font-semibold">Agregar productos a mi bolsa</p></a></div>
                        }
                    </div>
                    
                </div>
                    
                
                
                
            </div>
        </div>
        
    )
}

export default SideBar

 

