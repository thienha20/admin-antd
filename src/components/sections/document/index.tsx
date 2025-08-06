import { type ActionType, type ProColumns, ProTable } from '@ant-design/pro-components';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import {
  Button,
  Card,
  Form,
  Input,
  message,
  Select,
  Space,
  Grid,
  TreeSelect,
  DatePicker,
  TablePaginationConfig,
  Popconfirm, Tag,
} from 'antd';
import {
  ExportOutlined,
  UpOutlined,
  DownOutlined,
  EditOutlined,
  DeleteOutlined,
  CloseOutlined, PlusOutlined,
} from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { QueryParams } from '@/schemas/query';
import { DocumentType } from '@/schemas/subcribe';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { buildQueryUrl } from '@/utils/pathname';
import dayjs from 'dayjs';
// Mock data
const mockData = [
  {
    id: 1,
    description: 'Product A',
    category: {id: 1, name: 'Electronics'},
    document_type: 'doc',
    stock: 45,
    created_at: dayjs('2023-01-15').toDate(),
  },
  {
    id: 2,
    description: 'Product B',
    category: {id: 2, name: 'test 1'},
    document_type: 'docx',
    stock: 120,
    created_at: dayjs('2023-02-20').toDate(),
  },
  {
    id: 3,
    description: 'Product C',
    category: {id: 3, name: 'test 2'},
    document_type: 'pdf',
    stock: 300,
    created_at: dayjs('2023-03-10').toDate(),
  },
];

// Type cho dữ liệu
interface DocumentParam extends QueryParams {
  categoryId?: number;
  extension?: number;
  document_type?: string;
  description?: string;
  created?: (dayjs.Dayjs | null)[];
}

const {useBreakpoint} = Grid;
const {RangePicker} = DatePicker;

