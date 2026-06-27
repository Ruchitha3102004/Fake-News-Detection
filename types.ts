export interface AnalysisResult {
  real_probability: number;
  fake_probability: number;
  classification: 'REAL' | 'FAKE' | 'SATIRE' | 'MISLEADING' | 'OPINION';
  confidence_score: number;
  sentiment: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
  emotional_tone: string;
  linguistic_features: {
    name: string;
    value: number; // 0-100
    description: string;
  }[];
  key_indicators: string[];
  reasoning: string;
}

export interface ProcessingStep {
  id: number;
  label: string;
  description: string;
  status: 'waiting' | 'active' | 'completed';
}

export const MOCK_STEPS: ProcessingStep[] = [
  { id: 1, label: 'Preprocessing', description: 'Cleaning text and removing stop words', status: 'waiting' },
  { id: 2, label: 'BERT Tokenization', description: 'Generating contextual embeddings', status: 'waiting' },
  { id: 3, label: 'DCNN Extraction', description: 'Convolutional feature mapping', status: 'waiting' },
  { id: 4, label: 'Feature Fusion', description: 'Concatenating dense vectors', status: 'waiting' },
  { id: 5, label: 'Classification', description: 'Softmax probability calculation', status: 'waiting' },
];