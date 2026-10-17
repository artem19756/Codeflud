/* Codeflud Academy — full client-side build.
   No external libraries, no API keys, works on static hosting. */
"use strict";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const STORAGE_KEY = "codeflud-academy-v2";

const courseData = [
  ["html","HTML","🌐","Веб","Начальный","Структура сайтов и доступная разметка.",["Что такое HTML","Заголовки и текст","Ссылки и изображения","Списки и таблицы","Формы","Семантическая разметка"]],
  ["css","CSS","🎨","Веб","Начальный","Стили, адаптивность и анимации.",["Подключение CSS","Селекторы","Цвета и типографика","Блочная модель","Flexbox","Grid","Адаптивный дизайн"]],
  ["javascript","JavaScript","⚡","Веб","Начальный","Логика и интерактивность веб-страниц.",["Переменные","Типы данных","Условия","Циклы","Функции","Массивы","Объекты","DOM и события"]],
  ["python","Python","🐍","Языки","Начальный","Универсальный язык для автоматизации и приложений.",["Переменные и print","Типы данных","Условия","Циклы","Функции","Списки и словари","Файлы","Обработка ошибок"]],
  ["typescript","TypeScript","🔷","Веб","Средний","JavaScript с понятной системой типов.",["Зачем нужен TypeScript","Примитивные типы","Массивы и объекты","Интерфейсы","Типизация функций"]],
  ["react","React","⚛️","Веб","Средний","Создание интерфейсов из переиспользуемых компонентов.",["Компоненты","JSX","Props","Состояние","События","Списки и формы"]],
  ["nodejs","Node.js","🟢","Backend","Средний","JavaScript на стороне сервера.",["Среда Node.js","Модули","Файловая система","HTTP-сервер","Переменные окружения"]],
  ["sql","SQL","🗄️","Данные","Начальный","Запросы к реляционным базам данных.",["SELECT","WHERE","Сортировка","Агрегация","JOIN","Изменение данных"]],
  ["git","Git","🔀","Инструменты","Начальный","История изменений, ветки и командная работа.",["Что такое Git","Первый репозиторий","Коммиты","Ветки","Слияние","Удалённый репозиторий"]],
  ["kotlin","Kotlin","🟣","Мобильные","Начальный","Современный язык для Android и не только.",["Переменные","Условия","Функции","Классы","Коллекции"]],
  ["java","Java","☕","Языки","Начальный","Основы объектно-ориентированного программирования.",["Первая программа","Переменные","Условия и циклы","Методы","Классы и объекты"]],
  ["csharp","C#","🟪","Языки","Начальный","Язык для приложений, игр и сервисов.",["Синтаксис","Типы и переменные","Условия","Методы","Классы"]],
  ["cpp","C++","⚙️","Языки","Средний","Производительные программы и основы системного кода.",["Структура программы","Типы","Условия и циклы","Функции","Ссылки и указатели"]],
  ["c","C","🔩","Языки","Средний","Фундаментальные основы программирования.",["Первая программа","Переменные","Условия","Циклы","Функции и массивы"]],
  ["go","Go","🐹","Backend","Средний","Простой язык для быстрых сетевых сервисов.",["Пакеты","Переменные","Функции","Структуры","Горутины"]],
  ["rust","Rust","🦀","Языки","Продвинутый","Надёжность памяти и системное программирование.",["Первая программа","Переменные","Владение","Заимствование","Структуры"]],
  ["php","PHP","🐘","Backend","Начальный","Серверная логика и динамические сайты.",["Синтаксис","Переменные","Условия","Массивы","Формы и сервер"]],
  ["swift","Swift","🍎","Мобильные","Начальный","Разработка приложений для экосистемы Apple.",["Переменные","Опциональные значения","Условия","Функции","Структуры"]],
  ["ruby","Ruby","💎","Языки","Начальный","Выразительный язык для веба и скриптов.",["Синтаксис","Строки и числа","Массивы","Методы","Классы"]],
  ["bash","Bash","⌨️","Инструменты","Начальный","Командная строка и автоматизация задач.",["Команды терминала","Переменные","Условия","Циклы","Скрипты"]],
  ["linux","Linux","🐧","Инструменты","Начальный","Файлы, процессы, права и терминал.",["Файловая система","Навигация","Права доступа","Процессы","Пакеты"]],
  ["docker","Docker","🐳","Инструменты","Средний","Контейнеризация приложений.",["Контейнеры","Образы","Dockerfile","Порты и тома","Compose"]],
  ["cybersecurity","Кибербезопасность","🛡️","Основы","Начальный","Защита аккаунтов, устройств и данных.",["Модель угроз","Надёжные пароли","Фишинг","Обновления","Резервные копии"]],
  ["networking","Сети","🌐","Основы","Начальный","Как устройства общаются друг с другом.",["IP-адреса","DNS","HTTP и HTTPS","Маршрутизация","Порты"]],
  ["algorithms","Алгоритмы","🧠","Основы","Средний","Решение задач и оценка эффективности.",["Что такое алгоритм","Поиск","Сортировка","Сложность","Рекурсия"]],
  ["figma","UI/UX дизайн","🖌️","Дизайн","Начальный","Прототипирование понятных интерфейсов.",["Сетка и фреймы","Компоненты","Автолейаут","Прототип","Дизайн-система"]],
  ["api","REST API","🔌","Backend","Средний","Обмен данными между приложениями.",["Что такое API","HTTP-методы","JSON","Коды ответа","Запросы из браузера"]],
  ["mongodb","MongoDB","🍃","Данные","Средний","Документная база данных и запросы.",["Документы","Коллекции","Поиск","Обновление","Индексы"]],
  ["flutter","Flutter","🦋","Мобильные","Средний","Кроссплатформенные приложения с Dart.",["Виджеты","Дерево интерфейса","Состояние","Списки","Навигация"]],
  ["dart","Dart","🎯","Языки","Начальный","Язык для приложений Flutter и скриптов.",["Переменные","Типы","Функции","Коллекции","Классы"]]
];

