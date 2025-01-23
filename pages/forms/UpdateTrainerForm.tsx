import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import React, { FC, useState } from 'react';

type Trainer = {
  id: number;
  name: string;
  trainingSubjects: string[];
  location: string;
  email: string;
};

type UpdateTrainerFormProps = {
  trainer: Trainer;
  onTrainerUpdated: () => void;
};


const UpdateTrainerForm: FC<UpdateTrainerFormProps> = ({ trainer, onTrainerUpdated }) => {
    
  const [formData, setFormData] = useState({
    name: trainer.name || '',
    trainingSubjects: trainer.trainingSubjects?.join(', ') || '',
    location: trainer.location || '',
    email: trainer.email || '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/trainer/${trainer.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          trainingSubjects: formData.trainingSubjects.split(',').map((subject: string) => subject.trim()),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Trainer updated successfully.',
        });
        onTrainerUpdated();
      } else {
        toast({
          title: 'Error',
          description: data.message || 'Failed to update trainer.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred while updating the trainer.',
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name" className="block text-lg font-bold">
          Trainer Name
        </Label>
        <Input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleInputChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-blak font-bold text-lg"
        />
      </div>
      <div>
        <Label htmlFor="trainingSubjects" className="block text-lg font-bold">
          Training Subjects (comma-separated)
        </Label>
        <Input
          type="text"
          id="trainingSubjects"
          value={formData.trainingSubjects}
          onChange={handleInputChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-blak font-bold text-lg"
        />
      </div>
      <div>
        <Label htmlFor="location" className="block text-lg font-bold">
          Location
        </Label>
        <Input
          type="text"
          id="location"
          value={formData.location}
          onChange={handleInputChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-blak font-bold text-lg"
        />
      </div>
      <div>
        <Label htmlFor="email" className="block text-lg font-bold">
          Email
        </Label>
        <Input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleInputChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-blak font-bold text-lg"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
      >
        Update Trainer
      </button>
    </form>
  );
};

export default UpdateTrainerForm;

// Add this after the component
export async function getServerSideProps(context: any) {
  const { id } = context.params;

  const response = await fetch(`https://nextise.vercel.app/api/trainer/${id}`);
  const trainer = await response.json();

  if (!trainer) {
    return {
      notFound: true, // Render a 404 page if the trainer doesn't exist
    };
  }

  return {
    props: { trainer },
  };
}