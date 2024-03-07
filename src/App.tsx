import Routers from './Routers/Routers';

function App() {
  // const [loading, setLoading] = useState<boolean>(true);
  // const { pathname } = useLocation();

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [pathname]);

  // useEffect(() => {
  //   setTimeout(() => setLoading(false), 1000);
  // }, []);

  return (
    <>
      <Routers />
    </>
  );
}

export default App;
