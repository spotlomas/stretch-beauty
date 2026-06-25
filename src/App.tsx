import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Menu, X, MessageCircle, ArrowRight, Gem, FlaskConical, HeartHandshake, Plus } from "lucide-react";

const NAV_DATA = {
  brand: "Inter Spa",
  links: ["home", "about us", "contact"],
};

const SOCIAL_DATA = {
  instagram: "https://www.instagram.com/inter.spa.dis/",
  tiktok: "https://www.tiktok.com/@inter_spa_distribution?_r=1&_t=ZS-93PDDMmAKfQ",
  whatsapp: "https://chat.whatsapp.com/EIG3CVoQuwREQ8mL37KKeQ?mode=gi_t&utm_source=ig&utm_medium=social&utm_content=link_in_bio",
};

const HERO_DATA = {
  image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&q=80&w=1200",
  eyebrow: "Inter Spa Distribution",
  title: "Elevando la Belleza a Través de la Ciencia y la Naturaleza.",
  subtitle: "Inter Spa es una empresa dedicada a la distribución de productos de belleza de alta calidad. Curamos meticulosamente formulaciones que combinan la innovación clínica con la pureza botánica para profesionales exigentes.",
  cta: "Explorar Colección",
};

const VALUES_DATA = [
  { icon: Gem, title: "Elegancia", text: "Refinamiento en cada fórmula y presentación. Creemos que el verdadero lujo reside en la simplicidad y la atención meticulosa a los detalles más sutiles." },
  { icon: FlaskConical, title: "Innovación", text: "Búsqueda constante de la excelencia a través de la investigación avanzada, fusionando los últimos descubrimientos con la sabiduría atemporal del cuidado personal." },
  { icon: HeartHandshake, title: "Compromiso", text: "Dedicación inquebrantable a la calidad y la pureza. Nos comprometemos a ofrecer productos que no solo embellecen, sino que nutren y respetan la integridad de su bienestar." },
];

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
          transition={{ duration: 0.55, delay: delay + i * 0.06, ease: [0.22, 1, 0.36, 1] }}>
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── TARJETA DE PRODUCTO ─── */
function ProductCard({ product, index, onClick }: { product: Product; index: number; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onClick={onClick}
      className="image-zoom-hover shadow-soft shadow-soft-hover flex flex-col cursor-pointer group rounded-xl bg-surface-container-lowest overflow-hidden transition-shadow duration-300"
    >
      <div className="w-full aspect-square flex items-center justify-center p-6" style={{ backgroundColor: product.bgColor }}>
        <img src={product.image} alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
      </div>

      <div className="w-full p-5 sm:p-6 flex flex-col items-start text-left gap-1">
        <p className="font-body text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">Mantequilla Hidratante</p>
        <p className="font-display font-medium text-base text-on-surface leading-snug">{product.name}</p>

        <button className="mt-3 inline-flex items-center gap-1 text-[10px] font-display uppercase tracking-[0.2em] border border-outline-variant px-4 py-2 rounded-full text-on-surface-variant hover:bg-ink hover:text-on-ink hover:border-ink transition-colors">
          Ver Detalles <Plus size={11} />
        </button>
      </div>
    </motion.div>
  );
}

