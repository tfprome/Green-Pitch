import mongoose from 'mongoose';

const InvoiceProductSchema = new mongoose.Schema({
    invoiceID: { type: mongoose.Types.ObjectId, required: true },
    UserID: { type: mongoose.Types.ObjectId, required: true },
    productID: { type: mongoose.Types.ObjectId, required: true },
    qty: { type: Number, required: true },
    size: { type: String,},
    price: { type: Number, required: true },
});

const InvoiceProductModel = mongoose.model('invoiceproducts', InvoiceProductSchema);

export default InvoiceProductModel;
