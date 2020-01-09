import axios from "axios";

export default {
    add: category => {
        return axios
            .post("/api/AddCategory", {
                name: category.name,
            })
            .then(response => response)
            .catch(err => { throw err }
            );
    },
    getAllCategories: () => {
        console.log('service cat')
        return axios
            .get("/api/categories")
            .then(response => response)
            .catch(err => { throw err }
            );
    }
};
