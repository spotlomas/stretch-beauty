import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Menu, X, MessageCircle, ArrowRight, Gem, FlaskConical,
  HeartHandshake, ArrowUpRight, Search, SlidersHorizontal, ChevronDown
} from "lucide-react";

/* ─── TIPOS ─── */
type View = "home" | "catalog" | "about" | "contact";

interface Product {
  id: number;
  name: string;
  description: string;
  ingredients: string;
  image: string;
  bgColor: string;
  accent: string;
  category: string;
}

/* ─── DATOS ─── */
const NAV_DATA = {
  brand: "Inter Spa",
  links: ["home", "catalogo", "about us", "contact"] as const,
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

const PRODUCTS_DATA = [
  { id: 1, name: "Milk & Honey", description: "Crema hidratante no grasa de absorción profunda diseñada para suavizar y brindar un aspecto radiante a la piel de manos, pies y cuerpo.", ingredients: "Extracto de miel pura, proteínas de leche, lípidos hidratantes naturales.", image: "/images/milk_and_honey.png", bgColor: "#EDE6DA", accent: "#C9A96E", category: "Hidratante" },
  { id: 2, name: "Lavender & Chamomile", description: "Fórmula hidratante ligera y calmante. Ayuda a relajar la piel estresada mientras retiene la humedad natural.", ingredients: "Aceite esencial de lavanda, extracto de manzanilla, antioxidantes botánicos.", image: "/images/lavender_chamomile.png", bgColor: "#E8EBD8", accent: "#7D8B5E", category: "Calmante" },
  { id: 3, name: "Citrus & Wild Berry", description: "Tratamiento intensivo revitalizante con propiedades antioxidantes que suavizan la textura de la piel.", ingredients: "Extractos cítricos, extracto de moras silvestres, vitamina C.", image: "/images/citrus_wild_berry.png", bgColor: "#DDE8D8", accent: "#4A7A5E", category: "Revitalizante" },
  { id: 4, name: "Vanilla Bean & Sugar", description: "Exquisita infusión hidratante que reconforta la piel seca, mejorando la elasticidad y dejando un acabado sedoso.", ingredients: "Extracto de vainilla de Madagascar, caña de azúcar natural, complejos emolientes.", image: "/images/vanilla_bean_sugar.png", bgColor: "#EDE6DA", accent: "#9B7B4A", category: "Hidratante" },
  { id: 5, name: "Pomegranate & Fig", description: "Potente fórmula rejuvenecedora que aprovecha las propiedades antioxidantes de las frutas para nutrir y proteger.", ingredients: "Extracto de granada, extracto de higo, nutrientes esenciales regenerativos.", image: "/images/pomegranate_fig.png", bgColor: "#E8EBD8", accent: "#7A5E8B", category: "Rejuvenecedor" },
  { id: 6, name: "White Limetta & Aloe", description: "Una experiencia refrescante e hidrorreguladora ideal para mantener la piel suave, fresca y calmada todo el día.", ingredients: "Extracto de limeta blanca, gel purificado de aloe vera, factores de hidratación natural.", image: "/images/white_limetta_aloe.png", bgColor: "#DDE8D8", accent: "#3A7A6A", category: "Calmante" },
  { id: 7, name: "Coconut & White Ginger", description: "Fórmula ultra-hidratante que alivia las zonas más ásperas del cuerpo, aportando tersura y un escudo emoliente.", ingredients: "Aceite de coco fraccionado, extracto de jengibre blanco, aceites acondicionadores ligeros.", image: "/images/coconut_white_ginger.png", bgColor: "#EDE6DA", accent: "#8B7355", category: "Hidratante" },

  // --- NUEVOS PRODUCTOS INTEGRADOS ---
  // --- NUEVOS PRODUCTOS INTEGRADOS ---
  { id: 8, name: "Cuccio - Lavender & Chamomile", description: "Mantequilla hidratante no grasa, ideal para relajar y calmar la piel.", ingredients: "Extracto de lavanda, manzanilla.", image: "/images/cuccio_lavender.png", bgColor: "#E8EBD8", accent: "#7D8B5E", category: "Calmante" },
  { id: 9, name: "Cuccio - Milk & Honey", description: "Fórmula hidratante intensiva que retiene la humedad para revelar un brillo natural y saludable.", ingredients: "Miel, leche, extractos botánicos.", image: "/images/cuccio_milk_honey.png", bgColor: "#EDE6DA", accent: "#C9A96E", category: "Hidratante" },
  { id: 10, name: "Cuccio - Pomegranate & Fig", description: "Mantequilla rica en antioxidantes con efecto anti-edad y revitalizante para la piel del cuerpo.", ingredients: "Granada, higo.", image: "/images/cuccio_pomegranate.png", bgColor: "#E8EBD8", accent: "#7A5E8B", category: "Rejuvenecedor" },
  { id: 11, name: "Cuccio - White Truffle Souffle", description: "Body butter souffle de lujo con textura ultra ligera para una hidratación profunda y rica.", ingredients: "Trufa blanca, antioxidantes naturales.", image: "/images/cuccio_white_truffle.png", bgColor: "#F5F5F5", accent: "#8A8276", category: "Hidratante" },
  { id: 12, name: "Cuccio - Vanilla Bean & Sugar", description: "Mantequilla corporal con un aroma reconfortante que acondiciona y suaviza intensamente la piel.", ingredients: "Vainilla, caña de azúcar.", image: "/images/cuccio_vanilla_bean.png", bgColor: "#EDE6DA", accent: "#9B7B4A", category: "Hidratante" },
  { id: 13, name: "Cuccio - Sweet Almond", description: "Fórmula hidratante rica en nutrientes para restaurar y mantener la suavidad natural de la piel.", ingredients: "Almendra dulce, vitamina E.", image: "/images/cuccio_sweet_almond.png", bgColor: "#F3EFE6", accent: "#A67B5B", category: "Hidratante" },
  { id: 14, name: "Cuccio - Citrus & Wild Berry", description: "Mantequilla revitalizante con un refrescante toque cítrico y de frutos del bosque para despertar la piel.", ingredients: "Cítricos, bayas silvestres.", image: "/images/cuccio_citrus_berry.png", bgColor: "#DDE8D8", accent: "#4A7A5E", category: "Revitalizante" },
  { id: 15, name: "Cuccio - Whipped Hemp", description: "Mantequilla revitalizante batida para una absorción superior y nutrición profunda.", ingredients: "Aceite de semilla de cáñamo, Cupuaçu, Chía.", image: "/images/cuccio_whipped_hemp.png", bgColor: "#E5ECD9", accent: "#5C7844", category: "Revitalizante" },

  // --- NUEVOS PRODUCTOS (IMÁGENES GENERADAS) ---
  {
    id: 16,
    name: "Botanical Nectar Oil",
    description: "Aceite corporal ligero infundido con extractos puros para una piel luminosa y profundamente nutrida.",
    ingredients: "Aceite de jojoba orgánico, extractos florales, vitamina E.",
    image: "/images/Gemini_Generated_Image_5ps1e15ps1e15ps1.png",
    bgColor: "#F5F0E6",
    accent: "#D4AF37",
    category: "Hidratante"
  },
  {
    id: 17,
    name: "Sea Kelp & Salt Exfoliant",
    description: "Exfoliante renovador con sales finas que purifica y suaviza la textura de la piel, preparándola para la hidratación.",
    ingredients: "Sal marina fina, extracto de algas, aceites esenciales puros.",
    image: "/images/Gemini_Generated_Image_7kkepa7kkepa7kke.png",
    bgColor: "#E0EAE5",
    accent: "#5C8A79",
    category: "Revitalizante"
  },
  {
    id: 18,
    name: "Green Tea & Lotus Mask",
    description: "Mascarilla corporal antioxidante que purifica, calma profundamente y restaura el equilibrio natural.",
    ingredients: "Extracto de té verde, flor de loto, arcilla blanca purificada.",
    image: "/images/Gemini_Generated_Image_but25rbut25rbut2.png",
    bgColor: "#E5ECD9",
    accent: "#6B8E23",
    category: "Calmante"
  },
  {
    id: 19,
    name: "Rose Quartz Elixir",
    description: "Emulsión sedosa con sutiles notas florales diseñada para devolver la elasticidad y luminosidad juvenil.",
    ingredients: "Agua de rosas destilada, escualano vegetal, péptidos.",
    image: "/images/Gemini_Generated_Image_2pgobg2pgobg2pgo.png",
    bgColor: "#F9ECEC",
    accent: "#DDA0DD",
    category: "Rejuvenecedor"
  },
  {
    id: 20,
    name: "Charcoal Detox Polish",
    description: "Tratamiento desintoxicante de alto rendimiento que limpia los poros y renueva la epidermis de manera suave.",
    ingredients: "Carbón activado, extractos botánicos clarificantes.",
    image: "/images/Gemini_Generated_Image_rv02x6rv02x6rv02.png",
    bgColor: "#E8E8E8",
    accent: "#4A4A4A",
    category: "Revitalizante"
  },
  {
    id: 21,
    name: "Wild Orchid Butter",
    description: "Mantequilla rica y exótica que proporciona hidratación profunda con un aroma floral cautivador y elegante.",
    ingredients: "Extracto de orquídea silvestre, manteca de karité prensada en frío.",
    image: "/images/Gemini_Generated_Image_2s1ncw2s1ncw2s1n.png",
    bgColor: "#F0E6F5",
    accent: "#8A2BE2",
    category: "Hidratante"
  },
  {
    id: 22,
    name: "Citrus Blossom Gel",
    description: "Gel refrescante de rápida absorción ideal para energizar, tonificar y despertar los sentidos por la mañana.",
    ingredients: "Extracto de flor de naranjo, vitamina C estabilizada, aloe vera.",
    image: "/images/Gemini_Generated_Image_2utjwp2utjwp2utj.png",
    bgColor: "#FFF5E6",
    accent: "#FF8C00",
    category: "Revitalizante"
  },
  {
    id: 23,
    name: "Amber & Sandalwood Cream",
    description: "Crema intensiva reparadora con un perfil aromático cálido y terroso que sella la humedad durante 24 horas.",
    ingredients: "Aceite esencial de sándalo, extracto de ámbar, ceramidas complejas.",
    image: "/images/Gemini_Generated_Image_gjgmf3gjgmf3gjgm.png",
    bgColor: "#F5EDE4",
    accent: "#CD853F",
    category: "Rejuvenecedor"
  }


];

const CATEGORIES = ["Todos", "Hidratante", "Calmante", "Revitalizante", "Rejuvenecedor"];
const SORT_OPTIONS = [
  { value: "default", label: "Destacados" },
  { value: "az", label: "A → Z" },
  { value: "za", label: "Z → A" },
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

/* ─── FILTER BAR ─── */
function FilterBar({ search, setSearch, activeCategory, setActiveCategory, sort, setSort, showSort = true }: {
  search: string;
  setSearch: (v: string) => void;
  activeCategory: string;
  setActiveCategory: (v: string) => void;
  sort: string;
  setSort: (v: string) => void;
  showSort?: boolean;
}) {
  const [sortOpen, setSortOpen] = useState(false);

  return (
    <div className="filter-bar">
      <div className="filter-bar-top">
        {/* Search */}
        <div className="filter-search-wrap">
          <Search size={14} className="filter-search-icon" />
          <input
            type="text"
            placeholder="Buscar producto..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="filter-search-input"
          />
          {search && (
            <button onClick={() => setSearch("")} className="filter-clear-btn">
              <X size={12} />
            </button>
          )}
        </div>

        {/* Sort dropdown */}
        {showSort && (
          <div className="filter-sort-wrap">
            <button
              className="filter-sort-btn"
              onClick={() => setSortOpen(o => !o)}
            >
              <SlidersHorizontal size={13} />
              {SORT_OPTIONS.find(o => o.value === sort)?.label}
              <ChevronDown size={12} style={{ transform: sortOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
            </button>
            <AnimatePresence>
              {sortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="filter-sort-dropdown"
                >
                  {SORT_OPTIONS.map(o => (
                    <button
                      key={o.value}
                      className={`filter-sort-option${sort === o.value ? " active" : ""}`}
                      onClick={() => { setSort(o.value); setSortOpen(false); }}
                    >
                      {o.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Category pills */}
      <div className="filter-pills">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`filter-pill${activeCategory === cat ? " filter-pill-active" : ""}`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── PRODUCT CARD ─── */
function ProductCard({ product, index, onClick, inGrid = false }: {
  product: Product;
  index: number;
  onClick: () => void;
  inGrid?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className={`product-card${inGrid ? " product-card-catalog" : ""}`}
    >
      <div className="product-img-wrap" style={{ backgroundColor: product.bgColor }}>
        <img src={product.image} alt={product.name} className="product-img" />
        <div className="product-img-overlay">
          <span className="product-quick-view">Ver Detalles <ArrowUpRight size={11} /></span>
        </div>
      </div>
      <div className="product-info">
        <p className="product-category">{product.category}</p>
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
            <p className="modal-cat">{product.category}</p>
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

/* ─── CATALOG VIEW ─── */
function CatalogView({ onProductClick }: { onProductClick: (p: Product) => void }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [sort, setSort] = useState("default");

  const filtered = PRODUCTS_DATA
    .filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCat = activeCategory === "Todos" || p.category === activeCategory;
      return matchesSearch && matchesCat;
    })
    .sort((a, b) => {
      if (sort === "az") return a.name.localeCompare(b.name);
      if (sort === "za") return b.name.localeCompare(a.name);
      return 0;
    });

  return (
    <motion.div key="catalog" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
      {/* Page Header */}
      <div className="catalog-header-section">
        <motion.p
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="section-eyebrow" style={{ textAlign: "center" }}
        >
          Colección 2026
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="catalog-page-title"
        >
          Nuestro Catálogo
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="catalog-page-sub"
        >
          Formulaciones botánicas de alto rendimiento, curadas para profesionales y entusiastas del bienestar.
        </motion.p>
      </div>

      <MarqueeStrip />

      {/* Filter Bar */}
      <div className="catalog-filter-container">
        <FilterBar
          search={search}
          setSearch={setSearch}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          sort={sort}
          setSort={setSort}
          showSort={true}
        />
      </div>

      {/* Results count */}
      <div className="catalog-results-row">
        <p className="catalog-results-count">
          {filtered.length} {filtered.length === 1 ? "formulación" : "formulaciones"}
        </p>
        <div className="catalog-results-line" />
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="catalog-grid-wrap">
          <div className="products-grid catalog-grid">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} inGrid onClick={() => onProductClick(p)} />
            ))}
          </div>
        </div>
      ) : (
        <div className="catalog-empty">
          <p className="catalog-empty-title">Sin resultados</p>
          <p className="catalog-empty-sub">Intenta con otra búsqueda o categoría.</p>
        </div>
      )}

      {/* CTA Banner */}
      <section className="cta-banner" style={{ marginTop: "3rem" }}>
        <p className="cta-banner-eye">Distribución Profesional</p>
        <h2 className="cta-banner-title">¿Quieres llevar Inter Spa a tu negocio?</h2>
        <a href={SOCIAL_DATA.whatsapp} target="_blank" rel="noopener noreferrer" className="cta-banner-btn">
          Escríbenos <ArrowRight size={14} />
        </a>
      </section>
    </motion.div>
  );
}

/* ─── APP ─── */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState<View>("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Home page filter state
  const [homeSearch, setHomeSearch] = useState("");
  const [homeCategory, setHomeCategory] = useState("Todos");
  const [homeSort, setHomeSort] = useState("default");

  const navigate = (link: string) => {
    setMenuOpen(false);
    if (link === "home") setCurrentView("home");
    else if (link === "catalogo") setCurrentView("catalog");
    else if (link === "about us") setCurrentView("about");
    else if (link === "contact") setCurrentView("contact");
  };

  const homeFiltered = PRODUCTS_DATA
    .filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(homeSearch.toLowerCase());
      const matchesCat = homeCategory === "Todos" || p.category === homeCategory;
      return matchesSearch && matchesCat;
    })
    .sort((a, b) => {
      if (homeSort === "az") return a.name.localeCompare(b.name);
      if (homeSort === "za") return b.name.localeCompare(a.name);
      return 0;
    });

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
                  className={`overlay-link${currentView === (link === "home" ? "home" : link === "catalogo" ? "catalog" : link === "about us" ? "about" : "contact") ? " overlay-link-active" : ""}`}
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
                  <button
                    onClick={() => navigate("catalogo")}
                    className="collection-see-all"
                  >
                    Ver todo <ArrowUpRight size={12} />
                  </button>
                </div>

                {/* Filter Bar inline in home */}
                <div className="home-filter-wrap">
                  <FilterBar
                    search={homeSearch}
                    setSearch={setHomeSearch}
                    activeCategory={homeCategory}
                    setActiveCategory={setHomeCategory}
                    sort={homeSort}
                    setSort={setHomeSort}
                    showSort={true}
                  />
                </div>

                {homeFiltered.length > 0 ? (
                  <div className="products-grid">
                    {homeFiltered.map((p, i) => (
                      <ProductCard key={p.id} product={p} index={i} onClick={() => setSelectedProduct(p)} />
                    ))}
                  </div>
                ) : (
                  <div className="catalog-empty" style={{ padding: "3rem 0" }}>
                    <p className="catalog-empty-title">Sin resultados</p>
                    <p className="catalog-empty-sub">Intenta con otra búsqueda o categoría.</p>
                  </div>
                )}
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

          {/* CATALOG */}
          {currentView === "catalog" && (
            <CatalogView onProductClick={setSelectedProduct} />
          )}

          {/* ABOUT */}
          {currentView === "about" && (
            <motion.div key="about" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
              <div className="page-hero">
                <img src="/images/baneer.png" alt="Nuestra Historia" className="page-hero-img" />
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
                </div>
              </section>
            </motion.div>
          )}

          {/* CONTACT */}
          {currentView === "contact" && (
            <motion.div key="contact" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
              <div className="page-hero">
                <img src="/images/banner2.png" alt="Contacto" className="page-hero-img" />
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
        <p className="footer-copy">© 2026 Inter Spa Distribution · Todos los derechos reservados</p>
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