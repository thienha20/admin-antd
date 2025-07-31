'use client';

import {
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from '@ant-design/icons';
import { Button, Card, Input, message } from 'antd';
import { useSearchParams } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import Link from 'next/link';

const ResetPasswordSchema = z
  .object({
    password: z.string().min(6, 'Mật khẩu phải ít nhất 6 ký tự'),
    confirmPassword: z.string().min(6, 'Xác nhận mật khẩu phải ít nhất 6 ký tự'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu không khớp',
    path: ['confirmPassword'],
  });

type ResetPasswordForm = z.infer<typeof ResetPasswordSchema>;

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
    reset,
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: ResetPasswordForm) => {
    if (!token) {
      message.error('Liên kết không hợp lệ hoặc đã hết hạn');
      return;
    }

    // Simulate API call
    await new Promise((res) => setTimeout(res, 1500));
    console.log('Reset with token:', token, data);
    message.success('Đổi mật khẩu thành công!');
    reset();
  };

  useEffect(() => {
    if (!token) {
      message.warning('Thiếu mã token trong liên kết đặt lại mật khẩu');
    }
  }, [token]);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        background: 'linear-gradient(to right, #f0f2f5, #e6f7ff)',
      }}
    >

      {/* Header */}
      <div
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
        }}
      >
        <Link
          href="/"
          style={{
            color: '#1677ff',
            fontSize: 16,
            fontWeight: 500,
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          ← Quay về trang chủ
        </Link>
      </div>
      {/* Left side image */}
      <div
        style={{
          flex: 1,
          background: `url('https://source.unsplash.com/600x800/?privacy,password') no-repeat center / cover`,
          display: 'none',
        }}
        className="hidden md:block"
      />

      {/* Right side form */}
      <div
        style={{
          flex: 1,
          display: 'flex',
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
          styles={{
            body: {padding: 32},
          }}
        >
          <div style={{textAlign: 'center', padding: 3}}>
            <div
              style={{
                fontSize: '28px',
                fontWeight: 'bold',
                background: 'linear-gradient(to right, #1677ff, #13c2c2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Phục hồi mật khẩu
            </div>
          </div>

          <div
            style={{
              textAlign: 'center',
              color: '#8c8c8c',
              marginBottom: 24,
            }}
          >
            Vui lòng nhập mật khẩu mới để hoàn tất
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Password */}
            <div style={{marginBottom: 16}}>
              <label htmlFor="password" style={{display: 'block', marginBottom: 6}}>
                Mật khẩu mới
              </label>
              <Controller
                name="password"
                control={control}
                render={({field}) => (
                  <Input.Password
                    {...field}
                    id="password"
                    size="large"
                    prefix={<LockOutlined/>}
                    iconRender={(visible) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                    placeholder="Mật khẩu mới"
                    status={errors.password ? 'error' : ''}
                  />
                )}
              />
              {errors.password && (
                <div style={{color: '#ff4d4f', marginTop: 4}}>
                  {errors.password.message}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div style={{marginBottom: 24}}>
              <label htmlFor="confirmPassword" style={{display: 'block', marginBottom: 6}}>
                Xác nhận mật khẩu
              </label>
              <Controller
                name="confirmPassword"
                control={control}
                render={({field}) => (
                  <Input.Password
                    {...field}
                    id="confirmPassword"
                    size="large"
                    prefix={<LockOutlined/>}
                    iconRender={(visible) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                    placeholder="Xác nhận mật khẩu"
                    status={errors.confirmPassword ? 'error' : ''}
                  />
                )}
              />
              {errors.confirmPassword && (
                <div style={{color: '#ff4d4f', marginTop: 4}}>
                  {errors.confirmPassword.message}
                </div>
              )}
            </div>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isSubmitting}
              block
            >
              Cập nhật mật khẩu
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
