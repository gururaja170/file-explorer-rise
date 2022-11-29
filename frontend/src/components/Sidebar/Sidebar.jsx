import { Button } from '@mui/material';
import React from 'react';
import { logout } from '../../utils/auth';

import FolderTree from '../FolderTree/FolderTree';
import Researchers from './Researchers';
import Users from './Users';

const Sidebar = ({
  handleClick,
  treeData,
  isAdmin = false,
  errorMsg = 'Provide treeData',
  disableRightClick = false,
  disableFileAndFolderAddition = false,
}) => {
  return (
    <div className='sidebar sticky top-0'>
      <div style={{ paddingBottom: '40px' }}>
        <div className='folderTree'>
          <FolderTree
            treeData={treeData}
            handleClick={handleClick}
            isAdmin={isAdmin}
            errorMsg={errorMsg}
            disableRightClick={disableRightClick}
            disableFileAndFolderAddition={disableFileAndFolderAddition}
          />
          {isAdmin ? (
            <div className='mt-5 flex-col-center gap-4 items-start'>
              <Users />
              <Researchers />
            </div>
          ) : null}
        </div>
        <Button
          variant='outlined'
          color='warning'
          size='small'
          onClick={() => logout()}
          sx={{
            textTransform: 'none',
            bottom: 10,
            left: 10,
            position: 'absolute',
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};
export default Sidebar;
