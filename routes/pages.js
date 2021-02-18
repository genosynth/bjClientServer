const express = require("express");


const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

const db = mysql.createConnection({
    host: process.env.HOST ,
    user: process.env.USER ,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

const router = express.Router();

router.get('/', (req, res) => {
    var token = req.cookies.jwt;
    if (!token) {
        return res.status(401).render('index', {
            message:"Please log in to play the game"
        })
    //res.render('main');

    }else {
        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
            if (err) 
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            
            //return res.status(200).send(decoded);
            console.log(decoded);  
            const id = decoded.id
            //const username = decoded.username
    
            db.query('SELECT * FROM users WHERE id = ?', [id], async (error, results) => {
            //console.log(results);
            
            
                
                const name = results[0].username;
    
                
                //res.status(200).redirect("/")
                res.status(200).render('main', {
                    //name: name,
                    message:"Logged in as " + name
                })
    
            
            
        
            
        })
    
        
    })
}
})

router.get('/register', (req, res) => {
    res.render('register');
})

router.post('/registeredUser', async(req, res) => {

    
        
    const { username, email, password, passwordConfirm } = req.body;
        
    if( !username || !email || !password ){
        return res.status(400).render('register', {
            message: "Please provide a user, email and password"
        })

    }else if ( password !== passwordConfirm){
            return res.render('register', {
                message: 'Passwords do not match'
            });
        }
    
        db.query('SELECT email FROM users WHERE email = ? OR  username = ?', [email,username], async (error, results) => {
            if(error){
                console.log(error);
    
            }
            if (results.length > 0) {
                return res.render('register', {
                    message: 'This email or username is already in use, please use a different username or different email address. '
                })
            }
        })
    
    let hashedPassword = await bcrypt.hash(password, 8);

    db.query('INSERT INTO users SET ?',{username: username, email: email, password: hashedPassword }, (error,results) => {
          if (results) {
            return res.status(200).render('index', {
                message1: "User has been registered, you can now log in."
            })
          }

        
          else{
            res.json({
                status:false,
                message:'there are some error with query'
            
            })
              
          }
    });
    
    

    
})

router.post('/game', (req, res) => {
   
    
    try {
        
        const { email, password } = req.body;

        if( !email || !password ){
            return res.status(400).render('index', {
                message: "Please provide an email and password"
            })
        }

        db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
            console.log(results);
            if (results.length !=1 || !(await bcrypt.compare(password, results[0].password)) ) {
                    res.status(401).render('index', {
                    message:"Email or Password incorrect"
                })
                
         }
            else{ 
                const id = results[0].id;
                const name = results[0].username;

                const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                })

                console.log("The token is " + token)
                
                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.nextTick.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }



                res.cookie('jwt', token, cookieOptions);
                //res.status(200).redirect("/")
                 res.status(200).render('main', {
                    name: name,
                    message:"Logged in as " + name
                })

            
            }
         
            
        })

    } catch (error) {
        console.log(error);
    }
})

router.post('/submitscore', (req, res) => {
    var token = req.cookies.jwt;
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if (err) 
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        
        //return res.status(200).send(decoded);
        //console.log(decoded);  
        const id = decoded.id
        const username = decoded.username
        const score = req.body.score

        db.query('SELECT * FROM users WHERE id = ? ', [id], (error, results) =>{
            const name = results[0].username;
            //console.log(name);
            if (score>results[0].highscore){

                db.query('UPDATE users SET highscore = ? WHERE id = ? ;', [score, id], async (error, results) => {
                    console.log(results);
                              
                    
                               
                        //res.status(200).redirect("/")
                        res.status(400).render('submittedscore', {
                        name: name,
                        message2: "Score has been submitted.",
                        message:"Logged in as " + name
                        })
                       
                    
                    })
                
            }else res.status(400).render('submittedscore', {
                //name: username,
                message1:"Score not high enough to submit.",
                message:"Logged in as " + name
            })
        }) 

        

    
    }) 
            
       

})

router.get('/leaderboards', (req, res) => {
    
    let y;
    
    db.query('SELECT *, highscore FROM users', (error, results) => {
        //console.log(results);
        var tableNames = [];
        var tableScores = [];
        
        for (let i = 0; i < results.length; i++) {
            
            let name = results[i].username;
            let highscore = results[i].highscore;
            if (highscore!==null){

            
            tableNames.push(name);
            tableScores.push(highscore);
            }

          }
        
          //points.sort(function(a, b){return b-a});
                   
            //res.status(200).redirect("/")
            res.status(200).render('leaderboards', {
               
                
                name1: tableNames[0],
                score1: tableScores[0],
                name2: tableNames[1],
                score2: tableScores[1],
                name3: tableNames[2],
                score3: tableScores[2],
                name4: tableNames[3],
                score4: tableScores[3],
                name5: tableNames[4],
                score5: tableScores[4],
                name6: tableNames[5],
                score6: tableScores[5],
                name7: tableNames[6],
                score7: tableScores[6],
                name8: tableNames[7],
                score8: tableScores[7],
                name9: tableNames[8],
                score9: tableScores[8],
                name10: tableNames[9],
                score10: tableScores[9],

                
                         
            })

        
        
    
        
    })


})

router.get('/logout', (req, res) => {
    res.clearCookie('jwt').render('index', {
        message: 'You have successfully logged out'
    })
})
module.exports = router;