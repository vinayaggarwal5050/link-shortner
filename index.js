const express = require("express");
const path = require("path");

//middleware dependencies
const cookieParser = require("cookie-parser");
const { restrictToLoggedInUsersOnly, checkAuth } = require("./middleware/auth")

//database dependencies
const connectToMongoDB = require("./dbConnection");
const UrlDBRef = require("./models/urlModel");

//route dependencies
const urlRoute = require("./routes/urlRoute");
const analyticsRoute = require("./routes/analyticsRoute");
const staticRoute = require("./routes/staticRoute");
const userRoute = require("./routes/userRoute");

//connect to database
connectToMongoDB("mongodb://localhost:27017/link-shortner")
  .then(() => console.log("connected to mongoDB"))
  .catch((err) => console.log("error occured while connected to mongoDB ", err));



const app = express();
const PORT = 3000;

//server side rendering
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

 

//middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended: false })); // -> this supposts form submit method "post"
app.use(express.json()); //-> fetch api method : Post

//routes
app.get('/demo', async (req, res) => {

 const allUrls = await UrlDBRef.find({});

 const htmlData = `
 <html>
  <head></head>
  <body>
    <ul>
      ${allUrls.map(url => `<li> ${url.shortId} ${url.redirectUrl} </li>`).join("")}
    </ul>
 </body>
 </html>
 `;

//  res.json(allUrls);

 res.send(htmlData);

})

app.use('/', checkAuth, staticRoute);
app.use('/urls', restrictToLoggedInUsersOnly, urlRoute);
app.use('/analytics', analyticsRoute);
app.use('/users', userRoute);



//start http server
app.listen(PORT, () => {
  console.log(`server started at ${PORT} ...`);
})