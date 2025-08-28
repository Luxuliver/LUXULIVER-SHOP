const products = [
        {
            id: 'baju-001',
            name: 'Skeleton',
            image: ['Skeleton.jpg'],
            description: 'T-Shirt paling nyaman dan bagus untuk dipakai setiap hari, cocok disemua musim.',
            basePrice: 100000,
            isPromo: true,
            promoPrice: 98000,
            flashSaleEndDate: '2025-09-15T23:59:59', 
            sizes: ['XS', 'S', 'M', 'L', 'XL'],
            color: 'putih',
            design: 'abstrak',
            stock: 15,
            status: 'preorder', 
            points: 100,
            reviews: [
                { author: 'Muhammad Ricky', rating: 5, text: 'Kainnya adem banget, sablonnya rapi dan kualitasnya premium, keren juga desain nya bro', date: '2025-06-29' },
                { author: 'Subhan Saputro', rating: 5, text: 'Ukurannya pas sesuai size char dan warnanya juga putih bersih, tidak menerawang, inti nya baju nya okey recommended!', date: '2025-06-29' },
                { author: 'Bima Saputra', rating: 4, text: 'Bagus, sesuai ekspektasi, mungkin lain kali akan coba desain yang lain', date: '2025-06-29' }, 
                { author: 'Tegar', rating: 5, text: 'Adem bahan nya', date: '2025-07-02' }, 
                { author: 'Rangga Aji', rating: 5, text: 'Cocok buat outfit harian', date: '2025-07-03' }, 
                { author: 'Vino Rizki', rating: 5, text: 'Kualitas sesuai harga', date: '2025-07-03' }
            ]
        },
        {
            id: 'baju-002',
            name: 'Dog and éclipse',
            image: ['Dog.jpg'],
            description: 'T-Shirt paling nyaman dan bagus untuk dipakai setiap hari, cocok disemua musim.',
            basePrice: 100000,
            sizes: ['XS','S', 'M', 'L', 'XL'],
            color: 'hitam',
            design: 'abstrak',
            stock: 15,
            status: 'preorder', 
            points: 100,
            reviews: [
                { author: 'Dian Maulana Solihin', rating: 5, text: 'Asli bagus nih bahan nya adem banget', date: '2025-06-28' },
                { author: 'Eko Rahman', rating: 5, text: 'Bahan untuk baju nya sih nyaman dipakai seharian ya, sablonnya pun juga tahan lama setelah beberapa kali cuci', date: '2025-07-01' }, 
                { author: 'Zidan Hakim', rating: 5, text: 'Tidak nerawang bro, bagus', date: '2025-07-08' }, 
                { author: 'Wahid Maulana', rating: 5, text: 'gak mudah kusut juga bahannya', date: '2025-07-15' }
            ]
        },
        {
            id: 'baju-003',
            name: 'Travis Scott',
            image: ['Travis scoot.jpg'],
            description: 'T-Shirt paling nyaman dan bagus untuk dipakai setiap hari, cocok disemua musim.',
            basePrice: 100000,
            sizes: ['XS', 'S', 'M', 'L', 'XL'],
            color: 'hitam',
            design: 'abstrak',
            stock: 15,
            status: 'preorder', 
            points: 100,
            reviews: [
                { author: 'Fahmi Rizky Dermawan', rating: 5, text: 'Keren abis bro, fans nya Travis Scott wajib sih ini mah punya, kualitasnya juga mantap, kaga bikin kecewa dah beli di sini', date: '2025-06-24' }, 
                { author: 'Yoga Wijayanto', rating: 5, text: 'cocok buat cauaca panas', date: '2025-06-24' },
                { author: 'Alif', rating: 5, text: 'serat kaik nya bagus', date: '2025-07-05' }, 
                { author: 'Iqbal', rating: 5, text: 'jahitan nya bagus banget min', date: '2025-07-05' }, 
                { author: 'Yusuf Gunawan', rating: 5, text: 'Mantapppp', date: '2025-07-07' }, 
                { author: 'Jaya Santoso', rating: 5, text: 'Bagus sih ini', date: '2025-07-08' }, 
                { author: 'Hendra', rating: 5, text: 'Cocok di gua baju nya', date: '2025-07-10' }, 
                { author: 'Dewa Prastyo', rating: 5, text: 'Enak lah bahan nya', date: '2025-07-12' }
            ]
        },
        {
            id: 'baju-004',
            name: 'Person',
            image: ['Person.jpg'],
            description: 'T-Shirt paling nyaman dan bagus untuk dipakai setiap hari, cocok disemua musim.',
            basePrice: 100000,
            sizes: ['XS', 'S', 'M', 'L', 'XL'],
            color: 'hitam',
            design: 'abstrak',
            stock: 15,
            status: 'preorder', 
            points: 100,
            reviews: [
                { author: 'Farhan Mahendra', rating: 4, text: 'Jujur bahan nya bagus banget, desain nya juga okey kalo menurut gua', date: '2025-06-20' }, 
                { author: 'Akbar Wirawan', rating: 5, text: 'sudah beli 2x, gak kecewain emang di sini', date: '2025-06-22' }, 
                { author: 'Naufal Yuda', rating: 5, text: 'gila keren asli', date: '2025-06-28' }
            ]
        },
        {
            id: 'baju-005',
            name: 'Atelier Noir',
            image: ['Atelier Noir.jpg'],
            description: 'Desain classy minimalis untuk tampilan yang bersih dan elegan.',
            basePrice: 105000,
            sizes: ['XS','S', 'M', 'L', 'XL'],
            color: 'hitam',
            design: 'classy',
            stock: 5,
            status: 'preorder', 
            points: 125,
            reviews: [
                { author: 'Candha Mahardika', rating: 5, text: 'Anjir bagus cuy classy nya', date: '2025-07-09' },
                { author: 'Sandi', rating: 5, text: 'Gak expect sebagus ini', date: '2025-07-09' }, 
                { author: 'Rizal Fahmi', rating: 5, text: 'bagus desain classy nya', date: '2025-07-12' }, 
                { author: 'Riko Satria', rating: 5, text: 'Ditunggu desain classy selanjutnya', date: '2025-07-15' }, 
                { author: 'Hafiz Budiono', rating: 5, text: 'Keren, sudah itu aja cukup', date: '2025-07-22' }, 
                { author: 'Arya Rahman Lubis', rating: 5, text: 'mines packing nya belom ada nih, untuk baju nya bagus kok', date: '2025-07-22' }
                
            ]    
        },
        {
            id: 'baju-006',
            name: 'Velluto',
            image: ['Velluto.jpg'],
            description: 'Desain classy minimalis untuk tampilan yang bersih dan elegan.',
            basePrice: 105000,
            sizes: ['XS','S', 'M', 'L', 'XL'],
            color: 'hitam',
            design: 'classy',
            stock: 4,
            status: 'preorder', 
            points: 125,
            dateAdded: '2025-08-4',
            reviews: [
                { author: 'Romi', rating: 5, text: 'cocok di gua', date: '2025-08-08' }, 
                { author: 'Lukman Surya Yuda', rating: 5, text: 'oke joss mantap', date: '2025-08-8' }, 
                { author: 'Zulfikar', rating: 5, text: 'bagus dan keren', date: '2025-08-8' }, 
                { author: 'dedi firmansyah', rating: 5, text: 'rating 5 cakep soalnya', date: '2025-08-10' }, 
                { author: 'Vicky Bagus', rating: 5, text: 'boleh-boleh bahan nya', date: '2025-08-14' }, 
                { author: 'Kelvin', rating: 5, text: 'classy parah asli ini desain nya', date: '2025-08-14' }, 
                { author: 'Bayu Erlangga', rating: 5, text: 'keren...', date: '2025-08-16' }
            ]
        }, 
        {
            id: 'baju-007',
            name: 'The-Beatles',
            image: ['The-beatles.jpg'],
            description: 'Simpel, refined, dan penuh gaya.',
            basePrice: 100000,
            sizes: ['XS','S', 'M', 'L', 'XL'],
            color: 'hitam',
            design: 'basic',
            stock: 15,
            status: 'preorder', 
            points: 100,
            dateAdded: '2025-08-14',
            reviews: [
                { author: 'Mohammed Aji', rating: 5, text: 'oke lah desain nya', date: '2025-08-16' },
                { author: 'Agung', rating: 4, text: 'Saran packing nya diadakan biar makin bagus', date: '2025-08-16' }, 
                { author: 'Rifan Umar', rating: 5, text: 'desain basic nya keluarin yang lagi min, baguss juga mayan', date: '2025-08-22' }, 
                { author: 'dahendra', rating: 5, text: 'sipp baguss sesuai juga ukuran nya pas di coba', date: '2025-08-24' }
            ]
        }, 
        {
            id: 'baju-008',
            name: 'Vanderlux',
            image: ['Vanderlux.jpg'],
            description: 'Desain classy minimalis untuk tampilan yang bersih dan elegan.',
            basePrice: 105000,
            sizes: ['XS','S', 'M', 'L', 'XL'],
            color: 'putih',
            design: 'classy',
            stock: 5,
            status: 'preorder', 
            points: 125,
            dateAdded: '2025-08-20',
            reviews: [
                { author: 'Leo Siregar', rating: 5, text: 'ini gokil banget tampilan desain classy nya', date: '2025-08-25' },
                { author: 'Gunawan Kurniawan', rating: 5, text: 'Banyakin desain classy seperti ini, bagus soal nya jujur', date: '2025-08-25' }, 
                { author: 'mulyadi', rating: 5, text: 'Gak mengecewakan beli di sini', date: '2025-08-25' }
            ]
        }, 
        {
            id: 'bundle-001',
            name: 'Paket Alpha',
            image: ['paket-alpha.jpg'], 
            description: 'Promo bundle spesial: Kaos Travis Scott (Hitam) + Person (Hitam). Hemat & tetap stylish.',
            basePrice: 190000, 
            isPromo: false, 
            sizes: ['XS', 'S', 'M', 'L'], 
            color: 'mix', 
            design: 'bundel',
            stock: 10,
            status: 'preorder',
            points: 200,
            isBundle: true 
            
        }, 
        {
            id: 'bundle-002',
            name: 'Paket Beta',
            image: ['paket-beta.jpg'], 
            description: 'Hemat lebih banyak dengan paket kaos: Skeleton (Putih) + Travis scoot (Hitam) + Velluto (Hitam).',
            basePrice: 290000, 
            isPromo: false, 
            sizes: ['XS', 'S', 'M', 'L'], 
            color: 'mix', 
            design: 'bundel',
            stock: 10,
            status: 'preorder',
            points: 200,
            isBundle: true 
        }, 
        {
            id: 'bundle-003',
            name: 'Paket Gemma',
            image: ['paket-gemma.jpg'], 
            description: 'Koleksi kaos terbaik dalam satu paket: The Beatles (Hitam) + Velluto (Hitam) + Atelier Noir (Hitam) + Dog and éclipse (Hitam).',
            basePrice: 390000, 
            isPromo: false, 
            sizes: ['XS', 'S', 'M', 'L'], 
            color: 'mix', 
            design: 'bundel',
            stock: 10,
            status: 'preorder',
            points: 200,
            isBundle: true 
        }
    ];

    const sellerInfo = {
        name: "Luxuliver Official",
        address: "Jakarta Selatan, DKI Jakarta, Indonesia",
        phone: "+62 878-2084-3118",
        email: "luxuliver@gmail.com",
        instagram: "https://www.instagram.com/luxuliver",
        whatsappAdmin: "6287820843118"
    };

    const expeditionMethods = [
    { id: 'jne', name: 'JNE', logo: 'JNE.jpg', service: 'Reguler', price: 'Konfirmasi Admin' },
    { id: 'jnt', name: 'J&T Express', logo: 'J&T.jpg', service: 'Reguler', price: 'Konfirmasi Admin' }, 
    { id: 'lion parcel', name: 'Lion Parcel', logo: 'Lion.jpg', service: 'Regpack', price: 'Konfirmasi Admin' },
    { id: 'tiki', name: 'Tiki', logo: 'Tiki.jpg', service: 'Reguler', price: 'Konfirmasi Admin' },
    { id: 'wahana', name: 'Wahana', logo: 'Wahana.jpg', service: 'Express', price: 'Konfirmasi Admin' },
    { id: 'pos Indonesia', name: 'Pos Indonesia', logo: 'Pos.jpg', service: 'Reguler', price: 'Konfirmasi Admin' },
    { id: 'gosend', name: 'Gosend', logo: 'Gosen.jpg', service: 'Instant', price: 'Konfirmasi Admin', isJakartaOnly: true, isInstant: true },
    { id: 'grab', name: 'Grab Express', logo: 'Grab.jpg', service: 'Instant', price: 'Konfirmasi Admin', isJakartaOnly: true, isInstant: true },
    { id: 'spx', name: 'Spx Express', logo: 'Spx.jpg', service: 'Instant', price: 'Konfirmasi Admin', isJakartaOnly: true, isInstant: true }
];

    const paymentMethods = [
        { id: 'bca', name: 'BCA', logo: 'BCA.jpg' },
        { id: 'mandiri', name: 'MANDIRI', logo: 'MANDIRI.jpg' },
        { id: 'bni', name: 'BNI', logo: 'BNI.jpg' },
        { id: 'bri', name: 'BRI', logo: 'BRI.jpg' },
        { id: 'paypal', name: 'PAYPAL', logo: 'PAYPAL.jpg' },
        { id: 'gopay', name: 'GOPAY', logo: 'GOPAY.jpg' },
        { id: 'ovo', name: 'OVO', logo: 'OVO.jpg' },
        { id: 'dana', name: 'DANA', logo: 'DANA.jpg' },
        { id: 'Shopeepay', name: 'SHOPEEPAY', logo: 'SHOPEEPAY.jpg' }
    ];

    const sizeGuideData = [
        { size: 'XS', length: '66', width: '46', sleeve: '20' },
        { size: 'S', length: '68', width: '48', sleeve: '21' },
        { size: 'M', length: '72', width: '50', sleeve: '22' },
        { size: 'L', length: '74', width: '52', sleeve: '23' },
        { size: 'XL', length: '76', width: '54', sleeve: '24' }
    ];

    const notificationsData = [
        {
            id: 'promo-001',
            category: 'promo',
            icon: 'fas fa-percent',
            title: 'notif_promo_1_title',
            desc_short: 'notif_promo_1_desc_short',
            desc_full: 'notif_promo_1_desc_full',
            timestamp: new Date(new Date().setDate(new Date().getDate() - 14)).toISOString()
        },
        {
            id: 'info-001',
            category: 'info',
            icon: 'fas fa-shipping-fast',
            title: 'notif_info_1_title',
            desc_short: 'notif_info_1_desc_short',
            desc_full: 'notif_info_1_desc_full',
            timestamp: new Date(new Date().setDate(new Date().getDate() - 8)).toISOString()
        },
        {
            id: 'info-002',
            category: 'info',
            icon: 'fas fa-tshirt',
            title: 'notif_info_2_title',
            desc_short: 'notif_info_2_desc_short',
            desc_full: 'notif_info_2_desc_full',
            timestamp: new Date(new Date().setDate(new Date().getDate() - 6)).toISOString()
        },
        {
            id: 'promo-002',
            category: 'promo',
            icon: 'fas fa-tag',
            title: 'notif_promo_2_title',
            desc_short: 'notif_promo_2_desc_short',
            desc_full: 'notif_promo_2_desc_full',
            timestamp: new Date(new Date().setDate(new Date().getDate() - 22)).toISOString()
        }, 
        {
            id: 'info-003',
            category: 'info',
            icon: 'fas fa-star',
            title: 'notif_info_3_title',
            desc_short: 'notif_info_3_desc_short',
            desc_full: 'notif_info_3_desc_full',
            timestamp: new Date(new Date().setDate(new Date().getDate() - 10)).toISOString()
        },
        {
            id: 'promo-003',
            category: 'promo',
            icon: 'fas fa-shopping-cart',
            title: 'notif_promo_3_title',
            desc_short: 'notif_promo_3_desc_short',
            desc_full: 'notif_promo_3_desc_full',
            timestamp: new Date(new Date().setDate(new Date().getDate() - 4)).toISOString()
        },
         {
            id: 'info-004',
            category: 'info',
            icon: 'fas fa-user',
            title: 'notif_info_4_title',
            desc_short: 'notif_info_4_desc_short',
            desc_full: 'notif_info_4_desc_full',
            timestamp: new Date(new Date().setDate(new Date().getDate() - 25)).toISOString()
        },
        {
            id: 'promo-004',
            category: 'promo',
            icon: 'fas fa-shopping-bag',
            title: 'notif_promo_4_title',
            desc_short: 'notif_promo_4_desc_short',
            desc_full: 'notif_promo_4_desc_full',
            timestamp: new Date(new Date().setDate(new Date().getDate() - 11)).toISOString()
        },
         {
            id: 'info-005',
            category: 'info',
            icon: 'fas fa-info-circle', 
            title: 'notif_info_5_title',
            desc_short: 'notif_info_5_desc_short',
            desc_full: 'notif_info_5_desc_full',
            timestamp: new Date(new Date().setDate(new Date().getDate() - 44)).toISOString()
        },
        {
            id: 'promo-005',
            category: 'promo',
            icon: 'fas fa-bullhorn',
            title: 'notif_promo_5_title',
            desc_short: 'notif_promo_5_desc_short',
            desc_full: 'notif_promo_5_desc_full',
            timestamp: new Date(new Date().setDate(new Date().getDate() - 20)).toISOString()
        },
         {
            id: 'info-006',
            category: 'info',
            icon: 'fas fa-bell', 
            title: 'notif_info_6_title',
            desc_short: 'notif_info_6_desc_short',
            desc_full: 'notif_info_6_desc_full',
            timestamp: new Date(new Date().setDate(new Date().getDate() - 38)).toISOString()
        },
        {
            id: 'promo-006',
            category: 'promo',
            icon: 'fas fa-ticket-alt',
            title: 'notif_promo_6_title',
            desc_short: 'notif_promo_6_desc_short',
            desc_full: 'notif_promo_6_desc_full',
            timestamp: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString()
        },
         {
            id: 'info-007',
            category: 'info',
            icon: 'fas fa-exclamation', 
            title: 'notif_info_7_title',
            desc_short: 'notif_info_7_desc_short',
            desc_full: 'notif_info_7_desc_full',
            timestamp: new Date(new Date().setDate(new Date().getDate() - 24)).toISOString()
        },
        {
            id: 'promo-007',
            category: 'promo',
            icon: 'fas fa-receipt',
            title: 'notif_promo_7_title',
            desc_short: 'notif_promo_7_desc_short',
            desc_full: 'notif_promo_7_desc_full',
            timestamp: new Date(new Date().setDate(new Date().getDate() - 16)).toISOString()
        },
    ];
    
    const shippingDiscounts = [
    {
        city: 'Bali',
        discountAmount: 4000,
        icon: 'fas fa-city',
        message: 'Nikmati potongan ongkir Rp4.000 untuk semua pengiriman di area Bali!',
        bgColor: 'linear-gradient(135deg, #f5af19 0%, #f12711 100%)'
    },
    {
        city: 'Bandung',
        discountAmount: 2000,
        icon: 'fas fa-city',
        message: 'Spesial untuk warga Bandung, dapatkan potongan ongkir sebesar Rp2.000.',
        bgColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
        city: 'Surabaya',
        discountAmount: 3000,
        icon: 'fas fa-city',
        message: 'Spesial untuk orang Surabaya! Ada potongan ongkir Rp3.000 khusus untuk Anda.',
        bgColor: 'linear-gradient(135deg, #ff0084 0%, #33001b 100%)'
    }
];
