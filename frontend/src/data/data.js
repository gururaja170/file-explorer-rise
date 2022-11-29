export const treeData = {
  module: "Administrator",
  id: "root-0",
  children: [
    {
      id: "root-1",
      module: "Instruments",
      collapsed: true,
      children: [
        {
          id: "0",
          module: "SEM-1",
          leaf: true,
          status: "Active",
        },
        {
          id: "1",
          module: "SEM-2",
          leaf: true,
          status: "Inactive",
        },
      ],
    },
    {
      id: "root-2",
      module: "Storage",
      collapsed: true,
      children: [
        {
          id: "2",
          module: "AWS-S3 1",
          leaf: true,
          status: "Active",
        },
        {
          id: "3",
          module: "AWS-S3 2",
          leaf: true,
          status: "Active",
        },
      ],
    },
    {
      id: "root-3",
      module: "Projects",
      collapsed: true,
      children: [
        {
          id: "4",
          module: "CNT",
          leaf: true,
          children: [
            {
              id: "5",
              module: "Storage Unit",
              leaf: true,
            },
          ],
        },
        {
          id: "6",
          module: "Mitochondria",
          leaf: true,
          children: [
            {
              id: "7",
              module: "Storage Unit",
              leaf: true,
            },
          ],
        },
      ],
    },
  ],
};

export const treeCheckboxData = {};

treeData.children.forEach((item) =>
  item.children.forEach((obj) => (treeCheckboxData[obj.id] = false))
);
