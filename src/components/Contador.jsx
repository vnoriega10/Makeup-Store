import { useState } from "react"

export function Contador(){
    const [contador, setContador] = useState(1)

    if(contador < 1){
        setContador(1)
    }

    return (
        <>
        <div className="flex text-center">
            <button className="border border-zinc-500 px-2 text-sm" onClick={() => setContador(contador => contador - 1)}>-</button>
            <span className="text-black text-sm px-3 mt-1">{contador}</span>
            <button className="border border-zinc-500 px-2 text-sm" onClick={() => setContador(contador => contador + 1)}>+</button>
        </div>
        </>
    )
}
