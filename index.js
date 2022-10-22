const express = require('express');
// const path = reqquire('path')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// if(process.env.NODE_ENV !="production"){
//     require('dotenv').config({path:'server/config/config.env'}); 
// }


// import routes 


const PORT = 3000;

app.get('/', (req, res) => {
    res.send("Kothar institute ....")
})




serviceData = {
    "serviceMotto": "Provide awesome customer service with our experienced teachers",
    "services": [
        {
            "serviceName": "library service",
            "descripttion": "For especial members only, we are providing a huge range of standardized tests preparation materials. This facilities are given from our modernize library. In addition to this the college/ university section ",
            "image": "http://kothareducationalservices.com/assets/library.png"
        },
        {
            "serviceName": "library service",
            "descripttion": "For especial members only, we are providing a huge range of standardized tests preparation materials. This facilities are given from our modernize library. In addition to this the college/ university section ",
            "image": "http://kothareducationalservices.com/assets/library.png"
        },
        {
            "serviceName": "library service",
            "descripttion": "For especial members only, we are providing a huge range of standardized tests preparation materials. This facilities are given from our modernize library. In addition to this the college/ university section ",
            "image": "http://kothareducationalservices.com/assets/library.png"
        }
    ],
    "success": true
}

app.get('/kothar/services', (req, res) => {
    res.send(serviceData).json();
})
//listening 
app.listen(3000, ()=>{
    console.log("Kothar backend running ...")
});