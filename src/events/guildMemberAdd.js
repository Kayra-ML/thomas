const config = require('../config');
const { hosgeldinEmbed } = require('../utils/embedBuilder');

// ═══════════════════════════════════════════════════════════════
//  guildMemberAdd.js — Sunucuya yeni katılan üyeler
// ═══════════════════════════════════════════════════════════════

module.exports = {
  name: 'guildMemberAdd',

  /**
   * Yeni üye katıldığında:
   * 1. Junior 1 rolünü ver
   * 2. Kayıtsız rolünü ver
   * 3. Kayıt kanalında bilgilendirme mesajı gönder (ephemeral değil, mention)
   */
  async execute(member) {
    const guild = member.guild;
    console.log(`[+] Yeni üye: ${member.user.tag} (${member.id})`);

    // ── 1. Junior 1 rolü ────────────────────────────────────
    const junior1Rol = guild.roles.cache.get(config.roller.junior1);
    if (junior1Rol) {
      await member.roles.add(junior1Rol, 'Otomatik: sunucuya katıldı').catch((e) =>
        console.error(`[HATA] Junior 1 rolü verilemedi: ${e.message}`),
      );
    } else {
      console.warn('[UYARI] Junior 1 rolü bulunamadı! JUNIOR1_ROL_ID kontrol et.');
    }

    // ── 2. Kayıtsız rolü ────────────────────────────────────
    const kayitsizRol = guild.roles.cache.get(config.roller.kayitsiz);
    if (kayitsizRol) {
      await member.roles.add(kayitsizRol, 'Otomatik: kayıtsız').catch((e) =>
        console.error(`[HATA] Kayıtsız rolü verilemedi: ${e.message}`),
      );
    } else {
      console.warn('[UYARI] Kayıtsız rolü bulunamadı! KAYITSIZ_ROL_ID kontrol et.');
    }

    // ── 3. Kayıt kanalına yönlendirme mesajı ───────────────
    const kayitKanal = guild.channels.cache.get(config.kanallar.kayit);
    if (kayitKanal) {
      const mesaj = await kayitKanal
        .send({
          content: `👋 ${member} sunucuya katıldı! Kayıt olmak için aşağıdaki butona tıkla.`,
          embeds: [hosgeldinEmbed(member)],
        })
        .catch((e) =>
          console.error(`[HATA] Kayıt kanalına mesaj gönderilemedi: ${e.message}`),
        );

      // Mesajı 30 saniye sonra sil (kanalı temiz tut)
      if (mesaj) {
        setTimeout(() => {
          mesaj.delete().catch(() => {});
        }, 30_000);
      }
    }
  },
};
