
module.exports = function (_id, arrayData) {
    var obj = {};
    obj._id = `$${_id}`
    for(let i = 0; i < arrayData.length; i++){
        obj[arrayData[i]] = { $last: `$${arrayData[i]}` }
    }
    
    return obj;
}
