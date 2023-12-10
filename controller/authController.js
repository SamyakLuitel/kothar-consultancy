const jwt= require('jsonwebtoken')
const ACCESS_TOKEN_SECRET = "secret";

exports.login=(req, res, next) => {
    //Authenticate user
    console.log("performing login....");
    const username = req.body.username;
    const password = req.body.password;
    if (username != "admin") {
      res.send("invalid username");
    }
  
    if (password != "password") {
      res.status(401).send("invalid password");
    }
    const user = { name: username };
    const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET);
  
    // add exp time and REFERESH_TOKEN  later
    /*
     * @todo :add exp time and auth functionality
     */
  
    res.json({ accessToken: accessToken });
  };