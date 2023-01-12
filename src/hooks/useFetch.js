import { useState, useEffect } from "react";

const useFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorData, setErrorData] = useState(null);

  useEffect(() => {
    const doFetch = async () => {
      try {
        if (!data) {
          const response = await fetch(
            "https://api.datos.gob.mx/v1/condiciones-atmosfericas"
          );
          const json = await response.json();
          setData(json);
          setLoading(false);
        }
      } catch (err) {
        setErrorData(err);
      }
    };
    doFetch();
  }, [data]);

  return {
    data,
    loading,
    errorData,
  };
};

export default useFetch;
