import { type RouteConfig } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";

/**
 * We rely on filesystem routing under app/routes/*
 * Nothing else needed here; just export flatRoutes.
 */
export default flatRoutes() satisfies RouteConfig;
