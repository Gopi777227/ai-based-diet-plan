import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@getmocha/users-service/react";
import { Button } from "@/react-app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/react-app/components/ui/card";
import { Salad, LogOut, User, ClipboardList, TrendingUp, Apple, Loader2 } from "lucide-react";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, isPending, logout } = useAuth();

  useEffect(() => {
    if (!isPending && !user) {
      navigate("/");
    }
  }, [user, isPending, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
              <Salad className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
              NutriPlan India
            </span>
          </button>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {user.google_user_data?.picture ? (
                <img
                  src={user.google_user_data.picture}
                  alt={user.google_user_data.name || "User"}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                  <User className="w-4 h-4 text-orange-600" />
                </div>
              )}
              <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                {user.google_user_data?.given_name || user.email}
              </span>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome, {user.google_user_data?.given_name || "there"}! 👋
          </h1>
          <p className="text-gray-600">
            Your personalized nutrition dashboard
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card 
            className="border-0 shadow-lg shadow-orange-100/50 bg-white/80 backdrop-blur cursor-pointer hover:shadow-xl transition-all group"
            onClick={() => navigate("/create-plan")}
          >
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Apple className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Create Diet Plan</CardTitle>
              <CardDescription>
                Generate a new personalized 7-day Indian meal plan
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg shadow-green-100/50 bg-white/80 backdrop-blur cursor-pointer hover:shadow-xl transition-all group opacity-60">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ClipboardList className="w-6 h-6 text-white" />
              </div>
              <CardTitle>My Diet Plans</CardTitle>
              <CardDescription>
                View your saved diet plans and history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-xs text-gray-500">Coming soon</span>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg shadow-blue-100/50 bg-white/80 backdrop-blur cursor-pointer hover:shadow-xl transition-all group opacity-60">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Track Progress</CardTitle>
              <CardDescription>
                View charts and track your nutrition journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-xs text-gray-500">Coming soon</span>
            </CardContent>
          </Card>
        </div>

        {/* Empty State */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
          <CardContent className="py-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-100 to-green-100 flex items-center justify-center mx-auto mb-4">
              <Salad className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Diet Plans Yet</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Create your first personalized Indian diet plan based on your health profile and goals.
            </p>
            <Button 
              onClick={() => navigate("/create-plan")}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
            >
              Create Your First Plan
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
