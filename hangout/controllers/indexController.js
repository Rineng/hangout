var async = require('async');
var passport = require('passport');
var LocalStrategy = require("passport-local").Strategy;
var User = require('../models/user');
const bcrypt = require('bcrypt');

exports.get_login = function(req, res) {   
        res.render('forms/login', { title: 'Login Page'});
};

exports.get_logout = function(req, res){
  if(req.session.user_id != null){
    console.log("logged in");
    req.session.user_id = null;
    res.redirect('/hangout/login');
  }
  else{
    console.log("logged out");
    res.redirect('/hangout/login');
  }
};

exports.get_user_create = function(req, res){
    res.render('registeration', {title: 'Create User'});
};


passport.serializeUser(function(user, done) {
  done(null, user._id);
});
 
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

var createHash = function(password){
 return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

var isValidPassword = function(user, password){
  return bcrypt.compareSync(password, user.password);
}

//defining passport strategy for logging in
passport.use('login', new LocalStrategy({
    passReqToCallback: true
  },
  function(req, username, password, done) { 
    // check in mongo if a user with username exists or not
    User.findOne({ 'email': username}, 
      function(err, user) {
        // In case of any error, return using the done method
        if (err){
          return done(err);
        }
        // Username does not exist, log error & redirect back
        if (!user){
          console.log('User Not Found with username '+username);
          return done(null, false, 
                req.flash('message', 'User Not found.'));                 
        }
        // User exists but wrong password, log the error 
        if (!isValidPassword(user, password)){
          console.log('Invalid Password');
          return done(null, false, 
              req.flash('message', 'Invalid Password'));
        }
        // User and password both match, return user from 
        // done method which will be treated like success
        req.session.userName = user.username;
        console.log(req.session.user_id != null);
        return done(null, user);
      }
    );
}));



//defining passport strategy for signing up
passport.use('signup', new LocalStrategy({
    passReqToCallback: true
  },
  function(req, username, password, done) {
    findOrCreateUser = function(){
      // find a user in Mongo with provided username
      User.findOne({'username':username},function(err, user) {
        console.log("hello");
        // In case of any error return
        if (err){
          console.log('Error in SignUp: '+err);
          return done(err);
        }
        // already exists
        if (user) {
          console.log('User already exists');
          return done(null, false, 
             req.flash('message','User Already Exists'));
        } else {
          // if there is no user with that email
          // create the user
          var newUser = new User();
          // set the user's local credentials
          newUser.username = username;
          newUser.password = createHash(password);
          newUser.email = req.body.email;
          // save the user
          newUser.save(function(err) {
            if (err){
              console.log('Error in Saving user: '+err);  
              throw err;  
            }
            console.log('User Registration succesful');    
            return done(null, newUser);
          });
        }
      });
    };
    // Delay the execution of findOrCreateUser and execute 
    // the method in the next tick of the event loop
    process.nextTick(findOrCreateUser);
  })
);






