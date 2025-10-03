import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("adaptere", "routes/adaptere.tsx"),
  route("adaptere/:adapterId", "routes/adaptere.$adapterId.tsx"),
  route("adaptere/:adapterId/:componentId", "routes/adaptere.$adapterId.$componentId.tsx"),
  route("hendelser", "routes/hendelser.tsx")
] satisfies RouteConfig;
