const isAuthenticated = () => {
    const token = localStorage.getItem("token");
  
    if (!token) return false;
  
    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT token
      const isTokenExpired = payload.exp * 1000 < Date.now(); // Check expiration time
  
      return !isTokenExpired;
    } catch (error) {
      return false; // In case of error, consider token invalid
    }
  };
  
  export default isAuthenticated;
  