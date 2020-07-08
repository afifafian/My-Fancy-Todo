"use strict"

const axios = require('axios')
   
function getQRCode(todo) {
    return axios({
        method:'get',
        url:`https://pierre2106j-qrcode.p.rapidapi.com/api`,
        headers:{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"pierre2106j-qrcode.p.rapidapi.com",
            "x-rapidapi-key":"9c565b3498msh179a440520c08d6p10ff1ejsn545952ea07b0",
            "useQueryString":true
        },
        params:{
            backcolor:"ffffff",
            pixel:"1 to 10",
            ecl:"L %7C M%7C Q %7C H",
            forecolor:"000000",
            type:"text %7C url %7C tel %7C sms %7C email",
            text:todo
        }
    })
    .then(function(response){
        return response.data
    })
}

module.exports = getQRCode