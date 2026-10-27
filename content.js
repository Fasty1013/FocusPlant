chrome.runtime.onMessage.addListener((request) => {
  if (request.action === 'BLOCK_PAGE') {
    const lang = request.lang || 'ru';
    
    const texts = {
      ru: { title: 'Сессия фокуса прервана!', msg: 'Вы зашли на недопустимый ресурс. Растение завяло. Закройте вкладку и попробуйте снова.' },
      uz: { title: 'Diqqat sessiyasi to\'xtatildi!', msg: 'Siz taqiqlangan saytga kirdingiz. O\'simlik quridi. Vkladkani yoping va qayta urinib ko\'ring.' },
      en: { title: 'Focus session interrupted!', msg: 'You visited a restricted website. The plant has withered. Close this tab and try again.' },
      ja: { title: '集中セッションが中断されました！', msg: '制限されたウェブサイトにアクセスしました。植物が枯れてしまいました。タブ को 閉じてやり直してください。' }
    };

    const t = texts[lang] || texts.ru;

    document.body.innerHTML = `
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background: #12181b;
        color: white;
        font-family: 'Segoe UI', sans-serif;
        position: fixed;
        top: 0; left: 0; width: 100vw; z-index: 999999;
      ">
        <div style="font-size: 80px; margin-bottom: 20px;">🥀</div>
        <h1 style="font-size: 32px; color: #e74c3c; margin: 0 0 10px 0; text-align: center;">${t.title}</h1>
        <p style="font-size: 16px; color: #95a5a6; max-width: 420px; text-align: center; line-height: 1.5;">${t.msg}</p>
      </div>
    `;
  }
});