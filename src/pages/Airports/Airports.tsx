import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableTwo from '../../components/Airports/TableTwo';
import DefaultLayout from '../../layout/DefaultLayout';

const Tables = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Airports" />

      <div className="flex flex-col gap-10">
        {/* <TableOne /> */}
        <TableTwo />
        {/* <TableThree /> */}
      </div>
    </DefaultLayout>
  );
};

export default Tables;
