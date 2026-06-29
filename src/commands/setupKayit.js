const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { kayitPanelEmbed, kayitButonRow } = require('../utils/embedBuilder');
const config = require('../config');

// ═══════════════════════════════════════════════════════════════
//  setupKayit.js — /setup-kayit komutu
//  Kayıt panelini belirtilen kanala (ya da mevcut kanala) gönderir
// ═══════════════════════════════════════════════════════════════

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setup-kayit')
    .setDescription('📋 Kayıt panelini bu kanala gönderir (Sadece Yönetici)')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption((opt) =>
      opt
        .setName('kanal')
        .setDescription('Kayıt panelinin gönderileceği kanal (boş bırakırsan bu kanal kullanılır)')
        .setRequired(false),
    ),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const hedefKanal =
      interaction.options.getChannel('kanal') ?? interaction.channel;

    try {
      await hedefKanal.send({
        embeds: [kayitPanelEmbed()],
        components: [kayitButonRow()],
      });

      await interaction.editReply({
        content: `✅ Kayıt paneli başarıyla <#${hedefKanal.id}> kanalına gönderildi!`,
      });

      console.log(
        `[SETUP] Kayıt paneli ${hedefKanal.name} kanalına gönderildi. ` +
        `(Yönetici: ${interaction.user.tag})`,
      );
    } catch (hata) {
      console.error('[HATA] setup-kayit:', hata);
      await interaction.editReply({
        content: `❌ Panel gönderilemedi: \`${hata.message}\`\nBot'un o kanalda mesaj gönderme yetkisi var mı?`,
      });
    }
  },
};
