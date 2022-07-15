const express = require('express')
const app = express()
const cookieParser = require("cookie-parser")
const sessions = require('express-session')
const PORT =process.env.PORT || 4000
app.use(sessions({
	secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
	saveUninitialized:true,
	cookie: { maxAge:1000 * 60 * 60 * 24},
	resave: false 
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
const myusername = 'user'
const mypassword = '123'
var session
app.get('/',(req,res) => {
	session=req.session
	if(session.userid) res.send("Welcome User <a href=\'/logout'>click to logout</a>")
	else res.sendFile(__dirname+'/index.html')
})
app.post('/user',(req,res) => {
	if(req.body.username == myusername && req.body.password == mypassword){
		session=req.session
		session.userid=req.body.username
		console.log(req.session)
		res.redirect('/')
	}
	else res.send('Invalid username or password')
})
app.get('/logout',(req,res) => {
	req.session.destroy()
	res.redirect('/')
})
app.listen(PORT, () => console.log(`Server Running at port ${PORT}`))
