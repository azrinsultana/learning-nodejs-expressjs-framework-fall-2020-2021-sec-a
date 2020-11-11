const express 		= require('express');
const mysql 	= require('mysql');
const userModel		= require.main.require('./models/userModel');
const router 		= express.Router();



router.get('/', (req, res)=>{
	
	res.render('login/index');
});

router.post('/', (req, res)=>{

	var employee = {

		username: req.body.username,
		password: req.body.password
	};

		

	userModel.validate(employee, function(results){
		if((results[0].username=="admin")&& (results[0].role==1)){
			console.log(results[0].username);
			
			
			res.cookie('uname', req.body.username);
			res.redirect('/home');
		}else if ((results[0].username==req.body.username)&& (results[0].password==req.body.password) && (results[0].role==0)) {
			console.log(results[0].username);
			console.log(results[0].role);
			
			console.log(results[0].password);
			res.cookie('uname', req.body.username);
			res.redirect('/home');
			
		}
		else{
			res.redirect('/login');
		}
	});
	
}); 








module.exports = router;