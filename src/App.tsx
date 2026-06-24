import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
} from "framer-motion";
import {
  Menu,
  X,
  MessageCircle,
} from "lucide-react";

/* ══════════════════════════════════════════════════════════════════
    ✏️ DATOS CONFIGURABLES (MAPPED TO PUBLIC ASSETS)
   ══════════════════════════════════════════════════════════════════ */

const NAV_DATA = {
  brand: "INTER",
  brandSubtitle: "SPA",
  links: ["home", "about us", "contact"],
};

const SOCIAL_DATA = {
  instagram: "https://www.instagram.com/inter.spa.dis/",
  tiktok: "https://www.tiktok.com/@inter_spa_distribution?_r=1&_t=ZS-93PDDMmAKfQ",
  whatsapp: "https://chat.whatsapp.com/EIG3CVoQuwREQ8mL37KKeQ?mode=gi_t&utm_source=ig&utm_medium=social&utm_content=link_in_bio",
};

const HERO_DATA = {
  image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&q=80&w=1200",
  titleLine1: "ILLUMINATE",
  titleLine2: "YOUR NATURAL",
  titleLine3: "RADIANCE.",
  subtitle: "Discover our curated collection for healthy, glowing skin.",
};

const PRODUCTS_DATA = [
  {
    id: 1,
    name: "Mantequilla Hidratante - Milk & Honey",
    description: "Crema hidratante no grasa de absorción profunda diseñada para suavizar y brindar un aspecto radiante a la piel de manos, pies y cuerpo.",
    ingredients: "Extracto de miel pura, proteínas de leche, lípidos hidratantes naturales.",
    image: "/images/milk_and_honey.png",
    bgColor: "bg-[#E8DCCB]",
  },
  {
    id: 2,
    name: "Mantequilla Hidratante - Lavender & Chamomile",
    description: "Fórmula hidratante ligera y calmante. Ayuda a relajar la piel estresada mientras retiene la humedad natural sin dejar residuos grasos.",
    ingredients: "Aceite esencial de lavanda, extracto de manzanilla, antioxidantes botánicos.",
    image: "/images/lavender_chamomile.png",
    bgColor: "bg-[#DFE1CD]",
  },
  {
    id: 3,
    name: "Mantequilla Hidratante - Citrus & Wild Berry",
    description: "Tratamiento intensivo revitalizante con propiedades antioxidantes que suavizan la textura de la piel y despiertan su brillo natural.",
    ingredients: "Extractos cítricos, extracto de moras silvestres, vitamina C, agentes acondicionadores.",
    image: "/images/citrus_wild_berry.png",
    bgColor: "bg-[#D5E0D2]",
  },
  {
    id: 4,
    name: "Mantequilla Hidratante - Vanilla Bean & Sugar",
    description: "Exquisita infusión hidratante no grasa que reconforta la piel seca, mejorando la elasticidad y dejando un acabado terso y sedoso.",
    ingredients: "Extracto de vainilla de Madagascar, caña de azúcar natural, complejos emolientes.",
    image: "/images/vanilla_bean_sugar.png",
    bgColor: "bg-[#E8DCCB]",
  },
  {
    id: 5,
    name: "Mantequilla Hidratante - Pomegranate & Fig",
    description: "Potente fórmula rejuvenecedora que aprovecha las propiedades antioxidantes de las frutas para suavizar, nutrir y proteger el tejido cutáneo.",
    ingredients: "Extracto de granada, extracto de higo, nutrientes esenciales regenerativos.",
    image: "/images/pomegranate_fig.png",
    bgColor: "bg-[#DFE1CD]",
  },
  {
    id: 6,
    name: "Mantequilla Hidratante - White Limetta & Aloe Vera",
    description: "Una experiencia refrescante e hidrorreguladora ideal para mantener la piel suave, fresca, calmada y completamente protegida durante todo el día.",
    ingredients: "Extracto de limeta blanca, gel purificado de aloe vera, factores de hidratación natural.",
    image: "/images/white_limetta_aloe.png",
    bgColor: "bg-[#D5E0D2]",
  },
  {
    id: 7,
    name: "Mantequilla Hidratante - Coconut & White Ginger",
    description: "Fórmula suntuosa ultra-hidratante que alivia las zonas más ásperas del cuerpo, aportando tersura continua y un escudo emoliente no graso.",
    ingredients: "Aceite de coco fraccionado, extracto de jengibre blanco, aceites acondicionadores ligeros.",
    image: "/images/coconut_white_ginger.png",
    bgColor: "bg-[#E8DCCB]",
  }
];

