const db = require('./db');

module.exports= {
	validate: function(employee, callback){
		var sql = "select * from employee where username='"+employee.username+"' and password='"+employee.password+"'";
		
		db.getResults(sql, function(results){
			if(results.length >0 ){
				console.log(results);
			
				 var result=results[0].role;
				 console.log(result);
				callback(results);
			}else{
				callback(false);
			}
		});
	},
	getById: function(username, callback){
		
var sql="select * from employee where username='"+username+"'";
db.getResults(sql, function(results){
	if(results.length >0 ){
		console.log(results);
		callback(results);
		
	}else{
		console.log("not found");
	}
});

	},
	getAll: function(callback){
		console.log("data");
		var sql = "select * from employee";
		db.getResults(sql, function(results){
			callback(results);
			
		});
	},
	insert: function(employees, callback){
		console.log("hei");
		var sql = "INSERT INTO employee (username,password,employeename,companyname,contactno) VALUES ('"+employees.username+"', '"+employees.password+"','"+employees.employeename+"','"+employees.companyname+"','"+employees.contactno+"')";
		console.log(sql);
		db.execute(sql, function(status){
			callback(status);
		});
	},
	update:function(employee, callback){
var sql="UPDATE employee SET username='"+employee.username+"',password='"+employee.password+"',employeename='"+employee.employeename+"',companyname='"+employee.companyname+"',contactno='"+employee.contactno+"' WHERE username='"+employee.username+"' ";
console.log(sql);
db.execute(sql, function(status){
	callback(status);
});
	},
	delete: function(username, callback){
var sql="DELETE FROM employee WHERE username='"+username+"'";	
console.log(sql);
		db.execute(sql, function(status){
			callback(status);
		});
	}
}