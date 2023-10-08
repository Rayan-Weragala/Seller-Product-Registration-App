import mongoose from 'mongoose'

const listingSchema =new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
    },
        description: {
            type: String,
            required: true,
            unique: false,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        category: {
            type: String,
            required: true,
        },
        materials: {
            type: String,
        },
        height: String,
        width: String,
        depth: String,
        stock: {
            type: Number,
            required: true,
        },
        available: {
            type: Boolean,
        },
        imageUrls: {
            type: Array,
            required: true,
        },
        userRef:{
            type:String,
            required:true,
        },
    },{timestamps:true}
)

const Listing = mongoose.model('Listing',listingSchema);

export default Listing;