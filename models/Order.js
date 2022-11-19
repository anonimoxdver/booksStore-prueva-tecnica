import mongoose, { Schema, model,  } from 'mongoose';


const orderSchema = new Schema({

    session:{
        user : { name:{ type: String, required: true }, email: { type: String, required: true } },

        expires   : { type: String, required: true },
        sub  : { type: String, required: true },

    },
    orderItems: [{
        title       : { type: String, required: true },
        descripcion : { type: String, required: true },
        image       : { type: String, required: true },
        subtitulo   : { type: String },
        isbn13      : { type: String, required: true },
        editor      : { type: String, required: true },
        año         : { type: String, required: true },
        rating      : { type: String, required: true },

        precio      : { type: Number, required: true },
        cantidad    : { type: Number, required: true },
    }],


    numberOfItems: { type: Number, required: true },
    subTotal     : { type: Number, required: true },


    isPaid : { type: Boolean, required: true, default: false },
    paidAt : { type: String },

    transactionId: { type: String },
    
}, {
    timestamps: true,
})

orderSchema.index({ title: 'text', tags: 'text' });

const Order = mongoose.models.Order || model('Order',orderSchema);

export default Order;