import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Sidebar } from "./components/layout/Sidebar";
import { Header } from "./components/layout/Header";
import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import DocumentDetail from "./pages/DocumentDetail";
import Reviews from "./pages/Reviews";
import Compliance from "./pages/Compliance";
import AuditLog from "./pages/AuditLog";
import ReviewDetail from "./pages/ReviewDetail";
import Approvals from "./pages/Approvals";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

import { useDocumentStore, ROLES } from "./store/useDocumentStore";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <Sidebar />
      <div className="pl-64">
        <Header />
        <main className="min-h-screen px-6 pb-8 pt-20 lg:px-8">
          <div className="mx-auto w-full max-w-[1440px]">{children}</div>
        </main>
      </div>
    </div>
  );
}

const PrivateRoute = ({ children, allowedRoles }) => {
  const { userRole } = useDocumentStore();
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Layout>{children}</Layout>;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<Navigate to="/documents" replace />} 
        />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute allowedRoles={Object.values(ROLES)}>
              <Dashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/documents" 
          element={
            <PrivateRoute allowedRoles={Object.values(ROLES)}>
              <Documents />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/documents/:id" 
          element={
            <PrivateRoute allowedRoles={Object.values(ROLES)}>
              <DocumentDetail />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/documents/:id/review" 
          element={
            <PrivateRoute allowedRoles={[ROLES.DO, ROLES.REV, ROLES.DCA]}>
              <ReviewDetail />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/reviews" 
          element={
            <PrivateRoute allowedRoles={[ROLES.DO, ROLES.REV, ROLES.DCA, ROLES.PA, ROLES.INTERNAL_AUDITOR, ROLES.EXTERNAL_AUDITOR]}>
              <Reviews />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/audits" 
          element={
            <PrivateRoute allowedRoles={[ROLES.INTERNAL_AUDITOR, ROLES.EXTERNAL_AUDITOR, ROLES.DCA]}>
              <AuditLog />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/compliance" 
          element={
            <PrivateRoute allowedRoles={[ROLES.INTERNAL_AUDITOR, ROLES.EXTERNAL_AUDITOR, ROLES.DCA, ROLES.DO]}>
              <Compliance />
            </PrivateRoute>
          } 
        />
        <Route
          path="/approvals"
          element={
            <PrivateRoute allowedRoles={[ROLES.APP, ROLES.DCA, ROLES.PA, ROLES.INTERNAL_AUDITOR, ROLES.EXTERNAL_AUDITOR]}>
              <Approvals />
            </PrivateRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <PrivateRoute allowedRoles={[ROLES.DCA, ROLES.PA, ROLES.INTERNAL_AUDITOR, ROLES.EXTERNAL_AUDITOR, ROLES.APP]}>
              <Reports />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute allowedRoles={[ROLES.DCA, ROLES.PA]}>
              <Settings />
            </PrivateRoute>
          }
        />
        {/* Fallback for other routes */}
        <Route 
          path="*" 
          element={<Navigate to="/documents" replace />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
