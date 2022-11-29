import React from 'react';
import { user } from 'react-icons-kit/ikons/user';
import { users } from 'react-icons-kit/ikons/users';
import { useDispatch } from 'react-redux';
import { useGetAllUsersQuery } from '../../apiServices/usersService';
import { setSelectedUser } from '../../redux/folderTree/folderTreeSlice';
import ToggleList from './ToggleList';
import { useNavigate } from 'react-router-dom';

const Researchers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: researchers,
    isLoading,
    isFetching,
  } = useGetAllUsersQuery('researcher');
  const handleClick = (user) => {
    dispatch(setSelectedUser(user));
    navigate(`share/${user._id}`);
  };
  return (
    <ToggleList
      icon={users}
      label='Researchers'
      iconSize={17}
      listItems={researchers}
      itemIcon={user}
      onItemClick={handleClick}
      isLoading={isLoading || isFetching}
    />
  );
};

export default Researchers;
