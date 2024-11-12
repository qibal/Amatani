import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
    return (
        <div className="h-screen w-full flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 bg-white p-8 flex flex-col justify-center items-center min-h-screen">
                <div className="w-full max-w-md">
                    <h1 className="text-2xl font-semibold mb-2">Sign in</h1>
                    <p className="mb-6 text-gray-600">Log in to unlock tailored content and stay connected with your community.</p>

                    <Button variant="outline" className="mb-2 w-full flex items-center justify-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
                            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                        </svg>
                        <span>Sign in with Google</span>
                    </Button>

                    <Button variant="outline" className="mb-4 w-full flex items-center justify-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 30 30">
                            <path d="M25.565,9.785c-0.123,0.077-3.051,1.702-3.051,5.305c0.138,4.109,3.695,5.55,3.756,5.55 c-0.061,0.077-0.537,1.963-1.947,3.94C23.204,26.283,21.962,28,20.076,28c-1.794,0-2.438-1.135-4.508-1.135 c-2.223,0-2.852,1.135-4.554,1.135c-1.886,0-3.22-1.809-4.4-3.496c-1.533-2.208-2.836-5.673-2.882-9 c-0.031-1.763,0.307-3.496,1.165-4.968c1.211-2.055,3.373-3.45,5.734-3.496c1.809-0.061,3.419,1.242,4.523,1.242 c1.058,0,3.036-1.242,5.274-1.242C21.394,7.041,23.97,7.332,25.565,9.785z M15.001,6.688c-0.322-1.61,0.567-3.22,1.395-4.247 c1.058-1.242,2.729-2.085,4.17-2.085c0.092,1.61-0.491,3.189-1.533,4.339C18.098,5.937,16.488,6.872,15.001,6.688z"></path>
                        </svg>
                        <span>Sign in with Apple</span>
                    </Button>

                    <div className="text-center mb-4">OR</div>

                    <form>
                        <Input placeholder="Email" className="mb-4" />
                        <Input placeholder="Password" type="password" className="mb-4" />

                        <div className="flex justify-between items-center mb-4">
                            <Checkbox label="Keep me signed in" />
                            <a href="#" className="text-sm text-blue-500 hover:underline">Forgot password?</a>
                        </div>

                        <Button className="w-full mb-4">Sign in</Button>
                    </form>

                    <p className="text-center text-sm">
                        Don’t have an account? <a href="#" className="text-blue-500 hover:underline">Sign up</a>
                    </p>
                </div>
            </div>

            {/* Bagian kanan dengan gambar */}
            <div className="hidden md:flex w-1/2 bg-gray-100 items-center justify-center">
                <img src="/FE/img01.jpg" alt="Background Image" className="w-full h-full object-cover" />
            </div>
        </div>
    );
}