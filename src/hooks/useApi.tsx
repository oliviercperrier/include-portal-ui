import { useKeycloak } from "@react-keycloak/web";
import React from "react";

const useApi = () => {
  const { keycloak } = useKeycloak(); 
};

export default useApi;
