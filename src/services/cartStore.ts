import { type APIMakeup } from "../types/api";
import { atom, map} from 'nanostores';

export const isCartOpen = atom(false);


export type CartItemDisplayInfo = Pick<APIMakeup, 'id' | 'name' | 'price' | 'image'>;

export const APIMakeups = map<Record<string, APIMakeup>>({});


export function addCartItem ({id, name, price, image, quantity}) {
    const existingEntry = APIMakeups.get()[id];
    if(existingEntry){
        APIMakeups.setKey(id, {
            ...existingEntry,
            quantity: existingEntry.quantity + quantity
        });

    } else {
        APIMakeups.setKey(id, 
            {
                id, name, price, image, quantity: 1,
                description: "",
                status: ""
            }
        );
    }
}

