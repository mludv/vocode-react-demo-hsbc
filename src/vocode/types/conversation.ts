import { AgentConfig } from "./vocode/agent";
import { SynthesizerConfig } from "./vocode/synthesizer";
import { TranscriberConfig } from "./vocode/transcriber";
import { AudioEncoding } from "./vocode/audioEncoding";

export type ConversationStatus = "idle" | "connecting" | "connected" | "error";

export type AudioDeviceConfig = {
  // inputDeviceId: "default" | string;
  // outputDeviceId: "default" | string;
  outputSamplingRate?: number;
};

export type VocodeConfig = {
  apiKey: string;
};

export type ConversationConfig = {
  audioDeviceConfig: AudioDeviceConfig;
  transcriberConfig: Omit<TranscriberConfig, "samplingRate" | "audioEncoding">;
  agentConfig: AgentConfig;
  synthesizerConfig: Omit<SynthesizerConfig, "samplingRate" | "audioEncoding">;
  vocodeConfig: VocodeConfig;
};

export type AudioMetadata = {
  samplingRate: number;
  audioEncoding: AudioEncoding;
};
