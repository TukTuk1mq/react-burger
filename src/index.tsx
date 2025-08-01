import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "../src/services/store";
import "./index.css";
import { App } from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <DndProvider backend={HTML5Backend}>
      <App />
    </DndProvider>
  </Provider>
);

reportWebVitals();
