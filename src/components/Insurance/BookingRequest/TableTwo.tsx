import {
  CloseSquareOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { Pagination, PaginationProps, Popconfirm, Select, message } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../Redux/hooks';
import Loader from '../../../common/Loader';
import { AuthState } from '../../../types/authState';

const TableTwo = () => {
  const userInfo = useAppSelector(
    (state) => state.auth.userInfo,
  ) as AuthState['userInfo'];
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [totalData, setTotalData] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [editApprovalStatus, setEditApprovalStatus] = useState(false);

  const fetchData = async (page: number, limit: number) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_BASE_ADMIN_URL
        }/booking?booking_item_type=INSURANCE&page=${page}&limit=${limit}`,
        {
          headers: {
            //@ts-ignore
            Authorization: 'Bearer ' + userInfo.token,
          },
          withCredentials: true,
        },
      );
      setLoading(false);
      setData(res.data.data.result);
      setTotalData(res.data.data.count);
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

  const deleteData = async (id: string) => {
    setLoading(true);
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BASE_ADMIN_URL}/booking/${id}`,
        {
          headers: {
            //@ts-ignore
            Authorization: 'Bearer ' + userInfo.token,
          },
          withCredentials: true,
        },
      );
      setLoading(false);
      // setData(res.data.data);
      console.log('from delete: ', res.data.data);
      fetchData(page, limit);
      // return res.data.data;
    } catch (error) {
      setLoading(false);
      console.log('from delete: ', error);
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
    fetchData(page, limit);
  }, []);

  const confirm = async (id: string) => {
    console.log(id);
    deleteData(id);
    message.success('Deleted successfully!');
  };

  const changeApprovalStatus = async (id: string, status: string) => {
    setLoading(true);
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_ADMIN_URL}/booking/${id}`,
        { approval_status: status },
        {
          headers: {
            //@ts-ignore
            Authorization: 'Bearer ' + userInfo.token,
          },
          withCredentials: true,
        },
      );
      setLoading(false);
      // setData(res.data.data);
      console.log('from ApprovalStatus: ', res.data.data);
      fetchData(page, limit);
      // return res.data.data;
    } catch (error) {
      setLoading(false);
      console.log('from ApprovalStatus: ', error);
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

  const onApprovalStatusChange = (id: string, value: string) => {
    console.log(id, value);
    setEditApprovalStatus(!editApprovalStatus);
    changeApprovalStatus(id, value);
    message.success('Approval status changed!');
  };

  const onShowPageSizeChange: PaginationProps['onShowSizeChange'] = (
    current,
    pageSize,
  ) => {
    setPage(current);
    setLimit(pageSize);
    fetchData(current, pageSize);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
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
      ) : data ? (
        <>
          <div className="grid grid-cols-12 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Customer Name</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Customer Email</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Customer Address</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Customer Contact</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Customer Notes</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Item Title</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Location</p>
            </div>
            <div className="col-span-1 flex items-center sm:flex">
              <p className="font-medium">Booking Date</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Payment Status</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Approval Status</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Price</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Action</p>
            </div>
          </div>
          {/* @ts-ignore */}
          {data.map((bookingItem) => (
            <div
              className="grid grid-cols-12 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
              key={bookingItem.main_id}
            >
              <div className="col-span-1 flex items-center">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  {/* <div className="h-12.5 w-15 rounded-md">
                    <img src={product.image} alt="Product" />
                  </div> */}
                  <p className="text-sm text-black dark:text-white">
                    {bookingItem.name}
                  </p>
                </div>
              </div>
              <div className="col-span-1 flex items-center sm:flex">
                <p className="text-sm text-black dark:text-white">
                  {bookingItem.email}
                </p>
              </div>
              <div className="col-span-1 flex items-center sm:flex">
                <p className="text-sm text-black dark:text-white">
                  {bookingItem.booking_user_address}
                </p>
              </div>
              <div className="col-span-1 flex items-center sm:flex">
                <p className="text-sm text-black dark:text-white">
                  {bookingItem.booking_user_contact}
                </p>
              </div>
              <div className="col-span-1 flex items-center sm:flex">
                <p className="text-sm text-black dark:text-white">
                  {bookingItem.booking_user_notes}
                </p>
              </div>
              <div className="col-span-1 flex items-center sm:flex">
                <p className="text-sm text-black dark:text-white">
                  {bookingItem.title}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {bookingItem.country}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {bookingItem.booking_datetime}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {bookingItem.payment_status}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <span className="text-sm text-black dark:text-white">
                  {editApprovalStatus ? (
                    <Select
                      showSearch
                      placeholder="Select a status"
                      defaultValue={bookingItem.approval_status}
                      optionFilterProp="children"
                      onChange={(value) => {
                        onApprovalStatusChange(bookingItem.main_id, value);
                      }}
                      options={[
                        {
                          value: 'PENDING',
                          label: 'PENDING',
                        },
                        {
                          value: 'PROCESSING',
                          label: 'PROCESSING',
                        },
                        {
                          value: 'READY_TO_RECEIVE',
                          label: 'READY_TO_RECEIVE',
                        },
                        {
                          value: 'RECEIVED',
                          label: 'RECEIVED',
                        },
                        {
                          value: 'COMPLETED',
                          label: 'COMPLETED',
                        },
                      ]}
                    />
                  ) : (
                    bookingItem.approval_status
                  )}
                </span>
                &ensp;
                <span className="text-sm text-black dark:text-white">
                  {editApprovalStatus ? (
                    <>
                      <button
                        className="mx-2 text-blue-500 w-4"
                        onClick={() =>
                          setEditApprovalStatus(!editApprovalStatus)
                        }
                      >
                        <CloseSquareOutlined style={{ fontSize: '24px' }} />
                      </button>
                    </>
                  ) : (
                    <button
                      className="mx-2 text-blue-500 w-4"
                      onClick={() => setEditApprovalStatus(!editApprovalStatus)}
                    >
                      <EditOutlined style={{ fontSize: '24px' }} />
                    </button>
                  )}
                </span>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm text-meta-3">৳{bookingItem.price}</p>
              </div>
              <div className="col-span-1 flex items-center">
                <div className="flex">
                  <button className="mx-2 text-blue-500 w-4">
                    <EditOutlined style={{ fontSize: '24px' }} />
                  </button>
                  <Popconfirm
                    title="Delete the booking"
                    description="Are you sure to delete this booking?"
                    onConfirm={() => confirm(bookingItem.main_id)}
                    okText="Yes"
                    cancelText="No"
                    okButtonProps={{
                      style: {
                        backgroundColor: '#1677ff',
                      },
                    }}
                  >
                    <button className="btn-primary mx-2 text-red-500 w-4 ">
                      <DeleteOutlined
                        style={{
                          fontSize: '24px',
                          marginLeft: '2px',
                          marginRight: '2px',
                        }}
                      />
                    </button>
                  </Popconfirm>

                  {/* <Link
                    to={`${import.meta.env.VITE_MAIN_FRONT_URL}/visa?country=${
                      visa.country
                    }&visaCategory=${visa.visa_category.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  > */}
                  <button className="mx-2 text-blue-500 w-4">
                    <EyeOutlined style={{ fontSize: '24px' }} />
                  </button>
                  {/* </Link> */}
                </div>
                {/* <p className="text-sm text-meta-3">${product.profit}</p> */}
              </div>
            </div>
          ))}
        </>
      ) : null}
      <div className="flex items-center justify-center m-4">
        <Pagination
          showSizeChanger
          onShowSizeChange={onShowPageSizeChange}
          defaultCurrent={1}
          pageSize={limit}
          total={totalData}
          onChange={(page, pageSize) => {
            setPage(page);
            setLimit(pageSize);
            fetchData(page, pageSize);
          }}
        />
      </div>
    </div>
  );
};

export default TableTwo;
