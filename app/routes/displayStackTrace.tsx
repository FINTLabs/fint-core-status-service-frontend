import { useLocation } from "react-router-dom";
import {Box} from "@navikt/ds-react";

export default function DisplayStackTrace() {
  const location = useLocation();
  const stacktraceList = location.state as IStacktraceElement[];

  return (
    <Box borderRadius={"xlarge"} background={"bg-subtle"}>
      {stacktraceList?.map((item, index) => (
        <pre
          key={index}
          className="bg-gray-100 p-3 rounded max-w-full max-h-64 text-sm min-h-64 overflow-scroll"
        >
          {JSON.stringify(item, null, 2)}
        </pre>
      ))}
    </Box>
  );
}