const courseTips = {
 html: ["HTML описывает смысл и структуру содержимого. Большинство тегов имеют открывающую и закрывающую части.","Используй один главный h1, а уровни заголовков не выбирай ради размера — для оформления существует CSS.","Атрибут href задаёт адрес ссылки, а alt описывает изображение для доступности.","Списки бывают маркированными ul и нумерованными ol. Таблицы используй для табличных данных.","Формы собирают пользовательский ввод. Каждому полю полезно иметь label.","Семантические элементы header, main, nav и footer помогают понять структуру страницы."],
 css: ["CSS можно подключить через файл style.css, тег style или атрибут style. Для проекта удобнее отдельный файл.","Класс выбирается через точку, id — через #. Классы обычно лучше подходят для повторного использования.","Цвета можно задавать именами, HEX, RGB или HSL. Контраст важен для читаемости.","Box model включает содержимое, padding, border и margin. box-sizing:border-box упрощает расчёты.","Flexbox помогает расположить элементы по одной оси. Часто используются display:flex, gap и align-items.","CSS Grid создаёт двумерные сетки с колонками и строками.","Медиазапросы позволяют адаптировать интерфейс под разные размеры экрана."],
 javascript: ["const создаёт неизменяемую ссылку, let — переменную, которую можно переназначать. var в новом коде обычно не нужен.","Типы включают строки, числа, boolean, null, undefined, объекты и символы.","if/else выбирает ветку кода на основе условия. Для строгого сравнения используй ===.","Циклы for и while повторяют действия. Следи, чтобы условие цикла когда-нибудь стало ложным.","Функция объединяет повторяемую логику. Параметры принимают входные данные, return возвращает результат.","Массив хранит упорядоченный список. Полезные методы: map, filter, find и includes.","Объект хранит пары ключ-значение. Доступ возможен через user.name или user['name'].","DOM позволяет читать и менять элементы страницы. События click и input реагируют на действия пользователя."],
 python: ["print() выводит значение, input() читает ввод. Отступы в Python определяют блоки кода.","Python динамически типизирован: значение определяет тип. Часто встречаются str, int, float и bool.","Условие записывается через if, elif и else. После условия ставится двоеточие.","for перебирает элементы, while повторяется пока условие истинно.","def объявляет функцию. return возвращает результат, а не просто печатает его.","list хранит элементы по порядку, dict — пары ключ-значение. Индексация списка начинается с нуля.","with open(...) помогает корректно работать с файлами и закрывать их автоматически.","try/except позволяет обрабатывать ожидаемые ошибки без неожиданного падения программы."]
};

const quizBank = [
 {q:"Какой тег HTML задаёт основной заголовок?", a:["<p>","<h1>","<title>","<head>"], correct:1, why:"h1 — заголовок первого уровня; p обозначает абзац."},
 {q:"Как в CSS выбрать элемент по классу card?", a:["#card",".card","card()","@card"], correct:1, why:"Класс в CSS выбирается точкой: .card."},
 {q:"Как объявить переменную в современном JavaScript?", a:["varname","let score = 0;","make score = 0;","int score = 0;"], correct:1, why:"В JavaScript можно использовать let или const."},
 {q:"Как вывести текст в Python?", a:["echo('Привет')","console.log('Привет')","print('Привет')","write text"], correct:2, why:"Функция print() выводит данные в консоль."},
 {q:"Для чего нужен Git?", a:["Для контроля версий","Для рисования иконок","Для хранения паролей","Для ускорения Wi-Fi"], correct:0, why:"Git хранит историю изменений проекта и помогает работать с ветками."},
 {q:"Что обычно означает HTTP-статус 404?", a:["Успех","Нет доступа","Ресурс не найден","Ошибка сервера"], correct:2, why:"404 Not Found означает, что запрошенный ресурс не найден."}
];

