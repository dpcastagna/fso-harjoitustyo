const axiosConfig = {
  headers: { Authorization: `Bearer ${JSON.parse(localStorage.loggedInUser).token}` },
}

export default axiosConfig