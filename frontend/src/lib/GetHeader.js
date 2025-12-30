export const getAuthHeader = () => {
  const token = localStorage.getItem("todotoken");

  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
};
