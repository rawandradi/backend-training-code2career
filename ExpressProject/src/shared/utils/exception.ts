import type { Response } from "express";
import { ModuleNameType } from "./constants";
import { ErrorStatusCode } from "./util.types";

export class CustomError extends Error {
public errorType = 'custom';
constructor(
    msg: string,
    public moduleName : ModuleNameType,
    public StatusCode : ErrorStatusCode 
){
    super(msg)
}
}
