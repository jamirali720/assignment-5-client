import ProtectedRoute from "./components/Protected_Route/ProtectedRoute";
import "./App.css";
import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <ProtectedRoute>
      <MainLayout />
    </ProtectedRoute>
  );
}

export default App;
