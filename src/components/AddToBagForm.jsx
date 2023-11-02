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

            toast.success("Producto agregado a tu bolsa")
        } catch (error) {
            console.error("error al obtener los datos");
        }
    }

    return (
        <div>
            <form onSubmit={addToBag}>
                <div class="mt-6">
                    <button disabled={addedToCart} class={`text-center text-sm w-40 py-3 rounded-md font-normal tracking-wide text-white ${addedToCart ? 'bg-green-900/70' : 'bg-green-900 hover:scale-105 hover:bg-green-700 transition'}`}
                    >Agregar a la bolsa</button>
                </div>
            </form>
            <ToastContainer position="top-right" toastStyle={{color: "black"}} style={{marginTop: "113px"}} autoClose={2000} />
        </div>
    )

}
