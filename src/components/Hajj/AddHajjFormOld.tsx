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
import TextArea from 'antd/es/input/TextArea';

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

  console.log('value', value);

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
                <Col span={12}>
                  <Form
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 15 }}
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
                    <Form.Item label="Title">
                      <Input placeholder="Example: 40 Days Shifting Hajj Package" />
                    </Form.Item>
                    <Form.Item label="Duration">
                      <Input placeholder="Example: 5 Days 3 Nights" />
                    </Form.Item>
                    <Row>
                      <Col span={12}>
                        <Form.Item label="Departure Date">
                          <DatePicker />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Return Date">
                          <DatePicker />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <Form.Item label="Price">
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Guests">
                          <Input />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <Form.Item label="Tour Type">
                          <Select />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Location">
                          <Select />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item label="Departure Location">
                      <Input placeholder="Example: Hazrat Shahjalal International Airport" />
                    </Form.Item>

                    {/* <Form.Item label="Select">
                    <Select>
                      <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                  </Form.Item> */}
                    {/* <Form.Item label="TreeSelect">
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
                      <Switch />
                      <Input.TextArea />
                    </Form.Item> */}
                  </Form>
                </Col>
                <Col span={12}>
                  <p>Description:</p>
                  <ReactQuill
                    style={{ margin: '2%' }}
                    theme="snow"
                    value={value}
                    onChange={setValue}
                  />
                </Col>
                <Col span={12}>
                  <p>Highlights:</p>
                  <ReactQuill
                    style={{ margin: '2%' }}
                    theme="snow"
                    value={value}
                    onChange={setValue}
                  />
                </Col>
                <Col span={12}>
                  <p>Plan:</p>
                  <p>Day:</p>
                  <Input placeholder="Example: Day 1" />
                  <p>Details of the day:</p>
                  <TextArea />
                  {/* <ReactQuill
                    style={{ margin: '2%' }}
                    theme="snow"
                    value={value}
                    onChange={setValue}
                  /> */}
                </Col>
                <Col span={12}>
                  <p>Included:</p>
                  <ReactQuill
                    style={{ margin: '2%' }}
                    theme="snow"
                    value={value}
                    onChange={setValue}
                  />
                </Col>
                <Col span={12}>
                  <p>Not Included:</p>
                  <ReactQuill
                    style={{ margin: '2%' }}
                    theme="snow"
                    value={value}
                    onChange={setValue}
                  />
                </Col>
                <Col span={12}>
                  <p>Terms:</p>
                  <ReactQuill
                    style={{ margin: '2%' }}
                    theme="snow"
                    value={value}
                    onChange={setValue}
                  />
                </Col>
                <Col span={12}>
                  <p>Other Details:</p>
                  <ReactQuill
                    style={{ margin: '2%' }}
                    theme="snow"
                    value={value}
                    onChange={setValue}
                  />
                </Col>
                <Col span={12}>
                  <p>FAQ:</p>
                  <p>Question:</p>
                  <Input placeholder="Example: Day 1" />
                  <p>Answer:</p>
                  <TextArea />
                  {/* <ReactQuill
                    style={{ margin: '2%' }}
                    theme="snow"
                    value={value}
                    onChange={setValue}
                  /> */}
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
