interface RuntimeOpenAiConfig {
  apiKey?: string;
}

let cachedApiKey: string | null | undefined;

async function loadRuntimeConfig(): Promise<RuntimeOpenAiConfig | null> {
  try {
    const response = await fetch('/openai-config.json', { cache: 'no-store' });
    if (!response.ok) return null;
    return (await response.json()) as RuntimeOpenAiConfig;
  } catch {
    return null;
  }
}

export async function getOpenAiApiKey(): Promise<string | null> {
  if (cachedApiKey !== undefined) {
    return cachedApiKey;
  }

  const runtimeConfig = await loadRuntimeConfig();
  const runtimeKey = runtimeConfig?.apiKey?.trim();
  const envKey = (import.meta.env.VITE_OPENAI_API_KEY as string | undefined)?.trim();
  cachedApiKey = runtimeKey || envKey || null;
  return cachedApiKey;
}
