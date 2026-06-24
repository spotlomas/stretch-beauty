import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Menu, X, MessageCircle, ChevronRight } from "lucide-react";

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
  { id: 1, name: "Milk & Honey", description: "Crema hidratante no grasa de absorción profunda diseñada para suavizar y brindar un aspecto radiante a la piel de manos, pies y cuerpo.", ingredients: "Extracto de miel pura, proteínas de leche, lípidos hidratantes naturales.", image: "/images/milk_and_honey.png", bgColor: "#E8DCCB" },
  { id: 2, name: "Lavender & Chamomile", description: "Fórmula hidratante ligera y calmante. Ayuda a relajar la piel estresada mientras retiene la humedad natural sin dejar residuos grasos.", ingredients: "Aceite esencial de lavanda, extracto de manzanilla, antioxidantes botánicos.", image: "/images/lavender_chamomile.png", bgColor: "#DFE1CD" },
  { id: 3, name: "Citrus & Wild Berry", description: "Tratamiento intensivo revitalizante con propiedades antioxidantes que suavizan la textura de la piel y despiertan su brillo natural.", ingredients: "Extractos cítricos, extracto de moras silvestres, vitamina C, agentes acondicionadores.", image: "/images/citrus_wild_berry.png", bgColor: "#D5E0D2" },
  { id: 4, name: "Vanilla Bean & Sugar", description: "Exquisita infusión hidratante no grasa que reconforta la piel seca, mejorando la elasticidad y dejando un acabado terso y sedoso.", ingredients: "Extracto de vainilla de Madagascar, caña de azúcar natural, complejos emolientes.", image: "/images/vanilla_bean_sugar.png", bgColor: "#E8DCCB" },
  { id: 5, name: "Pomegranate & Fig", description: "Potente fórmula rejuvenecedora que aprovecha las propiedades antioxidantes de las frutas para suavizar, nutrir y proteger el tejido cutáneo.", ingredients: "Extracto de granada, extracto de higo, nutrientes esenciales regenerativos.", image: "/images/pomegranate_fig.png", bgColor: "#DFE1CD" },
  { id: 6, name: "White Limetta & Aloe", description: "Una experiencia refrescante e hidrorreguladora ideal para mantener la piel suave, fresca, calmada y completamente protegida durante todo el día.", ingredients: "Extracto de limeta blanca, gel purificado de aloe vera, factores de hidratación natural.", image: "/images/white_limetta_aloe.png", bgColor: "#D5E0D2" },
  { id: 7, name: "Coconut & White Ginger", description: "Fórmula suntuosa ultra-hidratante que alivia las zonas más ásperas del cuerpo, aportando tersura continua y un escudo emoliente no graso.", ingredients: "Aceite de coco fraccionado, extracto de jengibre blanco, aceites acondicionadores ligeros.", image: "/images/coconut_white_ginger.png", bgColor: "#E8DCCB" },
];

interface Product { id: number; name: string; description: string; ingredients: string; image: string; bgColor: string; }

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

function StaggeredText({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span>
      {text.split(" ").map((word, i) => (
        <motion.span key={i} className="inline-block mx-[0.12em]"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: delay + i * 0.1, ease: [0.22, 1, 0.36, 1] }}>
          {word}
        </motion.span>
      ))}
    </span>
  );
}

function ProductCard({ product, index, onClick }: { product: Product; index: number; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onClick={onClick}
      className="flex flex-col items-center cursor-pointer group"
    >
      {/* imagen con borde redondeado */}
      <div
        className="w-full rounded-3xl flex items-center justify-center overflow-hidden mb-4 transition-shadow duration-300 hover:shadow-lg"
        style={{ backgroundColor: product.bgColor, mixBlendMode: "multiply", padding: "clamp(16px, 5vw, 40px)", aspectRatio: "3/4" }}
      >
        <img src={product.image} alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
      </div>

      {/* nombre */}
      <p className="font-inter font-medium uppercase tracking-wide text-[#2A2A2A] text-center leading-tight text-[9px] sm:text-xs px-1 line-clamp-2 mb-2">
        {product.name}
      </p>

      {/* Ver Detalles */}
      <button className="flex items-center gap-1 text-[9px] sm:text-[10px] uppercase tracking-widest text-[#2A2A2A] font-semibold hover:opacity-60 transition-opacity">
        Ver Detalles <ChevronRight size={12} strokeWidth={3} />
      </button>
    </motion.div>
  );
}

