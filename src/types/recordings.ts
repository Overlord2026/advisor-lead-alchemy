
export interface Recording {
  id: string;
  title: string;
  prospectName: string;
  prospectId: string;
  type: string;
  date: string;
  duration: string;
  hasAiAnalysis: boolean;
  status?: string;
  email?: string;
  initial?: string;
  source?: "google-meet" | "zoom" | "twilio" | "amazon-chime" | "browser" | "upload";
  recordingUrl?: string;
  transcriptUrl?: string;
}

export interface RecordingSource {
  id: string;
  name: string;
  type: "google-meet" | "zoom" | "twilio" | "amazon-chime" | "browser" | "upload";
  isConnected: boolean;
  lastSynced?: string;
  icon: string;
}

export interface RecordingSettings {
  autoTranscribe: boolean;
  aiAnalysis: boolean;
  defaultSource: string;
  autoCategorize: boolean;
}
