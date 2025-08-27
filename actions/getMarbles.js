export async function getMarbles() {
    console.log(process.env.URL)
    const res = await fetch(process.env.URL + `/api/marbles`, { cache: 'no-store' })
    const data = await res.json();
    return { marbles: data.marbles };
}