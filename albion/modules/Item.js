var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
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

        var sql1 = `Select c.id from city c where c.cname = ` + connection.escape(city);


        connection.query(sql1, (err, results, fields) => {
            if (err) {
                console.log(err);
            } else {
                city = results[0].id;
                var sql2 = `insert into item(classification, tier, name, price) values(` + connection.escape(type)+ `,`  + connection.escape(tier)+ `,`  + connection.escape(name)+ `,`  + connection.escape(price) + `);`;


                connection.query(sql2, function (err, results, fields) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        id = results.insertId;

                        var sql3 = `insert into market(itemId, cityId) values(` +  connection.escape(id) + `,` + connection.escape(city) + `);`;

                        connection.query(sql3, function (err, results, fields) {
                            if (err) {
                                console.log(err);
                            }
                            else{
                                res.status(201).json({id}).end();
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

        var sql = `select i.classification, i.tier, i.name, i.price, c.cname
            from market m
            left join item i On m.itemId = i.Id
            left join city c on m.cityId = c.id
            order by ` + connection.escape(sortingField); + `;`;

        connection.query(sql, function (err, results, fields) {
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

        var sql = `update item set item.price=` + connection.escape(price) +
        `where item.id=` + connection.escape(id); + `;`;

        connection.query(sql, function (err) {
            if (err) {
                console.log(err);
                res.status(500);
            }
            else {
              res.status(200);
              //res.json({okay: "yes"});
              res.end();
            }
        });
    }
}

//deletes the item from the database
exports.Delete = () => {
    return (req, res, next) => {
        id = req.body.id;

        var sql = `delete from market
        where itemId =  ` + connection.escape(id); + `;`;

        connection.query(sql, function (err,results,fields) {
            if (err) {
                console.log(err);
                res.status(500);
            }
            else res.status(200).json({deleted : true,id : id});
        });
    }
}
