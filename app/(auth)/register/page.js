import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

export default function RegisterPage() {
    return (
        <div>
            <div>
                {/* Navbar Header (Tingkat Atas) */}
                <nav className="flex justify-between items-center py-4 bg-white shadow-sm px-6">
                    {/* Kiri: Logo */}
                    <div className="flex items-center gap-4">
                        {/* Logo dengan gambar */}
                        <img src="/FE/img02.png" alt="Logo kitaPanen" width={50} height={50} className="w-[60px] h-[60px]" />
                        <p className="text-2xl text-gray-800">kitaPanen</p>
                    </div>

                    {/* Kanan: Bahasa, Masuk, Daftar */}
                    <div className="flex items-center gap-6">
                        {/* Bahasa */}
                        <div className="flex items-center gap-2">
                            <svg
                                width="20"
                                height="21"
                                viewBox="0 0 20 21"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                            >
                                <path
                                    d="M9.99935 18.8333C14.6017 18.8333 18.3327 15.1023 18.3327 10.5C18.3327 5.89759 14.6017 2.16663 9.99935 2.16663C5.39698 2.16663 1.66602 5.89759 1.66602 10.5C1.66602 15.1023 5.39698 18.8333 9.99935 18.8333Z"
                                    stroke="#333"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M1.66602 10.5H18.3327"
                                    stroke="#333"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M9.99935 2.16663C12.0837 4.44859 13.2683 7.40999 13.3327 10.5C13.2683 13.5899 12.0837 16.5513 9.99935 18.8333C7.91495 16.5513 6.73039 13.5899 6.66602 10.5C6.73039 7.40999 7.91495 4.44859 9.99935 2.16663Z"
                                    stroke="#333"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <p className="text-sm text-gray-800">Bahasa Indonesia</p>
                        </div>

                        {/* Masuk */}
                        <Button variant="ghost" className="flex items-center gap-2 w-20 h-[30px] rounded-2xl">
                            <svg
                                width="20"
                                height="21"
                                viewBox="0 0 20 21"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                            >
                                <path
                                    d="M16.6673 18V16.3333C16.6673 15.4493 16.3161 14.6014 15.691 13.9763C15.0659 13.3512 14.218 13 13.334 13H6.66732C5.78326 13 4.93542 13.3512 4.31029 13.9763C3.68517 14.6014 3.33398 15.4493 3.33398 16.3333V18"
                                    stroke="#333"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M9.99935 9.66667C11.8403 9.66667 13.3327 8.17428 13.3327 6.33333C13.3327 4.49238 11.8403 3 9.99935 3C8.1584 3 6.66602 4.49238 6.66602 6.33333C6.66602 8.17428 8.1584 9.66667 9.99935 9.66667Z"
                                    stroke="#333"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <p className="text-sm text-gray-800">Masuk</p>
                        </Button>

                        {/* Daftar */}
                        <Button variant="default" className="w-20 h-[30px] rounded-2xl bg-[#dc253b] text-white">
                            Daftar
                        </Button>
                    </div>
                </nav>

                {/* Navbar Footer (Tingkat Bawah) */}
                <div className="flex justify-between items-center h-10 bg-gray-50 px-6">
                    {/* Kiri: Kategori Produk */}
                    <div className="flex items-center gap-4">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                        >
                            <path
                                d="M2.5 10H17.5"
                                stroke="#333"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M2.5 5H17.5"
                                stroke="#333"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M2.5 15H17.5"
                                stroke="#333"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <p className="text-sm text-gray-800">Kategori Produk</p>
                    </div>

                    {/* Kanan: Links */}
                    <div className="flex items-center gap-4">
                        <p className="text-sm text-gray-800 hover:underline cursor-pointer">Tentang Kami</p>
                        <p className="text-sm text-gray-800 hover:underline cursor-pointer">Pusat Bantuan</p>
                        <p className="text-sm text-gray-800 hover:underline cursor-pointer">Bekerja Sama</p>
                    </div>
                </div>
            </div>

            {/* Konten Utama (Formulir Register) */}
            <div className="h-screen w-full flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 bg-white p-8 flex flex-col justify-center items-center min-h-screen">
                    <div className="w-full max-w-md">
                        <h1 className="text-2xl font-semibold mb-2">Create an account</h1>
                        <p className="mb-6 text-gray-600">Let’s get started. Fill in the details below to create your account.</p>

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
                            <Input placeholder="Password" type="password" className="mb-2" />
                            <p className="text-sm text-gray-500 mb-4">Minimum 8 characters.</p>

                            <div className="flex items-center mb-4">
                                <Checkbox id="terms" />
                                <label htmlFor="terms" className="ml-2 text-sm">
                                    I agree to the <a href="#" className="text-blue-500 hover:underline">Terms & Conditions</a>
                                </label>
                            </div>

                            <Button className="w-full mb-4">Sign up</Button>
                        </form>

                        <p className="text-center text-sm">
                            Already have an account? <a href="#" className="text-blue-500 hover:underline">Sign in</a>
                        </p>
                    </div>
                </div>

                {/* Bagian kanan dengan gambar */}
                <div className="hidden md:flex w-1/2 bg-gray-100 items-center justify-center">
                    <img src="/FE/img01.jpg" alt="Background Image" className="w-full h-full object-cover" />
                </div>
            </div>
        </div>
    );
}