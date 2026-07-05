import orderData from "../data/orders.json" with { type: "json" };

export default function getOrderStatus(orderId){

    const order = orderData.orders.find(
        order => order.order_id.toLowerCase() === orderId.toLowerCase()
    );

    if(!order){

        return {
            found:false,
            message:"Order not found."
        };

    }

   return {

    found:true,

    orderId:order.order_id,

    customer:order.customer_name,

    status:order.status,

    trackingNumber:order.tracking_number ?? null,

    carrier:order.carrier ?? null,

    estimatedDelivery:
        order.estimated_delivery ??
        order.delivery_date ??
        null

};

}