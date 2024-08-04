import React from "react";
import PageHeader from "../components/PageHeaders/PageHeader";
import Footer from "components/Footer/Footer";
import IndexNavbar from "../components/Navbars/IndexNavbar";
import News from "components/NEWS/News";
import { LoginProvider } from "context/ContextAPI";




export default function Index() {
  
  React.useEffect(() => {
    document.body.classList.toggle("index-page");
    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  }, []);

  // console.log("================================ USER =================")
  // console.log(user)
  // console.log("================================ isAuthenticated =================")
  // console.log(isAuthenticated)
  return (
    

    <LoginProvider>


      <div className="index-page-content">
        <IndexNavbar />
        <PageHeader />
        <News />
        <Footer />
      </div>
    </LoginProvider>


  );
}
