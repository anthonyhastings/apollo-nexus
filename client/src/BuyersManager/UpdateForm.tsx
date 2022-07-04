import React, { useEffect, useState } from 'react';

export interface UpdateBuyerFormValues {
  firstName: string;
  lastName: string;
}

interface UpdateBuyerFormProps {
  defaultValues: UpdateBuyerFormValues | undefined;
  disabled?: boolean;
  onSubmit: (formData: UpdateBuyerFormValues) => Promise<void>;
}

const UpdateBuyerForm: React.FC<UpdateBuyerFormProps> = ({
  defaultValues = { firstName: '', lastName: '' },
  disabled = false,
  onSubmit,
}) => {
  const [firstNameInput, setFirstNameInput] = useState(defaultValues.firstName);
  const [lastNameInput, setLastNameInput] = useState(defaultValues.lastName);

  const onFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstNameInput(e.target.value);
  };

  const onLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastNameInput(e.target.value);
  };

  const onFormSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    onSubmit({
      firstName: firstNameInput,
      lastName: lastNameInput,
    });
  };

  useEffect(() => {
    setFirstNameInput(defaultValues.firstName);
    setLastNameInput(defaultValues.lastName);
  }, [defaultValues]);

  return (
    <form onSubmit={onFormSubmit}>
      <label>
        First Name:{' '}
        <input
          type="text"
          name="firstName"
          value={firstNameInput}
          onChange={onFirstNameChange}
        />
      </label>
      <br />
      <label>
        Last Name:{' '}
        <input
          type="text"
          name="lastName"
          value={lastNameInput}
          onChange={onLastNameChange}
        />
      </label>
      <br />
      <button type="submit" disabled={disabled}>
        Submit
      </button>
    </form>
  );
};

export default UpdateBuyerForm;
