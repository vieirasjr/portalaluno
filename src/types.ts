export interface Student {
  id: string;
  name: string;
  course: string;
  semester: number;
  registrationNumber: string;
  avatarUrl: string;
}

export interface Grade {
  subject: string;
  score: number;
  status: 'Aprovado' | 'Reprovado' | 'Em curso';
}

export interface ScheduleItem {
  day: string;
  time: string;
  subject: string;
  room: string;
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  category: 'Acadêmico' | 'Financeiro' | 'Eventos';
  content: string;
}
