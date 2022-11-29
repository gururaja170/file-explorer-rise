import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import deepdash from 'deepdash';

deepdash(_);

const FolderCheckBox = React.memo(
  ({ data, checkboxData, onChange, hidden }) => {
    const isFile = !data.children && data.leaf;
    return (
      <div>
        <div className={hidden ? 'hidden' : ''}>
          {isFile ? (
            <div>
              <input
                name={data.id}
                type='checkbox'
                checked={checkboxData[data.id] || false}
                className='mb-3 cursor-pointer'
                onChange={onChange}
                id={data.id}
              />
              <label className='mx-2 cursor-pointer' htmlFor={data.id}>
                {data.module}
              </label>
            </div>
          ) : (
            <div className='text-emerald-600 font-semibold'>{data.module}</div>
          )}
        </div>

        {data.children &&
          data.children.map((elt) => (
            <div className='pl-3' key={elt.id}>
              <FolderCheckBox
                data={elt}
                checkboxData={checkboxData}
                onChange={onChange}
              />
            </div>
          ))}
      </div>
    );
  }
);

const Check = ({ doSubmit, treeData, formData }) => {
  const [checkboxData, setCheckboxData] = useState({});

  useEffect(() => {
    setCheckboxData((prev) => ({ ...formData }));
  }, [formData]);

  const onChange = ({ target }) => {
    setCheckboxData((prev) => ({ ...prev, [target.name]: target.checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allIds = [];
    Object.entries(checkboxData).forEach(([k, v]) => {
      if (v) {
        allIds.push(k);
      }
    });
    doSubmit(allIds);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FolderCheckBox
        data={treeData}
        checkboxData={checkboxData}
        onChange={onChange}
        hidden
      />

      <button
        type='submit'
        style={{ backgroundColor: 'powderblue' }}
        className='w-20'
      >
        Share
      </button>
    </form>
  );
};

export default React.memo(Check);
