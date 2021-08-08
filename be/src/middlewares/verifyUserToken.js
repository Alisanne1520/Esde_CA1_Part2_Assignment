const config = require('../config/config'); 
const jwt = require('jsonwebtoken'); 
const { decode } = require('punycode');

const verifyFn = { 
    verifyTokenUserID: function (req, res, next) { 
        // logger.info("verifyTokenUserID middleware called"); 
        let token = req.headers['authorization']; 
        let user_id = req.headers['user']
        console.log(user_id)
        res.type('json'); 
        if (!token || !token.includes("Bearer ")) { 
            console.log("Unauthorized Access Attempt Was Made, No Token") 
            res.status(403); res.send({"Message":"Not Authorized"}); 
        } else { 
            token = token.split('Bearer ')[1]; 
            jwt.verify(token,config.JWTKey,function(err,decoded)
            { if(err) { 
                console.log("Unauthorized Access Attempt Was Made, Invalid Token") 
                res.status(403); 
                res.send({"Message":"Not Authorized"}); 
            }else{ 
                req.body.userId = decoded.id; 
                req.role = decoded.role; 
                console.log(decoded.id)
                if(decoded.id == user_id || decoded.role == 'admin'){
                    next();}
                else{
                    console.log("Unauthorized Access Attempt Was Made, Invalid Token") 
                    res.status(402); 
                    res.send({"Message":"Not Authorized"});
                }
            } 
        }); 
    } 
}, 
} 

module.exports = verifyFn;