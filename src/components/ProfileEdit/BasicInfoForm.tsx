import { Button, Card, Input, DatePicker, Radio, message  } from 'antd';
import { UserOutlined, IdcardOutlined, PhoneOutlined } from '@ant-design/icons';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
dayjs.locale('en');

// Định nghĩa schema validation với Zod
const profileSchema = z.object({
  phone: z.string()
    .min(10, 'Số điện thoại phải có ít nhất 10 số')
    .max(11, 'Số điện thoại tối đa 11 số')
    .regex(/^[0-9]+$/, 'Số điện thoại chỉ được chứa số'),
  fullName: z.string().min(1, 'Họ và tên là bắt buộc').max(50, 'Họ và tên tối đa 50 ký tự'),
  gender: z.enum(['male', 'female', 'other']).optional(),
  birthday: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: 'Ngày sinh không hợp lệ',
  }).optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const RequiredAsterisk = () => <span style={{ color: 'red' }}>*</span>;

const BasicInfoForm = () => {
  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      phone: '',
      fullName: '',
      gender: 'male',
      birthday: new Date().toISOString(),
    },
  });

  const handleSave = async (data: ProfileFormValues) => {
    console.log(data);
    message.success('Cập nhật thông tin thành công!');
    console.log(`isSubmitting`, isSubmitting);
  };

  return (
    <form onSubmit={handleSubmit(handleSave)} noValidate>
      {/* Thông tin cá nhân */}
      <div
        style={{
          margin: '10px 0 16px 0',
          borderColor: '#f0f0f0',
          borderWidth: '1px',
          fontSize: '16px',
          fontWeight: 500,
        }}
      >
          <span style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            <UserOutlined style={{color: '#1890ff'}}/>
            <span>Thông tin cá nhân</span>
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
        <div style={{marginBottom: 12}}>
          <label htmlFor="email" style={{display: 'block', marginBottom: 6}}>
            Email đăng nhập
          </label>
          <Input
            id={'email'}
            type={'email'}
            size="large"
            prefix={<UserOutlined/>}
            placeholder="Email đăng nhập"
            disabled={true}
          />
        </div>

        <div style={{marginBottom: 12}}>
          <label htmlFor="phone" style={{display: 'block', marginBottom: 6}}>
            Số điện thoại <RequiredAsterisk />
          </label>
          <Controller
            name="phone"
            control={control}
            render={({field}) => (
              <Input
                {...field}
                id={'phone'}
                size="large"
                prefix={<PhoneOutlined/>}
                placeholder="Số điện thoại"
                status={errors.phone ? 'error' : ''}
              />
            )}
          />
          {errors.phone && (
            <div style={{color: '#ff4d4f', marginTop: 4}}>
              {errors.phone.message}
            </div>
          )}
        </div>
      </Card>

      {/* Thông tin chung */}
      <div
        style={{
          margin: '32px 0 16px 0',
          borderColor: '#f0f0f0',
          borderWidth: '1px',
          fontSize: '16px',
          fontWeight: 500,
        }}
      >
          <span style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            <IdcardOutlined style={{color: '#1890ff'}}/>
            <span>Thông tin chung</span>
          </span>
      </div>
      <Card
        style={{marginBottom: 24}}
        styles={{
          header: {
            border: 'none',
            padding: '0 0 16px 0',
            fontSize: '16px',
            fontWeight: 500,
          },
        }}
        variant={'outlined'}
      >
        <div style={{marginBottom: 12}}>
          <label htmlFor="fullName" style={{display: 'block', marginBottom: 6}}>
            Họ và tên <RequiredAsterisk />
          </label>
          <Controller
            name="fullName"
            control={control}
            render={({field}) => (
              <Input
                {...field}
                id={'fullName'}
                size="large"
                placeholder="Họ và tên"
                status={errors.fullName ? 'error' : ''}
              />
            )}
          />
          {errors.fullName && (
            <div style={{color: '#ff4d4f', marginTop: 4}}>
              {errors.fullName.message}
            </div>
          )}
        </div>

        <div style={{marginBottom: 12}}>
          <label style={{display: 'block', marginBottom: 6}}>Giới tính</label>
          <Controller
            name="gender"
            control={control}
            render={({field}) => (
              <Radio.Group {...field}>
                <Radio value="male">Nam</Radio>
                <Radio value="female">Nữ</Radio>
                <Radio value="other">Khác</Radio>
              </Radio.Group>
            )}
          />
        </div>

        <div style={{marginBottom: 12}}>
          <label style={{display: 'block', marginBottom: 6}}>Ngày sinh</label>
          <Controller
            name="birthday"
            control={control}
            render={({field}) => (
              <DatePicker
                {...field}
                allowClear={false}
                format="DD/MM/YYYY"
                style={{width: '100%'}}
                size="large"
                value={field.value ? dayjs(field.value) : null}
                onChange={(date) => {
                  field.onChange(date ? date.toISOString() : '');
                }}
              />
            )}
          />
          {errors.birthday && (
            <div style={{color: '#ff4d4f', marginTop: 4}}>
              {errors.birthday.message}
            </div>
          )}
        </div>
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
        Lưu thông tin
      </Button>
    </form>
  );
};

export default BasicInfoForm;