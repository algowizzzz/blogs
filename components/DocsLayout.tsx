"use client";

import TopBanner from "./TopBanner";
import NavbarV2 from "./NavbarV2";
import LeftSidebar from "./LeftSidebar";
import RightTOC from "./RightTOC";
import Footer from "./Footer";

interface DocsLayoutProps {
  children: React.ReactNode;
  showLeftSidebar?: boolean;
  showRightTOC?: boolean;
  sidebarTitle?: string;
}

export default function DocsLayout({
  children,
  showLeftSidebar = true,
  showRightTOC = true,
  sidebarTitle = "Prompt Engineering Guide",
}: DocsLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <TopBanner
        text="Compete in HackAPrompt 2.0, the world's largest AI Red-Teaming competition!"
        ctaText="Check it out"
        ctaLink="/courses"
      />
      <NavbarV2 />
      
      <div className="flex-1 flex">
        {/* Left Sidebar */}
        {showLeftSidebar && <LeftSidebar title={sidebarTitle} />}
        
        {/* Main Content */}
        <main className={`flex-1 min-w-0 ${showLeftSidebar ? "" : "max-w-5xl mx-auto"}`}>
          <div className="flex">
            <div className="flex-1 min-w-0 px-8 py-8">
              {children}
            </div>
            
            {/* Right TOC */}
            {showRightTOC && <RightTOC />}
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}
