const authorization = localStorage.loggedInUser !== undefined
                      ? { Authorization: `Bearer ${JSON.parse(localStorage.loggedInUser).token}` }
                      : {}
console.log(localStorage.loggedInUser)
localStorage.loggedInUser !== undefined
? console.log(`Bearer ${JSON.parse(localStorage.loggedInUser).token}`)
: null

const axiosConfig = {
  headers: authorization,
}

export default axiosConfig