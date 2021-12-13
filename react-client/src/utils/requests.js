import axios from 'axios'

axios.interceptors.request.use(function(req) {
  req.headers.authorization = localStorage.getItem('jwtLoginToken')
  return req
}, function(error) {
  console.error(error.message)
  return Promise.reject(error)
})

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    switch (error.response.status) {
      case 401:
        window.location.href = '/login'
        break
      default:
        return Promise.reject(error.response)
    }
  }
)