const db = require('./db');

module.exports= {
	validate: function(employee, callback){
		var sql = "select * from employee where username='"+employee.username+"' and password='"+employee.password+"'";
		
		db.getResults(sql, function(results){
			if(results.length >0 ){
				
			
				 var result=results[0].role;
			
				callback(results);
			}else{
				callback(false);
			}
		});
	},
	getById: function(id, callback){
		
var sql="select * from job where id='"+id+"'";
db.getResults(sql, function(results){
	if(results.length >0 ){
		
		callback(results);
		
	}else{
		console.log("not found");
	}
});

	},
	getAll: function(callback){
		
		var sql = "select * from job";
		db.getResults(sql, function(results){
			callback(results);
			
		});
	},
	insert: function(job, callback){
		console.log("hei");
		var sql = "INSERT INTO job (companyname,title,location,salary) VALUES ('"+job.companyname+"', '"+job.title+"','"+job.location+"','"+job.salary+"')";
		
		db.execute(sql, function(status){
			callback(status);
		});
	},
	update:function(job, callback){
var sql="UPDATE job SET companyname='"+job.companyname+"',title='"+job.title+"',location='"+job.location+"',salary='"+job.salary+"' WHERE id='"+job.id+"' ";
console.log(sql);
db.execute(sql, function(status){
	callback(status);
});
	},
	delete: function(id, callback){
var sql="DELETE FROM job WHERE id='"+id+"'";	
console.log(sql);
		db.execute(sql, function(status){
			callback(status);
		});
	}
}