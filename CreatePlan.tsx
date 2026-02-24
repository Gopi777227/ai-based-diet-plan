import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@getmocha/users-service/react";
import { Button } from "@/react-app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/react-app/components/ui/card";
import { Input } from "@/react-app/components/ui/input";
import { Label } from "@/react-app/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/react-app/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/react-app/components/ui/radio-group";
import { Progress } from "@/react-app/components/ui/progress";
import { 
  Salad, Heart, Scale, Activity, Utensils, ArrowLeft, Loader2, 
  Calculator, Flame, Target, Zap, ArrowRight
} from "lucide-react";
import type { NutritionCalculations } from "@/shared/nutrition";

interface HealthFormData {
  age: string;
  gender: "male" | "female" | "";
  height: string;
  weight: string;
  activityLevel: "light" | "moderate" | "heavy" | "";
  goal: "weight_loss" | "weight_gain" | "maintain" | "";
  dietaryPreference: "vegetarian" | "non_vegetarian" | "";
  healthCondition: "diabetes" | "thyroid" | "none" | "";
}

interface ProfileResult extends NutritionCalculations {
  id: number;
}

export default function CreatePlanPage() {
  const navigate = useNavigate();
  const { user, isPending } = useAuth();

  const [formData, setFormData] = useState<HealthFormData>({
    age: "",
    gender: "",
    height: "",
    weight: "",
    activityLevel: "",
    goal: "",
    dietaryPreference: "",
    healthCondition: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<ProfileResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isPending && !user) {
      navigate("/");
    }
  }, [user, isPending, navigate]);

  const handleInputChange = (field: keyof HealthFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return formData.age && formData.gender && formData.height && formData.weight &&
           formData.activityLevel && formData.goal && formData.dietaryPreference && 
           formData.healthCondition;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/health-profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          age: parseInt(formData.age),
          gender: formData.gender,
          height: parseFloat(formData.height),
          weight: parseFloat(formData.weight),
          activityLevel: formData.activityLevel,
          goal: formData.goal,
          dietaryPreference: formData.dietaryPreference,
          healthCondition: formData.healthCondition,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create health profile");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
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

  // Show results view
  if (result) {
    return <ResultsView result={result} formData={formData} onBack={() => setResult(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
              <Salad className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
              NutriPlan India
            </span>
          </button>
          <Button variant="ghost" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Diet Plan</h1>
          <p className="text-gray-600">Fill in your health profile to get a personalized 7-day Indian meal plan</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Basic Information */}
            <Card className="border-0 shadow-lg shadow-orange-100/50">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                    <Heart className="w-4 h-4 text-orange-600" />
                  </div>
                  Basic Information
                </CardTitle>
                <CardDescription>Tell us about yourself</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="age">Age (years)</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="25"
                    min="10"
                    max="100"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <RadioGroup
                    value={formData.gender}
                    onValueChange={(value) => handleInputChange("gender", value)}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male" className="font-normal cursor-pointer">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female" className="font-normal cursor-pointer">Female</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            {/* Body Measurements */}
            <Card className="border-0 shadow-lg shadow-orange-100/50">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                    <Scale className="w-4 h-4 text-green-600" />
                  </div>
                  Body Measurements
                </CardTitle>
                <CardDescription>We'll use this to calculate your BMI and calorie needs</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="170"
                    min="100"
                    max="250"
                    value={formData.height}
                    onChange={(e) => handleInputChange("height", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="70"
                    min="30"
                    max="300"
                    value={formData.weight}
                    onChange={(e) => handleInputChange("weight", e.target.value)}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Activity & Goals */}
            <Card className="border-0 shadow-lg shadow-orange-100/50">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Activity className="w-4 h-4 text-blue-600" />
                  </div>
                  Activity & Goals
                </CardTitle>
                <CardDescription>Help us understand your lifestyle</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Activity Level</Label>
                  <Select
                    value={formData.activityLevel}
                    onValueChange={(value) => handleInputChange("activityLevel", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select activity level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light (Desk job, minimal exercise)</SelectItem>
                      <SelectItem value="moderate">Moderate (Some exercise, active job)</SelectItem>
                      <SelectItem value="heavy">Heavy (Daily exercise, physical job)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Goal</Label>
                  <Select
                    value={formData.goal}
                    onValueChange={(value) => handleInputChange("goal", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weight_loss">Weight Loss</SelectItem>
                      <SelectItem value="weight_gain">Weight Gain</SelectItem>
                      <SelectItem value="maintain">Maintain Weight</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Dietary Preferences */}
            <Card className="border-0 shadow-lg shadow-orange-100/50">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Utensils className="w-4 h-4 text-purple-600" />
                  </div>
                  Dietary Preferences
                </CardTitle>
                <CardDescription>Customize your meal plan to your preferences</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Dietary Preference</Label>
                  <Select
                    value={formData.dietaryPreference}
                    onValueChange={(value) => handleInputChange("dietaryPreference", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vegetarian">🥬 Vegetarian</SelectItem>
                      <SelectItem value="non_vegetarian">🍗 Non-Vegetarian</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Health Condition</Label>
                  <Select
                    value={formData.healthCondition}
                    onValueChange={(value) => handleInputChange("healthCondition", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select if applicable" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="diabetes">Diabetes</SelectItem>
                      <SelectItem value="thyroid">Thyroid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting || !isFormValid()}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-6 text-lg shadow-lg shadow-orange-200 transition-all hover:shadow-xl hover:shadow-orange-300 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Calculating...
                </>
              ) : (
                "Generate My 7-Day Diet Plan"
              )}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}

// Results view component
function ResultsView({ 
  result, 
  formData, 
  onBack 
}: { 
  result: ProfileResult; 
  formData: HealthFormData;
  onBack: () => void;
}) {
  const navigate = useNavigate();
  
  const getBMIColor = (category: string) => {
    switch (category) {
      case "Underweight": return "text-blue-600 bg-blue-100";
      case "Normal": return "text-green-600 bg-green-100";
      case "Overweight": return "text-yellow-600 bg-yellow-100";
      case "Obese": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getDietTypeColor = (dietType: string) => {
    switch (dietType) {
      case "Low Carb": return "from-purple-500 to-purple-600";
      case "High Protein": return "from-blue-500 to-blue-600";
      case "Balanced": return "from-green-500 to-green-600";
      default: return "from-gray-500 to-gray-600";
    }
  };

  const totalMacros = result.proteinGrams + result.carbsGrams + result.fatsGrams;
  const proteinPercent = Math.round((result.proteinGrams / totalMacros) * 100);
  const carbsPercent = Math.round((result.carbsGrams / totalMacros) * 100);
  const fatsPercent = Math.round((result.fatsGrams / totalMacros) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
              <Salad className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
              NutriPlan India
            </span>
          </button>
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Modify Profile
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Calculator className="w-4 h-4" />
            Analysis Complete
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Health Analysis</h1>
          <p className="text-gray-600">Based on your profile, here are your personalized nutrition metrics</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* BMI Card */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-orange-500" />
                Body Mass Index (BMI)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-3 mb-4">
                <span className="text-5xl font-bold text-gray-900">{result.bmi}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium mb-2 ${getBMIColor(result.bmiCategory)}`}>
                  {result.bmiCategory}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Underweight</span>
                  <span>Normal</span>
                  <span>Overweight</span>
                  <span>Obese</span>
                </div>
                <div className="h-2 rounded-full bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-red-400 relative">
                  <div 
                    className="absolute w-3 h-3 bg-white border-2 border-gray-800 rounded-full -top-0.5 transform -translate-x-1/2"
                    style={{ left: `${Math.min(Math.max((result.bmi - 15) / 25 * 100, 0), 100)}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* BMR Card */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-red-500" />
                Basal Metabolic Rate (BMR)
              </CardTitle>
              <CardDescription>Calories burned at rest using Mifflin-St Jeor formula</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2">
                <span className="text-5xl font-bold text-gray-900">{result.bmr.toLocaleString()}</span>
                <span className="text-gray-500 mb-2">kcal/day</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Daily Calories & Diet Type */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                Daily Calorie Target
              </CardTitle>
              <CardDescription>
                Adjusted for {formData.activityLevel} activity & {formData.goal?.replace("_", " ")} goal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2">
                <span className="text-5xl font-bold text-gray-900">{result.dailyCalories.toLocaleString()}</span>
                <span className="text-gray-500 mb-2">kcal/day</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-500" />
                Recommended Diet Type
              </CardTitle>
              <CardDescription>Based on your goals and health conditions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className={`inline-flex px-4 py-2 rounded-xl bg-gradient-to-r ${getDietTypeColor(result.dietType)} text-white font-bold text-2xl`}>
                {result.dietType}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Macros Breakdown */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle>Daily Macronutrient Breakdown</CardTitle>
            <CardDescription>Your recommended daily intake of protein, carbs, and fats</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Protein */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">Protein</span>
                  <span className="text-sm text-gray-500">{proteinPercent}%</span>
                </div>
                <Progress value={proteinPercent} className="h-3 bg-blue-100" />
                <div className="text-center">
                  <span className="text-3xl font-bold text-blue-600">{result.proteinGrams}g</span>
                  <p className="text-xs text-gray-500 mt-1">{(result.proteinGrams * 4).toLocaleString()} kcal</p>
                </div>
              </div>

              {/* Carbs */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">Carbohydrates</span>
                  <span className="text-sm text-gray-500">{carbsPercent}%</span>
                </div>
                <Progress value={carbsPercent} className="h-3 bg-orange-100" />
                <div className="text-center">
                  <span className="text-3xl font-bold text-orange-600">{result.carbsGrams}g</span>
                  <p className="text-xs text-gray-500 mt-1">{(result.carbsGrams * 4).toLocaleString()} kcal</p>
                </div>
              </div>

              {/* Fats */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">Fats</span>
                  <span className="text-sm text-gray-500">{fatsPercent}%</span>
                </div>
                <Progress value={fatsPercent} className="h-3 bg-green-100" />
                <div className="text-center">
                  <span className="text-3xl font-bold text-green-600">{result.fatsGrams}g</span>
                  <p className="text-xs text-gray-500 mt-1">{(result.fatsGrams * 9).toLocaleString()} kcal</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Step */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-orange-500 to-green-500 text-white">
          <CardContent className="py-8 text-center">
            <h3 className="text-2xl font-bold mb-2">Ready for Your Meal Plan?</h3>
            <p className="text-white/90 mb-6">
              Get a personalized 7-day Indian meal plan based on your analysis
            </p>
            <Button 
              size="lg"
              className="bg-white text-orange-600 hover:bg-orange-50"
              onClick={() => navigate(`/meal-plan/${result.id}`)}
            >
              View 7-Day Meal Plan
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
