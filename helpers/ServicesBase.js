const mongoose = require("mongoose");
const Response = require("../helpers/SevicesResponse")
const autoBind = require('auto-bind');

class ServiceBase {
    constructor(model = mongoose.Model) {
        this.model = model
        autoBind(this)
    }
    async getAll(query) {
        let { skip, limit, sortBy } = query;
        skip = skip ? Number(skip) : 0;
        limit = limit ? Number(limit) : 10;
        sortBy = sortBy ? sortBy : { createdAt: -1 };

        delete query.skip;
        delete query.limit;
        delete query.sortBy;

        try {
            let items = await this.model
                .find(query)
                .sort(sortBy)
                .skip(skip)
                .limit(limit);

            let total = await this.model.countDocuments(query);
            return new Response(false, { items, total })
        } catch (error) {
            return new Response(true, error)
        }
    }

    async get(id) {
        try {
            let item = await this.model.findById(id);
            if (!item) {
                let error = new Error('Item not found');
                error.statusCode = 404;
                throw error;
            }

            return new Response(false, item);
        } catch (errors) {
            return new Response(true);
        }
    }

    async insert(data) {
        try {
            let item = await this.model.create(data);
            if (item) {
                return new Response(false, item);
            } else {
                return new Response(true, {}, 'Something wrong happened');
            }
        } catch (error) {
            return new Response(true,error, "Error");
        }
    }

    async update(id, data) {
        try {
            let item = await this.model.findByIdAndUpdate(id, data, { new: true });
            return new Response(false, item);
        } catch (errors) {
            return new Response(true)
        }
    }

    async delete(id) {
        try {
            let item = await this.model.findByIdAndDelete(id);
            if (!item) {
                return new Response(true, {}, "item not found");
            } else {
                return new Response(false,{item, deleted:true});
            }
        } catch (errors) {
            return new Response(true);
        }
    }
}

module.exports = { ServiceBase }