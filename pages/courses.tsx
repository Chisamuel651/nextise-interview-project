import AuthenticatedUser from "@/components/AuthenticatedUser";
import Header from "../components/Header";
import { Button } from "@/components/ui/button";
import CreateCourseForm from "./forms/CreateCourseForm";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import UpdateCourseForm from "./forms/UpdateCourseForm";
import { Loader } from "lucide-react";

type Trainer = {
  id: number;
  name: string;
  trainingSubjects: string[];
  location: string;
  email: string;
};

type Course = {
  id: number;
  name: string;
  date: string;
  subject: string;
  location: string;
  participants: number;
  notes: string;
  price: number;
  trainerPrice: number;
  trainer?: Trainer | null;
};

function Courses() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [selectedTrainer, setSelectedTrainer] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState({
    delete: {} as Record<number, boolean>,
    assign: {} as Record<number, boolean>,
  });

  const updateLoadingState = (type: 'delete' | 'assign', id: number, loading: boolean) => {
    setLoading((prev) => ({
      ...prev,
      [type]: { ...prev[type], [id]: loading },
      
    }));
  }

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

  const deleteCourse = async (courseId: number) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    updateLoadingState('delete', courseId, true);

    try {
      const response = await fetch(`/api/course/${courseId}`, { method: "DELETE" });
      const data = await response.json();
      if (data.success) {
        toast({ title: "Success", description: "Course deleted successfully." });
        fetchCourses();
      } else {
        toast({ title: "Error", description: "Failed to delete course.", variant: "destructive" });
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      toast({ title: "Error", description: "An error occurred while deleting the course.", variant: "destructive" });
    }finally {
      updateLoadingState('delete', courseId, false)
    }
  };

  const assignTrainer = async (courseId: number, trainerId: number) => {
    updateLoadingState("assign", courseId, true);
    try {
      const trainerEmail = trainers.find((trainer) => trainer.id === trainerId)?.email;
      const courseDetails = courses.find((course) => course.id === courseId);

      const response = await fetch('/api/course-trainer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId, trainerId, trainerEmail, courseDetails }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "success",
          description: 'Trainer has been assigned to the course successfully',
        })
        fetchCourses();
      } else {
        console.error('Failed to assign trainer', data.message);
        toast({
          title: 'Error',
          description: 'This course has already been assigned to a trainer.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error assigning trainer:', error);
    }finally {
      updateLoadingState("assign", courseId, false);
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

  const handleTrainerSelection = (courseId: number, trainerId: number) => {
    setSelectedTrainer((prev) => ({ ...prev, [courseId]: trainerId }));
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
            {Array.isArray(courses) && courses.map((course: any) => (
              <tr key={course.id}>
                <td className="py-3 px-4 border-b">{course.name}</td>
                <td className="py-3 px-4 border-b">{course.date}</td>
                <td className="py-3 px-4 border-b">{course.subject}</td>
                <td className="py-3 px-4 border-b">{course.location}</td>

                <td className="py-3 px-4 border-b">
                  {course.trainer && course.trainer.name ? (
                    <div>
                      <div>
                        <strong>{course.trainer.name}</strong>
                      </div>
                      <div>{course.trainer.email || "no email"}</div>
                    </div>
                  ) : (
                    <span>No trainer assigned</span>
                  )}
                </td>
                <td className="py-3 px-4 border-b flex space-x-2">
                  <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogTrigger asChild>
                      <button
                        onClick={() => {
                          setSelectedCourse(course);
                          setIsEditDialogOpen(true);
                        }}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-white">
                      <DialogHeader>
                        <DialogTitle>Edit Course</DialogTitle>
                        <DialogDescription>
                          Update the course details below. Leave fields empty to retain existing values.
                        </DialogDescription>
                      </DialogHeader>
                      {selectedCourse && (
                        <UpdateCourseForm
                          course={selectedCourse}
                          onCourseUpdated={() => {
                            fetchCourses();
                            setIsEditDialogOpen(false);
                          }}
                        />
                      )}
                    </DialogContent>
                  </Dialog>
                  <button
                    onClick={() => deleteCourse(course.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
                    disabled={loading.delete[course.id]}
                  >
                    {loading.delete[course.id] ? <Loader className="animate-spin w-5 h-5" /> : "Delete"}
                  </button>
                  {!course.trainer ? (
                    <div className="flex items-center space-x-2">
                      <select
                        className="border border-gray-300 px-4 py-2 rounded-lg shadow-md"
                        value={selectedTrainer[course.id] || ""}
                        onChange={(e) => handleTrainerSelection(course.id, Number(e.target.value))}
                      >
                        <option value="">Select Trainer</option>
                        {trainers.map((trainer: any) => (
                          <option key={trainer.id} value={trainer.id}>
                            {trainer.name}
                          </option>
                        ))}
                      </select>
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
                        onClick={() => assignTrainer(course.id, selectedTrainer[course.id])}
                        disabled={loading.assign[course.id]}
                      >
                        {loading.assign[course.id] ? <Loader className="animate-spin w-5 h-5" /> : "Assign Trainer"}
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
