import React from "react";
import { Cross2Icon } from "@radix-ui/react-icons";

export const TeamButton = ({
  onClick,
  color,
  team,
  includeClose = false,
  style = {},
}: {
  onClick: () => void;
  color: string;
  team: string;
  style?: React.CSSProperties;
  includeClose?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: ".25em 1em",
        borderRadius: "100px",
        display: "flex",
        gap: 8,
        fontSize: ".75rem",
        alignItems: "center",
        border: includeClose ? "1px solid #ccc" : "",
        ...style,
      }}
    >
      <span
        style={{
          display: "flex",
          gap: 8,
          color,
          alignItems: "center",
        }}
      >
        {team}
        <div
          style={{
            width: 8,
            height: 8,
            background: "currentColor",
            borderRadius: "50%",
          }}
        />
      </span>
      {includeClose && <Cross2Icon width={10} height={10} />}
    </button>
  );
};
