/**
 * Nuvsha Master Test — Test Data & API Service
 * 
 * Provides mock API calls and static data sets for Phase 8, 11, 14 verification.
 */

export const mockUsers = [
  { id: 1, name: "Alex Rivera", role: "Core Architect", status: "Active", commits: 142, avatar: "⚡" },
  { id: 2, name: "Sophia Chen", role: "Compiler Engineer", status: "Active", commits: 98, avatar: "🔥" },
  { id: 3, name: "Marcus Vance", role: "Runtime Specialist", status: "Reviewing", commits: 76, avatar: "💎" },
  { id: 4, name: "Elena Rostova", role: "DX Lead", status: "Active", commits: 114, avatar: "✨" }
];

export const mockProducts = [
  { id: 'p1', name: 'Nuvsha Enterprise Engine', category: 'Framework', price: 0, status: 'In Stock', rating: 4.9 },
  { id: 'p2', name: 'Vite Plugin Compiler Suite', category: 'Tooling', price: 0, status: 'In Stock', rating: 5.0 },
  { id: 'p3', name: 'Reactive Router Engine', category: 'Runtime', price: 0, status: 'In Stock', rating: 4.8 },
  { id: 'p4', name: 'Data & Form Primitive Pack', category: 'Library', price: 0, status: 'In Stock', rating: 4.95 }
];

export const mockActivities = [
  { id: 101, title: 'Phase 1–19 Test Suite Executed', timestamp: 'Just now', type: 'success' },
  { id: 102, title: 'Vite Production Bundle Minified', timestamp: '2 mins ago', type: 'info' },
  { id: 103, title: 'Component Props & Slot Fragment Verified', timestamp: '5 mins ago', type: 'success' },
  { id: 104, title: 'Router Client-Side Navigation Intercepted', timestamp: '12 mins ago', type: 'info' }
];

export const phaseMatrix = [
  { phase: "Phase 1", name: "Core .nuv + HTML + Reactive State", route: "/language", status: "PASS", category: "Core" },
  { phase: "Phase 2", name: "Expressions & Event Context", route: "/language", status: "PASS", category: "Core" },
  { phase: "Phase 3", name: "Form Two-Way Binding (bind={})", route: "/forms", status: "PASS", category: "Forms" },
  { phase: "Phase 4", name: "Reactive Array Loops ({for})", route: "/reactivity", status: "PASS", category: "Core" },
  { phase: "Phase 5", name: "Component Props & Parent-Child Sync", route: "/components", status: "PASS", category: "Components" },
  { phase: "Phase 6", name: "Reactive Conditions ({if}/{else})", route: "/reactivity", status: "PASS", category: "Core" },
  { phase: "Phase 7", name: "Async / Loading / Error Blocks", route: "/async", status: "PASS", category: "Async" },
  { phase: "Phase 8", name: "Real Application Architecture", route: "/routing", status: "PASS", category: "Architecture" },
  { phase: "Phase 9", name: "Tailwind CSS v4 Integration", route: "/styling", status: "PASS", category: "Styling" },
  { phase: "Phase 10", name: "Client-Side SPA Routing", route: "/routing", status: "PASS", category: "Routing" },
  { phase: "Phase 11", name: "API & Remote Data Architecture", route: "/data", status: "PASS", category: "Data" },
  { phase: "Phase 13", name: "Compiler Error Diagnostics & DX", route: "/errors", status: "PASS", category: "Compiler" },
  { phase: "Phase 14", name: "Performance & Production Bundling", route: "/performance", status: "PASS", category: "Performance" },
  { phase: "Phase 15", name: "Standard Project Architecture", route: "/", status: "PASS", category: "Architecture" },
  { phase: "Phase 16", name: "Advanced Component System (Slots, $event)", route: "/components", status: "PASS", category: "Components" },
  { phase: "Phase 18", name: "Language Improvements & Form Primitives", route: "/forms", status: "PASS", category: "Forms" },
  { phase: "Phase 19", name: "Master Integrated Verification", route: "/", status: "PASS", category: "Integration" }
];

/**
 * Simulates an API call to fetch users with configurable delay.
 */
export async function fetchUsersApi(delay = 400) {
  await new Promise(r => setTimeout(r, delay));
  return [
    { id: 1, name: "Ada Lovelace", role: "Algorithm Architect", email: "ada@nuvsha.dev", status: "Verified" },
    { id: 2, name: "Alan Turing", role: "Computation Lead", email: "alan@nuvsha.dev", status: "Verified" },
    { id: 3, name: "Grace Hopper", role: "Compiler Pioneer", email: "grace@nuvsha.dev", status: "Verified" }
  ];
}

/**
 * Simulates an API call that can succeed or fail.
 */
export async function fetchMetricReport(shouldFail = false, delay = 350) {
  await new Promise(r => setTimeout(r, delay));
  if (shouldFail) {
    throw new Error("Network request simulated failure (Status 500)");
  }
  return {
    requestsProcessed: 48920,
    averageLatencyMs: 1.2,
    activeSubscribers: 1240,
    renderEfficiency: "99.8%",
    timestamp: new Date().toLocaleTimeString()
  };
}

/**
 * Helper to run high-frequency state updates.
 */
export function runBenchmark(updateCallback, iterations = 500) {
  const startTime = performance.now();
  for (let i = 0; i < iterations; i++) {
    updateCallback(i);
  }
  const endTime = performance.now();
  return {
    iterations,
    totalTimeMs: Number((endTime - startTime).toFixed(2)),
    avgPerUpdateMs: Number(((endTime - startTime) / iterations).toFixed(4))
  };
}
