const express = require('express')
const db = require('./db/dbService')
const validate = require('./db/validate')
const app = express()
const { pool } = require('./db/dbConfig')
const PORT = process.env.PORT || 5000
require('dotenv').config()
const bcrypt = require('bcrypt')
// const { connect } = require('http2')
const knexLib = require('knex')
const session = require('express-session');
const flash = require("express-flash");
const { reject } = require('async');
const passport = require('passport');
const { uuid } = require('./db/utils')
const LocalStrategy = require("passport-local").Strategy;
const InitalizePassport = initialize(passport);

// serve files out of the public directory
app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))

// const port = 7878

app.set('view engine', 'hbs')

app.use(express.static('img'));

app.use (session({
    // Key we want to keep secret which will encrypt all of our information
    secret: 'secret',
    // Should we resave our session variables if nothing has changes which we dont
    resave: false,
    // Save empty value if there is no vaue which we do not want to do
    saveUninitialized: false
    })
);

app.use(passport.initialize());

app.use(flash());

app.use(passport.session());

//================== USING passportConfig.js  =======================
function initialize(passport) {
    console.log("Initialized");
  
    const authenticateUser = (email, password, done) => {
      console.log(email, password);
      conn = db.getConn();
      conn.raw( 
        `SELECT * FROM reg_users WHERE email = ?`,
        [email])
        .then((results) => {
          // if (err) {
          //   return console.log(err);
          // }
          //console.log(results.rows);
  
          if (results.rows.length > 0) {
            const user = results.rows[0];
  
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) {
                return console.log(err);
              }
              else if (isMatch) {
                return done(null, user);
              } else {
                //password is incorrect
                return done(null, false, { message: "Password is incorrect" });
              }
            });
          }  
          else {
            // No user
            return done(null, false, {
              message: "No user with that email address"
            });
          }
        }
        )
        .catch(() => {
          res.status(500).send('unable to find registered user at this time')  
        })
    };

    passport.use(
        new LocalStrategy(
          { usernameField: "email", passwordField: "password" },
          authenticateUser
        )
      );
      // Stores user details inside session. serializeUser determines which data of the user
      // object should be stored in the session. The result of the serializeUser method is attached
      // to the session as req.session.passport.user = {}. Here for instance, it would be (as we provide
      //   the user id as the key) req.session.passport.user = {id: 'xyz'}
      passport.serializeUser((user, done) => done(null, user.id));
    
      // In deserializeUser that key is matched with the in memory array / database or any data resource.
      // The fetched object is attached to the request object as req.user
    
      passport.deserializeUser((id, done) => {
        conn = db.getConn();
        conn.raw(`SELECT * FROM reg_users WHERE id = ?`, [id])
        .then((results) => {
          // if (err) {
          //   return done(err);
          // }
          console.log(`ID is ${results.rows[0].id}`);
          return done(null, results.rows[0]);
        }
        )
        .catch(() => {
          res.status(500).send('unable to find registered user at this time')  
        })

      }
      
      );
    };

//===================  END OF USING passportConfig.js  ===================

 const dummyLists = [
     {
         uuid: 'asjkldhfskjafhl',
         name: 'Grocery List'
     },
     {
         uuid: 'dsailcdsavilanv',
         name: 'ToDo List'
     }
 ]

 const dummyItems = [
     {
        uuid: 'asjkldhfskjafhl',
        description: 'Wash the dog',
        display_order: 1
     },
     {
        uuid: 'dsailcdsavilanv',
        description: 'Wash the car',
        display_order: 2 
     }
 ]



// =============  set the template engine  =======================
//======getList=====
app.param('listUUID', function (req, res, nextFn, listUUID) {
  db.getList(listUUID)
    .then((theList) => {
      req.mr_listman = req.mr_listman || {}
      req.mr_listman.list = theList
      nextFn()
    })
    .catch(() => {
      res.status(404).send('list not found')
    })
})

// the hbs homepage shows your lists  ======== getLists

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/users/register", checkAuthenticated, (req,res) => {
    res.render("register.hbs");
});

app.get("/users/login", checkAuthenticated, (req, res) => {
    res.render("login");
})

app.get("/users/dashboard", checkNotAuthenticated, (req, res) => {
  console.log(req.isAuthenticated());
  res.render("dashboard", { user: req.user.name });
});

app.get("/users/logout", (req, res) => {
  req.logout();
  res.render("index", { message: "You have logged out successfully" });
});

