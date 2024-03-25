import React, { useEffect, useState } from 'react';
import CardDataStats from '../../components/CardDataStats';
// import ChartOne from '../../components/Charts/ChartOne';
// import ChartThree from '../../components/Charts/ChartThree';
// import ChartTwo from '../../components/Charts/ChartTwo';
// import ChatCard from '../../components/Chat/ChatCard';
// import MapOne from '../../components/Maps/MapOne';
// import TableOne from '../../components/Tables/TableOne';
import { FaPassport } from 'react-icons/fa';
import DefaultLayout from '../../layout/DefaultLayout';
import { useAppSelector } from '../../Redux/hooks';
import { AuthState } from '../../types/authState';
import axios from 'axios';
import { PiUsersThreeBold } from 'react-icons/pi';
import Loader from '../../common/Loader';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

const ECommerce: React.FC = () => {
  const userInfo = useAppSelector(
    (state) => state.auth.userInfo,
  ) as AuthState['userInfo'];
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_ADMIN_URL}/count`,
        {
          headers: {
            //@ts-ignore
            Authorization: 'Bearer ' + userInfo.token,
          },
          withCredentials: true,
        },
      );
      setLoading(false);
      setData(res.data.data);

      console.log('from fetch: ', res.data.data);
    } catch (error) {
      setLoading(false);
      console.log('from fetch: ', error);
      //@ts-ignore
      if (error?.response?.data?.errors) {
        //@ts-ignore
        if (error?.response?.data?.errors === 'Unauthorized') {
          navigate('/logout', { state: { error: 'TimedOut' } });
        }
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

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
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
            <CardDataStats
              title="Visa"
              total={data.visaCount}
              rate="0.43%"
              levelUp
            >
              <FaPassport />
            </CardDataStats>
            <CardDataStats
              title="GroupTicket"
              total={data.groupTicketCount}
              rate="0.43%"
              levelUp
            >
              <FaPassport />
            </CardDataStats>
            <CardDataStats
              title="Hajj"
              total={data.hajjCount}
              rate="0.43%"
              levelUp
            >
              <FaPassport />
            </CardDataStats>
            <CardDataStats
              title="Umrah"
              total={data.umrahCount}
              rate="0.43%"
              levelUp
            >
              <FaPassport />
            </CardDataStats>
            <CardDataStats
              title="Tours"
              total={data.tourCount}
              rate="0.43%"
              levelUp
            >
              <FaPassport />
            </CardDataStats>
            <CardDataStats
              title="Insurance"
              total={data.insuranceCount}
              rate="0.43%"
              levelUp
            >
              <FaPassport />
            </CardDataStats>
            <CardDataStats
              title="Today's Booking"
              total={data.todayTotalBookingCount}
              rate="0.43%"
              levelUp
            >
              <FaPassport />
            </CardDataStats>
            <CardDataStats
              title="All Booking"
              total={
                data.visaBookingCount +
                data.hajjBookingCount +
                data.umrahBookingCount +
                data.toursBookingCount +
                data.insuranceBookingCount +
                data.flightTicketBookingCount +
                data.groupTicketBookingCount +
                data.hotelBookingCount
              }
              rate="0.43%"
              levelUp
            >
              <FaPassport />
            </CardDataStats>

            <CardDataStats
              title="Users"
              total={
                data.adminCount + data.normalUserCount + data.moderatorCount
              }
              rate="0.95%"
              levelDown
            >
              <PiUsersThreeBold />
            </CardDataStats>
          </>
        ) : null}
      </div>

      {/* <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div> */}
    </DefaultLayout>
  );
};

export default ECommerce;
