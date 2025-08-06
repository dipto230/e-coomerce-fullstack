const express = require("express");
const Checkout = require("../models/Checkout.js");
const Cart = require("../models/Cart.js");
const Product = require("../models/Product.js");
const Order = require("../models/Order.js");
const { protect } = require("../middleware/authMiddleware.js");
const router = express.Router();


router.post("/", protect, async (req, res) => {
    const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;
    if (!checkoutItems || checkoutItems.length === 0) {
        return res.status(400).json({ message: "No items in checkout" });
    }
    try {
        const newCheckout = await Checkout.create({
            user: req.user._id,
            checkoutItems: checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus: "Pending",
            isPaid: false,

        });
        console.log(`checkout created for user: ${req.user._id}`);
        res.status(201).json(newCheckout);
        
    } catch (error) {
        console.error("Error creating checkout:", error);
        res.status(500).json({ message: "Server Error" });
        
    }
});
router.post("/:id/pay", protect, async (req, res) => {
    const { paymentStatus, paymentMethod } = req.body;
    try {
        const checkout = await Checkout.findById(req.params.id);
        if (!checkout) {
            return res.status(404).json({ message: "Checkout not found" });
        }
        if (paymentStatus === "paid") {
            checkout.isPaid = true;
            checkout.paymentStatus = paymentStatus;
            checkout.paymentDetails = paymentDetails;
            checkout.paidAt = Date.now();
            await checkout.save();
            res.status(200).json(checkout);



        } else {
            res.status(400).json({ message: "Payment not successful" });
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
        
    }
});
router.post("/:id/finalize", protect, async (req, res) => {
    try {
        const checkout = await Checkout.findById(req.params.id);
        if (!checkout) {
            return res.status(404).json({ message: "Checkout not found" });
        }
        if (checkout.isPaid && !checkout.isFinalized) {
            const finalOrder = await Order.create({
                user: checkout.user,
                orderItems: checkout.checkoutItems,
                shippingAddress: checkout.shippingAddress,
                paymentMethod: checkout.paymentMethod,
                totalPrice: checkout.totalPrice,
                isPaid: true,
                paidAt: checkout.paidAt,
                isDelivered: false,
                paymentStatus: "paid",
                paymentDetails: checkout.paymentDetails,

            });
            checkout.isFinalized = true;
            checkout.finalizedAt = Date.now();
            await checkout.save();

            await Cart.findOneAndDelete({ user: checkout.user });
            res.status(201).json(finalOrder);
        } else if (checkout.isFinalized) {
            res.status(400).json({ message: "Checkout already finalized" });
        } else {
            res.status(400).json({ message: "Checkout not paid yet" });
        }

        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
        
    }
});
module.exports = router;



