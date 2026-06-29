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
      label: '🧠 Machine Learning',
      value: 'machine_learning',
      description: 'Makine öğrenmesi ve veri bilimi',
      envKey: 'ROL_MACHINE_LEARNING',
    },
    {
      label: '🔧 Embedded Software',
      value: 'embedded_software',
      description: 'Gömülü sistemler ve donanım yazılımı',
      envKey: 'ROL_EMBEDDED_SOFTWARE',
    },
    {
      label: '📱 Mobile Developer',
      value: 'mobile_dev',
      description: 'Mobil uygulama geliştirme',
      envKey: 'ROL_MOBILE_DEV',
    },
    {
      label: '🔒 Cybersecurity',
      value: 'cybersecurity',
      description: 'Siber güvenlik ve etik hacking',
      envKey: 'ROL_CYBERSECURITY',
    },
    {
      label: '🖥️ Desktop Developer',
      value: 'desktop_dev',
      description: 'Masaüstü uygulama geliştirme',
      envKey: 'ROL_DESKTOP_DEV',
    },
    {
      label: '🤖 AI Developer',
      value: 'ai_dev',
      description: 'Yapay zeka geliştirme',
      envKey: 'ROL_AI_DEV',
    },
    {
      label: '🗄️ Database Developer',
      value: 'database_dev',
      description: 'Veritabanı tasarımı ve yönetimi',
      envKey: 'ROL_DATABASE_DEV',
    },
    {
      label: '💻 Frontend Developer',
      value: 'frontend_dev',
      description: 'İstemci tarafı geliştirme',
      envKey: 'ROL_FRONTEND_DEV',
    },
    {
      label: '⚙️ Backend Developer',
      value: 'backend_dev',
      description: 'Sunucu tarafı geliştirme',
      envKey: 'ROL_BACKEND_DEV',
    },
  ],

  // Meslek rollerinin env'den ID'sini çek
  getMeslekRolId(envKey) {
    return process.env[envKey];
  },
};
