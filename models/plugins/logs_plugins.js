const Logs = require("../logs")
module.exports = function logsPlugin(schema, options) {
    // console.log(`sheme: ${JSON.stringify(schema.query)}  -- options:${options}`)
    schema.post('init', doc => {

        doc._original = doc.toObject({ transform: false })

    })

    schema.pre('save', function (next) {
        let data = this;
        data.diff = {

            before: this._original,

            after: this._diff,

        }
        data.createdB
        Logs.create(data)
        if (this.isNew) {

            next()

        } else {

            this._diff = getDiff(this, this._original)

            next()
        }
    })

    schema.pre('deleteOne', function (next) {

        data.diff = {

            before: this._original,

            after: this._diff,

        }
        Logs.create(data)
        if (this.isNew) {

            next()

        } else {

            this._diff = getDiff(this, this._original)

            next()
        }
    })

};