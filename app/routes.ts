import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("adaptere", "routes/adapter.tsx"),
  route("adaptere/:adapterId", "routes/adapter.$adapterId.tsx"),
  route("adaptere/:adapterId/:componentId", "routes/adapter.$adapterId.$componentId.tsx"),
  route("hendelser", "routes/events.tsx"),
  route("sync", "routes/sync.tsx"),
] satisfies RouteConfig;
