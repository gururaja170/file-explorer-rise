import React, { useState } from "react";
import { TileLayout } from "@progress/kendo-react-layout";

import ImagesAnalysed from "./ImagesAnalysed";
import ImagesNotAnalysed from "./ImagesNotAnalysed";
import Imgpie from "./pie";
import TotalViews from "./TotalViews";

import "@progress/kendo-theme-material/dist/all.css";

const initialPositions = [
  {
    col: 1,
    colSpan: 2,
    rowSpan: 2,
  },
  {
    col: 3,
    colSpan: 1,
    rowSpan: 1,
  },
  {
    col: 4,
    colSpan: 1,
    rowSpan: 1,
  },
  {
    col: 3,
    colSpan: 2,
    rowSpan: 2,
  },
];

const getPositions = (initialPositions) => {
  return (
    JSON.parse(localStorage.getItem("dashboard-positions")) || initialPositions
  );
};
const Chart = ({ content }) => {
  const [positions, setPositions] = useState(getPositions(initialPositions));

  const widgets = [
    {
      header: "Images Analyzed",
      body: <ImagesAnalysed />,
    },
    {
      header: "Images Not Analyzed",
      body: <ImagesNotAnalysed />,
    },
    {
      header: "Stats",
      body: <Imgpie />,
    },
    {
      header: "Categories",
      body: <TotalViews />,
    },
  ];

  const handleReposition = (e) => {
    setPositions(e.value);
    localStorage.setItem("dashboard-positions", JSON.stringify(e.value));
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <TileLayout
        className="tileLayout"
        columns={4}
        rowHeight={255}
        gap={{ rows: 10, columns: 10 }}
        positions={positions}
        items={widgets}
        onReposition={handleReposition}
      />
    </div>
  );
};

export default React.memo(Chart);
