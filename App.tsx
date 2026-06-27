import React, { useState, useEffect, useRef } from 'react';
import { Shield, AlertCircle, X, Check, Brain, Database, ArrowRight, Loader2 } from 'lucide-react';
import { analyzeTextWithGemini } from './services/geminiService';
import { AnalysisResult, MOCK_STEPS } from './types';
import ArchitectureViz from './components/ArchitectureViz';
import ResultsDashboard from './components/ResultsDashboard';

const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [inputText]);

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;

    setIsAnalyzing(true);
    setError(null);
    setResult(null);
    setCurrentStep(1);

    try {
      // Simulate the Architecture phases before/during the API call
      // This is purely for UX to demonstrate the "Hybrid Architecture" requested
      
      const stepInterval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev < 5) return prev + 1;
          return prev;
        });
      }, 1500); // 1.5s per step visualization

      // Call Gemini API (The actual logic engine)
      const data = await analyzeTextWithGemini(inputText);
      
      clearInterval(stepInterval);
      setCurrentStep(5); // Ensure visualization completes
      
      // Small delay to let the final animation settle
      setTimeout(() => {
        setResult(data);
        setIsAnalyzing(false);
      }, 800);

    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during analysis.");
      setIsAnalyzing(false);
      setCurrentStep(0);
    }
  };

  const handleClear = () => {
    setInputText('');
    setResult(null);
    setCurrentStep(0);
    setError(null);
  };

  const loadSample = () => {
    setInputText("Scientists have confirmed that eating 5kg of chocolate daily cures all known diseases instantly. The secret study was suppressed by Big Pharma to keep people sick! Share this before it gets deleted!");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30">
      
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
               <Shield className="w-8 h-8 text-cyan-400" />
               <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">Veritas<span className="text-cyan-400">AI</span></h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest">Hybrid Deep Learning Detector</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-cyan-400 transition-colors">Architecture</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Research</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">About</a>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Intro Section */}
        {!result && !isAnalyzing && (
          <div className="text-center mb-12 max-w-2xl mx-auto animate-fadeIn">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Detect Misinformation with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Precision</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              Utilizing a hybrid <span className="text-cyan-400 font-mono">DCNN + BERT</span> architecture to analyze linguistic patterns, context, and semantic anomalies in real-time.
            </p>
          </div>
        )}

        {/* Input Area */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 shadow-2xl shadow-cyan-900/10 focus-within:ring-2 focus-within:ring-cyan-500/50 focus-within:border-cyan-500 transition-all duration-300">
            <textarea
              ref={textareaRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste article text or headline here to analyze credibility..."
              className="w-full bg-transparent text-lg text-slate-200 placeholder-slate-600 p-6 min-h-[160px] outline-none resize-none"
              disabled={isAnalyzing}
            />
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-900/50 rounded-b-xl">
               <div className="flex gap-2">
                 <button 
                  onClick={loadSample}
                  disabled={isAnalyzing}
                  className="text-xs font-medium text-slate-500 hover:text-cyan-400 transition-colors flex items-center gap-1"
                >
                  <Database className="w-3 h-3" /> Load Sample
                 </button>
               </div>
               
               <div className="flex items-center gap-3">
                 {inputText && (
                   <button 
                     onClick={handleClear}
                     className="p-2 text-slate-500 hover:text-slate-300 transition-colors"
                     disabled={isAnalyzing}
                   >
                     <X className="w-5 h-5" />
                   </button>
                 )}
                 <button
                   onClick={handleAnalyze}
                   disabled={!inputText.trim() || isAnalyzing}
                   className={`
                     flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition-all duration-300
                     ${!inputText.trim() || isAnalyzing 
                       ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                       : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]'
                     }
                   `}
                 >
                   {isAnalyzing ? (
                     <><Loader2 className="w-5 h-5 animate-spin" /> Processing</>
                   ) : (
                     <><Brain className="w-5 h-5" /> Analyze Veracity</>
                   )}
                 </button>
               </div>
            </div>
          </div>
        </div>

        {/* Processing Visualization */}
        {isAnalyzing && (
          <div className="mt-12 max-w-4xl mx-auto animate-fadeIn">
            <div className="flex items-center justify-between text-xs font-mono text-cyan-500 mb-2 uppercase tracking-widest">
               <span>Architecture Pipeline Active</span>
               <span>Step {currentStep} / 5</span>
            </div>
            <ArchitectureViz currentStep={currentStep} />
            <div className="text-center mt-4">
               <p className="text-slate-400 text-sm animate-pulse">
                 {MOCK_STEPS[currentStep - 1]?.description || "Finalizing results..."}
               </p>
            </div>
          </div>
        )}

        {/* Results Section */}
        {result && !isAnalyzing && (
          <div className="mt-12 max-w-5xl mx-auto">
             <div className="mb-8 flex items-center gap-4">
                <ArchitectureViz currentStep={5} /> 
             </div>
             <ResultsDashboard result={result} />
             
             <div className="mt-12 p-6 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700">
               <h4 className="text-slate-300 font-semibold mb-2 flex items-center gap-2">
                 <Brain className="w-4 h-4 text-cyan-400" /> About this Analysis
               </h4>
               <p className="text-sm text-slate-400 leading-relaxed">
                 The results above are generated by a simulation of a Hybrid DCNN-BERT architecture. 
                 The BERT component handles bidirectional contextual embedding to understand semantic meaning, 
                 while the Deep Convolutional Neural Network (DCNN) extracts local n-gram features indicative of fake news patterns. 
                 Final classification is performed via a fused dense layer.
                 <br/><br/>
                 <span className="opacity-50 text-xs block mt-2">Powered by Gemini for semantic reasoning simulation.</span>
               </p>
             </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mt-8 max-w-2xl mx-auto p-4 bg-red-900/20 border border-red-500/50 rounded-lg flex items-center gap-4 text-red-200 animate-fadeIn">
            <AlertCircle className="w-6 h-6 text-red-400 shrink-0" />
            <p>{error}</p>
          </div>
        )}

      </main>
    </div>
  );
};

export default App;