export const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return `Bearer ${token}`;
  };
  