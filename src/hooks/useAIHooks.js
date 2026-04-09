import { useState } from 'react';
import { aiService } from '@/services/mockServices';

export const useAIPrecheck = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState(null);

  const runCheck = async (content) => {
    setIsAnalyzing(true);
    const result = await aiService.getPrecheckReport(content);
    setReport(result);
    setIsAnalyzing(false);
    return result;
  };

  return { runCheck, isAnalyzing, report, clearReport: () => setReport(null) };
};

export const useAIReworkSummary = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [summary, setSummary] = useState("");

  const generateSummary = async (comments) => {
    setIsGenerating(true);
    // Simulate AI synthesis of comments
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockSummary = "Based on recent feedback, the document requires updates to ISO section references, clarification of 'Quality Lead' roles, and inclusion of Annex A for process maps.";
    
    setSummary(mockSummary);
    setIsGenerating(false);
    return mockSummary;
  };

  return { generateSummary, isGenerating, summary };
};
