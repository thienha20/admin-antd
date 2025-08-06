import React, { useState } from 'react';
import { Form, Input, TreeSelect, Upload, Button, message, Card, Divider } from 'antd';
import { UploadOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import { useRouter } from 'next/navigation';

const {TextArea} = Input;

interface FormValues {
  description: string;
  category: string;
  upload: UploadFile[];
}

interface TreeNode {
  title: string;
  value: string;
  key: string;
  children?: TreeNode[];
}

const FileCreateSection: React.FC = () => {
  const [form] = Form.useForm<FormValues>();
  const router = useRouter();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Dữ liệu mẫu cho TreeSelect với kiểu dữ liệu
  const treeData: TreeNode[] = [
    {
      title: 'Category 1',
      value: 'category-1',
      key: 'category-1',
      children: [
        {
          title: 'Subcategory 1-1',
          value: 'subcategory-1-1',
          key: 'subcategory-1-1',
        },
        {
          title: 'Subcategory 1-2',
          value: 'subcategory-1-2',
          key: 'subcategory-1-2',
        },
      ],
    },
    {
      title: 'Category 2',
      value: 'category-2',
      key: 'category-2',
    },
  ];

  const onFinish = (values: FormValues) => {
    setSubmitting(true);
    console.log('Received values:', values);
    console.log('Files:', fileList);

    // Xử lý submit ở đây
    const id = 10;
    router.push('/subscribe/files/update/' + id);
    setTimeout(() => {
      setSubmitting(false);
      message.success('Form submitted successfully');
    }, 1500);
  };

  const onFinishAndClose = (values: FormValues) => {
    onFinish(values);
    // Thêm logic đóng form ở đây
    console.log('Form saved and closed');
    router.push('/subscribe/files');
  };

  const normFile: UploadProps['beforeUpload'] = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e['fileList'];
  };

  const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    const isLt5M = file.size / 1024 / 1024 <= 10;
    if (!isLt5M) {
      message.error('Dung lượng file không quá 10MB!');
    }
    return isLt5M ? true : Upload.LIST_IGNORE;
  };

  const handleUploadChange: UploadProps['onChange'] = ({fileList}) => {
    setFileList(fileList);
  };

  return (
    <Card style={{maxWidth: 800, margin: '0 auto', padding: 24}} size={'small'}>
      <Form<FormValues>
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="description"
          label="Mô tả ngắn"
        >
          <TextArea rows={4} placeholder="Nhập..."/>
        </Form.Item>

        <Form.Item
          name="category"
          label="Danh mục"
        >
          <TreeSelect
            treeData={treeData}
            placeholder="Chọn danh mục"
            treeDefaultExpandAll
            allowClear
            showSearch
          />
        </Form.Item>

        <Form.Item
          name="upload"
          label="File Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn file để tải lên!',
              validator: (_, value) =>
                value && value.length > 0 ? Promise.resolve() : Promise.reject(),
            },
          ]}
        >
          <Upload.Dragger
            name="files"
            multiple={false}
            fileList={fileList}
            beforeUpload={beforeUpload}
            onChange={handleUploadChange}
            onDrop={() => console.log('Dropped files')}
            accept=".pdf,.doc,.docx,.txt,.log"
          >
            <p className="ant-upload-drag-icon">
              <UploadOutlined/>
            </p>
            <p className="ant-upload-text">Chọn hoặc kéo thả file vào vùng upload</p>
            <p className="ant-upload-hint">
              Chỉ hỗ trợ các dạng File (PDF, DOC, DOCX, TXT, LOG)
            </p>
          </Upload.Dragger>
        </Form.Item>
        <Divider />
        <Form.Item style={{marginTop: 10}}>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SaveOutlined/>}
            loading={submitting}
            style={{marginRight: 16}}
          >
            Lưu
          </Button>
          <Button
            type="primary"
            icon={<CloseOutlined/>}
            onClick={() => {
              form.validateFields().then((values) => {
                onFinishAndClose(values);
              });
            }}
            loading={submitting}
          >
            Lưu và thoát
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default FileCreateSection;