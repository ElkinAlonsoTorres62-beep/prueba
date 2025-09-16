import React, { useState } from 'react';

const NewLoanModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [studentCode, setStudentCode] = useState('');
  const [selectedGame, setSelectedGame] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);

  // Base de datos simulada de estudiantes
  const studentsDatabase = {
    "202310001": {
      name: "Juan Pérez",
      program: "Ingeniería de Sistemas",
      semester: 5,
      active: true
    },
    "202310045": {
      name: "María Gómez",
      program: "Psicología",
      semester: 3,
      active: true
    },
    "202310128": {
      name: "Carlos Rodríguez",
      program: "Administración de Empresas",
      semester: 7,
      active: true
    }
  };

  const resetModal = () => {
    setCurrentStep(1);
    setStudentCode('');
    setSelectedGame('');
    setIsVerifying(false);
    setVerificationResult(null);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const verifyStudent = () => {
    if (!studentCode || studentCode.length !== 9 || !/^\d+$/.test(studentCode)) {
      alert('Por favor ingresa un código de estudiante válido de 9 dígitos');
      return;
    }

    setIsVerifying(true);
    setCurrentStep(2);

    // Simular verificación
    setTimeout(() => {
      setIsVerifying(false);
      if (studentsDatabase[studentCode]) {
        setVerificationResult({ success: true, student: studentsDatabase[studentCode] });
      } else {
        setVerificationResult({ success: false, message: 'Código de estudiante no encontrado' });
      }
      setCurrentStep(3);
    }, 1500);
  };

  const completeLoan = () => {
    if (!selectedGame) {
      alert('Por favor selecciona un juego');
      return;
    }

    // Aquí iría la lógica para guardar el préstamo
    console.log('Préstamo completado:', {
      student: verificationResult.student.name,
      code: studentCode,
      game: selectedGame
    });

    setCurrentStep(4);
  };

  if (!isOpen) return null;

  return (
    <div className="modal" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div className="modal-content" style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '500px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1b5e20' }}>Nuevo Préstamo</h2>
          <button onClick={handleClose} style={{ color: '#6b7280', cursor: 'pointer' }}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Paso 1: Ingreso de código */}
        {currentStep === 1 && (
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                Código de Estudiante
              </label>
              <input
                type="text"
                value={studentCode}
                onChange={(e) => setStudentCode(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem'
                }}
                placeholder="Ej: 202310001"
                maxLength={9}
              />
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
                Ingresa el código de 9 dígitos del estudiante
              </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={verifyStudent}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#16a34a',
                  color: 'white',
                  borderRadius: '0.5rem',
                  cursor: 'pointer'
                }}
              >
                Verificar <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </div>
          </div>
        )}

        {/* Paso 2: Verificación */}
        {currentStep === 2 && (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div className="loader" style={{
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #1b5e20',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 1rem'
            }}></div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '500', color: '#374151' }}>
              Verificando código de estudiante
            </h3>
            <p style={{ color: '#6b7280', marginTop: '0.5rem' }}>Por favor espere...</p>
          </div>
        )}

        {/* Paso 3: Resultado */}
        {currentStep === 3 && verificationResult && (
          <div>
            {verificationResult.success ? (
              <>
                <div style={{
                  backgroundColor: '#dcfce7',
                  border: '1px solid #86efac',
                  color: '#166534',
                  padding: '1rem',
                  borderRadius: '0.375rem',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <i className="fas fa-check-circle mr-2"></i>
                  <span>Código verificado correctamente</span>
                </div>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                    Información del Estudiante
                  </h3>
                  <div style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '0.5rem' }}>
                    <p><span style={{ fontWeight: '500' }}>Nombre:</span> {verificationResult.student.name}</p>
                    <p><span style={{ fontWeight: '500' }}>Programa:</span> {verificationResult.student.program}</p>
                    <p><span style={{ fontWeight: '500' }}>Semestre:</span> {verificationResult.student.semester}</p>
                  </div>
                </div>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                    Seleccionar Juego
                  </label>
                  <select
                    value={selectedGame}
                    onChange={(e) => setSelectedGame(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem'
                    }}
                  >
                    <option value="">Selecciona un juego</option>
                    <option value="Ajedrez">Ajedrez</option>
                    <option value="UNO">UNO</option>
                    <option value="Jenga">Jenga</option>
                    <option value="Monopoly">Monopoly</option>
                  </select>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button
                    onClick={() => setCurrentStep(1)}
                    style={{
                      padding: '0.75rem 1.5rem',
                      backgroundColor: '#d1d5db',
                      color: '#374151',
                      borderRadius: '0.5rem',
                      cursor: 'pointer'
                    }}
                  >
                    <i className="fas fa-arrow-left mr-2"></i> Atrás
                  </button>
                  <button
                    onClick={completeLoan}
                    style={{
                      padding: '0.75rem 1.5rem',
                      backgroundColor: '#16a34a',
                      color: 'white',
                      borderRadius: '0.5rem',
                      cursor: 'pointer'
                    }}
                  >
                    Completar Préstamo <i className="fas fa-check ml-2"></i>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div style={{
                  backgroundColor: '#fee2e2',
                  border: '1px solid '#fecaca',
                  color: '#dc2626',
                  padding: '1rem',
                  borderRadius: '0.375rem',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <i className="fas fa-exclamation-circle mr-2"></i>
                  <span>{verificationResult.message}</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <button
                    onClick={() => setCurrentStep(1)}
                    style={{
                      padding: '0.75rem 1.5rem',
                      backgroundColor: '#d1d5db',
                      color: '#374151',
                      borderRadius: '0.5rem',
                      cursor: 'pointer'
                    }}
                  >
                    <i className="fas fa-arrow-left mr-2"></i> Intentar de nuevo
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Paso 4: Completado */}
        {currentStep === 4 && (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ color: '#16a34a', fontSize: '3rem', marginBottom: '1rem' }}>
              <i className="fas fa-check-circle"></i>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
              ¡Préstamo registrado exitosamente!
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
              El juego ha sido prestado al estudiante correctamente.
            </p>
            
            <div style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem', textAlign: 'left' }}>
              <p><span style={{ fontWeight: '500' }}>Estudiante:</span> {verificationResult.student.name}</p>
              <p><span style={{ fontWeight: '500' }}>Juego:</span> {selectedGame}</p>
              <p><span style={{ fontWeight: '500' }}>Fecha de préstamo:</span> {new Date().toLocaleDateString('es-ES')}</p>
              <p><span style={{ fontWeight: '500' }}>Fecha de devolución:</span> {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('es-ES')}</p>
            </div>
            
            <button
              onClick={handleClose}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#16a34a',
                color: 'white',
                borderRadius: '0.5rem',
                cursor: 'pointer'
              }}
            >
              Finalizar <i className="fas fa-check ml-2"></i>
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default NewLoanModal;
