
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

//parses the data from the front end
function parsebody(body){
    
}