"use client";

import { useState } from "react";
import Link from "next/link";
import { register } from "@/app/api/authApi";
import AuthLayout from "@/app/components/ui/AuthLayout";
import AuthInput from "@/app/components/ui/AuthInput";
import AuthButton from "@/app/components/ui/AuthButton";
import AuthErrorMessage from "@/app/components/ui/AuthErrorMessage";
import { useRouter } from "next/navigation";
import Modal from "../common/Modal";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      const data = await register(email, password, name);
      if (data.message) {
        setModalMessage(data.message);
        setShowModal(true);
      }
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleModalClose = () => {
    setShowModal(false);
    router.push("/auth/login");
  };

  return (
    <AuthLayout 
      title="Create your account" 
      subtitle="Join us to get started with your journey"
    >
      <AuthErrorMessage error={error} />
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <AuthInput
          id="name"
          name="name"
          type="text"
          label="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          autoComplete="name"
        />

        <AuthInput
          id="email"
          name="email"
          type="email"
          label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          autoComplete="email"
        />

        <AuthInput
          id="password"
          name="password"
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          autoComplete="new-password"
        />

        <AuthInput
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••"
          autoComplete="new-password"
        />

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="font-medium text-gray-700">
              I agree to the{" "}
              <a href="#" className="text-primary hover:text-primary">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary hover:text-primary">
                Privacy Policy
              </a>
            </label>
          </div>
        </div>

        <AuthButton
          isLoading={isLoading}
          loadingText="Creating account..."
          buttonText="Create account"
        />
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Already have an account?
            </span>
          </div>
        </div>

        <div className="mt-6">
          <Link href="/auth/login" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            Sign in instead
          </Link>
        </div>
      </div>
      <Modal
        isOpen={showModal}
        onClose={handleModalClose}
        message={modalMessage}
        title="Registration Successful!"
      />
    </AuthLayout>
  );
}