import { useState } from "preact/hooks"

export function Contador(){
    const [contador, setContador] = useState(0)

    return (
        <>
            <button class="border px-4 py-2 text-xl" onClick={() => setContador(contador => contador + 1)}>+</button>
            <button class="border px-4 py-2 text-xl" onClick={() => setContador(contador => contador - 1)}>-</button>
        
        </>
    )
}