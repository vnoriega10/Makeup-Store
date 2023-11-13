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

        if (!name || !tel || !city || !address) {
            alert('Por favor, completa todos los campos antes de confirmar la compra.');
            return; // No redirigir si los campos están vacíos
        }
    
        // Construye el mensaje de WhatsApp con información del carrito
        const cartItems = Object.values($APIMakeups);
        let message = `*Nombre*: ${name}\n*Teléfono*: ${tel}\n*Ciudad*: ${city}\n*Dirección:* ${address}\n \n*Productos en el carrito*:\n`;
        cartItems.forEach((makeup) => {
            message += `${makeup.name}: ${makeup.quantity}\n`;
        });

        const subtotal = cartItems.reduce((acc, makeup) => acc + (makeup.price * makeup.quantity), 0);
        const total = subtotal.toFixed(3); // Puedes calcular el total aquí si es diferente al subtotal
    
        // Agrega el subtotal y el total al mensaje
        message += `\n*Total:* ${total}`;
    
        const whatsappURL = `https://wa.me/573006168523?text=${encodeURIComponent(message)}`;
        
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

            <div className={ `${open ? "w-[420px] max-[450px]:w-[290px]" : "w-[0px]"} bg-white min-h-full max-h-screen w-[420px] fixed top-0 right-0 transition-all duration-500 shadow`}>
                    <div className={`${!open && "hidden"} flex items-center justify-between py-4 px-5 border-b max-[450px]:w-[290px]`}>

                            <h3 className='text-2xl flex gap-4 items-center font-bold text-black max-[450px]:text-xl'>Tu bolsa</h3>
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
                            <div className="products-container px-5 max-[450px]:px-2">
                                <ul className='divide-y divide-zinc-100'>
                                     {Object.values($APIMakeups).map(makeup => ( 
                                        <li key={makeup.id} className='grid py-4 grid-cols-12 gap-3 max-[450px]:py-3'>
                                                <div className='overflow-hidden rounded-md col-span-3 lg:col-span-2'>
                                                    <img src={makeup.image} alt={makeup.name} className='h-auto object-center aspect-1'/>
                                                </div>
                                                <div className='col-span-7 lg:col-span-8 flex flex-col'>
                                                    <h3 className='w-fit text-base font-semibold max-[450px]:text-sm'>{makeup.name}</h3>
                                                    <div className="flex text-sm pt-5">
                                                        <span className=" mr-1">Cantidad: </span> 
                                                        <div className="flex text-center items-center">
                                                            <button className="border border-zinc-400 text-sm w-5 h-5 max-[450px]:w-4 max-[450px]:h-4 max-[450px]:pb-0 flex justify-center items-center" onClick={() => updateQuantity(makeup.id, makeup.quantity - 1)}>-</button>
                                                            <span className="text-zinc-800 text-sm px-2 font-semibold mt-[1px] max-[450px]:mt-0">{makeup.quantity}</span>
                                                            <button className="border border-zinc-400 text-sm w-5 h-5 max-[450px]:w-4 max-[450px]:h-4 max-[450px]:pb-0 justify-center flex items-center" onClick={() => updateQuantity(makeup.id, makeup.quantity + 1)}>+</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            <div className='col-span-2 items-center flex justify-between flex-col ml-2 max-[450px]:ml-0'>
                                                    
                                                <div className="pt-3 text-[#955c46] max-[450px]:pt-0 mr-1">
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
                                                <span className='text-sm px-2 max-[450px]:px-0 max-[450px]:mr-[6px] max-[450px]:text-[10px]'>${formatNumberWithThreeDecimals(makeup.price * makeup.quantity)}</span>
                                            </div>
                                        </li>      
                                    ))}
                                </ul>
                            </div>         
                        )}
                        {hasItems && (
                            <div>
                                
                                
                                <div className="">
                                    <div className='border-t border-zinc-300 py-3 sm:px-4 max-[450px]:px-2'>
                                        <div className='flex justify-between py-1 text-base max-[450px]:text-sm text-zinc-900'>
                                            <span className='font-semibold'>Subtotal</span>
                                            <span className='max-[450px]:text-sm'>$ {formatNumberWithThreeDecimals(Object.values($APIMakeups).reduce((acc, makeup) => acc + (makeup.price * makeup.quantity), 0))}</span>
                                        
                                        </div>
                                        <div className='flex justify-between  py-1 text-base text-zinc-900'>
                                            <span className='font-semibold max-[450px]:text-sm'>Envío</span>
                                            <span className='max-[450px]:text-sm'>Por calcular</span>
                                        </div>
                                        <div className='flex justify-between  py-1 text-base text-zinc-900'>
                                            <span className='font-semibold max-[450px]:text-sm'>Total</span>
                                            <span className='max-[450px]:text-sm'>$ {formatNumberWithThreeDecimals(Object.values($APIMakeups).reduce((acc, makeup) => acc + (makeup.price * makeup.quantity), 0))}</span>
                                        </div>
                                        <div class=" text-center text-zinc-900 font-bold text-xl py-3 max-[450px]:py-2 max-[450px]:text-base">
                                            <h1>Información de facturación</h1>
                                        </div>
                                        <div class="w-full">
                                            <form id="myForm" class="bg-transparent shadow-sm rounded-md px-3 py-1">
                                                <div class="grid md:grid-cols-2 md:gap-3" >
                                                    <div >
                                                        <div className='flex text-[#955c46]'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user" width="18" height="18" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                                <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
                                                                <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                                                            </svg>
                                                            <label for="name" class="text-zinc-900 text-sm px-1 mb-1">Nombre completo</label>
                                                        </div>
                                                        <input name="name" id="name" minlength="1" maxlength="25" class=" max-[450px]:text-sm appearance-none border border-zinc-300 rounded w-full py-1 max-[450px]:py-0 mb-1 px-3 leading-tight focus:outline-none focus:shadow-none" value={formData.name} onChange={handleInputChange} type="text" required/>
                                                    </div>
                                                    <div>
                                                        <div className='flex text-[#955c46]'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-phone" width="18" height="18" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                                <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
                                                            </svg>
                                                            <label for="tel" class="text-zinc-900 text-sm px-1 block mb-1">Número de teléfono</label>
                                                        </div>    
                                                            <input name="tel" id="tel" class="appearance-none border border-zinc-300 rounded w-full py-1 max-[450px]:py-0 mb-1 px-3 leading-tight focus:outline-none focus:shadow-none" type="tel" pattern="[0-9]{3}[0-9]{3}[0-9]{4}" minlength="1" maxlength="10" value={formData.tel} onChange={handleInputChange} required/>
                                                    </div>
                                                    <div >
                                                        <div className='flex text-[#955c46]'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-map-pin" width="18" height="18" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                                <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                                                                <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
                                                            </svg>
                                                            <label for="city" class="text-zinc-900 text-sm block px-1 mb-1">Ciudad</label>

                                                        </div>
                                                        <input name="city" id="city" minlength="1" maxlength="25" class="appearance-none border border-zinc-300 rounded w-full py-1 max-[450px]:py-0 mb-1 px-3 leading-tight focus:outline-none focus:shadow-none" type="text" value={formData.city} onChange={handleInputChange} required/>
                                                    </div>
                                                    <div class="">
                                                        <div className='flex text-[#955c46]'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-home" width="18" height="18" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                                <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>
                                                                <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
                                                                <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
                                                            </svg>
                                                            <label for="address" class="text-zinc-900 text-sm px-1 block mb-1">Dirección</label>
                                                        </div>
                                                        <input name="address" id="address" class="appearance-none border border-zinc-300 rounded w-full py-1 max-[450px]:py-0 mb-1 px-3 leading-tight focus:outline-none focus:shadow-none" type="text" required value={formData.address} onChange={handleInputChange}/>
                                                    </div>
                                                </div>
                                                <button onClick={handleFormSubmit} type="button" id="submitButton" class="bg-[#9c6550] mt-4 text-white py-2 w-full rounded-md hover:scale-105 hover:bg-[#b17863] transitio">Confirmar compra</button>
                                                
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

 



