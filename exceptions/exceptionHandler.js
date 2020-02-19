module.exports = (e) => {
    // console.log(e);
    if(e.statusCode) {
        if(e.message)
            return {
                status: e.statusCode, 
                message: e.message
            };
        return {
            status: e.statusCode, 
            message: "Erro não identificável!"
        };      
    }
    return {
        status: 500, 
        message: "Erro inesperado"
    }; 
};
