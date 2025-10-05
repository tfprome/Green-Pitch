import mongoose from "mongoose";
import cartmodel from "../models/cartmodel.js";
import invoicemodel from "../models/invoicemodel.js";
import InvoiceProductModel from "../models/invoiceproductmodel.js";
const ObjectId = mongoose.Types.ObjectId


export const createinvoiceservice = async (req, res) => {
    try {
      const UserID = new mongoose.Types.ObjectId(req.UserID);
      const cartid = new mongoose.Types.ObjectId(req.params.id);
  
      const cartItem = await cartmodel.aggregate([
        { $match: { _id: cartid, UserID } },
        { $lookup: { from: 'products', localField: 'ProductID', foreignField: '_id', as: 'product' } },
        { $unwind: '$product' }
      ]);
  
      if (!cartItem.length) {
        return res.status(400).json({ status: "fail", message: "Cart item not found" });
      }
  
      const item = cartItem[0];
      const price = Number(item.price);
      const vat = price * 0.05;
      const payable = price + vat;
  
      const invoicecreate = await invoicemodel.create({
        UserID,
        price,
        vat,
        payable,
        TranID: Math.floor(100000 + Math.random() * 900000).toString()
      });
  
      await InvoiceProductModel.create({
        invoiceID: invoicecreate._id,
        UserID,
        productID: item.ProductID,
        qty: item.quantity,
        size: item.size || 'default',  // required field
        price
      });
  
      await cartmodel.deleteOne({ _id: cartid, UserID });
  
      return res.status(200).json({ message: "success", invoice: invoicecreate });
    } catch (e) {
      return res.status(500).json({ message: "invoice server error", error: e.message });
    }
  };


export const getInvoiceDetails = async (req, res) => {
  try {
    const invoiceID = new mongoose.Types.ObjectId(req.params.id);

    const invoice = await invoicemodel.aggregate([
      { $match: { _id: invoiceID } },
      {
        $lookup: {
          from: "invoiceproducts",
          localField: "_id",
          foreignField: "invoiceID",
          as: "products",
        },
      },
    ]);

    if (!invoice.length) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.status(200).json({ invoice: invoice[0] });
  } catch (e) {
    res.status(500).json({ message: "Could not fetch invoice", error: e.message });
  }
};


export const initiatePayment = async (req, res) => {
  try {
    const invoiceID = req.params.id;

    const invoiceData = await invoicemodel.aggregate([
      { $match: { _id: new ObjectId(invoiceID) } },
      {
        $lookup: {
          from: "users",
          localField: "UserID",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
    ]);

    if (!invoiceData.length) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    const invoice = invoiceData[0];
    const demoGatewayURL = `https://green-pitch.vercel.app//payment-success/${invoice._id}`;

    return res.status(200).json({
      status: "success",
      gateway_url: demoGatewayURL,
      invoice: invoice,
    });
  } catch (e) {
    return res.status(500).json({ message: "Payment initiation failed", error: e.message });
  }
};


export const paymentSuccess = async (req, res) => {
  try {
    const invoiceID = req.params.id;

    await invoicemodel.findByIdAndUpdate(invoiceID, { status: "paid" });

    return res.send(`
      <h2>Payment Successful!</h2>
      <p>Invoice ID: ${invoiceID}</p>
      <a href="/invoicepage/${invoiceID}">Go back to invoice</a>
    `);
  } catch (e) {
    return res.status(500).send("Payment success processing failed.");
  }
};


export const paymentFail = async (req, res) => {
  try {
    const invoiceID = req.params.id;
    return res.send(`
      <h2>Payment Failed!</h2>
      <p>Invoice ID: ${invoiceID}</p>
      <a href="/invoicepage/${invoiceID}">Try again</a>
    `);
  } catch (e) {
    return res.status(500).send("Payment fail processing failed.");
  }
};
  