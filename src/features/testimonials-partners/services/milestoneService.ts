import { milestonesData } from "../data/dummyData";
import type { Milestone, MilestoneFormValues } from "../types/milestone";

const STORAGE_KEY = "himaaus-dash-milestones";

function loadMilestones(): Milestone[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(milestonesData));
      return milestonesData;
    }
    return JSON.parse(raw) as Milestone[];
  } catch (error) {
    console.error("Failed to read milestones from localStorage", error);
    return milestonesData;
  }
}

function saveMilestones(milestones: Milestone[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(milestones));
  } catch (error) {
    console.error("Failed to save milestones to localStorage", error);
  }
}

function delay<T>(value: T, ms = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export async function getAllMilestones(): Promise<Milestone[]> {
  const milestones = loadMilestones();
  return delay([...milestones].sort((a, b) => a.displayOrder - b.displayOrder));
}

export async function createMilestone(values: MilestoneFormValues): Promise<Milestone> {
  const milestones = loadMilestones();
  const newMilestone: Milestone = {
    ...values,
    id: `mst_${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  const updated = [newMilestone, ...milestones];
  saveMilestones(updated);
  return delay(newMilestone);
}

export async function updateMilestone(id: string, values: MilestoneFormValues): Promise<Milestone> {
  const milestones = loadMilestones();
  const updated = milestones.map((m) => (m.id === id ? { ...m, ...values } : m));
  saveMilestones(updated);
  const updatedItem = updated.find((m) => m.id === id)!;
  return delay(updatedItem);
}

export async function deleteMilestone(id: string): Promise<void> {
  const milestones = loadMilestones();
  const updated = milestones.filter((m) => m.id !== id);
  saveMilestones(updated);
  return delay(undefined);
}

