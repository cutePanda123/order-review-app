import React, { Component } from 'react';
import './style.css';
import MdStar from 'react-ionicons/lib/MdStar';
import PropTypes from 'prop-types';

class OrderItem extends Component {
    constructor(props) {
        super(props);
        const { reviewComment, starsNumber } = props.data;
        this.state = {
            editMode: false,
            starsNumber: starsNumber || 0,
            reviewComment: reviewComment || ''
        };
    }
    
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
                            <button
                                className={reviewButtonClassName}
                                onClick={this.addReview}
                            >Add review</button>
                        </div>
                    </div>
                </div>
                {this.state.editMode ? this.renderReviewCommentArea() : null}
            </div>
        );
    }

    addReview = () => {
        this.setState({
            editMode: true
        });
    }

    writeReview = (event) => {
        this.setState({
            reviewComment: event.target.value
        });
    }

    clickStar = (starsNumber) => {
        this.setState({
            starsNumber: starsNumber
        })
    }

    cancelReview = () => {
        this.setState({
            starsNumber: this.props.data.starsNumber || 0,
            reviewComment: this.props.data.reviewComment || '',
            editMode: false
        });
    }

    submitReview =() => {
        const { id } = this.props.data;
        const { reviewComment, starsNumber } = this.state;
        this.setState({
            editMode: false
        });
        
        this.props.onSubmitReview(id, reviewComment, starsNumber);
    }

    renderReviewCommentArea() {
        return (
            <div className='orderItem__commentContainer'>
                <textarea 
                    className='orderItem__comment'
                    onChange={this.writeReview}
                    value={this.state.reviewComment}
                />
                {this.renderRatingStars()}
                <button
                    className='orderItem__btn orderItem__btn--red'
                    onClick={this.submitReview}
                >Submit</button>
                <button 
                    className='orderItem__btn orderItem__btn--grey'
                    onClick={this.cancelReview}
                >Cancel</button>
            </div>
        );
    }

    renderRatingStars() {
        const { starsNumber } = this.state;
        return (
            <div>
                {
                    [1, 2, 3, 4, 5].map((curStarNum, index) => {
                        const starColor = curStarNum >= starsNumber ? "grey" : "orange";
                        return (
                            <MdStar
                                key={index}
                                fontSize="15px"
                                color={starColor}
                                onClick={this.clickStar.bind(this, curStarNum)}
                            />
                        )
                    })
                }
            </div>
        );
    }
};

OrderItem.propTypes = {
    onSubmitReview: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

export default OrderItem;