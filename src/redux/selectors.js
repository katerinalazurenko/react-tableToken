import {createSelector} from "@reduxjs/toolkit";

export const getItems = (state) => {
    return state.table.items
};

export const getFilters = (state) => {
    return state.table.filters
};

export const getNames = (state) => {
    return state.table.names
};

export const getSort = (state) => {
    return state.table.sort
};

export const getStatuses = createSelector(getItems,
    (items) => {
        return items.map((item) => item.status).reduce((result, item) => {
            return result.includes(item) ? result : [...result, item];
        }, []);
    })

export const getItemsActual = createSelector(getItems, getFilters,
    (items, filters) => {
    if(!filters.type && !filters.status){
        return items
    } else {
        const filteredStatus = items.filter(i => i.status === filters.status && filters.status)
        const filteredType = items.filter(i => i.type === filters.type && filters.type)
        if(!filters.status || !filters.type) {
            return [...filteredStatus, ...filteredType]
        } else {
        const arr = [...filteredStatus, ...filteredType].reduce((result, obj) => {
            if(obj.status === filters.status && obj.type === filters.type){
                if(!result.find(i => i.id === obj.id)){
                    result.push(obj)
                }
            }
            return result
        }, []);
        return arr
    }}
    })


