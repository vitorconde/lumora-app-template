import { createBrowserRouter, RouterProvider, NavLink, Outlet } from 'react-router';
import { LumoraLogo } from './components/LumoraLogo';
import { InicioPage } from './pages/inicio/InicioPage';

/**
 * Menu do portal. Para publicar uma página nova:
 * 1. crie a página em client/src/pages/<nome>/<Nome>Page.tsx
 * 2. adicione um item em PAGINAS (abaixo) com o caminho, o título do menu e o componente
 */
const PAGINAS = [
  { path: '/', titulo: 'Visão geral', element: <InicioPage /> },
];

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
    isActive ? 'bg-white/15 text-white' : 'text-white/75 hover:bg-white/10 hover:text-white'
  }`;

function Layout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="lumora-header px-4 md:px-8 py-3 flex items-center gap-6">
        <div className="flex items-center gap-3">
          <LumoraLogo className="h-9 w-9" />
          <div className="leading-tight">
            <p className="text-white font-semibold">Lumora Distribuidora</p>
            <p className="text-white/70 text-xs">Portal de dados</p>
          </div>
        </div>
        <nav className="flex gap-1 flex-wrap">
          {PAGINAS.map((p) => (
            <NavLink key={p.path} to={p.path} end={p.path === '/'} className={navLinkClass}>
              {p.titulo}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="flex-1 p-4 md:p-8">
        <Outlet />
      </main>
      <footer className="px-8 py-4 text-xs text-muted-foreground border-t">
        Lumora Distribuidora · dados governados no Unity Catalog
      </footer>
    </div>
  );
}

const router = createBrowserRouter([
  { element: <Layout />, children: PAGINAS.map(({ path, element }) => ({ path, element })) },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
