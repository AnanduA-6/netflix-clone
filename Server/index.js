const express=require("express")
require("dotenv").config();
const cors=require('cors')
require("./db_config/dbconnection")
const app=express();
const PORT=process.env.PORT||4040
const signupRoute=require("./routes/newUser")
const loginRoute=require("./routes/auth")

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api",signupRoute)
app.use("/api",loginRoute)

app.listen(PORT,console.log("server running"))