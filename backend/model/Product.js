const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },
      price: {
        type: Number,
        required: true,
      },
      category: {
        type: String,
        required: true,
        trim: true,
      },
      image: {
        type: String,
        required: true, // URL of the image
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // This will reference the User model
        required: true,
      },
    }
  );

module.exports =mongoose.model('Product',productSchema);