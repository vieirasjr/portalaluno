import React, { createContext, useContext, useState, useEffect } from 'react';

interface LessonProgress {
  lessonId: string;
  courseId: string;
  completedSteps: number[];
  isFinished: boolean;
  currentStep: number;
}

interface CourseContextType {
  progress: Record<string, LessonProgress>;
  updateProgress: (courseId: string, lessonId: string, step: number, isFinished?: boolean) => void;
  getLessonProgress: (courseId: string, lessonId: string) => LessonProgress;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<Record<string, LessonProgress>>(() => {
    const saved = localStorage.getItem('senac_course_progress');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('senac_course_progress', JSON.stringify(progress));
  }, [progress]);

  const updateProgress = (courseId: string, lessonId: string, step: number, isFinished: boolean = false) => {
    const key = `${courseId}_${lessonId}`;
    setProgress(prev => {
      const current = prev[key] || {
        lessonId,
        courseId,
        completedSteps: [],
        isFinished: false,
        currentStep: 0
      };

      const newCompletedSteps = Array.from(new Set([...current.completedSteps, step]));
      
      return {
        ...prev,
        [key]: {
          ...current,
          completedSteps: newCompletedSteps,
          currentStep: step,
          isFinished: isFinished || current.isFinished
        }
      };
    });
  };

  const getLessonProgress = (courseId: string, lessonId: string) => {
    const key = `${courseId}_${lessonId}`;
    return progress[key] || {
      lessonId,
      courseId,
      completedSteps: [],
      isFinished: false,
      currentStep: 0
    };
  };

  return (
    <CourseContext.Provider value={{ progress, updateProgress, getLessonProgress }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return context;
};
