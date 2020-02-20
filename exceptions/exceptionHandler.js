const exceptionAnswer = (status, messages) => {
    let resultMessages = messages.map((message) => ({ message: message }));
    return {
        status: status,
        messages: resultMessages
    }
};

module.exports = (e) => {
    if(e.statusCode) {
        if(e.messages) 
            return exceptionAnswer(e.statusCode, e.messages);
        if(e.message)
            return exceptionAnswer(e.statusCode, [e.message]);
        return exceptionAnswer(e.statusCode, [ "Erro desconhecido" ]);     
    }
    return exceptionAnswer(500, [ "Erro desconhecido" ]);     
};
