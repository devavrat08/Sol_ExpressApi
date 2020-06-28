let express=require("express");
const { json } = require("body-parser");
const { Router } = require("express"); 
let joi=require("@hapi/joi");
let app=express();
app.use(express.json());
let port=process.env.port || 4800

 app.listen(port,()=>console.log(`Port working on ${port}`));


let songs=[
    {id:1,
    name:"closer"
    },
    {
        id:2,
        name:"temperature"
    },
    {
        id:3,
        name:"dheeme dheeme"
    }
];

//get all songs
app.get("/songs",(req,res)=>
{
    res.send(songs);
})

//get song by id
app.get("/songs/:id",(req,res)=>
{
    let song=songs.find((item)=>item.id===parseInt(req.params.id))
    if(!song)
    {
        return res.status(404).send({message:"Invalid song id"})
    };
    res.send(song);
})

//create song

app.post("/createsong",(req,res)=>
{
    let schema=joi.object({
        name:joi.string().min(3).max(10).required()
    })
    let result=schema.validate(req.body);
    if(result.error)
    {
        return res.status(400).send(result.error.details[0].message)
    }

    console.log(result);
    let data={
        id:songs.length+1,
        name:req.body.name,

    }
    songs.push(data);
    res.send(songs);

    
});

//update song
app.put("/updatesong/:id",(req,res)=>{
//step1
let song=songs.find((item)=>item.id===parseInt(req.params.id))
if(!song)
{
    return res.status(404).send({message:"Invalid song id"})
};

//step2
let schema=joi.object({
    name:joi.string().min(3).max(10).required()
})
let result=schema.validate(req.body);
if(result.error)
{
    return res.status(400).send(result.error.details[0].message)
}

//step3
song.name=req.body.name;
res.send(song);


});


//delete song

app.delete("/deletesong/:id",(req,res)=>
{

//step1
let song=songs.find((item)=>item.id===parseInt(req.params.id))
if(!song)
{
    return res.status(404).send({message:"Invalid song id"})
};

let index=songs.indexOf(song);
let data=songs.splice(index,1);
res.send(songs);



})
