import { useEffect, useState } from "react";
import "./MobileMenu.css";

/* ---- temporary line icons (swap the `icon` of any item later) ----
   to use your own image instead, set:
   icon: <img src="/icons/home.png" alt="" />                        */
const Svg = ({ children }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const ITEMS = [
  {
    id: "home",
    label: "Home",
    icon: (
      <Svg>
        <path d="M3 11l9-8 9 8" />
        <path d="M5 10v10h5v-6h4v6h5V10" />
      </Svg>
    ),
  },
  {
    id: "couple",
    label: "Couple",
    icon: (
      <Svg>
        <circle cx="9" cy="15" r="5" />
        <circle cx="15" cy="15" r="5" />
        <path d="M12 3l2 2.5-2 2.5-2-2.5z" />
      </Svg>
    ),
  },
  {
    id: "event",
    label: "Event",
    icon: (
      <Svg>
        <rect x="3" y="5" width="18" height="16" rx="3" />
        <path d="M3 10h18M8 3v4M16 3v4" />
        <path d="M12 18s-3-1.8-3-3.8a1.7 1.7 0 013-1 1.7 1.7 0 013 1c0 2-3 3.8-3 3.8z" />
      </Svg>
    ),
  },
  {
    id: "gift",
    label: "Gift",
    icon: (
      <Svg>
        <rect x="3" y="9" width="18" height="12" rx="1.5" />
        <path d="M3 13h18M12 9v12" />
        <path d="M12 9C9 9 7.5 7.8 7.5 6.3S9 4 10.2 4C11.7 4 12 6.2 12 9z" />
        <path d="M12 9c3 0 4.5-1.2 4.5-2.7S15 4 13.8 4C12.3 4 12 6.2 12 9z" />
      </Svg>
    ),
  },
  {
    id: "rsvp",
    label: "RSVP",
    icon: (
      <Svg>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </Svg>
    ),
  },
];

function MobileMenu() {
  const [active, setActive] = useState("home");

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  // highlight the section that is in the middle of the screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="mobile-menu" aria-label="Menu">
      {ITEMS.map(({ id, label, icon }) => (
        <button
          key={id}
          type="button"
          className={active === id ? "is-active" : ""}
          aria-current={active === id ? "true" : undefined}
          onClick={() => scrollToSection(id)}
        >
          <span>{icon}</span>
          {label}
        </button>
      ))}
    </nav>
  );
}

export default MobileMenu;