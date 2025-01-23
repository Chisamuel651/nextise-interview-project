import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import React, { useState } from 'react'

const CreateTrainerForm = ({ onTrainerCreated }: { onTrainerCreated: () => void }) => {
    const [formData, setFormData] = useState({
        name: "",
        trainingSubjects: "",
        location: "",
        email: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/trainer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    trainingSubjects: formData.trainingSubjects.split(',').map(subject => subject.trim()),
                }),
                
            });

            const data = await response.json();
            if (data.success) {
                toast({ title: "Success", description: "Trainer created successfully." });
                setFormData({
                    name: "",
                    trainingSubjects: "",
                    location: "",
                    email: "",
                });
                onTrainerCreated();
            } else {
                toast({ title: "Error", description: 'An error occured', variant: "destructive" });
            }
        } catch (error) {
            console.error("Error creating course:", error);
            toast({ title: "Error", description: "An error occurred while creating the course.", variant: "destructive" });
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="name" className="block text-lg font-bold">
                        Trainer Name
                    </Label>
                    <Input
                        type="text"
                        name='name'
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-blak font-bold text-lg"
                    />
                </div>
                <div>
                    <Label htmlFor="training_subjects" className="block text-lg font-bold">
                        Training Subjects
                    </Label>
                    <Input
                        name='training_subjects'
                        type="text"
                        id="trainingSubjects"
                        value={formData.trainingSubjects}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-blak font-bold text-lg"
                    />
                </div>
                <div>
                    <Label htmlFor="location" className="block text-lg font-bold">
                        Location
                    </Label>
                    <Input
                        name='location'
                        type="text"
                        id="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-blak font-bold text-lg"
                    />
                </div>
                <div>
                    <Label htmlFor="email" className="block text-lg font-bold">
                        Trainer Email
                    </Label>
                    <Input
                        name='email'
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
                    Create Trainer
                </button>
            </form>
        </div>
    )
}

export default CreateTrainerForm