app.post("/users/register", async (req, res) => {
    let { name, email, password, password2 } = req.body;
  
    let errors = [];
  
    console.log({  
      name,
      email,
      password,
      password2
    });
  
    if (!name || !email || !password || !password2) {
      errors.push({ message: "Please enter all fields" });
    }
  
    if (password.length < 6) {
      errors.push({ message: "Password must be a least 6 characters long" });
    }
  
    if (password !== password2) {
      errors.push({ message: "Passwords do not match" });
    }
  
    if (errors.length > 0) {
      res.render("register", { errors, name, email, password, password2 });
    } else {
      hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword)
      // Validation passed
      conn = db.getConn();
      conn.raw(
        `SELECT * FROM reg_users
          WHERE email = ?`,
        [email])

        .then ((err, results) => {
          if (err) {
            return console.log(err);
          }
          if (results.rows.length > 0) {
            return res.render("register", {
              message: "Email already registered"
            }); 
        } else {
              console.log(results.rows)
          }
        })
        .catch(() => {
            res.status(500).send('unable to register user')
        })
    
        conn.raw(
              `INSERT INTO reg_users (name, email, password)
                  VALUES (?, ?, ?)
                  RETURNING id, password`,
              [name, email, hashedPassword])

        .then ((results) => {
                req.flash("success_msg", "You are now registered. Please log in")
                res.redirect("/users/login")
             } 
            )
        .catch(() => {
            res.status(500).send('unable to register user at this time')  
          })
        }
    })  

app.post(
  "/users/login",
    passport.authenticate("local", {
      successRedirect: "/users/dashboard",
      failureRedirect: "/users/login",
      failureFlash: true
      })
    );
    
function checkAuthenticated(req, res, next) {
      if (req.isAuthenticated()) {
        return res.redirect("/users/dashboard");
      }
      next();
    }
    
function checkNotAuthenticated(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      res.redirect("/users/login");
    }
            
// the homepage shows your lists  ======== getLists
app.get('/landing', function (req, res) {
  db.getLists()
    .then((lists) => {
      res.render('landing', { lists: lists })
    })
    .catch(() => {
      // TODO: show an error page here
    })
})

// the list page shows the items in the list  =====
app.get('/list/:listUUID', function (req, res) {
  const theList = req.mr_listman.list
  res.render('list_page', {
    listUUID: theList.uuid,
    listName: theList.name,
    items: theList.items
  })
})

// app.get('/list/:UUID', function (req, res) {
//     res.render('list_page', { listname: 'Dummy List', items: dummyItems })
// })

// =============  add a new item to a list ========================
app.post('/list/:listUUID/new-item', function (req, res) {
  const theList = req.mr_listman.list
  const newDescription = req.body.description
  
  if (validate.validDescription(newDescription)) {
    // create the item
    db.createItem(theList.id, newDescription)
      .then(function (newItem) {
        res.render('item_created', {
          listUUID: theList.uuid,
          listName: theList.name,
          description: newItem.description
        })
      })
      .catch(() => {
        res.status(500).send('oh man, we totally messed up')
      })
  } else {
    // TODO: show them an error page
    res.status(400).send('bad input')
  }
})




// ==================================  END OF CHRIS'S DATA =======================


// app.get('/', function (req, res)    {
//     res.render('index', { title: 'Hey', message: 'Hello there!'})
//     // res.send('Hello World')
// })


// =========  adding a new list  ==================
// app.post('/list/:listUUID/new-list', function (req, res) {
//     const theList = req.mr_listman.list
//     const newListName = req.body.name
  
//     if (validate.validDescription(newDescription)) {
//       // create the item
//       db.createList(theList.id, newListName)
//         .then(function (newList) {
//           res.render('/', {
//             listUUID: theList.uuid,
//             listName: theList.name,
//             name: newList.name
//           })
//         })
//         .catch(() => {
//           res.status(500).send('oh man, we totally messed up')
//         })
//    } 
//     else {
//      // TODO: show them an error page
//      res.status(400).send('bad input')
//    }
// })


app.post("/landing", (req, res) => {
    let { name } = req.body;
    conn = db.getConn();
    conn.raw(
        `
  INSERT INTO list (uuid, name, ctime, mtime)
  VALUES (?, ?, current_timestamp, current_timestamp)
  RETURNING *
  `,[uuid(), name])

.then ((results) => {
    req.flash("success_msg", "New beat list successfully created")
    res.redirect("/landing")
     } 
    )
.catch(() => {
res.status(500).send('unable to create new beat list at this time')  
}
)
})






//===========================Connection to db =============================
const startExpressApp = () => {
  app.listen(PORT, () => {
    console.log('express is listening on port ' + PORT)
  })
}

const bootupSequenceFailed = (err) => {
  console.error('Unable to connect to the database:', err)
  console.error('Goodbye!')
  process.exit(1)
}



// // global kickoff point
db.connect()
  .then(startExpressApp)
  .catch(bootupSequenceFailed)