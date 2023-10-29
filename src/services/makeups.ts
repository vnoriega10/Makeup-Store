import { type APIMakeup } from "../types/api"

export const getMakeups = async () => {
    
    const res = await fetch ('http://localhost:1234/makeups')

    const data = await res.json() as APIMakeup[]
    return data
}

export const getMakeupBy = async ({id} : {id: string}) => {
    const res = await fetch (`http://localhost:1234/makeups/${id}`)
    
    const data = await res.json() as APIMakeup
    return data

}