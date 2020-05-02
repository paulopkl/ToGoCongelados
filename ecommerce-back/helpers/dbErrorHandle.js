"use strict";
     
/*    Pegue um unico erro campo nome   */
const uniqueMessage = error => {
    let output;
    try {
        let fieldName = error.message.substring(
            error.message.lastIndexOf(".$") + 2,
            error.message.lastIndexOf("_1")
        );
        output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + " Já existe";
    } catch (ex) {
        output = "Campo único já existe";
    }
 
    return output;
};
 
exports.errorHandler = error => {
    let message = "";
 
    if (error.code) {
        switch (error.code) {
            case 11000:
            case 11001:
                message = uniqueMessage(error);
                break;
            case '':
                message = "Alguma coisa quebrou :(";
            default:
                message = "Deu erro";
                break;
        }
    } else {
        for (let errorName in error.errorors) {
            if (error.errorors[errorName].message)
                message = error.errorors[errorName].message;
        }
    }
    return message;
};