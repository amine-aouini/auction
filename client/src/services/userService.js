import axios from "axios";

export default {
  getAll: user =>  {
    return axios
    .post('/api/signup', { 
      name: user.name,
      email: user.email,
      password: user.password
    })
    .then(response =>  response)
    .catch(error => error);
  }
  
};
