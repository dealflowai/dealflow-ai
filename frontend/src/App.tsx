import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";
import { Routes, Route } from "react-router-dom";

const Dashboard = () => (
  <div className="p-6">
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">dealflow.ai Dashboard</h1>
      <UserButton afterSignOutUrl="/" />
    </div>
    <p className="text-gray-500">You’re signed in. Buyer CRM coming next.</p>
  </div>
);

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <SignedIn>
              <Dashboard />
            </SignedIn>
            <SignedOut>
              <div className="flex flex-col items-center gap-4 mt-20">
                <SignInButton />
                <span>or</span>
                <SignUpButton />
              </div>
            </SignedOut>
          </>
        }
      />
    </Routes>
  );
}
