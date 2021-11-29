import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { useKeycloak } from "@react-keycloak/web";

interface OwnProps {
  config: AxiosRequestConfig;
  skip?: boolean;
}

const useApi = <T,>({ config, skip = false }: OwnProps) => {
  const { keycloak } = useKeycloak();
  const [result, setResult] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [refreshIndex, setRefreshIndex] = useState(0);

  const refresh = () => {
    setRefreshIndex(refreshIndex + 1);
  };

  useEffect(() => {
    let cancelled = false;
    if (skip) {
      setLoading(false);
    } else {
      setLoading(true);
      axios({
        ...config,
        method: config.method ? config.method : "GET",
        headers: {
          ...config.headers,
          Authorization: config.headers?.Authorization
            ? config.headers?.Authorization
            : `Bearer ${keycloak.token}`,
        },
      })
        .then((r) => {
          if (!cancelled) {
            setResult(r.data);
            setLoading(false);
          }
        })
        .catch((error) => {
          setLoading(false);
          if (error.response) {
            setError(error.response.data);
          } else {
            setError(error.message);
          }
        });
    }
    return () => {
      cancelled = true;
    };
  }, [config.url, refreshIndex]);

  return { result, loading, error, refresh };
};

export default useApi;
