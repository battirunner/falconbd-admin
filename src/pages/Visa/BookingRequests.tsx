import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableTwo from '../../components/Visa/BookingRequest/TableTwo';
import DefaultLayout from '../../layout/DefaultLayout';

const Tables = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Visa Booking Requests" />

      <div className="flex flex-col gap-10">
        {/* <TableOne /> */}
        <TableTwo />
        {/* <TableThree /> */}
      </div>
    </DefaultLayout>
  );
};

export default Tables;
