import axios from "axios"

// export default axios.create({
//     baseURL:"http://localhost:5000"
// })

//Prod heroku
export default axios.create({
    baseURL:"https://my-play-app-ajm.herokuapp.com"
})