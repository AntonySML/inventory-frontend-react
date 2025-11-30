import "./App.css";
import { AppRouter } from "./AppRouter";
import { AuthProvider } from "@/context/global.provider";
import { useAuth } from "./context/global.context";
import CircularProgress from '@mui/material/CircularProgress';

function AppContent() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <CircularProgress size="3rem" />;
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
