// frontend/src/App.tsx
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignUp,
  UserButton
} from '@clerk/clerk-react'
import { Link, Routes, Route } from 'react-router-dom'
import BuyersPage from './pages/BuyersPage'

// ────────────────────────────────────────────────────────────

const Dashboard = () => (
  <div className="p-6">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">dealflow.ai Dashboard</h1>
      <UserButton />
    </div>

    <Link to="/buyers" className="text-blue-600 underline">
      → Open Buyer CRM
    </Link>
  </div>
)

// ────────────────────────────────────────────────────────────

export default function App() {
  return (
    <Routes>
      {/* Clerk auth routes */}
      <Route path="/sign-in" element={<SignIn routing="path" path="/sign-in" />} />
      <Route path="/sign-up" element={<SignUp routing="path" path="/sign-up" />} />

      {/* Buyers page (protected) */}
      <Route
        path="/buyers"
        element={
          <>
            <SignedIn>
              <BuyersPage />
            </SignedIn>
            <SignedOut>
              <SignIn routing="path" path="/sign-in" />
            </SignedOut>
          </>
        }
      />

      {/* Dashboard root (protected) */}
      <Route
        path="/"
        element={
          <>
            <SignedIn>
              <Dashboard />
            </SignedIn>
            <SignedOut>
              <SignIn routing="path" path="/sign-in" />
            </SignedOut>
          </>
        }
      />
    </Routes>
  )
}
