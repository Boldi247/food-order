import React, { useContext, useEffect, useState } from 'react'

import CartIcon from '../Cart/CartIcon'

import classes from './HeaderCartButton.module.css'

import cartContext from '../../store/cart-context'

const HeaderCartButton = (props) => {

    const [buttonIsHighlighted, setButtonIsHighlighted] = useState(false);

    const cartCtx = useContext(cartContext);
    const { items } = cartCtx;

    const numberOfCartItems = items.reduce((currentNumber, item) => {
        return (currentNumber + item.amount);
    }, 0);


    const btnClasses = `${classes.button} ${buttonIsHighlighted ? classes.bump : ''}`;

    useEffect(() => {
        if (items.length === 0) { return; }
        setButtonIsHighlighted(true);

        const timer = setTimeout(() => {
            setButtonIsHighlighted(false);
        }, 300);

        return () => { clearTimeout(timer); };
    }, [items]);

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}><CartIcon /></span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )
}

export default HeaderCartButton