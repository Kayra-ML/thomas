const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const config = require('../config');

// ═══════════════════════════════════════════════════════════════
//  kayitsizlar.js — /kayitsizlar komutu
//  Sunucudaki kayıtsız üyelerin listesini gösterir
// ═══════════════════════════════════════════════════════════════

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kayitsizlar')
    .setDescription('📋 Kayıtsız üyelerin listesini gösterir (Sadece Yönetici)')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    try {
      // Sunucunun güncel üye listesini çek
      await interaction.guild.members.fetch();

      const kayitsizRolId = config.roller.kayitsiz;
      if (!kayitsizRolId || kayitsizRolId.includes('ROL_ID')) {
        return interaction.editReply({
          content: '❌ `KAYITSIZ_ROL_ID` henüz `.env` dosyasında ayarlanmamış.',
        });
      }

      const kayitsizlar = interaction.guild.members.cache.filter((m) =>
        m.roles.cache.has(kayitsizRolId) && !m.user.bot,
      );

      if (kayitsizlar.size === 0) {
        return interaction.editReply({
          content: '✅ Şu anda kayıtsız üye bulunmuyor!',
        });
      }

      // Listeyi oluştur (en fazla 50 üye göster)
      const liste = kayitsizlar
        .first(50)
        .map((m, i) => {
          const katilma = m.joinedAt
            ? `<t:${Math.floor(m.joinedTimestamp / 1000)}:R>`
            : 'Bilinmiyor';
          return `${String(i + 1).padStart(2, '0')}. ${m} — ${katilma}`;
        })
        .join('\n');

      const embed = new EmbedBuilder()
        .setTitle(`🚫  Kayıtsız Üyeler — ${kayitsizlar.size} kişi`)
        .setDescription(liste)
        .setColor(0xED4245)
        .setFooter({
          text:
            kayitsizlar.size > 50
              ? `İlk 50 üye gösteriliyor. Toplam: ${kayitsizlar.size}`
              : `Toplam: ${kayitsizlar.size} kayıtsız üye`,
        })
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });
    } catch (hata) {
      console.error('[HATA] /kayitsizlar:', hata);
      await interaction.editReply({
        content: `❌ Liste alınamadı: \`${hata.message}\``,
      });
    }
  },
};
