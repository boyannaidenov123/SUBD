var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'dani',
    password: 'root',
});

connection.connect((err) => {
    if (err) {
        throw err
    } else {
        console.log('database connected...');
    }
});

connection.query(`USE albion`);
//adds new items to database getting the data from req.body
exports.Create = () => {
    return (req, res, next) => {
        ({ type, tier, name, city, price } = req.body);
        var id;
        connection.query(`Select c.id from city c where c.cname = '${city}'`, (err, results, fields) => {
            if (err) {
                console.log(err);
            } else {
                city = results[0].id;
                connection.query(`insert into item(classification, tier, name, price) values('${type}', ${tier}, '${name}', ${price});`, function (err, results, fields) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        id = results.insertId;
                        connection.query(`insert into market(itemId, cityId) values(${id}, '${city}');`, function (err, results, fields) {
                            if (err) {
                                console.log(err);
                            }
                            else{
                                res.status(200).json({id}).end();
                            }
                        });
                    }
                });
            }
        });

    }
};

//gets new items from database sorted by field of choice
//tier || price || name || classification
exports.Get = () => {
    return (req, res, next) => {
        sortingField = req.body.sortingField;
        connection.query(`select i.classification, i.tier, i.name, i.price, c.cname
            from market m
            left join item i On m.itemId = i.Id
            left join city c on m.cityId = c.id
            order by ${sortingField};`, function (err, results, fields) {
            if (err) {
                console.log(err);
                res.status(500);
            }
            else res.status(200).json({results});
        });
    }
}

//updates the price of items from database according to data from the body("price":<number>,"id":<number>)
exports.Update = () => {
    return (req, res, next) => {
        ({ id, price } = req.body);
        connection.query(`update item set item.price=${price} 
        where item.id=${id};`, function (err) {
            if (err) {
                console.log(err);
                res.status(500);
            }
            else res.status(200);
        });

    }
}

//deletes the item from the database
exports.Delete = () => {
    return (req, res, next) => {
        id = req.body.id;
        connection.query(`delete from market 
        where itemId = ${id};`, function (err,results,fields) {
            if (err) {
                console.log(err);
                res.status(500);
            }
            else res.status(200).json({deleted : true,id : id});
        });
    }
}
