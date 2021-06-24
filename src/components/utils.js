export async function fetchCARDS(arg){
    return await fetch(`https://localhost:3000/${arg}`).then(r => r.json())
}