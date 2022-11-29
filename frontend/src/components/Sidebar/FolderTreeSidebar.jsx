import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedNode } from '../../redux/folderTree/folderTreeSlice';

const FolderTreeSidebar = ({ isLoggedIn: userData, treeData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNodeClick = (node) => {
    if (!node.isFile) {
      if (node.module === 'Administrator') {
        navigate('/admin');
        return;
      } else {
        navigate(`/`);
        return;
      }
    } else {
      dispatch(setSelectedNode(node));
      navigate('/');
    }
  };

  return (
    <Sidebar
      handleClick={handleNodeClick}
      treeData={treeData}
      isAdmin={userData.role === 'admin'}
    />
  );
};

export default FolderTreeSidebar;
