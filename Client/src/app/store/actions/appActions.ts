import { Action } from '@ngrx/store';

export enum quantityActionType{
    GET_BRANDS= '[number] Get Brands Numbers',
    ADD_BRAND= '[number] Add Number',
    REMOVE_BRAND = '[number] Remove Number'
}


export class AddNumber implements Action{
    readonly type= quantityActionType.ADD_BRAND;
    constructor() {}
}

export class GetNumber implements Action{
    readonly type= quantityActionType.GET_BRANDS;
    constructor(public payload: any) {}
}

export class RemoveNumber implements Action{
    readonly type= quantityActionType.REMOVE_BRAND;
    constructor() {}
}

export type Action = AddNumber | RemoveNumber | GetNumber ;

// export const ACTION_ADD_NUMBER ="number"
