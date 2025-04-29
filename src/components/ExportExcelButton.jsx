// src/components/ExportExcelButton.jsx
import { useCallback } from 'react';

export default function ExportExcelButton({ data, fileName = 'relatorio', buttonText = 'Exportar para Excel' }) {
  const exportToExcel = useCallback(() => {
    if (!data || data.length === 0) {
      alert('Nenhum dado disponível para exportação');
      return;
    }

    try {
      // Cabeçalhos baseados nas chaves do primeiro item
      const headers = Object.keys(data[0]).filter(key => key !== 'datetime');
      
      // Dados formatados
      const excelData = data.map(item => 
        headers.map(header => item[header])
      );
      
      // Combinar cabeçalhos e dados
      const csvContent = [
        headers.join(","),
        ...excelData.map(row => row.join(","))
      ].join("\n");
      
      // Criar arquivo
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `${fileName}_${new Date().toLocaleDateString('pt-BR')}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Erro ao exportar para Excel:', error);
      alert('Ocorreu um erro ao gerar o relatório');
    }
  }, [data, fileName]);

  return (
    <button
      onClick={exportToExcel}
      style={{
        padding: '8px 16px',
        backgroundColor: '#27ae60',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '0.9rem',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'all 0.2s ease',
        ':hover': {
          backgroundColor: '#219653'
        }
      }}
    >
      <span>📊</span>
      {buttonText}
    </button>
  );
}