import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Grid,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  Row,
  Col,
} from 'antd';

type SizeType = Parameters<typeof Form>[0]['size'];

const AddHajjForm: React.FC = () => {
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>(
    'default',
  );

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };
  const [value, setValue] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  return (
    <>
      <Row>
        <Col span={24}>
          {showPreview ? (
            <>
              <Row>
                <button
                  onClick={() => setShowPreview(false)}
                  className="bg-yellow-300 my-4 px-4 py-2 rounded"
                >
                  Edit Preview
                </button>
              </Row>
              <div
                dangerouslySetInnerHTML={{
                  __html: `${value}`,
                }}
              ></div>
            </>
          ) : (
            <>
              <Row>
                <button
                  onClick={() => setShowPreview(true)}
                  className="bg-yellow-300 my-4 px-4 py-2 rounded"
                >
                  Show Preview
                </button>
              </Row>
              <Row>
                <Col span={8}>
                  <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    initialValues={{ size: componentSize }}
                    onValuesChange={onFormLayoutChange}
                    size={componentSize as SizeType}
                    style={{ maxWidth: 600 }}
                  >
                    {/* <Form.Item label="Form Size" name="size">
                  <Radio.Group>
                    <Radio.Button value="small">Small</Radio.Button>
                    <Radio.Button value="default">Default</Radio.Button>
                    <Radio.Button value="large">Large</Radio.Button>
                  </Radio.Group>
                </Form.Item> */}
                    <Form.Item label="Input">
                      <Input />
                    </Form.Item>
                    {/* <Form.Item label="Select">
                    <Select>
                      <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                  </Form.Item> */}
                    <Form.Item label="TreeSelect">
                      <TreeSelect
                        treeData={[
                          {
                            title: 'Light',
                            value: 'light',
                            children: [{ title: 'Bamboo', value: 'bamboo' }],
                          },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item label="Cascader">
                      <Cascader
                        options={[
                          {
                            value: 'zhejiang',
                            label: 'Zhejiang',
                            children: [
                              { value: 'hangzhou', label: 'Hangzhou' },
                            ],
                          },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item label="DatePicker">
                      <DatePicker />
                    </Form.Item>
                    <Form.Item label="InputNumber">
                      <InputNumber />
                    </Form.Item>
                    <Form.Item label="Switch" valuePropName="checked">
                      {/* <Switch /> */}
                      <Input.TextArea />
                    </Form.Item>
                  </Form>
                </Col>
                <Col span={14}>
                  <ReactQuill theme="snow" value={value} onChange={setValue} />
                </Col>
              </Row>
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default AddHajjForm;
