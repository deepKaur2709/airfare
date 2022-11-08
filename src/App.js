import AppRouter from './core/approuter'
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
       <ToastContainer />
       <AppRouter />
    </div>
  );
}

export default App;
