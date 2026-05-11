import React, { useMemo } from 'react';
import { MathAnalysisService } from './MathAnalysisService';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Label } from 'recharts';
import './SecurityResearch.css';

const SecurityResearch: React.FC = () => {
  const data = useMemo(() => {
    const rawData = MathAnalysisService.generateLengthExperiment(26);
    return rawData.map(item => ({
      ...item,
      // Обчислюємо десятковий логарифм від секунд (Log10)
      // Якщо секунд менше 1, ставимо 0, щоб не було помилок з log(0)
      logSeconds: item.seconds > 0 ? Math.log10(item.seconds) : 0
    }));
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', color: '#333' }}>
      <h2 style={{ textAlign: 'center' }}>Математичне дослідження (Логарифмічна шкала)</h2>
      
      {/* Таблиця залишається для звіту */}
      <div style={{ marginBottom: '30px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
          <thead>
            <tr style={{ backgroundColor: '#eee' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>L</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Log10(Tavg)</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Форматований час</th>
            </tr>
          </thead>
          <tbody>
            {data.map(row => (
              <tr key={row.length}>
                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>{row.length}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>{row.logSeconds.toFixed(2)}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>{row.formattedTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Логарифмічний графік */}
      <div style={{ height: '400px', width: '100%', backgroundColor: '#fff', padding: '10px', borderRadius: '5px' }}>
        <h4 style={{ textAlign: 'center' }}>Залежність Log10(Час зламу) від довжини L</h4>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="length">
              <Label value="Довжина пароля (L)" offset={-10} position="insideBottom" />
            </XAxis>
            <YAxis>
              <Label value="log10(секунди)" angle={-90} position="insideLeft" />
            </YAxis>
            <Tooltip formatter={(value: any) => [Number(value).toFixed(2), "Log10(Tavg)"]} />
            <Legend verticalAlign="top" height={36}/>
            <Line 
              name="Логарифм часу зламу" 
              type="monotone" 
              dataKey="logSeconds" 
              stroke="#28a745" 
              strokeWidth={3} 
              dot={{ r: 6 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <p style={{ marginTop: '20px', fontSize: '14px', fontStyle: 'italic', lineHeight: '1.5' }}>
        * <b>Пояснення для звіту:</b> Пряма лінія на логарифмічному графіку свідчить про експоненціальну залежність складності від довжини пароля[cite: 70]. 
        Кожна одиниця на осі Y означає збільшення часу зламу в 10 разів.
      </p>
    </div>
  );
};

export default SecurityResearch;