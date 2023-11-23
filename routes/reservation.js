// Import express
import { Router } from 'express';
import {Stripe} from 'stripe';


// Import the Reservation controller
import { getAllReservations, createReservation, updateReservation, deleteReservation } from '../controllers/reservation.js';

// Create a new router
const router = Router();

//const express = require('express');


//router.set('trust proxy', true);
//router.use(express.json());

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = Stripe('sk_test_51OF1qTCCAcch0OaOcJwNhnrLhQpI57kDjT1wFJ23ZU9vBXA1FG8tPV6mW8Pdd8c4ICBW5LIADZg4sOeJ3pUf0DQG002k0SdHRo');




// Define the routes for the Reservation model
router.get('/', getAllReservations);
router.post('/', createReservation);
router.put('/:id', updateReservation);
router.delete('/:id', deleteReservation);


router.post('/create-intent', async (req, res) => {
  try {
    var args = {
      amount: 1099,
      currency: 'usd',
      // In the latest version of the API, specifying the automatic_payment_methods parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {enabled: true},
    };
    const intent = await stripe.paymentIntents.create(args);
    res.json({
      client_secret: intent.client_secret,
    });
  } catch (err) {
    res.status(err.statusCode).json({ error: err.message })
  }
});


router.post('/payment-sheet', async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    {customer: customer.id},
    {apiVersion: '2023-10-16'}
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'eur',
    customer: customer.id,
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey: 'pk_test_51OF1qTCCAcch0OaOh4RBDmMrgB2H2fldhAv7VHVTcSVMAMyryPXrYSoZ5Yd4UMGt9PSKhmXSe3b4rzDVp2Jnf61P00LBqL30Oe'
  });
});

// Export the router
export default router;
