import axios from "axios";
import { useState } from "react";

const useFetch = () => {
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getData = async (url) => {
    try {
      setLoading(true);
      setError(null);
      setResponse(null);

      const res = await axios.get(url);
      setResponse(res.data.data);
    } catch (err) {
      setError(err.message || "Error al obtener los datos");
    } finally {
      setLoading(false);
    }
  };

  return [response, getData, loading, error];
};

export default useFetch;
