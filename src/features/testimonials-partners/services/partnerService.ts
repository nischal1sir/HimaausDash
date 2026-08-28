import { partnersData } from "../data/dummyData";
import type { Partner, PartnerFormValues } from "../types/partner";

const STORAGE_KEY = "himaaus-dash-partners";

function loadPartners(): Partner[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(partnersData));
      return partnersData;
    }
    return JSON.parse(raw) as Partner[];
  } catch (error) {
    console.error("Failed to read partners from localStorage", error);
    return partnersData;
  }
}

function savePartners(partners: Partner[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(partners));
  } catch (error) {
    console.error("Failed to save partners to localStorage", error);
  }
}

function delay<T>(value: T, ms = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export async function getAllPartners(): Promise<Partner[]> {
  return delay(loadPartners());
}

export async function createPartner(values: PartnerFormValues): Promise<Partner> {
  const partners = loadPartners();
  const newPartner: Partner = {
    ...values,
    id: `ptn_${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  const updated = [newPartner, ...partners];
  savePartners(updated);
  return delay(newPartner);
}

export async function updatePartner(id: string, values: PartnerFormValues): Promise<Partner> {
  const partners = loadPartners();
  const updated = partners.map((p) => (p.id === id ? { ...p, ...values } : p));
  savePartners(updated);
  const updatedItem = updated.find((p) => p.id === id)!;
  return delay(updatedItem);
}

export async function deletePartner(id: string): Promise<void> {
  const partners = loadPartners();
  const updated = partners.filter((p) => p.id !== id);
  savePartners(updated);
  return delay(undefined);
}