const defaultState = {
 name: "Ученик", selected: ["html","css","javascript"], done: [], xp: 0,
 notes: {}, bookmarks: [], quizDone: 0, streak: 1, lastVisit: new Date().toISOString().slice(0,10),
 theme: "dark", onboardingDone: false
};
let state = loadState();
let page = "home", search = "", category = "Все", activeCourse = "html", activeIndex = 0;
let toastTimer, currentQuiz = null;

function loadState() {
  try { return {...defaultState, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}")}; }
  catch { return {...defaultState}; }
}
function persist() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  updateChrome();
}
function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
}
function toast(message) {
  let node = $("#toast");
  if (!node) { node = document.createElement("div"); node.id = "toast"; node.className = "toast"; document.body.append(node); }
  node.textContent = message;
  node.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => node.classList.remove("show"), 2600);
}
function courseFrom(row) {
  return {id:row[0], name:row[1], icon:row[2], category:row[3], level:row[4], desc:row[5], lessons:row[6]};
}
const courses = courseData.map(courseFrom);
function getCourse(id) { return courses.find(course => course.id === id); }
function courseDone(id) { return state.done.filter(item => item.startsWith(id + ":")).length; }
function coursePercent(course) { return Math.round(courseDone(course.id) / course.lessons.length * 100); }
function level() { return Math.floor(state.xp / 100) + 1; }
function updateChrome() {
  if ($("#sideXp")) $("#sideXp").textContent = state.xp;
  if ($("#sideProgress")) $("#sideProgress").style.width = (state.xp % 100) + "%";
  if ($("#sideProgressText")) $("#sideProgressText").textContent = `${state.xp % 100}/100 XP до следующего уровня`;
  if ($("#userNameTop")) $("#userNameTop").textContent = state.name || "Ученик";
  if ($("#topAvatar")) $("#topAvatar").textContent = (state.name || "У").trim().charAt(0).toUpperCase();
  if ($("#topLevel")) $("#topLevel").textContent = `Уровень ${level()}`;
}
function setPage(next) {
  page = next;
  render();
  window.scrollTo({top:0, behavior:"smooth"});
}
function navButton(label, icon, destination) {
  return `<button class="nav-item ${page === destination ? "active" : ""}" data-page="${destination}"><span>${icon}</span>${label}</button>`;
}
function statsGrid() {
  return `<div class="stats-grid">
    <div class="stat panel"><span class="symbol">⌘</span><strong>${state.selected.length}</strong><small>Курсов выбрано</small></div>
    <div class="stat panel"><span class="symbol">✦</span><strong>${state.xp}</strong><small>Всего XP</small></div>
    <div class="stat panel"><span class="symbol">✓</span><strong>${state.done.length}</strong><small>Уроков пройдено</small></div>
    <div class="stat panel"><span class="symbol">♧</span><strong>${level()}</strong><small>Твой уровень</small></div>
  </div>`;
}
function courseCard(course) {
  const percent = coursePercent(course);
  const selected = state.selected.includes(course.id);
  return `<article class="course-card panel">
    <div class="course-card-top"><span class="course-icon">${course.icon}</span><span class="course-level">${esc(course.level)}</span></div>
    <h3>${esc(course.name)}</h3><p>${esc(course.desc)}</p>
    <div class="course-meta"><span>${course.lessons.length} уроков</span><span>${percent}%</span></div>
    <div class="progress-track"><span style="width:${percent}%"></span></div>
    <div class="course-actions"><button class="btn btn-primary" data-open="${course.id}">Учиться</button>
    <button class="btn btn-secondary" data-toggle="${course.id}">${selected ? "✓ Выбран" : "+ Добавить"}</button></div>
  </article>`;
}
function sectionHeader(title, subtitle, action = "") {
  return `<div class="section-head"><div><h2>${title}</h2><p>${subtitle}</p></div>${action}</div>`;
}
function renderHome() {
  const selected = courses.filter(course => state.selected.includes(course.id)).slice(0,3);
  const recent = [...state.done].slice(-3).reverse().map(key => {
    const [id, idx] = key.split(":");
    const c = getCourse(id);
    return c ? `<button class="recent-item" data-lesson="${id}:${idx}"><span>${c.icon}</span><span><b>${esc(c.name)}</b><small>${esc(c.lessons[Number(idx)] || "Урок")}</small></span><span>↗</span></button>` : "";
  }).join("");
  return `<section class="hero glass">
    <span class="eyebrow">ТВОЁ ВРЕМЯ СОЗДАВАТЬ</span>
    <h2>Код — это твой способ <span class="accent">изменить мир.</span></h2>
    <p>Изучай технологии, проходи короткие уроки и превращай знания в реальные проекты. Начни с малого — двигайся к большому.</p>
    <div class="hero-actions"><button class="btn btn-primary" data-page="courses">Исследовать курсы ↗</button><button class="btn btn-secondary" data-page="practice">Открыть песочницу</button></div>
    <div class="hero-foot"><span>✦ ${courses.length} направлений</span><span>⌘ Практика в браузере</span><span>✓ Прогресс сохраняется</span></div>
  </section>
  ${statsGrid()}
  ${sectionHeader("Продолжить обучение","Твои выбранные направления",'<button class="btn btn-secondary" data-page="courses">Все курсы →</button>')}
  <div class="course-grid">${selected.map(courseCard).join("") || '<div class="empty panel">Добавь первый курс в каталоге.</div>'}
  </div>
  <div class="two-col">
    <section class="panel content-panel"><div class="section-head"><div><h2>Недавние уроки</h2><p>Возвращайся к изученному</p></div></div>${recent || '<div class="empty compact">Здесь появятся уроки, которые ты завершишь.</div>'}</section>
    <section class="panel content-panel daily-card"><span class="big-symbol">✦</span><h2>Маленький шаг каждый день</h2><p>Заверши один урок сегодня, чтобы набрать опыт и приблизиться к следующему уровню.</p><button class="btn btn-primary" data-page="quiz">Пройти мини-тест</button></section>
  </div>`;
}
function renderCourses() {
  const categories = ["Все", ...new Set(courses.map(course => course.category))];
  const shown = courses.filter(course =>
    (category === "Все" || course.category === category) &&
    (course.name + " " + course.desc + " " + course.category).toLowerCase().includes(search.toLowerCase())
  );
  return `<section class="panel search-panel"><input id="courseSearch" class="search" placeholder="⌕  Найти язык или технологию..." value="${esc(search)}" autocomplete="off">
    <div class="filters">${categories.map(item => `<button class="filter-btn ${category===item?"active":""}" data-category="${esc(item)}">${esc(item)}</button>`).join("")}</div></section>
    ${sectionHeader("Каталог курсов",`${shown.length} из ${courses.length} направлений`)}
    <div class="course-grid">${shown.map(courseCard).join("") || '<div class="empty panel">Ничего не найдено. Попробуй другой запрос.</div>'}`;
}
function lessonContent(course, index) {
  const topic = course.lessons[index];
  const specific = courseTips[course.id]?.[index];
  const text = specific || `${topic} — одна из базовых тем направления ${course.name}. Изучи принцип, посмотри пример и попробуй применить его в собственной практике. Не бойся экспериментировать: меняй значения, проверяй результат и сравнивай варианты.`;
  const examples = {
    html: ['<h1>Привет, мир!</h1>\n<p>Мой первый сайт.</p>','Создай заголовок h1 и абзац p.'],
    css: ['body {\n  background: #111318;\n  color: white;\n}\nh1 { color: #b6a4ff; }','Измени цвет заголовка и фон страницы.'],
    javascript: ["const name = 'Codeflud';\nlet xp = 0;\nxp += 10;\nconsole.log(name, xp);","Создай переменную с именем и выведи её через console.log."],
    python: ["name = 'Codeflud'\nxp = 10\nprint(name, xp)","Создай переменную name и выведи её через print."],
    sql: ["SELECT name, level\nFROM students\nWHERE level >= 2\nORDER BY name;","Попробуй изменить условие WHERE."],
    git: ["git init\ngit add .\ngit commit -m \"Первый коммит\"","Представь, что ты сохраняешь первую версию проекта."]
  };
  const example = examples[course.id] || [`// ${course.name}: ${topic}\n// Измени пример и попробуй объяснить результат`, `Создай небольшой пример по теме «${topic}».`];
  const done = state.done.includes(course.id + ":" + index);
  const savedNote = state.notes[course.id + ":" + index] || "";
  const bookmarked = state.bookmarks.includes(course.id + ":" + index);
  return `<div class="lesson-layout">
    <aside class="panel lesson-sidebar"><h3>${course.icon} ${esc(course.name)}</h3><p class="muted">Программа курса</p>
      <div class="lesson-list">${course.lessons.map((title, i) => `<button class="lesson-link ${i===index?"active":""} ${state.done.includes(course.id+":"+i)?"completed":""}" data-lesson="${course.id}:${i}"><span>${state.done.includes(course.id+":"+i)?"✓":String(i+1).padStart(2,"0")}</span>${esc(title)}</button>`).join("")}</div>
    </aside>
    <article class="panel lesson-main">
      <div class="lesson-kicker">${esc(course.category)} / ${esc(course.level)}</div>
      <h2>${esc(course.lessons[index])}</h2><p class="lesson-intro">${text}</p>
      <div class="tip-box"><span>✦</span><div><b>Главная мысль</b><p>Не просто читай — попробуй написать код самостоятельно и объяснить, что делает каждая строка.</p></div></div>
      <h3>Пример кода</h3><pre class="code-sample"><code>${esc(example[0])}</code></pre>
      <h3>Попробуй сам</h3><p class="muted">${esc(example[1])}</p>
      <div class="lesson-actions"><button class="btn btn-primary" data-complete="${course.id}:${index}">${done?"✓ Урок пройден":"Отметить пройденным · +20 XP"}</button><button class="btn btn-secondary" data-bookmark="${course.id}:${index}">${bookmarked?"★ Сохранено":"☆ В закладки"}</button><button class="btn btn-secondary" data-page="practice">Открыть практику ↗</button></div>
      <div class="note-block"><label for="lessonNote">Мои заметки</label><textarea id="lessonNote" data-note="${course.id}:${index}" placeholder="Запиши важную мысль, чтобы не забыть...">${esc(savedNote)}</textarea><small class="muted">Заметки сохраняются на этом устройстве.</small></div>
      <div class="lesson-pagination"><button class="btn btn-secondary" data-lesson="${course.id}:${Math.max(0,index-1)}" ${index===0?"disabled":""}>← Предыдущий</button><span>${index+1} / ${course.lessons.length}</span><button class="btn btn-primary" data-lesson="${course.id}:${Math.min(course.lessons.length-1,index+1)}" ${index===course.lessons.length-1?"disabled":""}>Следующий →</button></div>
    </article>
  </div>`;
}
function renderLesson() {
  const course = getCourse(activeCourse);
  if (!course) return setPage("courses");
  page = "lesson";
  $("#pageTitle").textContent = "Урок";
  $("#app-content").innerHTML = lessonContent(course, activeIndex);
  $$(".nav-item, .mobile-nav button").forEach(button => button.classList.remove("active"));
}
function renderPractice() {
  return `<div class="section-head"><div><h2>Песочница кода</h2><p>Пиши HTML, CSS и JavaScript и сразу смотри результат.</p></div><button class="btn btn-secondary" id="resetEditor">Сбросить пример</button></div>
  <div class="practice-layout"><section class="editor panel"><div class="editor-head"><div><span class="window-dot"></span><span class="window-dot"></span><span class="window-dot"></span><b>index.html</b></div><button class="btn btn-primary" id="runCode">▶ Запустить</button></div>
  <textarea id="codeInput" spellcheck="false" aria-label="Редактор HTML"><!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<style>
  body { font-family: Arial, sans-serif; padding: 24px; background: #f5f3ff; color: #20202a; }
  h1 { color: #7057d9; }
  button { padding: 10px 14px; border: 0; border-radius: 9px; background: #7057d9; color: white; cursor: pointer; }
</style>
</head>
<body>
  <h1>Привет, Codeflud!</h1>
  <p>Это мой первый проект ✨</p>
  <button onclick="this.textContent='Работает!'">Нажми меня</button>
</body>
</html></textarea></section>
  <section class="preview-box panel"><div class="editor-head"><b>Предпросмотр</b><span class="muted">Изолированный iframe</span></div><iframe id="preview" title="Предпросмотр кода" sandbox="allow-scripts"></iframe></section></div>
  <div class="tip-box practice-tip"><span>💡</span><div><b>Попробуй изменить код</b><p>Поменяй текст заголовка, цвет фона или добавь кнопку. Затем нажми «Запустить».</p></div></div>
  <section class="panel content-panel"><h3>Полезные быстрые вставки</h3><div class="snippet-buttons"><button class="filter-btn" data-snippet="heading">Заголовок</button><button class="filter-btn" data-snippet="button">Кнопка</button><button class="filter-btn" data-snippet="card">Карточка</button><button class="filter-btn" data-snippet="gradient">Градиент</button></div></section>`;
}
function renderProfile() {
  const badges = [
    ["🚀","Первый шаг","Заверши первый урок",state.done.length>=1],
    ["📚","Любознательный","Выбери 3 курса",state.selected.length>=3],
    ["🔥","В потоке","Набери 100 XP",state.xp>=100],
    ["🏆","Настойчивость","Заверши 10 уроков",state.done.length>=10],
    ["🧪","Экспериментатор","Запусти песочницу",Boolean(state.practiceRuns)],
    ["🧠","Тест пройден","Пройди мини-тест",state.quizDone>=1]
  ];
  return `<section class="profile-card panel"><div class="profile-avatar">${esc((state.name||"У").trim().charAt(0).toUpperCase())}</div><div class="profile-info"><h2>${esc(state.name)}</h2><p>Участник Codeflud · Уровень ${level()}</p><span class="pill">✦ ${state.xp} XP</span></div></section>
  ${statsGrid()}
  <section class="panel content-panel"><h2>Настройки профиля</h2><form id="profileForm" class="profile-form"><label for="profileName">Как тебя называть?</label><input id="profileName" maxlength="30" value="${esc(state.name)}" placeholder="Твоё имя"><button class="btn btn-primary" type="submit">Сохранить профиль</button></form></section>
  <section class="panel content-panel"><div class="section-head"><div><h2>Достижения</h2><p>Открывай значки во время обучения</p></div><span class="pill">${badges.filter(b=>b[3]).length}/${badges.length}</span></div><div class="badge-grid">${badges.map(b=>`<div class="badge-card ${b[3]?"unlocked":""}"><span>${b[0]}</span><b>${b[1]}</b><small>${b[2]}</small>${b[3]?'<em>Открыто</em>':'<em>Пока закрыто</em>'}</div>`).join("")}</div></section>
  <section class="panel content-panel"><h3>Данные на устройстве</h3><p class="muted">Прогресс хранится в локальном хранилище браузера и не отправляется на сервер.</p><div class="profile-actions"><button class="btn btn-secondary" id="exportData">Экспортировать прогресс</button><button class="btn btn-secondary" id="importData">Импортировать прогресс</button><button class="btn btn-danger" id="resetProgress">Сбросить прогресс</button><input id="importFile" type="file" accept="application/json" hidden></div></section>`;
}
function renderQuiz() {
  const question = currentQuiz ?? Math.floor(Math.random() * quizBank.length);
  currentQuiz = question;
  const item = quizBank[question];
  return `<section class="quiz-wrap panel"><span class="eyebrow">МИНИ-ТЕСТ · ОСНОВЫ IT</span><h2>${esc(item.q)}</h2><p class="muted">Вопрос ${question+1} из ${quizBank.length}. Выбери один ответ.</p><div class="quiz-options">${item.a.map((answer,i)=>`<button class="quiz-option" data-answer="${i}"><span>${String.fromCharCode(65+i)}</span>${esc(answer)}</button>`).join("")}</div><div id="quizFeedback" class="quiz-feedback" hidden></div><div class="quiz-footer"><button class="btn btn-secondary" data-new-quiz>Другой вопрос</button><button class="btn btn-primary" data-page="courses">Изучать курсы</button></div></section>`;
}
function renderAI() {
  return `<section class="hero glass ai-hero"><span class="eyebrow">CODEFLUD HELPER</span><h2>Помощник по <span class="accent">программированию.</span></h2><p>Задай вопрос по коду. В этой версии помощник работает офлайн с готовыми подсказками — API-ключ не нужен.</p></section>
  <section class="panel chat-panel"><div class="chat-messages" id="chatMessages"><div class="chat-bubble assistant"><b>Codeflud Helper</b><p>Привет! Я могу объяснить основы HTML, CSS, JavaScript, Python, Git и помочь разобрать типичные ошибки. Что изучаем?</p></div></div><form id="chatForm" class="chat-form"><textarea id="chatInput" rows="2" maxlength="1000" placeholder="Например: объясни, что такое функция в JavaScript..." required></textarea><button class="btn btn-primary" type="submit">Отправить ↗</button></form><small class="muted">Офлайн-режим: это демонстрационный помощник, не подключённый к большой языковой модели.</small></section>`;
}
function renderBookmarks() {
  const items = state.bookmarks.map(key => {
    const [id, idx] = key.split(":"); const c = getCourse(id);
    return c ? `<button class="recent-item" data-lesson="${id}:${idx}"><span>${c.icon}</span><span><b>${esc(c.name)}</b><small>${esc(c.lessons[Number(idx)] || "Урок")}</small></span><span>↗</span></button>` : "";
  }).join("");
  return `<section class="panel content-panel"><h2>Закладки</h2><p class="muted">Уроки, которые ты сохранил на потом.</p>${items || '<div class="empty compact">Пока нет сохранённых уроков. Открой урок и нажми «В закладки».</div>'}</section>`;
}
function render() {
  const content = $("#app-content");
  const titles = {home:"Главная",courses:"Курсы",practice:"Практика",profile:"Профиль",quiz:"Мини-тест",ai:"Помощник",bookmarks:"Закладки",lesson:"Урок"};
  $("#pageTitle").textContent = titles[page] || "Codeflud";
  if (page === "home") content.innerHTML = renderHome();
  else if (page === "courses") content.innerHTML = renderCourses();
  else if (page === "practice") content.innerHTML = renderPractice();
  else if (page === "profile") content.innerHTML = renderProfile();
  else if (page === "quiz") content.innerHTML = renderQuiz();
  else if (page === "ai") content.innerHTML = renderAI();
  else if (page === "bookmarks") content.innerHTML = renderBookmarks();
  else if (page === "lesson") return renderLesson();
  $$(".nav-item, .mobile-nav button").forEach(button => button.classList.toggle("active", button.dataset.page === page));
  updateChrome();
  if (page === "practice") runPreview();
}
function markComplete(key) {
  if (!state.done.includes(key)) { state.done.push(key); state.xp += 20; persist(); toast("Урок пройден! +20 XP 🔥"); }
  else toast("Этот урок уже отмечен как пройденный.");
  renderLesson();
}
function runPreview() {
  const frame = $("#preview"), input = $("#codeInput");
  if (frame && input) { frame.srcdoc = input.value; state.practiceRuns = (state.practiceRuns || 0) + 1; persist(); }
}
function addChatMessage(text, kind) {
  const container = $("#chatMessages");
  if (!container) return;
  const div = document.createElement("div"); div.className = `chat-bubble ${kind}`;
  const title = document.createElement("b"); title.textContent = kind === "user" ? "Ты" : "Codeflud Helper";
  const p = document.createElement("p"); p.textContent = text;
  div.append(title,p); container.append(div); container.scrollTop = container.scrollHeight;
}
function offlineAnswer(question) {
  const q = question.toLowerCase();
  if (q.includes("html")) return "HTML задаёт структуру страницы. Начни с <!doctype html>, затем добавь html, head и body. Для заголовка используй h1, для абзаца — p, для ссылки — a.";
  if (q.includes("css") || q.includes("стил")) return "CSS отвечает за внешний вид. Например: h1 { color: purple; } изменит цвет заголовка. Селектор выбирает элементы, а свойства задают им стиль.";
  if (q.includes("javascript") || q.includes("js") || q.includes("функц")) return "Функция — повторно используемый блок кода. В JavaScript: function sum(a, b) { return a + b; }. Вызови sum(2, 3), чтобы получить 5.";
  if (q.includes("python")) return "В Python блоки задаются отступами. Пример: name = 'Мир' и print('Привет,', name). Функция создаётся через def greet(name): и возвращает результат через return.";
  if (q.includes("git")) return "Базовый рабочий процесс Git: git init — создать репозиторий, git add . — подготовить изменения, git commit -m \"описание\" — сохранить снимок. Не добавляй секреты и API-ключи в репозиторий.";
  if (q.includes("ошиб") || q.includes("error") || q.includes("не работает")) return "Чтобы найти ошибку: 1) прочитай точный текст ошибки; 2) проверь номер строки; 3) сравни скобки и кавычки; 4) уменьши пример до нескольких строк. Можешь вставить сюда текст ошибки.";
  if (q.includes("переменн")) return "Переменная хранит значение. В JavaScript: const name = 'Аня'; let score = 0;. В Python: name = 'Аня'; score = 0. Выбирай имена, которые объясняют смысл данных.";
  return "Я работаю в демонстрационном офлайн-режиме и знаю базовые подсказки по HTML, CSS, JavaScript, Python и Git. Попробуй уточнить язык или тему. Для полноценного AI нужен безопасный серверный API — не помещай секретный ключ прямо в публичный app.js.";
}
function insertSnippet(kind) {
  const editor = $("#codeInput"); if (!editor) return;
  const snippets = {
    heading: '<h1>Мой заголовок</h1>\n<p>Мой текст</p>',
    button: "<button onclick=\"alert(\'Привет!\')\">Нажми меня</button>",
    card: '<div class="card"><h2>Карточка</h2><p>Короткое описание.</p></div>\n<style>.card{padding:20px;border-radius:16px;background:#e9e3ff}</style>',
    gradient: '<style>body{min-height:100vh;background:linear-gradient(135deg,#111318,#7057d9);color:white;font-family:Arial;padding:24px}</style>'
  };
  editor.value += "\n\n" + (snippets[kind] || "");
  editor.focus(); runPreview(); toast("Фрагмент добавлен");
}

