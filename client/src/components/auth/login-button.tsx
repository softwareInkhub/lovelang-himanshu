import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

interface LoginButtonProps {
  className?: string;
  size?: "sm" | "lg" | "default";
}

export default function LoginButton({ className, size = "default" }: LoginButtonProps) {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <Button 
      onClick={handleLogin} 
      className={className}
      size={size}
    >
      <LogIn className="w-4 h-4 mr-2" />
      Login
    </Button>
  );
}