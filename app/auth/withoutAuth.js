"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const withoutAuth = (WrappedComponent) => {
  return (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const verifyNoToken = () => {
        const token = localStorage.getItem("token");

        if (token) {
          router.replace("/agenda");
          return;
        }

        setIsLoading(false);
      };

      verifyNoToken();
    }, [router]);

    if (isLoading) {
      return <div style={{ height: "100vh", background: "white" }} />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withoutAuth;
