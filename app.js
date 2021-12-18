const express=require('express');
const axios = require('axios');

const getData = async() => {
  try {
      const response = await axios.get('https://s3.amazonaws.com/open-to-cors/assignment.json')
      return response;
    } catch (error) {
      console.error(error);
  }
}


const app=express();


app.use(express.static("public"));
app.set("view engine","ejs");  
app.get('/',async function(req,res){
  let data = await getData(); 
  let products = data.data.products;
  products=Object.values(products);
  let productsByPopularity = products.map(e=>{
      return e
    }).sort((a,b)=> b.popularity - a.popularity);
  
  res.render('index.ejs',{data:productsByPopularity});
});
app.listen(3000,function(){
    console.log("Server Started");
})