// app/about/page.js
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-gray-50 text-gray-900">
            {/* Hero Section */}
            <section className="bg-white border-b border-gray-200 py-16 px-8">
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-5xl font-bold tracking-tight mb-6">About Us</h1>
                    <p className="text-lg text-gray-600">
                        We are a company committed to empowering developers by providing modern, scalable, and robust tools.
                    </p>
                </div>
            </section>

            <Separator className="my-8" />

            {/* Mission Section */}
            <section className="py-16 px-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                    <p className="text-lg text-gray-700">
                        Our mission is to simplify the lives of developers by offering tools that enable them to build world-class applications without the need for complex backend setups.
                    </p>
                </div>
            </section>

            <Separator className="my-8" />

            {/* Team Section */}
            <section className="py-16 px-8 bg-gray-100">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Team</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: "John Doe", role: "CEO", image: "https://via.placeholder.com/150" },
                            { name: "Jane Smith", role: "CTO", image: "https://via.placeholder.com/150" },
                            { name: "Michael Brown", role: "COO", image: "https://via.placeholder.com/150" },
                        ].map((member, idx) => (
                            <Card key={idx} className="hover:shadow-xl transition-shadow">
                                <CardHeader className="p-0">
                                    <Image
                                        width={200}
                                        height={200}
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-48 object-cover rounded-t"
                                    />
                                </CardHeader>
                                <CardContent className="text-center">
                                    <CardTitle className="text-xl font-semibold">{member.name}</CardTitle>
                                    <CardDescription className="text-gray-500">{member.role}</CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <Separator className="my-8" />

            {/* Call to Action */}
            <section className="py-16 px-8 bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">Want to learn more?</h2>
                    <p className="text-lg text-gray-600 mb-6">
                        Get in touch with us to learn how we can support your development journey.
                    </p>
                    <Button size="lg" className="bg-green-500 text-white hover:bg-green-600">
                        Contact Us
                    </Button>
                </div>
            </section>
        </main>
    );
}
