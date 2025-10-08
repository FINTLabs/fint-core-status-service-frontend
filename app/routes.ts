import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("adaptere", "routes/adapterStatus.tsx"),
  route("adaptere/:adapterId", "routes/adapterStatus.$adapterId.tsx"),
  route("adaptere/:adapterId/:componentId", "routes/adapterStatus.$adapterId.$componentId.tsx"),
  route("hendelser", "routes/events.tsx"),
] satisfies RouteConfig;
