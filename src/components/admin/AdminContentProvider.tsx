import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type {
  AdminCatalogEntry,
  AdminContentState,
  AdminModelAsset,
  AdminTextureAsset
} from '../../data/admin-content';
import {
  buildDefaultContent,
  getEntryByModelId,
  loadAdminContent,
  mergeContentWithModels,
  saveAdminContent
} from '../../data/admin-content';

interface AdminContentContextValue {
  content: AdminContentState;
  entries: Record<string, AdminCatalogEntry>;
  updateEntry: (modelId: string, updates: Partial<AdminCatalogEntry>) => void;
  addModelAsset: (modelId: string, asset: AdminModelAsset) => void;
  removeModelAsset: (modelId: string, assetId: string) => void;
  addTextureAsset: (modelId: string, asset: AdminTextureAsset) => void;
  removeTextureAsset: (modelId: string, assetId: string) => void;
}

const AdminContentContext = createContext<AdminContentContextValue | undefined>(undefined);

const updateEntryState = (
  state: AdminContentState,
  modelId: string,
  updates: Partial<AdminCatalogEntry>
): AdminContentState => {
  const existing = getEntryByModelId(state, modelId);
  const fallback = existing ?? buildDefaultContent().entries[modelId];
  const updated: AdminCatalogEntry = {
    ...fallback,
    ...updates,
    modelId,
    updatedAt: new Date().toISOString()
  };

  return {
    entries: {
      ...state.entries,
      [modelId]: updated
    }
  };
};

export function AdminContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<AdminContentState>(() => loadAdminContent());

  useEffect(() => {
    saveAdminContent(mergeContentWithModels(content));
  }, [content]);

  const updateEntry = (modelId: string, updates: Partial<AdminCatalogEntry>) => {
    setContent(prev => updateEntryState(prev, modelId, updates));
  };

  const addModelAsset = (modelId: string, asset: AdminModelAsset) => {
    setContent(prev => {
      const entry = getEntryByModelId(prev, modelId);
      const existingAssets = entry?.modelAssets ?? [];
      return updateEntryState(prev, modelId, {
        modelAssets: [...existingAssets, asset]
      });
    });
  };

  const removeModelAsset = (modelId: string, assetId: string) => {
    setContent(prev => {
      const entry = getEntryByModelId(prev, modelId);
      if (!entry) return prev;
      return updateEntryState(prev, modelId, {
        modelAssets: entry.modelAssets.filter(asset => asset.id !== assetId)
      });
    });
  };

  const addTextureAsset = (modelId: string, asset: AdminTextureAsset) => {
    setContent(prev => {
      const entry = getEntryByModelId(prev, modelId);
      const existingAssets = entry?.textures ?? [];
      return updateEntryState(prev, modelId, {
        textures: [...existingAssets, asset]
      });
    });
  };

  const removeTextureAsset = (modelId: string, assetId: string) => {
    setContent(prev => {
      const entry = getEntryByModelId(prev, modelId);
      if (!entry) return prev;
      return updateEntryState(prev, modelId, {
        textures: entry.textures.filter(asset => asset.id !== assetId)
      });
    });
  };

  const value = useMemo(
    () => ({
      content,
      entries: content.entries,
      updateEntry,
      addModelAsset,
      removeModelAsset,
      addTextureAsset,
      removeTextureAsset
    }),
    [content]
  );

  return (
    <AdminContentContext.Provider value={value}>
      {children}
    </AdminContentContext.Provider>
  );
}

export const useAdminContent = () => {
  const context = useContext(AdminContentContext);
  if (!context) {
    throw new Error('useAdminContent must be used within AdminContentProvider');
  }
  return context;
};
