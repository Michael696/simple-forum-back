/**
 * Copies specified fields from one object to another new object. If at least one field does not exists, returns "false"
 * @param obj source object
 * @param fields fields to pick
 */

function objectPick(obj, fields) { // TODO unit tests
    let picked = {};
    return fields.every(field => {
        if (typeof obj[field] === 'undefined' || obj[field] === null) {
            return false;
        } else {
            picked[field] = obj[field];
            return true;
        }
    }) && picked;
}

module.exports = {objectPick};