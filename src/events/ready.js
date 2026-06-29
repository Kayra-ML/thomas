// ═══════════════════════════════════════════════════════════════
//  ready.js — Bot hazır eventi
// ═══════════════════════════════════════════════════════════════

module.exports = {
  name: 'ready',
  once: true,

  execute(client) {
    console.log('═══════════════════════════════════════════');
    console.log(`  ✅  Bot aktif: ${client.user.tag}`);
    console.log(`  🌐  ${client.guilds.cache.size} sunucuda çalışıyor`);
    console.log('═══════════════════════════════════════════');

    client.user.setPresence({
      activities: [{ name: '📋 Kayıt sistemi aktif', type: 3 /* Watching */ }],
      status: 'online',
    });
  },
};
