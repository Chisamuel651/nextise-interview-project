import AuthenticatedUser from "@/components/AuthenticatedUser";
import Header from "../components/Header";
import { Button } from "@/components/ui/button";
import CreateCourseForm from "./forms/CreateCourseForm";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useEffect, useState } from "react";

const sampleTrainers = [
  {
    id: 1,
    name: "Jane Doe",
    trainingSubjects: ["React.js"],
    location: "Stuttgart",
    email: "jane.doe@example.com",
  },
  {
    id: 2,
    name: "John Smith",
    trainingSubjects: ["Node.js"],
    location: "Stuttgart",
    email: "john.smith@example.com",
  },
];

function Courses() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [trainers, setTrainers] = useState([]);

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/course');
      const data = await response.json();

      if (data.success) {
        setCourses(data.data);
      } else {
        console.error('Failed to fetch courses', data.message);
        
      }
    } catch (error) {
      console.error('Error fetching courses', error);
      
    }
  };

  const fetchTrainers = async () => {
    try {
      const response = await fetch('/api/trainer');
      const data = await response.json();

      if (data.success && Array.isArray(data.data)) {
        setTrainers(data.data)
      } else {
        console.error('Failed to fetch trainers', data.message);
        setTrainers([])
      }
    } catch (error) {
      console.error('Error fetching traienrs', error);
      setTrainers([])
    }
  }

  useEffect(() => {
    fetchCourses();
    fetchTrainers();
  }, []);

  const handleCourseCreated = () => {
    setIsDialogOpen(false);
    fetchCourses();
  }
  return (
    <div>
      <Header user="John Doe" onSignOut={() => { }} />
      <main className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8">Courses</h1>
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 border-b">Course Name</th>
              <th className="py-3 px-4 border-b">Date</th>
              <th className="py-3 px-4 border-b">Subject</th>
              <th className="py-3 px-4 border-b">Location</th>
              <th className="py-3 px-4 border-b">Trainer</th>
              <th className="py-3 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course: any) => (
              <tr key={course.id}>
                <td className="py-3 px-4 border-b">{course.name}</td>
                <td className="py-3 px-4 border-b">{course.date}</td>
                <td className="py-3 px-4 border-b">{course.subject}</td>
                <td className="py-3 px-4 border-b">{course.location}</td>

                <td className="py-3 px-4 border-b">
                  {course.trainer ? (
                    <div>
                      <div>
                        <strong>{course.trainer.name}</strong>
                      </div>
                      <div>{course.trainer.trainingSubjects.join(", ")}</div>
                      <div>{course.trainer.email}</div>
                    </div>
                  ) : (
                    <span>No trainer assigned</span>
                  )}
                </td>
                <td className="py-3 px-4 border-b flex space-x-2">
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600">
                    Delete
                  </button>
                  {!course.trainer ? (
                    <div className="flex items-center space-x-2">
                      <select
                        className="border border-gray-300 px-4 py-2 rounded-lg shadow-md"
                        defaultValue=""
                      >
                        <option value="">Select Trainer</option>
                        {trainers.map((trainer: any) => (
                          <option key={trainer.id} value={trainer.id}>
                            {trainer.name}
                          </option>
                        ))}
                      </select>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">
                        Assign Trainer
                      </button>
                    </div>
                  ) : (
                    <span>{course.trainer.name}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* popover section */}
        <div className="mt-8 flex justify-end">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Create New Course</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white">
              <div>
                <DialogHeader>
                  <DialogTitle>Create a New Course</DialogTitle>
                  <DialogDescription>
                    Fill in the details below to create a new course for your trainers.
                  </DialogDescription>
                </DialogHeader>
                <CreateCourseForm onCourseCreated={handleCourseCreated} />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
}

export default AuthenticatedUser(Courses);
