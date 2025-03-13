import { Routes, Route } from "react-router";
import { Landing } from "@/pages/Landing";
import { Login } from "@/pages/App/Login/Login";
import { Register } from "@/pages/App/Login/Register";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.js";
import { Dashboard } from "@/pages/App/Dashboard/Dashboard";
import { Profile } from "@/pages/App/Profile"
import { RegisterFlow } from "@/pages/App/RegisterFlow"
import { CashStats } from "@/pages/App/CashStats"
import { GenReport } from "@/pages/App/GenReport"
import { Settings } from "@/pages/App/Settings"

import { InitialStep } from "@/pages/App/SetupAcc/InitialStep.jsx";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/complete_profile"
          element={
            <ProtectedRoute>
              <InitialStep />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
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
          path="/register_flow"
          element={
            <ProtectedRoute>
              <RegisterFlow />
            </ProtectedRoute>
          }
        />
        <Route
          path="/stats"
          element={
            <ProtectedRoute>
              <CashStats />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gen_report"
          element={
            <ProtectedRoute>
              <GenReport />
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
    </AuthProvider>
  );
}

export default App;
