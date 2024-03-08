import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Popconfirm, message } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/tours`);
      setLoading(false);
      setData(res.data.data);
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
        `${import.meta.env.VITE_BASE_ADMIN_URL}/tours/${id}`,
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
      fetchData();
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
    fetchData();
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
  const cancel = (e: any) => {
    console.log(e);
    // message.error('Click on No');
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
              <p className="font-medium">Title</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Location</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Tour Type</p>
            </div>
            <div className="col-span-1 hidden items-center sm:flex">
              <p className="font-medium">Visa Type</p>
            </div>
            <div className="col-span-1 hidden items-center sm:flex">
              <p className="font-medium">Departure Location</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Duration</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Guests</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Start Date</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">End Date</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Price</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Action</p>
            </div>
          </div>
          {/* @ts-ignore */}
          {data.map((tourPackage) => (
            <div
              className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
              key={tourPackage.id}
            >
              <div className="col-span-1 flex items-center">
                {/* <div className="flex flex-col gap-4 sm:flex-row sm:items-center"> */}
                {/* <div className="h-12.5 w-15 rounded-md"> */}
                {/* <img src={product.image} alt="Product" /> */}
                {/* </div> */}
                <p className="text-sm text-black dark:text-white">
                  {tourPackage.title}
                </p>
                {/* </div> */}
              </div>

              <div className="col-span-1 hidden items-center sm:flex">
                <p className="text-sm text-black dark:text-white">
                  {tourPackage.Location.name}
                </p>
              </div>

              <div className="col-span-1 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {tourPackage.tour_type.title}
                </p>
              </div>

              <div className="col-span-1 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {tourPackage.visa_category.title}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {tourPackage.departure_location}
                </p>
              </div>

              <div className="col-span-1 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {tourPackage.duration}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm text-meta-3">{tourPackage.guests}</p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm text-meta-3">
                  {tourPackage.start_datetime}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm text-meta-3">
                  {tourPackage.end_datetime}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm text-meta-3">৳{tourPackage.price}</p>
              </div>
              <div className="col-span-1 flex items-center">
                <div className="flex">
                  <button className="mx-2 text-blue-500 w-4">
                    <EditOutlined style={{ fontSize: '24px' }} />
                  </button>
                  <button className="mx-2 text-red-500 w-4 ">
                    <DeleteOutlined style={{ fontSize: '24px' }} />
                  </button>
                  <Popconfirm
                    title="Delete the visa"
                    description="Are you sure to delete this visa?"
                    onConfirm={() => confirm(tourPackage.id)}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Link
                      to={`${import.meta.env.VITE_MAIN_FRONT_URL}/tourdetails/${
                        tourPackage.id
                      }`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="mx-2 text-blue-500 w-4">
                        <EyeOutlined style={{ fontSize: '24px' }} />
                      </button>
                    </Link>
                  </Popconfirm>
                </div>
                {/* <p className="text-sm text-meta-3">${product.profit}</p> */}
              </div>
            </div>
          ))}
        </>
      ) : null}
    </div>
  );
};

export default TableTwo;
