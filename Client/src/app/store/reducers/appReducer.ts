import { Action, quantityActionType } from '../actions/appActions'
// import { Action } from 'rxjs/internal/scheduler/Action';


export interface NumberState{
    Number : number
    // login: boolean
}

 const initalState: NumberState ={
    Number :0
    // login: false
    
} 


export const reducer: (state: NumberState, action: Action)=>NumberState =
(state = initalState, action: Action) =>{
    switch (action.type) {
        case quantityActionType.GET_BRANDS:
            return { ...state, Number:action.payload.Number };
        case quantityActionType.ADD_BRAND:
            return { ...state, Number:state.Number + 1 };
        case quantityActionType.REMOVE_BRAND:
            return { ...state, Number:state.Number - 1 };

            default:
                return state;
    }
    
}








// export function reducer (state = initalState ,action) :NumberState{
    // switch(action.type){
    //     case ACTION_ADD_NUMBER:
    //         return{
    //          ...state,
    //          login:true,
             
                

    //         }

            // switch (action.type) {
            //     case quantityActionType.ADD_BRAND:
            //         return { ...state, state.Number + 1 };
            //     case quantityActionType.REMOVE_BRAND:
            //         return { ...state, state.Number - 1 };

            //         default:
            //             return state;
            // }
     
    // };

