export type ThemeMode = "system" | "light" | "dark";

export type ClipFlowSettings = {
  // General
  monitoringEnabled: boolean;
  launchAtLogin: boolean;
  startInMenuBar: boolean;
  showNotifications: boolean;

  // Appearance
  theme: ThemeMode;
  compactMode: boolean;

  // History
  maxHistory: number;
  removeDuplicates: boolean;
};

const DEFAULT_SETTINGS: ClipFlowSettings = {
  // General
  monitoringEnabled: true,
  launchAtLogin: false,
  startInMenuBar: false,
  showNotifications: true,

  // Appearance
  theme: "system",
  compactMode: false,

  // History
  maxHistory: 500,
  removeDuplicates: true,
};

const STORAGE_KEY = "clipflow-settings";

export function loadSettings(): ClipFlowSettings {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return DEFAULT_SETTINGS;
  }

  try {
    return {
      ...DEFAULT_SETTINGS,
      ...JSON.parse(saved),
    };
  } catch (error) {
    console.error("Failed to load ClipFlow settings:", error);
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: ClipFlowSettings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

export function resetSettings() {
  localStorage.removeItem(STORAGE_KEY);
}