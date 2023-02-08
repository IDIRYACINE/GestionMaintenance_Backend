/// <reference path="./Database.d.ts" />


interface RegisterInventoryProductRequest {
    product : InventoryProduct
}

interface UnRegisterInventoryProductRequest {
    productId : number
}

interface UpdateInventoryProductRequest {
    productId : number,
    attributes : AttributesWrapper[]
}

interface SearchInventoryProductRequest{
    attributes : AttributesWrapper[],
    isAdmin : boolean,
    permissions : Array<number>,

}

interface SearchInventoryProductResponse{
    products : InventoryProduct[]
}