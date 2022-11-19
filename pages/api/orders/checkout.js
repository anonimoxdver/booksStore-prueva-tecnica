import { getSession } from "next-auth/react";
import Stripe from "stripe";
import { db } from '../../../database'
import Order from "../../../models/Order";


const stripe = new Stripe(process.env.STRIPE_API_KEY, {
  apiVersion: "2022-08-01",
});






export default function handler(req, res) {


    switch( req.method ) {
        case 'GET':
            return checkoutPayment( req, res );

        default:
            return res.status(400).json({ message: 'Bad request' })

    }

    
}

const checkoutPayment = async (req, res) => {

      
  const userSession = await getSession({ req });
  if ( !userSession ) {
      return res.status(401).json({message: 'Debe de estar autenticado para hacer esto'});
  }



  const emailSession = userSession.user.email
    

    const session = await stripe.checkout.sessions.list({
        customer_details: { email: emailSession},
    });

    const emailPayment = session.data.map(( payment ) => payment.customer_details.email )
    const paymentStatus = session.data.map(( payment ) => payment.payment_status )
    console.log({ emailPayment })
    console.log( paymentStatus )

    db.connect()

    const product = await Order.find({ 'session.user.email' : emailPayment  })
    console.log({product})

    const amountPayment = session.data.map(( payment ) => payment.amount_total / 100 )
    console.log({amountPayment})

    const sameProduct = product.find(( product) => product.subTotal == amountPayment[0] )
    console.log({sameProduct})
    


    const paymentSimilar = session.data.filter( (payment) => payment.amount_total / 100 === sameProduct.subTotal )

    const { 0:newPayment} = paymentSimilar

    const { payment_status } = newPayment


    if ( payment_status === 'paid' ){

        sameProduct.isPaid = true

            await sameProduct.save()

            db.disconnect()
           return res.status(201).json( userSession);

    }
  
    db.disconnect()

    return res.status(201).json( userSession);
}
