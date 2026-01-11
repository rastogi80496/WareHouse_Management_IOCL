import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "./lib/ProtectedRoute";
import { Toaster } from "react-hot-toast";

// Lazy load components for better performance
const HomePage = lazy(() => import("./pages/HomePage"));
const SignupPage = lazy(() => import("./pages/SignupPages"));
const ServicePage = lazy(() => import("./pages/ServicePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const ManagerDashboard = lazy(() => import("./pages/ManagerDashboard"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const StaffDashboard = lazy(() => import("./pages/StaffDashboard"));
const Productpage = lazy(() => import("./pages/Productpage"));
const Orderpage = lazy(() => import("./pages/Orderpage"));
const Salespage = lazy(() => import("./pages/Salespage"));
const StockTransaction = lazy(() => import("./pages/StockTransaction"));
const Categorypage = lazy(() => import("./pages/Categorypage"));
const Notificationpage = lazy(() => import("./pages/Notificationpage"));
const Supplierpage = lazy(() => import("./pages/Supplierpage"));
const Activitylogpage = lazy(() => import("./pages/Activitylogpage"));
const Dashboardpage = lazy(() => import("./pages/Dashboardpage"));
const Userstatus = lazy(() => import("./pages/Userstatus"));
const NotificationPageRead = lazy(() => import("./pages/Notificationpageread"));
const Profilepage = lazy(() => import("./pages/Profilepage"));

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div>
        <Toaster />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<ServicePage />} />
          <Route path="/SignupPage" element={<SignupPage />} />
          <Route path="/LoginPage" element={<LoginPage />} />

          <Route
            path="/ManagerDashboard"
            element={<ProtectedRoute element={<ManagerDashboard />} />}
          >
            <Route
              index
              element={<ProtectedRoute element={<Dashboardpage />} />}
            />
            <Route
              path="product"
              element={<ProtectedRoute element={<Productpage />} />}
            />
            <Route
              path="order"
              element={<ProtectedRoute element={<Orderpage />} />}
            />
            <Route
              path="sales"
              element={<ProtectedRoute element={<Salespage />} />}
            />
            <Route
              path="stock-transaction"
              element={<ProtectedRoute element={<StockTransaction />} />}
            />
            <Route
              path="category"
              element={<ProtectedRoute element={<Categorypage />} />}
            />
            <Route
              path="NotificationPageRead"
              element={<ProtectedRoute element={<NotificationPageRead />} />}
            />
            <Route
              path="Profilepage"
              element={<ProtectedRoute element={<Profilepage />} />}
            />
            <Route
              path="supplier"
              element={<ProtectedRoute element={<Supplierpage />} />}
            />
            <Route
              path="Userstatus"
              element={<ProtectedRoute element={<Userstatus />} />}
            />
            <Route
              path="activity-log"
              element={<ProtectedRoute element={<Activitylogpage />} />}
            />
          </Route>

          <Route
            path="/AdminDashboard"
            element={<ProtectedRoute element={<AdminDashboard />} />}
          >
            <Route
              path="product"
              element={<ProtectedRoute element={<Productpage />} />}
            />
            <Route
              path="order"
              element={<ProtectedRoute element={<Orderpage />} />}
            />
            <Route
              path="sales"
              element={<ProtectedRoute element={<Salespage />} />}
            />
            <Route
              path="stock-transaction"
              element={<ProtectedRoute element={<StockTransaction />} />}
            />
            <Route
              path="category"
              element={<ProtectedRoute element={<Categorypage />} />}
            />
            <Route
              path="notifications"
              element={<ProtectedRoute element={<Notificationpage />} />}
            />
            <Route
              path="Profilepage"
              element={<ProtectedRoute element={<Profilepage />} />}
            />
            <Route
              path="supplier"
              element={<ProtectedRoute element={<Supplierpage />} />}
            />
            <Route
              path="activity-log"
              element={<ProtectedRoute element={<Activitylogpage />} />}
            />
          </Route>

          <Route
            path="/StaffDashboard"
            element={<ProtectedRoute element={<StaffDashboard />} />}
          >
            <Route
              path="product"
              element={<ProtectedRoute element={<Productpage />} />}
            />
            <Route
              path="order"
              element={<ProtectedRoute element={<Orderpage />} />}
            />
            <Route
              path="sales"
              element={<ProtectedRoute element={<Salespage />} />}
            />
            <Route
              path="stock-transaction"
              element={<ProtectedRoute element={<StockTransaction />} />}
            />
            <Route
              path="category"
              element={<ProtectedRoute element={<Categorypage />} />}
            />
            <Route
              path="NotificationPageRead"
              element={<ProtectedRoute element={<NotificationPageRead/>} />}
            />
            <Route
              path="Profilepage"
              element={<ProtectedRoute element={<Profilepage />} />}
            />
            <Route
              path="supplier"
              element={<ProtectedRoute element={<Supplierpage />} />}
            />
            <Route
              path="activity-log"
              element={<ProtectedRoute element={<Activitylogpage />} />}
            />
          </Route>
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
