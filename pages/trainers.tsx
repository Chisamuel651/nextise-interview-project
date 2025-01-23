import { useEffect, useState } from "react";
import Header from "../components/Header";
import AuthenticatedUser from "@/components/AuthenticatedUser";
import CreateTrainerForm from "./forms/CreateTrainerForm";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/router";
import UpdateTrainerForm from "./forms/UpdateTrainerForm";

function Trainers() {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState<any | null>(null);
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

  const handleDeleteTrainer = async (trainerId: number) => {
    if (!confirm('Are you sure you want to delete this trainer?')) return;

    try {
      const response = await fetch(`/api/trainer/${trainerId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        toast({ title: 'Success', description: 'Trainer deleted successfully.' });
        fetchTrainers();
      } else {
        toast({
          title: 'Error',
          description: data.message || 'Failed to delete trainer.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred while deleting the trainer.',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchTrainers()
  }, []);

  const user = "John Doe"; // Replace with actual user logic

  const handleSignOut = () => {
    // Add sign-out logic here
    localStorage.removeItem('token');
    document.cookie = 'token=; Max-Age=0; path=/;';

    router.push('/signup');
  };

  const handleTrainerCreated = () => {
    setIsDialogOpen(false);
    fetchTrainers();
  }

  const handleTrainerUpdated = () => {
    setIsEditDialogOpen(false);
    fetchTrainers();
  };

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
                  <td className="py-3 px-4 text-blak font-bold text-lg">{trainer.name}</td>
                  <td className="py-3 px-4 text-blak font-bold text-lg">
                    {trainer.trainingSubjects && Array.isArray(trainer.trainingSubjects)
                      ? trainer.trainingSubjects.join(", ")
                      : "No subjects"}
                  </td>
                  <td className="py-3 px-4 text-blak font-bold text-lg">{trainer.location}</td>
                  <td className="py-3 px-4 text-blak font-bold text-lg">
                    <a
                      href={`mailto:${trainer.email}`}
                      className="text-blue-500 hover:underline"
                    >
                      {trainer.email}
                    </a>
                  </td>
                  <td className="py-3 px-4 flex space-x-2 text-blak font-bold text-lg">
                    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                      <DialogTrigger asChild>
                        <button
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                          onClick={() => {
                            setSelectedTrainer(trainer);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          Edit
                        </button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px] bg-white">
                        <DialogHeader>
                          <DialogTitle>Edit Trainer</DialogTitle>
                          <DialogDescription>
                            Update the trainer details below.
                          </DialogDescription>
                        </DialogHeader>
                        {selectedTrainer && (
                          <UpdateTrainerForm
                            trainer={selectedTrainer}
                            onTrainerUpdated={handleTrainerUpdated}
                          />
                        )}
                      </DialogContent>
                    </Dialog>
                    <button
                      onClick={() => handleDeleteTrainer(trainer.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
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
