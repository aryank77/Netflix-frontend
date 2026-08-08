// Netflix India's real published pricing tiers (as of 2026), used to power
// a same-shape "Choose your plan" flow: /plans -> /signup -> Account.
// This is a frontend-only subscription — the backend User model has no
// billing field — so the chosen plan is persisted to localStorage under
// "nf_plan", the same pattern already used for avatar color and cookie
// preferences elsewhere in this app.
export const PLAN_STORAGE_KEY = "nf_plan";

export const PLANS = [
  {
    id: "mobile",
    name: "Mobile",
    price: 149,
    quality: "Good",
    resolution: "480p",
    screens: 1,
    downloadDevices: 1,
    devices: "Phone, tablet",
    spatialAudio: false,
    ultraHD: false,
  },
  {
    id: "basic",
    name: "Basic",
    price: 199,
    quality: "Good",
    resolution: "720p (HD)",
    screens: 1,
    downloadDevices: 1,
    devices: "TV, computer, phone, tablet",
    spatialAudio: false,
    ultraHD: false,
  },
  {
    id: "standard",
    name: "Standard",
    price: 499,
    quality: "Great",
    resolution: "1080p (Full HD)",
    screens: 2,
    downloadDevices: 2,
    devices: "TV, computer, phone, tablet",
    spatialAudio: false,
    ultraHD: false,
    recommended: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: 649,
    quality: "Best",
    resolution: "4K (Ultra HD) + HDR",
    screens: 4,
    downloadDevices: 6,
    devices: "TV, computer, phone, tablet",
    spatialAudio: true,
    ultraHD: true,
  },
];

export function getPlanById(id) {
  return PLANS.find((p) => p.id === id) || null;
}

export function getSavedPlan() {
  try {
    return getPlanById(localStorage.getItem(PLAN_STORAGE_KEY));
  } catch {
    return null;
  }
}
