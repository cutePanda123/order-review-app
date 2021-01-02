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
                                    onSubmitReview={this.handleSubmitReview}
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

    handleSubmitReview = (id, reviewComment, starsNumber) => {
        // in real case situation, the below codes should be added as the callback in fetch('/savecomment').then(() => {})
        const newOrders = this.state.orders.map((order, index) => {
            if (order.id === id) {
                return {
                    ...order,
                    reviewComment,
                    starsNumber,
                    isCommented: true
                };
            } else {
                return order;
            }
        });
        this.setState({
            orders: newOrders
        });
    }
}

export default OrderList;