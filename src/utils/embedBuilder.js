const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} = require('discord.js');
const config = require('../config');

// ═══════════════════════════════════════════════════════════════
//  embedBuilder.js — Tüm embed ve component oluşturucular
// ═══════════════════════════════════════════════════════════════

/**
 * Kayıt kanalına gönderilen sabit panel embed'i
 */
function kayitPanelEmbed() {
  return new EmbedBuilder()
    .setTitle('📋  Sunucuya Hoş Geldin!')
    .setDescription(
      '> Sunucumuzda aktif olabilmek için kayıt olman gerekiyor.\n\n' +
      '**Nasıl Kayıt Olunur?**\n' +
      '1️⃣  Aşağıdaki **Kayıt Ol** butonuna tıkla\n' +
      '2️⃣  Açılan menüden **ilgi alanlarını / mesleğini** seç\n' +
      '3️⃣  Seçimlerin onaylanınca **Üye** rolünü alırsın ✅\n\n' +
      '> ⚠️ Kayıt olmadan sunucu kanallarına erişemezsin.',
    )
    .setColor(0x5865F2)
    .setThumbnail('https://cdn.discordapp.com/embed/avatars/0.png')
    .setFooter({ text: 'Thomas Anderson • Kayıt Sistemi' })
    .setTimestamp();
}

/**
 * Kayıt ol butonunu içeren ActionRow
 */
function kayitButonRow() {
  const buton = new ButtonBuilder()
    .setCustomId('kayit_baslat')
    .setLabel('📝  Kayıt Ol')
    .setStyle(ButtonStyle.Primary);

  return new ActionRowBuilder().addComponents(buton);
}

/**
 * Meslek seçim menüsünü içeren ActionRow
 */
function meslekSecimRow() {
  const secenekler = config.meslekRolleri.map((rol) =>
    new StringSelectMenuOptionBuilder()
      .setLabel(rol.label)
      .setValue(rol.value)
      .setDescription(rol.description),
  );

  const menu = new StringSelectMenuBuilder()
    .setCustomId('meslek_secim')
    .setPlaceholder('🔍  İlgi alanlarını seç (birden fazla seçebilirsin)')
    .setMinValues(1)
    .setMaxValues(config.meslekRolleri.length)
    .addOptions(secenekler);

  return new ActionRowBuilder().addComponents(menu);
}

/**
 * Seçimleri onayla / iptal et butonları
 */
function onayButonRow() {
  const onay = new ButtonBuilder()
    .setCustomId('kayit_onayla')
    .setLabel('✅  Tamamla ve Kayıt Ol')
    .setStyle(ButtonStyle.Success);

  const iptal = new ButtonBuilder()
    .setCustomId('kayit_iptal')
    .setLabel('❌  İptal')
    .setStyle(ButtonStyle.Danger);

  return new ActionRowBuilder().addComponents(onay, iptal);
}

/**
 * Kullanıcının seçimlerini özetleyen embed (ephemeral)
 */
function secimOzetEmbed(secilenRoller) {
  const liste = secilenRoller
    .map((r) => {
      const rol = config.meslekRolleri.find((m) => m.value === r);
      return rol ? `• ${rol.label}` : `• ${r}`;
    })
    .join('\n');

  return new EmbedBuilder()
    .setTitle('🎯  Seçimlerini Onayla')
    .setDescription(
      `Aşağıdaki rolleri alacaksın:\n\n${liste}\n\n` +
      '> Devam etmek için **Tamamla** butonuna bas.',
    )
    .setColor(0x57F287)
    .setFooter({ text: 'Onaylamadan önce seçimlerini kontrol et.' });
}

/**
 * Başarılı kayıt embed'i (ephemeral)
 */
function basariliKayitEmbed(secilenRoller) {
  const liste = secilenRoller
    .map((r) => {
      const rol = config.meslekRolleri.find((m) => m.value === r);
      return rol ? `${rol.label}` : r;
    })
    .join(', ');

  return new EmbedBuilder()
    .setTitle('🎉  Kayıt Tamamlandı!')
    .setDescription(
      `Aramıza hoş geldin! 🥳\n\n` +
      `**Aldığın roller:** ${liste}\n\n` +
      '> Artık sunucunun tüm kanallarına erişebilirsin. İyi eğlenceler!',
    )
    .setColor(0x57F287)
    .setTimestamp();
}

/**
 * Log kanalına gönderilen kayıt bildirimi
 */
function logEmbed(member, secilenRoller) {
  const rolIsimleri = secilenRoller
    .map((r) => {
      const rol = config.meslekRolleri.find((m) => m.value === r);
      return rol ? rol.label : r;
    })
    .join(', ');

  return new EmbedBuilder()
    .setTitle('📥  Yeni Kayıt')
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .addFields(
      { name: '👤 Kullanıcı', value: `${member} (${member.user.tag})`, inline: true },
      { name: '🆔 ID', value: member.id, inline: true },
      { name: '📅 Katılma Tarihi', value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`, inline: true },
      { name: '🎭 Seçilen Roller', value: rolIsimleri || 'Belirtilmedi' },
    )
    .setColor(0x5865F2)
    .setFooter({ text: 'Thomas Anderson • Kayıt Log' })
    .setTimestamp();
}

/**
 * Hata embed'i (ephemeral)
 */
function hataEmbed(mesaj = 'Bir hata oluştu. Lütfen tekrar dene veya yöneticiye başvur.') {
  return new EmbedBuilder()
    .setTitle('❌  Hata')
    .setDescription(mesaj)
    .setColor(0xED4245);
}

/**
 * Sunucuya katılma hoşgeldin embed'i (DM veya kanal)
 */
function hosgeldinEmbed(member) {
  return new EmbedBuilder()
    .setTitle(`👋  Hoş Geldin, ${member.displayName}!`)
    .setDescription(
      `**Thomas Anderson** sunucusuna hoş geldin!\n\n` +
      `📋 Kayıt olmak için <#${config.kanallar.kayit}> kanalına git ve butona tıkla.\n\n` +
      `> Kayıt olmadan kanalları göremezsin.`,
    )
    .setColor(0x5865F2)
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setTimestamp();
}

module.exports = {
  kayitPanelEmbed,
  kayitButonRow,
  meslekSecimRow,
  onayButonRow,
  secimOzetEmbed,
  basariliKayitEmbed,
  logEmbed,
  hataEmbed,
  hosgeldinEmbed,
};
