import { addCartItem, isCartOpen } from "../services/cartStore";
import { getMakeupBy } from "../services/makeups";
export default function AddToBagForm({ children, id }) {

    async function addToBag(e){
        e.preventDefault();
        isCartOpen.set(true);
        try {
            const makeupData = await getMakeupBy({id})
            addCartItem(makeupData);
        } catch (error) {
            console.error("error al obtener los datos", error);
        }
    }

    return (
        <form onSubmit={addToBag}>
            {children}
        </form>
    )

}
