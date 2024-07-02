const axiosConfig = () => {
  const authorization = localStorage.loggedInUser !== undefined
                      ? { Authorization: `Bearer ${JSON.parse(localStorage.loggedInUser).token}` }
                      : {}
  return {
    headers: authorization,
  }
} 

export default axiosConfig