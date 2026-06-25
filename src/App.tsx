import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Menu, X, MessageCircle, ArrowRight, Gem, FlaskConical, HeartHandshake, ArrowUpRight } from "lucide-react";

/* ─── DATOS ─── */
const NAV_DATA = {
  brand: "Inter Spa",
  links: ["home", "about us", "contact"] as const,
};

const SOCIAL_DATA = {
  instagram: "https://www.instagram.com/inter.spa.dis/",
  tiktok: "https://www.tiktok.com/@inter_spa_distribution?_r=1&_t=ZS-93PDDMmAKfQ",
  whatsapp: "https://chat.whatsapp.com/EIG3CVoQuwREQ8mL37KKeQ?mode=gi_t&utm_source=ig&utm_medium=social&utm_content=link_in_bio",
};

const HERO_DATA = {
  image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&q=80&w=1600",
  eyebrow: "Distribución Especializada · Nayarit, México",
  title: "La ciencia del cuidado. La pureza de la naturaleza.",
  subtitle: "Formulaciones botánicas de alto rendimiento para profesionales exigentes.",
  cta: "Ver Colección",
};

const VALUES_DATA = [
  { icon: Gem, title: "Elegancia", text: "Refinamiento en cada fórmula y presentación. El verdadero lujo reside en los detalles más sutiles." },
  { icon: FlaskConical, title: "Innovación", text: "Fusión de los últimos descubrimientos científicos con la sabiduría atemporal del cuidado personal." },
  { icon: HeartHandshake, title: "Compromiso", text: "Productos que no solo embellecen, sino que nutren y respetan la integridad de tu bienestar." },
];

const MARQUEE_WORDS = ["Elegancia", "·", "Bienestar", "·", "Pureza", "·", "Innovación", "·", "Belleza", "·", "Natura", "·", "Elegancia", "·", "Bienestar", "·", "Pureza", "·", "Innovación", "·", "Belleza", "·", "Natura", "·"];

interface Product {
  id: number;
  name: string;
  description: string;
  ingredients: string;
  image: string;
  bgColor: string;
  accent: string;
}

const PRODUCTS_DATA: Product[] = [
  { id: 1, name: "Milk & Honey", description: "Crema hidratante no grasa de absorción profunda diseñada para suavizar y brindar un aspecto radiante a la piel de manos, pies y cuerpo.", ingredients: "Extracto de miel pura, proteínas de leche, lípidos hidratantes naturales.", image: "/images/milk_and_honey.png", bgColor: "#EDE6DA", accent: "#C9A96E" },
  { id: 2, name: "Lavender & Chamomile", description: "Fórmula hidratante ligera y calmante. Ayuda a relajar la piel estresada mientras retiene la humedad natural.", ingredients: "Aceite esencial de lavanda, extracto de manzanilla, antioxidantes botánicos.", image: "/images/lavender_chamomile.png", bgColor: "#E8EBD8", accent: "#7D8B5E" },
  { id: 3, name: "Citrus & Wild Berry", description: "Tratamiento intensivo revitalizante con propiedades antioxidantes que suavizan la textura de la piel.", ingredients: "Extractos cítricos, extracto de moras silvestres, vitamina C.", image: "/images/citrus_wild_berry.png", bgColor: "#DDE8D8", accent: "#4A7A5E" },
  { id: 4, name: "Vanilla Bean & Sugar", description: "Exquisita infusión hidratante que reconforta la piel seca, mejorando la elasticidad y dejando un acabado sedoso.", ingredients: "Extracto de vainilla de Madagascar, caña de azúcar natural, complejos emolientes.", image: "/images/vanilla_bean_sugar.png", bgColor: "#EDE6DA", accent: "#9B7B4A" },
  { id: 5, name: "Pomegranate & Fig", description: "Potente fórmula rejuvenecedora que aprovecha las propiedades antioxidantes de las frutas para nutrir y proteger.", ingredients: "Extracto de granada, extracto de higo, nutrientes esenciales regenerativos.", image: "/images/pomegranate_fig.png", bgColor: "#E8EBD8", accent: "#7A5E8B" },
  { id: 6, name: "White Limetta & Aloe", description: "Una experiencia refrescante e hidrorreguladora ideal para mantener la piel suave, fresca y calmada todo el día.", ingredients: "Extracto de limeta blanca, gel purificado de aloe vera, factores de hidratación natural.", image: "/images/white_limetta_aloe.png", bgColor: "#DDE8D8", accent: "#3A7A6A" },
  { id: 7, name: "Coconut & White Ginger", description: "Fórmula ultra-hidratante que alivia las zonas más ásperas del cuerpo, aportando tersura y un escudo emoliente.", ingredients: "Aceite de coco fraccionado, extracto de jengibre blanco, aceites acondicionadores ligeros.", image: "/images/coconut_white_ginger.png", bgColor: "#EDE6DA", accent: "#8B7355" },
];

