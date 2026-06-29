require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs   = require('node:fs');
const path = require('node:path');

// ═══════════════════════════════════════════════════════════════
//  deploy-commands.js — Slash komutlarını Discord'a kaydet
//  Çalıştır: node deploy-commands.js
// ═══════════════════════════════════════════════════════════════

const TOKEN     = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID  = process.env.GUILD_ID;

if (!TOKEN || TOKEN === 'BOT_TOKEN_BURAYA') {
  console.error('❌ DISCORD_TOKEN ayarlanmamış!');
  process.exit(1);
}
if (!CLIENT_ID || CLIENT_ID === 'BOT_CLIENT_ID_BURAYA') {
  console.error('❌ CLIENT_ID ayarlanmamış!');
  process.exit(1);
}

const komutlar = [];
const komutDizini = path.join(__dirname, 'src', 'commands');
const dosyalar = fs.readdirSync(komutDizini).filter((f) => f.endsWith('.js'));

for (const dosya of dosyalar) {
  const komut = require(path.join(komutDizini, dosya));
  if ('data' in komut) {
    komutlar.push(komut.data.toJSON());
    console.log(`[+] Yüklendi: /${komut.data.name}`);
  }
}

const rest = new REST().setToken(TOKEN);

(async () => {
  try {
    console.log(`\n⏳ ${komutlar.length} slash komutu Discord'a kaydediliyor...`);

    if (GUILD_ID && GUILD_ID !== 'SUNUCU_ID_BURAYA') {
      // Guild-specific deploy (anında aktif olur — geliştirme için ideal)
      await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
        body: komutlar,
      });
      console.log(`✅ Komutlar sunucuya (${GUILD_ID}) kaydedildi!`);
    } else {
      // Global deploy (1 saate kadar sürebilir)
      await rest.put(Routes.applicationCommands(CLIENT_ID), {
        body: komutlar,
      });
      console.log('✅ Komutlar global olarak kaydedildi!');
    }
  } catch (hata) {
    console.error('❌ Komut kaydı başarısız:', hata);
  }
})();
