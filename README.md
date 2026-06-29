# Discord Kayıt Botu 🤖

Thomas Anderson sunucusu için geliştirilmiş otomatik kayıt sistemi.

## Özellikler

- ✅ Sunucuya katılınca otomatik `Kayıtsız` + `Junior 1` rolleri
- 📋 Güzel embed kayıt paneli
- 🎭 Çoklu meslek rol seçimi (Select Menu)
- 🔄 Kayıt tamamlanınca `Kayıtsız` → `Üye` geçişi
- 📝 Log kanalına kayıt bildirimi
- 🛡️ Admin komutları

---

## Kurulum

### 1. Gereksinimler
- Node.js v18 veya üzeri
- Discord bot token

### 2. Paketleri kur
```bash
npm install
```

### 3. Discord'da Rolleri Oluştur
Aşağıdaki rolleri Discord sunucunda manuel oluştur:
| Rol Adı | Açıklama |
|---|---|
| `Kayıtsız` | Sunucuya yeni katılanlara otomatik verilir |
| `Junior 1` | Sunucuya yeni katılanlara otomatik verilir |
| `Üye` | Kayıt tamamlanınca verilir |
| `Web Designer` | Meslek rolü |
| `Game Designer` | Meslek rolü |
| `Backend Developer` | Meslek rolü |
| `Frontend Developer` | Meslek rolü |
| `Mobile Developer` | Meslek rolü |
| `UI/UX Designer` | Meslek rolü |
| `Content Creator` | Meslek rolü |
| `Other` | Meslek rolü |

### 4. .env Dosyasını Doldur
`.env` dosyasını aç ve tüm ID'leri gir:

```env
DISCORD_TOKEN=gerçek_bot_tokenin
CLIENT_ID=botun_application_id
GUILD_ID=sunucunun_id

KAYIT_KANAL_ID=kayit_kanalinin_id
LOG_KANAL_ID=log_kanalinin_id
GIRIS_KANAL_ID=giris_kanalinin_id

KAYITSIZ_ROL_ID=kayitsiz_rolunun_id
JUNIOR1_ROL_ID=junior1_rolunun_id
UYE_ROL_ID=uye_rolunun_id

ROL_WEB_DESIGNER=web_designer_rol_id
ROL_GAME_DESIGNER=game_designer_rol_id
ROL_BACKEND_DEV=backend_dev_rol_id
ROL_FRONTEND_DEV=frontend_dev_rol_id
ROL_MOBILE_DEV=mobile_dev_rol_id
ROL_UIUX_DESIGNER=uiux_designer_rol_id
ROL_CONTENT_CREATOR=content_creator_rol_id
ROL_OTHER=other_rol_id
```

> **ID nasıl kopyalanır?**
> Discord'da Geliştirici Modu açık olmalı (Ayarlar → Gelişmiş → Geliştirici Modu).
> Ardından rol/kanal/sunucuya sağ tık → **ID'yi Kopyala**.

### 5. Slash Komutlarını Kaydet
```bash
npm run deploy
```

### 6. Botu Başlat
```bash
npm start
```

Geliştirme için (değişikliklerde otomatik yeniden başlar):
```bash
npm run dev
```

---

## Discord Bot İzinleri

Bot'un aşağıdaki izinlere sahip olması gerekir:
- `Manage Roles` — Rol atama/kaldırma
- `Send Messages` — Mesaj gönderme
- `Embed Links` — Embed gönderme
- `Read Message History` — Geçmiş okuma
- `View Channels` — Kanalları görme

> ⚠️ Bot rolü, yönettiği tüm rollerden **daha yüksekte** olmalı!

### OAuth2 Davet Linki İzinleri
Bot'u sunucuya eklerken şu scope'ları seç:
- `bot`
- `applications.commands`

---

## Slash Komutları

| Komut | Açıklama | Yetki |
|---|---|---|
| `/setup-kayit` | Kayıt panelini kanala gönderir | Yönetici |
| `/kayitsizlar` | Kayıtsız üye listesini gösterir | Yönetici |

---

## Kayıt Akışı

```
Kullanıcı Katılır
       ↓
Junior 1 + Kayıtsız rolleri otomatik verilir
       ↓
#kayıt kanalında hoşgeldin mesajı (30sn sonra silinir)
       ↓
Kullanıcı "Kayıt Ol" butonuna basar
       ↓
Meslek seçim menüsü açılır (sadece kendisi görür)
       ↓
Rolleri seçer → "Tamamla" butonuna basar
       ↓
Kayıtsız rolü kaldırılır
Üye rolü eklenir
Seçilen meslek rolleri eklenir
Log kanalına bildirim gider
```

---

## Proje Yapısı

```
discord-kayit-botu/
├── src/
│   ├── index.js                 # Bot giriş noktası
│   ├── config.js                # Tüm ID ve sabitler
│   ├── events/
│   │   ├── ready.js             # Bot hazır eventi
│   │   ├── guildMemberAdd.js    # Otomatik rol atama
│   │   └── interactionCreate.js # Buton/menu/komut handler
│   ├── commands/
│   │   ├── setupKayit.js        # /setup-kayit
│   │   └── kayitsizlar.js       # /kayitsizlar
│   └── utils/
│       ├── embedBuilder.js      # Embed oluşturucular
│       └── registerHandler.js   # Kayıt iş mantığı
├── deploy-commands.js           # Slash komut yükleme scripti
├── .env                         # Gizli bilgiler (Git'e ekleme!)
├── .env.example                 # Örnek .env şablonu
├── .gitignore
└── package.json
```
