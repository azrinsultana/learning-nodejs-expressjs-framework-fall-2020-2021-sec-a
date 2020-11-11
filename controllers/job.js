const express 	= require('express');
const mysql 	= require('mysql');
const jobModel = require.main.require('./models/jobModel');
const userModel = require.main.require('./models/userModel');
const router 	= express.Router();


router.get('*',  (req, res, next)=>{
	if(req.cookies['uname'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', (req, res)=>{
	res.render('job/jobPortal', {name: 'alamin', id:'123'});
});


router.get('/jobCreate', (req, res)=>{
	res.render('job/jobCreate');
});

router.post('/jobCreate', (req, res)=>{
	var job={
		
		companyname:req.body.cname,
		title:req.body.title,
		location:req.body.location,
		salary:req.body.salary
		};
	console.log(job);

	jobModel.insert(job, function(status){
		
		if(status){
			
			res.redirect('/job/allJobList');
		}else{
			res.redirect('/login');
		}
	});

});

router.get('/allJobList', (req, res)=>{

	jobModel.getAll(function(results){
		res.render('job/allJobList', {job: results});
	});

})



router.get('/edit/:id', (req, res)=>{

	var id=req.params.id;

jobModel.getById(id, function(results){
	
	console.log("result");
	console.log(results);
		if(results.length>0){
			

			res.render('job/edit',{job:results});
			
		
		}
	
		else{
			res.redirect('/login');
		}
		
	});


});

router.post('/edit/:id', (req, res)=>{
	var job={
		id:req.params.id,
		
		companyname:req.body.companyname,
		title:req.body.title,
		location:req.body.location,
		salary:req.body.salary
		
	

	};
	console.log(job);
	jobModel.update(job, function(status){
		if(status){
			console.log("done");
			res.redirect('/job/allJobList');
		}else{
			res.render('job/edit');
		}
	});
	
});


router.get('/delete/:id', (req, res)=>{
	var id=req.params.id;
jobModel.getById(id, function(results){
		if(results.length>0){
			console.log("delete user history");
			console.log(results);
			
			res.render('job/delete',{job:results});
			
		}else{
			res.redirect('/jobPortal');
		}
	});


});

router.post('/delete/:id', (req, res)=>{
	var id=req.params.id;
	jobModel.delete(id, function(status){
		
		if(status){
			console.log("done");
			res.redirect('job/userlist');
		}else{
			
			res.redirect('/jobPortal');
		}
	});

	//res.redirect('/home/userlist');
});
module.exports = router;