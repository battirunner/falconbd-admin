import { Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import SignIn from '../pages/Authentication/SignIn';
import SignUp from '../pages/Authentication/SignUp';
import Calendar from '../pages/Calendar';
import Chart from '../pages/Chart';
import ECommerce from '../pages/Dashboard/ECommerce';
import FormElements from '../pages/Form/FormElements';
import FormLayout from '../pages/Form/FormLayout';
import NotFound from '../pages/NotFound/NotFound';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import Tables from '../pages/Tables';
import Alerts from '../pages/UiElements/Alerts';
import Buttons from '../pages/UiElements/Buttons';
import Visa from '../pages/Visa';
import Hajj from '../pages/Hajj';
import Umrah from '../pages/Umrah';
import Insurance from '../pages/Insurance';
import GroupTicket from '../pages/GroupTicket';
import Tours from '../pages/Tours';
import Logout from './../pages/Logout/Logout';
import ProtectedRoute from './ProtectedRoute';
import Loader from '../common/Loader';

const Routers = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      {/* protected route starts */}
      <Route path="" element={<ProtectedRoute />}>
        <Route
          index
          element={
            <>
              <PageTitle title="eCommerce Dashboard | Flying Bird Admin" />
              <ECommerce />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | Flying Bird Admin" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | Flying Bird Admin" />
              <Profile />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | Flying Bird Admin" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | Flying Bird Admin" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | Flying Bird Admin" />
              <Tables />
            </>
          }
        />
        <Route
          path="/visa"
          element={
            <>
              <PageTitle title="Visa | Flying Bird Admin" />
              <Suspense fallback={<Loader/>}>
                <Visa />
              </Suspense>
              
            </>
          }
        />
        <Route
          path="/hajj"
          element={
            <>
              <PageTitle title="Hajj | Flying Bird Admin" />
              {/* <Visa /> */}
              <Hajj/>
            </>
          }
        />
        <Route
          path="/umrah"
          element={
            <>
              <PageTitle title="Umrah | Flying Bird Admin" />
              {/* <Visa /> */}
              <Umrah />
            </>
          }
        />
        <Route
          path="/insurance"
          element={
            <>
              <PageTitle title="Insurance | Flying Bird Admin" />
              {/* <Visa /> */}
              <Insurance />
            </>
          }
        />
        <Route
          path="/groupticket"
          element={
            <>
              <PageTitle title="groupticket | Flying Bird Admin" />
              {/* <Visa /> */}
              <GroupTicket />
            </>
          }
        />
        <Route
          path="/tours"
          element={
            <>
              <PageTitle title="Tours | Flying Bird Admin" />
              {/* <Visa /> */}
              <Tours />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | Flying Bird Admin" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | Flying Bird Admin" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | Flying Bird Admin" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | Flying Bird Admin" />
              <Buttons />
            </>
          }
        />

        <Route
          path="/logout"
          element={
            <>
              <Logout />
            </>
          }
        />
      </Route>
      <Route
        path="/auth/signin"
        element={
          <>
            <PageTitle title="Signin | Flying Bird Admin" />
            <SignIn />
          </>
        }
      />
      <Route
        path="/auth/signup"
        element={
          <>
            <PageTitle title="Signup | Flying Bird Admin" />
            <SignUp />
          </>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routers;
