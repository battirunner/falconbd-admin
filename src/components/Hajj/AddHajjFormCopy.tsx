import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Upload,
  message,
} from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import React, { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../Redux/hooks';
import Loader from '../../common/Loader';
import { AuthState } from '../../types/authState';

dayjs.extend(customParseFormat);

const dateFormat = 'YYYY-MM-DD';
// import { TextArea } from 'antd/es/input/TextArea';

const { RangePicker } = DatePicker;
// const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const AddHajjForm: React.FC = () => {
  const userInfo = useAppSelector(
    (state) => state.auth.userInfo,
  ) as AuthState['userInfo'];
  const [showPreview, setShowPreview] = useState(false);
  const navigate = useNavigate();
  const [tourType, setTourType] = useState();
  const [location, setLocation] = useState();
  const [visaCategory, setVisaCategory] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const fetchData = async (url: string, setValue: any) => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setLoading(false);
      setValue(res.data.data);
      console.log('from fetch: ', res.data.data);
    } catch (error) {
      setLoading(false);
      console.log('from fetch: ', error);
      //@ts-ignore
      if (error?.response?.data?.errors) {
        //@ts-ignore
        setError(error?.response?.data?.errors);
        // message.error(error?.response?.data?.errors);
      } else {
        //@ts-ignore
        setError(error.message);
        // message.error(error.message);
      }
    }
  };

  useEffect(() => {
    fetchData(
      `${import.meta.env.VITE_BASE_URL}/tourtype` as string,
      setTourType,
    );
    fetchData(
      `${import.meta.env.VITE_BASE_URL}/location` as string,
      setLocation,
    );
    fetchData(
      `${import.meta.env.VITE_BASE_URL}/visacategory` as string,
      setVisaCategory,
    );
  }, []);

  const addData = async (url: string, data: any) => {
    setLoading(true);
    try {
      const res = await axios.post(url, data, {
        headers: {
          //@ts-ignore
          Authorization: 'Bearer ' + userInfo.token,
        },
      });
      setLoading(false);
      // setValue(res.data.data);
      console.log('from add: ', res.data.data);
      message.success('Successfully added!');
      navigate(0);
    } catch (error) {
      setLoading(false);
      console.log('from add: ', error);
      //@ts-ignore
      if (error?.response?.data?.errors) {
        //@ts-ignore
        // setError(error?.response?.data?.errors);
        message.error(error?.response?.data?.errors);
      } else {
        //@ts-ignore
        // setError(error.message);
        message.error(error.message);
      }
    }
  };

  const onFinish = (values: any) => {
    console.log('values: ', values);
    const data = {
      title: values.title,
      description: JSON.stringify([
        { name: 'Description', items: values.description },
        { name: 'Highlights', items: values.highlights },
        { name: 'Plans', items: values.plan },
      ]),
      duration: values.duration,
      start_datetime: values.end_datetime,
      end_datetime: values.end_datetime,
      price: values.price,
      guests: Number(values.guests),
      included: JSON.stringify(values.included),
      not_included: JSON.stringify(values.not_included),
      tour_type_id: values.tour_type_id,
      departure_location: values.departure_location,
      terms_conditions: JSON.stringify(values.terms),
      other_details: JSON.stringify(values.other_details),
      visa_Category_id: values.visa_Category_id,
      location_id: values.location_id,
    };
    console.log('before created:', data);
    addData(`${import.meta.env.VITE_BASE_ADMIN_URL}/tours`, data);
  };

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
              {/* <div
                dangerouslySetInnerHTML={{
                  __html: `${value}`,
                }}
              >
                hello
              </div> */}
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

              {loading ? (
                <>
                  <Loader />
                </>
              ) : error ? (
                <>
                  <div className="py-6 px-4 md:px-6 xl:px-7.5">
                    <h4 className="text-xl font-semibold text-black dark:text-white text-center">
                      {error}
                    </h4>
                  </div>
                </>
              ) : tourType && location && visaCategory ? (
                <>
                  <div>
                    <Row>
                      <Col span={24}>
                        <Form
                          name="tourForm"
                          // labelCol={{ span: 10 }}
                          // wrapperCol={{ span: 14 }}
                          // layout="horizontal"
                          layout="vertical"
                          onFinish={onFinish}
                          scrollToFirstError
                          size={'large'}
                        >
                          <Row>
                            <Col span={12} style={{ padding: '50px' }}>
                              <Row>
                                <Col span={24}>
                                  <Form.Item
                                    label="Title"
                                    name="title"
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Title Required!',
                                      },
                                    ]}
                                  >
                                    <Input placeholder="Example: 40 Days Shifting Hajj Package" />
                                  </Form.Item>
                                </Col>
                              </Row>
                              <Row>
                                <Col span={12} className="pr-4">
                                  <Form.Item
                                    label="Duration"
                                    name="duration"
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Duration Required!',
                                      },
                                    ]}
                                  >
                                    <Input placeholder="Example: 5 Days 3 Nights" />
                                  </Form.Item>
                                </Col>
                                <Col span={12}>
                                  <Form.Item
                                    label="Price"
                                    name="price"
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Price Required!',
                                      },
                                    ]}
                                  >
                                    <Input />
                                  </Form.Item>
                                </Col>
                              </Row>
                              <Row>
                                <Col span={12}>
                                  <Form.Item
                                    label="Departure Date"
                                    name="start_datetime"
                                    getValueFromEvent={(onChange) =>
                                      dayjs(onChange).format('YYYY-MM-DD')
                                    }
                                    getValueProps={(i) => ({ value: dayjs(i) })}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Departure Date Required!',
                                      },
                                    ]}
                                  >
                                    <DatePicker />
                                  </Form.Item>
                                </Col>
                                <Col span={12}>
                                  <Form.Item
                                    label="Return Date"
                                    name="end_datetime"
                                    getValueFromEvent={(onChange) =>
                                      dayjs(onChange).format('YYYY-MM-DD')
                                    }
                                    getValueProps={(i) => ({ value: dayjs(i) })}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Return Date Required!',
                                      },
                                    ]}
                                  >
                                    <DatePicker />
                                  </Form.Item>
                                </Col>
                              </Row>
                              <Row>
                                <Col span={12}>
                                  <Form.Item
                                    label="Guests"
                                    name="guests"
                                    // rules={[
                                    //   { required: true, message: 'Guests Required!' },
                                    // ]}
                                  >
                                    <InputNumber />
                                  </Form.Item>
                                </Col>
                                <Col span={12}>
                                  <Form.Item
                                    label="Tour Type"
                                    name="tour_type_id"
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Tour Type Required!',
                                      },
                                    ]}
                                  >
                                    <Select
                                      showSearch
                                      onChange={(e) => {
                                        console.log(e);
                                      }}
                                      options={[
                                        //@ts-ignore
                                        ...tourType.map((t) => ({
                                          value: t.id,
                                          label: t.title,
                                        })),
                                      ]}
                                    />
                                  </Form.Item>
                                </Col>
                              </Row>
                              <Row>
                                <Col span={12} className="pr-4">
                                  <Form.Item
                                    label="Location"
                                    name="location_id"
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Location Required!',
                                      },
                                    ]}
                                  >
                                    <Select
                                      showSearch
                                      onChange={(e) => {
                                        console.log(e);
                                      }}
                                      options={[
                                        //@ts-ignore
                                        ...location.map((t) => ({
                                          value: t.id,
                                          label: t.name,
                                        })),
                                      ]}
                                    />
                                  </Form.Item>
                                </Col>
                                <Col span={12}>
                                  <Form.Item
                                    label="Visa Category"
                                    name="visa_Category_id"
                                    // rules={[
                                    //   { required: true, message: 'Visa Category Required!' },
                                    // ]}
                                  >
                                    <Select
                                      showSearch
                                      onChange={(e) => {
                                        console.log(e);
                                      }}
                                      options={[
                                        //@ts-ignore
                                        ...visaCategory.map((t) => ({
                                          value: t.id,
                                          label: t.title,
                                        })),
                                      ]}
                                    />
                                  </Form.Item>
                                </Col>
                              </Row>
                              <Form.Item
                                label="Departure Location"
                                name="departure_location"
                                rules={[
                                  {
                                    required: true,
                                    message: 'Departure Location Required!',
                                  },
                                ]}
                              >
                                <Input placeholder="Example: Hazrat Shahjalal International Airport" />
                              </Form.Item>
                              <Form.Item
                                name="media_gallery"
                                label="Media Gallery"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                              >
                                <Upload
                                  action="/upload.do"
                                  listType="picture-card"
                                >
                                  <button
                                    style={{ border: 0, background: 'none' }}
                                    type="button"
                                  >
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                  </button>
                                </Upload>
                              </Form.Item>
                            </Col>
                            <Col span={12} style={{ padding: '50px' }}>
                              <div
                                style={{
                                  border: '2px dashed #94a3b8',
                                  padding: '10px',
                                  marginBottom: '10px',
                                }}
                              >
                                <p className="text-lg font-bold">
                                  Description:
                                </p>
                                <Form.List
                                  name="description"
                                  rules={[
                                    {
                                      validator: async (_, description) => {
                                        if (
                                          !description ||
                                          description.length < 1
                                        ) {
                                          return Promise.reject(
                                            new Error(
                                              'At least one description must be provided!',
                                            ),
                                          );
                                        }
                                      },
                                    },
                                  ]}
                                >
                                  {(fields, { add, remove }, { errors }) => (
                                    <>
                                      {fields.map((field, index) => (
                                        <div key={field.key}>
                                          <Form.Item
                                            name={field.name}
                                            label={`Description ${index + 1}`}
                                            required
                                          >
                                            <Form.Item
                                              {...field}
                                              validateTrigger={[
                                                'onChange',
                                                'onBlur',
                                              ]}
                                              rules={[
                                                {
                                                  required: true,
                                                  whitespace: true,
                                                  message:
                                                    'Description Required.',
                                                },
                                              ]}
                                              noStyle
                                            >
                                              <Input.TextArea placeholder="Enter Description" />
                                              {/* <Form.ErrorList errors={errors} /> */}
                                            </Form.Item>

                                            {fields.length > 1 ? (
                                              <MinusCircleOutlined
                                                className="dynamic-delete-button"
                                                onClick={() =>
                                                  remove(field.name)
                                                }
                                              />
                                            ) : null}
                                          </Form.Item>
                                        </div>
                                      ))}
                                      <Form.ErrorList errors={errors} />
                                      <Form.Item>
                                        <Button
                                          type="dashed"
                                          onClick={() => {
                                            add();
                                          }}
                                        >
                                          Add a description
                                        </Button>
                                      </Form.Item>
                                    </>
                                  )}
                                </Form.List>
                              </div>
                              <div
                                style={{
                                  border: '2px dashed #94a3b8',
                                  padding: '10px',
                                  marginBottom: '10px',
                                }}
                              >
                                <p className="text-lg font-bold">Highlights:</p>
                                <Form.List
                                  name="highlights"
                                  rules={[
                                    {
                                      validator: async (_, highlights) => {
                                        if (
                                          !highlights ||
                                          highlights.length < 1
                                        ) {
                                          return Promise.reject(
                                            new Error(
                                              'At least one highlights must be provided!',
                                            ),
                                          );
                                        }
                                      },
                                    },
                                  ]}
                                >
                                  {(fields, { add, remove }, { errors }) => (
                                    <>
                                      {fields.map((field, index) => (
                                        <div key={field.key}>
                                          <Form.Item
                                            name={field.name}
                                            label={`Highlights ${index + 1}`}
                                            required
                                          >
                                            <Form.Item
                                              {...field}
                                              validateTrigger={[
                                                'onChange',
                                                'onBlur',
                                              ]}
                                              rules={[
                                                {
                                                  required: true,
                                                  whitespace: true,
                                                  message:
                                                    'Highlights Required.',
                                                },
                                              ]}
                                              noStyle
                                            >
                                              <Input.TextArea placeholder="Enter Highlights" />
                                              {/* <Form.ErrorList errors={errors} /> */}
                                            </Form.Item>

                                            {fields.length > 1 ? (
                                              <MinusCircleOutlined
                                                className="dynamic-delete-button"
                                                onClick={() =>
                                                  remove(field.name)
                                                }
                                              />
                                            ) : null}
                                          </Form.Item>
                                        </div>
                                      ))}
                                      <Form.ErrorList errors={errors} />
                                      <Form.Item>
                                        <Button
                                          type="dashed"
                                          onClick={() => {
                                            add();
                                          }}
                                        >
                                          Add a Highlights
                                        </Button>
                                      </Form.Item>
                                    </>
                                  )}
                                </Form.List>
                              </div>
                              <div
                                style={{
                                  border: '2px dashed #94a3b8',
                                  padding: '10px',
                                  marginBottom: '10px',
                                }}
                              >
                                <p className="text-lg font-bold">Plan:</p>
                                <Form.List
                                  name="plan"
                                  rules={[
                                    {
                                      validator: async (_, plan) => {
                                        if (!plan || plan.length < 1) {
                                          return Promise.reject(
                                            new Error(
                                              'At least one plan must be provided!',
                                            ),
                                          );
                                        }
                                      },
                                    },
                                  ]}
                                >
                                  {(fields, { add, remove }, { errors }) => (
                                    <>
                                      {fields.map((field, index) => (
                                        <div key={field.key}>
                                          <Form.Item
                                            name={[field.name, `plan_day`]}
                                            label={`Plan Day ${index + 1}`}
                                            rules={[
                                              {
                                                required: true,
                                                whitespace: true,
                                                message: 'Plan Day Required.',
                                              },
                                            ]}
                                          >
                                            <Input placeholder="Enter Plan Day" />
                                          </Form.Item>
                                          <Form.Item
                                            name={[
                                              field.name,
                                              `plan_description`,
                                            ]}
                                            label={`Plan Description ${
                                              index + 1
                                            }`}
                                            rules={[
                                              {
                                                required: true,
                                                whitespace: true,
                                                message:
                                                  'Plan Description Required.',
                                              },
                                            ]}
                                          >
                                            <Input.TextArea placeholder="Enter Plan Description" />
                                          </Form.Item>
                                          {fields.length > 1 ? (
                                            <MinusCircleOutlined
                                              className="dynamic-delete-button"
                                              onClick={() => remove(field.name)}
                                            />
                                          ) : null}
                                        </div>
                                      ))}
                                      <Form.ErrorList errors={errors} />
                                      <Form.Item>
                                        <Button
                                          type="dashed"
                                          onClick={() => {
                                            add();
                                          }}
                                        >
                                          Add a Plan
                                        </Button>
                                      </Form.Item>
                                    </>
                                  )}
                                </Form.List>
                              </div>
                              <div
                                style={{
                                  border: '2px dashed #94a3b8',
                                  padding: '10px',
                                  marginBottom: '10px',
                                }}
                              >
                                <p className="text-lg font-bold">Included:</p>
                                <Form.List
                                  name="included"
                                  rules={[
                                    {
                                      validator: async (_, included) => {
                                        if (!included || included.length < 1) {
                                          return Promise.reject(
                                            new Error(
                                              'At least one Included must be provided!',
                                            ),
                                          );
                                        }
                                      },
                                    },
                                  ]}
                                >
                                  {(fields, { add, remove }, { errors }) => (
                                    <>
                                      {fields.map((field, index) => (
                                        <div key={field.key}>
                                          <Form.Item
                                            name={field.name}
                                            label={`Included ${index + 1}`}
                                            required
                                          >
                                            <Form.Item
                                              {...field}
                                              validateTrigger={[
                                                'onChange',
                                                'onBlur',
                                              ]}
                                              rules={[
                                                {
                                                  required: true,
                                                  whitespace: true,
                                                  message: 'Included Required.',
                                                },
                                              ]}
                                              noStyle
                                            >
                                              <Input.TextArea placeholder="Enter Included" />
                                              {/* <Form.ErrorList errors={errors} /> */}
                                            </Form.Item>

                                            {fields.length > 1 ? (
                                              <MinusCircleOutlined
                                                className="dynamic-delete-button"
                                                onClick={() =>
                                                  remove(field.name)
                                                }
                                              />
                                            ) : null}
                                          </Form.Item>
                                        </div>
                                      ))}
                                      <Form.ErrorList errors={errors} />
                                      <Form.Item>
                                        <Button
                                          type="dashed"
                                          onClick={() => {
                                            add();
                                          }}
                                        >
                                          Add a Included
                                        </Button>
                                      </Form.Item>
                                    </>
                                  )}
                                </Form.List>
                              </div>
                              <div
                                style={{
                                  border: '2px dashed #94a3b8',
                                  padding: '10px',
                                  marginBottom: '10px',
                                }}
                              >
                                <p className="text-lg font-bold">
                                  Not Included:
                                </p>
                                <Form.List
                                  name="not_included"
                                  rules={[
                                    {
                                      validator: async (_, not_included) => {
                                        if (
                                          !not_included ||
                                          not_included.length < 1
                                        ) {
                                          return Promise.reject(
                                            new Error(
                                              'At least one Not Included must be provided!',
                                            ),
                                          );
                                        }
                                      },
                                    },
                                  ]}
                                >
                                  {(fields, { add, remove }, { errors }) => (
                                    <>
                                      {fields.map((field, index) => (
                                        <div key={field.key}>
                                          <Form.Item
                                            name={field.name}
                                            label={`Not Included ${index + 1}`}
                                            required
                                          >
                                            <Form.Item
                                              {...field}
                                              validateTrigger={[
                                                'onChange',
                                                'onBlur',
                                              ]}
                                              rules={[
                                                {
                                                  required: true,
                                                  whitespace: true,
                                                  message:
                                                    'Not Included Required.',
                                                },
                                              ]}
                                              noStyle
                                            >
                                              <Input.TextArea placeholder="Enter Not Included" />
                                              {/* <Form.ErrorList errors={errors} /> */}
                                            </Form.Item>

                                            {fields.length > 1 ? (
                                              <MinusCircleOutlined
                                                className="dynamic-delete-button"
                                                onClick={() =>
                                                  remove(field.name)
                                                }
                                              />
                                            ) : null}
                                          </Form.Item>
                                        </div>
                                      ))}
                                      <Form.ErrorList errors={errors} />
                                      <Form.Item>
                                        <Button
                                          type="dashed"
                                          onClick={() => {
                                            add();
                                          }}
                                        >
                                          Add a Not Included
                                        </Button>
                                      </Form.Item>
                                    </>
                                  )}
                                </Form.List>
                              </div>
                              <div
                                style={{
                                  border: '2px dashed #94a3b8',
                                  padding: '10px',
                                  marginBottom: '10px',
                                }}
                              >
                                <p className="text-lg font-bold">Terms:</p>
                                <Form.List
                                  name="terms"
                                  rules={[
                                    {
                                      validator: async (_, terms) => {
                                        if (!terms || terms.length < 1) {
                                          return Promise.reject(
                                            new Error(
                                              'At least one Terms must be provided!',
                                            ),
                                          );
                                        }
                                      },
                                    },
                                  ]}
                                >
                                  {(fields, { add, remove }, { errors }) => (
                                    <>
                                      {fields.map((field, index) => (
                                        <div key={field.key}>
                                          <Form.Item
                                            name={field.name}
                                            label={`Terms ${index + 1}`}
                                            required
                                          >
                                            <Form.Item
                                              {...field}
                                              validateTrigger={[
                                                'onChange',
                                                'onBlur',
                                              ]}
                                              rules={[
                                                {
                                                  required: true,
                                                  whitespace: true,
                                                  message: 'Terms Required.',
                                                },
                                              ]}
                                              noStyle
                                            >
                                              <Input.TextArea placeholder="Enter Terms" />
                                              {/* <Form.ErrorList errors={errors} /> */}
                                            </Form.Item>

                                            {fields.length > 1 ? (
                                              <MinusCircleOutlined
                                                className="dynamic-delete-button"
                                                onClick={() =>
                                                  remove(field.name)
                                                }
                                              />
                                            ) : null}
                                          </Form.Item>
                                        </div>
                                      ))}
                                      <Form.ErrorList errors={errors} />
                                      <Form.Item>
                                        <Button
                                          type="dashed"
                                          onClick={() => {
                                            add();
                                          }}
                                        >
                                          Add a Terms
                                        </Button>
                                      </Form.Item>
                                    </>
                                  )}
                                </Form.List>
                              </div>
                              <div
                                style={{
                                  border: '2px dashed #94a3b8',
                                  padding: '10px',
                                  marginBottom: '10px',
                                }}
                              >
                                <p className="text-lg font-bold">
                                  Other Details:
                                </p>
                                <Form.List
                                  name="other_details"
                                  rules={[
                                    {
                                      validator: async (_, other_details) => {
                                        if (
                                          !other_details ||
                                          other_details.length < 1
                                        ) {
                                          return Promise.reject(
                                            new Error(
                                              'At least one Other Details must be provided!',
                                            ),
                                          );
                                        }
                                      },
                                    },
                                  ]}
                                >
                                  {(fields, { add, remove }, { errors }) => (
                                    <>
                                      {fields.map((field, index) => (
                                        <div key={field.key}>
                                          <Form.Item
                                            name={field.name}
                                            label={`Other Details ${index + 1}`}
                                            required
                                          >
                                            <Form.Item
                                              {...field}
                                              validateTrigger={[
                                                'onChange',
                                                'onBlur',
                                              ]}
                                              rules={[
                                                {
                                                  required: true,
                                                  whitespace: true,
                                                  message:
                                                    'Other Details Required.',
                                                },
                                              ]}
                                              noStyle
                                            >
                                              <Input.TextArea placeholder="Enter Other Details" />
                                              {/* <Form.ErrorList errors={errors} /> */}
                                            </Form.Item>

                                            {fields.length > 1 ? (
                                              <MinusCircleOutlined
                                                className="dynamic-delete-button"
                                                onClick={() =>
                                                  remove(field.name)
                                                }
                                              />
                                            ) : null}
                                          </Form.Item>
                                        </div>
                                      ))}
                                      <Form.ErrorList errors={errors} />
                                      <Form.Item>
                                        <Button
                                          type="dashed"
                                          onClick={() => {
                                            add();
                                          }}
                                        >
                                          Add a Other Details
                                        </Button>
                                      </Form.Item>
                                    </>
                                  )}
                                </Form.List>
                              </div>
                              <div
                                style={{
                                  border: '2px dashed #94a3b8',
                                  padding: '10px',
                                  marginBottom: '10px',
                                }}
                              >
                                <p className="text-lg font-bold">FAQ:</p>
                                <Form.List
                                  name="faq"
                                  rules={[
                                    {
                                      validator: async (_, faq) => {
                                        if (!faq || faq.length < 1) {
                                          return Promise.reject(
                                            new Error(
                                              'At least one FAQ must be provided!',
                                            ),
                                          );
                                        }
                                      },
                                    },
                                  ]}
                                >
                                  {(fields, { add, remove }, { errors }) => (
                                    <>
                                      {fields.map((field, index) => (
                                        <div key={field.key}>
                                          <Form.Item
                                            name={[field.name, `question`]}
                                            label={`Plan Day ${index + 1}`}
                                            rules={[
                                              {
                                                required: true,
                                                whitespace: true,
                                                message: 'Question Required.',
                                              },
                                            ]}
                                          >
                                            <Input placeholder="Enter Question" />
                                          </Form.Item>
                                          <Form.Item
                                            name={[field.name, `answer`]}
                                            label={`Plan Description ${
                                              index + 1
                                            }`}
                                            rules={[
                                              {
                                                required: true,
                                                whitespace: true,
                                                message: 'Answer Required.',
                                              },
                                            ]}
                                          >
                                            <Input.TextArea placeholder="Enter Answer" />
                                          </Form.Item>

                                          {fields.length > 1 ? (
                                            <MinusCircleOutlined
                                              className="dynamic-delete-button"
                                              onClick={() => remove(field.name)}
                                            />
                                          ) : null}
                                        </div>
                                      ))}
                                      <Form.ErrorList errors={errors} />
                                      <Form.Item>
                                        <Button
                                          type="dashed"
                                          onClick={() => {
                                            add();
                                          }}
                                        >
                                          Add a FAQ
                                        </Button>
                                      </Form.Item>
                                    </>
                                  )}
                                </Form.List>
                              </div>
                              <Form.Item>
                                <Button htmlType="submit">Submit</Button>
                              </Form.Item>
                            </Col>
                          </Row>
                        </Form>
                      </Col>
                    </Row>
                  </div>
                </>
              ) : null}
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default AddHajjForm;
