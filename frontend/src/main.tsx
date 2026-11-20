import App from "./App";
import React from "react";
import theme from "@/theme/theme";
import ReactDOM from "react-dom/client";
import { App as AntApp, ConfigProvider } from "antd";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <AntApp>
        <App />
      </AntApp>
    </ConfigProvider>
  </React.StrictMode>,
);
