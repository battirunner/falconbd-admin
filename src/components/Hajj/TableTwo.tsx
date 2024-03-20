import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Pagination, PaginationProps, Popconfirm, message } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../Redux/hooks';
import Loader from '../../common/Loader';
import { AuthState } from '../../types/authState';
// import AddHajjForm from './AddHajjForm';
import AddHajjFormCopy from './AddHajjFormCopy';

const TableTwo: React.FC<{ showAddPage: boolean }> = ({ showAddPage }) => {
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
        `${
          import.meta.env.VITE_BASE_URL
        }/tours?tourType=Hajj&page=${page}&limit=${limit}`,
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
    <>
      {showAddPage ? (
        <>
          <AddHajjFormCopy />
        </>
      ) : (
        <>
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
                <div className="grid grid-cols-12 font-bold border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-12 md:px-6 2xl:px-7.5 bg-slate-300">
                  <div className="col-span-3 text-center">
                    <p>Package Type</p>
                  </div>
                  <div className="col-span-2 text-center">
                    <p>Start-End</p>
                  </div>
                  {/* <div className="col-span-1 text-center">
              <p>Duration</p>
            </div> */}
                  {/* <div className="col-span-1 flex items-center">
              <p>Tour Type</p>
            </div> */}
                  <div className="col-span-1 text-center">
                    <p>Visa</p>
                  </div>
                  <div className="col-span-2 text-center">
                    <p>Departure</p>
                  </div>
                  <div className="col-span-1 text-center">
                    <p>Guests</p>
                  </div>
                  {/* <div className="col-span-1 flex items-center">
              <p>Start Date</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p>End Date</p>
            </div> */}
                  <div className="col-span-1 text-center">
                    <p>Price</p>
                  </div>
                  <div className="col-span-2 text-center">
                    <p>Action</p>
                  </div>
                </div>
                {/* @ts-ignore */}
                {data.map((tourPackage) => (
                  <div
                    className="grid grid-cols-12 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-12 md:px-6 2xl:px-7.5"
                    key={tourPackage.id}
                  >
                    <div className="col-span-3 break-words text-center px-2">
                      <p className="text-black dark:text-white">
                        {tourPackage.title}
                      </p>
                      <p className="text-bold text-black dark:text-white">
                        {tourPackage.tour_type.title}
                      </p>
                      {/* </div> */}
                    </div>

                    <div className="col-span-2 items-center">
                      <p className="text-bold dark:text-white text-center">
                        {`${tourPackage.start_datetime} - ${tourPackage.end_datetime}`}
                      </p>
                    </div>
                    <div className="col-span-1">
                      <p className="text-black dark:text-white text-center">
                        {tourPackage.visa_category.title}
                      </p>
                    </div>
                    <div className="col-span-2 flex text-center">
                      <p className="text-black dark:text-white">
                        {tourPackage.departure_location}
                      </p>
                    </div>
                    <div className="col-span-1">
                      <p className="text-bold text-center">
                        {tourPackage.guests}
                      </p>
                    </div>
                    <div className="col-span-1 items-center">
                      <p className="text-bold text-meta-3 text-center">
                        ৳{tourPackage.price}
                      </p>
                    </div>
                    <div className="col-span-2 block mx-auto">
                      {/* <div className="flex"> */}
                      <button className="mx-2 text-blue-500 w-4">
                        <EditOutlined style={{ fontSize: '24px' }} />
                      </button>
                      <Popconfirm
                        title="Delete the visa"
                        description="Are you sure to delete this visa?"
                        onConfirm={() => confirm(tourPackage.id)}
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
                      <Link
                        to={`${
                          import.meta.env.VITE_MAIN_FRONT_URL
                        }/tourdetails/${tourPackage.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button className="mx-2 text-blue-500 w-4">
                          <EyeOutlined style={{ fontSize: '24px' }} />
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </>
            ) : null}
          </div>
          <div className="rounded text-right w-[280px] h-16 block ml-auto border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
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
        </>
      )}
    </>
  );
};

export default TableTwo;
