import {useDispatch, useSelector} from "react-redux";
import {getItemsActual} from "../redux/selectors";
import {HeadersTable} from "./HeadersTable";
import classes from "./TokenTable.module.css";
import classNames from 'classnames/bind';
import React from 'react';
import {onBuy} from "../redux/tableReducer";
import {NavLink} from "react-router-dom";

let cn = classNames.bind(classes);

export const TokenTable = () => {

    const dispatch = useDispatch()

    const BuyItem = (e) => {
        dispatch(onBuy(e.target.id))
    }

    const items = useSelector(getItemsActual).map((item) => {
        return <NavLink key={item.id} to={`/project/${item.id}`}>
            <ul className={cn(`data`, `${item.status}`)}>
                <li><span className={cn(`point`, `${item.status}Point`)}></span>{item.name}</li>
                <li>{item.type}</li>
                <li>{item.conditions}</li>
                <li>$ {item.volume}</li>
                <li>{item.roi} %</li>
                <li>{item.free}</li>
                <li>{item.hedge} %</li>
                <li className={classes.withButton}>
                    <button id={item.id} onClick={BuyItem}>Buy</button>
                </li>
            </ul>
        </NavLink>
    });

    return (
        <div className={classes.table}>
            <HeadersTable/>
            {items}
        </div>
    )
}