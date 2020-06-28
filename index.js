let express=require("express");
const { json } = require("body-parser");
const { Router } = require("express");
let joi=require("@hapi/joi");
let app=express();
app.use(express.json());
let port=process.env.port || 4800

// app.get("/",(req,res)=>
// {
//     res.send("hello user");
// }
// )

// app.get("/api",(req,res)=>
// {
//     res.send(JSON.stringify(["nodejs","reactjs"]));
// }
// )
 app.listen(port,()=>console.log(`Port working on ${port}`));

//parameters --single param

app.get("/users/:id",(req,res)=>
{
    res.send(req.params.id);
})

//parameters --multiple params

app.get("/users/:year/:month",(req,res)=>
{
    res.send(req.params);
})

let courses=[
    {id:1,
    name:"nodejs"
    },
    {
        id:2,
        name:"react js"
    },
    {
        id:3,
        name:"angular js"
    }
];

//get all courses
app.get("/courses",(req,res)=>
{
    res.send(courses);
})

//get course by id
app.get("/courses/:id",(req,res)=>
{
    let course=courses.find((item)=>item.id===parseInt(req.params.id))
    if(!course)
    {
        return res.status(404).send({message:"Invalid course id"})
    };
    res.send(course);
})

//create course

app.post("/createcourse",(req,res)=>
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
        id:courses.length+1,
        name:req.body.name,

    }
    courses.push(data);
    res.send(courses);

    
});

//update course
app.put("/updatecourse/:id",(req,res)=>{
//step1
let course=courses.find((item)=>item.id===parseInt(req.params.id))
if(!course)
{
    return res.status(404).send({message:"Invalid course id"})
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
course.name=req.body.name;
res.send(course);


});


//delete course

app.delete("/deletecourse/:id",(req,res)=>
{

//step1
let course=courses.find((item)=>item.id===parseInt(req.params.id))
if(!course)
{
    return res.status(404).send({message:"Invalid course id"})
};

let index=courses.indexOf(course);
let data=courses.splice(index,1);
res.send(courses);



})
