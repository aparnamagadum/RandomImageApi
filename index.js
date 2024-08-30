import express from "express";
import data from './RestApi.json' assert {type:'json'};
import fs from "fs";
const app = express();
const PORT = 2525;
const dummyData = data;

app.use(express.urlencoded({extended : false}));
app.use(express.json())

app.get("/", (req, res)=>{
    res.json("Hello this is a Dummy Rest Api Page :If you want to see rendome images so type {/user/img} and if you want to see whole api so type {/api/user} and if you wn to see individual items so type {/api/user/:idNumber}")
});
app.get("/user/img", (req, res)=>{

    const images = `
    <ol> 
        ${dummyData.map((item) =>`<li><img src=${item.imgUrls[0]} style="height:300px; width:400px;"></img></li>`).join("")}
    </ol>
    `;
    res.send(images)
});

app.get("/api/user", (req, res)=>{
    res.send(dummyData)
});

app.get("/api/user/:id", (req, res)=>{
    const id = req.params.id;
    const user = dummyData.find((item)=> item.id == id);
    console.log(`this is our id${id}, and this is our users id ${user}`);
    
   return res.send(user)
});


app.post("/api/user", (req, res)=>{
    const data = req.body;
    dummyData.push({id: dummyData.length + 1, ...data})
    fs.writeFile("./RestApi.json/", JSON.stringify(dummyData), (err)=>{
        if(err){
            console.log(err);
            
        } else {
            console.log("Data added");
            
        }
    });
    console.log("Our received body is", data);
    res.send(data);
});
app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
});
