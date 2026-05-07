import Sidebar from "@/components/Sidebar";
import ProtectedRoute from "@/components/ProtectedRoutes";

export default function CRMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <ProtectedRoute>
        <Sidebar />

      <main className="ml-64 min-h-screen p-6">
        {children}
      </main>
      </ProtectedRoute>
      
    </div>
  );
}