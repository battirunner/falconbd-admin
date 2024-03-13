import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Pagination, PaginationProps, Popconfirm, message } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../Redux/hooks';
import Loader from '../../common/Loader';
import { AuthState } from '../../types/authState';

// const fetcher = async (url: string) => {
//   try {
//     const res = await axios.get(url);
//     return res;
//   } catch (error) {
//     return error;
//   }
// };

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

  const fetchData = async (page: number, limit: number) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/groupticket?page=${page}&limit=${limit}`,
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
        `${import.meta.env.VITE_BASE_ADMIN_URL}/groupticket/${id}`,
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
  // const { data, error, mutate } = useSWR(
  //   `${import.meta.env.VITE_BASE_URL}/visa`,

  //   {
  //     suspense: true,
  //   }
  // );
  // if (error) {
  //   message.error(error);
  // } else {
  //   console.log('check data', data);
  //   //@ts-ignore
  //   if(data?.response?.data?.errors){
  //     //@ts-ignore
  //     message.error(data?.response?.data?.errors);
  //   } else {
  //     //@ts-ignore
  //     message.error(data?.message)
  //   }

  // }

  const confirm = async (id: string) => {
    console.log(id);
    deleteData(id);
    message.success('Deleted successfully!');
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
          <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Country</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Start Place</p>
            </div>
            <div className="col-span-1 hidden items-center sm:flex">
              <p className="font-medium">End Place</p>
            </div>
            <div className="col-span-1 hidden items-center sm:flex">
              <p className="font-medium">Paths</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Baggage</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Policy</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Price</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Action</p>
            </div>
          </div>
          {/* @ts-ignore */}
          {data.map((groupTicket) => (
            <div
              className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
              key={groupTicket.id}
            >
              <div className="col-span-1 flex items-center">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  {/* <div className="h-12.5 w-15 rounded-md">
                    <img src={product.image} alt="Product" />
                  </div> */}
                  <p className="text-sm text-black dark:text-white">
                    {groupTicket.country}
                  </p>
                </div>
              </div>
              <div className="col-span-1 hidden items-center sm:flex">
                <p className="text-sm text-black dark:text-white">
                  {groupTicket.start_place}
                </p>
              </div>
              <div className="col-span-1 hidden items-center sm:flex">
                <p className="text-sm text-black dark:text-white">
                  {groupTicket.end_place}
                </p>
              </div>

              <div className="col-span-1 flex items-center">
                {groupTicket.ticket_path.map((ticketPath: any) => (
                  <>
                    <p
                      key={ticketPath.id}
                      className="text-sm text-black dark:text-white"
                    >
                      {ticketPath.arrival_place}
                    </p>
                    &ensp;
                  </>
                ))}
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {groupTicket.baggage}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {groupTicket.policy}
                </p>
              </div>

              <div className="col-span-1 flex items-center">
                <p className="text-sm text-meta-3">৳{groupTicket.price}</p>
              </div>
              <div className="col-span-1 flex items-center">
                <div className="flex">
                  <button className="mx-2 text-blue-500 w-4">
                    <EditOutlined style={{ fontSize: '24px' }} />
                  </button>
                  <Popconfirm
                    title="Delete the GroupTicket"
                    description="Are you sure to delete this GroupTicket?"
                    onConfirm={() => confirm(groupTicket.id)}
                    okText="Yes"
                    cancelText="No"
                    okButtonProps={{
                      style: {
                        backgroundColor: '#1677ff',
                      },
                    }}
                  >
                    <button className="mx-2 text-red-500 w-4 ">
                      <DeleteOutlined style={{ fontSize: '24px' }} />
                    </button>
                  </Popconfirm>

                  <button className="mx-2 text-blue-500 w-4">
                    <EyeOutlined style={{ fontSize: '24px' }} />
                  </button>
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
            fetchData(page, pageSize);
          }}
        />
      </div>
    </div>
  );
};

export default TableTwo;
