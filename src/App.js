import './App.css';

import DataProvider from './Components/DataProvider';
import Home from './Components/Home';
function App() {
  return (
    <div className="App">
      <DataProvider>
        <Home/>
      </DataProvider>
    </div>
  );
}

export default App;
