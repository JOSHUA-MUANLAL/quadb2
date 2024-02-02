const express=require('express');
const path=require('path');
const app=express();
const db=require('./model/db');
const request=require('request');

const viewsPath = path.join(__dirname, 'views'); // Append 'views' to the path

app.set('view engine', 'ejs');
app.set('views', viewsPath);



const bodyParser = require('body-parser');



app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res)=>{
    try{
       
        request.get("https://api.wazirx.com/api/v2/tickers",(error,response,body)=>{
            if(response.statusCode===200){


        const responseData = JSON.parse(body);
        const tickersArray = Object.values(responseData);

        // Take the first 10 elements
        const tickers = tickersArray.slice(0, 10);

        for(let x=0;x<tickers.length;x++){

        db.query("select * from record where name=?",[tickers[x].name],(err,result)=>{
        if(err){
            console.log("line 31",err);
        }else{
            if(result.length===0){
                db.query("insert into record(name,last,buy,sell,volume,base_unit) values(?,?,?,?,?,?)",[tickers[x].name,tickers[x].last,tickers[x].buy,tickers[x].sell,tickers[x].volume,tickers[x].base_unit],(err,result)=>{
                    if(err){
                        console.log(err)
                    }else{
                        console.log("success",x);
                        
                    }
                })
            }else{
                db.query("update record set last=? ,buy=?,sell=?,volume=?,base_unit=? where name=?",[tickers[x].last,tickers[x].buy,tickers[x].sell,tickers[x].volume,tickers[x].base_unit,tickers[x].name],(err,result)=>{
                    if(err){
                        console.log(err);
                    }else{
                        console.log("success",x);
                        
                    }
                })
            }
        }
       })

        }
        res.render('home')
        
            }

        })

    }catch(error){
        console.log(error);
    }


})


app.get('/api',(req,res)=>{
    try{
        db.query('select * from record',(err,result)=>{
            if(err){
                console.log("error in api /n",err);
            }else{
                res.render('webpage',{result})
            }
        })
    }catch(err0r){
        console.log(error);
    }
   
})




app.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
})