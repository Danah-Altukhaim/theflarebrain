import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { Login } from "./pages/Login.js";
import { Layout } from "./components/Layout.js";
import { Knowledge } from "./pages/Knowledge.js";
import { BrainChat } from "./pages/BrainChat.js";
import { ModulePage } from "./pages/ModulePage.js";
import { Admin } from "./pages/Admin.js";
import { Activity } from "./pages/Activity.js";
import { useAuth } from "./state/auth.js";
import "./index.css";

function Guard({ children }: { children: React.ReactNode }) {
  const token = useAuth((s) => s.token);
  return token ? <>{children}</> : <Navigate to="/login" replace />;
}

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-[48px] font-bold text-apple-text tracking-tight">404</h1>
      <p className="text-[15px] text-apple-secondary mt-2 mb-6">This page does not exist.</p>
      <Link to="/" className="btn-primary">Go home</Link>
    </div>
  );
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  override render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-surface-secondary">
          <h1 className="text-[24px] font-semibold text-apple-text">Something went wrong</h1>
          <p className="text-[14px] text-apple-secondary mt-2 mb-6">An unexpected error occurred.</p>
          <button onClick={() => window.location.reload()} className="btn-primary">
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <Guard>
                <Layout />
              </Guard>
            }
          >
            <Route index element={<Knowledge />} />
            <Route path="chat" element={<BrainChat />} />
            <Route path="modules/:slug" element={<ModulePage />} />
            <Route path="admin" element={<Admin />} />
            <Route path="activity" element={<Activity />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
);
