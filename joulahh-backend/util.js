import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if(authorization){
        const token = authorization.slice(7,authorization.length); //Bearer xxxxxx
        jwt.verify(token, process.env.JWT_SECRET || 'somethingecret',(error, decode)=>{ //un data'ee ke hamrahe token mifresti to bakhshe dorost kardane token (jwt.sign), jwt.verigy return mikone oon data ro tooye decode.
            if(error){
                res.status(401).send({message : 'invalid token'});
            }else{
                req.user = decode; // authrorization done! oon dataha'ee ke hamrahe token dadim ro inja vasl mikonim be req.
                next();
            }
        })
    }
    else{
        res.status(401).send({message : 'there is no token!'});
    }
}