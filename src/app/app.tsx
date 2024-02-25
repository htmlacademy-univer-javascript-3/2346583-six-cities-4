import FrontPage from '../front/front-page';

type AppProps = {
  offersCount: number;
};

function App({offersCount}: AppProps): JSX.Element {
  return (
    <FrontPage offersCount = {offersCount} />
  );
}

export default App;
