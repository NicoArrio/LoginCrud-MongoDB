
//next=en vez return to client, continua xq hay una funct desp de esta
export const authRequired = (req, res, next) => {
    console.log(req.headers);
    next();
}