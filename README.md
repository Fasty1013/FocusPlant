# 🌿 Focus Plant Pro — Architecture & Developer Guide

Кроссбраузерное расширение (Manifest V3) для продуктивной концентрации, блокировки отвлечений и геймификации фокуса через выращивание цифрового процедурного леса.

---

## 📁 Структура проекта (Clean Code Architecture)

Кодовая база проекта организована по принципу единственной ответственности (Single Responsibility Principle) и разделена по функциональным слоям:

```text
FocusPlant/
├── manifest.json              # Манифест расширения Manifest V3
├── popup.html                 # Главное окно интерфейса (разметка)
├── popup.js                   # Главный координатор событий и вкладок попапа
├── styles.css                 # Входная точка стилей (@import "styles/main.css")
│
├── styles/                    # ДЕКОМПОЗИЦИЯ СТИЛЕЙ (CSS)
│   ├── main.css               # Главный бандл всех стилей
│   ├── base/                  # Фундаментальные стили
│   │   ├── variables.css      # Цветовая палитра (Catppuccin Mocha), радиусы, тени
│   │   ├── reset.css          # Сброс отступов, box-sizing, стили скроллбара
│   │   └── typography.css     # Базовые шрифты и размеры
│   ├── layout/                # Каркас приложения
│   │   ├── header.css         # Верхняя панель: лого, уровень, баланс монет, язык
│   │   └── navigation.css     # Вкладки навигации (.nav-tabs, .tab-btn)
│   ├── components/            # Стили отдельных экранов и компонентов
│   │   ├── timer.css          # Кольцо фокуса, пресеты времени, строгий режим
│   │   ├── weather.css        # Canvas погодных эффектов и атмосферных тем
│   │   ├── garden.css         # 3D-остров, изометрическая сетка, HQ-модалка
│   │   ├── shop.css           # Карточки саженцев, бейджи редкостей, цены
│   │   ├── tasks.css          # Ежедневные квесты, список задач, карточки медалей
│   │   ├── blocker.css        # Черный/белый списки сайтов, чипы
│   │   └── shareCard.css      # Диалог и Canvas открытки для соцсетей
│   └── ui/                    # Базовые атомарные элементы
│       ├── buttons.css        # Кнопки (.btn-primary, .btn-danger, .btn-warning)
│       └── toggle.css         # Переключатели (.switch, .slider)
│
├── src/                       # МОДУЛЬНЫЙ ИСХОДНЫЙ КОД (JS)
│   ├── constants/             # Конфигурации и именованные константы (без magic numbers)
│   │   ├── app.constants.js          # Лимиты времени, статусы таймера, ключи хранилища
│   │   ├── economy.constants.js      # Базовые награды монет, формулы переработки дубликатов
│   │   ├── rarities.constants.js     # Таблица редкостей, звезды, цвета, пулы выпадения
│   │   └── achievements.constants.js # Реестр 6 наградных медалей
│   │
│   ├── locales/               # Мультиязычность (i18n)
│   │   ├── ru.js              # Русский словарь
│   │   ├── en.js              # Английский словарь
│   │   ├── uz.js              # Узбекский словарь
│   │   ├── ja.js              # Японский словарь
│   │   └── i18nManager.js     # Менеджер переключения языка и получения переводов
│   │
│   ├── utils/                 # Чистые утилиты и математика (без сайд-эффектов)
│   │   ├── math/
│   │   │   ├── isometric.js          # Математика 2.5D изометрической проекции острова
│   │   │   └── probabilities.js      # Расчет вероятностей и рандомизатор деревьев
│   │   ├── domain.js          # Единая функция сопоставления URL с черным/белым списком
│   │   ├── timeFormatter.js   # Форматирование секунд в mm:ss и локализация дат
│   │   ├── canvasHelper.js    # Рисование скругленных прямоугольников и hexToRgba
│   │   └── toast.js           # Всплывающие уведомления (Toast)
│   │
│   ├── graphics/              # Процедурная векторная графика
│   │   ├── skinsRegistry.js   # Каталог 18 видов деревьев (описания, цены, эксклюзивы)
│   │   └── treeRenderer.js    # SVG-генератор стадий роста (Stage 1-5, withered)
│   │
│   ├── audio/                 # Синтез звука
│   │   └── soundEngine.js     # Процедурный синтезатор Web Audio API (без внешних MP3)
│   │
│   ├── services/              # Бизнес-логика без привязки к DOM
│   │   ├── gardenEconomy.js          # Расчет стоимости и оптовой продажи дубликатов
│   │   └── achievementEvaluator.js   # Оценка условий получения медалей и рекордов
│   │
│   └── modules/               # UI-контроллеры экранов
│       ├── weatherController.js      # Анимационный цикл частиц погоды (дождь, костер, дзен)
│       ├── gardenController.js       # Рендерер 3D-острова и инспектор деревьев
│       ├── shareCardController.js    # Рендер открытки 800x1000 и экспорт в Telegram/Stories
│       ├── shopController.js         # Отображение питомника, покупка и смена скинов
│       ├── tasksController.js        # Квесты, задачи Todo и клейм наград за медали
│       └── blockerController.js      # Управление черным/белым списками
│
├── content/                   # Контентный скрипт блокировки сайтов
│   ├── content.js             # Логика перехвата страницы
│   └── overlay.css            # Стили экрана блокировки и предупреждающего баннера
│
├── background/                # Фоновый сервис расширения
│   └── background.js          # Service Worker: тикер, alarms, обработка сообщений
│
├── offscreen/                 # Фоновое аудио для Manifest V3
│   ├── offscreen.html
│   └── offscreen.js
│
└── icons/                     # Иконки расширения (16, 32, 48, 128 px)
```

