/// <reference path="../types/ApiInterface.d.ts" />
/// <reference path="../types/ApiRequestModels.d.ts" />

import { Request, Response } from "express"
import { ApiMethods, ApisEnum, apisRootPath } from "../configs/Configs";
import { database } from "../src/Databases/Database";
import {AuthWrapperAction} from "../src/Utilities/AuthWrapper";

const name = ApisEnum.updateInventoryProduct;
const version = 0;
const description = "Update inventory product";

function Update(req: Request, res: Response): void {

    AuthWrapperAction(req, res, (req: Request, res: Response) => {
        const inventoryProduct = req.body as UpdateInventoryProductRequest;
        database.updateInventoryProduct(inventoryProduct.productId,inventoryProduct.attributes).then(() => {
            res.json({ success: true });
        });
    });
    
}

const UpdateInventoryProduct : ApiInterface = {
    name: name,
    version: version,
    description: description,
    type:ApiMethods.Post,
    url:  apisRootPath+version+"/"+name,

    execute: Update,
    onError: function (error: any): void {
        console.log(error);
    }
}

export default  UpdateInventoryProduct 