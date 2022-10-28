import * as React from 'react';
import { FieldErrorsImpl, useForm, UseFormRegister } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { trpc } from '@/utils/trpc';
import Layout from '@/layouts/index';
import FadeIn from '@/components/FadeIn';
import ModalLoader from '@/components/ModalLoader';
import Notification from '@/components/Notification';

const schema = z.object({
  productName: z.string().min(1, 'Please input product name!'),
  productPrice: z.preprocess(
    (input) => parseInt(input as string, 10),
    z.number({ invalid_type_error: 'Must input a price!' }).min(1, 'Please input price!'),
  ),
  productCategory: z.string().min(1, 'Please input product name!'),
});

type FormSchemaType = z.infer<typeof schema>;

interface InputWrapperProps {
  type?: string;
  label: string;
  property: keyof FormSchemaType;
  placeholder: string;
  register: UseFormRegister<FormSchemaType>;
  errors: Partial<FieldErrorsImpl<FormSchemaType>>;
}

const InputWrapper = ({ register, label, property, placeholder, errors, type = 'text' }: InputWrapperProps) => {
  return (
    <div className='flex flex-col space-y-1 text-md md:text-lg font-semibold font-raleway'>
      <label className='p-0'>{label} :</label>
      <input
        {...register(property)}
        type={type}
        className={`p-2 bg-gray-700 rounded-sm transition-[outline] outline-none duration-500 focus:outline-1 focus:outline-blue-500 hover:outline-blue-400 ${
          errors[property] ? 'border border-red-500' : ''
        }`}
        placeholder={placeholder}
      />
      {errors[property] ? <FadeIn cssText='font-raleway text-red-500'>{errors[property]?.message}</FadeIn> : ''}
    </div>
  );
};

export default function CreateProduct() {
  const { mutate, isLoading, isSuccess, isError } = trpc.useMutation('product.create');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(schema),
  });

  const createProduct = (formData: FormSchemaType) => {
    mutate(formData, {
      onSuccess() {
        reset();
      },
      onError(err) {
        console.log(err);
      },
    });
  };

  return (
    <Layout>
      <ModalLoader open={isLoading}>Saving Product ...</ModalLoader>
      <h1 className='text-3xl md:text-4xl font-comfortaa font-bold'>Create Product</h1>
      <br />
      <form
        className='flex flex-col space-y-4 md:w-[40%] bg-slate-200 p-8 rounded-md shadow-md overflow-hidden'
        onSubmit={handleSubmit(createProduct)}
      >
        {isSuccess ? <Notification rounded='sm' type='success' message='Product Saved' /> : ''}
        {isError ? <Notification rounded='sm' type='error' message='Something went wrong' /> : ''}
        <InputWrapper
          register={register}
          errors={errors}
          label='Product Name'
          property='productName'
          placeholder='enter product name here'
        />

        <InputWrapper
          register={register}
          type='number'
          errors={errors}
          label='Product Price'
          property='productPrice'
          placeholder='enter product price here'
        />

        <InputWrapper
          register={register}
          errors={errors}
          label='Product Category'
          property='productCategory'
          placeholder='enter product category here'
        />
        <br />

        <button
          type='submit'
          className='p-2 rounded-sm font-comfortaa transition-colors duration-500 bg-blue-600 hover:bg-blue-400'
        >
          SUBMIT
        </button>
      </form>
    </Layout>
  );
}
