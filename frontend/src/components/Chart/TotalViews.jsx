import React from "react";

const imgViews = [
  {
    id: 1,
    name: "Images Uploaded for CNT",
    count: 60,
  },
  {
    id: 2,
    name: "Images Analysed for CNT",
    count: 50,
  },
  {
    id: 3,
    name: "Images Uploaded for Mitochondria",
    count: 80,
  },
  {
    id: 4,
    name: "Images Analysed for Mitochondria",
    count: 65,
  },
];

const TotalViews = (props) => {
  return (
    <div className="">
      <ul className="totalJobViewsGrid">
        {imgViews.map((img) => {
          return (
            <li className="imgViewsBlock" key={img.id}>
              <span className="imgTitle">{img.name}</span>

              <div className="imgViewsContainer">
                <span className="imgViews">{img.count}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TotalViews;