/* ─── ICONOS ─── */
function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

/* ─── MARQUEE ─── */
function MarqueeStrip() {
  return (
    <div className="marquee-strip">
      <div className="marquee-track">
        {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((w, i) => (
          <span key={i} className={w === "·" ? "marquee-dot" : "marquee-word"}>{w}</span>
        ))}
      </div>
    </div>
  );
}

/* ─── PRODUCT CARD ─── */
function ProductCard({ product, index, onClick }: { product: Product; index: number; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className="product-card"
    >
      <div className="product-img-wrap" style={{ backgroundColor: product.bgColor }}>
        <img src={product.image} alt={product.name} className="product-img" />
        <div className="product-img-overlay">
          <span className="product-quick-view">Ver Detalles <ArrowUpRight size={11} /></span>
        </div>
      </div>
      <div className="product-info">
        <p className="product-category">Mantequilla Hidratante</p>
        <p className="product-name">{product.name}</p>
        <div className="product-accent-line" style={{ backgroundColor: product.accent }} />
      </div>
    </motion.div>
  );
}

/* ─── MODAL ─── */
function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="modal-backdrop"
        onClick={onClose}
      >
        <motion.div
          key="modal"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="modal-card"
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={onClose} className="modal-close" aria-label="Cerrar">
            <X size={17} />
          </button>
          <div className="modal-img-wrap" style={{ backgroundColor: product.bgColor }}>
            <img src={product.image} alt={product.name} className="modal-img" />
          </div>
          <div className="modal-body">
            <p className="modal-cat">Mantequilla Hidratante</p>
            <h2 className="modal-title">{product.name}</h2>
            <div className="modal-divider" style={{ backgroundColor: product.accent }} />
            <div className="modal-section">
              <p className="modal-label">Descripción</p>
              <p className="modal-text">{product.description}</p>
            </div>
            <div className="modal-section">
              <p className="modal-label">Ingredientes Destacados</p>
              <p className="modal-text" style={{ fontStyle: "italic" }}>{product.ingredients}</p>
            </div>
            <a href={SOCIAL_DATA.whatsapp} target="_blank" rel="noopener noreferrer" className="modal-cta">
              <MessageCircle size={15} /> Consultar por WhatsApp
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── HERO ─── */
function HeroSection({ onExplore }: { onExplore: () => void }) {
  return (
    <section className="hero-section">
      <div className="hero-img-wrap">
        <img src={HERO_DATA.image} alt="Inter Spa" className="hero-img" />
        <div className="hero-overlay" />
      </div>
      <div className="hero-content">
        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="hero-eyebrow"
        >
          {HERO_DATA.eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="hero-title"
        >
          {HERO_DATA.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="hero-subtitle"
        >
          {HERO_DATA.subtitle}
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          onClick={onExplore}
          className="hero-cta"
        >
          {HERO_DATA.cta} <ArrowRight size={14} />
        </motion.button>
      </div>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="hero-scroll-hint"
      >
        <span />
      </motion.div>
    </section>
  );
}

/* ─── APP ─── */
type View = "home" | "about" | "contact";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState<View>("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const navigate = (link: string) => {
    setMenuOpen(false);
    if (link === "home") setCurrentView("home");
    else if (link === "about us") setCurrentView("about");
    else if (link === "contact") setCurrentView("contact");
  };

  return (
    <div className="app-root">

      {/* NAV */}
      <nav className="is-nav">
        <button onClick={() => setMenuOpen(!menuOpen)} className="is-nav-hamburger" aria-label="Menú">
          <AnimatePresence mode="wait">
            {menuOpen
              ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}><X size={20} /></motion.span>
              : <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}><Menu size={20} /></motion.span>
            }
          </AnimatePresence>
        </button>
        <button onClick={() => navigate("home")} className="is-nav-brand">{NAV_DATA.brand}</button>
        <a href={SOCIAL_DATA.whatsapp} target="_blank" rel="noopener noreferrer" className="is-nav-wa">
          <MessageCircle size={16} />
        </a>
      </nav>

      {/* OVERLAY MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="overlay-menu"
          >
            <div className="overlay-links">
              {NAV_DATA.links.map((link, i) => (
                <motion.button
                  key={link}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.07 + i * 0.09 }}
                  className={`overlay-link${currentView === (link === "home" ? "home" : link === "about us" ? "about" : "contact") ? " overlay-link-active" : ""}`}
                  onClick={() => navigate(link)}
                >
                  <span className="overlay-link-num">0{i + 1}</span>
                  {link}
                </motion.button>
              ))}
            </div>
            <div className="overlay-socials">
              <a href={SOCIAL_DATA.instagram} target="_blank" rel="noopener noreferrer"><InstagramIcon size={16} /></a>
              <a href={SOCIAL_DATA.tiktok} target="_blank" rel="noopener noreferrer"><TikTokIcon size={16} /></a>
              <a href={SOCIAL_DATA.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} /></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN */}
      <main className="is-main">
        <AnimatePresence mode="wait">

          {/* HOME */}
          {currentView === "home" && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>

              <HeroSection onExplore={() => document.getElementById("coleccion")?.scrollIntoView({ behavior: "smooth" })} />

              <MarqueeStrip />

              {/* VALUES */}
              <section className="values-section">
                {VALUES_DATA.map(({ icon: Icon, title, text }, i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="value-card"
                  >
                    <div className="value-icon-wrap">
                      <Icon size={18} strokeWidth={1.5} />
                    </div>
                    <h3 className="value-title">{title}</h3>
                    <p className="value-text">{text}</p>
                  </motion.div>
                ))}
              </section>

              {/* COLECCIÓN */}
              <section id="coleccion" className="collection-section">
                <div className="collection-header">
                  <div>
                    <p className="section-eyebrow">Colección 2026</p>
                    <h2 className="section-title">Mantequillas Botánicas</h2>
                  </div>
                  <p className="section-count">{PRODUCTS_DATA.length} formulaciones</p>
                </div>
                <div className="products-grid">
                  {PRODUCTS_DATA.map((p, i) => (
                    <ProductCard key={p.id} product={p} index={i} onClick={() => setSelectedProduct(p)} />
                  ))}
                </div>
              </section>

              {/* CTA BANNER */}
              <section className="cta-banner">
                <p className="cta-banner-eye">Distribución Profesional</p>
                <h2 className="cta-banner-title">¿Quieres llevar Inter Spa a tu negocio?</h2>
                <a href={SOCIAL_DATA.whatsapp} target="_blank" rel="noopener noreferrer" className="cta-banner-btn">
                  Escríbenos <ArrowRight size={14} />
                </a>
              </section>

            </motion.div>
          )}

          {/* ABOUT */}
          {currentView === "about" && (
            <motion.div key="about" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>

              <div className="page-hero">
                <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1400" alt="Nuestra Historia" className="page-hero-img" />
                <div className="page-hero-overlay" />
                <div className="page-hero-content">
                  <p className="hero-eyebrow" style={{ color: "rgba(255,255,255,0.6)" }}>Inter Spa Distribution</p>
                  <h1 className="page-hero-title">Nuestra Historia</h1>
                  <p className="page-hero-sub">Una empresa nacida del amor por la belleza auténtica y la pasión por llevar ingredientes excepcionales a quienes más los saben apreciar.</p>
                </div>
              </div>

              <MarqueeStrip />

              <section className="values-section" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
                {VALUES_DATA.map(({ icon: Icon, title, text }, i) => (
                  <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="value-card">
                    <div className="value-icon-wrap"><Icon size={18} strokeWidth={1.5} /></div>
                    <h3 className="value-title">{title}</h3>
                    <p className="value-text">{text}</p>
                  </motion.div>
                ))}
              </section>

              <section className="about-philosophy">
                <div>
                  <p className="section-eyebrow">Filosofía</p>
                  <h2 className="section-title" style={{ marginBottom: "1.5rem" }}>Ciencia & Naturaleza</h2>
                  <div className="about-paragraphs">
                    <p>En el corazón de <strong>Inter Spa</strong> reside una profunda reverencia por la sinergia entre el rigor clínico y la pureza botánica. Entendemos que los resultados más transformadores nacen de esta intersección.</p>
                    <p>Curamos cada ingrediente con cuidado, asegurando no solo la efectividad en tu piel, sino también un compromiso ético y sustentable con el medio ambiente y las comunidades productoras.</p>
                    <p>Cada fórmula es una declaración: que la belleza no tiene por qué elegir entre efectividad y conciencia.</p>
                  </div>
                </div>
                <div className="about-images">
                  <img src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=700" alt="Ciencia" className="about-img" />
                  <img src="https://images.unsplash.com/photo-1556228852-80b6e9c1e7c0?auto=format&fit=crop&q=80&w=700" alt="Naturaleza" className="about-img about-img-offset" />
                </div>
              </section>

            </motion.div>
          )}

          {/* CONTACT */}
          {currentView === "contact" && (
            <motion.div key="contact" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>

              <div className="page-hero">
                <img src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=1400" alt="Contacto" className="page-hero-img" />
                <div className="page-hero-overlay" />
                <div className="page-hero-content">
                  <p className="hero-eyebrow" style={{ color: "rgba(255,255,255,0.6)" }}>Estamos aquí para ti</p>
                  <h1 className="page-hero-title">Contáctanos</h1>
                  <p className="page-hero-sub">Encuentra la armonía perfecta entre innovación y bienestar.</p>
                </div>
              </div>

              <section className="contact-section">
                <div>
                  <p className="section-eyebrow">Contacto Directo</p>
                  <h2 className="section-title" style={{ marginBottom: "0.75rem" }}>Hablemos</h2>
                  <p className="contact-sub">Conecta con nosotros a través de nuestras plataformas para una atención personalizada.</p>
                  <div className="contact-links">
                    {[
                      { href: SOCIAL_DATA.whatsapp, icon: <MessageCircle size={16} />, label: "WhatsApp" },
                      { href: SOCIAL_DATA.instagram, icon: <InstagramIcon size={16} />, label: "Instagram" },
                      { href: SOCIAL_DATA.tiktok, icon: <TikTokIcon size={16} />, label: "TikTok" },
                    ].map(({ href, icon, label }) => (
                      <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="contact-link">
                        <span className="contact-link-left">{icon} {label}</span>
                        <ArrowUpRight size={14} />
                      </a>
                    ))}
                  </div>
                </div>
                <div className="contact-card">
                  <p className="section-eyebrow" style={{ color: "rgba(255,255,255,0.45)", marginBottom: "0.4rem" }}>Inquietudes Generales</p>
                  <h3 className="contact-card-title">¿Tienes un pedido o duda?</h3>
                  <p className="contact-card-text">Uno de nuestros asesores te contactará a la brevedad con toda la información que necesitas.</p>
                  <blockquote className="contact-quote">
                    "Comprometidos con la elegancia y la innovación en cada detalle."
                  </blockquote>
                  <a href={SOCIAL_DATA.whatsapp} target="_blank" rel="noopener noreferrer" className="contact-cta">
                    <MessageCircle size={15} /> Enviar Mensaje
                  </a>
                </div>
              </section>

            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="is-footer">
        <span className="footer-brand">Inter Spa</span>
        <div className="footer-nav">
          {NAV_DATA.links.map(link => (
            <button key={link} onClick={() => navigate(link)} className="footer-link">{link}</button>
          ))}
        </div>
        <div className="footer-socials">
          {[
            { href: SOCIAL_DATA.instagram, icon: <InstagramIcon size={14} /> },
            { href: SOCIAL_DATA.tiktok, icon: <TikTokIcon size={14} /> },
            { href: SOCIAL_DATA.whatsapp, icon: <MessageCircle size={14} /> },
          ].map(({ href, icon }, i) => (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="footer-social">{icon}</a>
          ))}
        </div>
        <p className="footer-copy">© 2025 Inter Spa Distribution · Todos los derechos reservados</p>
      </footer>

      {/* WHATSAPP FAB */}
      <a href={SOCIAL_DATA.whatsapp} target="_blank" rel="noopener noreferrer" className="wa-fab" aria-label="WhatsApp">
        <MessageCircle size={22} color="white" strokeWidth={2} />
      </a>

      {/* MODAL */}
      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </div>
  );
}