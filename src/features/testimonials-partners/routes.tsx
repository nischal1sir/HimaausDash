import type { RouteObject } from "react-router-dom";
import { PartnersProvider } from "./hooks/usePartners";
import { MilestonesProvider } from "./hooks/useMilestones";
import { TestimonialsProvider } from "./hooks/useTestimonials";
import PartnersPage from "./pages/Partners";
import MilestonesPage from "./pages/Milestones";
import TestimonialsPage from "./pages/Testimonials";

/**
 * Route definitions for the Testimonials / Partners / Milestones module.
 * Spread `testimonialsPartnersRoutes` into the app's <Routes> tree.
 */
export const testimonialsPartnersRoutes: RouteObject[] = [
  {
    path: "testimonials",
    element: (
      <TestimonialsProvider>
        <TestimonialsPage />
      </TestimonialsProvider>
    ),
  },
  {
    path: "partners",
    element: (
      <PartnersProvider>
        <PartnersPage />
      </PartnersProvider>
    ),
  },
  {
    path: "milestones",
    element: (
      <MilestonesProvider>
        <MilestonesPage />
      </MilestonesProvider>
    ),
  },
];
