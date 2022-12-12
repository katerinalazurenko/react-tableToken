const ON_SORT = 'TABLE::ON_SORT';
const ON_FILTER = 'TABLE::ON_FILTER';
const ON_BUY = 'TABLE::ON_BUY';

let initialState = {
    items: [
        {
            id: 1,
            name: 'Pyshky.net',
            status: 'green',
            type: 'TRST',
            conditions: 'x2,6 months',
            volume: 120000,
            roi: 4,
            free: 20,
            hedge: 20
        },
        {
            id: 2,
            name: 'NFT-Flowershop',
            status: 'yellow',
            type: 'THT',
            conditions: 'x4,2 years',
            volume: 80000,
            roi: 23,
            free: 12,
            hedge: 0
        },
        {
            id: 3 ,
            name: 'Tokenhunt.club',
            status: 'green',
            type: 'TNC',
            conditions: 'x2,1 years',
            volume: 120000,
            roi: 23,
            free: 2,
            hedge: 20
        },
        {
            id: 4,
            name: 'Web3 P2P University',
            status: 'red',
            type: 'TRST',
            conditions: 'x2,1 years',
            volume: 200000,
            roi: 6,
            free: 1,
            hedge: 0
        },
    ],
    filters: {
        status: '',
        type: ''
    },
    sort: '',
    names: [
        {name: 'Project'},
        {type: 'Token type'},
        {conditions: 'Conditions'},
        {volume: 'Volume'},
        {roi: 'ROI'},
        {free: 'Free float'},
        {hedge: 'Insurance hedge'}
    ],
    shoppingCart: []
};

const tableReducer = (state = initialState, action) => {

    switch (action.type) {
        case ON_SORT: {
            const name = Object.keys(state.names.find(item => Object.keys(item).find(key => item[key] === (action.field.replace(/-/,'')))))
            return {
                ...state,
                sort: action.field,
                items: action.field.search(/-/g)
                    ? [...state.items].sort (( a , b )=> a[name] > b[name] ? 1 : -1 )
                    : [...state.items].sort (( a , b )=> b[name] > a[name] ? 1 : -1 )
            }
        }
        case ON_FILTER: {
            return {
                ...state,
                filters: {...state.filters, status: action.filters.status, type: action.filters.type}
            }
        }
        case ON_BUY: {
            return {
                ...state,
                shoppingCart: [...state.shoppingCart, state.items[action.id]]
            };
        }
        default:
            return state;
    }
}

export const onSort = (field) => ({type: ON_SORT, field})
export const onFilter = (filters) => ({type: ON_FILTER, filters})
export const onBuy = (id) => ({type: ON_BUY, id})


export default tableReducer;