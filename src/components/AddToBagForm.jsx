import { addCartItem, isCartOpen } from "../services/cartStore";
import { getMakeupBy } from "../services/makeups";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from "react";
import '../styles/styles.css'

export default function AddToBagForm({ id }) {

    const [addedToCart, setAddedToCart] = useState(false);

    useEffect(() => {
        const isProductAdded = localStorage.getItem(`product_${id}_added`);
        if (isProductAdded === "true") {
          setAddedToCart(true);
        }
    }, [id]);

    

    async function addToBag(e){
        e.preventDefault();
        isCartOpen.set(true);


        try {
            const makeupData = await getMakeupBy({id})
            addCartItem(makeupData);
            setAddedToCart(true);

            localStorage.setItem(`product_${id}_added`, "true");
            window.location.reload();

            toast.success("Producto agregado a tu bolsa")
            
        } catch (error) {
            console.error("error al obtener los datos");
        }
    }

    return (
        <div>
            <form onSubmit={addToBag}>
                <div className="mt-6">
                    <button disabled={addedToCart} className={`text-center text-sm w-40 py-3 rounded-md font-normal tracking-wide text-white ${addedToCart ? 'bg-[#9c6550]/80' : 'bg-[#9c6550] hover:scale-105 hover:bg-[#b17863] transition'}`}
                    >Agregar a la bolsa</button>
                    {addedToCart && <p className="text-xs py-2 px-1 text-red-600">El producto ya existe en la bolsa</p>}
                </div>
            </form>
            <ToastContainer position="top-right" toastStyle={{color: "black"}} style={{marginTop: "150px"}} autoClose={900} />
        </div>
    )

}
