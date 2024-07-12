
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Body from './Body'; // Importa el nuevo componente Body

function App() {
  



  return (
    <div className='grid-container'>
      <Header />
      <div className="main-container">
        <Sidebar />
        <Body /> 
      </div>
    </div>
  );
}

export default App;

