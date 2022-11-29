import Joi from 'joi';
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '../../../components/Card/Card';
import Input from '../../../components/Input/Input';
import Dropdown from '../../../components/Dropdown/Dropdown';
import { Alert, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';

const AuthenticationPage = ({
  isLoggedIn,
  formLabel,
  formData,
  buttonLabel,
  redirectURL,
  redirectURLLabel,
  joiSchema,
  onError = () => {},
  doSubmit = () => {},
  errorMsg = '',
  showErrorMsg = false,
}) => {
  const [formState, setFormState] = useState(formData?.state);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(errorMsg);

  useEffect(() => {
    setError(errorMsg);
  }, [errorMsg]);

  useEffect(() => {
    setOpen(showErrorMsg);
  }, [showErrorMsg]);

  const handleChange = ({ target }) => {
    setFormState((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (joiSchema) {
      const schema = Joi.object(joiSchema);
      const { error } = schema.validate(formState);
      if (error) {
        setOpen(true);
        setError(error.message);
        return onError(error);
      }
    }
    // if success
    doSubmit(formState);
  };

  if (isLoggedIn) {
    return <Navigate to='/' replace={true} />;
  }

  return (
    <div className='center-screen'>
      <Card>
        <div className='h-[80vh] w-[40vw] flex-col-center gap-10'>
          <Collapse in={open}>
            <Alert
              severity='error'
              action={
                <IconButton
                  aria-label='close'
                  color='inherit'
                  size='small'
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize='inherit' />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {error}
            </Alert>
          </Collapse>
          <p className='font-bold text-3xl'>{formLabel}</p>
          <form
            className='flex-col-center gap-5 w-11/12 -mt-24'
            onSubmit={handleSubmit}
          >
            {formData?.inputFields?.map(({ id, label, type, required }) => (
              <Input
                key={id}
                id={id}
                label={label}
                value={formState[id]}
                type={type}
                required={required || false}
                onChange={handleChange}
              />
            ))}
            <div className='mt-2 w-full'>
              {formData?.dropdownFields?.map(
                ({ id, label, options, width, required }) => (
                  <Dropdown
                    key={id}
                    id={id}
                    label={label}
                    options={options}
                    width={width}
                    value={formState[id]}
                    required={required || false}
                    onChange={handleChange}
                  />
                )
              )}
            </div>
            <Button
              variant='contained'
              fullWidth
              sx={{ mt: 5, textTransform: 'none' }}
              type='submit'
              color='info'
            >
              {buttonLabel}
            </Button>
            <Link
              className='text-blue-600 underline underline-offset-4'
              to={redirectURL}
            >
              {redirectURLLabel}
            </Link>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default AuthenticationPage;
