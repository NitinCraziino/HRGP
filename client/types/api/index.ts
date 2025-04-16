import { PostRoutes, PostRoutesWithParams } from "./PostRoutes";
import { GetRoutes, GetRoutesWithParams } from "./GetRoutes";
import { PutRoutes, PutRoutesWithParams } from "./PutRoutes";
import { DeleteRoutes, DeleteRoutesWithParams } from "./DeleteRoutes";
import { PatchRoutes, PatchRoutesWithParams } from "./PatchRoutes";

export enum StatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  TOKEN_EXPIRED = 498,
}

export type Params = Record<string, string>;

export interface PostParams {
  route: PostRoutes | PostRoutesWithParams;
  params?: Params;
  body?: Record<string, any>;
  url?: string;
}

export interface GetParams {
  route: GetRoutes | GetRoutesWithParams;
  params?: Params;
  url?: string;
}

export interface PutParams {
  route: PutRoutes | PutRoutesWithParams;
  params?: Params;
  body?: Record<string, any>;
  url?: string;
}

export interface DeleteParams {
  route: DeleteRoutes | DeleteRoutesWithParams;
  params?: Params;
  body?: Record<string, any>;
  url?: string;
}

export interface PatchParams {
  route: PatchRoutes | PatchRoutesWithParams;
  params?: Params;
  body?: Record<string, any>;
  url?: string;
}

export interface MessageResponse {
  message: string;
}
