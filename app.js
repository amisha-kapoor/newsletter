const express = require("express")
const request = require("request")
const bodyParser = require("body-parser")
const https= require("https")
const { post } = require("request")

const app = express()
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
})

app.post("/",function(req,res){
    const firstname=req.body.fname
    const secondname=req.body.lname
    const email=req.body.email
    const data={
      members:[
        {
            email_address: email,
            status:"subscribed",
            merge_fields:{
                FNAME: firstname,
                LNAME: secondname
            }

        }
      ]
    };

    const jsondata=JSON.stringify(data);
    const url="https://us21.api.mailchimp.com/3.0/lists/f067765f63";
    const options={
        method: "POST",
        auth:"amy:4c14b9e9d5601d8287a8a7c58e96c4cf-us21"
    }

   const request=  https.request(url, options, function(response){

    if(response.statusCode===200){
        res.sendFile(__dirname+"/success.html")
    }
    else{
        res.sendFile(__dirname+"/failure.html")
    }
     response.on("data",function(data){
        console.log(JSON.parse(data))
     })
    })
    request.write(jsondata)
    request.end()
})

app.post("/failure",function(req,res){
res.redirect("/")
})

app.listen(process.env.PORT || 3000, function(){
    console.log("server running on port 3000")
})

// api Key
// d24379236e976aef32781cffe9b805c6-us21
// f067765f63
