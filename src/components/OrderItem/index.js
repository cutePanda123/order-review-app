import React, { Component } from 'react';
import './style.css';

class OrderItem extends Component {
    
    render() {
        const { name, seller, price, imgUrl, isCommented } = this.props.data;
        const reviewButtonClassName = 'orderItem__btn ' + (isCommented ? 'orderItem__btn--grey' : 'orderItem__btn--red');
        return (
            <div className='orderItem'>
                <div className='orderItem__picContainer'>
                    <img className='orderItem__pic' src={imgUrl} />
                </div>
                <div className='orderItem__content'>
                    <div className='orderItem__name'>{name}</div>
                    <div className='orderItem__seller'>{seller}</div>
                    <div className='orderItem__detail'>
                    <div className='orderItem__price'>{price}</div>
                        <div>
                            <button className={reviewButtonClassName}>Add review</button>
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
}

export default OrderItem;