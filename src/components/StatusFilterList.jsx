import classes from "./TokenTable.module.css";
import {useSelector} from "react-redux";
import {getStatuses} from "../redux/selectors";

const StatusFilterItem = ({filterName, filterTable, objFilters}) => {
    return <>
        <label className={classes.filterItem} htmlFor='statusFilter'>
            <input type='radio' name='statusFilter' value={filterName} checked={filterName===objFilters.status} onChange={filterTable}/>{filterName}
        </label>
    </>};


export const StatusFilterList = ({filterTable, objFilters}) => {

    let filtersForStatus = useSelector(getStatuses).map( (item,idx) => <StatusFilterItem
        key={item}
        objFilters={objFilters}
        filterTable={filterTable}
        filterName={item}/>
    );

    return <div className={classes.statusFilter}>
        <label className={classes.filterItem} htmlFor='statusFilter'>
            <input type='radio' name='statusFilter' value='All' checked={!objFilters.status} onChange={filterTable}/>All
        </label>
        {filtersForStatus}
    </div>}