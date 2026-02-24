import { BrowserRouter as Router, Routes, Route } from "react-router";
import { AuthProvider } from "@getmocha/users-service/react";
import HomePage from "@/react-app/pages/Home";
import AuthCallbackPage from "@/react-app/pages/AuthCallback";
import DashboardPage from "@/react-app/pages/Dashboard";
import CreatePlanPage from "@/react-app/pages/CreatePlan";
import MealPlanPage from "@/react-app/pages/MealPlan";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/create-plan" element={<CreatePlanPage />} />
          <Route path="/meal-plan/:id" element={<MealPlanPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
