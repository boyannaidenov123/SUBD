
//adds new items to database getting the data from req.body
exports.Create = ()=>{
    return (req,res,next)=>{
        //({type,tier,name,city,price,date} = body);
        res.json({'post':'true'});
    }    
};

//gets new items from database according to data from the body
exports.Get = ()=>{
    return (req,res,next)=>{
        //({type,tier,name,city,price,date} = body);
        res.json({'get':'true'});
    }
}
//&#x270e;

//updates the price of items from database according to data from the body(single field "silver":<number>)
exports.Update = ()=>{
    return (req,res,next)=>{
        //({type,tier,name,city,price,date} = body);
        res.json({'update':'true'});
    }
}

//deletes the item from the store
exports.Delete = ()=>{
    return (req,res,next)=>{
        //({type,tier,name,city,price,date} = body);
        res.json({'delete':'true'});
    }
}
