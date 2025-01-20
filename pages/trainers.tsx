import { useEffect, useState } from "react";
import Header from "../components/Header";
import AuthenticatedUser from "@/components/AuthenticatedUser";
import CreateTrainerForm from "./forms/CreateTrainerForm";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function Trainers() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [trainers, setTrainers] = useState([]);

  const fetchTrainers = async () => {
    try {
      const response = await fetch('/api/trainer');
      const data = await response.json();

      if (data.success) {
        setTrainers(data.data);
      } else {
        console.error('Failed to fetch trainers', data.message);
      }
    } catch (error) {
      console.error('Error fetching trainers', error);

    }
  };

  useEffect(() => {
    fetchTrainers()
  }, []);
  // const [trainers] = useState([
  //   {
  //     id: "1",
  //     trainerName: "Jane Doe",
  //     trainerSubjects: ["React.js", "Next.js"],
  //     trainerLocation: "Stuttgart, Germany",
  //     trainerEmail: "jane.doe@example.com",
  //   },
  // ]);

  const user = "John Doe"; // Replace with actual user logic

  const handleSignOut = () => {
    // Add sign-out logic here
    console.log("User signed out");
  };

  const handleTrainerCreated = () => {
    setIsDialogOpen(false);
    fetchTrainers();
  }

  return (
    <div>
      <Header user={user} onSignOut={handleSignOut} />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Trainers</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="w-full bg-gray-100 border-b">
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                  Trainer Name
                </th>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                  Subjects
                </th>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                  Location
                </th>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                  Email
                </th>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {trainers.map((trainer: any) => (
                <tr key={trainer.id} className="border-b">
                  <td className="py-3 px-4">{trainer.name}</td>
                  <td className="py-3 px-4">
                    {trainer.trainingSubjects && Array.isArray(trainer.trainingSubjects)
                      ? trainer.trainingSubjects.join(", ")
                      : "No subjects"}
                  </td>
                  <td className="py-3 px-4">{trainer.location}</td>
                  <td className="py-3 px-4">
                    <a
                      href={`mailto:${trainer.email}`}
                      className="text-blue-500 hover:underline"
                    >
                      {trainer.email}
                    </a>
                  </td>
                  <td className="py-3 px-4 flex space-x-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-8 flex justify-end">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>Create New Trainer</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-white">
                <div>
                  <DialogHeader>
                    <DialogTitle>Create a New Trainer</DialogTitle>
                    <DialogDescription>
                      Fill in the details below to create a new trainer for your trainers.
                    </DialogDescription>
                  </DialogHeader>
                  <CreateTrainerForm onTrainerCreated={handleTrainerCreated} />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthenticatedUser(Trainers);
