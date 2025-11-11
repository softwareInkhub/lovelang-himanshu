import { AlertTriangle, X } from "lucide-react";
import { useState } from "react";

export default function VercelNotice() {
  const [dismissed, setDismissed] = useState(
    localStorage.getItem("vercel-notice-dismissed") === "true"
  );

  // Only show on Vercel deployment (check for vercel.app domain or env var)
  const isVercel = window.location.hostname.includes("vercel.app") || 
                   import.meta.env.VITE_VERCEL === "true";

  if (!isVercel || dismissed) return null;

  const handleDismiss = () => {
    localStorage.setItem("vercel-notice-dismissed", "true");
    setDismissed(true);
  };

  return (
    <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1 text-sm">
          <p className="text-yellow-800 font-medium mb-1">
            ⚠️ Limited Functionality Notice
          </p>
          <p className="text-yellow-700">
            This app is running on Vercel with limited features. <strong>Login, checkout, and page builder won't work.</strong>{" "}
            For full functionality, please visit the{" "}
            <a 
              href="https://replit.com/@softwareInkhub/LangShop2" 
              className="underline font-medium hover:text-yellow-900"
              target="_blank"
              rel="noopener noreferrer"
            >
              Replit version
            </a>.
          </p>
        </div>
        <button
          onClick={handleDismiss}
          className="text-yellow-600 hover:text-yellow-800 flex-shrink-0"
          aria-label="Dismiss notice"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

