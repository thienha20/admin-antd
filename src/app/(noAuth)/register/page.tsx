'use client';

import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  PhoneOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Button, Card, Input, message } from 'antd';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

const RegisterSchema = z.object({
  name: z.string().min(2, 'Tên không được để trống'),
  email: z.string().email('Email không hợp lệ'),
  phone: z
    .string()
    .min(8, 'Số điện thoại không hợp lệ')
    .regex(/^(\+?\d{8,15})$/, 'Số điện thoại không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu tối thiểu 6 ký tự'),
});

type RegisterFormType = z.infer<typeof RegisterSchema>;

export default function RegisterPage() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
    },
  });

  const handleRegister = async (data: RegisterFormType) => {
    console.log('Đăng ký với:', data);
    await new Promise((r) => setTimeout(r, 1500));
    message.success('Đăng ký thành công!');
    reset(); // Xoá form sau khi thành công
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        background: 'linear-gradient(to right, #f0f2f5, #e6f7ff)',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <Card
        style={{
          maxWidth: 420,
          width: '100%',
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        }}
        styles={{ body: { padding: 32 } }}
      >
        <div style={{ textAlign: 'center', paddingBottom: 8 }}>
          <SettingOutlined style={{ fontSize: 32, color: '#1677ff' }} />
          <div
            style={{
              fontSize: '28px',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #1677ff, #13c2c2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Đăng ký tài khoản
          </div>
        </div>

        <form onSubmit={handleSubmit(handleRegister)} noValidate>
          {/* Name */}
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="name">Họ và tên</label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="name"
                  size="large"
                  prefix={<UserOutlined />}
                  placeholder="Nhập họ tên"
                  status={errors.name ? 'error' : ''}
                />
              )}
            />
            {errors.name && (
              <div style={{ color: '#ff4d4f', marginTop: 4 }}>
                {errors.name.message}
              </div>
            )}
          </div>

          {/* Email */}
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="email">Email</label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="email"
                  type="email"
                  size="large"
                  prefix={<MailOutlined />}
                  placeholder="Nhập email"
                  status={errors.email ? 'error' : ''}
                />
              )}
            />
            {errors.email && (
              <div style={{ color: '#ff4d4f', marginTop: 4 }}>
                {errors.email.message}
              </div>
            )}
          </div>

          {/* Phone */}
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="phone">Số điện thoại</label>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="phone"
                  size="large"
                  prefix={<PhoneOutlined />}
                  placeholder="Nhập số điện thoại"
                  status={errors.phone ? 'error' : ''}
                />
              )}
            />
            {errors.phone && (
              <div style={{ color: '#ff4d4f', marginTop: 4 }}>
                {errors.phone.message}
              </div>
            )}
          </div>

          {/* Password */}
          <div style={{ marginBottom: 24 }}>
            <label htmlFor="password">Mật khẩu</label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  id="password"
                  size="large"
                  prefix={<LockOutlined />}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  placeholder="Nhập mật khẩu"
                  status={errors.password ? 'error' : ''}
                />
              )}
            />
            {errors.password && (
              <div style={{ color: '#ff4d4f', marginTop: 4 }}>
                {errors.password.message}
              </div>
            )}
          </div>

          <Button
            type="primary"
            htmlType="submit"
            loading={isSubmitting}
            size="large"
            block
          >
            Đăng ký
          </Button>
        </form>
      </Card>
    </div>
  );
}
