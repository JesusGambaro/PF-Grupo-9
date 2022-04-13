import {
    BRING_ALL_DATA,
    ORDER_NAME,
    ORDER_PRICE,
    bringAllData
} from "../actions/action"

const initialState = { 
    allData:[],
    filtereds:[],
    detail:{},
}

export default function rootReducer(state = initialState, action){
    switch(action.type){
        case BRING_ALL_DATA:
            return{
                ...state,
                allData:action.payload,
            }

        case ORDER_NAME:
        case ORDER_NAME:
    }
}