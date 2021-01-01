import React, { Component } from 'react';
import OrderItem from '../OrderItem';
import { orders } from '../../testData';

class OrderList extends Component {
    render() {
        return (
            <div>
                {
                    orders.map(order => {
                        return (
                            <OrderItem
                                key={order.id}
                                data={order}
                            />
                        );
                    })
                }
            </div>
        );
    }
}

export default OrderList;