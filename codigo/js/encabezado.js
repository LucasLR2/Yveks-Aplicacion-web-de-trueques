function renderEncabezado(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";

  // --- HEADER MÓVIL/TABLET ---
  const mobileDiv = document.createElement("div");
  mobileDiv.className = "lg:hidden";

  const mobileHeader = document.createElement("div");
  mobileHeader.className = "bg-white px-6 md:px-16 pb-2 pt-3";
  const flexCol = document.createElement("div");
  flexCol.className = "flex flex-col";
  const ubicacionSpan = document.createElement("span");
  ubicacionSpan.className = "text-xs text-gray-600 mb-0";
  ubicacionSpan.textContent = "Ubicación";
  const flexRow = document.createElement("div");
  flexRow.className = "flex items-center justify-between";
  const flexRowLeft = document.createElement("div");
  flexRowLeft.className = "flex items-center space-x-2";
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
  flexRowLeft.appendChild(imgLoc);
  flexRowLeft.appendChild(spanLoc);
  flexRowLeft.appendChild(imgCaret);
  const flexRowRight = document.createElement("div");
  flexRowRight.className = "w-8 h-8 bg-gray-custom rounded-full flex items-center justify-center";
  const imgNotif = document.createElement("img");
  imgNotif.src = "recursos/iconos/Solid/Status/Notification.svg";
  imgNotif.alt = "Notificaciones";
  imgNotif.className = "w-5 h-5 svg-gray-800";
  flexRowRight.appendChild(imgNotif);
  flexRow.appendChild(flexRowLeft);
  flexRow.appendChild(flexRowRight);
  flexCol.appendChild(ubicacionSpan);
  flexCol.appendChild(flexRow);
  mobileHeader.appendChild(flexCol);
  mobileDiv.appendChild(mobileHeader);

  // --- HEADER DESKTOP ---
  const desktopHeader = document.createElement("header");
  desktopHeader.className = "bg-white border-b border-gray-200 px-20 py-4 sticky top-0 z-40 hidden lg:block";
  const desktopFlex = document.createElement("div");
  desktopFlex.className = "flex items-center justify-between";
  // Barra de búsqueda
  const searchDiv = document.createElement("div");
  searchDiv.className = "flex-1 max-w-2xl";
  const searchRel = document.createElement("div");
  searchRel.className = "relative";
  const imgSearch = document.createElement("img");
  imgSearch.src = "recursos/iconos/Solid/Interface/Search.svg";
  imgSearch.alt = "Buscar";
  imgSearch.className = "absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 svg-green";
  const inputSearch = document.createElement("input");
  inputSearch.type = "text";
  inputSearch.placeholder = "Buscar productos, marcas, categorías...";
  inputSearch.id = "desktop-search";
  inputSearch.className = "w-full pl-12 pr-4 py-3 rounded-full text-sm border border-gray-600 focus:outline-none text-gray-600 placeholder-gray-600";
  searchRel.appendChild(imgSearch);
  searchRel.appendChild(inputSearch);
  searchDiv.appendChild(searchRel);
  // Botón nueva publicación
  const btnDiv = document.createElement("div");
  btnDiv.className = "mx-8";
  const btn = document.createElement("button");
  btn.className = "bg-green text-white px-4 h-8 rounded-full smooth-transition flex items-center text-sm";
  const imgPlus = document.createElement("img");
  imgPlus.src = "recursos/iconos/Solid/Interface/Plus.svg";
  imgPlus.alt = "Publicar";
  imgPlus.className = "w-3 h-3 svg-white mr-2";
  btn.appendChild(imgPlus);
  btn.appendChild(document.createTextNode("Nueva publicación"));
  btnDiv.appendChild(btn);
  // Acciones header
  const actionsDiv = document.createElement("div");
  actionsDiv.className = "flex items-center space-x-4";
  const btnComment = document.createElement("button");
  btnComment.className = "w-8 h-8 bg-gray-custom rounded-full flex items-center justify-center smooth-transition";
  const imgComment = document.createElement("img");
  imgComment.src = "recursos/iconos/Solid/Communication/Comment.svg";
  imgComment.alt = "Comentarios";
  imgComment.className = "w-5 h-5 svg-gray-800";
  btnComment.appendChild(imgComment);
  const btnNotif = document.createElement("button");
  btnNotif.className = "w-8 h-8 bg-gray-custom rounded-full flex items-center justify-center smooth-transition";
  const imgNotif2 = document.createElement("img");
  imgNotif2.src = "recursos/iconos/Solid/Status/Notification.svg";
  imgNotif2.alt = "Notificaciones";
  imgNotif2.className = "w-5 h-5 svg-gray-800";
  btnNotif.appendChild(imgNotif2);
  // Menú usuario
  const userMenuDiv = document.createElement("div");
  userMenuDiv.className = "relative inline-block text-left";
  const userMenuBtnDiv = document.createElement("div");
  const userMenuBtn = document.createElement("button");
  userMenuBtn.className = "w-8 h-8 bg-gray-custom rounded-full flex items-center justify-center smooth-transition";
  userMenuBtn.id = "menu-button";
  userMenuBtn.setAttribute("onclick", "showDropdown()");
  userMenuBtn.setAttribute("aria-expanded", "true");
  userMenuBtn.setAttribute("aria-haspopup", "true");
  const imgUser = document.createElement("img");
  imgUser.src = "recursos/iconos/Solid/Communication/User.svg";
  imgUser.alt = "Usuario";
  imgUser.className = "w-5 h-5 svg-gray-800";
  userMenuBtn.appendChild(imgUser);
  userMenuBtnDiv.appendChild(userMenuBtn);
  userMenuDiv.appendChild(userMenuBtnDiv);
  // Dropdown (oculto por defecto)
  const dropdownDiv = document.createElement("div");
  dropdownDiv.id = "menu";
  dropdownDiv.className = "hidden absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden";
  dropdownDiv.setAttribute("role", "menu");
  dropdownDiv.setAttribute("aria-orientation", "vertical");
  dropdownDiv.setAttribute("aria-labelledby", "menu-button");
  dropdownDiv.setAttribute("tabindex", "-1");
  // Perfil
  const profileDiv = document.createElement("div");
  profileDiv.className = "flex dropDownProfileConteiner";
  const imgProfile = document.createElement("img");
  imgProfile.className = "rounded-full w-12 h-12 ml-2 mt-2 mb-2";
  imgProfile.src = "recursos/imagenes/josegimenez.jpg";
  const profileInfo = document.createElement("div");
  const profileName = document.createElement("div");
  profileName.className = "mt-5 ml-4";
  profileName.textContent = "José Martínez";
  const profileMail = document.createElement("p");
  profileMail.className = "ml-4 text-xs text-green";
  profileMail.textContent = "jsemartinez@gmail";
  profileInfo.appendChild(profileName);
  profileInfo.appendChild(profileMail);
  profileDiv.appendChild(imgProfile);
  profileDiv.appendChild(profileInfo);
  // Configuración
  const configDiv = document.createElement("div");
  configDiv.className = "py-1";
  configDiv.setAttribute("role", "none");
  const configA = document.createElement("a");
  configA.href = "#";
  configA.className = "block px-4 py-2 text-sm text-gray-700 flex";
  configA.setAttribute("role", "menuitem");
  configA.setAttribute("tabindex", "-1");
  configA.id = "menu-item-5";
  const imgConfig = document.createElement("img");
  imgConfig.src = "recursos/iconos/Outline/Interface/Settings-alt.svg";
  imgConfig.alt = "Estrella";
  imgConfig.className = "w-4 h-4 svg-gray-400 mr-2";
  configA.appendChild(imgConfig);
  configA.appendChild(document.createTextNode("Configuración"));
  configDiv.appendChild(configA);
  // Cerrar sesión
  const logoutDiv = document.createElement("div");
  logoutDiv.className = "py-1";
  logoutDiv.setAttribute("role", "none");
  const logoutA = document.createElement("a");
  logoutA.href = "#";
  logoutA.className = "block px-4 py-2 text-sm text-gray-700 flex";
  logoutA.setAttribute("role", "menuitem");
  logoutA.setAttribute("tabindex", "-1");
  logoutA.id = "menu-item-6";
  const imgLogout = document.createElement("img");
  imgLogout.src = "recursos/iconos/Outline/Interface/Logout.svg";
  imgLogout.alt = "Estrella";
  imgLogout.className = "w-4 h-4 svg-red-400 mr-2";
  logoutA.appendChild(imgLogout);
  logoutA.appendChild(document.createTextNode("Cerrar sesión"));
  logoutDiv.appendChild(logoutA);
  // Armar dropdown
  dropdownDiv.appendChild(profileDiv);
  dropdownDiv.appendChild(configDiv);
  dropdownDiv.appendChild(logoutDiv);
  userMenuDiv.appendChild(dropdownDiv);
  // Armar acciones
  actionsDiv.appendChild(btnComment);
  actionsDiv.appendChild(btnNotif);
  actionsDiv.appendChild(userMenuDiv);
  // Armar header desktop
  desktopFlex.appendChild(searchDiv);
  desktopFlex.appendChild(btnDiv);
  desktopFlex.appendChild(actionsDiv);
  desktopHeader.appendChild(desktopFlex);

  // Agregar ambos headers al contenedor
  container.appendChild(mobileDiv);
  container.appendChild(desktopHeader);
}
