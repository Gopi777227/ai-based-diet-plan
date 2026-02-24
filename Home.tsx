import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@getmocha/users-service/react";
import { Button } from "@/react-app/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/react-app/components/ui/card";
import { Apple, Salad, Target, TrendingUp, Scale, Loader2 } from "lucide-react";

export default function HomePage() {
  const navigate = useNavigate();
  const { user, isPending, redirectToLogin } = useAuth();

  useEffect(() => {
    if (!isPending && user) {
      navigate("/dashboard");
    }
  }, [user, isPending, navigate]);

  if (isPending) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Hero Section */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
              <Salad className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
              NutriPlan India
            </span>
          </div>
          <Button 
            onClick={redirectToLogin}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
          >
            Sign In with Google
          </Button>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Apple className="w-4 h-4" />
                AI-Powered Nutrition Planning
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Personalized Indian Diet Plans
                <br />
                <span className="bg-gradient-to-r from-orange-500 to-green-500 bg-clip-text text-transparent">
                  Tailored Just for You
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                Get a science-backed 7-day meal plan with authentic Indian foods, 
                calculated based on your BMI, BMR, and health goals.
              </p>
              <Button 
                size="lg" 
                onClick={redirectToLogin}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-lg px-8 py-6 shadow-lg shadow-orange-200 hover:shadow-xl hover:shadow-orange-300 transition-all"
              >
                Get Started Free
              </Button>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-16">
              <Card className="border-0 shadow-xl shadow-orange-100/50 bg-white/80 backdrop-blur hover:shadow-2xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center mb-4">
                    <Scale className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Smart Calculations</CardTitle>
                  <CardDescription>
                    Accurate BMI, BMR using Mifflin-St Jeor formula, and daily calorie calculations based on your activity level
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-xl shadow-green-100/50 bg-white/80 backdrop-blur hover:shadow-2xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Goal-Based Plans</CardTitle>
                  <CardDescription>
                    Whether you want to lose weight, gain muscle, or maintain - get diet types like Low Carb, High Protein, or Balanced
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-xl shadow-blue-100/50 bg-white/80 backdrop-blur hover:shadow-2xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Track Progress</CardTitle>
                  <CardDescription>
                    Interactive dashboard with charts to visualize your nutrition breakdown and track your health journey
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Foods Section */}
        <section className="py-16 px-4 bg-white/50">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Authentic Indian Cuisine</h2>
            <p className="text-gray-600 mb-8">
              Our meal plans feature delicious, nutritious Indian foods you'll love
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Idli", "Dosa", "Upma", "Chapati", "Brown Rice", "Dal",
                "Rajma", "Paneer", "Chicken Curry", "Egg Curry", "Sprouts",
                "Fruits", "Curd", "Buttermilk", "Poha", "Paratha"
              ].map((food) => (
                <span
                  key={food}
                  className="px-4 py-2 bg-gradient-to-r from-orange-50 to-green-50 border border-orange-200 rounded-full text-gray-700 font-medium hover:shadow-md transition-shadow"
                >
                  {food}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  1
                </div>
                <h3 className="text-lg font-semibold mb-2">Create Your Profile</h3>
                <p className="text-gray-600">Enter your age, height, weight, activity level, and health goals</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  2
                </div>
                <h3 className="text-lg font-semibold mb-2">Get Your Analysis</h3>
                <p className="text-gray-600">We calculate your BMI, BMR, and daily calorie needs</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  3
                </div>
                <h3 className="text-lg font-semibold mb-2">Receive Your Plan</h3>
                <p className="text-gray-600">Get a personalized 7-day Indian meal plan with PDF download</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-orange-500 to-green-500">
          <div className="container mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Diet?
            </h2>
            <p className="text-white/90 mb-8">
              Join thousands who have improved their health with personalized Indian diet plans
            </p>
            <Button 
              size="lg" 
              onClick={redirectToLogin}
              className="bg-white text-orange-600 hover:bg-orange-50 text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
            >
              Get Your Free Diet Plan
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2025 NutriPlan India. Built for B.Tech Capstone Project.</p>
        </div>
      </footer>
    </div>
  );
}
