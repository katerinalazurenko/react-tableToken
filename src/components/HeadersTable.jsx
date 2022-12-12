import {useDispatch, useSelector} from "react-redux";
import {getFilters, getNames, getSort} from "../redux/selectors";
import classes from "./TokenTable.module.css";
import {StatusFilterList} from "./StatusFilterList";
import {TypeFilter} from "./TypeFilter";
import React from "react";
import {useState} from "react";
import {onFilter, onSort} from "../redux/tableReducer";

const Headers = ({h, name, sort, objFilters}) => {

    let [showStatusFilters, setShowStatusFilters] = useState(false);
    let [showTypeFilters, setShowTypeFilters] = useState(false);

    const dispatch = useDispatch()

    const filterTable = (e) => {
        setShowTypeFilters(false)
        setShowStatusFilters(false)
        const obj = {
            status: e.target.value === 'All' ? '' : e.target.name === 'statusFilter' ? e.target.value : objFilters.status,
            type: e.target.name === 'typeFilter' ? e.target.value : objFilters.type
        }
        dispatch(onFilter(obj))
    }

    const isVisibleStatusFilters = () => {
        setShowStatusFilters(!showStatusFilters)
    }

    const isVisibleTypeFilters = () => {
        setShowTypeFilters(true)
    }

    const onSortFields = (e) => {
        if(sort === e.target.textContent){
            dispatch(onSort(`-` + e.target.textContent))
        } else {
            dispatch(onSort(e.target.textContent))
        }
    }

    return <>
        {h[name] === 'Project' &&
            <div className={classes.field}>
                <span className={classes.withFilters} onClick={isVisibleStatusFilters}>&#9660;</span>
                {objFilters.status && <span className={classes.stateFilter}>{objFilters.status}</span>}
                {!objFilters.status && <span className={classes.stateFilter}>All</span>}
                <span onClick={onSortFields}>{h[name]}</span>
                {showStatusFilters && <StatusFilterList filterTable={filterTable} objFilters={objFilters}/>}
            </div>
        }
        {h[name] === 'Token type' &&
            <div className={classes.field}>
                {!showTypeFilters &&
                    <div>
                        <span className={classes.withFilters} onClick={isVisibleTypeFilters}>&#9660;</span>
                        {objFilters.type && <span className={classes.stateFilter}>{objFilters.type}</span>}
                        {!objFilters.type && <span className={classes.stateFilter}>All</span>}
                        <span onClick={onSortFields}>{h[name]}</span>
                    </div>
                }
                {showTypeFilters && <TypeFilter objFilters={objFilters} filterTable={filterTable}/>}
            </div>
        }
        {h[name] !== 'Token type' && h[name] !== 'Project' &&
            <div className={classes.field} onClick={onSortFields}>{h[name]}</div>
        }
    </>
}

export const HeadersTable = () => {
    const objFilters = useSelector(getFilters, (prev, next) => prev.status === next.status && prev.type === next.type)
    const sort = useSelector(getSort)
    const names = (useSelector(getNames))

    const headers = names.map((h) => {
        const key = Object.keys(h)
        return < Headers key={key} name={key} h = {h} sort={sort} objFilters={objFilters}/>
    })

    return <div className={`${classes.headers} ${classes.data}`} >{headers}</div>
}


