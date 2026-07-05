import orderData from "../data/orders.json" with { type: "json" };

export default function checkRefundEligibility(orderId){

    const order = orderData.orders.find(
        order => order.order_id.toLowerCase() === orderId.toLowerCase()
    );

    if(!order){

        return{
            eligible:false,
            reason:"Order not found."
        };

    }

    if(order.status==="refunded"){

        return{
            eligible:false,
            reason:"Order has already been refunded."
        };

    }

    if(order.status==="cancelled"){

        return{
            eligible:true,
            reason:"Cancelled orders are eligible for refund."
        };

    }

    if(order.status==="processing"){

        return{
            eligible:false,
            reason:"Order is still being processed."
        };

    }

    if(order.status==="shipped"){

        return{
            eligible:false,
            reason:"Please wait until the order is delivered."
        };

    }

    if(order.status==="delivered"){

        const delivered = new Date(order.delivery_date);

        const today = new Date();

        const days =
            (today-delivered)/(1000*60*60*24);

        if(days<=30){

          return {

         success:true,

        eligible:true,

         orderId:order.order_id,

        status:order.status,

        reason:"Order is within the 30-day refund period."

};

        }

        return{
            eligible:false,
            reason:"Refund window has expired."
        };

    }

}