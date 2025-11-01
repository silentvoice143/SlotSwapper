import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRoutes from "./libs/routes/appRoutes";

function App() {
  return (
    <div className="min-h-screen w-full overflow-hidden">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
