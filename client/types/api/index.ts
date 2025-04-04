import { PostRoutes, PostRoutesWithParams } from "./PostRoutes";
import { GetRoutes, GetRoutesWithParams } from "./GetRoutes";
import { PutRoutes, PutRoutesWithParams } from "./PutRoutes";
import { DeleteRoutes, DeleteRoutesWithParams } from "./DeleteRoutes";
import { PatchRoutes, PatchRoutesWithParams } from "./PatchRoutes";

export interface PostParams {
    route: PostRoutes | PostRoutesWithParams;
    params?: Record<string, string>;
    body?: Record<string, any>;
};

export interface GetParams {
    route: GetRoutes | GetRoutesWithParams;
    params?: Record<string, string>;
};

export interface PutParams {
    route: PutRoutes | PutRoutesWithParams;
    params?: Record<string, string>;
    body?: Record<string, any>;
};

export interface DeleteParams {
    route: DeleteRoutes | DeleteRoutesWithParams;
    params?: Record<string, string>;
    body?: Record<string, any>;
};

export interface PatchParams {
    route: PatchRoutes | PatchRoutesWithParams;
    params?: Record<string, string>;
    body?: Record<string, any>;
};

export interface MessageResponse {
    message: string;
}