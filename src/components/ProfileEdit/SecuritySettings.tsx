import { Button, Card, Input, Form, message, Col, Row } from 'antd';
import { LockOutlined, SafetyOutlined } from '@ant-design/icons';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';

// Define validation schema with Zod
const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Vui lòng nhập mật khẩu hiện tại'),
  newPassword: z.string()
    .min(1, 'Vui lòng nhập mật khẩu mới')
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
  confirmPassword: z.string()
}).refine(data => data.newPassword === data.confirmPassword, {
  message: 'Mật khẩu xác nhận không khớp!',
  path: ['confirmPassword']
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

const SecuritySettings = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  });

  const labelStyle = {
    display: 'inline-block',
    width: '180px', // Điều chỉnh chiều rộng theo nhu cầu
    fontSize: '15px',
    fontWeight: 500
  };

  const onSubmit = async (data: PasswordFormValues) => {
    console.log(data);
    message.success('Cập nhật mật khẩu thành công!');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div
        style={{
          margin: '10px 0 16px 0',
          borderColor: '#f0f0f0',
          borderWidth: '1px',
          fontSize: '16px',
          fontWeight: 500,
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <LockOutlined style={{ color: '#1890ff' }} />
          <span>Thay đổi mật khẩu</span>
        </span>
      </div>

      <Card
        styles={{
          header: {
            border: 'none',
            fontSize: '16px',
            fontWeight: 500,
          },
        }}
        variant={'outlined'}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item
              label={<span style={labelStyle}>Mật khẩu hiện tại</span>}
              validateStatus={errors.currentPassword ? 'error' : ''}
              help={errors.currentPassword?.message}
              style={{ marginBottom: 24 }}
            >
              <Controller
                name="currentPassword"
                control={control}
                render={({ field }) => (
                  <Input.Password
                    {...field}
                    placeholder="Nhập mật khẩu hiện tại"
                    prefix={<LockOutlined />}
                    size="large"
                  />
                )}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item
              label={<span style={labelStyle}>Mật khẩu mới</span>}
              validateStatus={errors.newPassword ? 'error' : ''}
              help={errors.newPassword?.message}
              style={{ marginBottom: 24 }}
            >
              <Controller
                name="newPassword"
                control={control}
                render={({ field }) => (
                  <Input.Password
                    {...field}
                    placeholder="Nhập mật khẩu mới"
                    prefix={<SafetyOutlined />}
                    size="large"
                  />
                )}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item
              label={<span style={labelStyle}>Xác nhận mật khẩu mới</span>}
              validateStatus={errors.confirmPassword ? 'error' : ''}
              help={errors.confirmPassword?.message}
              style={{ marginBottom: 24 }}
            >
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <Input.Password
                    {...field}
                    placeholder="Nhập lại mật khẩu mới"
                    prefix={<SafetyOutlined />}
                    size="large"
                  />
                )}
              />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      <Button
        type="primary"
        htmlType="submit"
        loading={isSubmitting}
        size="large"
        style={{
          marginTop: 24,
          width: '100%',
          maxWidth: '400px',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      >
        Cập nhật mật khẩu
      </Button>
    </form>
  );
};

export default SecuritySettings;