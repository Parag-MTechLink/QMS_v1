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

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <Sidebar />
      <div className="pl-64">
        <Header />
        <main className="pt-16 p-8 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}

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
            <Layout>
              <Dashboard />
            </Layout>
          } 
        />
        <Route 
          path="/documents" 
          element={
            <Layout>
              <Documents />
            </Layout>
          } 
        />
        <Route 
          path="/documents/:id" 
          element={
            <Layout>
              <DocumentDetail />
            </Layout>
          } 
        />
        <Route 
          path="/documents/:id/review" 
          element={
            <Layout>
              <ReviewDetail />
            </Layout>
          } 
        />
        <Route 
          path="/reviews" 
          element={
            <Layout>
              <Reviews />
            </Layout>
          } 
        />
        <Route 
          path="/audits" 
          element={
            <Layout>
              <AuditLog />
            </Layout>
          } 
        />
        <Route 
          path="/compliance" 
          element={
            <Layout>
              <Compliance />
            </Layout>
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
