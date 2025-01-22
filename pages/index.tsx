import AuthenticatedUser from "@/components/AuthenticatedUser";
import Header from "../components/Header";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function Home() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalTrainers: 0,
    upcomingCourses: 0,
    completedCourses: 0,
  });
  

  const user = "John Doe";

  const handleSignOut = () => {
    // Add sign-out logic here
    localStorage.removeItem('token');
    document.cookie = 'token=; Max-Age=0; path=/;';

    router.push('/signup');
  };

  const fetchStats = async () => {
    try {
      const coursesResponse = await fetch("/api/course");
      const trainersResponse = await fetch("/api/trainer");

      const coursesData = await coursesResponse.json();
      const trainersData = await trainersResponse.json();

      if (coursesData.success && trainersData.success) {
        setStats({
          totalCourses: coursesData.data.length,
          totalTrainers: trainersData.data.length,
          upcomingCourses: 0, // Add logic for upcomingCourses if applicable
          completedCourses: 0, // Add logic for completedCourses if applicable
        });
      } else {
        console.error("Failed to fetch stats:", {
          courses: coursesData.message,
          trainers: trainersData.message,
        });
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div>
      <Header user={user} onSignOut={handleSignOut} />
      <main className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Total Courses</h2>
            <p className="text-3xl font-bold text-blue-600">
              {stats.totalCourses}
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Total Trainers</h2>
            <p className="text-3xl font-bold text-green-600">
              {stats.totalTrainers}
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Upcoming Courses</h2>
            <p className="text-3xl font-bold text-orange-600">
              {stats.upcomingCourses}
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Completed Courses</h2>
            <p className="text-3xl font-bold text-gray-600">
              {stats.completedCourses}
            </p>
          </div>
        </div>
        <div className="flex space-x-4">
          <Link
            href="/courses"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600"
          >
            View Courses
          </Link>
          <Link
            href="/trainers"
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600"
          >
            View Trainers
          </Link>
        </div>
      </main>
    </div>
  );
}

export default AuthenticatedUser(Home);