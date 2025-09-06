import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import { Register } from "./pages/Register/Register";
import ExpenseForm from "./pages/ExpenseForm/ExpenseForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import { UserProvider } from "./context/UserContext";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/expenses/new"
            element={
              <ProtectedRoute>
                <ExpenseForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/expenses/:id/edit"
            element={
              <ProtectedRoute>
                <ExpenseForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
        </Routes>
      </UserProvider>
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
