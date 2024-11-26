import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Heart } from "lucide-react"; // Import ikon dari Lucide

const testimonials = [
    {
        name: "Olivia Martin",
        email: "olivia.martin@email.com",
        avatar: "/FE/img02.png",
        feedback:
            "Dashboard, cards, authentication. Some examples built using the components. Use this as a guide to build your own.",
    },
    {
        name: "James Smith",
        email: "james.smith@email.com",
        avatar: "/FE/img02.png",
        feedback:
            "This platform has transformed the way I approach my projects. The UI components are intuitive and easy to implement.",
    },
    {
        name: "Sophia Brown",
        email: "sophia.brown@email.com",
        avatar: "/FE/img02.png",
        feedback:
            "I highly recommend these tools for anyone building modern web applications. A great time-saver!",
    },
    {
        name: "Sophia Brown",
        email: "sophia.brown@email.com",
        avatar: "/FE/img02.png",
        feedback:
            "I highly recommend these tools for anyone building modern web applications. A great time-saver!",
    },
    {
        name: "Sophia Brown",
        email: "sophia.brown@email.com",
        avatar: "/FE/img02.png",
        feedback:
            "I highly recommend these tools for anyone building modern web applications. A great time-saver!",
    },
    {
        name: "Sophia Brown",
        email: "sophia.brown@email.com",
        avatar: "/FE/img02.png",
        feedback:
            "I highly recommend these tools for anyone building modern web applications. A great time-saver!",
    },
];

export default function HomeTestimoni() {
    return (
        <section className="px-4 py-12 bg-white">
            <div className=" mx-auto py-4 container grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((testimonial, index) => (
                    <Card
                        key={index}
                        className="border-gray-300 shadow-sm rounded-lg"
                    >
                        <CardHeader className="px-4 pt-4 pb-2 flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                {/* Avatar and Info */}
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">
                                            {testimonial.name}
                                        </p>
                                        <p className="text-sm text-gray-500">{testimonial.email}</p>
                                    </div>
                                </div>
                                {/* Lucide Icon */}
                                <Heart className="w-6 h-6 text-pink-600" />
                            </div>
                        </CardHeader>
                        <CardContent className="px-4 pb-4">
                            <p className="text-sm text-gray-500">{testimonial.feedback}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
