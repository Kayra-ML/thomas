require('dotenv').config();

// ═══════════════════════════════════════════════════════════════
//  config.js — Tüm ID'ler ve sabitler burada yönetilir
// ═══════════════════════════════════════════════════════════════

module.exports = {
  // Bot kimlik bilgileri
  token: process.env.DISCORD_TOKEN,
  clientId: process.env.CLIENT_ID,
  guildId: process.env.GUILD_ID,

  // ── Kanal ID'leri ────────────────────────────────────────────
  kanallar: {
    kayit: process.env.KAYIT_KANAL_ID,   // Kayıt panelinin bulunduğu kanal
    log: process.env.LOG_KANAL_ID,        // Kayıt loglarının atıldığı kanal
    giris: process.env.GIRIS_KANAL_ID,   // Hoşgeldin mesajı kanalı (opsiyonel)
  },

  // ── Sistem Rolleri ───────────────────────────────────────────
  roller: {
    kayitsiz: process.env.KAYITSIZ_ROL_ID,   // Sunucuya katılınca verilen
    junior1: process.env.JUNIOR1_ROL_ID,     // Sunucuya katılınca verilen
    uye: process.env.UYE_ROL_ID,             // Kayıt tamamlanınca verilen
  },

  // ── Meslek Rolleri ───────────────────────────────────────────
  // Bu rolleri Discord'da oluşturup ID'lerini .env'e gireceksin
  meslekRolleri: [
    {
      label: '🎨 Web Designer',
      value: 'web_designer',
      description: 'Web tasarımı ve arayüz geliştirme',
      envKey: 'ROL_WEB_DESIGNER',
    },
    {
      label: '🎮 Game Designer',
      value: 'game_designer',
      description: 'Oyun tasarımı ve geliştirme',
      envKey: 'ROL_GAME_DESIGNER',
    },
    {
      label: '⚙️ Backend Developer',
      value: 'backend_dev',
      description: 'Sunucu tarafı geliştirme',
      envKey: 'ROL_BACKEND_DEV',
    },
    {
      label: '💻 Frontend Developer',
      value: 'frontend_dev',
      description: 'İstemci tarafı geliştirme',
      envKey: 'ROL_FRONTEND_DEV',
    },
    {
      label: '📱 Mobile Developer',
      value: 'mobile_dev',
      description: 'Mobil uygulama geliştirme',
      envKey: 'ROL_MOBILE_DEV',
    },
    {
      label: '🖌️ UI/UX Designer',
      value: 'uiux_designer',
      description: 'Kullanıcı deneyimi ve arayüz tasarımı',
      envKey: 'ROL_UIUX_DESIGNER',
    },
    {
      label: '📹 Content Creator',
      value: 'content_creator',
      description: 'İçerik üretimi ve yayıncılık',
      envKey: 'ROL_CONTENT_CREATOR',
    },
    {
      label: '🔮 Other',
      value: 'other',
      description: 'Diğer / Henüz karar vermedim',
      envKey: 'ROL_OTHER',
    },
  ],

  // Meslek rollerinin env'den ID'sini çek
  getMeslekRolId(envKey) {
    return process.env[envKey];
  },
};
