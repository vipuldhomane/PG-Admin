import { GalleryVerticalEnd } from "lucide-react";

// import { LoginForm } from "@/components/login-form";
import { SignUpForm } from "@/components/Signup-form";
// import SignupForm from "@/components/SignupForm";

export default function SignUp() {
  return (
    <div className="grid min-h-svh">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2">
          <a href="#" className="flex items-center gap-2 font-bold text-3xl">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Vyaparly Admin SignUp
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs p-6 bg-white rounded-lg shadow-lg border border-gray-200 backdrop-blur-sm">
            <SignUpForm />
            {/* <SignupForm /> */}
          </div>
        </div>
      </div>
      {/* <div className="relative hidden bg-muted lg:block">
        <img
          // src="/placeholder.svg"
          src="https://img.freepik.com/free-photo/3d-render-secure-login-password-illustration_107791-16640.jpg?t=st=1736926929~exp=1736930529~hmac=81e324098160329ee499c961e2b5fb98b83433f6f2216e38a9788f818d2f7b88&w=740"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div> */}
    </div>
  );
}
