const Product= require('../model/Product');
const User= require('../model/User');

const getAllProducts = async (req, res) => {
    const products= await Product.find().populate('user');
    if (!products) return res.status(204).json({'message':'No Products found'})
    res.json(products);
}

const createNewProduct = async (req, res) => {
    if (!req?.body?.title || !req?.body?.price|| !req?.body?.category || !req?.body?.image)
    {
        return res.status(400).json({'message':'All fields are required'})
    }
    const user= await User.findOne({
        _id: req.user.id
    }).exec();
    
    try{
        const result = await Product.create({
            title: req.body.title,
            price: req.body.price,
            category: req.body.category,
            image: req.body.image,
            user: user
        });

       return res.status(201).json(result);
    }catch(err)
    {
        console.error(err);
        res.status(200).json({
            "success":false,
            "data":err.message
        })
    }
}

const updateProduct = async (req, res) => {
    if(!req?.body?.id){
        return res.status(400).json({'message':'ID parameter is required'});
    }

    const product= await Product.findOne({
        _id: req.body.id
    }).exec();

    if (!product) {
        return res.status(204).json({ "message": `No product matches ${req.body.id}` });
    }
    if (req.body?.title) product.title = req.body.title;
    if (req.body?.price) product.price = req.body.price;
    const result= await product.save();
    res.json(result);
}

const deleteProduct = async (req, res) => {
    if(!req?.body?.id) return res.status(400).json({'message':'Product ID required'});

    const product = await Product.findOne({
        _id: req.body.id
    }).exec();

    if (!product) {
        return res.status(204).json({ "message": `No product matches ${req.body.id}` });
    }
    const result= await Product.deleteOne({_id:req.body.id});
    res.json(result);
}

const getProduct = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({'message':'Employee ID required'});

    const employee =  await Product.findOne({
        _id: req.params.id
    }).populate('user').exec();

    if (!employee) {
        return res.status(204).json({ "message": `No product matches ${req.body.id}` });
    }
    res.json(employee);
}

module.exports = {
    getAllProducts,
    createNewProduct,
    updateProduct,
    deleteProduct,
    getProduct
}