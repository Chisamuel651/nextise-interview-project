import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import React, { FC, useState } from 'react';

type UpdateTrainerFormProps = {
  trainer: any;
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
        <Label htmlFor="name" className="block text-sm font-medium">
          Trainer Name
        </Label>
        <Input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleInputChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <Label htmlFor="trainingSubjects" className="block text-sm font-medium">
          Training Subjects (comma-separated)
        </Label>
        <Input
          type="text"
          id="trainingSubjects"
          value={formData.trainingSubjects}
          onChange={handleInputChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <Label htmlFor="location" className="block text-sm font-medium">
          Location
        </Label>
        <Input
          type="text"
          id="location"
          value={formData.location}
          onChange={handleInputChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <Label htmlFor="email" className="block text-sm font-medium">
          Email
        </Label>
        <Input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleInputChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
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
