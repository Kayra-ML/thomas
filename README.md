<div align="center">

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:000000,50:00ff41,100:000000&height=200&section=header&text=Thomas%20Bot&fontSize=70&fontColor=00ff41&fontAlignY=38&desc=Discord%20Registration%20%26%20Automation&descAlignY=55&descAlign=50&animation=twinkling" />

<br/>

![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Discord.js](https://img.shields.io/badge/Discord.js-5865F2?style=for-the-badge&logo=discord&logoColor=white)
![Railway](https://img.shields.io/badge/Railway-131415?style=for-the-badge&logo=railway&logoColor=white)

</div>

---

## 🤖 `Thomas Bot (Matrix)`

Thomas, Discord sunucusu için geliştirilmiş, yüksek performanslı ve tam otomatik bir kayıt/yönetim botudur. Modern **Discord.js v14** yapısı üzerine inşa edilmiştir ve Slash Commands (`/`) destekler.

> *"Welcome to the real world."*

---

## ⚙️ Özellikler / Features

- 🛡️ **Otomatik Kayıt:** Kullanıcıları doğrulama adımlarından geçirerek uygun rolleri verir.
- ⚡ **Slash Commands:** Modern `/` komut altyapısı ile kolay kullanım.
- 🚄 **Railway Deployment:** 7/24 bulut ortamında kesintisiz çalışma.
- 🔒 **Güvenli:** Çevre değişkenleri (`.env`) ile token güvenliği.

---

## 🏗️ Tech Stack

- **Runtime:** Node.js (v18+)
- **Library:** Discord.js v14
- **Environment:** `dotenv`
- **Hosting:** Railway (Procfile & railway.toml yapılandırması mevcut)

---

## 🚀 Kurulum / Setup

Botu kendi ortamınızda çalıştırmak için:

### 1. Repoyu Klonlayın
```bash
git clone https://github.com/Kayra-ML/thomas.git
cd thomas
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Ortam Değişkenlerini Ayarlayın
`.env.example` dosyasını kopyalayıp `.env` adıyla kaydedin ve içini doldurun:
```env
DISCORD_TOKEN=sizin_bot_tokeniniz
CLIENT_ID=bot_id_numaraniz
GUILD_ID=sunucu_id_numaraniz
# ...diğer ayarlar
```

### 4. Komutları Discord'a Yükleyin (Slash Commands)
```bash
npm run deploy
```

### 5. Botu Başlatın
```bash
npm start
# veya geliştirme modu için:
npm run dev
```

---

## ☁️ Deployment

Bu proje doğrudan **Railway** üzerinde çalışmaya hazırdır. 
`railway.toml` ve `Procfile` dosyaları önceden yapılandırılmıştır. Tek yapmanız gereken repoyu Railway'e bağlamak ve ortam değişkenlerini eklemektir.

<div align="center">
  <img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:000000,50:00ff41,100:000000&height=120&section=footer" />
</div>
