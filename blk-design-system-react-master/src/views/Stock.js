import React from "react";
import StockPageHeader from "../components/PageHeaders/StockPageHeader";
import IndexNavbar from "../components/Navbars/IndexNavbar";
import Footer from "../components/Footer/Footer";

export default function Stock() {
  return (
    <div className="stock-page-content">
      < IndexNavbar />
      <StockPageHeader />
      < Footer />
      {/* Other components or content for the Stock page */}
    </div>
  );
}