---

## 🧭 Руководство по разработке (Куда добавлять новый код)

* **Добавить новый вид дерева:**
  1. Описать его свойства в `src/graphics/skinsRegistry.js` (ID, редкость, цена, цвет, имя).
  2. Добавить векторную SVG-функцию в `src/graphics/treeRenderer.js`.
* **Добавить новое достижение / медаль:**
  1. Добавить объект медали в `src/constants/achievements.constants.js`.
  2. Добавить проверку условия в `src/services/achievementEvaluator.js`.
* **Добавить новый язык интерфейса:**
  1. Создать словарь в `src/locales/<код_языка>.js`.
  2. Зарегистрировать язык в `src/locales/i18nManager.js`.
* **Изменить стили экрана:**
  1. Открыть соответствующий файл в `styles/components/<экран>.css`.
  2. Использовать готовые дизайн-токены из `styles/base/variables.css`.

---

## 🚀 Установка и запуск

1. Склонируйте репозиторий:
   ```bash
   git clone https://github.com/Fasty1013/FocusPlant.git
   ```
2. Откройте браузер на базе Chromium (Chrome, Edge, Brave):
   - Перейдите по адресу: `chrome://extensions/`
   - Включите переключатель **«Режим разработчика»** (Developer mode) в правом верхнем углу.
   - Нажмите кнопку **«Загрузить распакованное расширение»** (Load unpacked).
   - Выберите корневую папку `FocusPlant`.
3. Готово! Иконка Focus Plant появится в панели расширений.

---

## 📦 Сборка релизного архива

Сборка пакета расширения для Chrome Web Store и GitHub Releases:
```bash
python -c "import zipfile, os; files=['manifest.json','popup.html','popup.js','styles.css','trees.js','sound.js','i18n.js','weather.js','garden.js','shareCard.js','offscreen.html','offscreen.js','content.js','background.js']; dirs=['src','styles','content','background','offscreen','icons']; z=zipfile.ZipFile('FocusPlant.zip','w',zipfile.ZIP_DEFLATED); [z.write(f,f) for f in files if os.path.exists(f)]; [[z.write(os.path.join(r,fn),os.path.relpath(os.path.join(r,fn),'.')) for fn in fns] for d in dirs if os.path.exists(d) for r,_,fns in os.walk(d)]; print('Built FocusPlant.zip')"
```
