import React, { useState } from 'react';
import { Form, Input, TreeSelect, Upload, Button, message, Card, Divider } from 'antd';
import { UploadOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import { useRouter } from 'next/navigation';
import { Editor } from '@tinymce/tinymce-react';

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

const CategoryUpdateSection: React.FC = () => {
  const [form] = Form.useForm<FormValues>();
  const router = useRouter();
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

    // Xử lý submit ở đây
    const id = 10;
    router.push('/categories/update/' + id);
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

  const handleEditorChange = (content: string) => {
    console.log('Content:', content);
  };

  const elFinderUrl = '/elFinder/elfinder.src.html';
  return (
    <Card style={{maxWidth: 800, margin: '0 auto', padding: 24}} size={'small'}>
      <Form<FormValues>
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          label="Tên danh mục"
        >
          <Input placeholder="Nhập..."/>
        </Form.Item>

        <Form.Item
          name="description"
          label="Mô tả ngắn"
        >
          <Editor
            apiKey="y634egbw4ixh5kfgzca2qmlnu3yun9sgjiep6iwndhcvjpc0"  // Đăng ký key miễn phí tại TinyMCE
            init={{
              height: 300,
              menubar: false,
              plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
              toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
              // file_picker_callback: (callback, value, meta) => {
              //   // Mở elFinder khi click vào nút image/link
              //   const elFinderDialog = window.open(
              //     `${elFinderUrl}?target=${meta.fieldName}&type=${meta.filetype}`,
              //     'elFinder',
              //     'width=900,height=400'
              //   );
              //
              //   // Nhận kết quả từ elFinder
              //   window.addEventListener('message', (event) => {
              //     if (event.data && event.data.target === meta.fieldName) {
              //       callback(event.data.url);
              //       elFinderDialog?.close();
              //     }
              //   });
              // },
            }}
            onEditorChange={handleEditorChange}
          />
        </Form.Item>

        <Form.Item
          name="parent_id"
          label="Danh mục cha"
        >
          <TreeSelect
            treeData={treeData}
            placeholder="Chọn danh mục"
            treeDefaultExpandAll
            allowClear
            showSearch
          />
        </Form.Item>
        <Divider/>
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

export default CategoryUpdateSection;