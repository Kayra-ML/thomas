const config = require('../config');
const {
  basariliKayitEmbed,
  hataEmbed,
  logEmbed,
} = require('./embedBuilder');

// ═══════════════════════════════════════════════════════════════
//  registerHandler.js — Kayıt onaylama iş mantığı
// ═══════════════════════════════════════════════════════════════

/**
 * Kullanıcının kayıt işlemini tamamlar:
 * 1. Kayıtsız rolünü kaldırır
 * 2. Üye rolünü ekler
 * 3. Seçilen meslek rollerini ekler
 * 4. Log kanalına bildirim gönderir
 * 5. Kullanıcıya başarı mesajı gösterir (ephemeral)
 *
 * @param {import('discord.js').ButtonInteraction} interaction
 * @param {string[]} secilenRolDegerleri  - meslek_secim'den gelen value listesi
 * @param {Map}      kayitOturumlari      - Geçici oturum deposu
 */
async function kayitTamamla(interaction, secilenRolDegerleri, kayitOturumlari) {
  await interaction.deferReply({ ephemeral: true });

  const member = interaction.member;
  const guild  = interaction.guild;

  try {
    // ── 1. Kayıtsız rolünü kaldır ───────────────────────────
    const kayitsizRol = guild.roles.cache.get(config.roller.kayitsiz);
    if (kayitsizRol && member.roles.cache.has(kayitsizRol.id)) {
      await member.roles.remove(kayitsizRol, 'Kayıt tamamlandı');
    }

    // ── 2. Üye rolünü ekle ──────────────────────────────────
    const uyeRol = guild.roles.cache.get(config.roller.uye);
    if (uyeRol) {
      await member.roles.add(uyeRol, 'Kayıt tamamlandı');
    } else {
      console.warn('[UYARI] Üye rolü bulunamadı! UYE_ROL_ID kontrol et.');
    }

    // ── 3. Seçilen meslek rollerini ekle ────────────────────
    const meslekHatalari = [];
    for (const deger of secilenRolDegerleri) {
      const meslekConfig = config.meslekRolleri.find((m) => m.value === deger);
      if (!meslekConfig) continue;

      const rolId = config.getMeslekRolId(meslekConfig.envKey);
      if (!rolId || rolId.includes('ROL_ID')) {
        meslekHatalari.push(deger);
        continue;
      }

      const rol = guild.roles.cache.get(rolId);
      if (rol) {
        await member.roles.add(rol, `Kayıt: ${meslekConfig.label}`);
      } else {
        meslekHatalari.push(deger);
      }
    }

    if (meslekHatalari.length > 0) {
      console.warn(`[UYARI] Şu roller bulunamadı: ${meslekHatalari.join(', ')}`);
    }

    // ── 4. Log kanalına bildirim gönder ────────────────────
    const logKanal = guild.channels.cache.get(config.kanallar.log);
    if (logKanal) {
      await logKanal.send({ embeds: [logEmbed(member, secilenRolDegerleri)] });
    }

    // ── 5. Oturumu temizle ─────────────────────────────────
    kayitOturumlari.delete(member.id);

    // ── 6. Kullanıcıya başarı mesajı göster ────────────────
    await interaction.editReply({
      embeds: [basariliKayitEmbed(secilenRolDegerleri)],
    });

  } catch (hata) {
    console.error('[HATA] Kayıt tamamlanırken bir sorun çıktı:', hata);
    await interaction.editReply({
      embeds: [hataEmbed('Kayıt sırasında bir sorun oluştu. Lütfen yöneticiye başvur.')],
    });
  }
}

module.exports = { kayitTamamla };
