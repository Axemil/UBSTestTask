import { useEffect, useState } from 'react';

const API_URL = 'https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v1/accounting/od/rates_of_exchange';

export const useGetTreasury = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getTreasury = () => {
        fetch(API_URL)
            .then((response) => response.json())
            .then((response) => {
                setIsLoading(true);
                setData(response.data.map(({ country, currency, exchange_rate }) => ({
                    country,
                    currency,
                    rate: parseFloat(exchange_rate)
                })));
            })
            .catch((error) =>  console.error('Failed to fetch exchange rates:', error))
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        getTreasury();
    }, []);

    return {
        data,
        isLoading,
    }
}