import history from "utils/history";

const useQueryParams = () => {
  return new URLSearchParams(history.location.search);
};

export default useQueryParams;