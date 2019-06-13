var mysql = require('mysql');

configSQL = `drop database if exists albion;
create database albion;
use albion;
create table item (id integer not null auto_increment primary key,classification varchar(60),tier integer not null,name varchar(60) not null,price integer not null);
create table city (id integer not null auto_increment primary key,cname varchar(60) not null);
create table market (itemId integer not null,cityId integer not null,foreign key (itemId) references item(id),foreign key (cityId) references city(id));
insert into city(cname) values ("Bridgewatch");
insert into city(cname) values ("Carleon");
insert into city(cname) values ("Martlock");
insert into city(cname) values ("Thetford");
insert into city(cname) values ("Lymhurst");`;

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'dani',
	password: 'root',
});

connection.connect((err) => {
	if (err) {
		throw err
	} else {
		console.log('mysql server connected...');
		var err;
		configSQL.split('\n').forEach(query => {
			connection.query(query, function (err) {
				if (err) {
					console.log(err);
				}
			});
		});
		if (!err) {
			console.log('database configured!');
		}
		connection.end();
	}
});


