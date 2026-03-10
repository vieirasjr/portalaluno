/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { AuthLayout, DashboardLayout } from './layouts/AppLayouts';

// Pages
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { AcademicoPage } from './pages/AcademicoPage';
import { FinanceiroPage } from './pages/FinanceiroPage';
import { DocumentosPage } from './pages/DocumentosPage';
import { IntegracoesPage } from './pages/IntegracoesPage';
import { PerfilPage } from './pages/PerfilPage';
import { CourseLessonsPage } from './pages/CourseLessonsPage';
import { LessonPlayerPage } from './pages/LessonPlayerPage';
import { ApiFallback } from './components/ApiFallback';

// Contexts
import { CourseProvider } from './contexts/CourseContext';

export default function App() {
  return (
    <CourseProvider>
      <Router>
        <Routes>
          <Route path="/auth" element={<AuthLayout><LoginPage /></AuthLayout>} />
          
          <Route path="/dashboard" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
          <Route path="/dashboard/academico" element={<DashboardLayout><AcademicoPage /></DashboardLayout>} />
          <Route path="/dashboard/academico/curso/:id" element={<DashboardLayout><CourseLessonsPage /></DashboardLayout>} />
          <Route path="/dashboard/academico/curso/:courseId/aula/:lessonId" element={<DashboardLayout><LessonPlayerPage /></DashboardLayout>} />
          <Route path="/dashboard/financeiro" element={<DashboardLayout><FinanceiroPage /></DashboardLayout>} />
          <Route path="/dashboard/documentos" element={<DashboardLayout><DocumentosPage /></DashboardLayout>} />
          <Route path="/dashboard/integracoes" element={<DashboardLayout><IntegracoesPage /></DashboardLayout>} />
          <Route path="/dashboard/perfil" element={<DashboardLayout><PerfilPage /></DashboardLayout>} />

          <Route path="/" element={<Navigate to="/auth" replace />} />
          {/* Fallback para /api/* quando o Vite dev retorna o SPA (API só existe com vercel dev) */}
          <Route path="/api/*" element={<ApiFallback />} />
        </Routes>
      </Router>
    </CourseProvider>
  );
}
