import React, { useState } from 'react';
import BasicRoutes from './Routes/BasicRoutes';

import './App.css';
import { getUser } from './utils/auth';
import FolderTreeSidebar from './components/Sidebar/FolderTreeSidebar';
import { useGetFolderTreeQuery } from './apiServices/treeService';
import _ from 'lodash';
import { useMemo } from 'react';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(getUser());

  const { data } = useGetFolderTreeQuery(isLoggedIn._id, { skip: !isLoggedIn });
  const treeData = useMemo(() => _.cloneDeep(data), [data]);

  const loginProps = {
    isLoggedIn,
    setIsLoggedIn,
    treeData,
  };

  return (
    <div>
      <div className='relative'>
        {isLoggedIn && (
          <div className='fixed'>
            <FolderTreeSidebar isLoggedIn={isLoggedIn} treeData={treeData} />
          </div>
        )}
        <div className={isLoggedIn ? 'ml-[250px]' : ''}>
          <BasicRoutes loginProps={loginProps} />
        </div>
      </div>
    </div>
  );
};

export default App;
