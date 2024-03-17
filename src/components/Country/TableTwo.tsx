import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Pagination, PaginationProps, Popconfirm, message } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../Redux/hooks';
import Loader from '../../common/Loader';
import { AuthState } from '../../types/authState';

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
        `${import.meta.env.VITE_BASE_URL}/country?page=${page}&limit=${limit}`,
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
        `${import.meta.env.VITE_BASE_ADMIN_URL}/country/${id}`,
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
              <p className="font-medium">Name</p>
            </div>
            <div className="col-span-1 hidden items-center sm:flex">
              <p className="font-medium">ISO CODE</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Action</p>
            </div>
          </div>
          {/* @ts-ignore */}
          {data.map((country) => (
            <div
              className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
              key={country.id}
            >
              <div className="col-span-1 flex items-center">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  {/* <div className="h-12.5 w-15 rounded-md">
                    <img src={product.image} alt="Product" />
                  </div> */}
                  <p className="text-sm text-black dark:text-white">
                    {country.name}
                  </p>
                </div>
              </div>
              <div className="col-span-1 hidden items-center sm:flex">
                <p className="text-sm text-black dark:text-white">
                  {country.iso_code}
                </p>
              </div>

              <div className="col-span-1 flex items-center">
                <div className="flex">
                  <button className="mx-2 text-blue-500 w-4">
                    <EditOutlined style={{ fontSize: '24px' }} />
                  </button>
                  <Popconfirm
                    title="Delete the Country"
                    description="Are you sure to delete this Country?"
                    onConfirm={() => confirm(country.id)}
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
                  >
                    <button className="mx-2 text-blue-500 w-4">
                      <EyeOutlined style={{ fontSize: '24px' }} />
                    </button>
                  </Link> */}
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