export const DocumentSection: React.FC = () => {
  const screens = useBreakpoint();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const firstRender = useRef(true);
  const createdStart = searchParams.get('created_from');
  const createdEnd = searchParams.get('created_to');
  const status = searchParams.get('status');
  const page = searchParams.get('page');
  const [queryParams, setQueryParams] = useState<DocumentParam>({
    pageSize: searchParams.get('pageSize') ? +(searchParams.get('pageSize') ?? '10') : 10,
    description: searchParams.get('description') ?? '',
    document_type: searchParams.get('document_type') ?? '',
    status: status ?? '',
    categoryId: searchParams.get('categoryId') ? +(searchParams.get('categoryId') ?? '0') : 0,
    created: [
      createdStart ? dayjs(createdStart) : null,
      createdEnd ? dayjs(createdEnd) : null,
    ].filter(Boolean),
  });
  const [filterData, setFilterData] = useState<Record<string, any>>({});
  const [currentPage, setCurrentPage] = useState<number>(page && +page <= 0 ? 1 : +(page ?? '1'));
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };
  const actionRef = useRef<ActionType>(null);
  const [form] = Form.useForm();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const handleReset = () => {
    form.resetFields();
    router.push(buildQueryUrl({}));
  };
  const buildValues = (values: DocumentParam) => {
    const newParams = {...queryParams};
    for (const key in values) {
      if (key === 'created' && values[key]) {
        if (values[key][0]) {
          newParams['created_from'] = dayjs(values[key][0]).format('YYYY-MM-DD HH:mm:ss').toString();
        }
        if (values[key][1]) {
          newParams['created_to'] = dayjs(values[key][1]).format('YYYY-MM-DD HH:mm:ss').toString();
        }
      } else {
        newParams[key] = values[key];
      }
    }
    if (newParams.created) delete newParams.created;
    return newParams;
  };
  const handleGetValues = () => {
    router.push(buildQueryUrl(buildValues(form.getFieldsValue())));
  };
  const toggleAdvanced = () => {
    setShowAdvanced(!showAdvanced);
  };
  const treeData = [
    {
      title: 'tất cả',
      value: 0,
    },
    {
      value: 1,
      title: 'parent 1',
      children: [
        {
          value: 2,
          title: 'parent 1-0',
          children: [
            {
              value: 3,
              title: 'leaf1',
            },
            {
              value: 4,
              title: 'leaf2',
            },
            {
              value: 5,
              title: 'leaf3',
            },
            {
              value: 6,
              title: 'leaf4',
            },
          ],
        },
        {
          value: 7,
          title: 'parent 1-1',
          children: [
            {
              value: 8,
              title: <b style={{color: '#08c'}}>leaf11</b>,
            },
          ],
        },
      ],
    },
  ];

  // Columns config
  const columns: ProColumns<DocumentType>[] = useMemo(() => {
    return [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        hideInSearch: true,
        sorter: true,
        width: 80,
      },
      {
        title: 'Tên document',
        dataIndex: 'description',
        key: 'description',
        hideInSearch: true,
      },
      {
        title: 'Danh mục',
        dataIndex: 'category.name',
        key: 'category.name',
        hideInSearch: true,
      },
      {
        title: 'Phần mở rộng',
        dataIndex: 'document_type',
        key: 'document_type',
        hideInSearch: true,
        sorter: true,
        renderText: (val) => `*.${val}`,
      },
      {
        title: 'Tồn kho',
        dataIndex: 'stock',
        key: 'stock',
        hideInSearch: true,
        sorter: true,
      },
      {
        title: 'Ngày tạo',
        dataIndex: 'created_at',
        key: 'created_at',
        valueType: 'date',
        hideInSearch: true,
        sorter: true,
      },
      {
        title: 'Action',
        key: 'action',
        width: 10,
        valueType: 'option',
        fixed: 'right',
        hideInSearch: true,
        sorter: false,
        render: (_, record) => [
          <Button
            key="edit"
            type="link"
            icon={<EditOutlined/>}
            onClick={() => {
              // Xử lý sửa
              console.log('Sửa', record);
            }}
            title={'Cập nhật'}
          />,
          <Popconfirm
            key="delete"
            title="Bạn có chắc chắn muốn xóa?"
            onConfirm={() => {
              // Xử lý xóa
              console.log('Xóa', record);
            }}
          >
            <Button type="text" icon={<DeleteOutlined/>} danger title={'Xóa'}/>
          </Popconfirm>,
        ],
      },
    ];
  }, []);
  // Export Excel
  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(mockData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
    const excelBuffer = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
    const data = new Blob([excelBuffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
    message.success('Xuất document thành công!');
  };

  useEffect(() => {
    console.log('vao ne');
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const createdFrom = searchParams.get('created_from');
    const createdTo = searchParams.get('created_to');
    const pageSize = searchParams.get('pageSize');
    const categoryId = searchParams.get('categoryId');
    setQueryParams({
      pageSize: pageSize ? +pageSize : 10,
      description: searchParams.get('description') ?? '',
      document_type: searchParams.get('document_type') ?? '',
      status: searchParams.get('status') ?? '',
      categoryId: categoryId ? +categoryId : 0,
      created: [
        createdFrom ? dayjs(createdFrom) : null,
        createdTo ? dayjs(createdTo) : null,
      ].filter(Boolean),
    });
    const page = searchParams.get('page');
    setCurrentPage(page && +page <= 0 ? 1 : +(page ?? '1'));
  }, [searchParams, pathname, firstRender]);

  useEffect(() => {
    form.setFieldsValue(queryParams);
    const data = {};
    for (const k in queryParams) {
      if (!['page', 'pageSize'].includes(k)) {
        if (Array.isArray(queryParams[k])) {
          if (queryParams[k].length > 0) {
            data[k] = queryParams[k];
          }
        } else {
          if (queryParams[k]) data[k] = queryParams[k];
        }
      }
    }
    setFilterData(data);
  }, [form, queryParams]);

  const {isLoading, data: documents} = useQuery({
    queryKey: ['subscribe-documents', queryParams],
    queryFn: () => {
      return Promise.resolve({data: mockData, total: mockData.length});
    },
    staleTime: 10000,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleTableChange = (pagination: TablePaginationConfig, _: any, sorter: any) => {
    const newParams = {
      ...queryParams,
      pageSize: pagination.pageSize,
    };
    if (sorter.field) {
      newParams.order = sorter.order === 'ascend' ? `${sorter.field}-asc` : `${sorter.field}-desc`;
    }
    router.push(buildQueryUrl(buildValues(newParams), pagination.current));
  };

  return (
    <>
      <Card size={'small'} style={{marginBottom: 15}}>
        <Form layout={'vertical'} form={form} initialValues={{
          ...queryParams,
        }}>
          <div className="form-flex-container">
            <div className="form-item">
              <Form.Item name="description" label="Tên Document">
                <Input/>
              </Form.Item>
            </div>
            <div className="form-item">
              <Form.Item name="document_type" label="Phần mở rộng">
                <Select
                  options={[
                    {
                      label: 'Tất cả',
                      value: '',
                    },
                    {
                      label: '*.doc',
                      value: 'doc',
                    },
                    {
                      label: '*.docs',
                      value: 'docs',
                    },
                  ]}
                  allowClear
                  showSearch
                />
              </Form.Item>
            </div>
            <div className="form-item">
              <Form.Item name="status" label="Tình trạng">
                <Select
                  options={[
                    {
                      label: 'Tất cả',
                      value: '',
                    },
                    {
                      label: 'Hoạt động',
                      value: 'A',
                    },
                    {
                      label: 'Ngừng hoạt đông',
                      value: 'D',
                    },
                  ]}
                />
              </Form.Item>
            </div>
            <div className="form-item" style={{display: showAdvanced ? 'block' : 'none'}}>
              <Form.Item name="categoryId" label="Danh mục">
                <TreeSelect
                  treeNodeFilterProp="title"
                  showSearch
                  style={{width: '100%'}}
                  styles={{
                    popup: {root: {maxHeight: 400, overflow: 'auto'}},
                  }}
                  allowClear
                  treeDefaultExpandAll
                  treeData={treeData}
                />
              </Form.Item>
            </div>
            <div className="form-item" style={{display: showAdvanced ? 'block' : 'none'}}>
              <Form.Item name="created" label="Thời gian tạo">
                <RangePicker showTime maxDate={dayjs()}/>
              </Form.Item>
            </div>
            <div className="form-item">
              <Form.Item label={screens.xs ? '' : ' '}>
                <Space>
                  <Button type="primary" onClick={handleGetValues}>Tìm kiếm</Button>
                  <Button onClick={handleReset}>Đặt lại</Button>
                  <Button type="link" onClick={toggleAdvanced} icon={showAdvanced ? <UpOutlined/> : <DownOutlined/>}>
                    Tìm nâng cao
                  </Button>
                </Space>
              </Form.Item>
            </div>
          </div>
        </Form>
        {Object.keys(filterData).length > 0 && (
          <div style={{marginTop: 12, display: 'flex'}}>
            <span style={{marginRight: 8}}>Đã lọc:</span>
            <Space size={[8, 8]} wrap>
              {Object.entries(filterData).map(([key, value]) => {
                if (!value || value.length === 0 || ['pageSize', 'page'].includes(key)) return null;
                const name = {
                  description: 'Tên document',
                  created: 'Ngày tạo',
                  categoryId: 'Danh mục',
                  document_type: 'Phần mở rộng',
                  status: 'Tình trạng',
                };
                return (
                  <Tag
                    key={key}
                    closable
                    onClose={() => {
                      const newQuery = {...queryParams};
                      if (key === 'created') {
                        if (newQuery.created_from) delete newQuery.created_from;
                        if (newQuery.created_to) delete newQuery.created_to;
                      }
                      delete newQuery[key];
                      delete newQuery.created;
                      router.push(buildQueryUrl(newQuery));
                    }}
                    closeIcon={<CloseOutlined/>}
                  >
                    {name[key]}: {typeof value === 'object' || Array.isArray(value) ? JSON.stringify(value) : value}
                  </Tag>
                );
              })}
            </Space>
          </div>
        )}
      </Card>

      <ProTable<DocumentType>
        loading={isLoading}
        actionRef={actionRef}
        columns={columns}
        dataSource={documents?.data ?? []}
        rowSelection={rowSelection}
        // request={async (params) => {
        //   console.log(params);
        //   // Giả lập API call với filter/sort
        //   let data = [...mockData];
        //
        //   // Filter
        //   if (params.description) {
        //     data = data.filter(item => item.description.includes(params.name));
        //   }
        //
        //   return {
        //     data,
        //     success: true,
        //     total: data.length,
        //   };
        // }}
        rowKey="id"
        pagination={{
          pageSize: queryParams.pageSize,
          current: currentPage,
          showSizeChanger: true,
        }}
        onReset={() => {
          const newParams = {
            ...queryParams,
            description: '',
            created: [],
            status: '',
            categoryId: 0,
            document_type: '',
          };
          router.push(buildQueryUrl(newParams));
        }}
        onChange={handleTableChange}
        tableAlertRender={({selectedRowKeys}) => (
          <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
            <span>Đã chọn {selectedRowKeys.length} mục</span>
            <Popconfirm
              key="delete"
              title="Bạn có chắc chắn muốn xóa?"
              onConfirm={() => {
                // Xử lý xóa
                console.log('Xóa all');
                router.push(buildQueryUrl(buildValues(queryParams)));
              }}
            >
              <Button type="link" icon={<DeleteOutlined/>} danger>
                Xóa tất cả
              </Button>
            </Popconfirm>
          </div>
        )}
        tableAlertOptionRender={false}
        toolBarRender={() => [
          <Button
            key="create"
            variant={'solid'}
            type={'primary'}
            icon={<PlusOutlined />}
            onClick={() => router.push('/subscribe/documents/create')}
          >
            Thêm Document
          </Button>,
          <Button
            key="export"
            icon={<ExportOutlined/>}
            onClick={handleExport}
          >
            Export
          </Button>,
        ]}
        search={{
          filterType: 'light',
        }}
        scroll={{x: 'max-content'}}
      />
    </>);
};