'use client';

import {
  LockOutlined,
  UserOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Button, Card, Input, message } from 'antd';
// import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { Forgot } from '@/components/sections/forgot';

const LoginSchema = z.object({
  email: z.email('Nhập đúng email để đăng nhập'),
  password: z.string().min(6, 'Mật khẩu phải ít nhất 6 ký tự'),
});



type LoginSchemaType = z.infer<typeof LoginSchema>;


export default function LoginPage() {
  // const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });


  const handleLogin = async (data: LoginSchemaType) => {
    console.log(data);
    console.log(isSubmitting);
    message.success('Đăng nhập thành công!');

    console.log(`isSubmitting`, isSubmitting);
    // router.push('/');
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        background: 'linear-gradient(to right, #f0f2f5, #e6f7ff)',
      }}
    >
      {/* Left side image */}
      <div
        style={{
          flex: 1,
          background: `url('https://source.unsplash.com/600x800/?technology,abstract') no-repeat center / cover`,
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
            body: {padding: 32}
          }}
        >
          <div style={{textAlign: 'center', padding: 3}}>
            <SettingOutlined style={{fontSize: 32, color: '#1677ff'}}/>
            <div style={{
                fontSize: '28px',
                fontWeight: 'bold',
                background: 'linear-gradient(to right, #1677ff, #13c2c2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              CMS Chat AI
            </div>
          </div>

          <div
            style={{
              textAlign: 'center',
              color: '#8c8c8c',
              marginBottom: 16,
            }}
          >
            Đăng nhập để quản trị nội dung hệ thống
          </div>

          <form onSubmit={handleSubmit(handleLogin)} noValidate>
            {/* Email */}
            <div style={{marginBottom: 12}}>
              <label htmlFor="email" style={{ display: 'block', marginBottom: 6 }}>
                Email đăng nhập
              </label>
              <Controller
                name="email"
                control={control}
                render={({field}) => (
                  <Input
                    {...field}
                    id={'email'}
                    type={'email'}
                    size="large"
                    prefix={<UserOutlined/>}
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
            </div>

            {/* Password */}
            <div style={{marginBottom: 24}}>
              <label htmlFor="password" style={{ display: 'block', marginBottom: 6 }}>
                Mật khẩu
              </label>
              <Controller
                name="password"
                control={control}
                render={({field}) => (
                  <Input.Password
                    {...field}
                    id={'password'}
                    size="large"
                    prefix={<LockOutlined/>}
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>
                    }
                    placeholder="Mật khẩu"
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

            <Button
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
              size="large"
              block
            >
              Đăng nhập
            </Button>

            <div style={{textAlign: 'right', marginTop: 16}}>
              <Button
                type="link"
                size="small"
                onClick={() => setIsModalOpen(true)}
              >
                Quên mật khẩu?
              </Button>
            </div>
          </form>
        </Card>
      </div>

      <Forgot setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
    </div>
  );
}
