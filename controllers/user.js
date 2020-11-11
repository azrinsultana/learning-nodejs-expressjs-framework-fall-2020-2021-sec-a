const e = require('express');
const express 	= require('express');
const mysql 	= require('mysql');
const userModel		= require.main.require('./models/userModel');
const router 	= express.Router();

router.get('*',  (req, res, next)=>{
	if(req.cookies['uname'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/create', (req, res)=>{
	res.render('user/create');
});


router.post('/create', (req, res)=>{
	
	var employees={
		
		employeename:req.body.ename,
		companyname:req.body.cname,
		contactno:req.body.contactno,
		username:req.body.username,
		password:req.body.password
		



	};
	console.log(employees);

	userModel.insert(employees, function(status){
		
		if(status){
			
			res.redirect('/home/userlist');
		}else{
			res.redirect('/login');
		}
	});

});


		
	

router.get('/edit/:username', (req, res)=>{

	var username=req.params.username;

userModel.getById(username, function(results){
	
	console.log("result");
	console.log(results);
		if(results.length>0){
			

			res.render('user/edit',{employee:results});
			
		
		}
	
		else{
			res.redirect('/login');
		}
		
	});


});

router.post('/edit/:username', (req, res)=>{
	var employee={
		username:req.params.username,
		
		password:req.body.password,
		employeename:req.body.employeename,
		companyname:req.body.companyname,
		contactno:req.body.contactno
		
	

	};
	console.log(employee);
	userModel.update(employee, function(status){
		if(status){
			console.log("done");
			res.redirect('/home/userlist');
		}else{
			res.render('user/edit');
		}
	});
	
});

router.get('/delete/:username', (req, res)=>{
	var username=req.params.username;
userModel.getById(username, function(results){
		if(results.length>0){
			console.log("delete user histore");
			console.log(results);
			
			res.render('user/delete',{employee:results});
			
		}else{
			res.redirect('/home');
		}
	});


});

router.post('/delete/:username', (req, res)=>{
	var username=req.params.username;
	userModel.delete(username, function(status){
		
		if(status){
			console.log("done");
			res.redirect('/home/userlist');
		}else{
			
			res.redirect('/home');
		}
	});

	//res.redirect('/home/userlist');
});

module.exports = router;

