import { testimonialsData } from "../data/dummyData";
import type { Testimonial, TestimonialFormValues } from "../types/testimonial";

const STORAGE_KEY = "himaaus-dash-testimonials";

function loadTestimonials(): Testimonial[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(testimonialsData));
      return testimonialsData;
    }
    return JSON.parse(raw) as Testimonial[];
  } catch (error) {
    console.error("Failed to read testimonials from localStorage", error);
    return testimonialsData;
  }
}

function saveTestimonials(testimonials: Testimonial[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(testimonials));
  } catch (error) {
    console.error("Failed to save testimonials to localStorage", error);
  }
}

function delay<T>(value: T, ms = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  return delay(loadTestimonials());
}

export async function createTestimonial(values: TestimonialFormValues): Promise<Testimonial> {
  const testimonials = loadTestimonials();
  const newTestimonial: Testimonial = {
    ...values,
    id: `t_${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  const updated = [newTestimonial, ...testimonials];
  saveTestimonials(updated);
  return delay(newTestimonial);
}

export async function updateTestimonial(id: string, values: TestimonialFormValues): Promise<Testimonial> {
  const testimonials = loadTestimonials();
  const updated = testimonials.map((t) => (t.id === id ? { ...t, ...values } : t));
  saveTestimonials(updated);
  const updatedItem = updated.find((t) => t.id === id)!;
  return delay(updatedItem);
}

export async function deleteTestimonial(id: string): Promise<void> {
  const testimonials = loadTestimonials();
  const updated = testimonials.filter((t) => t.id !== id);
  saveTestimonials(updated);
  return delay(undefined);
}

export async function bulkUpdateStatus(ids: string[], status: Testimonial["status"]): Promise<void> {
  const testimonials = loadTestimonials();
  const updated = testimonials.map((t) => (ids.includes(t.id) ? { ...t, status } : t));
  saveTestimonials(updated);
  return delay(undefined);
}

export async function bulkDelete(ids: string[]): Promise<void> {
  const testimonials = loadTestimonials();
  const updated = testimonials.filter((t) => !ids.includes(t.id));
  saveTestimonials(updated);
  return delay(undefined);
}

