const express = require("express");
const cors = require("cors");
const app = express();

// Enable CORS for all origins
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to manisai application." }); 
});

require("../app/routes/tutorial.routes")(app); 

// set port, listen for requests 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { 
  console.log(`Server is running on port ${PORT}.`); 
}); 