document.addEventListener("click", event => {
  const button = event.target.closest("button, a[data-page]");
  if (!button) return;
  if (button.dataset.page) { event.preventDefault(); setPage(button.dataset.page); return; }
  if (button.dataset.category) { category = button.dataset.category; render(); return; }
  if (button.dataset.toggle) {
    const id = button.dataset.toggle;
    state.selected = state.selected.includes(id) ? state.selected.filter(x => x !== id) : [...state.selected,id];
    persist(); render(); toast(state.selected.includes(id) ? "Курс добавлен" : "Курс удалён из выбранного"); return;
  }
  if (button.dataset.open) {
    activeCourse = button.dataset.open; activeIndex = 0; renderLesson(); window.scrollTo({top:0,behavior:"smooth"}); return;
  }
  if (button.dataset.lesson) {
    const [id, index] = button.dataset.lesson.split(":"); activeCourse = id; activeIndex = Number(index); renderLesson(); return;
  }
  if (button.dataset.complete) { markComplete(button.dataset.complete); return; }
  if (button.dataset.bookmark) {
    const key = button.dataset.bookmark;
    state.bookmarks = state.bookmarks.includes(key) ? state.bookmarks.filter(x=>x!==key) : [...state.bookmarks,key];
    persist(); renderLesson(); toast(state.bookmarks.includes(key) ? "Добавлено в закладки" : "Удалено из закладок"); return;
  }
  if (button.id === "runCode") { runPreview(); toast("Код запущен"); return; }
  if (button.id === "resetEditor") { render(); toast("Пример восстановлен"); return; }
  if (button.dataset.snippet) { insertSnippet(button.dataset.snippet); return; }
  if (button.id === "resetProgress") {
    if (confirm("Точно сбросить XP, уроки и выбранные курсы?")) { state = {...defaultState, selected:["html","css","javascript"], done:[], xp:0, notes:{}, bookmarks:[]}; persist(); setPage("profile"); toast("Прогресс сброшен"); } return;
  }
  if (button.id === "exportData") {
    const blob = new Blob([JSON.stringify(state,null,2)],{type:"application/json"});
    const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href=url; a.download="codeflud-progress.json"; a.click(); URL.revokeObjectURL(url); toast("Экспорт подготовлен"); return;
  }
  if (button.id === "importData") { $("#importFile")?.click(); return; }
  if (button.dataset.answer !== undefined) {
    const item = quizBank[currentQuiz ?? 0], selected = Number(button.dataset.answer);
    $$(".quiz-option").forEach((option,i)=>{ option.disabled=true; if(i===item.correct) option.classList.add("correct"); else if(i===selected) option.classList.add("incorrect"); });
    const feedback = $("#quizFeedback"); feedback.hidden=false;
    const good = selected === item.correct;
    feedback.className = `quiz-feedback ${good?"good":"bad"}`;
    feedback.textContent = (good ? "Верно! " : "Почти. ") + item.why;
    if (good) { state.xp += 10; state.quizDone += 1; persist(); toast("+10 XP за правильный ответ"); }
    return;
  }
  if (button.hasAttribute("data-new-quiz")) { currentQuiz = Math.floor(Math.random()*quizBank.length); render(); return; }
});
document.addEventListener("input", event => {
  if (event.target.id === "courseSearch") {
    search = event.target.value;
    const cursor = event.target.selectionStart;
    render();
    const field = $("#courseSearch");
    if (field) { field.focus(); field.setSelectionRange(cursor,cursor); }
  }
  if (event.target.id === "lessonNote") {
    const key = event.target.dataset.note; state.notes[key] = event.target.value; persist();
  }
});
document.addEventListener("submit", event => {
  if (event.target.id === "profileForm") {
    event.preventDefault(); state.name = $("#profileName").value.trim() || "Ученик"; persist(); render(); toast("Профиль сохранён");
  }
  if (event.target.id === "chatForm") {
    event.preventDefault(); const input = $("#chatInput"); const question = input.value.trim(); if (!question) return;
    addChatMessage(question,"user"); input.value="";
    addChatMessage(offlineAnswer(question),"assistant");
  }
});
document.addEventListener("change", event => {
  if (event.target.id === "importFile" && event.target.files[0]) {
    const reader = new FileReader();
    reader.onload = () => {
      try { const incoming = JSON.parse(reader.result); state = {...defaultState,...incoming}; persist(); setPage("profile"); toast("Прогресс импортирован"); }
      catch { toast("Не удалось прочитать файл прогресса"); }
    };
    reader.readAsText(event.target.files[0]);
  }
});

function initApp() {
  updateChrome();
  render();
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  }
}
initApp();
