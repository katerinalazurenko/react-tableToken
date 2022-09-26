import './App.css';
import {TokenTable} from "./components/TokenTable";
import {Provider} from "react-redux";
import {store} from "./redux/store";

function App() {
  return (
      <Provider store={store}>
          <div className="App">
              <TokenTable/>
          </div>
      </Provider>
  );
}

export default App;
