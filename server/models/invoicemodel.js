import mongoose from 'mongoose'

const InvoiceSchema=new mongoose.Schema({
    UserID:{type:mongoose.Types.ObjectId,required:true},
    price:{type:Number,required:true},
    vat:{type:Number,required:true},
    payable:{type:Number,required:true},
    TranID:{type:String,required:true}

})
const invoicemodel=mongoose.model('invoices',InvoiceSchema)
export default invoicemodel;