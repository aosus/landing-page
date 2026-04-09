import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import ArticlePage from "./pages/ArticlePage";
import ServicesPage from "./pages/ServicesPage";
import WritingContestPage from "./pages/WritingContestPage";
import SupportPage from "./pages/SupportPage";
import ContactPage from "./pages/ContactPage";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      {/* English routes */}
      <Route path="/" component={() => <HomePage lang="en" />} />
      <Route path="/blog" component={() => <BlogPage lang="en" />} />
      <Route path="/article" component={() => <ArticlePage lang="en" />} />
      <Route path="/services" component={() => <ServicesPage lang="en" />} />
      <Route path="/writing-contest" component={() => <WritingContestPage lang="en" />} />
      <Route path="/support-us" component={() => <SupportPage lang="en" />} />
      <Route path="/contact-us" component={() => <ContactPage lang="en" />} />

      {/* Arabic routes */}
      <Route path="/ar" component={() => <HomePage lang="ar" />} />
      <Route path="/ar/blog" component={() => <BlogPage lang="ar" />} />
      <Route path="/ar/article" component={() => <ArticlePage lang="ar" />} />
      <Route path="/ar/services" component={() => <ServicesPage lang="ar" />} />
      <Route path="/ar/writing-contest" component={() => <WritingContestPage lang="ar" />} />
      <Route path="/ar/support-us" component={() => <SupportPage lang="ar" />} />
      <Route path="/ar/contact-us" component={() => <ContactPage lang="ar" />} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
