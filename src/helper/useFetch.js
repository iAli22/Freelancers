import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [meta, setMeta] = useState(null);
  const [done, setDone] = useState(false);

  const getData = async (url) => {
    try {
      const data = await fetch(`${url}`).json();
      setData(data.data);
      setMeta(data.meta);
      setDone(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData(url);
  }, [url]);

  return {
    data,
    done,
    meta,
  };
}

export default useFetch;
