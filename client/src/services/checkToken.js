import axios from "axios";

export default {
  checkAuth(token) {
    return axios
      .post("/api/me", { token })
      .then(res => res)
      .catch(err => {
        console.log(err);
      });
  }
};