/* ─── MODAL DE PRODUCTO ─── */
function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const handleClose = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-on-surface/50 backdrop-blur-sm"
        onClick={handleClose}
      >
        <motion.div
          key="modal"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative z-10 w-full max-w-sm sm:max-w-md bg-surface-container-lowest rounded-xl p-8 sm:p-10 flex flex-col items-center text-center shadow-2xl overflow-y-auto max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-surface-container transition-colors"
          >
            <X size={22} />
          </button>

          <div className="w-full h-auto mb-6 flex justify-center rounded-md overflow-hidden" style={{ backgroundColor: product.bgColor }}>
            <img src={product.image} alt={product.name} className="w-full max-h-[260px] object-contain p-6" />
          </div>

          <p className="font-body text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mb-1">Mantequilla Hidratante</p>
          <p className="font-display text-2xl text-on-surface mb-6 leading-tight">{product.name}</p>

          <div className="w-full text-left space-y-4 mb-8">
            <div>
              <p className="text-[11px] uppercase tracking-widest text-on-surface-variant font-semibold mb-1 font-display">Descripción</p>
              <p className="text-sm text-on-surface-variant leading-relaxed">{product.description}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-widest text-on-surface-variant font-semibold mb-1 font-display">Ingredientes Destacados</p>
              <p className="text-sm text-on-surface-variant leading-relaxed italic">{product.ingredients}</p>
            </div>
          </div>

          <a href={SOCIAL_DATA.whatsapp} target="_blank" rel="noopener noreferrer"
            className="w-full py-4 bg-ink text-on-ink rounded-full font-display text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 hover:opacity-85 transition-opacity">
            <MessageCircle size={16} /> Consultar por WhatsApp
          </a>
        </motion.div>
      </motion.div>
    </AnimatePresence>
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
    <div className="relative bg-surface text-on-surface font-body min-h-screen flex flex-col justify-between antialiased">
      <div>

        {/* NAV */}
        <nav className="glass-nav w-full px-5 py-4 md:px-12 md:py-6 flex items-center justify-between z-30 sticky top-0">
          <button onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
            className="text-on-surface hover:opacity-60 transition-opacity z-[60] cursor-pointer p-2 rounded-full hover:bg-surface-container-high/60">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex flex-col items-center cursor-pointer" onClick={() => setCurrentView("home")}>
            <span className="font-display text-lg md:text-2xl text-on-surface leading-none tracking-tight">{NAV_DATA.brand}</span>
          </div>
          <div className="w-9 h-9" />
        </nav>

        {/* MENÚ OVERLAY */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-surface flex flex-col items-center justify-center gap-0">
              {NAV_DATA.links.map((link, i) => (
                <motion.button key={link}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="text-3xl md:text-4xl font-display font-light uppercase tracking-widest text-on-surface py-6 hover:opacity-40 transition-opacity cursor-pointer bg-transparent border-none"
                  onClick={() => handleLinkClick(link)}>
                  {link}
                </motion.button>
              ))}
              <div className="flex gap-6 mt-12 opacity-50">
                <a href={SOCIAL_DATA.instagram} target="_blank" rel="noopener noreferrer"><InstagramIcon size={18} /></a>
                <a href={SOCIAL_DATA.tiktok} target="_blank" rel="noopener noreferrer"><TikTokIcon size={18} /></a>
                <a href={SOCIAL_DATA.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} /></a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MAIN */}
        <main className="px-5 sm:px-6 md:px-12 pb-24 max-w-[1440px] mx-auto w-full">
          <AnimatePresence mode="wait">

            {/* HOME */}
            {currentView === "home" && (
              <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>

                {/* HERO */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center py-10 sm:py-14 md:py-20">
                  <div className="flex flex-col items-start text-left order-2 md:order-1">
                    <p className="font-body text-[10px] uppercase tracking-[0.3em] text-on-surface-variant mb-4">{HERO_DATA.eyebrow}</p>
                    <h1 className="font-display font-light text-3xl sm:text-4xl md:text-5xl leading-[1.2] text-on-surface mb-6 max-w-md">
                      <StaggeredText text={HERO_DATA.title} delay={0.1} />
                    </h1>
                    <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                      className="font-body text-sm text-on-surface-variant max-w-sm leading-relaxed mb-8">
                      {HERO_DATA.subtitle}
                    </motion.p>
                    <motion.button initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                      onClick={() => document.getElementById("coleccion")?.scrollIntoView({ behavior: "smooth" })}
                      className="inline-flex items-center gap-2 bg-ink text-on-ink font-display text-xs uppercase tracking-[0.15em] px-8 py-4 rounded-full hover:opacity-85 transition-opacity">
                      {HERO_DATA.cta} <ArrowRight size={14} />
                    </motion.button>
                  </div>

                  <div className="relative w-full overflow-hidden rounded-xl aspect-[4/5] sm:aspect-[4/3] md:aspect-square order-1 md:order-2 shadow-soft">
                    <img src={HERO_DATA.image} alt="Inter Spa" className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                </section>

                {/* PRODUCTOS */}
                <section id="coleccion" className="w-full pt-10 sm:pt-14 md:pt-20">
                  <div className="flex items-end justify-between mb-8 sm:mb-10 md:mb-12 border-b border-outline-variant pb-4">
                    <div>
                      <p className="font-body text-[10px] uppercase tracking-[0.3em] text-on-surface-variant mb-2">Colección</p>
                      <h2 className="font-display font-light text-2xl sm:text-3xl text-on-surface">Featured Formulations</h2>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 items-start">
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
                className="w-full py-10 sm:py-14 md:py-16">

                {/* Banner Nuestra Historia */}
                <section className="relative w-full overflow-hidden rounded-xl aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] mb-16 sm:mb-20 md:mb-24 flex items-center justify-center shadow-soft">
                  <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1400"
                    alt="Nuestra Historia" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-on-surface/35" />
                  <div className="relative z-10 text-center px-6 max-w-lg">
                    <h1 className="font-display font-light text-3xl sm:text-4xl md:text-5xl text-on-ink mb-4">Nuestra Historia</h1>
                    <p className="font-body text-sm text-on-ink/85 leading-relaxed">
                      Inter Spa es una empresa dedicada a la distribución de productos de belleza de alta calidad, comprometida con la elegancia, el cuidado personal y la innovación en cada detalle.
                    </p>
                  </div>
                </section>

                {/* Valores */}
                <section className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8 mb-20 sm:mb-24 text-center">
                  {VALUES_DATA.map(({ icon: Icon, title, text }) => (
                    <div key={title} className="flex flex-col items-center px-2">
                      <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center mb-5">
                        <Icon size={22} className="text-on-surface" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-display text-lg text-on-surface mb-3">{title}</h3>
                      <p className="font-body text-sm text-on-surface-variant leading-relaxed max-w-xs">{text}</p>
                    </div>
                  ))}
                </section>

                {/* Filosofía: Ciencia y Naturaleza */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
                  <div className="order-2 md:order-1">
                    <p className="font-body text-[10px] uppercase tracking-[0.3em] text-on-surface-variant mb-3">Filosofía</p>
                    <h2 className="font-display font-light text-2xl sm:text-3xl text-on-surface mb-6">Ciencia y Naturaleza</h2>
                    <div className="space-y-5 font-body text-sm text-on-surface-variant leading-loose">
                      <p>En el corazón de <strong className="text-on-surface font-medium">Inter Spa</strong> reside una profunda reverencia por la sinergia entre el rigor clínico y la pureza botánica. Entendemos que los resultados más transformadores nacen de esta intersección.</p>
                      <p>Curamos cada ingrediente con cuidado, asegurando no solo la efectividad en tu piel, sino también un compromiso ético y sustentable con el medio ambiente.</p>
                    </div>
                  </div>
                  <div className="order-1 md:order-2 grid grid-cols-2 gap-3 rounded-xl overflow-hidden shadow-soft aspect-[4/3]">
                    <img src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=700" alt="Ciencia" className="w-full h-full object-cover" />
                    <img src="https://images.unsplash.com/photo-1556228852-80b6e9c1e7c0?auto=format&fit=crop&q=80&w=700" alt="Naturaleza" className="w-full h-full object-cover" />
                  </div>
                </section>
              </motion.div>
            )}

            {/* CONTACT */}
            {currentView === "contact" && (
              <motion.div key="contact" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="w-full py-10 sm:py-14 md:py-16">

                {/* Banner Contáctanos */}
                <section className="relative w-full overflow-hidden rounded-xl aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] mb-12 sm:mb-16 flex items-center shadow-soft">
                  <img src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=1400"
                    alt="Contáctanos" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-on-surface/30" />
                  <div className="relative z-10 px-8 sm:px-14 max-w-md text-left">
                    <h1 className="font-display font-light text-3xl sm:text-4xl text-on-ink mb-3">Contáctanos</h1>
                    <p className="font-body text-sm text-on-ink/80 leading-relaxed">
                      Encuentra la armonía perfecta entre innovación y bienestar. Estamos aquí para guiarte en tu camino hacia la elegancia.
                    </p>
                  </div>
                </section>

                <p className="font-display italic text-center text-lg sm:text-xl text-on-surface-variant mb-16 sm:mb-20 max-w-lg mx-auto leading-relaxed">
                  "Comprometidos con la elegancia y la innovación en cada detalle."
                </p>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 max-w-3xl mx-auto">
                  <div className="text-left">
                    <p className="font-body text-[10px] uppercase tracking-[0.3em] text-on-surface-variant mb-3">Contacto Directo</p>
                    <p className="font-body text-sm text-on-surface-variant leading-relaxed mb-8">
                      Conecta con nosotros a través de nuestras plataformas oficiales para una atención personalizada.
                    </p>
                    <div className="flex flex-col gap-3">
                      <a href={SOCIAL_DATA.whatsapp} target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-between bg-surface-container-lowest shadow-soft rounded-md px-5 py-4 font-body text-sm text-on-surface hover:shadow-soft-hover transition-shadow">
                        <span className="flex items-center gap-3"><MessageCircle size={16} /> WhatsApp</span>
                        <ArrowRight size={14} />
                      </a>
                      <a href={SOCIAL_DATA.instagram} target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-between bg-surface-container-lowest shadow-soft rounded-md px-5 py-4 font-body text-sm text-on-surface hover:shadow-soft-hover transition-shadow">
                        <span className="flex items-center gap-3"><InstagramIcon size={16} /> Instagram</span>
                        <ArrowRight size={14} />
                      </a>
                      <a href={SOCIAL_DATA.tiktok} target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-between bg-surface-container-lowest shadow-soft rounded-md px-5 py-4 font-body text-sm text-on-surface hover:shadow-soft-hover transition-shadow">
                        <span className="flex items-center gap-3"><TikTokIcon size={16} /> TikTok</span>
                        <ArrowRight size={14} />
                      </a>
                    </div>
                  </div>

                  <div className="bg-surface-container-lowest shadow-soft rounded-xl p-8 flex flex-col items-start text-left">
                    <h3 className="font-display text-lg text-on-surface mb-2">Inquietudes Generales</h3>
                    <p className="font-body text-sm text-on-surface-variant leading-relaxed mb-8">
                      ¿Tienes alguna duda o quieres hacer un pedido? Escríbenos directamente y uno de nuestros asesores te contactará a la brevedad.
                    </p>
                    <a href={SOCIAL_DATA.whatsapp} target="_blank" rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-ink text-on-ink py-4 px-6 rounded-full font-display text-xs uppercase tracking-[0.15em] font-semibold hover:opacity-85 transition-opacity">
                      <MessageCircle size={16} /> Enviar Mensaje
                    </a>
                  </div>
                </section>
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>

      {/* FOOTER */}
      <footer className="w-full px-6 md:px-12 py-12 md:py-16 border-t border-outline-variant flex flex-col items-center gap-8">
        <span className="font-display text-2xl text-on-surface">Inter Spa</span>
        <div className="flex items-center gap-6 md:gap-10">
          {NAV_DATA.links.map(link => (
            <button key={link} onClick={() => handleLinkClick(link)}
              className="font-body text-[10px] uppercase tracking-[0.25em] text-on-surface-variant hover:text-on-surface transition-colors bg-transparent border-none cursor-pointer">
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
              className="w-9 h-9 rounded-full border border-outline-variant text-on-surface-variant flex items-center justify-center hover:border-on-surface hover:text-on-surface transition-colors">
              <Icon size={14} />
            </a>
          ))}
        </div>
        <p className="font-body text-[9px] text-outline tracking-widest uppercase">© 2025 Inter Spa Distribution. Todos los derechos reservados.</p>
      </footer>

      {/* WHATSAPP FLOTANTE */}
      <a href={SOCIAL_DATA.whatsapp} target="_blank" rel="noopener noreferrer"
        className="whatsapp-pulse fixed bottom-5 right-5 md:bottom-8 md:right-8 z-[100] w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:-translate-y-1 transition-transform duration-300"
        aria-label="WhatsApp">
        <MessageCircle size={22} strokeWidth={2} color="white" />
      </a>

      {/* MODAL */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={closeModal} />
      )}
    </div>
  );
}