import React, { useState, useEffect } from 'react';
import Icon from 'react-icons-kit';
import { useDispatch } from 'react-redux';
import { setIsLoading } from '../../redux/folderTree/folderTreeSlice';
import { Icons } from '../Icons/Icons';

const ToggleList = ({
  icon,
  label,
  iconSize = 14,
  listItems = [],
  onItemClick = () => {},
  itemIcon,
  itemIconSize = 14,
  isLoading,
}) => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    dispatch(setIsLoading(isLoading));
  }, [dispatch, isLoading]);

  return (
    <div>
      <div
        onClick={() => setCollapsed((prev) => !prev)}
        className='select-none cursor-pointer flex-center justify-start'
      >
        {Icons[collapsed ? 'arrowRight' : 'arrowDown']}
        <Icon icon={icon} size={iconSize} className='mx-1 -mt-1' />
        <p>{label}</p>
      </div>
      <div
        style={{
          display: collapsed ? 'none' : 'flex',
          cursor: 'pointer',
          gap: 6,
          flexDirection: 'column',
        }}
      >
        {listItems.map((item) => (
          <div
            className='flex-center justify-start pl-9 gap-1'
            key={item._id}
            onClick={() => onItemClick(item)}
            title={item.email}
          >
            <Icon icon={itemIcon} size={itemIconSize} className='-mt-1' />
            <p>{item.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToggleList;
