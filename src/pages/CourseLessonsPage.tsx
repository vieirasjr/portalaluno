import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Badge, Button, Alert } from '../components/BaseUI';
import { motion } from 'motion/react';
import { useCourse } from '../contexts/CourseContext';

interface Lesson {
  id: number;
  title: string;
  progress: number;
  hasTest: boolean;
  hasAssignment: boolean;
}

export const CourseLessonsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getLessonProgress } = useCourse();
  const [courseName, setCourseName] = useState('');
  
  const mockLessonsData = useMemo(() => [
    { id: 1, title: 'Introdução e Conceitos Básicos', hasTest: false, hasAssignment: false },
    { id: 2, title: 'Fundamentos e Teoria', hasTest: true, hasAssignment: false },
    { id: 3, title: 'Prática e Implementação I', hasTest: false, hasAssignment: true },
    { id: 4, title: 'Estudo de Caso e Exemplos', hasTest: false, hasAssignment: false },
    { id: 5, title: 'Avançando no Conteúdo', hasTest: true, hasAssignment: true },
    { id: 6, title: 'Revisão e Preparação', hasTest: false, hasAssignment: false },
  ], []);

  const lessons = useMemo(() => {
    return mockLessonsData.map(lesson => {
      const prog = getLessonProgress(id || '0', lesson.id.toString());
      // Calculate progress based on steps (4 steps total)
      const percentage = prog.isFinished ? 100 : Math.round((prog.completedSteps.length / 4) * 100);
      return {
        ...lesson,
        progress: percentage
      };
    });
  }, [id, getLessonProgress, mockLessonsData]);

  const totalProgress = useMemo(() => {
    return lessons.reduce((acc, curr) => acc + curr.progress, 0) / lessons.length;
  }, [lessons]);

  useEffect(() => {
    const courses: Record<string, string> = {
      '0': 'Estrutura de Dados',
      '1': 'Cálculo II',
      '2': 'Banco de Dados',
      '3': 'Sistemas Operacionais',
      '4': 'Engenharia de Requisitos',
      '5': 'Programação Web I',
    };
    setCourseName(courses[id || '0'] || 'Curso');
  }, [id]);

  const canTakeExam = totalProgress >= 90;

  const handleLessonClick = (lessonId: number) => {
    navigate(`/dashboard/academico/curso/${id}/aula/${lessonId}`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="secondary" 
            className="p-2 rounded-full w-10 h-10 flex items-center justify-center"
            onClick={() => navigate('/dashboard/academico')}
          >
            <i className="bi bi-arrow-left"></i>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{courseName}</h1>
            <p className="text-sm text-slate-500">Aulas e Atividades</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Progresso Geral</div>
          <div className="flex items-center gap-3">
            <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-senac-blue-500 transition-all duration-500" 
                style={{ width: `${totalProgress}%` }}
              ></div>
            </div>
            <span className="text-lg font-bold text-senac-blue-500">{Math.round(totalProgress)}%</span>
          </div>
        </div>
      </div>

      {/* Lessons List */}
      <div className="grid grid-cols-1 gap-4">
        {lessons.map((lesson, idx) => (
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => handleLessonClick(lesson.id)}
          >
            <Card className="p-5 hover:border-senac-blue-500/30 transition-all cursor-pointer group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold ${
                    lesson.progress === 100 ? 'bg-senac-success/10 text-senac-success' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {lesson.progress === 100 ? <i className="bi bi-check-lg text-xl"></i> : lesson.id}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 group-hover:text-senac-blue-500 transition-all">{lesson.title}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
                        <i className="bi bi-play-circle"></i> Videoaula
                      </div>
                      {lesson.hasTest && (
                        <Badge variant="info" className="text-[9px] px-1.5 py-0">Teste Disponível</Badge>
                      )}
                      {lesson.hasAssignment && (
                        <Badge variant="warning" className="text-[9px] px-1.5 py-0">Trabalho Pendente</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Concluído</div>
                    <div className="text-sm font-bold text-slate-700">{lesson.progress}%</div>
                  </div>
                  <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${lesson.progress === 100 ? 'bg-senac-success' : 'bg-senac-blue-500'}`}
                      style={{ width: `${lesson.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}

        {/* Final Exam Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: lessons.length * 0.1 }}
          className="mt-4"
        >
          <Card className={`p-8 border-2 ${canTakeExam ? 'border-senac-orange-500 bg-senac-orange-50/20' : 'border-dashed border-slate-200 opacity-70'}`}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${
                  canTakeExam ? 'bg-senac-orange-500 text-white shadow-lg shadow-senac-orange-500/30' : 'bg-slate-100 text-slate-300'
                }`}>
                  <i className="bi bi-mortarboard-fill"></i>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Prova Final da Disciplina</h2>
                  <p className="text-slate-500 text-sm mt-1">
                    {canTakeExam 
                      ? 'Parabéns! Você atingiu o progresso necessário para realizar a avaliação final.' 
                      : 'A avaliação final estará disponível assim que você atingir 90% de progresso no conteúdo.'}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col items-center md:items-end gap-3">
                {!canTakeExam && (
                  <div className="px-4 py-2 bg-slate-100 rounded-lg text-xs font-bold text-slate-500 flex items-center gap-2">
                    <i className="bi bi-lock-fill"></i> Bloqueado ({Math.round(totalProgress)}/90%)
                  </div>
                )}
                <Button 
                  disabled={!canTakeExam}
                  className={`px-8 py-3 h-auto text-base font-bold ${canTakeExam ? 'bg-senac-orange-500 hover:bg-senac-orange-600' : ''}`}
                >
                  {canTakeExam ? 'Iniciar Prova Agora' : 'Aguardando Progresso'}
                </Button>
              </div>
            </div>
            
            {!canTakeExam && (
              <div className="mt-6">
                <Alert variant="info" className="bg-white/50 border-slate-200">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                    <i className="bi bi-info-circle-fill text-senac-blue-500"></i>
                    Dica: Complete as aulas pendentes e realize os testes de cada módulo para liberar a prova.
                  </div>
                </Alert>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
