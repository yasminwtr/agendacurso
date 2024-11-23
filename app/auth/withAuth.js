"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent) => {
  const HOC = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const verifyToken = () => {
        const token = localStorage.getItem("token");

        if (!token) {
          router.replace("/");
          return;
        }

        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          if (Date.now() >= payload.exp * 1000) {
            localStorage.removeItem("token");
            router.replace("/");
            return;
          }
        } catch (err) {
          localStorage.removeItem("token");
          router.replace("/");
          return;
        }

        setIsLoading(false);
      };

      verifyToken();
    }, [router]);

    if (isLoading) {
      return <div style={{ height: "100vh", background: "white" }} />;
    }

    return <WrappedComponent {...props} />;
  };

  HOC.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;
  return HOC;
};

export default withAuth;
