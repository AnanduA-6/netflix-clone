const express=require("express")
require("dotenv").config();
const cors=require('cors')
require("./db_config/dbconnection")
const app=express();
const PORT=process.env.PORT||4040
const signupRoute=require("./routes/newUser")
const loginRoute=require("./routes/auth")
const movieRoute=require('./routes/tmdbFetch')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api",signupRoute)
app.use("/api",loginRoute)
app.use("/api",movieRoute)


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
  });
  
app.listen(PORT,console.log("server running"))