
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const payCtrl = {
    createPayment : async(req, res) => {
        const { amount } = req.body;
        try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount, // Amount in cents
            currency: 'usd',
            payment_method_types: ['card'],
        });
        res.status(200).send({
            clientSecret: paymentIntent.client_secret,
        });
        } catch (err) {
        res.status(500).json({ error: err.message });
        }
    }
}

module.exports = payCtrl