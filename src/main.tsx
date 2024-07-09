import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ErrorBoundary from "./components/error.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
