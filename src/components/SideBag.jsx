import {useState, useEffect} from'react'
import '../styles/styles.css'
import { useStore } from '@nanostores/react'
import {APIMakeups} from '../services/cartStore'

const SideBar = () => {
    
    const [open, setOpen] = useState(false);
    const $APIMakeups = useStore(APIMakeups);
    const hasItems = Object.values($APIMakeups).length > 0;
    const [cartItemCount, setCartItemCount] = useState(0);

    const [formData, setFormData] = useState({
        name: '',
        tel: '',
        city: '',
        address: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    const handleFormSubmit = () => {
        const { name, tel, city, address } = formData;
    
        // Construye el mensaje de WhatsApp con información del carrito
        const cartItems = Object.values($APIMakeups);
        let message = `Nombre: ${name}\nTeléfono: ${tel}\nCiudad: ${city}\nDirección: ${address}\n\nProductos en el carrito:\n\nTotal:\n`;
        cartItems.forEach((makeup) => {
            message += `${makeup.name}: ${makeup.quantity}\n ${makeup.price.toFixed(3)}\n`;
        });
    
        const whatsappURL = `https://wa.me/573006046165?text=${encodeURIComponent(message)}`;
        
        // Abre la ventana de WhatsApp utilizando 'wa.me'
        window.open(whatsappURL, '_blank');
    };

    function formatNumberWithSeparator(value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    function formatNumberWithThreeDecimals(value) {
        return formatNumberWithSeparator(value.toFixed(3));
    }

    useEffect(() => {
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
          const cartItems = JSON.parse(storedCartItems);
          const itemCount = Object.values(cartItems).reduce((acc) => acc + 1, 0);
          setCartItemCount(itemCount);
        }
    }, []);


    function openSideBar() {
        document.body.classList.add("no-scroll");
    }

    function closeSideBar() {
        document.body.classList.remove("no-scroll");
    }

    function updateQuantity(productId, newQuantity) {

        if (newQuantity < 1) {
            return;
        }
        
        const updatedMakeups = { ...$APIMakeups };
        updatedMakeups[productId].quantity = newQuantity;
        APIMakeups.set(updatedMakeups);
    

        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
            const cartItems = JSON.parse(storedCartItems);
            if (cartItems[productId]) {
                cartItems[productId].quantity = newQuantity;
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
            }
        }
    }

    function deleteProduct(id){

        const storedCartItems = localStorage.getItem('cartItems');

        if(storedCartItems){
            const cartItems = JSON.parse(storedCartItems);
            delete cartItems[id];
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }

        const updatedMakeups = { ...$APIMakeups };
        delete updatedMakeups[id];
        APIMakeups.set(updatedMakeups);


        const productAddedKey = `product_${id}_added`;
        delete localStorage[productAddedKey];
        window.location.reload();
    }

    useEffect(() => {
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
            <div className='text-[#955c46]'>
            <button className='mr-4 relative' onClick={() => {
                setOpen(true)
                openSideBar()
                
                }}>
                <svg className='svg-size' xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304z"></path>
                    <path d="M9 11v-5a3 3 0 0 1 6 0v5"></path>
                </svg>
                {cartItemCount > 0 && (
                    <div className="cart-item-count">{cartItemCount}</div>
                )}
            </button>
            </div>
            <div className={`${!open && "hidden"} bg-stone-300/50 min-h-screen w-full fixed top-0 right-0 backdrop-blur-sm`} onClick={() => {
                setOpen(false)
                closeSideBar()
                }} >
            </div>

            <div className={ `${open ? "w-[420px]" : "w-[1px]"} bg-white min-h-full max-h-screen w-[420px] fixed top-0 right-0 transition-all duration-500 shadow`}>
                    <div className={`${!open && "hidden"} flex items-center justify-between py-4 px-5 border-b`}>

                            <h3 className='text-2xl flex gap-4 items-center font-bold text-black'>Tu bolsa</h3>
                            <button className='text-gray-500' onClick={() => {
                                setOpen(false)
                                closeSideBar()
                                }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M18 6l-12 12"></path>
                                    <path d="M6 6l12 12"></path>
                                </svg>
                            </button>
                    </div>
                <div>
                    <div className="">
                        {hasItems && (
                            <div className="products-container px-5">
                                <ul className='divide-y divide-zinc-100'>
                                     {Object.values($APIMakeups).map(makeup => ( 
                                        <li key={makeup.id} className='grid py-4 grid-cols-12 gap-3'>
                                                <div className='overflow-hidden rounded-md col-span-3 lg:col-span-2'>
                                                    <img src={makeup.image} alt={makeup.name} className='h-auto object-center aspect-1'/>
                                                </div>
                                                <div className='col-span-7 lg:col-span-8 flex flex-col'>
                                                    <h3 className='w-fit text-base font-semibold'>{makeup.name}</h3>
                                                    <div className="flex text-sm pt-5">
                                                        <span className=" mr-1">Cantidad: </span> 
                                                        <div className="flex text-center">
                                                            <button className="border border-zinc-400 pb-1 text-sm justify-center w-5 h-5" onClick={() => updateQuantity(makeup.id, makeup.quantity - 1)}>-</button>
                                                            <span className="text-zinc-800 text-sm px-2 font-semibold mt-[1px] justify-center ">{makeup.quantity}</span>
                                                            <button className="border border-zinc-400 pb-1 text-sm justify-center w-5 h-5" onClick={() => updateQuantity(makeup.id, makeup.quantity + 1)}>+</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            <div className='col-span-2 items-center flex justify-between flex-col ml-2'>
                                                    
                                                <div className="pt-3 text-[#955c46]">
                                                    <button onClick={() => deleteProduct(makeup.id)}>
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
                                                <span className='text-sm px-2'>${formatNumberWithThreeDecimals(makeup.price * makeup.quantity)}</span>
                                            </div>
                                        </li>      
                                    ))}
                                </ul>
                            </div>         
                        )}
                        {hasItems && (
                            <div>
                                
                                
                                <div className="">
                                    <div className='border-t border-zinc-300 py-3 sm:px-4'>
                                        <div className='flex justify-between py-2 text-base text-zinc-900'>
                                            <span className='font-semibold'>Subtotal</span>
                                            <span className=''>$ {formatNumberWithThreeDecimals(Object.values($APIMakeups).reduce((acc, makeup) => acc + (makeup.price * makeup.quantity), 0))}</span>
                                        
                                        </div>
                                        <div className='flex justify-between  py-2 text-base text-zinc-900'>
                                            <span className='font-semibold'>Envío</span>
                                            <span className=''>Por calcular</span>
                                        </div>
                                        <div className='flex justify-between  py-2 text-base text-zinc-900'>
                                            <span className='font-semibold'>Total</span>
                                            <span className=''>$ {formatNumberWithThreeDecimals(Object.values($APIMakeups).reduce((acc, makeup) => acc + (makeup.price * makeup.quantity), 0))}</span>
                                        </div>
                                        <div class=" text-center text-zinc-900 font-bold text-xl py-1">
                                            <h1>Información de facturación</h1>
                                        </div>
                                        <div class="w-full">
                                            <form id="myForm" class="bg-transparent shadow-sm rounded-md px-3 py-1">
                                                <div class="grid md:grid-cols-2 md:gap-3" >
                                                    <div >
                                                        <label for="name" class="text-zinc-900 text-sm font-semibold block mb-1">Nombre completo</label>
                                                        <input name="name" id="name" minlength="1" maxlength="25" class="appearance-none border border-zinc-300 rounded w-full py-1 px-3 leading-tight focus:outline-none focus:shadow-none" value={formData.name} onChange={handleInputChange} type="text" required/>
                                                    </div>
                                                    <div>
                                                        <label for="tel" class="text-zinc-900 text-sm font-semibold block mb-1">Número de teléfono</label>
                                                        <input name="tel" id="tel" class="appearance-none border border-zinc-300 rounded w-full py-1 px-3 leading-tight focus:outline-none focus:shadow-none" type="tel" pattern="[0-9]{3}[0-9]{3}[0-9]{4}" minlength="1" maxlength="10" value={formData.tel} onChange={handleInputChange} required/>
                                                    </div>
                                                    <div >
                                                        <label for="city" class="text-zinc-900 text-sm font-semibold block mb-1">Ciudad</label>
                                                        <input name="city" id="city" minlength="1" maxlength="25" class="appearance-none border border-zinc-300 rounded w-full py-1 px-3 leading-tight focus:outline-none focus:shadow-none" type="text" value={formData.city} onChange={handleInputChange} required/>
                                                    </div>
                                                    <div class="mb-4">
                                                        <label for="address" class="text-zinc-900 text-sm font-semibold block mb-1">Dirección</label>
                                                        <input name="address" id="address" class="appearance-none border border-zinc-300 rounded w-full py-1 px-3 leading-tight focus:outline-none focus:shadow-none" type="text" required value={formData.address} onChange={handleInputChange}/>
                                                    </div>
                                                </div>
                                                <button onClick={handleFormSubmit} type="button" id="submitButton" class="bg-[#9c6550] text-white py-2 w-full rounded-md hover:scale-105 hover:bg-[#b17863] transitio">Confirmar compra</button>
                                                
                                            </form>
                                            
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        )}
                        {!hasItems && (
                            <div>
                                <p className="text-center pt-10 m-auto text-zinc-700 text-base">Tu bolsa está vacía</p> 
                                <a className={`${!open && "hidden"}`} onClick={() => setOpen(false)} href="/">
                                    <p className="text-center text-[#955c46] font-semibold">Agregar productos a mi bolsa</p>
                                </a>
                            </div> 
                        )}
                        
                    </div>
                </div> 
            </div>
        </div>
        
        
        
    )
}



export default SideBar

 



