/// <reference path="../types/ApiInterface.d.ts" />
/// <reference path="../types/ApiRequestModels.d.ts" />

import { Request, Response } from "express"
import { ApiMethods, ApisEnum, apisRootPath } from "../configs/Configs";
import { database } from "../src/Databases/Database";
import {AuthWrapperAction} from "../src/Utilities/AuthWrapper";

const name = ApisEnum.unregisterInventoryProduct;
const version = 0;
const description = "unregister inventory product";

function UnregisterInventoryProduct(req: Request, res: Response): void {

    AuthWrapperAction(req, res, (req: Request, res: Response) => {
        const inventoryProduct = req.body as UnRegisterInventoryProductRequest;
        database.unregisterInventoryProduct(inventoryProduct.productId).then(() => {
            res.json({ success: true });
        });
    });
    
}

const UnRegisterInventoryProduct : ApiInterface = {
    name: name,
    version: version,
    description: description,
    type:ApiMethods.Post,
    url:  apisRootPath+version+"/"+name,

    execute: UnregisterInventoryProduct,
    onError: function (error: any): void {
        console.log(error);
    }
}

export default  UnRegisterInventoryProduct 