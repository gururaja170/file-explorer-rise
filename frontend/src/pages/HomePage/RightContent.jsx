import React, { useState } from 'react';
import Card from '../../components/Card/Card';
// import ipImg from "../../images/cardIp.png";
import './InputText.css';
import StorageUnit from './StorageUnit';
const RightContent = ({ content = {} }) => {
  function TextInput({ type = 'text', label }) {
    const [value, setValue] = useState('');

    function handleChange(e) {
      setValue(e.target.value);
    }
    return (
      <div className='input-container'>
        <input type={type} value={value} onChange={handleChange} />
        <label className={value && 'filled'}>{label}</label>
      </div>
    );
  }

  const handleUploadChange = (e) => {
    // console.log(e.target.files)
    const files = e.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    // reader.onload(e) => {}
  };

  return (
    <div
      className='mt-4 ml-10'
      style={{
        display: 'block',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {content.module === 'Storage Unit' && (
        <StorageUnit handleUploadChange={handleUploadChange} />
      )}
      {/* <pre>{JSON.stringify(content, undefined, 4)}</pre> */}
      {content.module !== ['Administrator', 'Storage Unit'] && (
        <Card className='d-flex mx-4'>
          <div
            className='h-[80vh] w-[40vw] flex-col-center gap-10 d-block'
            style={{ backgroundColor: 'black' }}
          >
            <p style={{ color: 'white' }}>{content.module}</p>
            <form>
              <TextInput label='IP Address' />
              <TextInput label='Instrument Model' />
              <TextInput label='Default Gateway' />
            </form>
            <p style={{ color: 'white' }}>
              Status: <b style={{ color: 'green' }}>Active</b>
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default RightContent;
