import { Shield, Users, Database, LayoutDashboard, MessageSquare, Activity, Send, Settings, BookOpen } from 'lucide-react';

export const ADMIN_TABS = [
  { id: 'dashboard', label: 'Visão Geral', icon: LayoutDashboard },
  { id: 'users', label: 'Usuários & Permissões', icon: Users },
  { id: 'plans', label: 'Solicitações de Planos', icon: BookOpen },
  { id: 'feedback', label: 'Feedbacks & Suporte', icon: MessageSquare },
  { id: 'database', label: 'Banco de Dados', icon: Database },
  { id: 'ai', label: 'Monitoramento de IA', icon: Activity },
  { id: 'notifications', label: 'Notificações', icon: Send },
  { id: 'logs', label: 'Logs de Sistema', icon: Settings },
  { id: 'settings', label: 'Configurações Globais', icon: Shield },
];
