import React, { Component } from 'react';
import OrderItem from '../OrderItem';

class OrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        };
    }

    componentDidMount() {
        fetch('/mock/orders.json').then(res => {
            if (res.ok) {
                res.json().then(data => {
                    this.setState({
                        orders: data
                    })
                });
            }
        });
    }

    render() {
        return (
                this.state.orders.length > 0 ? (
                    <div>
                    {
                        this.state.orders.map(order => {
                            return (
                                <OrderItem
                                    key={order.id}
                                    data={order}
                                />
                            );
                        })
                    }
                    </div>
                ) : (
                    <div></div>
                )
        );
    }
}

export default OrderList;