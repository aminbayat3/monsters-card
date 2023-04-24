export const getData = async <T>(url: string, signal: AbortSignal): Promise<T> => { // so this is saying that getData is going to get some type T. this type T is what you're going to return from this function inside of a promise
    const response = await fetch(url, { signal });
    return await response.json();
}