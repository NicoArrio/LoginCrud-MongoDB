
//when recibas un schema, adentro eject el schema.parse
export const validateSchema = (schema) => (req,res,next) => {

    //para q no tumbe el sist si falla
    try {
        schema.parse(req.body); //se valida correctamente el schema
        next();
    } catch (error) {
        //para q no se muestre toda la info innecesario, hay q filtrarlo
        return res.status(400).json(error.errors.map(error => error.message))//no return object sino un array de errores
    }
};