import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

export default function Layout({ children, showSidebar = false }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-surface-0">
      <Navbar />
      <main className="flex-1">
        {showSidebar ? (
          <div className="classic-padding max-w-content">
            <div className="flex gap-8">
              {/* Main content with sidebar layout could go here */}
              <div className="flex-1">{children}</div>
            </div>
          </div>
        ) : (
          children
        )}
      </main>
      <Footer />
    </div>
  );
}
