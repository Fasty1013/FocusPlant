// Focus Plant Pro - Cross-Browser Main Popup Controller with Full Localization
document.addEventListener("DOMContentLoaded", () => {
  const ext = (typeof browser !== 'undefined' && browser.runtime) ? browser : chrome;

  // Comprehensive Localization Dictionary
  const i18n = {
    ru: {
      timerTab: "⏱ Таймер",
      gardenTab: "🪴 Сад & Редкости",
      shopTab: "🛒 Скины",
      tasksTab: "✅ Задачи",
      blockerTab: "🛡 Блокировка",
      userLevel: (lvl) => `Ур. ${lvl} Садовод`,
      selectTime: "⏱ Время концентрации:",
      minuteUnit: "м",
      secondUnit: "с",
      chancesTitle: "🎲 Шансы выпадения редкостей:",
      chancesHint: "Больше время = выше шанс на легендарные!",
      timerStatusIdle: "Выберите время и начните фокус",
      timerStatusRunning: "Режим концентрации: дерево растет!",
      timerStatusPaused: "Фокус приостановлен",
      timerStatusCompleted: "🎉 Поздравляем! Дерево успешно выросло!",
      timerStatusWithered: "🥀 Дерево завяло из-за отвлечения",
      witherDefaultReason: "Запрещенный сайт",
      startBtn: "▶ Начать фокус",
      pauseBtn: "⏸ Пауза",
      resumeBtn: "▶ Продолжить",
      resetBtn: "🔄 Сдаться",
      plantNewBtn: "🌱 Посадить новое дерево",
      dropTitle: "Вы вырастили новое дерево!",
      dropClaim: "Полюбоваться в саду",
      newTreeUnlocked: "✨ НОВОЕ ДЕРЕВО ОТКРЫТО!",
      ambientLabel: "🔊 Фоновый звук:",
      ambientNone: "Выкл",
      ambientRain: "🌧 Дождь",
      ambientWaves: "🌊 Морские волны",
      ambientForest: "🌲 Лесной ветерок",
      ambientFire: "🔥 Уютный костёр",
      ambientZen: "🌌 Дзен 432Hz",
      ambientWhite: "⚪ Белый шум",
      grown: "Выращено",
      withered: "Погибло",
      focusTime: "Время фокуса",
      successRate: "Успех",
      almanacHeader: "📖 Алманах редкостей деревьев",
      almanacSubdesc: "Ставьте больше времени на таймере, чтобы разблокировать редкие, эпические и мифические виды!",
      almanacUnlocked: "открыто",
      almanacLockedHint: "Не открыто!\nСтавьте сессии 45+ мин для выпадения!",
      almanacClickEquip: "Нажмите, чтобы выбрать!",
      statsHeader: "📊 Фокус за последние 7 дней (мин)",
      chartDays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
      forestHeader: "🌲 Мой цифровой лес",
      forestEmpty: "Ваш лес пока пуст. Вырастите свое первое дерево!",
      shopTitle: "Магазин деревьев",
      shopDesc: "Покупайте или открывайте новые деревья длительными сессиями фокуса!",
      equipped: "✓ Выбрано",
      equip: "Выбрать",
      buy: "Купить",
      notEnoughCoins: "Недостаточно монет для покупки этого скина!",
      questsHeader: "🎯 Ежедневные квесты",
      quest1: "Завершить 1 сессию фокуса",
      quest2: "Сфокусироваться на 45 минут",
      quest3: "Выполнить 2 задачи из списка",
      todoHeader: "📝 Список задач",
      todoPlaceholder: "Новая задача...",
      addBtn: "Добавить",
      claimReward: "Забрать",
      claimedReward: "✓ Получено",
      blockMode: "Режим блокировки:",
      blacklistOpt: "Черный список (Запрещать сайты из списка)",
      whitelistOpt: "Белый список (Разрешать только эти сайты)",
      modeDesc: "Если зайти на запрещенный сайт во время фокуса, дерево погибнет!",
      strictTitle: "Строгий режим",
      strictPill: "Хардкор",
      strictDesc: "Нельзя поставить паузу или сдаться. Блокировка без кнопки «ОК»!",
      strictStatusRunning: "Строгий фокус: нельзя прервать!",
      lblAlertStyle: "Формат предупреждения:",
      alertStyleFullscreen: "📺 На весь экран (окно с кнопкой «ОК»)",
      alertStyleBanner: "🪟 Компактный плавающий баннер",
      lblAlertStyleDesc: "На весь экран показывает окно с кнопкой «ОК» (а в строгом режиме — без кнопки «ОК»).",
      quickAdd: "Быстрое добавление:",
      activeSites: "Активный список сайтов:",
      sitePlaceholder: "например: youtube.com",
      meadowTitle: "Изометрический 3D-Сад",
      meadowStage0: "🌱 Начальный сад",
      meadowStage1: "🌱 Росток",
      meadowStage2: "🌿 Полянка",
      meadowStage3: "🌳 Роща",
      meadowStage4: "🌲 Густой лес",
      meadowStage5: "🏰 Заповедник",
      meadowFilterMy: "Мой сад",
      meadowFilterShowcase: "Все виды ✨",
      goToGardenBtn: "🏝️ Открыть изометрический 3D Сад ➔",
      showcaseBadge: "Все 12 видов деревьев",
      meadowHint: "💡 Нажмите на любое дерево или плитку в сетке для просмотра",
      inspectDate: "📅 Дата:",
      inspectDuration: "⏱ Фокус:",
      inspectStatusGrown: "Выращено успешно!",
      inspectStatusWithered: "Завяло из-за отвлечения",
      btnInspectZoom: "🔍 HQ Осмотр",
      lblInspectDuplicates: "🌿 В саду:",
      duplicateCount: (count) => count > 1 ? `${count} шт. (дубликатов: ${count - 1})` : "1 шт. (единственное)",
      sellDuplicateBtn: (price) => `Продать дубликат (+${price} 🪙)`,
      recycleWitheredBtn: (price) => `Убрать завядшее (+${price} 🪙)`,
      sellAllDuplicatesBtn: (count, total) => `💰 Продать дубликаты (${count} шт. • +${total} 🪙)`,
      confirmSellAll: (count, total) => `Продать все ${count} дубликатов деревьев за +${total} монет?\nУ вас гарантированно останется по 1 экземпляру каждого вида.`,
      toastSoldSuccess: (name, price) => `✨ Продан дубликат «${name}»! Получено +${price} 🪙`,
      toastSoldAllSuccess: (count, total) => `✨ Продано ${count} дубликатов! Получено +${total} 🪙`,
      lblHqDate: "📅 Выращено",
      lblHqDuration: "⏱ Время фокуса",
      lblHqDuplicates: "🌿 В коллекции",
      lblHqValue: "💎 Ценность",
      sellAllWitheredBtn: (count, total) => `🥀 Продать засохшие (${count} шт. • +${total} 🪙)`,
      confirmSellAllWithered: (count, total) => `Убрать и переработать все ${count} засохших деревьев за +${total} монет?`,
      toastSoldWitheredSuccess: (count, total) => `🧹 Убрано ${count} засохших деревьев! Получено +${total} 🪙`,
      exclusiveShopBadge: "ЭКСКЛЮЗИВ",
      exclusiveShopDesc: "💎 Эксклюзив магазина (нельзя выбить)"
    },
    en: {
      timerTab: "⏱ Timer",
      gardenTab: "🪴 Garden & Rarities",
      shopTab: "🛒 Skins",
      tasksTab: "✅ Tasks",
      blockerTab: "🛡 Blocker",
      userLevel: (lvl) => `Lvl. ${lvl} Gardener`,
      selectTime: "⏱ Focus Duration:",
      minuteUnit: "m",
      secondUnit: "s",
      chancesTitle: "🎲 Rarity Drop Chances:",
      chancesHint: "Longer focus = higher legendary tree chance!",
      timerStatusIdle: "Choose duration and start focusing",
      timerStatusRunning: "Deep focus mode: tree is growing!",
      timerStatusPaused: "Focus session paused",
      timerStatusCompleted: "🎉 Congratulations! Tree is fully grown!",
      timerStatusWithered: "🥀 The tree withered due to distraction",
      witherDefaultReason: "Blocked website",
      startBtn: "▶ Start Focus",
      pauseBtn: "⏸ Pause",
      resumeBtn: "▶ Resume",
      resetBtn: "🔄 Give Up",
      plantNewBtn: "🌱 Plant New Tree",
      dropTitle: "You grew a new tree!",
      dropClaim: "View in Garden",
      newTreeUnlocked: "✨ NEW TREE UNLOCKED!",
      ambientLabel: "🔊 Ambient Sound:",
      ambientNone: "Off",
      ambientRain: "🌧 Rain",
      ambientWaves: "🌊 Ocean Waves",
      ambientForest: "🌲 Forest Breeze",
      ambientFire: "🔥 Cozy Campfire",
      ambientZen: "🌌 Zen 432Hz",
      ambientWhite: "⚪ White Noise",
      grown: "Grown",
      withered: "Withered",
      focusTime: "Focus Time",
      successRate: "Success",
      almanacHeader: "📖 Tree Rarities Almanac",
      almanacSubdesc: "Set longer focus sessions to unlock rare, epic, and mythic trees!",
      almanacUnlocked: "unlocked",
      almanacLockedHint: "Locked!\nSet 45+ min focus sessions to discover!",
      almanacClickEquip: "Click to equip!",
      statsHeader: "📊 Focus over last 7 days (min)",
      chartDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
      forestHeader: "🌲 My Digital Forest",
      forestEmpty: "Your forest is empty. Grow your first tree!",
      shopTitle: "Tree Nursery & Skins",
      shopDesc: "Unlock exotic trees with coins or long focus sessions!",
      equipped: "✓ Equipped",
      equip: "Equip",
      buy: "Buy",
      notEnoughCoins: "Not enough coins to unlock this skin!",
      questsHeader: "🎯 Daily Quests",
      quest1: "Complete 1 focus session",
      quest2: "Focus for 45 minutes",
      quest3: "Complete 2 tasks from list",
      todoHeader: "📝 Task List",
      todoPlaceholder: "New task...",
      addBtn: "Add",
      claimReward: "Claim",
      claimedReward: "✓ Claimed",
      blockMode: "Blocker Mode:",
      blacklistOpt: "Blacklist (Block listed websites)",
      whitelistOpt: "Whitelist (Allow only listed websites)",
      modeDesc: "Visiting a blocked site during focus will wither your tree!",
      strictTitle: "Strict Mode",
      strictPill: "Hardcore",
      strictDesc: "No pause, no giving up. Blocked sites have no 'OK' button!",
      strictStatusRunning: "Strict Focus: cannot give up!",
      lblAlertStyle: "Warning Style:",
      alertStyleFullscreen: "📺 Full Screen (window with 'OK' button)",
      alertStyleBanner: "🪟 Compact Floating Banner",
      lblAlertStyleDesc: "Full screen displays notification with 'OK' button (in strict mode without 'OK').",
      quickAdd: "Quick Add:",
      activeSites: "Active Website List:",
      sitePlaceholder: "e.g. youtube.com",
      meadowTitle: "3D Isometric Garden",
      meadowStage0: "🌱 Starter Garden",
      meadowStage1: "🌱 Sprout",
      meadowStage2: "🌿 Meadow",
      meadowStage3: "🌳 Grove",
      meadowStage4: "🌲 Dense Forest",
      meadowStage5: "🏰 Sanctuary",
      meadowFilterMy: "My Garden",
      meadowFilterShowcase: "All Species ✨",
      goToGardenBtn: "🏝️ Open 3D Isometric Garden ➔",
      showcaseBadge: "All 12 Unique Species",
      meadowHint: "💡 Click any tree or tile on the grid to inspect details",
      inspectDate: "📅 Date:",
      inspectDuration: "⏱ Focus:",
      inspectStatusGrown: "Grown successfully!",
      inspectStatusWithered: "Withered due to distraction",
      btnInspectZoom: "🔍 HQ Zoom",
      lblInspectDuplicates: "🌿 In Garden:",
      duplicateCount: (count) => count > 1 ? `${count} (duplicates: ${count - 1})` : "1 (unique)",
      sellDuplicateBtn: (price) => `Sell Duplicate (+${price} 🪙)`,
      recycleWitheredBtn: (price) => `Clear Withered (+${price} 🪙)`,
      sellAllDuplicatesBtn: (count, total) => `💰 Sell Duplicates (${count} • +${total} 🪙)`,
      confirmSellAll: (count, total) => `Sell all ${count} duplicate trees for +${total} coins?\nYou will keep 1 copy of each grown species.`,
      toastSoldSuccess: (name, price) => `✨ Sold duplicate "${name}"! Received +${price} 🪙`,
      toastSoldAllSuccess: (count, total) => `✨ Sold ${count} duplicates! Received +${total} 🪙`,
      lblHqDate: "📅 Grown on",
      lblHqDuration: "⏱ Focus time",
      lblHqDuplicates: "🌿 In collection",
      lblHqValue: "💎 Value",
      sellAllWitheredBtn: (count, total) => `🥀 Recycle Withered (${count} • +${total} 🪙)`,
      confirmSellAllWithered: (count, total) => `Recycle all ${count} withered trees into compost for +${total} coins?`,
      toastSoldWitheredSuccess: (count, total) => `🧹 Cleared ${count} withered trees! Received +${total} 🪙`,
      exclusiveShopBadge: "EXCLUSIVE",
      exclusiveShopDesc: "💎 Shop Exclusive (Cannot be rolled)"
    },
    uz: {
      timerTab: "⏱ Taymer",
      gardenTab: "🪴 Bog' & Noyoblik",
      shopTab: "🛒 Daraxtlar",
      tasksTab: "✅ Vazifalar",
      blockerTab: "🛡 Bloklash",
      userLevel: (lvl) => `${lvl}-daraja Bog'bon`,
      selectTime: "⏱ Fokus vaqti:",
      minuteUnit: "d",
      secondUnit: "s",
      chancesTitle: "🎲 Noyoblik ehtimolligi:",
      chancesHint: "Vaqt ko'p bo'lsa = afsonaviy daraxt chiqish ehtimoli yuqori!",
      timerStatusIdle: "Vaqtni tanlang va fokusni boshlang",
      timerStatusRunning: "Fokus rejimi: daraxt o'smoqda!",
      timerStatusPaused: "Taymer to'xtatildi",
      timerStatusCompleted: "🎉 Tabriklaymiz! Daraxt to'liq o'sdi!",
      timerStatusWithered: "🥀 Chalg'ish tufayli daraxt so'ldi",
      witherDefaultReason: "Taqiqlangan sayt",
      startBtn: "▶ Fokusni boshlash",
      pauseBtn: "⏸ Pauza",
      resumeBtn: "▶ Davom etish",
      resetBtn: "🔄 Taslim bo'lish",
      plantNewBtn: "🌱 Yangi daraxt ekish",
      dropTitle: "Yangi daraxt o'stirdingiz!",
      dropClaim: "Bog'da ko'rish",
      newTreeUnlocked: "✨ YANGI DARAXT OCHILDI!",
      ambientLabel: "🔊 Fon ovozi:",
      ambientNone: "O'chirilgan",
      ambientRain: "🌧 Yomg'ir",
      ambientWaves: "🌊 Dengiz to'lqinlari",
      ambientForest: "🌲 O'rmon shamoli",
      ambientFire: "🔥 Olov qirsillashi",
      ambientZen: "🌌 Dzen 432Hz",
      ambientWhite: "⚪ Oq shovqin",
      grown: "O'stirildi",
      withered: "So'ldi",
      focusTime: "Fokus vaqti",
      successRate: "Muvaffaqiyat",
      almanacHeader: "📖 Daraxtlar Almanaği",
      almanacSubdesc: "Noyob va afsonaviy daraxtlarni ochish uchun taymerda ko'proq vaqt belgilang!",
      almanacUnlocked: "ochilgan",
      almanacLockedHint: "Qulflangan!\n45+ daqiqalik fokus orqali ochiladi!",
      almanacClickEquip: "Tanlash uchun bosing!",
      statsHeader: "📊 Oxirgi 7 kunlik fokus (daq)",
      chartDays: ["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"],
      forestHeader: "🌲 Mening o'rmonim",
      forestEmpty: "O'rmon hali bo'sh. Birinchi daraxtingizni o'stiring!",
      shopTitle: "Daraxtlar do'koni",
      shopDesc: "Tangalar yoki uzoq fokus orqali yangi daraxtlarni oching!",
      equipped: "✓ Tanlangan",
      equip: "Tanlash",
      buy: "Sotib olish",
      notEnoughCoins: "Bu daraxtni sotib olish uchun tanga yetarli emas!",
      questsHeader: "🎯 Kunlik topshiriqlar",
      quest1: "1 ta fokus sessiyasini yakunlash",
      quest2: "45 daqiqa fokus qilish",
      quest3: "Ro'yxatdan 2 ta vazifani bajarish",
      todoHeader: "📝 Vazifalar ro'yxati",
      todoPlaceholder: "Yangi vazifa...",
      addBtn: "Qo'shish",
      claimReward: "Olish",
      claimedReward: "✓ Qabul qilindi",
      blockMode: "Bloklash rejimi:",
      blacklistOpt: "Qora ro'yxat (Ro'yxatdagi saytlarni to'sish)",
      whitelistOpt: "Oq ro'yxat (Faqat shu saytlarga ruxsat)",
      modeDesc: "Taqiqlangan saytga kirsangiz, daraxtingiz so'ladi!",
      strictTitle: "Qat'iy rejim",
      strictPill: "Hardkor",
      strictDesc: "Pauza yoki taslim bo'lish mumkin emas. 'OK' tugmasisiz bloklanadi!",
      strictStatusRunning: "Qat'iy fokus: to'xtatib bo'lmaydi!",
      lblAlertStyle: "Ogohlantirish ko'rinishi:",
      alertStyleFullscreen: "📺 To'liq ekran ('OK' tugmali oyna)",
      alertStyleBanner: "🪟 Ixcham suzuvchi banner",
      lblAlertStyleDesc: "To'liq ekran 'OK' tugmali oynani ko'rsatadi (qat'iy rejimda 'OK'siz).",
      quickAdd: "Tezkor qo'shish:",
      activeSites: "Faol saytlar ro'yxati:",
      sitePlaceholder: "masalan: youtube.com",
      meadowTitle: "3D Izometrik Bog'",
      meadowStage0: "🌱 Boshlang'ich bog'",
      meadowStage1: "🌱 Nihol",
      meadowStage2: "🌿 Maydoncha",
      meadowStage3: "🌳 To'qayzor",
      meadowStage4: "🌲 Qalin o'rmon",
      meadowStage5: "🏰 Qo'riqxona",
      meadowFilterMy: "Mening bog'im",
      meadowFilterShowcase: "Barcha turlar ✨",
      goToGardenBtn: "🏝️ 3D Izometrik bog'ni ochish ➔",
      showcaseBadge: "Barcha 12 xil daraxtlar",
      meadowHint: "💡 Ma'lumotlarni ko'rish uchun istalgan daraxt yoki katakni bosing",
      inspectDate: "📅 Sana:",
      inspectDuration: "⏱ Fokus:",
      inspectStatusGrown: "Muvaffaqiyatli o'stirildi!",
      inspectStatusWithered: "Chalg'ish tufayli so'ldi",
      btnInspectZoom: "🔍 HQ Ko'rish",
      lblInspectDuplicates: "🌿 Bog'da:",
      duplicateCount: (count) => count > 1 ? `${count} ta (dublikat: ${count - 1})` : "1 ta (yagona)",
      sellDuplicateBtn: (price) => `Dublikatni sotish (+${price} 🪙)`,
      recycleWitheredBtn: (price) => `So'lgan daraxtni tozalash (+${price} 🪙)`,
      sellAllDuplicatesBtn: (count, total) => `💰 Dublikatlarni sotish (${count} ta • +${total} 🪙)`,
      confirmSellAll: (count, total) => `Barcha ${count} ta dublikat daraxtlarni +${total} tangaga sotmoqchimisiz? Har bir turdan 1 tadan qoladi.`,
      toastSoldSuccess: (name, price) => `✨ "${name}" dublikati sotildi! +${price} 🪙 olindi`,
      toastSoldAllSuccess: (count, total) => `✨ ${count} ta dublikat sotildi! +${total} 🪙 olindi`,
      lblHqDate: "📅 O'stirilgan sana",
      lblHqDuration: "⏱ Fokus vaqti",
      lblHqDuplicates: "🌿 Kolleksiyada",
      lblHqValue: "💎 Qiymati",
      sellAllWitheredBtn: (count, total) => `🥀 So'lganlarni sotish (${count} ta • +${total} 🪙)`,
      confirmSellAllWithered: (count, total) => `Barcha ${count} ta so'lgan daraxtlarni +${total} tangaga qayta ishlashga sotmoqchimisiz?`,
      toastSoldWitheredSuccess: (count, total) => `🧹 ${count} ta so'lgan daraxt tozalandi! +${total} 🪙 olindi`,
      exclusiveShopBadge: "EKSKLUZIV",
      exclusiveShopDesc: "💎 Do'kon eksklyuzivi (chiqmaydi)"
    },
    ja: {
      timerTab: "⏱ タイマー",
      gardenTab: "🪴 庭＆レア図鑑",
      shopTab: "🛒 スキン",
      tasksTab: "✅ タスク",
      blockerTab: "🛡 ブロック",
      userLevel: (lvl) => `Lv.${lvl} 庭師`,
      selectTime: "⏱ 集中時間:",
      minuteUnit: "分",
      secondUnit: "秒",
      chancesTitle: "🎲 レア度排出率:",
      chancesHint: "集中時間が長いほどレジェンダリーが出現！",
      timerStatusIdle: "時間を選んで集中を開始",
      timerStatusRunning: "集中モード中：木が成長しています！",
      timerStatusPaused: "集中モード一時停止",
      timerStatusCompleted: "🎉 おめでとうございます！木が育ちました！",
      timerStatusWithered: "🥀 誘惑に負けて木が枯れてしまいました",
      witherDefaultReason: "ブロックされたサイト",
      startBtn: "▶ 集中開始",
      pauseBtn: "⏸ 一時停止",
      resumeBtn: "▶ 再開",
      resetBtn: "🔄 あきらめる",
      plantNewBtn: "🌱 新しい木を植える",
      dropTitle: "新しい木が育ちました！",
      dropClaim: "庭で確認する",
      newTreeUnlocked: "✨ 新しい木を図鑑に登録！",
      ambientLabel: "🔊 BGM音:",
      ambientNone: "オフ",
      ambientRain: "🌧 雨の音",
      ambientWaves: "🌊 打ち寄せる波",
      ambientForest: "🌲 森のそよ風",
      ambientFire: "🔥 焚き火の音",
      ambientZen: "🌌 宇宙瞑想 (432Hz)",
      ambientWhite: "⚪ ホワイトノイズ",
      grown: "育成成功",
      withered: "枯れた木",
      focusTime: "集中時間",
      successRate: "成功率",
      almanacHeader: "📖 ツリーレア図鑑",
      almanacSubdesc: "集中時間を伸ばすほど、エピックやレジェンダリー、ミシックの木が出現！",
      almanacUnlocked: "解放済み",
      almanacLockedHint: "未解放！\n長時間集中すると確率で出現します！",
      almanacClickEquip: "クリックして装備！",
      statsHeader: "📊 過去7日間の集中時間（分）",
      chartDays: ["月", "火", "水", "木", "金", "土", "日"],
      forestHeader: "🌲 私のデジタルフォレスト",
      forestEmpty: "まだ木がありません。最初の木を育てましょう！",
      shopTitle: "ツリーショップ",
      shopDesc: "集中時間を伸ばすほどレアな木が育ちやすくなります！",
      equipped: "✓ 選択中",
      equip: "装備する",
      buy: "購入",
      notEnoughCoins: "コインが足りません！",
      questsHeader: "🎯 デイリークエスト",
      quest1: "集中セッションを1回完了する",
      quest2: "合計45分間集中する",
      quest3: "やることリストのタスクを2つ完了する",
      todoHeader: "📝 やることリスト",
      todoPlaceholder: "新しいタスク...",
      addBtn: "追加",
      claimReward: "受け取る",
      claimedReward: "✓ 受取済み",
      blockMode: "ブロックモード:",
      blacklistOpt: "ブラックリスト (指定サイトをブロック)",
      whitelistOpt: "ホワイトリスト (指定サイトのみ許可)",
      modeDesc: "集中中に禁止サイトを開くと木が枯れてしまいます！",
      strictTitle: "厳格モード",
      strictPill: "ハードコア",
      strictDesc: "一時停止・降伏不可。禁止サイトは「了解」ボタンなしで完全遮断！",
      strictStatusRunning: "厳格集中：中断不可！",
      lblAlertStyle: "警告の表示形式:",
      alertStyleFullscreen: "📺 全画面表示（「了解」ボタン付き）",
      alertStyleBanner: "🪟 コンパクトバナー",
      lblAlertStyleDesc: "全画面で「了解」ボタン付き警告を表示（厳格モードでは「了解」なし）。",
      quickAdd: "クイック追加:",
      activeSites: "登録済みサイト一覧:",
      sitePlaceholder: "例: youtube.com",
      meadowTitle: "3Dアイソメトリック庭園",
      meadowStage0: "🌱 初期ガーデン",
      meadowStage1: "🌱 芽生え",
      meadowStage2: "🌿 草原",
      meadowStage3: "🌳 木立ち",
      meadowStage4: "🌲 豊かな森",
      meadowStage5: "🏰 聖なる樹海",
      meadowFilterMy: "私の庭",
      meadowFilterShowcase: "全種プレビュー ✨",
      goToGardenBtn: "🏝️ 3D庭園を開く ➔",
      showcaseBadge: "全12種のユニークツリー",
      meadowHint: "💡 グリッドの木やマスをクリックして詳細を確認",
      inspectDate: "📅 植樹日:",
      inspectDuration: "⏱ 集中:",
      inspectStatusGrown: "見事に成長しました！",
      inspectStatusWithered: "集中途切れにより枯死",
      btnInspectZoom: "🔍 HQ 拡大",
      lblInspectDuplicates: "🌿 所持数:",
      duplicateCount: (count) => count > 1 ? `${count}本 (重複: ${count - 1}本)` : "1本 (単一)",
      sellDuplicateBtn: (price) => `重複を売却 (+${price} 🪙)`,
      recycleWitheredBtn: (price) => `枯れ木を片付ける (+${price} 🪙)`,
      sellAllDuplicatesBtn: (count, total) => `💰 重複を売却 (${count}本 • +${total} 🪙)`,
      confirmSellAll: (count, total) => `重複している${count}本の木を+${total}コインで売却しますか？各種類1本は手元に残ります。`,
      toastSoldSuccess: (name, price) => `✨ 「${name}」の重複を売却しました！+${price} 🪙`,
      toastSoldAllSuccess: (count, total) => `✨ ${count}本の重複を売却しました！+${total} 🪙`,
      lblHqDate: "📅 育成日",
      lblHqDuration: "⏱ 集中時間",
      lblHqDuplicates: "🌿 コレクション",
      lblHqValue: "💎 売却価値",
      sellAllWitheredBtn: (count, total) => `🥀 枯れ木を売却 (${count}本 • +${total} 🪙)`,
      confirmSellAllWithered: (count, total) => `枯れてしまった${count}本の木を堆肥として+${total}コインで売却しますか？`,
      toastSoldWitheredSuccess: (count, total) => `🧹 枯れた木を${count}本片付けました！+${total} 🪙`,
      exclusiveShopBadge: "限定品",
      exclusiveShopDesc: "💎 ショップ限定（タイマー不可）"
    }
  };

  // State Variables
  let currentLang = "ru";
  let activeTab = "tabTimer";
  let selectedMinutes = 25;
  let selectedSeconds = 0;
  let selectedDuration = 25 * 60;
  let timerTicker = null;
  const RING_CIRCUMFERENCE = 2 * Math.PI * 96;

  // DOM Elements
  const langSelect = document.getElementById("langSelect");
  const coinsCount = document.getElementById("coinsCount");
  const userLevelBadge = document.getElementById("userLevelBadge");

  // Tabs
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  // Timer Tab DOM
  const timeDisplay = document.getElementById("timeDisplay");
  const timerStatus = document.getElementById("timerStatus");
  const witherAlert = document.getElementById("witherAlert");
  const witherReasonText = document.getElementById("witherReasonText");
  const treeAvatar = document.getElementById("treeAvatar");
  const progressRing = document.getElementById("progressRing");
  const timeConfigSection = document.getElementById("timeConfigSection");
  const timeSlider = document.getElementById("timeSlider");
  const customMinutesInput = document.getElementById("customMinutesInput");
  const customSecondsInput = document.getElementById("customSecondsInput");
  const lblMinuteUnit = document.getElementById("lblMinuteUnit");
  const lblSecondUnit = document.getElementById("lblSecondUnit");
  const timePresets = document.getElementById("timePresets");

  // Strict Mode DOM
  const strictModeCard = document.getElementById("strictModeCard");
  const strictModeToggle = document.getElementById("strictModeToggle");
  const lblStrictTitle = document.getElementById("lblStrictTitle");
  const lblStrictPill = document.getElementById("lblStrictPill");
  const lblStrictDesc = document.getElementById("lblStrictDesc");

  // Drop Chances DOM
  const chanceCommon = document.getElementById("chanceCommon");
  const chanceUncommon = document.getElementById("chanceUncommon");
  const chanceRare = document.getElementById("chanceRare");
  const chanceEpic = document.getElementById("chanceEpic");
  const chanceLegendary = document.getElementById("chanceLegendary");
  const chanceMythic = document.getElementById("chanceMythic");

  // Drop Reveal Card DOM
  const dropRevealCard = document.getElementById("dropRevealCard");
  const dropRarityBadge = document.getElementById("dropRarityBadge");
  const dropTitle = document.getElementById("dropTitle");
  const dropTreeName = document.getElementById("dropTreeName");
  const dropRewardText = document.getElementById("dropRewardText");
  const dropClaimBtn = document.getElementById("dropClaimBtn");

  // Buttons
  const startBtn = document.getElementById("startBtn");
  const pauseBtn = document.getElementById("pauseBtn");
  const resumeBtn = document.getElementById("resumeBtn");
  const resetBtn = document.getElementById("resetBtn");
  const plantNewBtn = document.getElementById("plantNewBtn");
  const ambientSelect = document.getElementById("ambientSelect");

  // Atmospheric Weather DOM
  const timerCenterpiece = document.getElementById("timerCenterpiece");
  const weatherCanvas = document.getElementById("weatherCanvas");
  const weatherBackdrop = document.getElementById("weatherBackdrop");

  // -------------------------------------------------------------
  // ATMOSPHERIC WEATHER EFFECTS ENGINE (Rain, Fire, Zen, Forest, Waves)
  // -------------------------------------------------------------
  const weatherEffects = {
    canvas: null,
    ctx: null,
    container: null,
    backdrop: null,
    type: "none",
    animId: null,
    particles: [],
    ripples: [],
    width: 0,
    height: 0,
    isRunning: false,

    init(canvas, backdrop, container) {
      this.canvas = canvas;
      this.ctx = canvas ? canvas.getContext("2d") : null;
      this.backdrop = backdrop;
      this.container = container;
      if (!this.canvas || !this.ctx) return;
      this.resize();
      window.addEventListener("resize", () => this.resize());
    },

    resize() {
      if (!this.canvas || !this.container) return;
      const rect = this.container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const dpr = window.devicePixelRatio || 1;
      this.width = rect.width;
      this.height = rect.height;
      this.canvas.width = Math.floor(rect.width * dpr);
      this.canvas.height = Math.floor(rect.height * dpr);
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.scale(dpr, dpr);
    },

    setWeather(type) {
      this.type = type || "none";
      if (!this.container || !this.backdrop) return;

      const themes = ["rain", "fire", "zen", "forest", "waves"];
      themes.forEach(t => {
        this.container.classList.remove(`weather-theme-${t}`);
        this.backdrop.classList.remove(`theme-${t}`);
      });
      this.backdrop.classList.remove("active");

      if (themes.includes(this.type)) {
        this.container.classList.add(`weather-theme-${this.type}`);
        this.backdrop.classList.add(`theme-${this.type}`, "active");
        this.initParticles();
        this.start();
      } else {
        this.stop();
        if (this.ctx) this.ctx.clearRect(0, 0, this.width, this.height);
      }
    },

    initParticles() {
      this.resize();
      this.particles = [];
      this.ripples = [];
      const w = this.width || 360;
      const h = this.height || 360;

      if (this.type === "rain") {
        for (let i = 0; i < 42; i++) {
          this.particles.push({
            x: Math.random() * (w + 40) - 20,
            y: Math.random() * h,
            length: 12 + Math.random() * 16,
            speed: 7 + Math.random() * 5,
            slant: -1 - Math.random() * 0.8,
            alpha: 0.25 + Math.random() * 0.45,
            width: 1.1 + Math.random() * 0.7
          });
        }
      } else if (this.type === "fire") {
        for (let i = 0; i < 36; i++) {
          this.particles.push(this.createSpark(w, h, true));
        }
      } else if (this.type === "zen") {
        for (let i = 0; i < 42; i++) {
          this.particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            size: 0.8 + Math.random() * 1.8,
            phase: Math.random() * Math.PI * 2,
            speed: 0.02 + Math.random() * 0.04,
            isCross: Math.random() < 0.2,
            color: Math.random() < 0.3 ? "#cba6f7" : Math.random() < 0.5 ? "#93c5fd" : "#ffffff"
          });
        }
        for (let i = 0; i < 15; i++) {
          this.particles.push({
            isDust: true,
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.4) * 0.35,
            vy: -0.15 - Math.random() * 0.25,
            radius: 1.2 + Math.random() * 2,
            phase: Math.random() * Math.PI * 2,
            color: Math.random() < 0.5 ? "rgba(203, 166, 247, 0.45)" : "rgba(148, 226, 213, 0.45)"
          });
        }
      } else if (this.type === "forest") {
        for (let i = 0; i < 18; i++) {
          this.particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vy: 0.9 + Math.random() * 1.3,
            swayPhase: Math.random() * Math.PI * 2,
            swaySpeed: 0.02 + Math.random() * 0.02,
            swayAmp: 1.2 + Math.random() * 1.5,
            rot: Math.random() * Math.PI * 2,
            vRot: (Math.random() - 0.5) * 0.04,
            size: 4 + Math.random() * 5,
            color: Math.random() < 0.6 ? "#34d399" : Math.random() < 0.8 ? "#a7f3d0" : "#fde047"
          });
        }
      } else if (this.type === "waves") {
        for (let i = 0; i < 22; i++) {
          this.particles.push({
            x: Math.random() * w,
            y: h + Math.random() * 30,
            radius: 1.8 + Math.random() * 4,
            vy: -0.6 - Math.random() * 1.1,
            wobble: Math.random() * Math.PI * 2,
            wobbleSpeed: 0.03 + Math.random() * 0.03,
            alpha: 0.25 + Math.random() * 0.35
          });
        }
      }
    },

    createSpark(w, h, randomY = false) {
      return {
        x: w * 0.5 + (Math.random() - 0.5) * 160,
        y: randomY ? h - Math.random() * h * 0.8 : h + Math.random() * 10,
        vx: (Math.random() - 0.5) * 0.7,
        vy: -1.2 - Math.random() * 2.2,
        radius: 1.2 + Math.random() * 2.2,
        wobblePhase: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.04 + Math.random() * 0.05,
        life: randomY ? Math.floor(Math.random() * 80) : 0,
        maxLife: 70 + Math.random() * 80
      };
    },

    start() {
      if (this.isRunning) return;
      this.isRunning = true;
      const loop = () => {
        if (!this.isRunning) return;
        this.render();
        this.animId = requestAnimationFrame(loop);
      };
      this.animId = requestAnimationFrame(loop);
    },

    stop() {
      this.isRunning = false;
      if (this.animId) {
        cancelAnimationFrame(this.animId);
        this.animId = null;
      }
    },

    pause() {
      this.stop();
    },

    resume() {
      if (["rain", "fire", "zen", "forest", "waves"].includes(this.type)) {
        this.start();
      }
    },

    render() {
      if (!this.ctx) return;
      const w = this.width;
      const h = this.height;
      if (w === 0 || h === 0) {
        this.resize();
        return;
      }

      this.ctx.clearRect(0, 0, w, h);

      if (this.type === "rain") {
        this.renderRain(w, h);
      } else if (this.type === "fire") {
        this.renderFire(w, h);
      } else if (this.type === "zen") {
        this.renderZen(w, h);
      } else if (this.type === "forest") {
        this.renderForest(w, h);
      } else if (this.type === "waves") {
        this.renderWaves(w, h);
      }
    },

    renderRain(w, h) {
      const ctx = this.ctx;

      this.particles.forEach(p => {
        p.x += p.slant;
        p.y += p.speed;

        if (p.y > h - 10) {
          if (Math.random() < 0.6) {
            this.ripples.push({
              x: p.x,
              y: h - 6 - Math.random() * 8,
              rx: 1.5,
              ry: 0.6,
              maxRx: 7 + Math.random() * 5,
              alpha: 0.45
            });
          }
          p.y = -p.length - Math.random() * 15;
          p.x = Math.random() * (w + 40) - 20;
        }

        const grad = ctx.createLinearGradient(p.x, p.y, p.x + p.slant * 2, p.y + p.length);
        grad.addColorStop(0, "rgba(186, 230, 253, 0)");
        grad.addColorStop(1, `rgba(186, 230, 253, ${p.alpha})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = p.width;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.slant * 2, p.y + p.length);
        ctx.stroke();
      });

      for (let i = this.ripples.length - 1; i >= 0; i--) {
        const r = this.ripples[i];
        r.rx += 0.45;
        r.ry += 0.18;
        r.alpha -= 0.022;

        if (r.alpha <= 0 || r.rx >= r.maxRx) {
          this.ripples.splice(i, 1);
          continue;
        }

        ctx.strokeStyle = `rgba(186, 230, 253, ${r.alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(r.x, r.y, r.rx, r.ry, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
    },

    renderFire(w, h) {
      const ctx = this.ctx;

      this.particles.forEach((p, idx) => {
        p.x += p.vx + Math.sin(p.wobblePhase) * 0.55;
        p.y += p.vy;
        p.wobblePhase += p.wobbleSpeed;
        p.life++;

        if (p.life >= p.maxLife || p.y < -10) {
          this.particles[idx] = this.createSpark(w, h, false);
          return;
        }

        const progress = p.life / p.maxLife;
        const alpha = Math.max(0, (1 - progress) * 0.85);

        let color;
        if (progress < 0.3) {
          color = `rgba(254, 240, 138, ${alpha})`;
        } else if (progress < 0.7) {
          color = `rgba(249, 115, 22, ${alpha})`;
        } else {
          color = `rgba(239, 68, 68, ${alpha})`;
        }

        ctx.fillStyle = color;
        ctx.shadowColor = "#f97316";
        ctx.shadowBlur = p.radius * 3.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.6, p.radius * (1 - progress * 0.4)), 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.shadowBlur = 0;
    },

    renderZen(w, h) {
      const ctx = this.ctx;

      this.particles.forEach(p => {
        if (p.isDust) {
          p.x += p.vx;
          p.y += p.vy;
          p.phase += 0.02;
          if (p.y < -10) p.y = h + 10;
          if (p.x < -10) p.x = w + 10;
          if (p.x > w + 10) p.x = -10;

          const alpha = 0.2 + 0.25 * Math.sin(p.phase);
          ctx.fillStyle = p.color.replace("0.45", alpha.toFixed(2));
          ctx.shadowColor = "#cba6f7";
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        } else {
          p.phase += p.speed;
          const alpha = 0.2 + 0.65 * (0.5 + 0.5 * Math.sin(p.phase));

          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 4;
          ctx.globalAlpha = alpha;

          if (p.isCross && alpha > 0.6) {
            const flare = p.size * 2.8;
            ctx.strokeStyle = p.color;
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            ctx.moveTo(p.x - flare, p.y);
            ctx.lineTo(p.x + flare, p.y);
            ctx.moveTo(p.x, p.y - flare);
            ctx.lineTo(p.x, p.y + flare);
            ctx.stroke();
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      });

      ctx.shadowBlur = 0;
    },

    renderForest(w, h) {
      const ctx = this.ctx;

      this.particles.forEach(p => {
        p.swayPhase += p.swaySpeed;
        p.x += Math.sin(p.swayPhase) * p.swayAmp;
        p.y += p.vy;
        p.rot += p.vRot;

        if (p.y > h + 15) {
          p.y = -15;
          p.x = Math.random() * w;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.45, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      ctx.globalAlpha = 1;
    },

    renderWaves(w, h) {
      const ctx = this.ctx;

      this.particles.forEach(p => {
        p.wobble += p.wobbleSpeed;
        p.x += Math.sin(p.wobble) * 0.5;
        p.y += p.vy;

        if (p.y < -15) {
          p.y = h + 15;
          p.x = Math.random() * w;
        }

        ctx.strokeStyle = `rgba(148, 226, 213, ${p.alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.9})`;
        ctx.beginPath();
        ctx.arc(p.x - p.radius * 0.35, p.y - p.radius * 0.35, Math.max(0.6, p.radius * 0.25), 0, Math.PI * 2);
        ctx.fill();
      });
    }
  };

  // Initialize weather effects with DOM
  weatherEffects.init(weatherCanvas, weatherBackdrop, timerCenterpiece);

  // Garden Tab DOM
  const statGrown = document.getElementById("statGrown");
  const statWithered = document.getElementById("statWithered");
  const statMinutes = document.getElementById("statMinutes");
  const statRate = document.getElementById("statRate");
  const almanacGrid = document.getElementById("almanacGrid");
  const almanacCounter = document.getElementById("almanacCounter");
  const statsChart = document.getElementById("statsChart");
  const chartLabels = document.getElementById("chartLabels");
  const forestGrid = document.getElementById("forestGrid");

  // Shop Tab DOM
  const skinsGrid = document.getElementById("skinsGrid");

  // Tasks Tab DOM
  const questList = document.getElementById("questList");
  const todoInput = document.getElementById("todoInput");
  const addTodoBtn = document.getElementById("addTodoBtn");
  const todoList = document.getElementById("todoList");

  // Blocker Tab DOM
  const blockModeSelect = document.getElementById("blockMode");
  const siteInput = document.getElementById("siteInput");
  const addSiteBtn = document.getElementById("addSiteBtn");
  const siteListContainer = document.getElementById("siteList");
  const siteCount = document.getElementById("siteCount");
  const chipBtns = document.querySelectorAll(".chip-btn");

  // Initialize Progress Ring
  progressRing.style.strokeDasharray = `${RING_CIRCUMFERENCE} ${RING_CIRCUMFERENCE}`;
  progressRing.style.strokeDashoffset = "0";

  // Navigation Tab Switching
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      tabContents.forEach(c => c.classList.remove("active"));

      btn.classList.add("active");
      activeTab = btn.dataset.tab;
      const targetContent = document.getElementById(activeTab);
      if (targetContent) targetContent.classList.add("active");

      if (activeTab === "tabTimer") {
        weatherEffects.resume();
      } else {
        weatherEffects.pause();
      }

      if (activeTab === "tabGarden") renderGardenTab();
      if (activeTab === "tabShop") renderShopTab();
      if (activeTab === "tabTasks") renderTasksTab();
      if (activeTab === "tabBlocker") renderBlockerTab();
    });
  });

  // Apply Language Everywhere
  function applyLanguage(lang) {
    currentLang = lang;
    const t = i18n[lang] || i18n.ru;

    document.getElementById("tTimerBtn").textContent = t.timerTab;
    document.getElementById("tGardenBtn").textContent = t.gardenTab;
    document.getElementById("tShopBtn").textContent = t.shopTab;
    document.getElementById("tTasksBtn").textContent = t.tasksTab;
    document.getElementById("tBlockerBtn").textContent = t.blockerTab;

    document.getElementById("lblSelectTime").textContent = t.selectTime;
    if (lblMinuteUnit && t.minuteUnit) lblMinuteUnit.textContent = t.minuteUnit;
    if (lblSecondUnit && t.secondUnit) lblSecondUnit.textContent = t.secondUnit;
    if (lblStrictTitle && t.strictTitle) lblStrictTitle.textContent = t.strictTitle;
    if (lblStrictPill && t.strictPill) lblStrictPill.textContent = t.strictPill;
    if (lblStrictDesc && t.strictDesc) lblStrictDesc.textContent = t.strictDesc;
    document.getElementById("lblChancesTitle").textContent = t.chancesTitle;
    document.getElementById("lblChancesHint").textContent = t.chancesHint;

    document.getElementById("startBtn").textContent = t.startBtn;
    document.getElementById("pauseBtn").textContent = t.pauseBtn;
    document.getElementById("resumeBtn").textContent = t.resumeBtn;
    document.getElementById("resetBtn").textContent = t.resetBtn;
    document.getElementById("plantNewBtn").textContent = t.plantNewBtn;

    dropTitle.textContent = t.dropTitle;
    dropClaimBtn.textContent = t.dropClaim;

    document.getElementById("lblAmbient").textContent = t.ambientLabel;
    ambientSelect.options[0].textContent = t.ambientNone;
    ambientSelect.options[1].textContent = t.ambientRain;
    ambientSelect.options[2].textContent = t.ambientWaves;
    ambientSelect.options[3].textContent = t.ambientForest;
    ambientSelect.options[4].textContent = t.ambientFire;
    ambientSelect.options[5].textContent = t.ambientZen;
    ambientSelect.options[6].textContent = t.ambientWhite;

    document.getElementById("lblStatGrown").textContent = t.grown;
    document.getElementById("lblStatWithered").textContent = t.withered;
    document.getElementById("lblStatMins").textContent = t.focusTime;
    document.getElementById("lblStatRate").textContent = t.successRate;
    document.getElementById("lblAlmanacHeader").textContent = t.almanacHeader;
    document.getElementById("lblAlmanacSubdesc").textContent = t.almanacSubdesc;
    document.getElementById("lblStatsHeader").textContent = t.statsHeader;
    document.getElementById("lblForestHeader").textContent = t.forestHeader;

    // Chart day labels
    if (chartLabels && t.chartDays) {
      chartLabels.innerHTML = t.chartDays.map(d => `<span>${d}</span>`).join("");
    }

    document.getElementById("lblShopTitle").textContent = t.shopTitle;
    document.getElementById("lblShopDesc").textContent = t.shopDesc;

    document.getElementById("lblQuestsHeader").textContent = t.questsHeader;
    document.getElementById("lblTodoHeader").textContent = t.todoHeader;
    todoInput.placeholder = t.todoPlaceholder;
    addTodoBtn.textContent = t.addBtn;

    document.getElementById("lblBlockMode").textContent = t.blockMode;
    blockModeSelect.options[0].textContent = t.blacklistOpt;
    blockModeSelect.options[1].textContent = t.whitelistOpt;
    document.getElementById("lblModeDesc").textContent = t.modeDesc;

    const alertStyleSelect = document.getElementById("alertStyle");
    if (alertStyleSelect && t.lblAlertStyle) {
      document.getElementById("lblAlertStyle").textContent = t.lblAlertStyle;
      alertStyleSelect.options[0].textContent = t.alertStyleBanner;
      alertStyleSelect.options[1].textContent = t.alertStyleFullscreen;
      document.getElementById("lblAlertStyleDesc").textContent = t.lblAlertStyleDesc;
    }

    document.getElementById("lblQuickAddTitle").textContent = t.quickAdd;
    document.getElementById("lblActiveSites").textContent = t.activeSites;
    siteInput.placeholder = t.sitePlaceholder;
    addSiteBtn.textContent = t.addBtn;

    // Meadow Island Localized Text
    if (document.getElementById("lblMeadowTitle")) document.getElementById("lblMeadowTitle").textContent = t.meadowTitle;
    if (document.getElementById("btnFilterMyTrees")) document.getElementById("btnFilterMyTrees").textContent = t.meadowFilterMy || "Мой сад";
    if (document.getElementById("btnFilterShowcase")) document.getElementById("btnFilterShowcase").textContent = t.meadowFilterShowcase || "Все виды ✨";
    if (document.getElementById("goToGardenBtn")) document.getElementById("goToGardenBtn").textContent = t.goToGardenBtn || "🏝️ Открыть изометрический 3D Сад ➔";
    if (document.getElementById("lblMeadowHint")) document.getElementById("lblMeadowHint").textContent = t.meadowHint;
    if (document.getElementById("lblInspectDate")) document.getElementById("lblInspectDate").textContent = t.inspectDate;
    if (document.getElementById("lblInspectDuration")) document.getElementById("lblInspectDuration").textContent = t.inspectDuration;
    if (document.getElementById("btnInspectZoom")) document.getElementById("btnInspectZoom").textContent = t.btnInspectZoom || "🔍 HQ";
    if (document.getElementById("btnOpenHqModal")) document.getElementById("btnOpenHqModal").textContent = t.btnInspectZoom || "🔍 HQ Осмотр";
    if (document.getElementById("lblInspectDuplicates")) document.getElementById("lblInspectDuplicates").textContent = t.lblInspectDuplicates || "🌿 В саду:";
    if (document.getElementById("lblHqDate")) document.getElementById("lblHqDate").textContent = t.lblHqDate || "📅 Выращено";
    if (document.getElementById("lblHqDuration")) document.getElementById("lblHqDuration").textContent = t.lblHqDuration || "⏱ Время фокуса";
    if (document.getElementById("lblHqDuplicates")) document.getElementById("lblHqDuplicates").textContent = t.lblHqDuplicates || "🌿 В коллекции";
    if (document.getElementById("lblHqValue")) document.getElementById("lblHqValue").textContent = t.lblHqValue || "💎 Ценность";

    // Refresh active views
    syncTimerFromStorage();
    if (activeTab === "tabShop") renderShopTab();
    if (activeTab === "tabGarden") renderGardenTab();
    if (activeTab === "tabTasks") renderTasksTab();
    if (activeTab === "tabBlocker") renderBlockerTab();
  }

  langSelect.addEventListener("change", (e) => {
    const lang = e.target.value;
    ext.storage.local.set({ lang }, () => {
      applyLanguage(lang);
    });
  });

  // Time & Chances Synchronizer (Minutes + Seconds)
  function updateCustomDuration(totalSec) {
    selectedDuration = Math.max(10, Math.min(180 * 60, Math.round(Number(totalSec) || 1500)));
    selectedMinutes = Math.floor(selectedDuration / 60);
    selectedSeconds = selectedDuration % 60;

    timeSlider.value = selectedMinutes;
    customMinutesInput.value = selectedMinutes;
    if (customSecondsInput) {
      customSecondsInput.value = selectedSeconds.toString().padStart(2, '0');
    }
    updateTimeDisplay(selectedDuration);

    timePresets.querySelectorAll(".preset-btn").forEach(btn => {
      const btnMins = parseInt(btn.dataset.minutes, 10);
      if (btnMins === selectedMinutes && selectedSeconds === 0) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    const minsForDrop = Math.max(0.5, selectedDuration / 60);
    const chances = calculateDropChances(minsForDrop);
    chanceCommon.textContent = `⚪ ${chances.common}%`;
    chanceUncommon.textContent = `🟢 ${chances.uncommon}%`;
    chanceRare.textContent = `🔵 ${chances.rare}%`;
    chanceEpic.textContent = `🟣 ${chances.epic}%`;
    chanceLegendary.textContent = `🟡 ${chances.legendary}%`;
    chanceMythic.textContent = `✦ ${chances.mythic}%`;

    ext.storage.local.set({ sessionDuration: selectedDuration, secondsRemaining: selectedDuration });
  }

  timeSlider.addEventListener("input", (e) => {
    const mins = Number(e.target.value) || 0;
    updateCustomDuration(mins * 60 + selectedSeconds);
  });

  if (customMinutesInput) {
    customMinutesInput.addEventListener("input", (e) => {
      const mins = Math.max(0, Math.min(180, Number(e.target.value) || 0));
      updateCustomDuration(mins * 60 + selectedSeconds);
    });
  }

  if (customSecondsInput) {
    customSecondsInput.addEventListener("input", (e) => {
      const secs = Math.max(0, Math.min(59, Number(e.target.value) || 0));
      updateCustomDuration(selectedMinutes * 60 + secs);
    });
  }

  timePresets.querySelectorAll(".preset-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const mins = parseInt(btn.dataset.minutes, 10);
      updateCustomDuration(mins * 60);
    });
  });

  // Strict Mode Switch Controller
  if (strictModeToggle) {
    strictModeToggle.addEventListener("change", (e) => {
      const isStrict = e.target.checked;
      strictModeCard.classList.toggle("active", isStrict);
      ext.storage.local.set({ strictMode: isStrict });
    });
  }

  function updateTimeDisplay(totalSeconds) {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    timeDisplay.textContent = `${m}:${s}`;
  }

  function getGrowthStage(progressPct) {
    if (progressPct >= 95) return 5;
    if (progressPct >= 70) return 4;
    if (progressPct >= 45) return 3;
    if (progressPct >= 20) return 2;
    return 1;
  }

  function updateTimerView(remainingSeconds, totalSeconds, skin, state, reason, lastDrop, isStrict = false, treeState = "healthy") {
    const t = i18n[currentLang] || i18n.ru;
    const elapsed = Math.max(0, totalSeconds - remainingSeconds);
    const progress = totalSeconds > 0 ? (elapsed / totalSeconds) : 0;
    const progressPct = Math.min(100, Math.round(progress * 100));

    const offset = RING_CIRCUMFERENCE - (progress * RING_CIRCUMFERENCE);
    progressRing.style.strokeDashoffset = offset;

    // Check Drop Celebration
    if (state === "completed" && lastDrop) {
      dropRevealCard.style.display = "flex";
      const rarityObj = RARITIES[lastDrop.rarity] || RARITIES.common;
      dropRarityBadge.textContent = rarityObj.stars + " " + (rarityObj.name[currentLang] || rarityObj.name.ru).toUpperCase();
      dropRarityBadge.style.background = rarityObj.bg;
      dropRarityBadge.style.color = rarityObj.color;
      dropRarityBadge.style.border = `1px solid ${rarityObj.border}`;

      const skinObj = TREE_SKINS[lastDrop.skin] || TREE_SKINS.oak;
      dropTreeName.textContent = `${skinObj.name[currentLang] || skinObj.name.ru} ${skinObj.emoji}`;
      const unlockNote = lastDrop.isNew ? ` ${t.newTreeUnlocked}` : "";
      dropRewardText.textContent = `+${lastDrop.earnedCoins || 30} 🪙 • +${lastDrop.earnedXp || 50} XP!${unlockNote}`;
    } else {
      dropRevealCard.style.display = "none";
    }

    if (state === "withered") {
      progressRing.style.stroke = "#ef4444";
      progressRing.style.strokeDashoffset = "0";
      treeAvatar.innerHTML = renderTreeSVG(skin, 1, true);
      timerStatus.textContent = t.timerStatusWithered;
      timerStatus.style.color = "#fca5a5";
      timerStatus.style.background = "rgba(239, 68, 68, 0.15)";
      witherAlert.style.display = "block";
      witherReasonText.textContent = reason || t.witherDefaultReason;

      timeConfigSection.style.display = "none";
      startBtn.style.display = "none";
      pauseBtn.style.display = "none";
      resumeBtn.style.display = "none";
      resetBtn.style.display = "none";
      plantNewBtn.style.display = "flex";
      return;
    }

    witherAlert.style.display = "none";

    if (state === "completed") {
      progressRing.style.stroke = "#10b981";
      progressRing.style.strokeDashoffset = "0";
      treeAvatar.innerHTML = renderTreeSVG(skin, 5, false);
      timerStatus.textContent = t.timerStatusCompleted;
      timerStatus.style.color = "#a6e3a1";
      timerStatus.style.background = "rgba(166, 227, 161, 0.15)";

      timeConfigSection.style.display = "none";
      startBtn.style.display = "none";
      pauseBtn.style.display = "none";
      resumeBtn.style.display = "none";
      resetBtn.style.display = "none";
      plantNewBtn.style.display = "flex";
      return;
    }

    if (state === "running") {
      progressRing.style.stroke = isStrict ? "#f38ba8" : "#10b981";
      const stage = getGrowthStage(progressPct);
      const isWitheredVisual = treeState === "withered";
      treeAvatar.innerHTML = renderTreeSVG(skin, isWitheredVisual ? 1 : stage, isWitheredVisual);

      timeConfigSection.style.display = "none";
      startBtn.style.display = "none";
      resumeBtn.style.display = "none";
      plantNewBtn.style.display = "none";

      if (isStrict) {
        timerStatus.textContent = `🔒 ${t.strictStatusRunning} (${progressPct}%)`;
        timerStatus.style.color = "#f38ba8";
        timerStatus.style.background = "rgba(243, 139, 168, 0.15)";
        pauseBtn.style.display = "none";
        resetBtn.style.display = "none";
      } else {
        timerStatus.textContent = `${t.timerStatusRunning} (${progressPct}%)`;
        timerStatus.style.color = "#94e2d5";
        timerStatus.style.background = "rgba(148, 226, 213, 0.12)";
        pauseBtn.style.display = "flex";
        resetBtn.style.display = "flex";
      }
      return;
    }

    if (state === "paused") {
      progressRing.style.stroke = "#f59e0b";
      const stage = getGrowthStage(progressPct);
      treeAvatar.innerHTML = renderTreeSVG(skin, stage, false);
      timerStatus.textContent = t.timerStatusPaused;
      timerStatus.style.color = "#f9e2af";
      timerStatus.style.background = "rgba(249, 226, 175, 0.15)";

      timeConfigSection.style.display = "none";
      startBtn.style.display = "none";
      pauseBtn.style.display = "none";
      resumeBtn.style.display = "flex";
      resetBtn.style.display = "flex";
      plantNewBtn.style.display = "none";
      return;
    }

    // IDLE State
    progressRing.style.stroke = "#10b981";
    progressRing.style.strokeDashoffset = `${RING_CIRCUMFERENCE}`;
    treeAvatar.innerHTML = renderTreeSVG(skin, 1, false);
    timerStatus.textContent = t.timerStatusIdle;
    timerStatus.style.color = "#bac2de";
    timerStatus.style.background = "rgba(255, 255, 255, 0.05)";

    timeConfigSection.style.display = "flex";
    startBtn.style.display = "flex";
    pauseBtn.style.display = "none";
    resumeBtn.style.display = "none";
    resetBtn.style.display = "none";
    plantNewBtn.style.display = "none";
  }

  // Dismiss/Claim Drop celebration card
  function dismissDropCard() {
    dropRevealCard.style.display = "none";
    ext.storage.local.set({ lastDrop: null });
  }

  // Claim Drop button: dismiss reveal card immediately and view tree in garden!
  dropClaimBtn.addEventListener("click", () => {
    dismissDropCard();
    tabBtns.forEach(b => b.classList.remove("active"));
    tabContents.forEach(c => c.classList.remove("active"));
    const gBtn = document.getElementById("tGardenBtn");
    if (gBtn) gBtn.classList.add("active");
    const gTab = document.getElementById("tabGarden");
    if (gTab) gTab.classList.add("active");
    activeTab = "tabGarden";
    renderGardenTab();
  });

  const dropCloseBtn = document.getElementById("dropCloseBtn");
  if (dropCloseBtn) {
    dropCloseBtn.addEventListener("click", () => {
      dismissDropCard();
    });
  }

  // Synchronize Timer from Storage
  function syncTimerFromStorage() {
    ext.storage.local.get([
      "timerState", "sessionStartTime", "sessionDuration", "sessionEndTime",
      "secondsRemaining", "selectedSkin", "witherReason", "coins", "level", "lastDrop",
      "strictMode", "treeState"
    ], (data) => {
      const state = data.timerState || "idle";
      const totalSec = data.sessionDuration || selectedDuration;
      const skin = data.selectedSkin || "oak";
      const reason = data.witherReason || "";
      const lastDrop = data.lastDrop || null;
      const isStrict = !!data.strictMode;
      const treeState = data.treeState || "healthy";
      const t = i18n[currentLang] || i18n.ru;

      if (strictModeToggle) {
        strictModeToggle.checked = isStrict;
        strictModeToggle.disabled = (state === "running");
      }
      if (strictModeCard) {
        strictModeCard.classList.toggle("active", isStrict);
      }

      coinsCount.textContent = data.coins || 0;
      const lvl = data.level || 1;
      userLevelBadge.textContent = t.userLevel(lvl);

      if (state === "running" && data.sessionEndTime) {
        const remainingMs = data.sessionEndTime - Date.now();
        if (remainingMs <= 0) {
          updateTimeDisplay(0);
          updateTimerView(0, totalSec, skin, "completed", "", lastDrop, isStrict, treeState);
        } else {
          const remainingSec = Math.round(remainingMs / 1000);
          updateTimeDisplay(remainingSec);
          updateTimerView(remainingSec, totalSec, skin, "running", "", null, isStrict, treeState);
        }
      } else if (state === "paused") {
        const rem = data.secondsRemaining || totalSec;
        updateTimeDisplay(rem);
        updateTimerView(rem, totalSec, skin, "paused", "", null, isStrict, treeState);
      } else if (state === "withered") {
        updateTimeDisplay(0);
        updateTimerView(0, totalSec, skin, "withered", reason, null, isStrict, treeState);
      } else if (state === "completed") {
        updateTimeDisplay(0);
        updateTimerView(0, totalSec, skin, "completed", "", lastDrop, isStrict, treeState);
      } else {
        // Idle
        updateTimeDisplay(totalSec);
        updateTimerView(totalSec, totalSec, skin, "idle", "", null, isStrict, treeState);
        updateCustomDuration(totalSec);
      }
    });
  }

  // Start continuous 1s ticker for countdown
  if (timerTicker) clearInterval(timerTicker);
  timerTicker = setInterval(() => {
    ext.storage.local.get([
      "timerState", "sessionEndTime", "sessionDuration", "selectedSkin",
      "lastDrop", "strictMode", "treeState"
    ], (data) => {
      if (data.timerState === "running" && data.sessionEndTime) {
        const remainingMs = data.sessionEndTime - Date.now();
        const totalSec = data.sessionDuration || 1500;
        const skin = data.selectedSkin || "oak";
        const isStrict = !!data.strictMode;
        const treeState = data.treeState || "healthy";

        if (remainingMs <= 0) {
          updateTimeDisplay(0);
          updateTimerView(0, totalSec, skin, "completed", "", data.lastDrop, isStrict, treeState);
        } else {
          const remainingSec = Math.round(remainingMs / 1000);
          updateTimeDisplay(remainingSec);
          updateTimerView(remainingSec, totalSec, skin, "running", "", null, isStrict, treeState);
        }
      }
    });
  }, 1000);

  // Timer Button Actions
  startBtn.addEventListener("click", () => {
    const isStrict = strictModeToggle ? strictModeToggle.checked : false;
    ext.runtime.sendMessage({
      action: "START_TIMER",
      duration: selectedDuration,
      strictMode: isStrict
    }, () => {
      syncTimerFromStorage();
    });
  });

  pauseBtn.addEventListener("click", () => {
    ext.runtime.sendMessage({ action: "PAUSE_TIMER" }, () => {
      syncTimerFromStorage();
    });
  });

  resumeBtn.addEventListener("click", () => {
    ext.runtime.sendMessage({ action: "RESUME_TIMER" }, () => {
      syncTimerFromStorage();
    });
  });

  resetBtn.addEventListener("click", () => {
    ext.runtime.sendMessage({ action: "RESET_TIMER" }, () => {
      syncTimerFromStorage();
    });
  });

  plantNewBtn.addEventListener("click", () => {
    dismissDropCard();
    ext.runtime.sendMessage({ action: "RESET_TIMER" }, () => {
      syncTimerFromStorage();
    });
  });

  // Ambient Sound Controller (Persists in background & offscreen document)
  ambientSelect.addEventListener("change", (e) => {
    const val = e.target.value;
    weatherEffects.setWeather(val);
    ext.runtime.sendMessage({ action: "SET_AMBIENT_SOUND", soundType: val });
  });

  // -------------------------------------------------------------
  // TAB 2: 3D ISOMETRIC VIRTUAL GARDEN & RARITIES ALMANAC
  // -------------------------------------------------------------
  let activeMeadowFilter = "my";

  const btnFilterMyTrees = document.getElementById("btnFilterMyTrees");
  const btnFilterShowcase = document.getElementById("btnFilterShowcase");
  const inspectorCloseBtn = document.getElementById("inspectorCloseBtn");
  const treeInspectorModal = document.getElementById("treeInspectorModal");
  const meadowViewport = document.getElementById("meadowViewport");
  const goToGardenBtn = document.getElementById("goToGardenBtn");

  if (goToGardenBtn) {
    goToGardenBtn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      tabContents.forEach(c => c.classList.remove("active"));
      const gBtn = document.getElementById("tGardenBtn");
      if (gBtn) gBtn.classList.add("active");
      const gTab = document.getElementById("tabGarden");
      if (gTab) gTab.classList.add("active");
      activeTab = "tabGarden";
      renderGardenTab();
    });
  }

  if (btnFilterMyTrees) {
    btnFilterMyTrees.addEventListener("click", () => {
      activeMeadowFilter = "my";
      btnFilterMyTrees.classList.add("active");
      if (btnFilterShowcase) btnFilterShowcase.classList.remove("active");
      renderGardenTab();
    });
  }

  if (btnFilterShowcase) {
    btnFilterShowcase.addEventListener("click", () => {
      activeMeadowFilter = "showcase";
      btnFilterShowcase.classList.add("active");
      if (btnFilterMyTrees) btnFilterMyTrees.classList.remove("active");
      renderGardenTab();
    });
  }

  if (inspectorCloseBtn) {
    inspectorCloseBtn.addEventListener("click", () => {
      if (treeInspectorModal) treeInspectorModal.style.display = "none";
      document.querySelectorAll(".iso-tree-sprite.inspected").forEach(el => el.classList.remove("inspected"));
    });
  }

  if (meadowViewport) {
    meadowViewport.addEventListener("click", (e) => {
      if (!e.target.closest(".iso-tree-sprite") && !e.target.closest(".iso-tile-poly") && !e.target.closest(".tree-inspector-modal")) {
        if (treeInspectorModal) treeInspectorModal.style.display = "none";
        document.querySelectorAll(".iso-tree-sprite.inspected").forEach(el => el.classList.remove("inspected"));
      }
    });
  }

  // Helper: Price of selling a duplicate tree
  function getTreeSellPrice(tree) {
    if (!tree) return 15;
    if (tree.status === "withered") return 5;
    const skin = TREE_SKINS[tree.skin];
    if (!skin) return 15;
    const rarityMin = {
      common: 15,
      uncommon: 35,
      rare: 80,
      epic: 160,
      legendary: 300,
      mythic: 500
    };
    const base = skin.price ? Math.round(skin.price * 0.45) : 0;
    return Math.max(rarityMin[skin.rarity] || 15, base);
  }

  // Helper: Calculate total duplicates in user's forest
  function getForestDuplicatesSummary(forest) {
    const skinCounts = {};
    forest.forEach(f => {
      if (f.status !== "withered") {
        skinCounts[f.skin] = (skinCounts[f.skin] || 0) + 1;
      }
    });

    let duplicateCount = 0;
    let totalSellCoins = 0;

    Object.entries(skinCounts).forEach(([skinKey, count]) => {
      if (count > 1) {
        const excess = count - 1;
        duplicateCount += excess;
        const sObj = TREE_SKINS[skinKey] || {};
        const sampleTree = { skin: skinKey, rarity: sObj.rarity, status: "completed" };
        totalSellCoins += excess * getTreeSellPrice(sampleTree);
      }
    });

    return { duplicateCount, totalSellCoins };
  }

  // Toast Notification System
  function showToast(message) {
    let toast = document.getElementById("fpToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "fpToast";
      toast.style.position = "fixed";
      toast.style.top = "18px";
      toast.style.left = "50%";
      toast.style.transform = "translateX(-50%) translateY(-24px)";
      toast.style.background = "linear-gradient(135deg, rgba(24, 24, 37, 0.98) 0%, rgba(30, 30, 46, 0.98) 100%)";
      toast.style.border = "1.5px solid var(--accent-mint)";
      toast.style.color = "#fff";
      toast.style.padding = "8px 16px";
      toast.style.borderRadius = "20px";
      toast.style.fontSize = "0.78rem";
      toast.style.fontWeight = "700";
      toast.style.zIndex = "99999";
      toast.style.boxShadow = "0 8px 24px rgba(0,0,0,0.65), 0 0 16px rgba(148, 226, 213, 0.35)";
      toast.style.transition = "all 0.28s cubic-bezier(0.16, 1, 0.3, 1)";
      toast.style.opacity = "0";
      toast.style.pointerEvents = "none";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.opacity = "1";
    toast.style.transform = "translateX(-50%) translateY(0)";

    if (window._toastTimer) clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(-50%) translateY(-24px)";
    }, 2800);
  }

  // Sell individual duplicate tree
  function sellDuplicateTree(tree, sellPrice) {
    const t = i18n[currentLang] || i18n.ru;
    ext.storage.local.get(["forest", "coins"], (data) => {
      let forest = Array.isArray(data.forest) ? [...data.forest] : [];
      let currentCoins = Number(data.coins) || 0;

      let targetIdx = -1;
      if (tree.id) {
        targetIdx = forest.findIndex(f => f.id === tree.id);
      }
      if (targetIdx === -1) {
        if (tree.status === "withered") {
          targetIdx = forest.findIndex(f => f.skin === tree.skin && f.status === "withered");
        } else {
          targetIdx = forest.findIndex(f => f.skin === tree.skin && f.status !== "withered");
        }
      }

      if (targetIdx !== -1) {
        forest.splice(targetIdx, 1);
        const newCoins = currentCoins + sellPrice;

        ext.storage.local.set({ forest, coins: newCoins }, () => {
          if (typeof soundManager !== "undefined" && soundManager.playCoinSound) {
            soundManager.playCoinSound();
          }
          if (coinsCount) coinsCount.textContent = newCoins;

          const skinObj = TREE_SKINS[tree.skin] || TREE_SKINS.oak;
          const treeName = skinObj.name[currentLang] || skinObj.name.ru;
          showToast(t.toastSoldSuccess ? t.toastSoldSuccess(treeName, sellPrice) : `+${sellPrice} 🪙`);

          if (treeInspectorModal) treeInspectorModal.style.display = "none";
          const hqModal = document.getElementById("hqTreeModal");
          if (hqModal) hqModal.style.display = "none";

          renderGardenTab();
        });
      }
    });
  }

  // Open Full High-Quality Detail Modal (HQ Zoom View)
  function openHqTreeModal(tree, isWithered, fullDateStr, duplicateCount, sellPrice) {
    const hqModal = document.getElementById("hqTreeModal");
    const hqRarity = document.getElementById("hqRarityBadge");
    const hqTitle = document.getElementById("hqTreeTitle");
    const hqDesc = document.getElementById("hqTreeDesc");
    const hqHero = document.getElementById("hqTreeHero");
    const hqGlow = document.getElementById("hqAmbientGlow");
    const hqDate = document.getElementById("hqTreeDate");
    const hqDur = document.getElementById("hqTreeDuration");
    const hqDup = document.getElementById("hqTreeDuplicates");
    const hqVal = document.getElementById("hqTreeValue");
    const hqSell = document.getElementById("hqSellBtn");
    const hqSellText = document.getElementById("hqSellBtnText");
    const hqClose = document.getElementById("hqCloseBtn");
    const hqBack = document.getElementById("hqBackBtn");
    const t = i18n[currentLang] || i18n.ru;

    if (!hqModal) return;

    const skinObj = TREE_SKINS[tree.skin] || TREE_SKINS.oak;
    const rarityObj = RARITIES[tree.rarity] || RARITIES.common;

    if (hqRarity) {
      hqRarity.textContent = `${rarityObj.stars} ${rarityObj.name[currentLang] || rarityObj.name.ru}`.toUpperCase();
      hqRarity.style.background = rarityObj.bg;
      hqRarity.style.color = rarityObj.color;
      hqRarity.style.border = `1px solid ${rarityObj.border}`;
    }

    if (hqTitle) {
      hqTitle.textContent = `${skinObj.name[currentLang] || skinObj.name.ru} ${skinObj.emoji}`;
    }

    if (hqDesc) {
      hqDesc.textContent = (skinObj.desc && (skinObj.desc[currentLang] || skinObj.desc.ru)) || "";
    }

    if (hqHero) {
      hqHero.innerHTML = renderTreeSVG(tree.skin, 5, isWithered);
    }

    if (hqGlow) {
      const glowColor = rarityObj.color || "#a6e3a1";
      hqGlow.style.background = `radial-gradient(circle, ${glowColor} 0%, rgba(16, 185, 129, 0.15) 50%, transparent 70%)`;
    }

    if (hqDate) hqDate.textContent = fullDateStr || "—";
    if (hqDur) hqDur.textContent = `${tree.duration || 0} ${t.minuteUnit}`;
    if (hqDup) hqDup.textContent = t.duplicateCount ? t.duplicateCount(duplicateCount) : `${duplicateCount} шт.`;
    if (hqVal) hqVal.textContent = `+${sellPrice} 🪙`;

    if (hqSell) {
      if (!tree.isShowcase && !tree.isStarter && (duplicateCount > 1 || isWithered)) {
        hqSell.style.display = "inline-flex";
        if (hqSellText) {
          hqSellText.textContent = isWithered
            ? (t.recycleWitheredBtn ? t.recycleWitheredBtn(sellPrice) : `Убрать завядшее (+${sellPrice} 🪙)`)
            : (t.sellDuplicateBtn ? t.sellDuplicateBtn(sellPrice) : `Продать дубликат (+${sellPrice} 🪙)`);
        }
        hqSell.onclick = (e) => {
          e.stopPropagation();
          sellDuplicateTree(tree, sellPrice);
          hqModal.style.display = "none";
        };
      } else {
        hqSell.style.display = "none";
      }
    }

    const closeHq = () => { hqModal.style.display = "none"; };
    if (hqClose) hqClose.onclick = closeHq;
    if (hqBack) hqBack.onclick = closeHq;

    hqModal.style.display = "flex";
  }

  // 3D Isometric 2.5D Island Garden Renderer
  function renderLivingMeadow(forest, t, selectedSkin = "oak") {
    const cliffBase = document.getElementById("isoCliffBase");
    const tilesGroup = document.getElementById("isoTilesGroup");
    const treesContainer = document.getElementById("isoTreesContainer");
    const stageBadge = document.getElementById("meadowStageBadge");
    const modal = document.getElementById("treeInspectorModal");
    const previewEl = document.getElementById("inspectorTreePreview");
    const pillEl = document.getElementById("inspectorRarityPill");
    const titleEl = document.getElementById("inspectorTreeTitle");
    const dateEl = document.getElementById("inspectTreeDate");
    const durEl = document.getElementById("inspectTreeDuration");
    const statusEl = document.getElementById("inspectTreeStatus");

    if (!cliffBase || !tilesGroup || !treesContainer) return;

    cliffBase.innerHTML = "";
    tilesGroup.innerHTML = "";
    treesContainer.innerHTML = "";
    if (modal) modal.style.display = "none";

    const isShowcase = activeMeadowFilter === "showcase";
    const totalGrown = forest.length;

    // Stage milestone calculation
    if (stageBadge) {
      if (isShowcase) {
        stageBadge.textContent = `✨ ${t.showcaseBadge || "Все 12 видов деревьев"}`;
      } else {
        let stageName = t.meadowStage0 || "🌱 Начальный сад";
        if (totalGrown >= 16) stageName = t.meadowStage5 || "🏰 Заповедник";
        else if (totalGrown >= 10) stageName = t.meadowStage4 || "🌲 Густой лес";
        else if (totalGrown >= 5) stageName = t.meadowStage3 || "🌳 Роща";
        else if (totalGrown >= 2) stageName = t.meadowStage2 || "🌿 Полянка";
        else if (totalGrown === 1) stageName = t.meadowStage1 || "🌱 Росток";

        stageBadge.textContent = `${stageName} (${totalGrown}/16)`;
      }
    }

    // Bulk Sell All Duplicates Button in header
    const btnSellAllDuplicates = document.getElementById("btnSellAllDuplicates");
    if (btnSellAllDuplicates) {
      if (!isShowcase && totalGrown > 1) {
        const dupSummary = getForestDuplicatesSummary(forest);
        if (dupSummary.duplicateCount > 0) {
          btnSellAllDuplicates.style.display = "inline-flex";
          btnSellAllDuplicates.textContent = t.sellAllDuplicatesBtn
            ? t.sellAllDuplicatesBtn(dupSummary.duplicateCount, dupSummary.totalSellCoins)
            : `💰 Продать дубликаты (${dupSummary.duplicateCount})`;

          btnSellAllDuplicates.onclick = () => {
            const confirmMsg = t.confirmSellAll
              ? t.confirmSellAll(dupSummary.duplicateCount, dupSummary.totalSellCoins)
              : `Продать все ${dupSummary.duplicateCount} дубликатов за +${dupSummary.totalSellCoins} монет?`;
            if (confirm(confirmMsg)) {
              ext.storage.local.get(["forest", "coins"], (data) => {
                let fList = Array.isArray(data.forest) ? [...data.forest] : [];
                let currentCoins = Number(data.coins) || 0;
                const keptSkins = new Set();
                const newForest = [];
                let removedCount = 0;

                fList.forEach(item => {
                  if (item.status === "withered") {
                    newForest.push(item);
                  } else if (!keptSkins.has(item.skin)) {
                    keptSkins.add(item.skin);
                    newForest.push(item);
                  } else {
                    removedCount++;
                  }
                });

                const newCoins = currentCoins + dupSummary.totalSellCoins;
                ext.storage.local.set({ forest: newForest, coins: newCoins }, () => {
                  if (typeof soundManager !== "undefined" && soundManager.playCoinSound) {
                    soundManager.playCoinSound();
                  }
                  if (coinsCount) coinsCount.textContent = newCoins;
                  showToast(t.toastSoldAllSuccess ? t.toastSoldAllSuccess(removedCount, dupSummary.totalSellCoins) : `+${dupSummary.totalSellCoins} 🪙`);
                  renderGardenTab();
                });
              });
            }
          };
        } else {
          btnSellAllDuplicates.style.display = "none";
        }
      } else {
        btnSellAllDuplicates.style.display = "none";
      }
    }

    // Bulk Sell All Withered Trees Button in header
    const btnSellAllWithered = document.getElementById("btnSellAllWithered");
    if (btnSellAllWithered) {
      if (!isShowcase) {
        const witheredTrees = forest.filter(f => f.status === "withered");
        const witheredCount = witheredTrees.length;
        if (witheredCount > 0) {
          const totalWitheredCoins = witheredCount * 5;
          btnSellAllWithered.style.display = "inline-flex";
          btnSellAllWithered.textContent = t.sellAllWitheredBtn
            ? t.sellAllWitheredBtn(witheredCount, totalWitheredCoins)
            : `🥀 Продать засохшие (${witheredCount} шт. • +${totalWitheredCoins} 🪙)`;

          btnSellAllWithered.onclick = () => {
            const confirmMsg = t.confirmSellAllWithered
              ? t.confirmSellAllWithered(witheredCount, totalWitheredCoins)
              : `Убрать и переработать все ${witheredCount} засохших деревьев за +${totalWitheredCoins} монет?`;
            if (confirm(confirmMsg)) {
              ext.storage.local.get(["forest", "coins"], (data) => {
                let fList = Array.isArray(data.forest) ? [...data.forest] : [];
                let currentCoins = Number(data.coins) || 0;
                const newForest = fList.filter(item => item.status !== "withered");
                const newCoins = currentCoins + totalWitheredCoins;

                ext.storage.local.set({ forest: newForest, coins: newCoins }, () => {
                  if (typeof soundManager !== "undefined" && soundManager.playCoinSound) {
                    soundManager.playCoinSound();
                  }
                  if (coinsCount) coinsCount.textContent = newCoins;
                  showToast(t.toastSoldWitheredSuccess ? t.toastSoldWitheredSuccess(witheredCount, totalWitheredCoins) : `+${totalWitheredCoins} 🪙`);
                  renderGardenTab();
                });
              });
            }
          };
        } else {
          btnSellAllWithered.style.display = "none";
        }
      } else {
        btnSellAllWithered.style.display = "none";
      }
    }

    // Determine what trees to place on the 16 tiles (4x4)
    let tilesData = new Array(16).fill(null);

    if (isShowcase) {
      // Showcase all 16 unique tree varieties (full 4x4 grid!)
      const showcaseSkins = [
        "oak", "birch", "pine", "apple", "orange_tree",
        "sakura", "bamboo", "jacaranda",
        "wisteria", "autumn_maple", "golden_ginkgo", "cyber_neon",
        "world_tree", "crystal", "volcano_magma", "celestial_starlight"
      ];
      showcaseSkins.forEach((skinKey, i) => {
        const sObj = TREE_SKINS[skinKey] || TREE_SKINS.oak;
        tilesData[i] = {
          skin: skinKey,
          rarity: sObj.rarity,
          status: "completed",
          duration: 30 + (i * 10),
          date: new Date().toISOString(),
          isShowcase: true
        };
      });
    } else {
      // Real user forest: if 0 trees, plant active tree in center tile (tile 5)
      if (forest.length === 0) {
        const activeObj = TREE_SKINS[selectedSkin] || TREE_SKINS.oak;
        tilesData[5] = {
          skin: selectedSkin,
          rarity: activeObj.rarity,
          status: "completed",
          duration: 25,
          date: new Date().toISOString(),
          isStarter: true
        };
      } else {
        // Place recent trees into the grid
        const recent = [...forest].slice(-16);
        recent.forEach((tree, i) => {
          tilesData[i] = tree;
        });
      }
    }

    // Render 3D Earth / Cliff Extrusion under the island
    cliffBase.innerHTML = `
      <!-- Deep 3D Left Cliff Wall -->
      <polygon points="36,126 188,206 188,238 36,158" fill="url(#cliffLeft)" />
      <!-- Deep 3D Right Cliff Wall -->
      <polygon points="188,206 340,126 340,158 188,238" fill="url(#cliffRight)" />
      <!-- Cliff Strata Accent Lines -->
      <polygon points="36,134 188,214 188,220 36,140" fill="#1e293b" opacity="0.6" />
      <polygon points="188,214 340,134 340,140 188,220" fill="#0f172a" opacity="0.6" />
      <!-- Mossy Grass Overhang Lip -->
      <path d="M 36,126 Q 74,148 112,165 Q 150,188 188,206 Q 226,188 264,165 Q 302,148 340,126 L 340,131 Q 302,153 264,170 Q 226,193 188,211 Q 150,193 112,170 Q 74,153 36,131 Z" fill="#059669" opacity="0.9" />
    `;

    // Render 16 Isometric Grass Diamond Tiles & Standing Trees
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        const i = r * 4 + c;
        const tree = tilesData[i];

        // Isometric projection formulas:
        const cx = 188 + (c - r) * 38;
        const cy = 66 + (c + r) * 20;

        // Diamond vertices: (top, right, bottom, left)
        const pTop = `${cx},${cy - 20}`;
        const pRight = `${cx + 38},${cy}`;
        const pBottom = `${cx},${cy + 20}`;
        const pLeft = `${cx - 38},${cy}`;
        const polyPoints = `${pTop} ${pRight} ${pBottom} ${pLeft}`;

        const fillGrad = (r + c) % 2 === 0 ? "url(#grassGradA)" : "url(#grassGradB)";

        // SVG Diamond Polygon
        const poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        poly.setAttribute("points", polyPoints);
        poly.setAttribute("fill", fillGrad);
        poly.setAttribute("stroke", "rgba(255, 255, 255, 0.28)");
        poly.setAttribute("stroke-width", "1");
        poly.setAttribute("class", "iso-tile-poly");
        poly.dataset.slot = i + 1;
        tilesGroup.appendChild(poly);

        // Center Soil Plot Ellipse
        const plot = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        plot.setAttribute("cx", cx);
        plot.setAttribute("cy", cy);
        plot.setAttribute("rx", "16");
        plot.setAttribute("ry", "8");
        plot.setAttribute("fill", "rgba(6, 78, 59, 0.45)");
        plot.setAttribute("stroke", "rgba(255, 255, 255, 0.2)");
        plot.setAttribute("stroke-width", "1");
        plot.setAttribute("stroke-dasharray", "2,2");
        plot.setAttribute("class", "iso-tile-plot");
        tilesGroup.appendChild(plot);

        // Click handler on plot/tile when empty
        if (!tree) {
          poly.addEventListener("click", (e) => {
            e.stopPropagation();
            document.querySelectorAll(".iso-tree-sprite.inspected").forEach(el => el.classList.remove("inspected"));
            if (modal) {
              modal.style.display = "block";
              if (previewEl) previewEl.innerHTML = renderStage1(selectedSkin);
              if (pillEl) {
                pillEl.textContent = "СВОБОДНЫЙ УЧАСТОК";
                pillEl.style.background = "rgba(166, 227, 161, 0.15)";
                pillEl.style.color = "#a6e3a1";
                pillEl.style.border = "1px solid #a6e3a1";
              }
              if (titleEl) titleEl.textContent = `Грядка #${i + 1} 🌱`;
              if (dateEl) dateEl.textContent = "Ждёт семян";
              if (durEl) durEl.textContent = "—";
              if (statusEl) {
                statusEl.textContent = "Запустите таймер фокуса, чтобы посадить здесь дерево!";
                statusEl.className = "inspector-status-badge";
              }

              // Hide duplicate info and buttons for empty plots
              const duplicatesRowEl = document.getElementById("inspectDuplicatesRow");
              if (duplicatesRowEl) duplicatesRowEl.style.display = "none";
              const btnSell = document.getElementById("btnSellDuplicate");
              if (btnSell) btnSell.style.display = "none";
              const btnOpenHq = document.getElementById("btnOpenHqModal");
              if (btnOpenHq) btnOpenHq.style.display = "none";
            }
          });
        } else {
          // Tree is planted on this tile
          const isWithered = tree.status === "withered";
          const skinObj = TREE_SKINS[tree.skin] || TREE_SKINS.oak;
          const rarityObj = RARITIES[tree.rarity] || RARITIES.common;

          // Glow class based on rarity
          let glowClass = "";
          if (tree.rarity === "rare") glowClass = "rare-neon";
          else if (tree.rarity === "epic") glowClass = "epic-crystal";
          else if (["legendary", "mythic"].includes(tree.rarity)) glowClass = "legendary-cosmic";

          // Tree Sprite DOM Element (Upright in 2D Screen Space, NO Squashing!)
          const treeSprite = document.createElement("div");
          treeSprite.className = `iso-tree-sprite ${glowClass}`;
          treeSprite.dataset.slot = i + 1;
          treeSprite.style.left = `${cx}px`;
          treeSprite.style.top = `${cy}px`;
          // Depth sort: tiles further down the screen (larger r+c) occlude tiles in back
          treeSprite.style.zIndex = (r + c) * 10 + 5;

          // Staggered wind sway animation
          const swayDelay = -((i * 0.45) % 3.8).toFixed(2);
          treeSprite.style.animationDelay = `${swayDelay}s`;

          // Tree contact shadow directly under the trunk
          const shadowEl = document.createElement("div");
          shadowEl.className = "tree-contact-shadow";
          treeSprite.appendChild(shadowEl);

          // Full SVG Tree Graphics
          const svgWrap = document.createElement("div");
          svgWrap.style.width = "100%";
          svgWrap.style.height = "100%";
          svgWrap.innerHTML = renderTreeSVG(tree.skin, 5, isWithered);
          treeSprite.appendChild(svgWrap);

          treesContainer.appendChild(treeSprite);

          // Date & Time formatting
          const dateStr = tree.date ? new Date(tree.date).toLocaleDateString() : "";
          const timeStr = tree.date ? new Date(tree.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "";
          const fullDateStr = `${dateStr} ${timeStr}`.trim();

          // Inspection function
          const triggerInspect = (e) => {
            e.stopPropagation();
            document.querySelectorAll(".iso-tree-sprite.inspected").forEach(el => el.classList.remove("inspected"));
            treeSprite.classList.add("inspected");

            if (modal) {
              modal.style.display = "block";
              if (previewEl) {
                previewEl.innerHTML = renderTreeSVG(tree.skin, 5, isWithered);
              }
              if (pillEl) {
                pillEl.textContent = `${rarityObj.stars} ${rarityObj.name[currentLang] || rarityObj.name.ru}`.toUpperCase();
                pillEl.style.background = rarityObj.bg;
                pillEl.style.color = rarityObj.color;
                pillEl.style.border = `1px solid ${rarityObj.border}`;
              }
              if (titleEl) {
                titleEl.textContent = `${skinObj.name[currentLang] || skinObj.name.ru} ${skinObj.emoji}`;
              }
              if (dateEl) {
                dateEl.textContent = fullDateStr || "—";
              }
              if (durEl) {
                durEl.textContent = `${tree.duration || 0} ${t.minuteUnit}`;
              }
              if (statusEl) {
                statusEl.textContent = isWithered
                  ? (tree.reason ? `🥀 ${t.withered}: ${tree.reason}` : `🥀 ${t.inspectStatusWithered}`)
                  : (tree.isStarter ? `🌱 Ваш саженец (готов к росту!)` : `🌱 ${t.inspectStatusGrown}`);
                statusEl.className = `inspector-status-badge ${isWithered ? "withered" : ""}`;
              }

              // Duplicates Count Display
              const sameSkinTrees = forest.filter(f => f.skin === tree.skin && f.status !== "withered");
              const duplicateCount = sameSkinTrees.length;
              const duplicatesValEl = document.getElementById("inspectDuplicatesVal");
              const duplicatesRowEl = document.getElementById("inspectDuplicatesRow");
              if (duplicatesValEl && duplicatesRowEl) {
                if (isShowcase || tree.isStarter) {
                  duplicatesRowEl.style.display = "none";
                } else {
                  duplicatesRowEl.style.display = "flex";
                  duplicatesValEl.textContent = t.duplicateCount ? t.duplicateCount(duplicateCount) : `${duplicateCount} шт.`;
                }
              }

              // Sell Duplicate Button
              const btnSell = document.getElementById("btnSellDuplicate");
              const lblSell = document.getElementById("lblSellDuplicate");
              const sellPrice = getTreeSellPrice(tree);
              if (btnSell) {
                if (!isShowcase && !tree.isStarter && (duplicateCount > 1 || isWithered)) {
                  btnSell.style.display = "inline-flex";
                  const btnText = isWithered
                    ? (t.recycleWitheredBtn ? t.recycleWitheredBtn(sellPrice) : `Убрать завядшее (+${sellPrice} 🪙)`)
                    : (t.sellDuplicateBtn ? t.sellDuplicateBtn(sellPrice) : `Продать дубликат (+${sellPrice} 🪙)`);
                  if (lblSell) lblSell.textContent = btnText;
                  else btnSell.textContent = `💰 ${btnText}`;

                  btnSell.onclick = (ev) => {
                    ev.stopPropagation();
                    sellDuplicateTree(tree, sellPrice);
                  };
                } else {
                  btnSell.style.display = "none";
                }
              }

              // Open HQ Zoom View Handlers
              const openHqAction = (ev) => {
                ev.stopPropagation();
                openHqTreeModal(tree, isWithered, fullDateStr, duplicateCount, sellPrice);
              };

              const btnZoom = document.getElementById("btnInspectZoom");
              const btnOpenHq = document.getElementById("btnOpenHqModal");
              const previewWrap = document.getElementById("inspectorPreviewWrap");

              if (btnZoom) btnZoom.onclick = openHqAction;
              if (btnOpenHq) {
                btnOpenHq.style.display = "inline-flex";
                btnOpenHq.onclick = openHqAction;
              }
              if (previewWrap) previewWrap.onclick = openHqAction;
            }
          };

          treeSprite.addEventListener("click", triggerInspect);
          poly.addEventListener("click", triggerInspect);
        }
      }
    }
  }

  function renderGardenTab() {
    ext.storage.local.get(["forest", "stats", "unlockedSkins", "selectedSkin"], (data) => {
      const forest = Array.isArray(data.forest) ? data.forest : [];
      const stats = data.stats || {
        totalSessions: 0,
        completedSessions: 0,
        witheredSessions: 0,
        totalFocusMinutes: 0,
        dailyStats: [0, 0, 0, 0, 0, 0, 0]
      };
      const unlocked = Array.isArray(data.unlockedSkins) ? data.unlockedSkins : ["oak"];
      const currentSelected = data.selectedSkin || "oak";
      const t = i18n[currentLang] || i18n.ru;

      const grown = stats.completedSessions || 0;
      const withered = stats.witheredSessions || 0;
      const total = grown + withered;
      const rate = total > 0 ? Math.round((grown / total) * 100) : 100;

      statGrown.textContent = grown;
      statWithered.textContent = withered;
      statMinutes.textContent = `${stats.totalFocusMinutes || 0}m`;
      statRate.textContent = `${rate}%`;

      // Render Interactive 3D Isometric Living Meadow Island
      renderLivingMeadow(forest, t, currentSelected);

      // Render Rarities Almanac
      const allSkins = Object.values(TREE_SKINS);
      almanacCounter.textContent = `${unlocked.length} / ${allSkins.length} ${t.almanacUnlocked}`;
      almanacGrid.innerHTML = "";

      allSkins.forEach(skin => {
        const isOwned = unlocked.includes(skin.id);
        const isEquipped = currentSelected === skin.id;
        const rarityObj = RARITIES[skin.rarity] || RARITIES.common;

        const item = document.createElement("div");
        item.className = `almanac-item ${isOwned ? "" : "locked"} ${isEquipped ? "equipped" : ""}`;
        item.style.borderColor = isOwned ? rarityObj.border : "var(--border-color)";

        item.innerHTML = `
          <div class="almanac-icon">${isOwned ? skin.emoji : "🔒"}</div>
          <div class="almanac-name">${skin.name[currentLang] || skin.name.ru}</div>
          <span class="almanac-rarity" style="background:${rarityObj.bg};color:${rarityObj.color};">${rarityObj.stars}</span>
        `;

        item.title = isOwned
          ? `${skin.name[currentLang] || skin.name.ru} (${rarityObj.name[currentLang] || rarityObj.name.ru})\n${skin.desc[currentLang] || skin.desc.ru}\n${t.almanacClickEquip}`
          : skin.exclusiveShop
            ? `${skin.name[currentLang] || skin.name.ru}\n${t.exclusiveShopDesc || "💎 Эксклюзив магазина (нельзя выбить, только в магазине)"}`
            : `${t.almanacLockedHint}\n[${rarityObj.name[currentLang] || rarityObj.name.ru}]`;

        if (isOwned) {
          item.addEventListener("click", () => {
            ext.storage.local.set({ selectedSkin: skin.id }, () => {
              soundManager.playCompleteChime();
              renderGardenTab();
              syncTimerFromStorage();
            });
          });
        }

        almanacGrid.appendChild(item);
      });

      // Render 7-day Bar Chart
      statsChart.innerHTML = "";
      const daily = Array.isArray(stats.dailyStats) ? stats.dailyStats : [0, 0, 0, 0, 0, 0, 0];
      const maxVal = Math.max(...daily, 15);

      daily.forEach(val => {
        const col = document.createElement("div");
        col.className = "bar-column";
        const heightPct = Math.min(100, Math.max(6, Math.round((val / maxVal) * 100)));
        col.style.height = `${heightPct}%`;
        col.title = `${val} ${t.minuteUnit}`;
        statsChart.appendChild(col);
      });

      // Render Forest Gallery
      forestGrid.innerHTML = "";
      if (forest.length === 0) {
        forestGrid.innerHTML = `<div class="empty-state">${t.forestEmpty}</div>`;
      } else {
        const recent = [...forest].reverse().slice(0, 36);
        recent.forEach(tree => {
          const cell = document.createElement("div");
          const isWithered = tree.status === "withered";
          cell.className = `forest-cell ${isWithered ? "withered" : ""}`;

          const skinObj = TREE_SKINS[tree.skin] || TREE_SKINS.oak;
          const icon = isWithered ? "🥀" : skinObj.emoji;
          cell.textContent = icon;

          const dateStr = tree.date ? new Date(tree.date).toLocaleDateString() : "";
          const durStr = `${tree.duration || 0} ${t.minuteUnit}`;
          const reasonStr = isWithered ? `\n${tree.reason}` : "";
          const rarityName = tree.rarity ? ` [${RARITIES[tree.rarity]?.name[currentLang] || ""}]` : "";
          cell.title = `${isWithered ? t.withered : t.grown}: ${skinObj.name[currentLang] || skinObj.name.ru}${rarityName}\n${durStr} • ${dateStr}${reasonStr}`;

          cell.addEventListener("click", () => {
            const sameSkinTrees = forest.filter(f => f.skin === tree.skin && f.status !== "withered");
            const dupCount = sameSkinTrees.length;
            const sPrice = getTreeSellPrice(tree);
            openHqTreeModal(tree, isWithered, dateStr, dupCount, sPrice);
          });

          forestGrid.appendChild(cell);
        });
      }
    });
  }

  // -------------------------------------------------------------
  // TAB 3: TREE SKINS SHOP
  // -------------------------------------------------------------
  function renderShopTab() {
    ext.storage.local.get(["coins", "unlockedSkins", "selectedSkin"], (data) => {
      const coins = data.coins || 0;
      const unlocked = Array.isArray(data.unlockedSkins) ? data.unlockedSkins : ["oak"];
      const currentSelected = data.selectedSkin || "oak";
      const t = i18n[currentLang] || i18n.ru;

      skinsGrid.innerHTML = "";

      Object.values(TREE_SKINS).forEach(skin => {
        const isOwned = unlocked.includes(skin.id);
        const isEquipped = currentSelected === skin.id;
        const rarityObj = RARITIES[skin.rarity] || RARITIES.common;

        const card = document.createElement("div");
        card.className = `skin-card ${isEquipped ? "selected" : ""}`;

        const previewSvg = renderTreeSVG(skin.id, 5, false);
        const exclusiveBadge = skin.exclusiveShop
          ? `<span class="skin-exclusive-badge">💎 ${t.exclusiveShopBadge || "ЭКСКЛЮЗИВ"}</span>`
          : "";

        card.innerHTML = `
          <div class="skin-preview-box">${previewSvg}</div>
          <div class="skin-details">
            <div class="skin-name-row">
              <span class="skin-name">${skin.name[currentLang] || skin.name.ru} ${skin.emoji}</span>
            </div>
            <div class="skin-tags-row">
              <span class="skin-rarity-pill" style="background:${rarityObj.bg};color:${rarityObj.color};">${rarityObj.stars}</span>
              ${exclusiveBadge}
            </div>
            <div class="skin-desc">${skin.desc[currentLang] || skin.desc.ru}</div>
          </div>
          <div class="skin-action">
            ${
              isEquipped
                ? `<button class="btn btn-sm btn-equipped" disabled>${t.equipped}</button>`
                : isOwned
                  ? `<button class="btn btn-sm btn-warning equip-btn" data-skin="${skin.id}">${t.equip}</button>`
                  : `<button class="btn btn-sm btn-primary buy-btn" data-skin="${skin.id}" data-price="${skin.price}">🪙 ${skin.price} ${t.buy}</button>`
            }
          </div>
        `;

        skinsGrid.appendChild(card);
      });

      skinsGrid.querySelectorAll(".equip-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const skinId = btn.dataset.skin;
          ext.storage.local.set({ selectedSkin: skinId }, () => {
            renderShopTab();
            syncTimerFromStorage();
          });
        });
      });

      skinsGrid.querySelectorAll(".buy-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const skinId = btn.dataset.skin;
          const price = parseInt(btn.dataset.price, 10);

          if (coins < price) {
            alert(t.notEnoughCoins);
            return;
          }

          const newCoins = coins - price;
          const newUnlocked = [...unlocked, skinId];

          ext.storage.local.set({
            coins: newCoins,
            unlockedSkins: newUnlocked,
            selectedSkin: skinId
          }, () => {
            coinsCount.textContent = newCoins;
            soundManager.playCompleteChime();
            renderShopTab();
            syncTimerFromStorage();
          });
        });
      });
    });
  }

  // -------------------------------------------------------------
  // TAB 4: TASKS & QUESTS
  // -------------------------------------------------------------
  function renderTasksTab() {
    ext.storage.local.get(["quests", "todos", "coins"], (data) => {
      const quests = Array.isArray(data.quests) ? data.quests : [];
      const todos = Array.isArray(data.todos) ? data.todos : [];
      const coins = data.coins || 0;
      const t = i18n[currentLang] || i18n.ru;

      questList.innerHTML = "";
      quests.forEach(q => {
        const item = document.createElement("div");
        item.className = "quest-item";
        const progressPct = Math.min(100, Math.round((q.current / q.target) * 100));

        let questDesc = q.desc;
        if (q.id === 1) questDesc = t.quest1;
        if (q.id === 2) questDesc = t.quest2;
        if (q.id === 3) questDesc = t.quest3;

        item.innerHTML = `
          <div class="quest-item-header">
            <span>${questDesc} (${q.current}/${q.target})</span>
            <span class="quest-reward">+${q.reward} 🪙</span>
          </div>
          <div class="quest-progress-bg">
            <div class="quest-progress-bar" style="width: ${progressPct}%;"></div>
          </div>
          ${
            q.done && !q.claimed
              ? `<button class="quest-claim-btn" data-qid="${q.id}">${t.claimReward} +${q.reward} 🪙</button>`
              : q.claimed
                ? `<span style="font-size: 0.7rem; color: #a6e3a1; align-self: flex-end;">${t.claimedReward}</span>`
                : ""
          }
        `;
        questList.appendChild(item);
      });

      questList.querySelectorAll(".quest-claim-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const qid = parseInt(btn.dataset.qid, 10);
          const quest = quests.find(q => q.id === qid);
          if (!quest) return;

          quest.claimed = true;
          const newCoins = coins + quest.reward;

          ext.storage.local.set({ quests: quests, coins: newCoins }, () => {
            coinsCount.textContent = newCoins;
            soundManager.playCompleteChime();
            renderTasksTab();
          });
        });
      });

      // Todos
      todoList.innerHTML = "";
      todos.forEach((todo, idx) => {
        const li = document.createElement("li");
        li.className = `todo-item ${todo.done ? "done" : ""}`;
        li.innerHTML = `
          <div class="todo-item-left">
            <input type="checkbox" class="todo-checkbox" ${todo.done ? "checked" : ""}>
            <span>${todo.text}</span>
          </div>
          <button class="todo-del-btn" title="Delete">✖</button>
        `;

        li.querySelector(".todo-checkbox").addEventListener("change", (e) => {
          const checked = e.target.checked;
          todo.done = checked;

          let updatedCoins = coins;
          if (checked && !todo.rewarded) {
            todo.rewarded = true;
            updatedCoins += 5;
            coinsCount.textContent = updatedCoins;
            soundManager.playCompleteChime();
          }

          ext.storage.local.set({ todos: todos, coins: updatedCoins }, () => {
            renderTasksTab();
          });
        });

        li.querySelector(".todo-del-btn").addEventListener("click", () => {
          todos.splice(idx, 1);
          ext.storage.local.set({ todos: todos }, () => renderTasksTab());
        });

        todoList.appendChild(li);
      });
    });
  }

  function handleAddTodo() {
    const text = todoInput.value.trim();
    if (!text) return;

    ext.storage.local.get(["todos"], (data) => {
      const todos = Array.isArray(data.todos) ? data.todos : [];
      todos.push({ id: Date.now(), text, done: false, rewarded: false });

      ext.storage.local.set({ todos: todos }, () => {
        todoInput.value = "";
        renderTasksTab();
      });
    });
  }

  addTodoBtn.addEventListener("click", handleAddTodo);
  todoInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleAddTodo();
  });

  // -------------------------------------------------------------
  // TAB 5: BLOCKER SETTINGS
  // -------------------------------------------------------------
  const alertStyleSelect = document.getElementById("alertStyle");
  if (alertStyleSelect) {
    alertStyleSelect.addEventListener("change", (e) => {
      const style = e.target.value;
      ext.storage.local.set({ alertStyle: style });
    });
  }

  function renderBlockerTab() {
    ext.storage.local.get(["blockMode", "blockedSites", "whiteListSites", "alertStyle"], (data) => {
      const mode = data.blockMode || "blacklist";
      blockModeSelect.value = mode;

      if (alertStyleSelect) {
        alertStyleSelect.value = data.alertStyle || "fullscreen";
      }

      const list = mode === "blacklist" ? (data.blockedSites || []) : (data.whiteListSites || []);
      siteCount.textContent = `${list.length}`;

      siteListContainer.innerHTML = "";
      list.forEach((site, idx) => {
        const li = document.createElement("li");
        li.className = "site-item";
        li.innerHTML = `
          <span>${site}</span>
          <button class="site-del-btn" title="Delete">✖</button>
        `;

        li.querySelector(".site-del-btn").addEventListener("click", () => {
          list.splice(idx, 1);
          const update = mode === "blacklist" ? { blockedSites: list } : { whiteListSites: list };
          ext.storage.local.set(update, () => renderBlockerTab());
        });

        siteListContainer.appendChild(li);
      });
    });
  }

  blockModeSelect.addEventListener("change", (e) => {
    const mode = e.target.value;
    ext.storage.local.set({ blockMode: mode }, () => renderBlockerTab());
  });

  function addSiteToList(rawDomain) {
    if (!rawDomain) return;
    const clean = rawDomain.toLowerCase()
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .replace(/\/.*$/, '')
      .trim();

    if (!clean) return;

    ext.storage.local.get(["blockMode", "blockedSites", "whiteListSites"], (data) => {
      const mode = data.blockMode || "blacklist";
      const list = mode === "blacklist" ? (data.blockedSites || []) : (data.whiteListSites || []);

      if (!list.includes(clean)) {
        list.push(clean);
        const update = mode === "blacklist" ? { blockedSites: list } : { whiteListSites: list };
        ext.storage.local.set(update, () => {
          siteInput.value = "";
          renderBlockerTab();
        });
      }
    });
  }

  addSiteBtn.addEventListener("click", () => addSiteToList(siteInput.value));
  siteInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addSiteToList(siteInput.value);
  });

  chipBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      addSiteToList(btn.dataset.site);
    });
  });

  // Storage Change Listener for live sync
  ext.storage.onChanged.addListener((changes) => {
    if (changes.ambientSound) {
      const soundVal = changes.ambientSound.newValue || "none";
      ambientSelect.value = soundVal;
      weatherEffects.setWeather(soundVal);
    }
    if (changes.strictMode && strictModeToggle) {
      strictModeToggle.checked = !!changes.strictMode.newValue;
      strictModeCard.classList.toggle("active", !!changes.strictMode.newValue);
    }
    if (changes.timerState || changes.sessionEndTime || changes.treeState || changes.coins || changes.lastDrop) {
      syncTimerFromStorage();
      if (activeTab === "tabGarden") renderGardenTab();
      if (activeTab === "tabShop") renderShopTab();
    }
  });

  // Initial Load
  ext.storage.local.get(["lang", "ambientSound", "strictMode", "sessionDuration"], (data) => {
    if (data.lang) {
      langSelect.value = data.lang;
      applyLanguage(data.lang);
    } else {
      applyLanguage("ru");
    }
    if (data.ambientSound) {
      ambientSelect.value = data.ambientSound;
      weatherEffects.setWeather(data.ambientSound);
    } else {
      weatherEffects.setWeather("none");
    }
    if (data.strictMode !== undefined && strictModeToggle) {
      strictModeToggle.checked = !!data.strictMode;
      strictModeCard.classList.toggle("active", !!data.strictMode);
    }
    if (data.sessionDuration) {
      updateCustomDuration(data.sessionDuration);
    }
    syncTimerFromStorage();
  });
});
