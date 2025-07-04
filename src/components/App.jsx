import Body from "./Body";
import { Provider } from "react-redux";
import store from "../utils/redux/appStore";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Provider store={store}>
        <Body />
      </Provider>
    </>
  );
}

export default App;
