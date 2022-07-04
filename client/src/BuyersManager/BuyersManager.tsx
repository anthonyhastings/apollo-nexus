import React, { useMemo, useState } from 'react';
import UpdateBuyerForm, { UpdateBuyerFormValues } from './UpdateForm';
import { useGetBuyersQuery, useUpdateBuyerMutation } from './api.generated';

const BuyersManager: React.FC = () => {
  const [selectedBuyerId, setSelectedBuyerId] = useState<string | undefined>();
  const [serverErrors, setServerErrors] = useState<string | undefined>();

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useGetBuyersQuery();

  const [updateBuyer, { loading: mutationLoading }] = useUpdateBuyerMutation();

  const selectedBuyer = useMemo(() => {
    return queryData?.getBuyers?.find((buyer) => buyer.id === selectedBuyerId);
  }, [queryData?.getBuyers, selectedBuyerId]);

  const formDefaultValues = useMemo(() => {
    return selectedBuyer
      ? {
          firstName: selectedBuyer?.firstName,
          lastName: selectedBuyer?.lastName,
        }
      : undefined;
  }, [selectedBuyer]);

  const onBuyerClick = (buyerId: string) => {
    setSelectedBuyerId(buyerId);
  };

  const onUpdateBuyerFormSubmit = async (
    formData: UpdateBuyerFormValues
  ): Promise<void> => {
    try {
      const response = await updateBuyer({
        variables: {
          updateBuyerInput: {
            id: selectedBuyerId!,
            firstName: formData.firstName,
            lastName: formData.lastName,
          },
        },
      });

      if (!response.data) {
        return;
      }

      if (response.data.updateBuyer.success) {
        setSelectedBuyerId(undefined);
        setServerErrors(undefined);
        return;
      }

      if (response.data.updateBuyer.userErrors.length > 0) {
        const errors = response.data.updateBuyer.userErrors.map((userError) => {
          switch (userError.__typename) {
            case 'FrozenRecordError': {
              return `${userError.message} (${userError.frozenFrom})`;
            }
            default: {
              return userError.message;
            }
          }
        });

        setServerErrors(errors.join(' - '));
      }
    } catch (err) {
      if (err instanceof Error) {
        setServerErrors(err.message);
      }
    }
  };

  if (queryError) {
    return <h2>Error: {queryError?.message}</h2>;
  }

  if (queryLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      {queryData?.getBuyers.map((buyer) => {
        return (
          <p key={buyer.id}>
            {buyer.firstName} {buyer.lastName} -{' '}
            <button onClick={() => onBuyerClick(buyer.id)}>Edit</button>
          </p>
        );
      })}

      {selectedBuyer && (
        <>
          <hr />
          <UpdateBuyerForm
            defaultValues={formDefaultValues}
            disabled={mutationLoading}
            onSubmit={onUpdateBuyerFormSubmit}
          />
          {serverErrors && (
            <strong style={{ color: 'red' }}>{serverErrors}</strong>
          )}
          <hr />
        </>
      )}
    </>
  );
};

export default BuyersManager;
