const mongoose = require('mongoose')


const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false 
    return true;
} 


const isValidBody = function (requestBody) {
    return Object.keys(requestBody).length > 0;
}


const isValidEmail = function (value) {
    // if (!(/^[a-z0-9+_.-]+@[a-z0-9.-]+$/.test(value.trim()))) {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value.trim())) {
        return false
    }
    return true
}

module.exports.isValid= isValid
module.exports.isValidBody=isValidBody
module.exports.isValidEmail=isValidEmail