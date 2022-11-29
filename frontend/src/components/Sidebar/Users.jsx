import React from 'react';
import { people } from 'react-icons-kit/iconic/people';
import { person } from 'react-icons-kit/iconic/person';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetAllUsersQuery } from '../../apiServices/usersService';
import { setSelectedUser } from '../../redux/folderTree/folderTreeSlice';
import ToggleList from './ToggleList';

const Users = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: users, isLoading, isFetching } = useGetAllUsersQuery('user');
  const handleClick = (user) => {
    dispatch(setSelectedUser(user));
    navigate(`share/${user._id}`);
  };
  return (
    <ToggleList
      icon={people}
      label='Users'
      listItems={users}
      itemIcon={person}
      onItemClick={handleClick}
      isLoading={isLoading || isFetching}
    />
  );
};

export default Users;
