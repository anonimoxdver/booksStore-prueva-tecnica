
import { db } from '../../../database';

import { Order } from '../../../models';





export default function handler(req, res) {


    switch( req.method ) {
        case 'POST':
            return getOrder( req, res );

        default:
            return res.status(400).json({ message: 'Bad request' })

    }

    
}

const getOrder = async (req, res) => {
    

    const { sub } = req.body    




    await db.connect();
    const order = await Order.find({ 'session.sub': sub }).lean();
    await db.disconnect();

    if ( !order || order.length === 0 ) {
        return res.status(200).json([]);
    }



    return res.status(201).json( JSON.parse(JSON.stringify(order) ))
}
