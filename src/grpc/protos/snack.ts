/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "Snack";

export interface SnackById {
  id: number;
}

export interface Snack {
  id: number;
  name: string;
}

export const SNACK_PACKAGE_NAME = "Snack";

export interface SnacksServiceClient {
  findOne(request: SnackById): Observable<Snack>;
}

export interface SnacksServiceController {
  findOne(request: SnackById): Promise<Snack> | Observable<Snack> | Snack;
}

export function SnacksServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findOne"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("SnacksService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("SnacksService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const SNACKS_SERVICE_NAME = "SnacksService";
