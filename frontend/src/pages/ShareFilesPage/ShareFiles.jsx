import { CircularProgress } from '@mui/material';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { usePostUserDataMutation } from '../../apiServices/usersService';
import Check from '../../components/CheckBox/Check';
import {
  getFolderTree,
  getIsLoading,
  getSelectedUser,
} from './../../redux/folderTree/folderTreeSlice';

const ShareFiles = ({ treeData: treeDataFromProps = {} }) => {
  const treeData = useSelector(getFolderTree);
  const selectedUser = useSelector(getSelectedUser);
  const isLoading = useSelector(getIsLoading);

  const { id: userId } = useParams();

  const [postUserData, { isLoading: isPosting }] = usePostUserDataMutation();

  const sharedFileIds = useMemo(
    () => selectedUser?.userData?.sharedFileIds || [],
    [selectedUser?.userData?.sharedFileIds]
  );

  const formData = useMemo(
    () => Object.assign({}, ...sharedFileIds.map((id) => ({ [id]: true }))),
    [sharedFileIds]
  );

  const handleSubmit = async (selectedIds) => {
    try {
      await postUserData({
        userId,
        sharedFileIds: selectedIds,
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (!Object.keys(selectedUser).length)
    return <div className='ml-4 font-semibold text-lg'>Select User</div>;

  return (
    <div>
      <div className='ml-4 font-semibold text-lg'>
        {selectedUser.username} ({selectedUser.email})
        {(isLoading || isPosting) && (
          <CircularProgress thickness={5} size={20} />
        )}
      </div>
      <Check treeData={treeData} formData={formData} doSubmit={handleSubmit} />
    </div>
  );
};

export default ShareFiles;
