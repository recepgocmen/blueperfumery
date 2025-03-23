import { useState, useEffect } from "react";

export const useExchangeRate = () => {
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        setLoading(true);
        // Free currency API kullanıyoruz
        const response = await fetch(
          "https://api.exchangerate.host/latest?base=USD&symbols=TRY"
        );

        if (!response.ok) {
          throw new Error("Exchange rate data could not be fetched");
        }

        const data = await response.json();

        if (data && data.rates && data.rates.TRY) {
          setExchangeRate(data.rates.TRY);
        } else {
          throw new Error("Exchange rate data format is invalid");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
        // Fallback değeri olarak yaklaşık bir kur belirleyelim
        setExchangeRate(32);
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRate();
  }, []);

  return { exchangeRate, loading, error };
};
