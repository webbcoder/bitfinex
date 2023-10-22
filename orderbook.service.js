const orderBook = {
    buyOrders: [], // Array of buy orders
    sellOrders: [], // Array of sell orders
};

function processBuyOrder(order) {
    for (const sellOrder of orderBook.sellOrders) {
        if (order.price >= sellOrder.price) {
            // Match found: buy order with a price higher or equal to the sell order
            if (order.quantity >= sellOrder.quantity) {
                // Full match
                // Execute the trade
                executeTrade(order, sellOrder);
                // Remove the sell order
                orderBook.sellOrders.splice(orderBook.sellOrders.indexOf(sellOrder), 1);
                // Check the remaining quantity of the buy order
                if (order.quantity === 0) {
                    break;
                }
            } else {
                // Partial match
                // Execute a partial trade
                executeTrade(order, { ...sellOrder, quantity: order.quantity });
                // Reduce the quantity of the sell order
                sellOrder.quantity -= order.quantity;
                order.quantity = 0;
                break;
            }
        }
    }

    // If there's a partially matched buy order remaining, add it to the order book
    if (order.quantity > 0) {
        orderBook.buyOrders.push(order);
    }
}

function processSellOrder(order) {
    for (const buyOrder of orderBook.buyOrders) {
        if (order.price <= buyOrder.price) {
            // Match found: sell order with a price lower or equal to the buy order
            if (order.quantity >= buyOrder.quantity) {
                // Full match
                // Execute the trade
                executeTrade(buyOrder, order);
                // Remove the buy order
                orderBook.buyOrders.splice(orderBook.buyOrders.indexOf(buyOrder), 1);
                // Check the remaining quantity of the sell order
                if (order.quantity === 0) {
                    break;
                }
            } else {
                // Partial match
                // Execute a partial trade
                executeTrade(buyOrder, { ...order, quantity: buyOrder.quantity });
                // Reduce the quantity of the buy order
                buyOrder.quantity -= order.quantity;
                order.quantity = 0;
                break;
            }
        }
    }

    //  If there's a partially matched sell order remaining, add it to the order book
    if (order.quantity > 0) {
        orderBook.sellOrders.push(order);
    }
}

function executeTrade(buyOrder, sellOrder) {
    // Execute a trade between orders
    console.log(`Trade: ${buyOrder.quantity} at ${buyOrder.price} - ${sellOrder.quantity} at ${sellOrder.price}`);
    // Here, you can add the logic for trade execution and price calculation
}

function handleOrderSubmission(order, handler) {
    if (order.type === 'buy') {
        // Processing the buy order
        processBuyOrder(order);
    } else if (order.type === 'sell') {
        // Processing the sell order
        processSellOrder(order);
    } else {
        console.error('Invalid order type');
    }
    handler.reply(null, orderBook);
}




module.exports = {
    handleOrderSubmission
}
