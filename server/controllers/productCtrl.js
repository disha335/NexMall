const Products = require('../models/productModel')


// Filtering ,sorting and pagination

class APIfeatures{
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
        this.filters = {};
    }

    filtering() {
        const queryObj = { ...this.queryString };

        const excludedFields = ['page', 'sort', 'limit', 'search'];
        excludedFields.forEach(el => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => `$${match}`);
        const filters = JSON.parse(queryStr);

        // Only include category if it's a non-empty string
        if (this.queryString.category && this.queryString.category.trim() !== '') {
            filters.category = this.queryString.category.trim();
        }else{
            delete filters.category;
        }

        // Add search filters if provided
        if (this.queryString.search) {
            const searchRegex = new RegExp(this.queryString.search, 'i'); // Case-insensitive search
            filters.$or = [{ name: searchRegex }, { description: searchRegex }, {content: searchRegex}];
        }
        
        this.query.find(filters);
        return this;
    }
    

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join('')
            this.query = this.query.sort(sortBy)
        }
        else{
            this.query = this.query.sort('-createdAt')
        }
        return this;
    }

    pagination(){
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 9;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

const productCtrl = {
    getProducts: async(req, res) => {
        try{
            const features = new APIfeatures(Products.find(), req.query).filtering().sorting().pagination()
            const products = await features.query
            const totalCount = await Products.countDocuments(features.filters || {});
            res.json({results: products.length,totalCount, products})
        }
        catch(err){
            res.status(500).json({msg: err.message})
        }
    },

    createProduct: async(req, res) =>{
        try{
             const {product_id, title, price, description, content, images, category} = req.body;

             if(!images){
                res.status(400).json({msg: "No image uploaded"})
             }

             const product = await Products.findOne({product_id})

             if(product){
                res.status(400).json({msg: "This product already exists ."})
             }
             const newProduct = new Products({product_id, title: title.toLowerCase(), price, description, content, images, category})
             await newProduct.save()
             res.json({msg: "Product added !"})
        }   
        catch(err){
            res.status(500).json({msg: err.message})
        }
    },

    deleteProduct: async(req, res) => {
        try{
            await Products.findByIdAndDelete(req.params.id)
            res.json({msg: "Product deleted !"})
        }
        catch(err){
            res.status(500).json({msg: err.message})
        }
    },

    updateProduct: async(req, res) => {
        try{
            const {title, price, description, content, images, category} = req.body;

            if(!images){
                res.status(400).json({msg: "No image uploaded"})
            }

            await Products.findByIdAndUpdate({_id:req.params.id}, {
                title: title.toLowerCase(), price, description, content, images, category
            })

            res.json({msg: "Product updated!"})

        }
        catch(err){
            res.status(500).json({msg: err.message})
        }
    }

}

module.exports = productCtrl;