/* ══════════════════════════════════════════════════════════════════
    INTERFACES Y COMPONENTES AUXILIARES
   ══════════════════════════════════════════════════════════════════ */

interface Product {
  id: number;
  name: string;
  description: string;
  ingredients: string;
  image: string;
  bgColor: string;
}

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

function StaggeredText({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mx-[0.15em]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: delay + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

function ArrivalCard({ product, index, onClick }: { product: Product; index: number; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      onClick={onClick}
      className="flex flex-col items-center justify-start text-center w-full cursor-pointer group h-full"
    >
      {/* ── Contenedor de imagen: más padding vertical para que respire ── */}
      <div
        className={`w-full h-auto ${product.bgColor} rounded-[32px] p-12 py-14 mb-10 flex items-center justify-center mix-blend-multiply hover:shadow-md transition-all duration-300 overflow-hidden`}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500 block"
        />
      </div>

      {/* ── Título: más separación respecto a la imagen y altura mínima mayor ── */}
      <h4 className="font-inter text-sm md:text-base text-[#2A2A2A] font-medium uppercase tracking-wide text-center px-2 mt-2 min-h-[56px] flex items-center justify-center">
        {product.name}
      </h4>

      {/* ── Descripción: mayor margen superior y más padding lateral ── */}
      <p className="font-inter text-xs text-[#6A6A6A] mt-4 text-center px-6 line-clamp-2 leading-relaxed">
        {product.description}
      </p>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════
    APP PRINCIPAL
   ══════════════════════════════════════════════════════════════════ */

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'about' | 'contact'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleLinkClick = (link: string) => {
    setMenuOpen(false);
    if (link === "home") setCurrentView("home");
    else if (link === "about us") setCurrentView("about");
    else if (link === "contact") setCurrentView("contact");
  };

  return (
    <div className="relative bg-[#F4F3ED] text-[#2A2A2A] min-h-screen flex flex-col justify-between">
      <div>
        {/* ──────────── NAVEGACIÓN ──────────── */}
        <nav className="w-full px-6 py-10 md:px-12 flex items-center justify-between z-30 relative bg-[#F4F3ED]">
          <button
            className="text-[#2A2A2A] hover:opacity-70 transition-opacity z-[60] cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="flex flex-col items-center cursor-pointer" onClick={() => setCurrentView('home')}>
            <span className="font-playfair text-2xl md:text-3xl text-[#2A2A2A] leading-none uppercase tracking-wide">
              {NAV_DATA.brand}
            </span>
            <span className="font-inter text-[8px] md:text-[10px] tracking-[0.3em] uppercase text-[#4A4A4A] mt-1">
              {NAV_DATA.brandSubtitle}
            </span>
          </div>

          <div className="w-6 h-6 flex items-center justify-center">
            {/* Espacio equilibrador estructural */}
          </div>
        </nav>

        {/* ──────────── MENÚ MÓVIL ──────────── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-50 bg-[#F4F3ED] flex flex-col items-center justify-center"
            >
              {NAV_DATA.links.map((link, i) => (
                <motion.button
                  key={link}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                  className="text-2xl font-inter uppercase tracking-widest text-[#2A2A2A] mb-14 hover:opacity-50 transition-opacity cursor-pointer bg-transparent border-none"
                  onClick={() => handleLinkClick(link)}
                >
                  {link}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ──────────── VISTAS PRINCIPALES (<MAIN>) ──────────── */}
        {/* ── pb-[80px]: más respiro al final del contenido principal ── */}
        <main className="px-4 md:px-12 pb-[80px] max-w-[1400px] mx-auto w-full flex flex-col items-center justify-center text-center">
          <AnimatePresence mode="wait">

            {/* ══ HOME ══ */}
            {currentView === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full flex flex-col items-center justify-center"
              >
                {/* ──────────── HERO SECTION ──────────── */}
                <section className="relative w-full aspect-[4/5] md:aspect-[21/9] rounded-[40px] md:rounded-[60px] overflow-hidden mb-48 md:mb-56 flex items-center justify-center">
                  <img
                    src={HERO_DATA.image}
                    alt="Hero"
                    className="absolute inset-0 w-full h-full object-cover rounded-[40px] md:rounded-[60px]"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-8 md:px-16 w-full">
                    <h1 className="font-playfair text-white text-4xl md:text-5xl lg:text-7xl leading-[1.2] mb-6 flex flex-col items-center justify-center">
                      <StaggeredText text={HERO_DATA.titleLine1} delay={0.1} />
                      <StaggeredText text={HERO_DATA.titleLine2} delay={0.3} />
                      <StaggeredText text={HERO_DATA.titleLine3} delay={0.5} />
                    </h1>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8, duration: 0.6 }}
                      className="text-white/90 font-inter text-sm md:text-base max-w-xs md:max-w-sm leading-relaxed font-light mx-auto text-center"
                    >
                      {HERO_DATA.subtitle}
                    </motion.p>
                  </div>
                </section>

                {/* ──────────── PRODUCT LIST ──────────── */}
                <section className="mb-8 w-full flex flex-col items-center justify-center">
                  <div className="flex flex-col items-center justify-center text-center mb-32 md:mb-36 max-w-4xl mx-auto gap-6">
                    <h2 className="font-playfair text-2xl md:text-3xl text-[#2A2A2A] uppercase tracking-wide text-center">
                      Nuestros Productos
                    </h2>
                    <p className="font-inter text-sm md:text-base text-[#8A8A8A] max-w-xl text-center leading-relaxed">
                      Explora nuestra gama premium de mantequillas corporales hidratantes de Cuccio Luxury Spa. Haz clic en cualquiera para ver sus detalles.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-14 gap-y-24 w-full max-w-6xl justify-center items-start">
                    {PRODUCTS_DATA.map((product, i) => (
                      <ArrivalCard
                        key={product.id}
                        product={product}
                        index={i}
                        onClick={() => setSelectedProduct(product)}
                      />
                    ))}
                  </div>
                </section>
              </motion.div>
            )}

            {/* ══ ABOUT ══ */}
            {currentView === 'about' && (
              <motion.div
                key="about"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center text-center py-16"
              >

                <div className="w-full flex items-center justify-center mb-12 py-8">
                  <img
                    src="/images/Gemini_Generated_Image_b5gbk1b5gbk1b5gb-removebg-preview.png"

                    className="w-64 md:w-80 h-auto object-contain opacity-90"
                  />
                </div>
                <div className="space-y-8 font-inter text-sm md:text-base text-[#4A4A4A] leading-relaxed text-center flex flex-col items-center">
                  <p className="max-w-2xl text-center">
                    En <strong className="text-[#2A2A2A]">INTER SPA</strong> nos apasiona reconectar a las personas con su belleza natural a través de productos éticos, sustentables y formulados con la mayor pureza orgánica.
                  </p>
                  <p className="max-w-2xl text-center">
                    Creemos firmemente en el bienestar integral. Cada uno de nuestros ingredientes es cuidadosamente seleccionado y cosechado de forma sustentable para asegurar no solo la efectividad en tu piel, sino también la preservación del medio ambiente.
                  </p>
                </div>
              </motion.div>
            )}

            {/* ══ CONTACT ══ */}
            {currentView === 'contact' && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center text-center py-16"
              >
                <h1 className="font-playfair text-3xl md:text-4xl text-[#2A2A2A] uppercase tracking-wide mb-8 text-center">
                  Contacto
                </h1>
                <p className="font-inter text-sm md:text-base text-[#4A4A4A] mb-16 max-w-lg text-center">
                  ¿Tienes alguna duda o te gustaría realizar un pedido personalizado? Estamos listos para asistirte a través de cualquiera de nuestros canales oficiales.
                </p>

                <div className="flex flex-col gap-6 w-full max-w-md mx-auto items-center">
                  <a
                    href={SOCIAL_DATA.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-[#25D366] text-white py-4 px-6 rounded-full font-inter text-sm font-medium hover:opacity-90 transition-opacity shadow-sm w-full"
                  >
                    <MessageCircle size={20} /> Escríbenos por WhatsApp
                  </a>

                  <a
                    href={SOCIAL_DATA.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-[#E1306C] text-white py-4 px-6 rounded-full font-inter text-sm font-medium hover:opacity-90 transition-opacity shadow-sm w-full"
                  >
                    <InstagramIcon size={20} /> Síguenos en Instagram
                  </a>

                  <a
                    href={SOCIAL_DATA.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-black text-white py-4 px-6 rounded-full font-inter text-sm font-medium hover:opacity-90 transition-opacity shadow-sm w-full"
                  >
                    <TikTokIcon size={20} /> Síguenos en TikTok
                  </a>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>

      {/* ──────────── FOOTER ──────────── */}
      <footer className="w-full px-6 md:px-12 py-16 bg-[#F4F3ED] border-t border-[#E5E5E5] flex flex-col items-center justify-center text-center gap-10 mt-16">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {NAV_DATA.links.map(link => (
            <button
              key={link}
              onClick={() => handleLinkClick(link)}
              className="font-inter text-xs md:text-sm uppercase tracking-widest text-[#2A2A2A] hover:opacity-60 transition-opacity bg-transparent border-none cursor-pointer"
            >
              {link}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-8 justify-center">
          <a
            href={SOCIAL_DATA.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-[#2A2A2A] text-[#F4F3ED] flex items-center justify-center hover:opacity-80 transition-opacity"
          >
            <InstagramIcon size={16} />
          </a>
          <a
            href={SOCIAL_DATA.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-[#2A2A2A] text-[#F4F3ED] flex items-center justify-center hover:opacity-80 transition-opacity"
          >
            <TikTokIcon size={16} />
          </a>
          <a
            href={SOCIAL_DATA.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-[#2A2A2A] text-[#F4F3ED] flex items-center justify-center hover:opacity-80 transition-opacity"
          >
            <MessageCircle size={16} />
          </a>
        </div>
      </footer>

      {/* ──────────── BOTÓN FLOTANTE WHATSAPP ──────────── */}
      <a
        href={SOCIAL_DATA.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-pulse fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle size={26} strokeWidth={2} color="white" />
      </a>

      {/* ──────────── PRODUCT DETAIL MODAL ──────────── */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#F4F3ED] rounded-[40px] max-w-lg w-full p-10 shadow-2xl relative flex flex-col items-center text-center overflow-y-auto max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-6 right-6 text-[#2A2A2A] hover:opacity-60 transition-opacity p-2 cursor-pointer"
                onClick={() => setSelectedProduct(null)}
              >
                <X size={20} />
              </button>

              <div
                className={`w-full h-auto ${selectedProduct.bgColor} rounded-[32px] p-12 py-16 flex items-center justify-center mb-10 mix-blend-multiply overflow-hidden`}
              >
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-auto object-contain"
                />
              </div>

              <h3 className="font-playfair text-lg md:text-xl text-[#2A2A2A] uppercase mb-8 tracking-wide px-4 leading-snug">
                {selectedProduct.name}
              </h3>

              <div className="w-full border-t border-[#E5E5E5] pt-10 mb-10 text-center space-y-10">
                <div>
                  <h4 className="font-inter text-xs uppercase tracking-widest text-[#8A8A8A] mb-4">Descripción</h4>
                  <p className="font-inter text-sm text-[#4A4A4A] leading-loose px-4">{selectedProduct.description}</p>
                </div>
                <div>
                  <h4 className="font-inter text-xs uppercase tracking-widest text-[#8A8A8A] mb-4">Ingredientes Destacados</h4>
                  <p className="font-inter text-sm text-[#6A6A6A] leading-loose italic px-4">{selectedProduct.ingredients}</p>
                </div>
              </div>

              <a
                href={SOCIAL_DATA.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-[#2A2A2A] text-[#F4F3ED] rounded-full font-inter text-xs md:text-sm uppercase tracking-widest hover:opacity-90 transition-opacity text-center flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} /> Consultar por WhatsApp
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}