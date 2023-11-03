//Récupère l'erreur 404 not found, et la transmet au gestionnaire d'erreur avec next()
export function notFoundError(req, res, next) {
    const err = new Error("Not Found")
    err.status = 404
    next(err)
} 

/*
Gestionnaire d'erreur avec err en parametres
qui est une erreur transmise par un autre middleware avec next() 
*/
export function errorHandler(err, req, res, next) {
    res.status(err.status || 500).json({
        message: err.message,
    })
}