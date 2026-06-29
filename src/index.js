require('dotenv').config();
const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const fs   = require('node:fs');
const path = require('node:path');
const config = require('./config');

// ═══════════════════════════════════════════════════════════════
//  index.js — Discord botunun giriş noktası
// ═══════════════════════════════════════════════════════════════

// ── 1. Client oluştur ───────────────────────────────────────────
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,      // Üye katılım eventleri için
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.GuildMember],
});

// ── 2. Slash komutlarını yükle ──────────────────────────────────
client.commands = new Collection();
const komutDizini = path.join(__dirname, 'commands');
const komutDosyalari = fs.readdirSync(komutDizini).filter((f) => f.endsWith('.js'));

for (const dosya of komutDosyalari) {
  const komut = require(path.join(komutDizini, dosya));
  if ('data' in komut && 'execute' in komut) {
    client.commands.set(komut.data.name, komut);
    console.log(`[+] Komut yüklendi: /${komut.data.name}`);
  } else {
    console.warn(`[UYARI] ${dosya} geçersiz komut formatı.`);
  }
}

// ── 3. Event handler'ları yükle ────────────────────────────────
const eventDizini = path.join(__dirname, 'events');
const eventDosyalari = fs.readdirSync(eventDizini).filter((f) => f.endsWith('.js'));

for (const dosya of eventDosyalari) {
  const event = require(path.join(eventDizini, dosya));
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
  console.log(`[+] Event yüklendi: ${event.name}`);
}

// ── 4. Hata yakalama ───────────────────────────────────────────
process.on('unhandledRejection', (hata) => {
  console.error('[KRITIK] İşlenmeyen hata:', hata);
});

client.on('error', (hata) => {
  console.error('[BOT HATA]', hata);
});

// ── 5. Botu başlat ─────────────────────────────────────────────
if (!config.token || config.token === 'BOT_TOKEN_BURAYA') {
  console.error('❌ DISCORD_TOKEN ayarlanmamış! .env dosyasını düzenle.');
  process.exit(1);
}

client.login(config.token).catch((hata) => {
  console.error('❌ Bota giriş yapılamadı:', hata.message);
  process.exit(1);
});
