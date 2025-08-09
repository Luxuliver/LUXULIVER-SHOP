const products = [
        {
            id: 'baju-001',
            name: 'Skeleton',
            image: ['Skeleton.jpg'],
            description: 'T-Shirt paling nyaman dan bagus untuk dipakai setiap hari, cocok disemua musim.',
            basePrice: 100000,
            isPromo: true,
            promoPrice: 98000,
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
                { author: 'Riko Satria', rating: 5, text: 'Ditunggu desain classy selanjutnya', date: '2025-07-15' }
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
    { id: 'jne', name: 'JNE Express', logo: 'JNE.jpg', service: 'Reguler', price: 'Konfirmasi Admin' },
    { id: 'jnt', name: 'J&T Express', logo: 'J&T.jpg', service: 'Reguler', price: 'Konfirmasi Admin' }
];

    const paymentMethods = [
        { id: 'bca', name: 'BCA', logo: 'BCA.jpg' },
        { id: 'mandiri', name: 'MANDIRI', logo: 'MANDIRI.jpg' },
        { id: 'bni', name: 'BNI', logo: 'BNI.jpg' },
        { id: 'bri', name: 'BRI', logo: 'BRI.jpg' },
        { id: 'gopay', name: 'GOPAY', logo: 'GOPAY.jpg' },
        { id: 'ovo', name: 'OVO', logo: 'OVO.jpg' },
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
            description: 'notif_promo_1_desc',
            timestamp: new Date(new Date().setDate(new Date().getDate() - 14)).toISOString()
        },
        {
            id: 'info-001',
            category: 'info',
            icon: 'fas fa-shipping-fast',
            title: 'notif_info_1_title',
            description: 'notif_info_1_desc',
            timestamp: new Date(new Date().setDate(new Date().getDate() - 8)).toISOString()
        },
        {
            id: 'info-002',
            category: 'info',
            icon: 'fas fa-tshirt',
            title: 'notif_info_2_title',
            description: 'notif_info_2_desc',
            timestamp: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString()
        },
        {
            id: 'promo-002',
            category: 'promo',
            icon: 'fas fa-tag',
            title: 'notif_promo_2_title',
            description: 'notif_promo_2_desc',
            timestamp: new Date(new Date().setDate(new Date().getDate() - 22)).toISOString()
        }
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
        message: 'Arek Suroboyo! Ada potongan ongkir Rp3.000 khusus untuk Anda.',
        bgColor: 'linear-gradient(135deg, #ff0084 0%, #33001b 100%)'
    }
];
