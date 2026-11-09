'use server'
import qs from 'query-string'

const BASE_URL = process.env.COINGEKO_BASE_URL
const API_KEY = process.env.COINGEKO_API_KEY;

if (!BASE_URL) throw new Error('Could not get BASE_URL');
if (!API_KEY) throw new Error('Could not get API_KEY');

export async function fetcher<T>(endpoint: string, params?: QueryParams, revalidate = 60): Promise<T> {
    const url = qs.stringifyUrl({
        url: `${BASE_URL}/${endpoint}`,
        query: params,
    }, { skipEmptyString: true, skipNull: true })

    const response = await fetch(url, {
        headers: {
            'x-ch-pro-api-key': API_KEY,
            'Content-Type': 'application/json'
        } as Record<string, string>,
        next: { revalidate }
    });

    if (!response.ok) {
        const errorBody: CoinGeckoErrorBody = await response.json().catch(() => ({}));
        throw new Error(`API Error: ${errorBody.error || response.statusText}`)
    }
    return response.json();
}

// Gets the crypto from the network on blockchain
// using the coin id , blockchain it is on and address if there is any
export async function getPools(
    id: string,
    network?: string | null,
    contractAddress?: string | null
): Promise<PoolData> {
    const fallback: PoolData = {
        id: "",
        address: "",
        name: "",
        network: "",
    };

    if (network && contractAddress) {
        try {

            const poolData = await fetcher<{ data: PoolData[] }>(
                `onchain/networks/${network}/tokens/${contractAddress}/pools`
            );

            return poolData.data?.[0] ?? fallback;
        } catch (error) {
            console.error('coingecko error: ', error)
            return fallback;
        }
    }

    try {
        const poolData = await fetcher<{ data: PoolData[] }>(
            "onchain/search/pools",
            { query: id }
        );

        return poolData.data?.[0] ?? fallback;
    } catch {
        return fallback;
    }
}