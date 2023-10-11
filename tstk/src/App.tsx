import { Provider } from 'react-redux';
import Layout from './components/Layout';
import { store } from './stores/store'

function App():JSX.Element {
  return <Provider store={store} ><Layout /></Provider>;
}

export default App;
