import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import Input from "../components/Input";
import SEO from "../components/SEO";

const registerSchema = z.object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["lessor", "lessee"], {
        errorMap: () => ({ message: "Please select a role" }),
    }),
});

export default function Register() {
    const navigate = useNavigate();
    const { register: registerUser } = useAuth();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            role: "lessee",
        },
    });

    const selectedRole = watch("role");

    const onSubmit = async (data) => {
        try {
            await registerUser({
                fullName: data.fullName,
                email: data.email,
                password: data.password,
                role: data.role,
            });
            toast.success("Account created successfully! Welcome to LeaseIT.");
            navigate("/dashboard");
        } catch (error) {
            const messages = {
                "auth/email-already-in-use": "An account with this email already exists.",
                "auth/weak-password": "Password is too weak. Use at least 6 characters.",
                "auth/invalid-email": "Please enter a valid email address.",
            };
            toast.error(messages[error.code] || "Registration failed. Please try again.");
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <SEO title="Register" description="Create a new account on LeaseIT" />
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create an account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                            Sign in
                        </Link>
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <Input
                            label="Full Name"
                            type="text"
                            placeholder="John Doe"
                            error={errors.fullName}
                            {...register("fullName")}
                        />

                        <Input
                            label="Email address"
                            type="email"
                            placeholder="you@example.com"
                            error={errors.email}
                            {...register("email")}
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            error={errors.password}
                            {...register("password")}
                        />

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                I want to
                            </label>
                            <div className="flex gap-4 justify-center mb-2">
                                <button
                                    type="button"
                                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${selectedRole === "lessee"
                                            ? "bg-blue-100 text-blue-700 border-2 border-blue-500"
                                            : "bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200"
                                        }`}
                                    onClick={() => setValue("role", "lessee")}
                                >
                                    Rent Assets
                                </button>
                                <button
                                    type="button"
                                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${selectedRole === "lessor"
                                            ? "bg-blue-100 text-blue-700 border-2 border-blue-500"
                                            : "bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200"
                                        }`}
                                    onClick={() => setValue("role", "lessor")}
                                >
                                    List Assets
                                </button>
                            </div>
                            <input type="hidden" {...register("role")} />
                            {errors.role && (
                                <p className="mt-1 text-sm text-red-500">{errors.role.message}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                        >
                            {isSubmitting ? "Creating account..." : "Sign up"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
