import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableTwo from '../../components/Insurance/BookingRequest/TableTwo';
import DefaultLayout from '../../layout/DefaultLayout';

const Tables = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Insurance Booking Requests" />

      <div className="flex flex-col gap-10">
        {/* <TableOne /> */}
        <TableTwo />
        {/* <TableThree /> */}
      </div>
    </DefaultLayout>
  );
};

export default Tables;
