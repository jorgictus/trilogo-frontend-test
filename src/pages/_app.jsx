import 'antd/dist/antd.css';
import '../styles/global.css';
import { storeWrapper } from '../store';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default storeWrapper.withRedux(MyApp);
