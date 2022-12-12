import React, {useState} from "react";
import classes from "./TokenTable.module.css";

export const TypeFilter = ({objFilters, filterTable}) => {
    let [filterType, setFilterType] = useState(objFilters.type);

    const onChangeTypeFilter = (e) => {
        setFilterType(e.currentTarget.value)
    }

    return <>
        <label htmlFor='typeFilter'>
            <input className={classes.typeFilter}
                   name='typeFilter'
                   value={filterType}
                   onChange={onChangeTypeFilter}
                   onBlur={filterTable}
                   type="text"/>
        </label>
    </>
}