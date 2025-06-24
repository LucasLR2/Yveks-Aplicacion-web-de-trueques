function renderMenu(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";

  // --- SIDEBAR DESKTOP ---
  const desktopSidebar = document.createElement("div");
  desktopSidebar.className = "desktop-sidebar bg-white border-r border-gray-200 custom-scrollbar overflow-y-auto hidden lg:block";

  // Header del sidebar
  const sidebarHeader = document.createElement("div");
  sidebarHeader.className = "p-6 border-b border-gray-100";
  const flexHeader = document.createElement("div");
  flexHeader.className = "flex items-center space-x-3 mb-4";
  const logoDiv = document.createElement("div");
  logoDiv.className = "w-10 h-10 bg-green rounded-full flex items-center justify-center";
  const logoImg = document.createElement("img");
  logoImg.src = "recursos/iconos/Solid/General/Shopping-bag.svg";
  logoImg.alt = "Marketplace";
  logoImg.className = "w-5 h-5 svg-white";
  logoDiv.appendChild(logoImg);
  const titleDiv = document.createElement("div");
  const h1 = document.createElement("h1");
  h1.className = "text-xl text-gray-800";
  h1.textContent = "Marketplace";
  const p = document.createElement("p");
  p.className = "text-sm text-gray-500";
  p.textContent = "Tu tienda favorita";
  titleDiv.appendChild(h1);
  titleDiv.appendChild(p);
  flexHeader.appendChild(logoDiv);
  flexHeader.appendChild(titleDiv);
  sidebarHeader.appendChild(flexHeader);
  // Ubicación
  const ubicacionDiv = document.createElement("div");
  const ubicacionLabel = document.createElement("div");
  ubicacionLabel.className = "text-xs text-gray-500 mb-1";
  ubicacionLabel.textContent = "Ubicación";
  const ubicacionRow = document.createElement("div");
  ubicacionRow.className = "flex items-center space-x-2";
  const imgLoc = document.createElement("img");
  imgLoc.src = "recursos/iconos/Solid/Navigation/Location.svg";
  imgLoc.alt = "Ubicación";
  imgLoc.className = "w-5 h-5 svg-green";
  const spanLoc = document.createElement("span");
  spanLoc.className = "text-sm text-gray-800";
  spanLoc.textContent = "Montevideo, Uruguay";
  const imgCaret = document.createElement("img");
  imgCaret.src = "recursos/iconos/Solid/Interface/Caret down.svg";
  imgCaret.alt = "Expandir";
  imgCaret.className = "w-6 h-6 svg-gray-800";
  ubicacionRow.appendChild(imgLoc);
  ubicacionRow.appendChild(spanLoc);
  ubicacionRow.appendChild(imgCaret);
  ubicacionDiv.appendChild(ubicacionLabel);
  ubicacionDiv.appendChild(ubicacionRow);
  sidebarHeader.appendChild(ubicacionDiv);
  desktopSidebar.appendChild(sidebarHeader);

  // Navegación
  const nav = document.createElement("nav");
  nav.className = "p-6";
  const ul = document.createElement("ul");
  ul.className = "space-y-2";
  const items = [
    { texto: "Inicio", href: "index.html", icon: "recursos/iconos/Solid/General/Home.svg", active: true },
    { texto: "Ofertas", href: "ofertas.html", icon: "recursos/iconos/Outline/General/tag.svg", active: false },
    { texto: "Perfil", href: "#", icon: "recursos/iconos/Outline/Communication/User.svg", active: false },
  ];
  items.forEach(item => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = item.href;
    a.className = `desktop-nav-item flex items-center space-x-3 px-4 py-3 rounded-lg ${item.active ? 'active bg-green text-white' : 'text-green hover:bg-gray-50 smooth-transition'}`;
    a.setAttribute("onclick", "setDesktopActiveNav(this)");
    const img = document.createElement("img");
    img.src = item.icon;
    img.alt = item.texto;
    img.className = `w-5 h-5 ${item.active ? 'svg-white' : 'svg-green'}`;
    a.appendChild(img);
    const span = document.createElement("span");
    span.textContent = item.texto;
    a.appendChild(span);
    li.appendChild(a);
    ul.appendChild(li);
  });
  nav.appendChild(ul);
  desktopSidebar.appendChild(nav);

  // Categorías
  const catDiv = document.createElement("div");
  catDiv.className = "p-6 border-t border-gray-100";
  const catTitle = document.createElement("h3");
  catTitle.className = "text-sm text-gray-800 mb-4";
  catTitle.textContent = "Categorías";
  catDiv.appendChild(catTitle);
  const catList = document.createElement("div");
  catList.className = "space-y-2";
  const categorias = [
    { nombre: "Tecnología", icon: "recursos/iconos/Outline/Devices/Processor.svg" },
    { nombre: "Hogar", icon: "recursos/iconos/Outline/Devices/armchair.svg" },
    { nombre: "Ropa", icon: "recursos/iconos/Outline/Devices/shirt.svg" },
    { nombre: "Accesorios", icon: "recursos/iconos/Outline/Devices/glasses.svg" },
    { nombre: "Deportes", icon: null, fa: "fas fa-futbol" },
    { nombre: "Entretenimiento", icon: null, fa: "fas fa-puzzle-piece" },
    { nombre: "Mascotas", icon: null, fa: "fas fa-paw" },
    { nombre: "Herramientas", icon: null, fa: "fas fa-tools" },
    { nombre: "Servicios", icon: null, fa: "fas fa-concierge-bell" },
    { nombre: "Antigüedades", icon: null, fa: "fas fa-archway" },
  ];
  categorias.forEach(cat => {
    if (cat.icon) {
      const div = document.createElement("div");
      div.className = "desktop-category flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-gray-50 smooth-transition";
      div.setAttribute("onclick", `seleccionarCategoriaEscritorio(this, '${cat.nombre.toLowerCase()}')`);
      const img = document.createElement("img");
      img.src = cat.icon;
      img.alt = cat.nombre;
      img.className = "w-5 h-5 svg-green";
      const span = document.createElement("span");
      span.className = "text-sm text-green";
      span.textContent = cat.nombre;
      div.appendChild(img);
      div.appendChild(span);
      catList.appendChild(div);
    } else {
      const div = document.createElement("div");
      div.className = "flex flex-col items-center space-y-2 cursor-pointer mobile-category flex-shrink-0 w-20 snap-start";
      div.setAttribute("onclick", "selectCategory(this)");
      const iconDiv = document.createElement("div");
      iconDiv.className = "w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center transition-colors";
      const i = document.createElement("i");
      i.className = cat.fa + " text-green";
      iconDiv.appendChild(i);
      div.appendChild(iconDiv);
      const span = document.createElement("span");
      span.className = "text-xs text-gray-600 text-center";
      span.textContent = cat.nombre;
      div.appendChild(span);
      catList.appendChild(div);
    }
  });
  catDiv.appendChild(catList);
  desktopSidebar.appendChild(catDiv);

  // --- MENÚ MÓVIL/TABLET (solo categorías) ---
  const mobileMenu = document.createElement("div");
  mobileMenu.className = "lg:hidden";
  // Solo las categorías, igual que en el header móvil
  const catMobileDiv = document.createElement("div");
  catMobileDiv.className = "px-6 md:px-16 mb-6";
  const catMobileTitle = document.createElement("h3");
  catMobileTitle.className = "text-lg text-gray-800 mb-4";
  catMobileTitle.textContent = "Categorías";
  catMobileDiv.appendChild(catMobileTitle);
  const catMobileRel = document.createElement("div");
  catMobileRel.className = "relative";
  const catMobileFlex = document.createElement("div");
  catMobileFlex.className = "flex gap-x-4 overflow-x-auto scrollbar-hide";
  categorias.forEach(cat => {
    if (cat.icon) {
      const div = document.createElement("div");
      div.className = "flex flex-col items-center space-y-2 cursor-pointer mobile-category min-w-[72px]";
      div.setAttribute("onclick", "seleccionarCategoria(this)");
      const iconDiv = document.createElement("div");
      iconDiv.className = "w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center transition-colors";
      const img = document.createElement("img");
      img.src = cat.icon;
      img.alt = cat.nombre;
      img.className = "w-5 h-5 svg-green";
      iconDiv.appendChild(img);
      div.appendChild(iconDiv);
      const span = document.createElement("span");
      span.className = "text-xs text-gray-600 text-center truncate w-full block";
      span.title = cat.nombre;
      span.textContent = cat.nombre;
      div.appendChild(span);
      catMobileFlex.appendChild(div);
    } else {
      const div = document.createElement("div");
      div.className = "flex flex-col items-center space-y-2 cursor-pointer mobile-category flex-shrink-0 w-20 snap-start";
      div.setAttribute("onclick", "selectCategory(this)");
      const iconDiv = document.createElement("div");
      iconDiv.className = "w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center transition-colors";
      const i = document.createElement("i");
      i.className = cat.fa + " text-green";
      iconDiv.appendChild(i);
      div.appendChild(iconDiv);
      const span = document.createElement("span");
      span.className = "text-xs text-gray-600 text-center";
      span.textContent = cat.nombre;
      div.appendChild(span);
      catMobileFlex.appendChild(div);
    }
  });
  catMobileRel.appendChild(catMobileFlex);
  catMobileDiv.appendChild(catMobileRel);
  mobileMenu.appendChild(catMobileDiv);

  // --- Bottom Navigation SOLO móvil/tablet ---
  const bottomBar = document.createElement("div");
  bottomBar.className = "fixed bottom-0 left-0 w-screen z-50 right-0 lg:hidden";
  const barBg = document.createElement("div");
  barBg.className = "w-full h-3 bg-white";
  const barRel = document.createElement("div");
  barRel.className = "relative bg-green overflow-hidden";
  // Burbuja animada
  const bubble = document.createElement("div");
  bubble.id = "mobile-bubble";
  bubble.className = "absolute left-1/2 bottom-7 -translate-x-1/2 w-12 h-12 bg-white bubble-u-shape";
  barRel.appendChild(bubble);
  // Botones
  const barFlex = document.createElement("div");
  barFlex.className = "flex py-2 relative z-10";
  const btns = [
    { icon: "recursos/iconos/Outline/General/Home.svg", alt: "Inicio", onclick: "setActiveTab(this, 0, 'mobile')" },
    { icon: "recursos/iconos/Solid/General/tag.svg", alt: "Ofertas", onclick: "setActiveTab(this, 1, 'mobile')" },
    { icon: "recursos/iconos/Solid/Interface/Plus.svg", alt: "Agregar", onclick: "setActiveTab(this, 2, 'mobile')", isMain: true },
    { icon: "recursos/iconos/Outline/Communication/Comment.svg", alt: "Comentarios", onclick: "setActiveTab(this, 3, 'mobile')" },
    { icon: "recursos/iconos/Outline/Communication/User.svg", alt: "Usuario", onclick: "setActiveTab(this, 4, 'mobile')" },
  ];
  btns.forEach((btn, i) => {
    if (btn.isMain) {
      const button = document.createElement("button");
      button.className = "w-10 h-10 flex items-center justify-center bg-white text-green rounded-full shadow-lg transition-colors relative z-20 mx-auto";
      button.setAttribute("onclick", btn.onclick);
      const img = document.createElement("img");
      img.src = btn.icon;
      img.alt = btn.alt;
      img.className = "w-4 h-4 svg-green";
      button.appendChild(img);
      barFlex.appendChild(button);
    } else {
      const button = document.createElement("button");
      button.className = "flex flex-col items-center py-2 text-gray-300 transition-colors";
      button.style.width = "20%";
      button.setAttribute("onclick", btn.onclick);
      const img = document.createElement("img");
      img.src = btn.icon;
      img.alt = btn.alt;
      img.className = "w-6 h-6 mb-1 svg-gray-300";
      button.appendChild(img);
      barFlex.appendChild(button);
    }
  });
  barRel.appendChild(barFlex);
  bottomBar.appendChild(barBg);
  bottomBar.appendChild(barRel);

  // Agregar ambos menús al contenedor
  container.appendChild(desktopSidebar);
  container.appendChild(mobileMenu);
  container.appendChild(bottomBar);
} 