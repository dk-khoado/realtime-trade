module.exports = class {
    constructor(error= false, data = {}, message = ""){
        this.error = error
        this.data = data
        this.message = message
    }
    isError(){
        return this.error
    }
    getData(){
        return this.data
    }

    getMessage(){
        return this.message
    }
}