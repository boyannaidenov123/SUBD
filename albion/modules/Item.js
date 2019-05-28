
//adds new items to database getting the data from req.body
exports.Create = ()=>{
    return (req,res,next)=>{
        res.json({'creatingItem':'true'});
    }    
};

//gets new items from database according to data from the body
exports.Get = ()=>{
    return (req,res,next)=>{
        res.json({'gettingItem':'true'});
    }
}
//&#x270e;





//updates the price of items from database according to data from the body(single field "silver":<number>)
exports.Update = ()=>{
    return (req,res,next)=>{
        res.json({'updatingItem':'true'});
    }
}

//deletes the item from the store
exports.Delete = ()=>{
    return (req,res,next)=>{
        res.json({'deletingItem':'true'});
    }
}

//parses the data from the front end
function parsebody(body){
    
}