import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Catalogue from "@/pages/Catalogue";
import { useState, useEffect } from "react";
import LoadingAnimation from "@/components/LoadingAnimation";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Catalogue} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show loading animation for 2 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {loading ? (
        <LoadingAnimation />
      ) : (
        <>
          <Router />
          <Toaster />
        </>
      )}
    </QueryClientProvider>
  );
}

export default App;
