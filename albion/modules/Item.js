
//adds new items to database getting the data from req.body
exports.Create = ()=>{
    return (req,res,next)=>{
        body = req.body;
        connection.query(SQL.create(body), function (err) {
            if (err){
                console.log(err);
                res.status(500);
            } 
            else res.status(200);
        });
    }    
};

//gets new items from database sorted by price
exports.Get = ()=>{
    return (req,res,next)=>{
        sortingField = req.body.sortingField;
        connection.query(SQL.get(sortingField), function (err,results,fields) {
            if (err){
                console.log(err);
                res.status(500);
            }
            else res.status(200).json({results:results});
        });   
    }
}

//updates the price of items from database according to data from the body(single field "silver":<number>)
exports.Update = ()=>{
    return (req,res,next)=>{
        price = req.body.price;
        connection.query(SQL.update(price), function (err) {
            if (err){
                console.log(err);
                res.status(500);
            } 
            else res.status(200);
        });
        
    }
}

//deletes the item from the store
exports.Delete = ()=>{
    return (req,res,next)=>{
        id = req.body.id;
        connection.query(SQL.delete(id), function (err) {
            if (err){
                console.log(err);
                res.status(500);
            } 
            else res.status(200);
        });
    }
}
