const dotenv = require('dotenv')
dotenv.config()
// decleartions
const express = require('express');
const app = express();
const db =require('./Config/Mongoose')
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./Schemas/User');
const cors = require("cors")
const jwt = require("jsonwebtoken")
db() 



// exp


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALL_BACK_URL
  },  async (accessToken, refreshToken, profile, done) => {
    const email = profile.emails && profile.emails[0].value;
    console.log(email)
    if (!email) {
      return done(new Error('No email found in the Google profile'), null);
    }
  
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email, name: profile.displayName });
    }
  
    console.log("profile is", profile);
    const jwtToken = jwt.sign({ id: user._id }, 'YOUR_JWT_SECRET', { expiresIn: '1h' });
    return done(null, { token: jwtToken });
  }));
  

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  
  
  
  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

  app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      res.send("oops")
      // res.redirect(`http://localhost:5000/dashboard?token=${req.user.token}`);
    }
  );

// exp end


// // middlewares
app.use(express.json())
app.use(cors())
// app.use(express.static('public'))
// app.use('/user', require('./Routes/UserRoutes')) 



app.listen(process.env.PORT,()=>{console.log(`SERVER at port`,process.env.PORT)})

