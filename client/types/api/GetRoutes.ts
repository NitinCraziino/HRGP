export enum GetRoutes {
    GetUser = "/user",
    GetAddress = "/address",
    GetPaymentMethods = "/payment",
}

export enum GetRoutesWithParams {
    // ! @params: postalCode: string 
    GetAddress = "/address",
}
