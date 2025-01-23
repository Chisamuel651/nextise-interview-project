import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import React, { useState } from 'react'

const CreateCourseForm = ({ onCourseCreated }: { onCourseCreated: () => void }) => {
    const [formData, setFormData] = useState({
        name: "",
        date: "",
        subject: "",
        location: "",
        participants: 0,
        notes: "",
        price: 0,
        trainerPrice: 0,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: id === "participants" || id === "price" || id === "trainerPrice" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/course", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (data.success) {
                toast({ title: "Success", description: "Course created successfully." });
                setFormData({
                    name: "",
                    date: "",
                    subject: "",
                    location: "",
                    participants: 0,
                    notes: "",
                    price: 0,
                    trainerPrice: 0,
                });
                onCourseCreated();
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
                        Course Name
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
                    <Label htmlFor="date" className="block text-lg font-bold">
                        Date
                    </Label>
                    <Input
                        name='date'
                        type="date"
                        id="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-blak font-bold text-lg"
                    />
                </div>
                <div>
                    <Label htmlFor="subject" className="block text-lg font-bold">
                        Subject
                    </Label>
                    <Input
                        name='subject'
                        type="text"
                        id="subject"
                        value={formData.subject}
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
                    <Label htmlFor="participants" className="block text-lg font-bold">
                        Participants
                    </Label>
                    <Input
                        name='participants'
                        type="number"
                        id="participants"
                        value={formData.participants}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-blak font-bold text-lg"
                    />
                </div>
                <div>
                    <Label htmlFor="notes" className="block text-lg font-bold">
                        Notes
                    </Label>
                    <Textarea
                        name='notes'
                        id="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-blak font-bold text-lg"
                    ></Textarea>
                </div>
                <div>
                    <Label htmlFor="price" className="block text-lg font-bold">
                        Price
                    </Label>
                    <Input
                        name='price'
                        type="number"
                        id="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-blak font-bold text-lg"
                    />
                </div>
                <div>
                    <Label htmlFor="trainerPrice" className="block text-lg font-bold">
                        Trainer Price
                    </Label>
                    <Input
                        name='trainer_price'
                        type="number"
                        id="trainerPrice"
                        value={formData.trainerPrice}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-blak font-bold text-lg"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
                >
                    Create Course
                </button>
            </form>
        </div>
    )
}

export default CreateCourseForm
