"use client";

import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}`}>
      <div className="wrap nav-in">
        <a href="#topo" className="brand">
          Fabricio Gonçalvez <span>· Comunidade</span>
        </a>
        <a href="#entrar" className="nav-link">
          Entrar
        </a>
      </div>
    </nav>
  );
}
