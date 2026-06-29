const {
  meslekSecimRow,
  onayButonRow,
  secimOzetEmbed,
  hataEmbed,
} = require('../utils/embedBuilder');
const { kayitTamamla } = require('../utils/registerHandler');
const config = require('../config');

// ═══════════════════════════════════════════════════════════════
//  interactionCreate.js — Tüm buton ve select menu interaksiyonları
// ═══════════════════════════════════════════════════════════════

// Kullanıcı oturumlarını hafızada saklar: userId → { secilenRoller }
const kayitOturumlari = new Map();

module.exports = {
  name: 'interactionCreate',

  async execute(interaction) {

    // ──────────────────────────────────────────────────────────
    //  SLASH KOMUTLARI
    // ──────────────────────────────────────────────────────────
    if (interaction.isChatInputCommand()) {
      const komut = interaction.client.commands.get(interaction.commandName);
      if (!komut) return;

      try {
        await komut.execute(interaction, kayitOturumlari);
      } catch (hata) {
        console.error(`[HATA] /${interaction.commandName}:`, hata);
        const yanit = { embeds: [hataEmbed()], ephemeral: true };
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp(yanit);
        } else {
          await interaction.reply(yanit);
        }
      }
      return;
    }

    // ──────────────────────────────────────────────────────────
    //  BUTON: "Kayıt Ol" — kayıt_baslat
    // ──────────────────────────────────────────────────────────
    if (interaction.isButton() && interaction.customId === 'kayit_baslat') {
      const member = interaction.member;

      // Zaten kayıtlı mı kontrol et
      const kayitsizRolVar = member.roles.cache.has(config.roller.kayitsiz);
      if (!kayitsizRolVar) {
        return interaction.reply({
          embeds: [hataEmbed('Zaten kayıtlısın! Tekrar kayıt olmana gerek yok. ✅')],
          ephemeral: true,
        });
      }

      // Yeni oturum başlat
      kayitOturumlari.set(member.id, { secilenRoller: [] });

      // Meslek seçim menüsünü ephemeral olarak gönder
      await interaction.reply({
        content: '👇 **Aşağıdan ilgi alanlarını seç** (birden fazla seçebilirsin):',
        components: [meslekSecimRow()],
        ephemeral: true,
      });
      return;
    }

    // ──────────────────────────────────────────────────────────
    //  SELECT MENU: Meslek seçimi — meslek_secim
    // ──────────────────────────────────────────────────────────
    if (interaction.isStringSelectMenu() && interaction.customId === 'meslek_secim') {
      const oturum = kayitOturumlari.get(interaction.user.id);
      if (!oturum) {
        return interaction.reply({
          embeds: [hataEmbed('Oturum süresi doldu. Lütfen "Kayıt Ol" butonuna tekrar bas.')],
          ephemeral: true,
        });
      }

      // Seçimleri oturuma kaydet
      oturum.secilenRoller = interaction.values;
      kayitOturumlari.set(interaction.user.id, oturum);

      // Özet embed + onay/iptal butonlarını göster
      await interaction.update({
        embeds: [secimOzetEmbed(oturum.secilenRoller)],
        components: [onayButonRow()],
      });
      return;
    }

    // ──────────────────────────────────────────────────────────
    //  BUTON: Onayla — kayit_onayla
    // ──────────────────────────────────────────────────────────
    if (interaction.isButton() && interaction.customId === 'kayit_onayla') {
      const oturum = kayitOturumlari.get(interaction.user.id);
      if (!oturum || oturum.secilenRoller.length === 0) {
        return interaction.reply({
          embeds: [hataEmbed('Önce rol seçimi yapman gerekiyor. "Kayıt Ol" butonuna tekrar bas.')],
          ephemeral: true,
        });
      }

      // Kayıt tamamla (interaction zaten update ile acknowledge edildi)
      await kayitTamamla(interaction, oturum.secilenRoller, kayitOturumlari);
      return;
    }

    // ──────────────────────────────────────────────────────────
    //  BUTON: İptal — kayit_iptal
    // ──────────────────────────────────────────────────────────
    if (interaction.isButton() && interaction.customId === 'kayit_iptal') {
      kayitOturumlari.delete(interaction.user.id);

      await interaction.update({
        content: '❌ Kayıt işlemi iptal edildi. İstediğin zaman tekrar başlayabilirsin.',
        embeds: [],
        components: [],
      });
      return;
    }
  },
};
