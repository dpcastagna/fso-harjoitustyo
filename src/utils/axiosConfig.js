const authorization = localStorage.loggedInUser !== undefined
                      ? { Authorization: `Bearer ${JSON.parse(localStorage.loggedInUser).token}` }
                      : {}

const axiosConfig = {
  headers: authorization,
}

export default axiosConfig