export { testimonialsPartnersRoutes } from "./routes";

export { default as TestimonialsPage } from "./pages/Testimonials";
export { default as PartnersPage } from "./pages/Partners";
export { default as MilestonesPage } from "./pages/Milestones";

export { TestimonialsProvider, useTestimonials } from "./hooks/useTestimonials";
export { PartnersProvider, usePartners } from "./hooks/usePartners";
export { MilestonesProvider, useMilestones } from "./hooks/useMilestones";

export type { Testimonial, TestimonialFormValues, TestimonialStatus } from "./types/testimonial";
export type { Partner, PartnerFormValues, PartnerStatus } from "./types/partner";
export type { Milestone, MilestoneFormValues, MilestoneStatus } from "./types/milestone";
