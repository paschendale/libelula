import { Box, IconButton } from "@chakra-ui/react";
import { useApp } from "../providers/AppProvider";

export default function Details() {
  const { viewMetadata, setViewMetadata } = useApp();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
        "@media (max-width: 768px)": {
          flexDirection: "column",
        },
      }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconButton
          aria-label="Close"
          variant={"ghost"}
          size={"sm"}
          sx={{
            "@media (max-width: 768px)": {
              transform: "rotate(90deg)",
            },
          }}
          onClick={() =>
            setViewMetadata({ ...viewMetadata, details: undefined })
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="m190.06 414l163.12-139.78a24 24 0 0 0 0-36.44L190.06 98c-15.57-13.34-39.62-2.28-39.62 18.22v279.6c0 20.5 24.05 31.56 39.62 18.18"
            />
          </svg>
        </IconButton>
      </Box>
      <Box
        sx={{
          padding: 3,
          textAlign: "left",
          lineHeight: "1.2",
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
        }}
      >
        {viewMetadata.details &&
          Object.keys(viewMetadata.details?.properties as {[key: string]: any}).map((key, i) => (
            <div key={i}>
              <strong>{key}</strong>: {viewMetadata.details?.properties![key]}
            </div>
          ))}
      </Box>
    </Box>
  );
}
