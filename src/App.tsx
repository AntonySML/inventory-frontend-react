import "./App.css";
import { AppRouter } from "./AppRouter";
import { AuthProvider } from "@/context/global.provider";
import { useAuth } from "./context/global.context";

function AppContent() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <div className="loading-screen">Cargando datos de sesión...</div>;
  }

  return <AppRouter />;
}

function App() {
  return (
    <>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </>
  );
}

export default App;
