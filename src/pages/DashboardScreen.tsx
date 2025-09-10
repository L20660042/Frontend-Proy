import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Menu,
  BarChart2,
  Calendar,
  Users,
  CheckCircle,
  Bell,
  Search,
  Settings,
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// DashboardScreen.jsx
// Versión adaptada para tablero institucional académico

export default function DashboardScreen() {
  const [metrics, setMetrics] = useState([]);
  const [recent, setRecent] = useState([]);
  const [chartData, setChartData] = useState([]);

  // Simulación de datos desde CSV/Excel (aquí podrías conectar tu ETL ligero)
  useEffect(() => {
    // Ejemplo de métricas obtenidas del procesamiento de datos
    setMetrics([
      { id: 1, title: "Asistencia", value: "92%", delta: "+3%" },
      { id: 2, title: "Uso de aulas", value: "68/100", delta: "-1%" },
      { id: 3, title: "Trámites", value: "1,248", delta: "+12%" },
    ]);

    // Ejemplo de eventos recientes
    setRecent([
      { id: 1, name: "Registro - Aula 203", status: "Completado" },
      { id: 2, name: "Solicitud - Biblioteca", status: "En progreso" },
      { id: 3, name: "Reporte - Laboratorio", status: "Pendiente" },
    ]);

    // Datos simulados para el gráfico
    setChartData([
      { name: "Lun", asistencia: 88, aulas: 60 },
      { name: "Mar", asistencia: 90, aulas: 62 },
      { name: "Mié", asistencia: 91, aulas: 65 },
      { name: "Jue", asistencia: 92, aulas: 68 },
      { name: "Vie", asistencia: 93, aulas: 70 },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-72 bg-white border-r border-slate-200 min-h-screen p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">UI</div>
              <div>
                <h1 className="text-lg font-semibold">Tablero</h1>
                <p className="text-sm text-slate-500">Indicadores académicos</p>
              </div>
            </div>
            <button className="p-2 rounded-md hover:bg-slate-100">
              <Menu size={18} />
            </button>
          </div>

          <nav className="space-y-1">
            <a className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-50">
              <BarChart2 size={18} /> <span>Resumen</span>
            </a>
            <a className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-50">
              <Calendar size={18} /> <span>Calendario</span>
            </a>
            <a className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-50">
              <Users size={18} /> <span>Usuarios</span>
            </a>
            <a className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-50">
              <Settings size={18} /> <span>Configuración</span>
            </a>
          </nav>

          <div className="mt-8">
            <h3 className="text-xs text-slate-500 uppercase">Estado rápido</h3>
            <div className="mt-3 grid grid-cols-1 gap-2">
              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg">
                <div>
                  <p className="text-sm text-slate-600">Conexiones</p>
                  <p className="text-sm font-semibold">24</p>
                </div>
                <CheckCircle size={20} className="text-emerald-500" />
              </div>
              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg">
                <div>
                  <p className="text-sm text-slate-600">Alertas</p>
                  <p className="text-sm font-semibold">2 nuevas</p>
                </div>
                <Bell size={20} />
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 p-8">
          {/* Header */}
          <header className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  className="w-96 pl-10 pr-4 py-2 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none"
                  placeholder="Buscar indicadores, aulas, usuarios..."
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Search size={16} />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="px-3 py-2 text-sm rounded-md bg-indigo-600 text-white shadow-sm">Nuevo reporte</button>
                <button className="px-3 py-2 text-sm rounded-md border">Exportar CSV</button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right mr-2">
                <div className="text-sm font-medium">Luis Jesús</div>
                <div className="text-xs text-slate-500">Administrador</div>
              </div>
              <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center">LJ</div>
            </div>
          </header>

          {/* Cards */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {metrics.map((m) => (
              <motion.article
                key={m.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: m.id * 0.05 }}
                className="bg-white p-4 rounded-2xl shadow-sm border"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">{m.title}</p>
                    <p className="text-2xl font-bold">{m.value}</p>
                  </div>
                  <div className="text-sm text-slate-500">{m.delta}</div>
                </div>
                <div className="mt-3 text-xs text-slate-400">Últimas 24 horas</div>
              </motion.article>
            ))}
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Chart area */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold">Actividad reciente</h2>
                  <p className="text-sm text-slate-500">Visión general de uso y eventos</p>
                </div>
                <div className="text-sm text-slate-500">Últimos 7 días</div>
              </div>

              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="asistencia" stroke="#4f46e5" strokeWidth={2} />
                    <Line type="monotone" dataKey="aulas" stroke="#16a34a" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-medium">Eventos recientes</h3>
                <ul className="mt-2 divide-y">
                  {recent.map((r) => (
                    <li key={r.id} className="py-3 flex items-center justify-between">
                      <div>
                        <div className="font-medium">{r.name}</div>
                        <div className="text-xs text-slate-500">Detalles adicionales del evento</div>
                      </div>
                      <div className="text-sm text-slate-600">{r.status}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Quick list */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-md font-semibold">Tareas rápidas</h3>
                <div className="text-sm text-slate-500">Hoy</div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1" />
                  <div>
                    <div className="font-medium">Revisar asistencia</div>
                    <div className="text-xs text-slate-500">Confirmar lista del día</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1" />
                  <div>
                    <div className="font-medium">Generar reporte mensual</div>
                    <div className="text-xs text-slate-500">Exportar CSV y enviar por email</div>
                  </div>
                </div>

                <div className="pt-2 border-t" />

                <button className="w-full py-2 rounded-lg bg-indigo-600 text-white">Nueva tarea</button>
              </div>
            </div>
          </section>

          <footer className="mt-8 text-sm text-slate-500">© {new Date().getFullYear()} Institución • Dashboard académico con React, Tailwind y Recharts</footer>
        </main>
      </div>
    </div>
  );
}
