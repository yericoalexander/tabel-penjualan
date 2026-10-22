// Data Menu & Bahan dengan Estimasi Acuan Pasar Tradisional Jakarta vs Supermarket Jakarta

const MENU_DATA = [
  {
    id: "mango-jelly-milk",
    nama: "Mango Jelly Milk",
    kategori: "Minuman",
    kemasan: "Botol kale 250ml + sedotan",
    porsiBatch: 10,
    hppPasar: 7600,
    hppSupermarket: 10000,
    hppPerPorsi: 7600,
    hargaJualRekomendasi: 15000,
    targetJualDefault: 30,
    bahanSingkat: "Mangga harum manis, Nutrijell, susu UHT, susu evaporasi, SKM, botol kale",
    links: [
      {
        label: "Tutorial Resep (YouTube Shorts)",
        url: "https://youtube.com/shorts/CC8j1JXutro?si=AOsBseqcOEwsPdHw",
        platform: "youtube"
      }
    ],
    rincianBahan: [
      { 
        nama: "Mangga Harum Manis Matang", 
        kategoriBahan: "Buah Segar",
        takaran: "1 kg (isi 2-3 buah)", 
        hargaPasar: 20000, 
        hargaSupermarket: 25000, 
        catatan: "Estimasi pasar Rp 18rb-22rb/kg vs supermarket Rp 24.800-29.000/kg (tergantung musim)" 
      },
      { 
        nama: "Nutrijell Rasa Mangga", 
        kategoriBahan: "Jelly & Bahan Kue",
        takaran: "1 bks (15 gr)", 
        hargaPasar: 4500, 
        hargaSupermarket: 5500, 
        catatan: "Estimasi warung sembako pasar Rp 4.500 vs supermarket Rp 5.500" 
      },
      { 
        nama: "Gula Pasir", 
        kategoriBahan: "Sembako",
        takaran: "150 gram", 
        hargaPasar: 2600, 
        hargaSupermarket: 2800, 
        catatan: "Estimasi acuan gula curah Rp 17.500/kg vs kemasan bermerek Rp 18.500/kg" 
      },
      { 
        nama: "Susu UHT Full Cream", 
        kategoriBahan: "Susu Olahan",
        takaran: "1 Liter (Diamond/Ultra)", 
        hargaPasar: 17500, 
        hargaSupermarket: 20000, 
        catatan: "Estimasi toko grosir susu Rp 17.500 vs supermarket non-promo Rp 20.000" 
      },
      { 
        nama: "Susu Evaporasi Tiga Sapi", 
        kategoriBahan: "Susu Olahan",
        takaran: "1 kotak (500 gr)", 
        hargaPasar: 14500, 
        hargaSupermarket: 16500, 
        catatan: "Estimasi Toko Bahan Kue (TBK) Rp 14.500 vs supermarket Rp 15.600-16.900" 
      },
      { 
        nama: "Susu Kental Manis (SKM) Putih", 
        kategoriBahan: "Susu Olahan",
        takaran: "3 sachet (120 gr)", 
        hargaPasar: 5500, 
        hargaSupermarket: 7000, 
        catatan: "Estimasi eceran pasar @Rp 1.800 vs supermarket per renceng" 
      },
      { 
        nama: "Biji Selasih", 
        kategoriBahan: "Pelengkap",
        takaran: "1 bungkus kecil (25 gr)", 
        hargaPasar: 1500, 
        hargaSupermarket: 3500, 
        catatan: "Estimasi toko bumbu pasar Rp 1.500 vs kemasan botol supermarket" 
      },
      { 
        nama: "Botol Kale 250ml + Tutup + Sedotan", 
        kategoriBahan: "Kemasan",
        takaran: "10 set", 
        hargaPasar: 10000, 
        hargaSupermarket: 20000, 
        catatan: "Estimasi grosir toko plastik @Rp 1.000 vs eceran retail @Rp 2.000" 
      }
    ]
  },
  {
    id: "pudding-balls",
    nama: "Pudding Balls (Jelly Ball Buah)",
    kategori: "Dessert / Minuman",
    kemasan: "Cup puding bulat 150ml + sendok",
    porsiBatch: 10,
    hppPasar: 4200,
    hppSupermarket: 6000,
    hppPerPorsi: 4200,
    hargaJualRekomendasi: 10000,
    targetJualDefault: 25,
    bahanSingkat: "Nutrijell plain/buah, melon, semangka, susu UHT, vla vanila, cup bulat",
    catatanKhusus: "Perlu cetakan jelly ball bulat (estimasi beli 1x di toko kue/olshop ~Rp 12.000)",
    links: [
      {
        label: "Tutorial Resep (TikTok @dapurmaretta)",
        url: "https://www.tiktok.com/@dapurmaretta/video/7426976568649501960?is_from_webapp=1&sender_device=pc&web_id=7656282270794450440",
        platform: "tiktok"
      }
    ],
    rincianBahan: [
      { 
        nama: "Nutrijell Plain / Stroberi", 
        kategoriBahan: "Jelly & Bahan Kue",
        takaran: "1 bks (15 gr)", 
        hargaPasar: 4500, 
        hargaSupermarket: 5500, 
        catatan: "Estimasi bahan bola jelly bening" 
      },
      { 
        nama: "Aneka Buah Potong Segar", 
        kategoriBahan: "Buah Segar",
        takaran: "250 gram (Melon/Semangka/Anggur)", 
        hargaPasar: 12000, 
        hargaSupermarket: 19000, 
        catatan: "Estimasi beli kiloan di pasar buah tradisional vs kemasan cut-fruit supermarket" 
      },
      { 
        nama: "Gula Pasir", 
        kategoriBahan: "Sembako",
        takaran: "150 gram", 
        hargaPasar: 2600, 
        hargaSupermarket: 2800, 
        catatan: "Estimasi pemanis larutan jelly" 
      },
      { 
        nama: "Susu UHT Putih", 
        kategoriBahan: "Susu Olahan",
        takaran: "500 ml", 
        hargaPasar: 9500, 
        hargaSupermarket: 11000, 
        catatan: "Estimasi kuah susu manis dingin" 
      },
      { 
        nama: "MyVla Instan Vanila", 
        kategoriBahan: "Jelly & Bahan Kue",
        takaran: "1 bks (60 gr)", 
        hargaPasar: 5500, 
        hargaSupermarket: 6800, 
        catatan: "Tinggal seduh air panas untuk kuah kental gurih" 
      },
      { 
        nama: "Cup Puding Bulat 150ml + Tutup + Sendok", 
        kategoriBahan: "Kemasan",
        takaran: "10 set", 
        hargaPasar: 8000, 
        hargaSupermarket: 15000, 
        catatan: "Estimasi toko plastik pasar @Rp 800 vs supermarket eceran @Rp 1.500" 
      }
    ]
  },
  {
    id: "es-lumut-coklat",
    nama: "Es Lumut Coklat",
    kategori: "Minuman",
    kemasan: "Botol kale 250ml + sedotan",
    porsiBatch: 12,
    hppPasar: 4200,
    hppSupermarket: 6000,
    hppPerPorsi: 4200,
    hargaJualRekomendasi: 10000,
    targetJualDefault: 40,
    bahanSingkat: "Nutrijell coklat besar, susu UHT coklat, SKM coklat, es batu kristal",
    links: [
      {
        label: "Tutorial Resep (YouTube Shorts)",
        url: "https://youtube.com/shorts/-yBGResl-bg?si=ZDD6P5i5ZsPJ35ba",
        platform: "youtube"
      }
    ],
    rincianBahan: [
      { 
        nama: "Nutrijell Coklat Besar", 
        kategoriBahan: "Jelly & Bahan Kue",
        takaran: "1 bks (30 gr)", 
        hargaPasar: 5500, 
        hargaSupermarket: 6800, 
        catatan: "Estimasi warung pasar Rp 5.500 vs supermarket Rp 6.800" 
      },
      { 
        nama: "Gula Pasir", 
        kategoriBahan: "Sembako",
        takaran: "100 gram", 
        hargaPasar: 1700, 
        hargaSupermarket: 1900, 
        catatan: "Estimasi pemanis larutan jelly coklat" 
      },
      { 
        nama: "Susu UHT Coklat 1 Liter", 
        kategoriBahan: "Susu Olahan",
        takaran: "1 Liter (Diamond/Ultra)", 
        hargaPasar: 18000, 
        hargaSupermarket: 21000, 
        catatan: "Memberi rasa legit coklat creamy" 
      },
      { 
        nama: "SKM Coklat Kaleng 370g", 
        kategoriBahan: "Susu Olahan",
        takaran: "1 kaleng (Cap Enak vs Bendera)", 
        hargaPasar: 10500, 
        hargaSupermarket: 13000, 
        catatan: "Estimasi Cap Enak pasar Rp 10.500 vs Frisian Flag supermarket Rp 13.000" 
      },
      { 
        nama: "Es Batu Kristal", 
        kategoriBahan: "Pelengkap",
        takaran: "1 kantong (2 kg)", 
        hargaPasar: 3000, 
        hargaSupermarket: 5500, 
        catatan: "Estimasi depo es/warung Rp 3.000 vs minimarket/supermarket Rp 5.500" 
      },
      { 
        nama: "Botol Kale 250ml + Tutup", 
        kategoriBahan: "Kemasan",
        takaran: "12 pcs", 
        hargaPasar: 12000, 
        hargaSupermarket: 24000, 
        catatan: "Estimasi grosir toko plastik @Rp 1.000 vs eceran retail @Rp 2.000" 
      }
    ]
  },
  {
    id: "mini-corndog",
    nama: "Mini Corndog (Sosis Moza)",
    kategori: "Makanan Ringan",
    kemasan: "Kertas snack foodgrade + tusuk sate",
    porsiBatch: 15,
    hppPasar: 4400,
    hppSupermarket: 6400,
    hppPerPorsi: 4400,
    hargaJualRekomendasi: 10000,
    targetJualDefault: 35,
    bahanSingkat: "Sosis Champ, keju mozzarella, roti tawar, tepung panir, minyak, saus",
    catatanKhusus: "Gunakan roti tawar pipih (jauh lebih praktis & anti-gagal daripada ragi)",
    links: [
      {
        label: "Tutorial Versi Roti Tawar (TikTok @bunaakova)",
        url: "https://www.tiktok.com/@bunaakova/video/7697600191280565511?is_from_webapp=1&sender_device=pc&web_id=7668337955124332048",
        platform: "tiktok"
      },
      {
        label: "Tutorial Versi Tepung (TikTok @ernaliarosita)",
        url: "https://www.tiktok.com/@ernaliarosita/video/7672310532463955221?is_from_webapp=1&sender_device=pc&web_id=7668337955124332048",
        platform: "tiktok"
      }
    ],
    rincianBahan: [
      { 
        nama: "Sosis Ayam/Sapi Champ", 
        kategoriBahan: "Frozen Food",
        takaran: "1 pack 375g (isi 15 pcs)", 
        hargaPasar: 16500, 
        hargaSupermarket: 21500, 
        catatan: "Estimasi agen frozen pasar Rp 16.500 vs Super Indo/retail Rp 21.500" 
      },
      { 
        nama: "Keju Mozarella Blok", 
        kategoriBahan: "Keju Olahan",
        takaran: "150 gram (Anchor / Perfetto)", 
        hargaPasar: 21000, 
        hargaSupermarket: 26000, 
        catatan: "Estimasi TBK pasar (Anchor repack 250g @Rp 35rb) vs supermarket (Perfetto @Rp 42rb)" 
      },
      { 
        nama: "Roti Tawar Kupas", 
        kategoriBahan: "Sembako",
        takaran: "1 pack (10-12 lembar)", 
        hargaPasar: 8500, 
        hargaSupermarket: 14500, 
        catatan: "Estimasi roti tawar kupas pasar Rp 8.500 vs Sari Roti supermarket Rp 14.500" 
      },
      { 
        nama: "Tepung Panir Oranye", 
        kategoriBahan: "Sembako",
        takaran: "250 gram", 
        hargaPasar: 4500, 
        hargaSupermarket: 8000, 
        catatan: "Estimasi panir curah pasar Rp 4.500 vs Mamasuka 200g supermarket Rp 8.000" 
      },
      { 
        nama: "Minyak Goreng Sawit", 
        kategoriBahan: "Sembako",
        takaran: "400 ml (alokasi)", 
        hargaPasar: 6200, 
        hargaSupermarket: 7800, 
        catatan: "Estimasi Minyakita pasar Rp 15.500/L vs minyak bermerek supermarket Rp 19.500/L" 
      },
      { 
        nama: "Tusuk Sate Bambu Sedang", 
        kategoriBahan: "Perlengkapan",
        takaran: "15 pcs", 
        hargaPasar: 1000, 
        hargaSupermarket: 2500, 
        catatan: "Estimasi beli 1 ikat di pasar isi 100 pcs Rp 5.000" 
      },
      { 
        nama: "Saus Sambal + Mayones", 
        kategoriBahan: "Saus & Bumbu",
        takaran: "Secukupnya", 
        hargaPasar: 5000, 
        hargaSupermarket: 8000, 
        catatan: "Topping saus zig-zag di atas corndog" 
      },
      { 
        nama: "Kantong / Kertas Snack", 
        kategoriBahan: "Kemasan",
        takaran: "15 pcs", 
        hargaPasar: 3750, 
        hargaSupermarket: 7500, 
        catatan: "Estimasi toko plastik pasar @Rp 250 vs retail @Rp 500" 
      }
    ]
  },
  {
    id: "chikuwa-cheese-mozzarella",
    nama: "Chikuwa Cheese Mozarella",
    kategori: "Makanan Ringan",
    kemasan: "Paper tray / mika mini (isi 3 pcs)",
    porsiBatch: 10,
    hppPasar: 6500,
    hppSupermarket: 9100,
    hppPerPorsi: 6500,
    hargaJualRekomendasi: 14000,
    targetJualDefault: 25,
    bahanSingkat: "Cedea Chikuwa, keju mozzarella, tepung bumbu, panir, minyak, saus",
    links: [
      {
        label: "Tutorial Resep (TikTok @pdlestarii_)",
        url: "https://www.tiktok.com/@pdlestarii_/video/7688329617081453831?is_from_webapp=1&sender_device=pc&web_id=7656282270794450440",
        platform: "tiktok"
      }
    ],
    rincianBahan: [
      { 
        nama: "CEDEA Chikuwa Frozen", 
        kategoriBahan: "Frozen Food",
        takaran: "1.5 pack (375g / 30 pcs)", 
        hargaPasar: 25500, 
        hargaSupermarket: 33000, 
        catatan: "Estimasi agen frozen pasar (@Rp 17rb/250g) vs Super Indo normal (@Rp 22rb/250g)" 
      },
      { 
        nama: "Keju Mozarella Batang", 
        kategoriBahan: "Keju Olahan",
        takaran: "120 gram", 
        hargaPasar: 16800, 
        hargaSupermarket: 21500, 
        catatan: "Dipotong memanjang pas di lubang tengah chikuwa" 
      },
      { 
        nama: "Tepung Bumbu Serbaguna", 
        kategoriBahan: "Sembako",
        takaran: "1 bks (Sajiku 75g)", 
        hargaPasar: 3000, 
        hargaSupermarket: 4200, 
        catatan: "Adonan basah pelapis gurih" 
      },
      { 
        nama: "Tepung Panir", 
        kategoriBahan: "Sembako",
        takaran: "200 gram", 
        hargaPasar: 4000, 
        hargaSupermarket: 7000, 
        catatan: "Baluran krispi keemasan" 
      },
      { 
        nama: "Minyak Goreng Sawit", 
        kategoriBahan: "Sembako",
        takaran: "400 ml (alokasi)", 
        hargaPasar: 6200, 
        hargaSupermarket: 7800, 
        catatan: "Penggorengan deep fry" 
      },
      { 
        nama: "Saus Sambal + Mayones", 
        kategoriBahan: "Saus & Bumbu",
        takaran: "Secukupnya", 
        hargaPasar: 5000, 
        hargaSupermarket: 8000, 
        catatan: "Cocolan pelengkap" 
      },
      { 
        nama: "Paper Tray / Mika + Garpu Mini", 
        kategoriBahan: "Kemasan",
        takaran: "10 set", 
        hargaPasar: 5000, 
        hargaSupermarket: 10000, 
        catatan: "Estimasi toko plastik pasar @Rp 500 vs supermarket eceran @Rp 1.000" 
      }
    ]
  }
];

window.MENU_DATA = MENU_DATA;
