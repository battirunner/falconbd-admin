import {
  FileAddOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  message,
} from 'antd';
import moment from 'moment';
import axios from 'axios';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import React, { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../Redux/hooks';
import Loader from '../../common/Loader';
import { AuthState } from '../../types/authState';
import './Style.css';

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

const AddGroupTicketForm: React.FC = () => {
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
  const [airports, setAirports] = useState();
  const [country, setCountry] = useState();

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

  // useEffect(() => {
  //   fetchData(
  //     `${import.meta.env.VITE_BASE_URL}/tourtype` as string,
  //     setTourType,
  //   );
  //   fetchData(
  //     `${import.meta.env.VITE_BASE_URL}/location` as string,
  //     setLocation,
  //   );
  //   fetchData(
  //     `${import.meta.env.VITE_BASE_URL}/visacategory` as string,
  //     setVisaCategory,
  //   );
  // }, []);

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
    const data = {
      ...values,
      ticket_path: JSON.stringify(values.ticket_path),
      show_price: values.show_price ? true : false,
      food: values.food ? true : false,
      refund: values.refund ? true : false,
    };
    // console.log('values  from ticket: ', values.ticket_path);

    console.log('before created:', data);
    addData(`${import.meta.env.VITE_BASE_ADMIN_URL}/groupticket`, data);
  };

  const searchAirport = (data: any) => {
    console.log(data);
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/airports?search=${data}`)
      .then((response) => {
        setAirports(response.data.data.result);
      });
  };
  const [departure, setDeparture] = useState(
    moment().format('YYYY-MM-DD hh:mm'),
  );
  // const searchCountry = (data: any) => {
  //   console.log(data);
  //   axios
  //     .get(`${import.meta.env.VITE_BASE_URL}/country?search=${data}`)
  //     .then((response) => {
  //       setCountry(response.data.data.result);
  //     });
  // };

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
                <Col span={24}>
                  <button
                    onClick={() => setShowPreview(true)}
                    className="bg-yellow-300 my-4 px-4 py-2 rounded"
                  >
                    Show Preview
                  </button>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
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
                  ) : // tourType && location && visaCategory
                  true ? (
                    <>
                      <div>
                        <Form
                          name="tourForm"
                          layout="vertical"
                          onFinish={onFinish}
                          scrollToFirstError
                          // layout="horizontal"
                        >
                          <Row>
                            <Col span={12} style={{ padding: '20px' }}>
                              <Row>
                                <Col span={5}>
                                  <Form.Item
                                    label="Seats"
                                    name="available_seats"
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Available Seats Required!',
                                      },
                                    ]}
                                  >
                                    <InputNumber size="large" min={0} />
                                  </Form.Item>
                                </Col>
                                <Col span={5}>
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
                                    <Input size="large" />
                                  </Form.Item>
                                </Col>
                                <Col span={5}>
                                  <Form.Item
                                    label="Show Price"
                                    name="show_price"
                                    valuePropName="checked"
                                  >
                                    <Checkbox
                                      style={{
                                        marginLeft: '20px',
                                        width: '30px',
                                      }}
                                    />
                                  </Form.Item>
                                </Col>
                                <Col span={5}>
                                  <Form.Item
                                    label="Food"
                                    name="food"
                                    valuePropName="checked"
                                  >
                                    <Checkbox
                                      style={{
                                        marginLeft: '10px',
                                        width: '30px',
                                      }}
                                    />
                                  </Form.Item>
                                </Col>
                                <Col span={4}>
                                  <Form.Item
                                    label="Refundable"
                                    name="refund"
                                    valuePropName="checked"
                                  >
                                    <Checkbox
                                      style={{
                                        marginLeft: '20px',
                                        width: '30px',
                                      }}
                                    />
                                  </Form.Item>
                                </Col>
                              </Row>
                              {/* <Row>
                                <Col span={8}>
                                  <Form.Item
                                    label="Show Price"
                                    name="show_price"
                                    valuePropName="checked"
                                  >
                                    <Checkbox />
                                  </Form.Item>
                                </Col>
                                <Col span={8}>
                                  <Form.Item
                                    label="Food"
                                    name="food"
                                    valuePropName="checked"
                                  >
                                    <Checkbox />
                                  </Form.Item>
                                </Col>
                                <Col span={8}>
                                  <Form.Item
                                    label="Refundable"
                                    name="refund"
                                    valuePropName="checked"
                                  >
                                    <Checkbox />
                                  </Form.Item>
                                </Col>
                              </Row> */}
                              <Row>
                                <Col span={24}>
                                  <Form.Item
                                    label="Baggage"
                                    name="baggage"
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Baggage Required!',
                                      },
                                    ]}
                                  >
                                    <Input.TextArea
                                      style={{ minHeight: '150px' }}
                                    />
                                  </Form.Item>
                                  <Form.Item
                                    label="Policy"
                                    name="policy"
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Policy Required!',
                                      },
                                    ]}
                                  >
                                    <Input.TextArea
                                      style={{ minHeight: '150px' }}
                                    />
                                  </Form.Item>
                                </Col>
                              </Row>
                            </Col>
                            <Col
                              span={12}
                              style={{ padding: '20px', marginTop: '30px' }}
                            >
                              <div
                                style={{
                                  border: '2px dashed black',
                                  padding: '10px',
                                }}
                              >
                                <p className="text-bold text-lg">
                                  Ticket Path:
                                </p>
                                <Form.List
                                  name="ticket_path"
                                  rules={[
                                    {
                                      validator: async (_, ticket_path) => {
                                        if (
                                          !ticket_path ||
                                          ticket_path.length < 1
                                        ) {
                                          return Promise.reject(
                                            new Error(
                                              'At least one Ticket Path must be provided!',
                                            ),
                                          );
                                        }
                                      },
                                    },
                                  ]}
                                  initialValue={[{}]}
                                >
                                  {(fields, { add, remove }, { errors }) => (
                                    <>
                                      {fields.map((field, index) => (
                                        <div key={field.key} className="">
                                          <Row>
                                            <Col span={16}>
                                              <Form.Item
                                                label="Departure Airport"
                                                name={[
                                                  field.name,
                                                  `departure_airport`,
                                                ]}
                                                rules={[
                                                  {
                                                    required: true,
                                                    message:
                                                      'Departure Airport Required!',
                                                  },
                                                ]}
                                              >
                                                <Select
                                                  showSearch
                                                  onSearch={(value) =>
                                                    searchAirport(value)
                                                  }
                                                  //@ts-ignore
                                                  size="large"
                                                  options={
                                                    airports &&
                                                    //@ts-ignore
                                                    airports.map(
                                                      (airport: any) => ({
                                                        // label: `${airport.iata_code} | ${airport.name} | ${airport.city} | ${airport.country}`,
                                                        label: (
                                                          <>
                                                            <Row
                                                              style={{
                                                                height: '45px',
                                                                padding: '3px',
                                                              }}
                                                            >
                                                              <Col
                                                                span={3}
                                                                style={{
                                                                  fontWeight:
                                                                    'bold',
                                                                  // padding: '5px',
                                                                  borderRight:
                                                                    '1px solid #cccccc',
                                                                }}
                                                              >
                                                                {
                                                                  airport.iata_code
                                                                }
                                                              </Col>
                                                              <Col
                                                                span={21}
                                                                style={{
                                                                  paddingLeft:
                                                                    '10px',
                                                                }}
                                                              >
                                                                <p
                                                                  style={{
                                                                    margin: '0',
                                                                    lineHeight:
                                                                      '18px',
                                                                  }}
                                                                >
                                                                  {airport.city}
                                                                </p>
                                                                <p
                                                                  style={{
                                                                    margin: '0',
                                                                    lineHeight:
                                                                      '18px',
                                                                    fontSize:
                                                                      '12px',
                                                                  }}
                                                                >
                                                                  {/* {airport.country},
                                                              {airport.name} */}
                                                                  {`${airport.country}, ${airport.name}`}
                                                                </p>
                                                              </Col>
                                                            </Row>
                                                          </>
                                                        ),
                                                        value: `${airport.iata_code} ${airport.name} ${airport.city} ${airport.country}`,
                                                      }),
                                                    )
                                                  }
                                                />
                                              </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                              <Form.Item
                                                label="Departure Datetime"
                                                name={[
                                                  field.name,
                                                  `departure_datetime`,
                                                ]}
                                                getValueFromEvent={(onChange) =>
                                                  dayjs(onChange).format(
                                                    'YYYY-MM-DD HH:mm:ss',
                                                  )
                                                }
                                                getValueProps={(i) => {
                                                  console.log(
                                                    'check the thing',
                                                    i,
                                                  );
                                                  return {
                                                    value:
                                                      i === 'Invalid Date'
                                                        ? undefined
                                                        : dayjs(i),
                                                  };
                                                }}
                                                rules={[
                                                  {
                                                    required: true,
                                                    message:
                                                      'Departure Datetime Required',
                                                  },
                                                ]}
                                                style={{ paddingLeft: '10px' }}
                                              >
                                                <DatePicker
                                                  showTime
                                                  format={'YYYY-MM-DD hh:mm'}
                                                  defaultValue={moment().format(
                                                    'YYYY-MM-DD hh:mm',
                                                  )}
                                                  size="large"
                                                />
                                              </Form.Item>
                                            </Col>
                                          </Row>
                                          <Row>
                                            <Col span={16}>
                                              <Form.Item
                                                label="Arrival Airport"
                                                name={[
                                                  field.name,
                                                  `arrival_airport`,
                                                ]}
                                                rules={[
                                                  {
                                                    required: true,
                                                    whitespace: true,
                                                    message:
                                                      'Arrival Airport Required.',
                                                  },
                                                ]}
                                              >
                                                <Select
                                                  showSearch
                                                  onSearch={(value) =>
                                                    searchAirport(value)
                                                  }
                                                  //@ts-ignore
                                                  size="large"
                                                  options={
                                                    airports &&
                                                    //@ts-ignore
                                                    airports.map(
                                                      (airport: any) => ({
                                                        // label: `${airport.iata_code} ${airport.name} ${airport.city} ${airport.country}`,
                                                        label: (
                                                          <>
                                                            <Row
                                                              style={{
                                                                height: '45px',
                                                                padding: '3px',
                                                              }}
                                                            >
                                                              <Col
                                                                span={3}
                                                                style={{
                                                                  fontWeight:
                                                                    'bold',
                                                                  // padding: '5px',
                                                                  borderRight:
                                                                    '1px solid #cccccc',
                                                                }}
                                                              >
                                                                {
                                                                  airport.iata_code
                                                                }
                                                              </Col>
                                                              <Col
                                                                span={21}
                                                                style={{
                                                                  paddingLeft:
                                                                    '10px',
                                                                }}
                                                              >
                                                                <p
                                                                  style={{
                                                                    margin: '0',
                                                                    lineHeight:
                                                                      '18px',
                                                                  }}
                                                                >
                                                                  {airport.city}
                                                                </p>
                                                                <p
                                                                  style={{
                                                                    margin: '0',
                                                                    lineHeight:
                                                                      '18px',
                                                                    fontSize:
                                                                      '12px',
                                                                  }}
                                                                >
                                                                  {/* {airport.country},
                                                          {airport.name} */}
                                                                  {`${airport.country}, ${airport.name}`}
                                                                </p>
                                                              </Col>
                                                            </Row>
                                                          </>
                                                        ),
                                                        value: `${airport.iata_code} ${airport.name} ${airport.city} ${airport.country}`,
                                                      }),
                                                    )
                                                  }
                                                />
                                              </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                              <Form.Item
                                                label="Arrival Datetime"
                                                name={[
                                                  field.name,
                                                  `arrival_datetime`,
                                                ]}
                                                getValueFromEvent={(onChange) =>
                                                  dayjs(onChange).format(
                                                    'YYYY-MM-DD HH:mm:ss',
                                                  )
                                                }
                                                getValueProps={(i) => {
                                                  return {
                                                    value:
                                                      i === 'Invalid Date'
                                                        ? undefined
                                                        : dayjs(i),
                                                  };
                                                }}
                                                rules={[
                                                  {
                                                    required: true,
                                                    message:
                                                      'Arrival Datetime Required',
                                                  },
                                                ]}
                                                style={{
                                                  paddingLeft: '10px',
                                                }}
                                              >
                                                <DatePicker
                                                  showTime
                                                  format={'YYYY-MM-DD hh:mm'}
                                                  defaultValue={moment().format(
                                                    'YYYY-MM-DD hh:mm',
                                                  )}
                                                  size="large"
                                                />
                                              </Form.Item>
                                            </Col>
                                          </Row>
                                          <Row>
                                            <Col span={12} className="pr-2">
                                              <Form.Item
                                                name={[field.name, `airlines`]}
                                                label={`Airlines`}
                                                rules={[
                                                  {
                                                    required: true,
                                                    message:
                                                      'Airlines Required',
                                                  },
                                                ]}
                                              >
                                                <Input
                                                  placeholder=""
                                                  size="large"
                                                />
                                              </Form.Item>
                                            </Col>
                                            <Col span={12} className="pl-2">
                                              <Form.Item
                                                name={[field.name, `aircraft`]}
                                                label={`Aircraft`}
                                              >
                                                <Input
                                                  placeholder=""
                                                  size="large"
                                                />
                                              </Form.Item>
                                            </Col>
                                          </Row>
                                          <Row>
                                            <Col span={12} className="pr-2">
                                              <Form.Item
                                                name={[
                                                  field.name,
                                                  `ticket_class`,
                                                ]}
                                                label={`Ticket Class`}
                                                rules={[
                                                  {
                                                    required: true,
                                                    message:
                                                      'Ticket Class Required',
                                                  },
                                                ]}
                                              >
                                                <Select
                                                  options={[
                                                    {
                                                      label: 'Economy',
                                                      value: 'Economy',
                                                    },
                                                    {
                                                      label: 'Premium Economy',
                                                      value: 'Premium Economy',
                                                    },
                                                    {
                                                      label: 'Business',
                                                      value: 'Business',
                                                    },
                                                    {
                                                      label: 'First Class',
                                                      value: 'First Class',
                                                    },
                                                  ]}
                                                  size="large"
                                                />
                                              </Form.Item>
                                            </Col>
                                            <Col span={12} className="pl-2">
                                              <Form.Item
                                                name={[
                                                  field.name,
                                                  `seat_number`,
                                                ]}
                                                label={`Seat Number`}
                                              >
                                                <Input
                                                  placeholder=""
                                                  size="large"
                                                />
                                              </Form.Item>
                                            </Col>
                                          </Row>
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
                                          className="bg-blue-400 text-white font-bold"
                                          icon={<PlusOutlined />}
                                        >
                                          Add Ticket Path
                                        </Button>
                                      </Form.Item>
                                    </>
                                  )}
                                </Form.List>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col span={24}>
                              <Form.Item>
                                <Button
                                  htmlType="submit"
                                  style={{
                                    background: 'rgb(83, 80, 253)',
                                    color: 'white',
                                    width: '30%',
                                    display: 'block',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    marginTop: '30px',
                                    padding: '10px',
                                    height: '50px',
                                    fontSize: '20px',
                                  }}
                                >
                                  Submit
                                </Button>
                              </Form.Item>
                            </Col>
                          </Row>
                        </Form>
                      </div>
                    </>
                  ) : null}
                </Col>
              </Row>
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default AddGroupTicketForm;
