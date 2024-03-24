import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableTwo from '../../components/GroupTicket/TableTwo';
import DefaultLayout from '../../layout/DefaultLayout';

const Tables = () => {
  const [showAddPage, setShowAddPage] = useState(false);
  return (
    <DefaultLayout>
      <Breadcrumb pageName="GroupTicket" />

      <div className="flex flex-col gap-10">
        {/* <TableOne /> */}
        {showAddPage ? (
          <button
            onClick={() => setShowAddPage(false)}
            className="btn btn-medium bg-indigo-400 px-2 py-1 text-bold text-white w-32 rounded"
          >
            List
          </button>
        ) : (
          <button
            onClick={() => setShowAddPage(true)}
            className="btn btn-medium bg-indigo-400 px-2 py-1 text-bold text-white w-32 rounded"
          >
            Add New
          </button>
        )}
        <TableTwo showAddPage={showAddPage} />
      </div>
    </DefaultLayout>
  );
};

export default Tables;
