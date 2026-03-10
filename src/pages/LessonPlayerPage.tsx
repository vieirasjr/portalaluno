import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Button, Card, Badge } from '../components/BaseUI';
import { useCourse } from '../contexts/CourseContext';

const STEPS = [
  { id: 0, title: 'Boas-vindas', type: 'video' },
  { id: 1, title: 'Material de Apoio', type: 'text' },
  { id: 2, title: 'Conteúdo Principal', type: 'video' },
  { id: 3, title: 'Encerramento', type: 'video' },
];

export const LessonPlayerPage: React.FC = () => {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const navigate = useNavigate();
  const { updateProgress, getLessonProgress } = useCourse();
  
  const lessonProgress = getLessonProgress(courseId || '', lessonId || '');
  const [currentStep, setCurrentStep] = useState(lessonProgress.currentStep || 0);

  const progressPercentage = Math.round(((currentStep + 1) / STEPS.length) * 100);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      updateProgress(courseId!, lessonId!, nextStep);
    } else {
      updateProgress(courseId!, lessonId!, currentStep, true);
      navigate(`/dashboard/academico/curso/${courseId}`);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(`/dashboard/academico/curso/${courseId}`);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="aspect-video bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center relative group">
              <img 
                src="https://picsum.photos/seed/welcome/1280/720" 
                alt="Welcome Thumbnail" 
                className="w-full h-full object-cover opacity-50"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-senac-orange-500 rounded-full flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform cursor-pointer">
                  <i className="bi bi-play-fill text-4xl ml-1"></i>
                </div>
              </div>
            </div>
            <div className="prose prose-slate max-w-none">
              <h2 className="text-2xl font-bold text-slate-800">Bem-vindo à Aula</h2>
              <p className="text-slate-600 leading-relaxed">
                Olá! Seja muito bem-vindo a esta etapa da sua jornada de aprendizado. 
                Neste vídeo de introdução, vamos alinhar as expectativas e os objetivos principais desta aula. 
                Prepare seu material e vamos começar!
              </p>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <div className="prose prose-slate max-w-none">
              <h2 className="text-2xl font-bold text-slate-800">Material de Apoio</h2>
              <p className="text-slate-600 leading-relaxed">
                Abaixo você encontrará o material teórico detalhado sobre o assunto de hoje. 
                Recomendamos a leitura atenta antes de prosseguir para o vídeo principal.
              </p>
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
                <h3 className="text-lg font-bold text-slate-700 mb-4">Resumo do Conteúdo</h3>
                <ul className="space-y-2 text-slate-600">
                  <li>• Conceitos fundamentais e definições</li>
                  <li>• Aplicações práticas no mercado de trabalho</li>
                  <li>• Exemplos de casos reais</li>
                  <li>• Referências bibliográficas complementares</li>
                </ul>
              </div>
            </div>
            <Card className="flex items-center justify-between bg-senac-blue-50 border-senac-blue-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-senac-blue-500 rounded-xl flex items-center justify-center text-white">
                  <i className="bi bi-file-earmark-pdf-fill text-2xl"></i>
                </div>
                <div>
                  <p className="font-bold text-senac-blue-900">Material_Aula_01.pdf</p>
                  <p className="text-xs text-senac-blue-700">Tamanho: 2.4 MB</p>
                </div>
              </div>
              <Button variant="secondary" className="px-4 py-2 text-xs">
                <i className="bi bi-download mr-2"></i>
                Download
              </Button>
            </Card>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="aspect-video bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center relative group">
              <img 
                src="https://picsum.photos/seed/main/1280/720" 
                alt="Main Content Thumbnail" 
                className="w-full h-full object-cover opacity-50"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-senac-orange-500 rounded-full flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform cursor-pointer">
                  <i className="bi bi-play-fill text-4xl ml-1"></i>
                </div>
              </div>
            </div>
            <div className="prose prose-slate max-w-none">
              <h2 className="text-2xl font-bold text-slate-800">Conteúdo Principal</h2>
              <p className="text-slate-600 leading-relaxed">
                Agora vamos aprofundar nos detalhes técnicos. Assista ao vídeo acima com atenção, 
                pois ele contém a base prática para as atividades desta disciplina.
              </p>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="aspect-video bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center relative group">
              <img 
                src="https://picsum.photos/seed/closing/1280/720" 
                alt="Closing Thumbnail" 
                className="w-full h-full object-cover opacity-50"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-senac-orange-500 rounded-full flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform cursor-pointer">
                  <i className="bi bi-play-fill text-4xl ml-1"></i>
                </div>
              </div>
            </div>
            <div className="prose prose-slate max-w-none text-center">
              <h2 className="text-2xl font-bold text-slate-800">Parabéns!</h2>
              <p className="text-slate-600 leading-relaxed">
                Você concluiu todas as etapas desta aula. Esperamos que o conteúdo tenha sido valioso 
                para o seu crescimento profissional. Clique em finalizar para registrar seu progresso.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button 
          onClick={handleBack}
          className="flex items-center gap-2 text-slate-500 hover:text-senac-blue-500 transition-colors font-bold text-sm"
        >
          <i className="bi bi-arrow-left"></i>
          Voltar para o Curso
        </button>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Progresso da Aula</p>
            <p className="text-lg font-black text-senac-blue-500">{progressPercentage}%</p>
          </div>
          <div className="w-32 bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200">
            <motion.div 
              className="bg-senac-blue-500 h-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Content Area */}
      <Card className="p-8 min-h-[500px] flex flex-col justify-between shadow-xl border-slate-200">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1"
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
          <div className="flex gap-2">
            {STEPS.map((step) => (
              <div 
                key={step.id}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  step.id === currentStep ? 'w-8 bg-senac-orange-500' : 
                  step.id < currentStep ? 'bg-senac-blue-500' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
          <Button 
            onClick={handleNext}
            className="px-10 py-4 shadow-lg shadow-senac-orange-500/20"
          >
            {currentStep === STEPS.length - 1 ? 'Finalizar Aula' : 'Continuar'}
            <i className={`bi bi-${currentStep === STEPS.length - 1 ? 'check-circle' : 'arrow-right'} ml-2`}></i>
          </Button>
        </div>
      </Card>
    </div>
  );
};