/* ─── MODAL ─── */
function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  return (
    <motion.div
      key="backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}
    >
      {/* clic en fondo cierra */}
      <div className="absolute inset-0" onClick={onClose} />

      <motion.div
        key="sheet"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="relative z-10 w-full sm:max-w-lg mx-auto bg-[#F4F3ED] rounded-t-[40px] sm:rounded-[32px] overflow-y-auto"
        style={{ maxHeight: "95vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* botón X - absoluto */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/60 hover:bg-white transition-colors cursor-pointer"
          aria-label="Cerrar"
        >
          <X size={20} strokeWidth={2} color="#2A2A2A" />
        </button>

        <div className="px-6 sm:px-10 pt-8 pb-10 flex flex-col items-center text-center">

          {/* imagen grande - prominente */}
          <div
            className="w-full max-w-sm rounded-3xl flex items-center justify-center mb-10 overflow-hidden shadow-md"
            style={{ backgroundColor: product.bgColor, mixBlendMode: "multiply", padding: "40px 24px", aspectRatio: "3/4" }}>
            <img src={product.image} alt={product.name}
              className="w-full h-full object-contain" />
          </div>

          {/* nombre - "Mantequilla Hidratante" */}
          <h3 className="font-playfair text-lg sm:text-xl text-[#2A2A2A] uppercase tracking-widest mb-2 leading-snug">
            Mantequilla Hidratante
          </h3>

          {/* nombre del producto en itálica */}
          <p className="font-playfair text-xl sm:text-2xl text-[#2A2A2A] uppercase tracking-wide mb-8 leading-snug font-normal italic">
            {product.name}
          </p>

          {/* descripción */}
          <div className="w-full mb-8 text-left">
            <p className="font-inter text-[11px] uppercase tracking-widest text-[#9A9A90] mb-3 font-semibold">Descripción</p>
            <p className="font-inter text-sm text-[#2A2A2A] leading-relaxed">{product.description}</p>
          </div>

          {/* ingredientes */}
          <div className="w-full mb-10 text-left">
            <p className="font-inter text-[11px] uppercase tracking-widest text-[#9A9A90] mb-3 font-semibold">Ingredientes Destacados</p>
            <p className="font-inter text-sm text-[#2A2A2A] leading-relaxed italic">{product.ingredients}</p>
          </div>

          {/* CTA - botón WhatsApp */}
          <a href={SOCIAL_DATA.whatsapp} target="_blank" rel="noopener noreferrer"
            className="w-full py-3.5 bg-[#2A2A2A] text-white rounded-full font-inter text-xs uppercase tracking-[0.2em] hover:opacity-85 transition-opacity flex items-center justify-center gap-2.5 font-semibold">
            <MessageCircle size={18} /> Consultar por WhatsApp
          </a>

          {/* Ver Detalles Completos */}
          <button onClick={() => { }} className="mt-6 flex items-center gap-2 text-[11px] uppercase tracking-widest text-[#2A2A2A] font-semibold hover:opacity-60 transition-opacity">
            Ver Detalles Completos <ChevronRight size={14} strokeWidth={3} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── APP ─── */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState<"home" | "about" | "contact">("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleLinkClick = (link: string) => {
    setMenuOpen(false);
    if (link === "home") setCurrentView("home");
    else if (link === "about us") setCurrentView("about");
    else if (link === "contact") setCurrentView("contact");
  };

  const closeModal = () => setSelectedProduct(null);

  return (
    <div className="relative bg-[#F4F3ED] text-[#2A2A2A] min-h-screen flex flex-col justify-between">
      <div>

        {/* NAV */}
        <nav className="w-full px-5 py-5 md:px-12 md:py-8 flex items-center justify-between z-30 relative bg-[#F4F3ED]">
          <button onClick={() => setMenuOpen(!menuOpen)}
            className="text-[#2A2A2A] hover:opacity-60 transition-opacity z-[60] cursor-pointer">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <div className="flex flex-col items-center cursor-pointer" onClick={() => setCurrentView("home")}>
            <span className="font-playfair text-xl md:text-3xl text-[#2A2A2A] leading-none uppercase tracking-wide">{NAV_DATA.brand}</span>
            <span className="font-inter text-[7px] md:text-[9px] tracking-[0.35em] uppercase text-[#6A6A6A] mt-1">{NAV_DATA.brandSubtitle}</span>
          </div>
          <div className="w-6 h-6" />
        </nav>

        {/* MENÚ OVERLAY */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-[#F4F3ED] flex flex-col items-center justify-center gap-0">
              {NAV_DATA.links.map((link, i) => (
                <motion.button key={link}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="text-3xl md:text-4xl font-playfair uppercase tracking-widest text-[#2A2A2A] py-6 hover:opacity-40 transition-opacity cursor-pointer bg-transparent border-none"
                  onClick={() => handleLinkClick(link)}>
                  {link}
                </motion.button>
              ))}
              {/* redes en menú */}
              <div className="flex gap-6 mt-12 opacity-50">
                <a href={SOCIAL_DATA.instagram} target="_blank" rel="noopener noreferrer"><InstagramIcon size={18} /></a>
                <a href={SOCIAL_DATA.tiktok} target="_blank" rel="noopener noreferrer"><TikTokIcon size={18} /></a>
                <a href={SOCIAL_DATA.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} /></a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MAIN */}
        <main className="px-4 sm:px-6 md:px-12 pb-24 max-w-[1400px] mx-auto w-full">
          <AnimatePresence mode="wait">

            {/* HOME */}
            {currentView === "home" && (
              <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>

                {/* HERO */}
                <section className="relative w-full overflow-hidden rounded-3xl md:rounded-[56px] aspect-[3/4] sm:aspect-[3/2] md:aspect-[21/9] mb-16 sm:mb-24 md:mb-44 flex items-center justify-center">
                  <img src={HERO_DATA.image} alt="Hero" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/40" />
                  <div className="absolute inset-0 flex flex-col justify-end items-start text-left px-7 pb-10 md:px-14 md:pb-14">
                    <h1 className="font-playfair text-white text-3xl sm:text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-4 flex flex-col">
                      <StaggeredText text={HERO_DATA.titleLine1} delay={0.1} />
                      <StaggeredText text={HERO_DATA.titleLine2} delay={0.3} />
                      <StaggeredText text={HERO_DATA.titleLine3} delay={0.5} />
                    </h1>
                    <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
                      className="text-white/80 font-inter text-xs sm:text-sm max-w-[240px] sm:max-w-xs leading-relaxed font-light">
                      {HERO_DATA.subtitle}
                    </motion.p>
                  </div>
                </section>

                {/* PRODUCTOS */}
                <section className="w-full">
                  {/* encabezado */}
                  <div className="flex flex-col items-center text-center mb-10 sm:mb-14 md:mb-20">
                    <p className="font-inter text-[9px] uppercase tracking-[0.3em] text-[#9A9A90] mb-3">Colección</p>
                    <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl text-[#2A2A2A] mb-4">Nuestros Productos</h2>
                    <div className="w-10 h-px bg-[#C8C8C0]" />
                  </div>

                  {/* grid - 2 columnas en móvil, 2 en tablet, 4 en desktop */}
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 items-start">
                    {PRODUCTS_DATA.map((p, i) => (
                      <ProductCard key={p.id} product={p} index={i} onClick={() => setSelectedProduct(p)} />
                    ))}
                  </div>
                </section>
              </motion.div>
            )}

            {/* ABOUT */}
            {currentView === "about" && (
              <motion.div key="about" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="w-full max-w-lg mx-auto flex flex-col items-center text-center py-14 md:py-24">
                <img src="/images/Gemini_Generated_Image_b5gbk1b5gb-removebg-preview.png"
                  alt="ISD" className="w-40 sm:w-56 md:w-72 h-auto object-contain mb-12 md:mb-16 opacity-85" />
                <div className="w-8 h-px bg-[#C8C8C0] mb-10" />
                <div className="space-y-6 font-inter text-sm text-[#4A4A4A] leading-loose flex flex-col items-center">
                  <p>En <strong className="text-[#2A2A2A] font-medium">INTER SPA</strong> nos apasiona reconectar a las personas con su belleza natural a través de productos éticos, sustentables y formulados con la mayor pureza orgánica.</p>
                  <p>Creemos firmemente en el bienestar integral. Cada uno de nuestros ingredientes es cuidadosamente seleccionado y cosechado de forma sustentable para asegurar no solo la efectividad en tu piel, sino también la preservación del medio ambiente.</p>
                </div>
              </motion.div>
            )}

            {/* CONTACT */}
            {currentView === "contact" && (
              <motion.div key="contact" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="w-full max-w-sm mx-auto flex flex-col items-center text-center py-14 md:py-24">
                <p className="font-inter text-[9px] uppercase tracking-[0.3em] text-[#9A9A90] mb-3">Hablemos</p>
                <h1 className="font-playfair text-3xl md:text-4xl text-[#2A2A2A] mb-4">Contacto</h1>
                <div className="w-10 h-px bg-[#C8C8C0] mb-10" />
                <p className="font-inter text-sm text-[#6A6A6A] mb-12 leading-relaxed">
                  ¿Tienes alguna duda o quieres hacer un pedido? Escríbenos.
                </p>
                <div className="flex flex-col gap-3 w-full">
                  <a href={SOCIAL_DATA.whatsapp} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-[#25D366] text-white py-4 px-6 rounded-full font-inter text-xs font-medium tracking-wide hover:opacity-90 transition-opacity w-full">
                    <MessageCircle size={16} /> WhatsApp
                  </a>
                  <a href={SOCIAL_DATA.instagram} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-[#E1306C] text-white py-4 px-6 rounded-full font-inter text-xs font-medium tracking-wide hover:opacity-90 transition-opacity w-full">
                    <InstagramIcon size={16} /> Instagram
                  </a>
                  <a href={SOCIAL_DATA.tiktok} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-[#2A2A2A] text-white py-4 px-6 rounded-full font-inter text-xs font-medium tracking-wide hover:opacity-90 transition-opacity w-full">
                    <TikTokIcon size={16} /> TikTok
                  </a>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>

      {/* FOOTER */}
      <footer className="w-full px-6 md:px-12 py-10 md:py-14 border-t border-[#E8E7E0] flex flex-col items-center gap-6 md:gap-8">
        <div className="flex items-center gap-6 md:gap-10">
          {NAV_DATA.links.map(link => (
            <button key={link} onClick={() => handleLinkClick(link)}
              className="font-inter text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-[#6A6A6A] hover:text-[#2A2A2A] transition-colors bg-transparent border-none cursor-pointer">
              {link}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-5">
          {[
            { href: SOCIAL_DATA.instagram, Icon: InstagramIcon },
            { href: SOCIAL_DATA.tiktok, Icon: TikTokIcon },
            { href: SOCIAL_DATA.whatsapp, Icon: MessageCircle },
          ].map(({ href, Icon }, i) => (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-[#D8D6CE] text-[#4A4A4A] flex items-center justify-center hover:border-[#2A2A2A] hover:text-[#2A2A2A] transition-colors">
              <Icon size={14} />
            </a>
          ))}
        </div>
        <p className="font-inter text-[9px] text-[#B0AFA8] tracking-widest uppercase">© 2025 Inter Spa Distribution</p>
      </footer>

      {/* WHATSAPP FLOTANTE */}
      <a href={SOCIAL_DATA.whatsapp} target="_blank" rel="noopener noreferrer"
        className="whatsapp-pulse fixed bottom-5 right-5 md:bottom-8 md:right-8 z-[100] w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:-translate-y-1 transition-transform duration-300"
        aria-label="WhatsApp">
        <MessageCircle size={22} strokeWidth={2} color="white" />
      </a>

      {/* MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={closeModal} />
        )}
      </AnimatePresence>
    </div>
  );
}