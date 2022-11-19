
import { getSession } from 'next-auth/react';
import { db } from '../../../database';

import { Order } from '../../../models';





export default function handler(req, res) {


    switch( req.method ) {
        case 'POST':
            return createOrder( req, res );

        default:
            return res.status(400).json({ message: 'Bad request' })

    }

    
}

const createOrder = async (req, res) => {
    

    const session = await getSession({ req });
    if ( !session ) {
        return res.status(401).json({message: 'Debe de estar autenticado para hacer esto'});
    }

    db.connect()


    const newOrder = new Order({ ...req.body, isPaid: false, session });

    await newOrder.save();
    await db.disconnect();


    return res.status(201).json( newOrder );
}
