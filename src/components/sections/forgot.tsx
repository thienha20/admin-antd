'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Input, message, Modal } from 'antd';
import { MailOutlined } from '@ant-design/icons';

interface ForgotProp {
  isModalOpen: boolean;
  setIsModalOpen: (bol: boolean) => void;
}

const ForgotSchema = z.object({
  email: z.email('Nhập đúng email để phục hồi mật khẩu'),
});

type ForgotSchemaType = z.infer<typeof ForgotSchema>;

export const Forgot = (prop: ForgotProp) => {
  const {isModalOpen, setIsModalOpen} = prop;
  const {
    reset,
    control,
    handleSubmit,
    formState: {isSubmitting, errors},
  } = useForm<ForgotSchemaType>({
    resolver: zodResolver(ForgotSchema),
    defaultValues: {
      email: '',
    },
  });

  const handleForgotPassword = async (data: ForgotSchemaType) => {
    console.log(data);
    await new Promise(resolve => setTimeout(resolve, 1500));
    message.success('Liên kết đặt lại mật khẩu đã được gửi đến email! Vui lòng kiểm tra hòm thư của bạn', 10);
    reset();
    setIsModalOpen(false);
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return <Modal
    title="Quên mật khẩu"
    open={isModalOpen}
    onCancel={() => setIsModalOpen(false)}
    onOk={handleSubmit(handleForgotPassword)}
    okText="Gửi"
    cancelText="Hủy"
    centered
    confirmLoading={isSubmitting}
  >
    <label htmlFor="reset-email" style={{display: 'block', marginBottom: 8}}>
      Nhập email để đặt lại mật khẩu
    </label>
    <Controller
      name="email"
      control={control}
      render={({field}) => (
        <Input
          {...field}
          type={'email'}
          id={'reset-email'}
          size="large"
          prefix={<MailOutlined/>}
          placeholder="Email đăng nhập"
          status={errors.email ? 'error' : ''}
        />
      )}
    />
    {errors.email && (
      <div style={{color: '#ff4d4f', marginTop: 4}}>
        {errors.email.message}
      </div>
    )}
  </Modal>;
};