import React, { useMemo } from 'react';
import { MathAnalysisService } from './MathAnalysisService';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Label } from 'recharts';
import './SecurityResearch.css';

const SecurityResearch: React.FC = () => {
  const data = useMemo(() => MathAnalysisService.generateLengthExperiment(26), []);

  return (
    <div className="research-container">
      <h2 className="research-title">Аналіз криптостійкості: Порівняння масштабів</h2>
      
      {/* Таблиця з даними */}
      <table className="research-table">
        <thead>
          <tr>
            <th>Довжина (L)</th>
            <th>Комбінації (N)</th>
            <th>Log10(Tavg)</th>
            <th>Середній час (Tavg)</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.length}>
              <td>{row.length}</td>
              <td>{row.combinations.toExponential(2)}</td>
              <td style={{ color: '#4fd1c5', fontWeight: 'bold' }}>{row.logSeconds}</td>
              <td>{row.formattedTime}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="charts-grid">
        
        {/* Графік 1: Експоненціальний */}
        <div className="chart-card">
          <h3 style={{ color: '#e53e3e' }}>1. Лінійний масштаб (Експонента)</h3>
          <p style={{ color: '#666', fontSize: '12px', textAlign: 'center', marginBottom: '10px' }}>
            Демонструє вибухове зростання часу зламу
          </p>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="length">
                <Label value="Довжина пароля (L)" offset={-25} position="insideBottom" />
              </XAxis>
              <YAxis>
                <Label value="Час (секунди)" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
              </YAxis>
              <Tooltip formatter={(v: any) => [v.toExponential(2), "Секунди"]} />
              <Legend verticalAlign="top" />
              <Line name="Tavg (лінійний)" type="monotone" dataKey="seconds" stroke="#8884d8" strokeWidth={3} dot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Графік 2: Логарифмічний */}
        <div className="chart-card">
          <h3 style={{ color: '#38a169' }}>2. Аналітичний масштаб (Логарифм)</h3>
          <p style={{ color: '#666', fontSize: '12px', textAlign: 'center', marginBottom: '10px' }}>
            Візуалізує стабільний приріст стійкості
          </p>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="length">
                <Label value="Довжина пароля (L)" offset={-25} position="insideBottom" />
              </XAxis>
              <YAxis>
                <Label value="Стійкість (Log10)" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
              </YAxis>
              <Tooltip formatter={(v: any) => [v, "Порядок (Log10)"]} />
              <Legend verticalAlign="top" />
              <Line name="Log10(Tavg)" type="monotone" dataKey="logSeconds" stroke="#48bb78" strokeWidth={3} dot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>

      <div className="research-summary-box" style={{ marginTop: '30px', padding: '15px', borderLeft: '4px solid #4fd1c5', backgroundColor: '#2d3748' }}>
        <p style={{ margin: 0, fontSize: '14px' }}>
          <strong>Висновок:</strong> Обидва графіки базуються на одній вибірці даних. 
          Лівий графік ілюструє <strong>складність для атакуючого</strong>, а правий — 
          <strong>математичну закономірність</strong> зростання захищеності системи.
        </p>
      </div>
    </div>
  );
};

export default SecurityResearch;