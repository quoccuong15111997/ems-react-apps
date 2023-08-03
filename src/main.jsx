import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { reducers } from "./reducers";
import { createLogger } from "redux-logger";
import { ContextProvider } from "./context/ContextProvider";
const logger = createLogger();
const store = createStore(reducers, compose(applyMiddleware(thunk, logger)));
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ContextProvider store={store}>
      <App />
    </ContextProvider>
  </Provider>
);
