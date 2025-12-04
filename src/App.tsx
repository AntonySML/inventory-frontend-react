import "./App.css";
import { AppRouter } from "./AppRouter";
import { AuthProvider } from "@/context/global.provider";
import { useAuth } from "./context/global.context";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import { ModalProvider } from "./components/Modal/context/modal.provider";

function AppContent() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <Container
        fixed
        sx={{
          width: "100%",
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size="60px" />;
      </Container>
    );
  }

  return <AppRouter />;
}

function App() {
  return (
    <>
      <AuthProvider>
        <ModalProvider>
          <AppContent />
        </ModalProvider>
      </AuthProvider>
    </>
  );
}

export default App;
