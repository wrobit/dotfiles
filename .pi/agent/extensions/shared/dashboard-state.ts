export interface ModelInfoState {
  provider: string;
  modelId: string;
  modelName: string;
  thinking: string;
  contextTokens: number | null;
  contextPercent: number | null;
  contextWindow: number;
  cost: number;
  tokensPerSecond: number | null;
  generating: boolean;
}

export interface GitInfoState {
  branch: string;
  changedFiles: number;
  pullRequest?: {
    number: number;
    url: string;
  };
}

export const MODEL_INFO_CHANNEL = "dashboard:model-info";
export const GIT_INFO_CHANNEL = "dashboard:git-info";
export const REFRESH_CHANNEL = "dashboard:refresh";

export function emptyModelInfoState(): ModelInfoState {
  return {
    provider: "",
    modelId: "unknown",
    modelName: "Unknown model",
    thinking: "unknown",
    contextTokens: null,
    contextPercent: null,
    contextWindow: 0,
    cost: 0,
    tokensPerSecond: null,
    generating: false,
  };
}

export function emptyGitInfoState(): GitInfoState {
  return { branch: "", changedFiles: 0 };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function isModelInfoState(value: unknown): value is ModelInfoState {
  return (
    isRecord(value) &&
    typeof value.provider === "string" &&
    typeof value.modelId === "string" &&
    typeof value.modelName === "string" &&
    typeof value.thinking === "string" &&
    (typeof value.contextTokens === "number" || value.contextTokens === null) &&
    (typeof value.contextPercent === "number" || value.contextPercent === null) &&
    typeof value.contextWindow === "number" &&
    typeof value.cost === "number" &&
    (typeof value.tokensPerSecond === "number" || value.tokensPerSecond === null) &&
    typeof value.generating === "boolean"
  );
}

export function isGitInfoState(value: unknown): value is GitInfoState {
  return (
    isRecord(value) &&
    typeof value.branch === "string" &&
    typeof value.changedFiles === "number"
  );
}
