import React from 'react';
import { loanHistory } from '../mock/loanHistory';
import { Calendar, User, CheckCircle, Clock } from 'lucide-react';

const History = () => {
  const getStatusIcon = (status) => {
    return status === 'Devuelto' 
      ? <CheckCircle size={20} className="text-green-500" /> 
      : <Clock size={20} className="text-yellow-500" />;
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Historial de Préstamos</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
            <tr>
              <th className="py-3 px-4 text-left">Juego</th>
              <th className="py-3 px-4 text-left">Estudiante</th>
              <th className="py-3 px-4 text-left">ID Estudiante</th>
              <th className="py-3 px-4 text-left">Fecha Préstamo</th>
              <th className="py-3 px-4 text-left">Fecha Devolución</th>
              <th className="py-3 px-4 text-left">Estado</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {loanHistory.map((loan) => (
              <tr key={loan.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4">{loan.gameTitle}</td>
                <td className="py-3 px-4 flex items-center gap-2">
                  <User size={16} className="text-gray-400" />
                  {loan.studentName}
                </td>
                <td className="py-3 px-4">{loan.studentId}</td>
                <td className="py-3 px-4 flex items-center gap-2">
                  <Calendar size={16} className="text-gray-400" />
                  {loan.loanDate}
                </td>
                <td className="py-3 px-4 flex items-center gap-2">
                  <Calendar size={16} className="text-gray-400" />
                  {loan.returnDate}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(loan.status)}
                    <span className={loan.status === 'Devuelto' ? 'text-green-600' : 'text-yellow-600'}>
                      {loan.status}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {loanHistory.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No hay historial de préstamos registrado.
        </div>
      )}
    </section>
  );
};

export default History;