import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import React, { FC, useState } from 'react'

type UpdateCourseFormProps = {
    course: {
        id: number;
        name: string;
        date: string;
        subject: string;
        location: string;
        participants: number;
        notes: string;
        price: number;
        trainerPrice: number;
      };
    onCourseUpdated: () => void;
}

const UpdateCourseForm: FC<UpdateCourseFormProps> = ({
    course,
    onCourseUpdated,
}) => {

    const [formData, setFormData] = useState({
        name: course.name || "",
        date: course.date || "",
        subject: course.subject || "",
        location: course.location || "",
        participants: course.participants || 0,
        notes: course.notes || "",
        price: course.price || 0,
        trainerPrice: course.trainerPrice || 0,
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: id === "participants" || id === "price" || id === "trainerPrice" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        

        try {
            const response = await fetch(`/api/course/${course.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                toast({
                    title: "Success",
                    description: "Course updated successfully.",
                });
                onCourseUpdated();
            } else {
                toast({
                    title: "Error",
                    description: data.message || "Failed to update course.",
                    variant: "destructive",
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "An error occurred while updating the course.",
                variant: "destructive",
            });
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
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-blak font-bold text-lg"
                    />
                </div>
                <div>
                    <Label htmlFor="date" className="block text-lg font-bold">
                        Date
                    </Label>
                    <Input
                        name="date"
                        type="date"
                        id="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-blak font-bold text-lg"
                    />
                </div>
                <div>
                    <Label htmlFor="subject" className="block text-lg font-bold">
                        Subject
                    </Label>
                    <Input
                        name="subject"
                        type="text"
                        id="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-blak font-bold text-lg"
                    />
                </div>
                <div>
                    <Label htmlFor="location" className="block text-lg font-bold">
                        Location
                    </Label>
                    <Input
                        name="location"
                        type="text"
                        id="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-blak font-bold text-lg"
                    />
                </div>
                <div>
                    <Label htmlFor="participants" className="block text-lg font-bold">
                        Participants
                    </Label>
                    <Input
                        name="participants"
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
                        name="notes"
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
                        name="price"
                        type="number"
                        id="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-blak font-bold text-lg"
                    />
                </div>
                <div>
                    <Label htmlFor="trainerPrice" className="block text-lg font-bold">
                        Trainer Price
                    </Label>
                    <Input
                        name="trainerPrice"
                        type="number"
                        id="trainerPrice"
                        value={formData.trainerPrice}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-blak font-bold text-lg"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
                >
                    Update Course
                </button>
            </form>
        </div>
    )
}

export default UpdateCourseForm

export async function getServerSideProps(context: any) {
    const { id } = context.params;
  
    const response = await fetch(`https://nextise.vercel.app/api/course/${id}`);
    const course = await response.json();
  
    if (!course) {
      return {
        notFound: true, // Render a 404 page if the course doesn't exist
      };
    }
  
    return {
      props: { course },
    };
  }
