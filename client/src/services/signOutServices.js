import axios from "axios";

export default {
  signOut(userName) {
    return axios
      .post("/api/signOut", { userName })
      .then(res => res)
      .catch(err => {
        console.log(err);
      });
  }
};
