import React, { useContext, useState } from 'react'

import classes from './Cart.module.css'
import Modal from '../UI/Modal';
import cartContext from '../../store/cart-context';
import CartItem from './CartItem/CartItem'
import Checkout from './Checkout';

const Cart = (props) => {

    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const cartCtx = useContext(cartContext);

    const totalAmount = `$${Math.abs(cartCtx.totalAmount).toFixed(2)};`
    const hasItems = cartCtx.items.length > 0; //check if it has items in cart

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    }

    const cartItemAddHandler = (item) => {
        cartCtx.addItem(item);
    }

    const cartItemAddOneHandler = (item) => {
        cartCtx.addOneItem(item);
    }

    const orderHandler = () => {
        setIsCheckout(true);
    }

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch('https://react-http-tasks-example-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    }

    const cartItems =
        <ul className={classes['cart-items']}>
            {cartCtx.items.map(item =>
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                    onOneAdd={cartItemAddOneHandler.bind(null, item)}
                />
            )}
        </ul>;

    const modalActions =
        (<div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
            {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
        </div>);

    const cartModalContent = (
        <>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout
                onCancel={props.onClose}
                onConfirm={submitOrderHandler}
            />}
            {!isCheckout && modalActions}
        </>
    );

    const isSubmittingModalContent = <p>Sending order data...</p>;

    const didSubmitModalContent = <>
        <p>Successfully sent the order!</p>
        <div className={classes.actions}><button className={classes.button} onClick={props.onClose}>Close</button></div>
    </>

    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    )
}

export default Cart