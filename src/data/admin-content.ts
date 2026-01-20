import { doorModels } from './door-configurator-data';

export const ADMIN_CONTENT_STORAGE_KEY = 'door-admin-content-v1';

export interface AdminModelAsset {
  id: string;
  name: string;
  format: string;
  notes: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  uploadedAt: string;
}

export interface AdminTextureAsset {
  id: string;
  name: string;
  mapType: string;
  colorCode: string;
  linkedColorId?: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  uploadedAt: string;
}

export interface AdminCatalogEntry {
  modelId: string;
  displayName: string;
  description: string;
  highlights: string[];
  coverImage: string;
  modelAssets: AdminModelAsset[];
  textures: AdminTextureAsset[];
  updatedAt: string;
}

export interface AdminContentState {
  entries: Record<string, AdminCatalogEntry>;
}

const createEmptyEntry = (modelId: string, name: string): AdminCatalogEntry => ({
  modelId,
  displayName: name,
  description: '',
  highlights: [],
  coverImage: '',
  modelAssets: [],
  textures: [],
  updatedAt: new Date().toISOString()
});

const normalizeEntry = (entry: AdminCatalogEntry, fallbackName: string): AdminCatalogEntry => ({
  ...createEmptyEntry(entry.modelId, fallbackName),
  ...entry,
  displayName: entry.displayName || fallbackName,
  highlights: Array.isArray(entry.highlights) ? entry.highlights : [],
  modelAssets: Array.isArray(entry.modelAssets) ? entry.modelAssets : [],
  textures: Array.isArray(entry.textures) ? entry.textures : [],
  updatedAt: entry.updatedAt || new Date().toISOString()
});

export const buildDefaultContent = (): AdminContentState => {
  const entries: Record<string, AdminCatalogEntry> = {};
  doorModels.forEach(model => {
    entries[model.id] = createEmptyEntry(model.id, model.name);
  });
  return { entries };
};

export const mergeContentWithModels = (state: AdminContentState): AdminContentState => {
  const mergedEntries: Record<string, AdminCatalogEntry> = { ...state.entries };

  doorModels.forEach(model => {
    const existing = mergedEntries[model.id];
    mergedEntries[model.id] = existing
      ? normalizeEntry(existing, model.name)
      : createEmptyEntry(model.id, model.name);
  });

  return { entries: mergedEntries };
};

export const loadAdminContent = (): AdminContentState => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return buildDefaultContent();
  }

  try {
    const raw = window.localStorage.getItem(ADMIN_CONTENT_STORAGE_KEY);
    if (!raw) {
      return buildDefaultContent();
    }
    const parsed = JSON.parse(raw) as AdminContentState;
    if (!parsed || typeof parsed !== 'object' || !parsed.entries) {
      return buildDefaultContent();
    }
    return mergeContentWithModels(parsed);
  } catch {
    return buildDefaultContent();
  }
};

export const saveAdminContent = (state: AdminContentState) => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }
  window.localStorage.setItem(ADMIN_CONTENT_STORAGE_KEY, JSON.stringify(state));
};

export const getEntryByModelId = (state: AdminContentState, modelId: string) => {
  return state.entries[modelId];
};
