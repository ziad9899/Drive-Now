import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, LogIn, LogOut, User } from 'lucide-react';
import { Logo } from './Logo';
import { useAuth } from '../store/auth';

const links = [
  { to: '/', label: 'الرئيسية' },
  { to: '/cars', label: 'السيارات' },
  { to: '/contact', label: 'تواصل معنا' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-canvas/85 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm transition ${
                  isActive
                    ? 'bg-midnight/5 text-midnight font-semibold'
                    : 'text-ink/70 hover:text-midnight'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <>
              <span className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-3 py-2 text-sm">
                <User className="h-4 w-4 text-gold" />
                <span className="font-medium text-ink">
                  {user.fullName.split(' ')[0]}
                </span>
              </span>
              <button
                onClick={() => {
                  signOut();
                  navigate('/');
                }}
                className="btn-ghost px-3 py-2"
                aria-label="تسجيل خروج"
              >
                <LogOut className="h-4 w-4" />
                <span>خروج</span>
              </button>
            </>
          ) : (
            <Link to="/login" className="btn-ghost px-3 py-2">
              <LogIn className="h-4 w-4" />
              <span>تسجيل الدخول</span>
            </Link>
          )}
          <Link to="/cars" className="btn-primary px-4 py-2">
            احجز الآن
          </Link>
        </div>

        <button
          aria-label="القائمة"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-white md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-canvas md:hidden">
          <div className="container-page flex flex-col gap-1 py-3">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2.5 text-sm ${
                    isActive
                      ? 'bg-midnight/5 text-midnight font-semibold'
                      : 'text-ink/80'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <div className="mt-2 flex items-center gap-2">
              {user ? (
                <button
                  onClick={() => {
                    signOut();
                    setOpen(false);
                    navigate('/');
                  }}
                  className="btn-ghost flex-1"
                >
                  <LogOut className="h-4 w-4" />
                  <span>خروج ({user.fullName.split(' ')[0]})</span>
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="btn-ghost flex-1"
                >
                  <LogIn className="h-4 w-4" />
                  <span>تسجيل الدخول</span>
                </Link>
              )}
              <Link
                to="/cars"
                onClick={() => setOpen(false)}
                className="btn-primary flex-1"
              >
                احجز الآن
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
