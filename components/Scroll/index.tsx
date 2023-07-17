import React from "react";

interface ScrollViewProps {
  height: string | number;
  children: React.ReactNode;
}

export const ScrollView = ({ height, children }: ScrollViewProps) => {
  return (
    <div
      style={{
        height,
        width: "100%",
        overflowY: "auto",
        position: "relative",
        overflowX: "hidden",
        paddingBottom: 4,
        borderBottom: "1px solid grey",
        scrollbarColor: "grey",
      }}
    >
      {children}
    </div>
  );
};
