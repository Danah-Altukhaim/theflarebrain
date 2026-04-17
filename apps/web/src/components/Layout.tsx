import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { api } from "../lib/api.js";
import { useAuth } from "../state/auth.js";
import { Walkthrough } from "./Walkthrough.js";
import { Icon } from "./Icon.js";

type Module = { id: string; slug: string; label: string; icon?: string };

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < breakpoint,
  );
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [breakpoint]);
  return isMobile;
}

function routeTitle(pathname: string, modules: Module[]): string {
  if (pathname === "/") return "Knowledge Base";
  if (pathname.startsWith("/chat")) return "Brain Chat";
  if (pathname.startsWith("/activity")) return "Activity";
  if (pathname.startsWith("/admin")) return "Admin";
  const m = pathname.match(/^\/modules\/([^/]+)/);
  if (m && m[1]) {
    const mod = modules.find((x) => x.slug === m[1]);
    return mod?.label ?? m[1];
  }
  return "The Brain";
}

function initials(name?: string | null): string {
  if (!name) return "·";
  return name.charAt(0).toUpperCase();
}

export function Layout() {
  const [modules, setModules] = useState<Module[]>([]);
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem("sidebarCollapsed") === "1";
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useIsMobile();
  const tenant = useAuth((s) => s.tenant);
  const user = useAuth((s) => s.user);
  const signOut = useAuth((s) => s.signOut);
  const location = useLocation();

  // Close mobile drawer on navigation
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("sidebarCollapsed", collapsed ? "1" : "0");
  }, [collapsed]);

  useEffect(() => {
    api<Module[]>("/api/v1/modules")
      .then((mods) =>
        setModules(
          mods.filter(
            (m) =>
              m.slug !== "announcements" &&
              m.slug !== "14-announcements" &&
              m.slug !== "booking-flows" &&
              m.slug !== "response_templates" &&
              m.slug !== "response-templates" &&
              !/active\s*alerts|announcements|booking\s*flows|response\s*templates/i.test(m.label),
          ),
        ),
      )
      .catch(() => setModules([]));
  }, []);

  const title = useMemo(() => routeTitle(location.pathname, modules), [location.pathname, modules]);

  const workspaceLinks: Array<{ to: string; label: string; icon: string; end?: boolean }> = [
    { to: "/", label: "Knowledge", icon: "folder", end: true },
    { to: "/activity", label: "Activity", icon: "activity" },
  ];
  if (user?.role === "PAIR_ADMIN") {
    workspaceLinks.push({ to: "/admin", label: "Admin", icon: "shield" });
  }

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  /* ── Sidebar content (shared between desktop and mobile) ── */
  const sidebarContent = (showLabels: boolean) => (
    <>
      {/* Brand */}
      <div className={`flex items-center ${showLabels ? "px-5 gap-3" : "px-3 justify-center"} py-4`}>
        {!showLabels && !isMobile ? (
          <button
            type="button"
            onClick={() => setCollapsed(false)}
            aria-label="Expand sidebar"
            title="Expand sidebar"
            className="p-1.5 rounded-apple text-apple-secondary hover:text-apple-text hover:bg-black/[0.05] transition-colors"
          >
            <Icon name="panel-left" size={16} />
          </button>
        ) : (
          <>
            <div className="leading-tight min-w-0 flex-1">
              <div className="text-[15px] font-semibold tracking-tight text-apple-text truncate">The Brain</div>
              <div className="text-[11px] text-apple-secondary truncate max-w-[160px]">{tenant?.name ?? "-"}</div>
            </div>
            {!isMobile && (
              <button
                type="button"
                onClick={() => setCollapsed(true)}
                aria-label="Collapse sidebar"
                title="Collapse sidebar"
                className="shrink-0 inline-flex items-center justify-center rounded-apple p-1.5 text-apple-secondary hover:bg-black/[0.05] transition-colors"
              >
                <Icon name="panel-left" size={16} />
              </button>
            )}
          </>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-2">
        {showLabels && <div className="nav-section">Workspace</div>}
        {!showLabels && <div className="h-2" />}
        <div className="space-y-0.5">
          {workspaceLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              title={!showLabels ? l.label : undefined}
              onClick={isMobile ? closeMobile : undefined}
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""} ${!showLabels ? "!px-0 justify-center" : ""}`
              }
            >
              <Icon name={l.icon} size={16} />
              {showLabels && <span className="truncate">{l.label}</span>}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* User chip */}
      <div className="border-t border-apple-separator-light p-3">
        <div className={`flex items-center ${!showLabels ? "flex-col gap-2" : "gap-2.5 px-2 py-1.5"}`}>
          <div className="w-8 h-8 rounded-full bg-pair-light text-pair flex items-center justify-center text-[12px] font-semibold shrink-0">
            {initials(user?.name)}
          </div>
          {showLabels && (
            <div className="flex-1 min-w-0 leading-tight">
              <div className="text-[13px] font-medium text-apple-text truncate">{user?.name ?? "-"}</div>
              <div className="text-[11px] text-apple-secondary truncate">{user?.role?.replace(/_/g, " ").toLowerCase()}</div>
            </div>
          )}
          <button onClick={signOut} aria-label="Sign out" className="btn-ghost !px-2 !py-1.5" title="Sign out">
            <Icon name="log-out" size={15} />
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div
      className={`min-h-screen w-full max-w-full bg-[#FBFBFD] ${isMobile ? "" : "grid transition-[grid-template-columns] duration-200 ease-out"}`}
      style={isMobile ? undefined : { gridTemplateColumns: `${collapsed ? 72 : 260}px minmax(0, 1fr)` }}
    >
      {/* ── Desktop sidebar ── */}
      {!isMobile && (
        <aside className="sticky top-0 h-screen flex flex-col bg-white border-r border-apple-separator">
          {sidebarContent(!collapsed)}
        </aside>
      )}

      {/* ── Mobile drawer overlay ── */}
      {isMobile && mobileOpen && (
        <div className="fixed inset-0 z-40 flex" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm animate-fade-in"
            onClick={closeMobile}
            aria-hidden="true"
          />
          {/* Drawer panel */}
          <aside className="relative z-50 w-[min(280px,85vw)] h-full flex flex-col bg-white shadow-apple-xl animate-slide-from-left">
            {sidebarContent(true)}
          </aside>
        </div>
      )}

      {/* ── Main content ── */}
      <main className="flex flex-col min-w-0 min-h-screen md:min-h-0">
        <header className="glass-bar sticky top-0 z-10 h-14 flex items-center px-3 sm:px-6 gap-2 sm:gap-3">
          {/* Mobile hamburger */}
          {isMobile && (
            <button
              onClick={() => setMobileOpen(true)}
              className="inline-flex items-center justify-center rounded-apple p-2 text-apple-text hover:bg-black/[0.05] transition-colors"
              aria-label="Open menu"
            >
              <Icon name="menu" size={20} />
            </button>
          )}

          {location.pathname.startsWith("/modules/") ? (
            <Link to="/" className="inline-flex items-center gap-1.5 text-apple-secondary hover:text-apple-text transition-colors">
              <Icon name="arrow-left" size={16} />
              <span className="text-[13px] font-medium">Knowledge</span>
            </Link>
          ) : (
            <h1 className="text-[17px] font-semibold tracking-tight text-apple-text truncate">{title}</h1>
          )}
          <div className="flex-1" />

          {/* Search + account (hidden on module pages) */}
          {!location.pathname.startsWith("/modules/") && (
            <div className="flex items-center gap-2 text-apple-secondary">
              <div className="relative hidden sm:block">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-apple-tertiary">
                  <Icon name="search" size={14} />
                </span>
                <input
                  type="text"
                  placeholder="Search knowledge..."
                  className="input-apple !py-1.5 !pl-9 !pr-3 w-48 md:w-64"
                />
              </div>
              {/* Mobile search icon */}
              <button className="sm:hidden inline-flex items-center justify-center rounded-apple p-2 text-apple-secondary hover:bg-black/[0.05] transition-colors" title="Search">
                <Icon name="search" size={18} />
              </button>
            </div>
          )}
        </header>

        <div className="flex-1 overflow-y-auto overflow-x-hidden min-w-0">
          <div className="p-4 sm:p-6 lg:p-8 animate-fade-in min-w-0">
            <Outlet context={{ title }} />
          </div>
        </div>
      </main>
      <Walkthrough />
    </div>
  );
}
