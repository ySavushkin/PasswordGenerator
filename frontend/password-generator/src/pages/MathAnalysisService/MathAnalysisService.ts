export interface CalculationResult {
  length: number;
  combinations: number;
  seconds: number;
  logSeconds: number; // Нове поле
  formattedTime: string;
}

export const MathAnalysisService = {
  calculateStability: (length: number, alphabetSize: number, speed: number = 1000000): CalculationResult => {
    const N = Math.pow(alphabetSize, length);
    const seconds = N / (2 * speed);
    
    return {
      length,
      combinations: N,
      seconds: seconds,
      // Десятковий логарифм для лінеаризації графіка
      logSeconds: seconds > 0 ? Number(Math.log10(seconds).toFixed(2)) : 0,
      formattedTime: MathAnalysisService.formatTime(seconds)
    };
  },

  generateLengthExperiment: (alphabetSize: number = 26) => {
    const lengths = [4, 6, 8, 10, 12, 14, 16, 32];
    return lengths.map(L => MathAnalysisService.calculateStability(L, alphabetSize));
  },

  formatTime: (seconds: number): string => {
    if (seconds < 1) return "миттєво";
    if (seconds < 60) return `${Math.floor(seconds)} сек`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} хв`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} год`;
    if (seconds < 31536000) return `${Math.floor(seconds / 86400)} діб`;
    return `${(seconds / 31536000).toExponential(2)} років`;
  }
};