
import { getSession } from "next-auth/react";
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_API_KEY, {
  apiVersion: "2022-08-01",
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { subTotal, message } = req.body
  
  const userSession = await getSession({ req });
  if ( !userSession ) {
      return res.status(401).json({message: 'Debe de estar autenticado para hacer esto'});
  }



  const quantity = subTotal

  const name = userSession.user.name



  try {
    const session = await stripe.checkout.sessions.create({
      metadata: {
        name,
        message,
      },
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "MXN",
            product_data: {
              name: `comprar Libro`
            },
            unit_amount:  '100',
          },
          quantity,
        },
      ],
      success_url: `${req.headers.origin}/user`,
      cancel_url: `${req.headers.origin}/user`,
    });

    const url = session.url;


    if (url) {
      return res.status(200).send({ url });
    }

    return res.status(500).json({ message: "Something went wrong" });
  } catch (e) {
    console.error("Error creating session " + e);
    return res.status(500).json({ message: "Something went wrong" });
  }
}