document.addEventListener('DOMContentLoaded', () => {

    const getLocalStorageItem = (key, defaultValue) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error(`Error parsing localStorage key "${key}":`, e);
            return defaultValue;
        }
    };

    const translations = {
        id: {
            nav_home: 'Beranda',
            nav_collections: 'Koleksi',
            nav_cart: 'Keranjang',
            nav_favorites: 'Favorit',
            nav_history: 'Riwayat',
            sidebar_title: 'Menu & Filter',
            sidebar_main_menu: 'Menu Utama',
            sidebar_availability: 'Ketersediaan',
            sidebar_all_products: 'Semua Produk',
            sidebar_in_stock: 'Stok Tersedia',
            sidebar_color: 'Warna',
            sidebar_all_colors: 'Semua Warna',
            color_black: 'Hitam',
            color_white: 'Putih',
            sidebar_design: 'Desain',
            sidebar_all_designs: 'Semua Desain',
            design_classy: 'Classy',
            design_abstract: 'Abstrak',
            sidebar_display_mode: 'Mode Tampilan',
            sidebar_language: 'Bahasa',
            sidebar_video_gallery: 'Khusus Vidio',
            sidebar_reset_filters: 'Reset Semua Filter',
            hero_title: 'T-Shirt stylish yang bikin gaya makin percaya diri!',
            hero_subtitle: 'Temukan koleksi pakaian stylish dan nyaman yang membuat Anda tampil percaya diri setiap hari.',
            hero_button: 'Jelajahi Koleksi',
            search_placeholder: 'Cari nama produk...',
            search_button: 'Cari',
            all_collections_title: 'Semua Koleksi',
            no_results: 'Produk tidak ditemukan.',
            cart_title: 'Keranjang Belanja',
            empty_cart: 'Keranjang Anda kosong. Mari mulai berbelanja!',
            subtotal: 'Subtotal',
            discount: 'Diskon',
            total: 'Total',
            checkout_button: 'Lanjutkan ke Checkout',
            checkout_process_title: 'Proses Checkout',
            step_info: 'Informasi',
            step_shipping: 'Pengiriman',
            step_payment: 'Pembayaran',
            step1_title: 'Langkah 1: Informasi Kontak Anda',
            label_fullname: 'Nama Lengkap:',
            label_whatsapp: 'Nomor WhatsApp:',
            note_whatsapp: 'Format: 10-15 digit angka (Gunakan format lokal, cth: 08xxxxxxxx).',
            label_address: 'Alamat Lengkap:',
            label_notes: 'Informasi Tambahan (Opsional):',
            step2_title: 'Langkah 2: Pilih Metode Pengiriman',
            label_expedition: 'Pilih Ekspedisi:',
            step3_title: 'Langkah 3: Pilih Metode Pembayaran',
            label_payment_method: 'Pilih Pembayaran:',
            final_summary_title: 'Ringkasan Pesanan',
            final_summary_note: 'Pastikan semua data sudah benar sebelum menyelesaikan pesanan.',
            button_back: 'Kembali',
            button_next: 'Lanjut',
            button_order_whatsapp: 'Buat Pesanan via WhatsApp',
            favorites_title: 'Produk Favorit Anda',
            empty_favorites: 'Anda belum menambahkan produk favorit apapun.',
            history_title: 'Riwayat Pesanan Anda',
            empty_history: 'Anda belum memiliki riwayat pesanan.',
            history_track_order: 'Lacak Pesanan',
            history_buy_again: 'Beli Lagi',
            history_order: 'Pesanan',
            history_date: 'Tanggal',
            history_status_completed: 'Selesai',
            footer_about: 'Tentang Luxuliver',
            footer_about_text: 'Luxuliver menghadirkan koleksi T-Shirt berkualitas tinggi dengan desain eksklusif yang memadukan kenyamanan dan gaya. Dibuat untuk Anda yang ingin tampil percaya diri setiap saat.',
            footer_contact: 'Hubungi Kami',
            footer_social: 'Ikuti Kami',
            footer_social_text: '<a href="https://www.instagram.com/luxuliver" target="_blank" rel="noopener noreferrer">luxuliver</a>',
            footer_policy_title: 'Informasi & Kebijakan',
            footer_policy_privacy: 'Kebijakan Privasi',
            footer_policy_terms: 'Syarat & Ketentuan',
            footer_policy_shipping: 'Kebijakan Pengiriman',
            footer_policy_return: 'Kebijakan Pengembalian',
            footer_copyright: 'Semua Hak Cipta Dilindungi.',
            reviews_title: 'Ulasan Produk',
            reviews_count: 'ulasan',
            no_reviews_yet: 'Belum ada ulasan untuk produk ini.',
            add_to_cart: 'Tambah ke Keranjang',
            size_guide: 'Panduan Ukuran',
            share_product: 'Bagikan Produk',
            confirm_yes: 'Ya',
            confirm_no: 'Tidak',
            whatsapp_confirm_text: 'Kami telah menyiapkan pesan WhatsApp untuk Anda. Mohon kirim pesan tersebut untuk melanjutkan pesanan. Apakah Anda sudah mengirimkannya?',
            whatsapp_confirm_yes: 'Sudah, Selesaikan Pesanan',
            whatsapp_confirm_no: 'Batal',
            size_guide_title: 'Panduan Ukuran',
            size_guide_subtitle: 'Semua ukuran dalam satuan centimeter (cm).',
            th_size: 'Ukuran',
            th_length: 'Panjang Baju',
            th_width: 'Lebar Baju',
            th_sleeve: 'Panjang Lengan',
            video_gallery_title: 'Video Koleksi',
            video_gallery_subtitle: 'Lihat lebih dekat kualitas dan gaya produk kami melalui video.',
            video1_title: 'Brand Showcase',
            video2_title: 'Daily Style with Luxuliver',
            video3_title: 'Behind The Seams',
            faq_title: 'Pertanyaan yang Sering Diajukan',
            faq_q1: 'Bagaimana cara memesan produk?',
            faq_a1: 'Untuk memesan, cukup tambahkan produk ke keranjang, lanjutkan ke checkout, isi informasi Anda, lalu klik tombol \'Buat Pesanan via WhatsApp\'. Anda akan diarahkan ke WhatsApp dengan pesan otomatis yang sudah kami siapkan untuk menyelesaikan pesanan dengan admin kami.',
            faq_q2: 'Terbuat dari bahan apa T-shirt ini?',
            faq_a2: 'Semua T-shirt kami terbuat dari bahan premium berkualitas tinggi yang lembut, adem, dan nyaman dipakai sepanjang hari. Kami menjamin kualitas bahan dan sablon terbaik.',
            faq_q3: 'Bagaimana cara menentukan ukuran yang pas?',
            faq_a3: 'Kami menyediakan \'Panduan Ukuran\' detail di setiap halaman produk. Cukup klik tombol \'Panduan Ukuran\' untuk melihat tabel ukuran lengkap (panjang, lebar, dan panjang lengan) dalam centimeter untuk membantu Anda memilih ukuran yang paling tepat.',
            faq_q4: 'Apa saja metode pembayaran yang tersedia?',
            faq_a4: 'Saat ini kami menerima pembayaran melalui transfer bank (BCA, Mandiri) dan dompet digital (GoPay, OVO). Anda dapat memilih metode yang paling nyaman bagi Anda pada langkah checkout.',
            faq_q5: 'Berapa lama proses pengiriman?',
            faq_a5: 'Estimasi waktu pengiriman tergantung pada lokasi Anda dan ekspedisi yang dipilih. Untuk area Jabodetabek, biasanya memakan waktu 1-3 hari kerja. Untuk luar Jabodetabek, estimasi 3-7 hari kerja. Nomor resi akan kami informasikan melalui WhatsApp setelah pesanan dikirim.',
            policy_title_privacy: 'Kebijakan Privasi',
            privacy_p1: 'Kami di Luxuliver sangat menghargai privasi Anda. Kebijakan ini menjelaskan informasi pribadi apa yang kami kumpulkan dan bagaimana kami menggunakannya.',
            privacy_p2: '<strong>Informasi yang Kami Kumpulkan:</strong> Kami mengumpulkan informasi yang Anda berikan langsung kepada kami, seperti nama, nomor telepon, dan alamat email saat Anda melakukan pemesanan. Informasi ini hanya digunakan untuk memproses pesanan Anda dan untuk menghubungi Anda terkait pesanan tersebut.',
            privacy_p3: '<strong>Keamanan Data:</strong> Kami tidak akan pernah membagikan, menjual, atau menyewakan informasi pribadi Anda kepada pihak ketiga tanpa persetujuan Anda, kecuali diwajibkan oleh hukum. Semua komunikasi pesanan dilakukan melalui WhatsApp untuk kemudahan dan keamanan Anda.',
            policy_title_terms: 'Syarat & Ketentuan',
            terms_p1: 'Dengan mengakses dan menggunakan situs web ini, Anda setuju untuk terikat oleh Syarat dan Ketentuan berikut.',
            terms_p2: '<strong>Pemesanan:</strong> Semua pesanan dianggap final setelah konfirmasi pembayaran diterima. Pastikan semua detail pesanan (produk, ukuran, alamat) sudah benar sebelum melakukan pembayaran.',
            terms_p3: '<strong>Harga:</strong> Harga yang tertera dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya. Harga final adalah harga yang tercantum pada ringkasan pesanan Anda di WhatsApp, termasuk detail biaya pengiriman yang akan diinformasikan langsung oleh admin sesuai dengan alamat tujuan Anda.',
            terms_p4: '<strong>Hak Cipta:</strong> Semua konten di situs ini, termasuk desain produk, gambar, dan teks, adalah milik Luxuliver dan dilindungi oleh undang-undang hak cipta.',
            policy_title_shipping: 'Kebijakan Pengiriman',
            shipping_p1: '<strong>Proses Pengiriman:</strong> Pesanan akan diproses dan dikirim dalam 1-2 hari kerja setelah konfirmasi pembayaran diterima.',
            shipping_p2: '<strong>Waktu Pengiriman:</strong> Estimasi waktu pengiriman adalah 1-3 hari kerja untuk Jabodetabek dan 3-7 hari kerja untuk kota-kota lain di Indonesia. Keterlambatan oleh pihak ekspedisi berada di luar tanggung jawab kami.',
            shipping_p3: '<strong>Biaya Kirim & Pelacakan:</strong> Biaya pengiriman akan diinformasikan oleh admin kami melalui WhatsApp. Nomor resi pelacakan juga akan diberikan setelah paket dikirim agar Anda dapat melacak status pengiriman Anda.',
            policy_title_return: 'Kebijakan Pengembalian',
            return_p1: 'Kepuasan Anda adalah prioritas kami. Kami menerima pengembalian produk dengan ketentuan sebagai berikut:',
            return_p2: '<strong>Kondisi:</strong> Produk hanya dapat dikembalikan jika ada cacat produksi atau kesalahan pengiriman dari pihak kami (salah ukuran atau salah produk).',
            return_p3: '<strong>Batas Waktu:</strong> Klaim pengembalian harus diajukan maksimal 3 hari setelah barang diterima, dengan menyertakan video unboxing sebagai bukti.',
            return_p4: '<strong>Proses:</strong> Silakan hubungi admin kami melalui WhatsApp untuk memulai proses pengembalian. Produk pengganti akan kami kirim setelah produk yang dikembalikan kami terima dan periksa. Kami tidak melayani pengembalian dana (refund).',
            toast_select_size: 'Mohon pilih ukuran baju terlebih dahulu!',
            toast_stock_not_enough: (name, size) => `Stok ${name} (${size}) tidak mencukupi!`,
            toast_quantity_updated: (name, size) => `Kuantitas ${name} (${size}) diperbarui!`,
            toast_added_to_cart: (name, size, qty) => `${qty}x ${name} (${size}) ditambahkan!`,
            toast_removed_from_cart: (name, size) => `"${name} (${size})" dihapus.`,
            toast_removed_from_favorites: (name) => `"${name}" dihapus dari favorit.`,
            toast_added_to_favorites: (name) => `"${name}" ditambahkan ke favorit!`,
            toast_product_shared: 'Produk berhasil dibagikan!',
            toast_link_copied: 'Link produk disalin ke clipboard!',
            toast_share_failed: 'Gagal membagikan produk.',
            toast_invalid_whatsapp: 'Nomor WhatsApp tidak valid (10-15 digit angka).',
            toast_step_not_complete: (step) => `Mohon lengkapi semua data pada langkah ${step}.`,
            toast_order_confirmed: 'Pesanan Anda berhasil dikonfirmasi!',
            toast_order_cancelled: 'Pesanan dibatalkan. Keranjang Anda tetap utuh.',
            toast_order_rebought: (orderId) => `Produk dari pesanan ${orderId} berhasil ditambahkan kembali!`,
            confirm_remove_from_cart: (name, size) => `Hapus "${name} (${size})" dari keranjang?`,
            promo_upsell: (items) => `Tambah ${items} barang lagi untuk dapat diskon 2%!`,
            stock_limited: 'Stok Terbatas!',
            stock_out: 'Stok Habis',
            add_button: 'Tambah',
            button_use_saved_address: 'Gunakan Alamat Tersimpan',
            toast_address_loaded: 'Alamat berhasil dimuat!',
            button_save_for_later: 'Simpan untuk Nanti',
            button_move_to_cart: 'Pindahkan ke Keranjang',
            saved_for_later_title: 'Disimpan untuk Nanti',
            toast_moved_to_saved: (name, size) => `"${name} (${size})" disimpan.`,
            toast_moved_to_cart: (name, size) => `"${name} (${size})" dipindahkan ke keranjang.`,
            sidebar_recently_viewed: 'Terakhir Dilihat',
            empty_recently_viewed: 'Anda belum melihat produk apapun.',
            notif_promo_1_title: 'Belanja Kapan Aja, Diskon nya Tetap Ada!',
            notif_promo_1_desc: 'Diskon 2% untuk pembelian minimal 5 item.',
            notif_info_1_title: 'Pengiriman tetap aktif setiap hari Senin sampai Sabtu!',
            notif_info_1_desc: 'Beli sekarang, kirim rutin setiap Senin–Sabtu. Gak pakai nunggu lama.',
            notif_info_2_title: 'Koleksi Baru Akan Telah Tiba!',
            notif_info_2_desc: 'Lihat koleksi T-shirt Classy terbaru pada tanggal 4 Agustus 2025 di halaman koleksi.',
            notif_promo_2_title: 'Potongan Ongkir Khusus Jabodetabek!',
            notif_promo_2_desc: 'Ongkir lebih hemat untuk Jabodetabek.',
            checkout_in_progress_warning: 'Selesaikan atau batalkan checkout untuk menambah produk lain.',
            recommendations_title: 'Anda Mungkin Juga Suka',
            sidebar_follow_us: 'Ikuti Kami',
            footer_social: 'Ikuti Kami',
            follow_instagram: 'Instagram',
            follow_tiktok: 'TikTok',
        },
        en: {
            nav_home: 'Home',
            nav_collections: 'Collections',
            nav_cart: 'Cart',
            nav_favorites: 'Favorites',
            nav_history: 'History',
            sidebar_title: 'Menu & Filters',
            sidebar_main_menu: 'Main Menu',
            sidebar_availability: 'Availability',
            sidebar_all_products: 'All Products',
            sidebar_in_stock: 'In Stock',
            sidebar_color: 'Color',
            sidebar_all_colors: 'All Colors',
            color_black: 'Black',
            color_white: 'White',
            sidebar_design: 'Design',
            sidebar_all_designs: 'All Designs',
            design_classy: 'Classy',
            design_abstract: 'Abstract',
            sidebar_display_mode: 'Display Mode',
            sidebar_language: 'Language',
            sidebar_video_gallery: 'Video Gallery',
            sidebar_reset_filters: 'Reset All Filters',
            hero_title: 'Stylish T-Shirts that boost your confidence!',
            hero_subtitle: 'Discover a collection of stylish and comfortable apparel that makes you confident every day.',
            hero_button: 'Explore Collections',
            search_placeholder: 'Search product name...',
            search_button: 'Search',
            all_collections_title: 'All Collections',
            no_results: 'Product not found.',
            cart_title: 'Shopping Cart',
            empty_cart: 'Your cart is empty. Let\'s start shopping!',
            subtotal: 'Subtotal',
            discount: 'Discount',
            total: 'Total',
            checkout_button: 'Proceed to Checkout',
            checkout_process_title: 'Checkout Process',
            step_info: 'Information',
            step_shipping: 'Shipping',
            step_payment: 'Payment',
            step1_title: 'Step 1: Your Contact Information',
            label_fullname: 'Full Name:',
            label_whatsapp: 'WhatsApp Number:',
            note_whatsapp: 'Format: 10-15 digits (Use local format, e.g., 08xxxxxxxx).',
            label_address: 'Full Address:',
            label_notes: 'Additional Information (Optional):',
            step2_title: 'Step 2: Choose Shipping Method',
            label_expedition: 'Choose Expedition:',
            step3_title: 'Step 3: Choose Payment Method',
            label_payment_method: 'Choose Payment:',
            final_summary_title: 'Order Summary',
            final_summary_note: 'Please ensure all data is correct before finalizing the order.',
            button_back: 'Back',
            button_next: 'Next',
            button_order_whatsapp: 'Order via WhatsApp',
            favorites_title: 'Your Favorite Products',
            empty_favorites: 'You haven\'t added any favorite products yet.',
            history_title: 'Your Order History',
            empty_history: 'You don\'t have an order history yet.',
            history_track_order: 'Track Order',
            history_buy_again: 'Buy Again',
            history_order: 'Order',
            history_date: 'Date',
            history_status_completed: 'Completed',
            footer_about: 'About Luxuliver',
            footer_about_text: 'Luxuliver presents a collection of high-quality T-Shirts with exclusive designs that blend comfort and style. Made for those who want to be confident at all times.',
            footer_contact: 'Contact Us',
            footer_social: 'Follow Us',
            footer_social_text: '<a href="https://www.instagram.com/luxuliver" target="_blank" rel="noopener noreferrer">luxuliver</a>',
            footer_policy_title: 'Information & Policies',
            footer_policy_privacy: 'Privacy Policy',
            footer_policy_terms: 'Terms & Conditions',
            footer_policy_shipping: 'Shipping Policy',
            footer_policy_return: 'Return Policy',
            footer_copyright: 'All Rights Reserved.',
            reviews_title: 'Product Reviews',
            reviews_count: 'reviews',
            no_reviews_yet: 'There are no reviews for this product yet.',
            add_to_cart: 'Add to Cart',
            size_guide: 'Size Guide',
            share_product: 'Share Product',
            confirm_yes: 'Yes',
            confirm_no: 'No',
            whatsapp_confirm_text: 'We have prepared a WhatsApp message for you. Please send it to proceed with the order. Have you sent it?',
            whatsapp_confirm_yes: 'Yes, Complete Order',
            whatsapp_confirm_no: 'Cancel',
            size_guide_title: 'Size Guide',
            size_guide_subtitle: 'All measurements are in centimeters (cm).',
            th_size: 'Size',
            th_length: 'Length',
            th_width: 'Width',
            th_sleeve: 'Sleeve',
            video_gallery_title: 'Collection Videos',
            video_gallery_subtitle: 'Get a closer look at the quality and style of our products through video.',
            video1_title: 'Brand Showcase',
            video2_title: 'Daily Style with Luxuliver',
            video3_title: 'Behind The Seams',
            faq_title: 'Frequently Asked Questions',
            faq_q1: 'How do I place an order?',
            faq_a1: 'To order, simply add products to your cart, proceed to checkout, fill in your information, and then click the \'Order via WhatsApp\' button. You will be redirected to WhatsApp with a pre-filled message to finalize the order with our admin.',
            faq_q2: 'What material are the T-shirts made of?',
            faq_a2: 'All our T-shirts are made from high-quality premium that is soft, cool, and comfortable for all-day wear. We guarantee the best quality for both materials and prints.',
            faq_q3: 'How do I find the right size?',
            faq_a3: 'We provide a detailed \'Size Guide\' on each product page. Simply click the \'Size Guide\' button to see a complete size chart (length, width, and sleeve length) in centimeters to help you choose the most accurate size.',
            faq_q4: 'What payment methods are available?',
            faq_a4: 'We currently accept payments via bank transfer (BCA, Mandiri) and digital wallets (GoPay, OVO). You can choose the most convenient method for you at the checkout step.',
            faq_q5: 'How long does shipping take?',
            faq_a5: 'Shipping time estimates depend on your location and the chosen courier. For the Jabodetabek area, it usually takes 1-3 business days. For areas outside Jabodetabek, the estimate is 3-7 business days. We will provide the tracking number via WhatsApp once the order is shipped.',
            policy_title_privacy: 'Privacy Policy',
            privacy_p1: 'We at Luxuliver highly value your privacy. This policy explains what personal information we collect and how we use it.',
            privacy_p2: '<strong>Information We Collect:</strong> We collect information you provide directly to us, such as your name, phone number, and email address when you place an order. This information is solely used to process your order and to contact you regarding that order.',
            privacy_p3: '<strong>Data Security:</strong> We will never share, sell, or rent your personal information to third parties without your consent, except as required by law. All order communications are conducted via WhatsApp for your convenience and security.',
            policy_title_terms: 'Terms & Conditions',
            terms_p1: 'By accessing and using this website, you agree to be bound by the following Terms and Conditions.',
            terms_p2: '<strong>Ordering:</strong> All orders are considered final once payment confirmation is received. Please ensure all order details (product, size, address) are correct before making a payment.',
            terms_p3: '<strong>Pricing:</strong> Prices are subject to change at any time without prior notice. The final price will be the one stated in your order summary on WhatsApp, including the shipping fee, which will be informed directly by our admin based on your delivery address.',
            terms_p4: '<strong>Copyright:</strong> All content on this site, including product designs, images, and text, is the property of Luxuliver and is protected by copyright law.',
            policy_title_shipping: 'Shipping Policy',
            shipping_p1: '<strong>Processing:</strong> Orders will be processed and shipped within 1-2 business days after payment confirmation is received.',
            shipping_p2: '<strong>Delivery Time:</strong> Estimated delivery time is 1-3 business days for Jabodetabek and 3-7 business days for other cities in Indonesia. Delays by the courier are beyond our responsibility.',
            shipping_p3: '<strong>Shipping Costs & Tracking:</strong> Shipping costs will be informed by our admin via WhatsApp. A tracking number will also be provided after the package is shipped so you can track your delivery status.',
            policy_title_return: 'Return Policy',
            return_p1: 'Your satisfaction is our priority. We accept product returns under the following conditions:',
            return_p2: '<strong>Condition:</strong> Products can only be returned if there is a manufacturing defect or a shipping error on our part (wrong size or wrong product).',
            return_p3: '<strong>Timeframe:</strong> Return claims must be submitted a maximum of 3 days after the item is received, accompanied by an unboxing video as proof.',
            return_p4: '<strong>Process:</strong> Please contact our admin via WhatsApp to initiate the return process. A replacement product will be sent after we receive and inspect the returned item. We do not offer refunds.',
            toast_select_size: 'Please select a T-shirt size first!',
            toast_stock_not_enough: (name, size) => `Stock for ${name} (${size}) is insufficient!`,
            toast_quantity_updated: (name, size) => `Quantity of ${name} (${size}) updated!`,
            toast_added_to_cart: (name, size, qty) => `${qty}x ${name} (${size}) added to cart!`,
            toast_removed_from_cart: (name, size) => `"${name} (${size})" removed from cart.`,
            toast_removed_from_favorites: (name) => `"${name}" removed from favorites.`,
            toast_added_to_favorites: (name) => `"${name}" added to favorites!`,
            toast_product_shared: 'Product shared successfully!',
            toast_link_copied: 'Product link copied to clipboard!',
            toast_share_failed: 'Failed to share product.',
            toast_invalid_whatsapp: 'Invalid WhatsApp number (10-15 digits).',
            toast_step_not_complete: (step) => `Please complete all data in step ${step}.`,
            toast_order_confirmed: 'Your order has been confirmed!',
            toast_order_cancelled: 'Order cancelled. Your cart remains intact.',
            toast_order_rebought: (orderId) => `Products from order ${orderId} were successfully re-added!`,
            confirm_remove_from_cart: (name, size) => `Remove "${name} (${size})" from the cart?`,
            promo_upsell: (items) => `Add ${items} more item(s) to get a 2% discount!`,
            stock_limited: 'Limited Stock!',
            stock_out: 'Out of Stock',
            add_button: 'Add',
            button_use_saved_address: 'Use Saved Address',
            toast_address_loaded: 'Address loaded successfully!',
            button_save_for_later: 'Save for Later',
            button_move_to_cart: 'Move to Cart',
            saved_for_later_title: 'Saved for Later',
            toast_moved_to_saved: (name, size) => `"${name} (${size})" was saved.`,
            toast_moved_to_cart: (name, size) => `"${name} (${size})" was moved to cart.`,
            sidebar_recently_viewed: 'Recently Viewed',
            empty_recently_viewed: 'You have not viewed any products yet.',
            notif_promo_1_title: 'Shop Anytime, The Discount is Always There!',
            notif_promo_1_desc: 'Get a 2% discount for a minimum purchase of 5 items.',
            notif_info_1_title: 'Shipping is active every Monday to Saturday!',
            notif_info_1_desc: 'Buy now, and we ship regularly every Monday–Saturday. No long waits.',
            notif_info_2_title: 'New Collection Has Arrived!',
            notif_info_2_desc: 'Check out the latest Classy T-shirt collection on August 4, 2025, on the collections page.',
            notif_promo_2_title: 'Special Shipping Discount for Jabodetabek!',
            notif_promo_2_desc: 'More affordable shipping for the Jabodetabek area.',
            checkout_in_progress_warning: 'Please complete or cancel the current checkout to add other products.',
            recommendations_title: 'You Might Also Like',
            sidebar_follow_us: 'Follow Us',
            footer_social: 'Follow Us',
            follow_instagram: 'Instagram',
            follow_tiktok: 'TikTok',
        }
    };

    const products = [
        {
            id: 'baju-001',
            name: 'Skeleton',
            image: 'Skeleton.jpg',
            description: 'T-Shirt paling nyaman dan bagus untuk dipakai setiap hari, cocok disemua musim.',
            basePrice: 95000,
            sizes: ['XS', 'S', 'M', 'L', 'XL'],
            color: 'putih',
            design: 'abstrak',
            stock: 15,
            reviews: [
                { author: 'Muhammad Ricky', rating: 5, text: 'Kainnya adem banget, sablonnya rapi dan kualitasnya premium, keren juga desain nya bro', date: '2025-07-04' },
                { author: 'Citra Wulandari', rating: 5, text: 'Ukurannya pas sesuai size char dan warnanya juga putih bersih, tidak menerawang, inti nya baju nya okey recommended!', date: '2025-07-03' },
                { author: 'Bima Saputra', rating: 4, text: 'Bagus, sesuai ekspektasi, mungkin lain kali akan coba desain yang lain', date: '2025-07-02' }
            ]
        },
        {
            id: 'baju-002',
            name: 'Dog and éclipse',
            image: 'Dog.jpg',
            description: 'T-Shirt paling nyaman dan bagus untuk dipakai setiap hari, cocok disemua musim.',
            basePrice: 95000,
            sizes: ['XS','S', 'M', 'L', 'XL'],
            color: 'hitam',
            design: 'abstrak',
            stock: 15,
            reviews: [
                { author: 'Dian Maulana Solihin', rating: 5, text: 'Asli bagus nih bahan nya adem banget', date: '2025-07-01' },
                { author: 'Eko Budianto', rating: 5, text: 'Bahan untuk baju nya sih nyaman dipakai seharian ya, sablonnya pun juga tahan lama setelah beberapa kali cuci', date: '2025-06-28' }
            ]
        },
        {
            id: 'baju-003',
            name: 'Travis Scott',
            image: 'Travis scoot.jpg',
            description: 'T-Shirt paling nyaman dan bagus untuk dipakai setiap hari, cocok disemua musim.',
            basePrice: 95000,
            sizes: ['XS', 'S', 'M', 'L', 'XL'],
            color: 'hitam',
            design: 'abstrak',
            stock: 3,
            reviews: [
                { author: 'Fahmi Rizky Dermawan', rating: 5, text: 'Keren abis bro, fans nya Travis Scott wajib sih ini mah punya, kualitasnya juga mantap, kaga bikin kecewa dah beli di sini', date: '2025-06-24' }
            ]
        },
        {
            id: 'baju-004',
            name: 'Person',
            image: 'Person.jpg',
            description: 'T-Shirt paling nyaman dan bagus untuk dipakai setiap hari, cocok disemua musim.',
            basePrice: 95000,
            sizes: ['XS', 'S', 'M', 'L', 'XL'],
            color: 'hitam',
            design: 'abstrak',
            stock: 15,
            reviews: [
                { author: 'Farhan Mahendra', rating: 4, text: 'Jujur bahan nya bagus banget, desain nya juga okey kalo menurut gua', date: '2025-06-20' }
            ]
        },
        {
            id: 'baju-005',
            name: 'Atelier Noir',
            image: 'Atelier Noir.jpg',
            description: 'Desain classy minimalis untuk tampilan yang bersih dan elegan.',
            basePrice: 100000,
            sizes: ['XS','S', 'M', 'L', 'XL'],
            color: 'hitam',
            design: 'classy',
            stock: 5,
        },
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
        { id: 'jne', name: 'JNE', logo: 'JNE.jpg' },
        { id: 'jnt', name: 'J&T', logo: 'J&T.jpg' }
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

    let cart = getLocalStorageItem('cart', []);
    let favorites = getLocalStorageItem('favorites', []);
    let savedForLater = getLocalStorageItem('savedForLater', []);
    let recentlyViewed = getLocalStorageItem('recentlyViewed', []);

    let orderCounter = parseInt(localStorage.getItem('orderCounter')) || 1000;
    let pendingOrder = null;
    let currentLanguage = localStorage.getItem('language') || 'id';
    const MAX_RECENTLY_VIEWED = 3;

    let activeFilters = {
        availability: 'all',
        color: 'all',
        design: 'all'
    };

    const body = document.body;
    const productList = document.getElementById('product-list');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartCountSpan = document.getElementById('cart-count');
    const subtotalPriceSpan = document.getElementById('subtotal-price');
    const discountAmountSpan = document.getElementById('discount-amount');
    const totalPriceSpan = document.getElementById('total-price');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const noResultsMessage = document.getElementById('no-results-message');
    const checkoutBtn = document.getElementById('checkout-btn');
    const cartSummary = document.getElementById('cart-summary');
    const checkoutFormContainer = document.getElementById('checkout-form-container');
    const checkoutForm = document.getElementById('checkout-form');
    const currentYearSpan = document.getElementById('current-year');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchSuggestionsContainer = document.getElementById('search-suggestions-container');
    const backToTopButton = document.getElementById('back-to-top');
    const toastContainer = document.getElementById('toast-container');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const loadingScreen = document.getElementById('loading-screen');
    const loadingVideo = document.getElementById('loading-video');
    const quickViewModal = document.getElementById('quick-view-modal');
    const modalSizeOptions = document.getElementById('modal-size-options');
    const sizeGuideModal = document.getElementById('size-guide-modal');
    const modalSizeGuideBtn = document.getElementById('modal-size-guide-btn');
    const sizeChartTableBody = document.getElementById('size-chart-table').querySelector('tbody');
    const sellerAddressSpan = document.getElementById('seller-address');
    const sellerPhoneSpan = document.getElementById('seller-phone');
    const sellerEmailSpan = document.getElementById('seller-email');
    const sellerPhoneLink = document.getElementById('seller-phone-link');
    const sellerEmailLink = document.getElementById('seller-email-link');
    const favoriteCountSpan = document.getElementById('favorite-count');
    const favoriteProductsList = document.getElementById('favorite-products-list');
    const emptyFavoritesMessage = document.getElementById('empty-favorites-message');
    const progressBar = document.getElementById('progress-bar');
    const checkoutSteps = document.querySelectorAll('.checkout-step');
    const prevStepBtn = document.getElementById('prev-step-btn');
    const nextStepBtn = document.getElementById('next-step-btn');
    const submitOrderBtn = document.getElementById('submit-order-btn');
    const finalOrderSummaryContainer = document.getElementById('final-order-summary');
    let currentStep = 1;
    const confirmationModal = document.getElementById('confirmation-modal');
    const confirmMessage = document.getElementById('confirm-message');
    const confirmYesBtn = document.getElementById('confirm-yes');
    const confirmNoBtn = document.getElementById('confirm-no');
    const promoUpsellMessage = document.getElementById('promo-upsell-message');
    const whatsappConfirmationModal = document.getElementById('whatsapp-confirmation-modal');
    const whatsappConfirmYesBtn = document.getElementById('whatsapp-confirm-yes');
    const whatsappConfirmNoBtn = document.getElementById('whatsapp-confirm-no');
    const orderHistoryList = document.getElementById('order-history-list');
    const emptyHistoryMessage = document.getElementById('empty-history-message');
    const sidebar = document.getElementById('sidebar');
    const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
    const sidebarCloseBtn = document.getElementById('sidebar-close-btn');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const resetFiltersBtn = document.getElementById('reset-filters-btn');
    const videoGalleryBtn = document.getElementById('video-gallery-btn');
    const videoGalleryModal = document.getElementById('video-gallery-modal');
    const languageToggleButtons = document.getElementById('language-toggle-buttons');
    const cartCountSidebar = document.getElementById('cart-count-sidebar');
    const favoriteCountSidebar = document.getElementById('favorite-count-sidebar');
    const useSavedAddressBtn = document.getElementById('use-saved-address-btn');
    const savedForLaterContainer = document.getElementById('saved-for-later-container');
    const savedForLaterSection = document.getElementById('saved-for-later-section');
    const recentlyViewedContainer = document.getElementById('recently-viewed-container');
    const emptyRecentlyViewedMessage = document.getElementById('empty-recently-viewed-message');
    const sidebarSubmenus = document.querySelectorAll('.sidebar-submenu');

    const notificationSidebarBtn = document.getElementById('notification-sidebar-btn');
    const notificationModal = document.getElementById('notification-modal');
    const notificationListContainer = document.getElementById('notification-list');
    const notificationTabs = document.querySelector('.notification-tabs');
    const emptyNotificationMessage = document.getElementById('empty-notification-message');


    const formatRupiah = (number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentValue = Math.floor(progress * (end - start) + start);
            obj.innerHTML = formatRupiah(currentValue);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    const formatNotificationTimestamp = (isoString) => {
        const now = new Date();
        const notificationDate = new Date(isoString);
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
        const notificationDay = new Date(notificationDate.getFullYear(), notificationDate.getMonth(), notificationDate.getDate());
        const timeString = notificationDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

        if (notificationDay.getTime() === today.getTime()) return `Hari ini, ${timeString}`;
        if (notificationDay.getTime() === yesterday.getTime()) return `Kemarin, ${timeString}`;
        return notificationDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    const renderNotifications = (filter = 'all') => {
        notificationListContainer.innerHTML = '';
        const filteredNotifications = notificationsData.filter(notif => filter === 'all' || notif.category === filter)
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        emptyNotificationMessage.style.display = filteredNotifications.length === 0 ? 'block' : 'none';
        notificationListContainer.style.display = filteredNotifications.length === 0 ? 'none' : 'block';

        filteredNotifications.forEach(notif => {
            const notifElement = document.createElement('div');
            notifElement.className = `notification-item category-${notif.category}`;
            const titleText = translations[currentLanguage][notif.title] || notif.title;
            const descriptionText = translations[currentLanguage][notif.description] || notif.description;
            notifElement.innerHTML = `
                <div class="notification-icon"><i class="${notif.icon}"></i></div>
                <div class="notification-content">
                    <div class="notification-header">
                        <h4 class="notification-title">${titleText}</h4>
                        <span class="notification-timestamp">${formatNotificationTimestamp(notif.timestamp)}</span>
                    </div>
                    <p class="notification-description">${descriptionText}</p>
                </div>`;
            notificationListContainer.appendChild(notifElement);
        });
    };

    const refreshAllCartViews = () => {
        renderCart();
        if (checkoutFormContainer.style.display === 'block' && currentStep === 3) {
            renderFinalSummary();
        }
    };

    const showQuantitySelector = (container, product, onConfirm) => {
        if (container.classList.contains('quantity-selector-active')) return;
        container.classList.add('quantity-selector-active');
        const originalButtons = Array.from(container.children);
        originalButtons.forEach(btn => btn.style.display = 'none');
        let quantity = 1;
        const selectorContainer = document.createElement('div');
        selectorContainer.className = 'quantity-selector-ui';
        selectorContainer.style.width = '100%';
        const topRow = document.createElement('div');
        topRow.style.cssText = 'display:flex;align-items:center;justify-content:center;gap:15px;margin-bottom:10px;';
        const btnDecrease = document.createElement('button');
        btnDecrease.textContent = '-';
        const quantityDisplay = document.createElement('strong');
        quantityDisplay.textContent = quantity;
        const btnIncrease = document.createElement('button');
        btnIncrease.textContent = '+';
        const bottomRow = document.createElement('div');
        bottomRow.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:10px;';
        const btnConfirm = document.createElement('button');
        btnConfirm.innerHTML = `<i class="fas fa-check"></i> ${translations[currentLanguage].add_to_cart}`;
        const btnCancel = document.createElement('button');
        btnCancel.textContent = translations[currentLanguage].confirm_no;
        quantityDisplay.style.cssText = 'font-size:1.4rem;min-width:30px;text-align:center;';
        [btnDecrease, btnIncrease].forEach(btn => {
            btn.className = 'btn btn-secondary';
            btn.style.cssText = 'padding:10px;line-height:1;min-width:45px;border-radius:50%;';
        });
        btnConfirm.className = 'btn btn-primary';
        btnCancel.className = 'btn btn-secondary';
        const cleanup = () => {
            selectorContainer.remove();
            originalButtons.forEach(btn => btn.style.display = '');
            container.classList.remove('quantity-selector-active');
        };
        btnDecrease.onclick = () => { if (quantity > 1) quantityDisplay.textContent = --quantity; };
        btnIncrease.onclick = () => { if (quantity < product.stock) quantityDisplay.textContent = ++quantity; };
        btnConfirm.onclick = () => { onConfirm(quantity); cleanup(); };
        btnCancel.onclick = cleanup;
        topRow.append(btnDecrease, quantityDisplay, btnIncrease);
        bottomRow.append(btnCancel, btnConfirm);
        selectorContainer.append(topRow, bottomRow);
        container.appendChild(selectorContainer);
    };

    const addToCart = (productId, size, quantity, triggerElement) => {
        if (checkoutFormContainer.style.display === 'block') {
            showToast('checkout_in_progress_warning', 'warning');
            return;
        }
        const product = products.find(p => p.id === productId);
        if (!product || quantity <= 0) return;
        const cartItemIdentifier = `${productId}-${size}`;
        const existingItem = cart.find(item => item.cartId === cartItemIdentifier);
        const totalStock = product.stock;
        const currentQtyInCart = existingItem ? existingItem.quantity : 0;
        if (currentQtyInCart + quantity > totalStock) {
            showToast('toast_stock_not_enough', "error", { name: product.name, size: size });
            return;
        }
        const price = getPriceBySize(product.basePrice, size);
        if (existingItem) {
            existingItem.quantity += quantity;
            showToast('toast_quantity_updated', 'info', { name: product.name, size: size });
        } else {
            cart.push({ ...product, price, size, quantity, cartId: cartItemIdentifier });
        }
        showToast('toast_added_to_cart', 'success', { name: product.name, size: size, qty: quantity });
        saveCart();
        refreshAllCartViews();
        if (triggerElement) flyToCartAnimation(triggerElement);
    };

    const renderCart = () => {
        const oldTotalSpan = document.getElementById('total-price');
        const oldTotalValue = parseInt(oldTotalSpan.textContent.replace(/[^0-9]/g, '')) || 0;
        const { subtotal, totalItems, discount, total } = calculateCartTotals();
        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
            cartSummary.style.display = 'none';
            checkoutFormContainer.style.display = 'none';
            cartItemsContainer.style.display = 'none';
        } else {
            emptyCartMessage.style.display = 'none';
            cartItemsContainer.style.display = 'block';
            cart.forEach(item => {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.className = 'cart-item';
                cartItemDiv.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-details">
                        <h4>${item.name} (${item.size})</h4>
                        <p>Harga: ${formatRupiah(item.price)}</p>
                        <p>Jumlah: <strong>${item.quantity}</strong></p>
                        <button class="btn-utility save-for-later-btn" data-cart-id="${item.cartId}" style="padding: 5px 10px; font-size: 0.9rem; margin-top: 10px;">
                            <i class="far fa-bookmark"></i> <span data-lang-key="button_save_for_later">${translations[currentLanguage].button_save_for_later}</span>
                        </button>
                    </div>
                    <div class="item-price">${formatRupiah(item.price * item.quantity)}</div>
                    <button class="btn btn-danger remove-from-cart-btn" data-cart-id="${item.cartId}" title="Hapus item" style="padding: 10px 15px; min-width: 45px;">
                        <i class="fas fa-trash-alt"></i>
                    </button>`;
                cartItemsContainer.appendChild(cartItemDiv);
            });
            if (checkoutFormContainer.style.display !== 'block') {
                cartSummary.style.display = 'block';
            }
        }

        cartItemsContainer.querySelectorAll('.remove-from-cart-btn').forEach(btn => {
            btn.onclick = e => {
                const cartId = e.currentTarget.dataset.cartId;
                const item = cart.find(i => i.cartId === cartId);
                if (item) {
                    showConfirmationModal(
                        translations[currentLanguage].confirm_remove_from_cart(item.name, item.size),
                        () => {
                            cart = cart.filter(cartItem => cartItem.cartId !== cartId);
                            saveCart();
                            refreshAllCartViews();
                            showToast('toast_removed_from_cart', 'info', { name: item.name, size: item.size });
                        }
                    );
                }
            };
        });

        cartItemsContainer.querySelectorAll('.save-for-later-btn').forEach(btn => {
            btn.onclick = e => moveToSavedForLater(e.currentTarget.dataset.cartId);
        });

        if (totalItems > 0 && totalItems < 5) {
            promoUpsellMessage.textContent = translations[currentLanguage].promo_upsell(5 - totalItems);
            promoUpsellMessage.style.display = 'block';
        } else {
            promoUpsellMessage.style.display = 'none';
        }

        cartCountSpan.textContent = totalItems;
        cartCountSidebar.textContent = totalItems;
        subtotalPriceSpan.textContent = formatRupiah(subtotal);
        discountAmountSpan.textContent = `- ${formatRupiah(discount)}`;
        animateValue(totalPriceSpan, oldTotalValue, total, 500);
        renderSavedForLater();
    };

    function attachProductCardListeners(container) {
        container.querySelectorAll('.product-card').forEach(card => {
            const productId = card.dataset.productId;
            const product = products.find(p => p.id === productId);
            card.querySelector('.size-options').addEventListener('click', e => {
                if (e.target.classList.contains('size-option')) {
                    e.target.parentElement.querySelectorAll('.size-option').forEach(opt => opt.classList.remove('selected'));
                    e.target.classList.add('selected');
                }
            });
            const addToCartBtn = card.querySelector('.add-to-cart');
            const actionsContainer = card.querySelector('.product-actions');
            addToCartBtn.addEventListener('click', () => {
                if (checkoutFormContainer.style.display === 'block') {
                    showToast('checkout_in_progress_warning', 'warning');
                    return;
                }
                if (actionsContainer.classList.contains('quantity-selector-active') || product.stock === 0) return;
                const selectedSizeEl = card.querySelector('.size-option.selected');
                if (!selectedSizeEl) {
                    showToast('toast_select_size', 'warning');
                    return;
                }
                showQuantitySelector(actionsContainer, product, (quantity) => {
                    addToCart(productId, selectedSizeEl.dataset.size, quantity, card);
                });
            });
            card.querySelector('.quick-view-btn').addEventListener('click', () => openQuickViewModal(productId));
            card.querySelector('.add-to-favorite').addEventListener('click', e => toggleFavorite(productId, e.currentTarget));
        });
    }

    const renderRecommendations = (currentProduct) => {
        const recommendationsContainer = document.getElementById('modal-recommendations');
        const recommendationsGrid = document.getElementById('modal-recommendations-grid');

        if (!currentProduct || !currentProduct.design) {
            recommendationsContainer.style.display = 'none';
            return;
        }

        const recommendedProducts = products.filter(p =>
            p.design === currentProduct.design && p.id !== currentProduct.id
        ).slice(0, 3);

        if (recommendedProducts.length === 0) {
            recommendationsContainer.style.display = 'none';
            return;
        }

        recommendationsGrid.innerHTML = '';
        recommendedProducts.forEach(product => {
            const card = document.createElement('div');
            card.className = 'recommendation-card';
            card.dataset.productId = product.id;
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="recommendation-card-info">
                    <h5>${product.name}</h5>
                </div>
            `;
            card.addEventListener('click', () => {
                closeModal(quickViewModal);
                setTimeout(() => openQuickViewModal(product.id), 300);
            });
            recommendationsGrid.appendChild(card);
        });

        recommendationsContainer.style.display = 'block';
    };

    const openQuickViewModal = (productId) => {
        recentlyViewed = recentlyViewed.filter(id => id !== productId);
        recentlyViewed.unshift(productId);
        if (recentlyViewed.length > MAX_RECENTLY_VIEWED) recentlyViewed.length = MAX_RECENTLY_VIEWED;
        localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
        renderRecentlyViewed();
        const product = products.find(p => p.id === productId);
        if (!product) return;
        const startImageElement = document.querySelector(`.product-card[data-product-id="${productId}"] img`);
        const modalContent = quickViewModal.querySelector('.modal-content');
        modalContent.dataset.productId = productId;
        quickViewModal.querySelector('img').src = product.image;
        quickViewModal.querySelector('img').alt = product.name;
        document.getElementById('modal-product-name').textContent = product.name;
        document.getElementById('modal-product-description').textContent = product.description;
        const updateModalPrice = (size) => {
            document.getElementById('modal-product-price').textContent = formatRupiah(getPriceBySize(product.basePrice, size));
        };
        modalSizeOptions.innerHTML = product.sizes.map(size => `<span class="size-option" data-size="${size}">${size}</span>`).join('');
        modalSizeOptions.querySelectorAll('.size-option').forEach(option => {
            option.addEventListener('click', e => {
                modalSizeOptions.querySelectorAll('.size-option').forEach(opt => opt.classList.remove('selected'));
                e.target.classList.add('selected');
                updateModalPrice(e.target.dataset.size);
            });
        });
        const defaultSizeOption = modalSizeOptions.querySelector('.size-option[data-size="M"]') || modalSizeOptions.querySelector('.size-option');
        if (defaultSizeOption) {
            defaultSizeOption.classList.add('selected');
            updateModalPrice(defaultSizeOption.dataset.size);
        }
        const modalActionsContainer = quickViewModal.querySelector('.modal-buttons-group');
        modalActionsContainer.innerHTML = `
            <button class="btn btn-primary" id="modal-add-to-cart-btn"><i class="fas fa-shopping-cart"></i> <span>${translations[currentLanguage].add_to_cart}</span></button>
            <button class="btn add-to-favorite modal-add-to-favorite"><i class="far fa-heart"></i></button>`;
        const newModalAddToCartBtn = modalActionsContainer.querySelector('#modal-add-to-cart-btn');
        newModalAddToCartBtn.disabled = product.stock === 0;
        newModalAddToCartBtn.addEventListener('click', () => {
            if (checkoutFormContainer.style.display === 'block') {
                showToast('checkout_in_progress_warning', 'warning');
                return;
            }
            if (modalActionsContainer.classList.contains('quantity-selector-active') || product.stock === 0) return;
            const selectedSizeEl = modalSizeOptions.querySelector('.size-option.selected');
            if (!selectedSizeEl) {
                showToast("toast_select_size", "warning");
                return;
            }
            showQuantitySelector(modalActionsContainer, product, (quantity) => {
                addToCart(productId, selectedSizeEl.dataset.size, quantity, quickViewModal);
                closeModal(quickViewModal);
            });
        });
        modalActionsContainer.querySelector('.modal-add-to-favorite').addEventListener('click', e => toggleFavorite(productId, e.currentTarget));
        quickViewModal.querySelector('.modal-share-product-btn').onclick = () => shareProduct(product);
        renderReviews(product);
        renderRecommendations(product);
        if (startImageElement) {
            implementSharedElementTransition(startImageElement, quickViewModal, () => updateAllFavoriteButtons());
        } else {
            openModal(quickViewModal);
            updateAllFavoriteButtons();
        }
    };

    const moveToSavedForLater = (cartId) => {
        const itemIndex = cart.findIndex(item => item.cartId === cartId);
        if (itemIndex > -1) {
            const item = cart[itemIndex];
            savedForLater.push(item);
            cart.splice(itemIndex, 1);
            saveCart();
            saveSavedForLater();
            refreshAllCartViews();
            showToast('toast_moved_to_saved', 'info', { name: item.name, size: item.size });
        }
    };

    const moveToCart = (cartId) => {
        if (checkoutFormContainer.style.display === 'block') {
            showToast('checkout_in_progress_warning', 'warning');
            return;
        }
        const itemIndex = savedForLater.findIndex(item => item.cartId === cartId);
        if (itemIndex > -1) {
            const item = savedForLater[itemIndex];
            addToCart(item.id, item.size, item.quantity, null);
            savedForLater.splice(itemIndex, 1);
            saveSavedForLater();
            showToast('toast_moved_to_cart', 'success', { name: item.name, size: item.size });
        }
    };

    const renderRadioOptions = (containerId, optionsData, inputName) => {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = optionsData.map(option => `
            <div class="radio-option">
                <input type="radio" id="${option.id}" name="${inputName}" value="${option.name}" required>
                <label for="${option.id}" class="radio-tile">
                    <img src="${option.logo}" alt="${option.name} logo">
                    <span>${option.name}</span>
                </label>
            </div>`).join('');
        const firstRadio = container.querySelector('input[type="radio"]');
        if (firstRadio) firstRadio.checked = true;
    };

    const renderRecentlyViewed = () => {
        if (!recentlyViewedContainer) return;
        emptyRecentlyViewedMessage.textContent = translations[currentLanguage].empty_recently_viewed;
        if (recentlyViewed.length === 0) {
            recentlyViewedContainer.innerHTML = '';
            recentlyViewedContainer.appendChild(emptyRecentlyViewedMessage);
            emptyRecentlyViewedMessage.style.display = 'block';
            return;
        }
        emptyRecentlyViewedMessage.style.display = 'none';
        recentlyViewedContainer.innerHTML = recentlyViewed.map(productId => {
            const product = products.find(p => p.id === productId);
            if (!product) return '';
            return `<li><a href="#" class="recently-viewed-item-link" data-product-id="${product.id}"><img src="${product.image}" alt="${product.name}"><span>${product.name}</span></a></li>`;
        }).join('');
        recentlyViewedContainer.querySelectorAll('.recently-viewed-item-link').forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                openQuickViewModal(e.currentTarget.dataset.productId);
                if (body.classList.contains('sidebar-open')) toggleSidebar();
            });
        });
    };

    const getPriceBySize = (basePrice, size) => size && size.toUpperCase() === 'XL' ? basePrice + 5000 : basePrice;

    const generateStarsHTML = (rating) => {
        let stars = '';
        for (let i = 1; i <= 5; i++) stars += `<i class="${i <= rating ? 'fas' : 'far'} fa-star"></i>`;
        return stars;
    };

    const showToast = (messageKey, type = 'info', context = {}) => {
        let message = translations[currentLanguage][messageKey];
        if (typeof message === 'function') message = message(context.name, context.size, context.qty);
        if (context.itemsNeeded) message = translations[currentLanguage][messageKey](context.itemsNeeded);
        if (context.step) message = translations[currentLanguage][messageKey](context.step);
        if (context.orderId) message = translations[currentLanguage][messageKey](context.orderId);
        const toast = document.createElement('div');
        toast.className = `toast-notification ${type}`;
        toast.textContent = message;
        toastContainer.appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => {
            toast.classList.remove('show');
            toast.addEventListener('transitionend', () => toast.remove());
        }, 3000);
    };

    const openModal = (modalElement) => {
        modalElement.classList.add('show');
        body.classList.add('no-scroll');
    };

    const closeModal = (modalElement) => {
        modalElement.classList.remove('show');
        if (modalElement.id === 'video-gallery-modal') {
            modalElement.querySelectorAll('video').forEach(video => {
                video.pause();
                video.currentTime = 0;
            });
        }
        if (!body.classList.contains('sidebar-open')) body.classList.remove('no-scroll');
    };

    const renderSizeGuide = () => {
        sizeChartTableBody.innerHTML = '';
        sizeGuideData.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${item.size}</td><td>${item.length}</td><td>${item.width}</td><td>${item.sleeve}</td>`;
            sizeChartTableBody.appendChild(row);
        });
        openModal(sizeGuideModal);
    };

    const shareProduct = async (product) => {
        const shareData = { title: product.name, text: `Lihat T-Shirt keren "${product.name}" ini di Luxuliver Shop! Harga mulai ${formatRupiah(product.basePrice)}. ${product.description}`, url: window.location.href };
        try {
            if (navigator.share) {
                await navigator.share(shareData);
                showToast('toast_product_shared', 'success');
            } else {
                navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`).then(() => showToast('toast_link_copied', 'info'));
            }
        } catch (err) {
            if (err.name !== 'AbortError') showToast('toast_share_failed', 'error');
        }
    };

    const flyToCartAnimation = (startElement) => {
        const productImg = startElement.querySelector('img');
        if (!productImg) return;
        const startRect = productImg.getBoundingClientRect();
        const cartIcon = document.querySelector('#keranjang a, #cart-count-sidebar');
        const endRect = cartIcon.getBoundingClientRect();
        const flyingClone = productImg.cloneNode(true);
        flyingClone.className = 'flying-product-clone';
        Object.assign(flyingClone.style, { left: `${startRect.left}px`, top: `${startRect.top}px`, width: `${startRect.width}px`, height: `${startRect.height}px`, opacity: '1' });
        document.body.appendChild(flyingClone);
        requestAnimationFrame(() => {
            Object.assign(flyingClone.style, { left: `${endRect.left + (endRect.width / 2) - 15}px`, top: `${endRect.top + (endRect.height / 2) - 15}px`, width: '30px', height: '30px', opacity: '0.5' });
        });
        flyingClone.addEventListener('transitionend', () => {
            flyingClone.remove();
            cartIcon.classList.add('cart-pop-animation');
            cartIcon.addEventListener('animationend', () => cartIcon.classList.remove('cart-pop-animation'), { once: true });
        }, { once: true });
    };

    const saveAddress = () => {
        const addressData = { name: document.getElementById('customer-name').value, phone: document.getElementById('customer-phone').value, address: document.getElementById('customer-address').value };
        if (addressData.name && addressData.phone && addressData.address) localStorage.setItem('savedAddress', JSON.stringify(addressData));
    };

    const loadSavedAddress = () => {
        const savedAddress = JSON.parse(localStorage.getItem('savedAddress'));
        if (savedAddress) {
            document.getElementById('customer-name').value = savedAddress.name;
            document.getElementById('customer-phone').value = savedAddress.phone;
            document.getElementById('customer-address').value = savedAddress.address;
            showToast('toast_address_loaded', 'success');
        }
    };

    const renderSavedForLater = () => {
        savedForLaterContainer.innerHTML = '';
        if (savedForLater.length > 0) {
            savedForLaterSection.style.display = 'block';
            savedForLater.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'cart-item';
                itemDiv.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-details">
                        <h4>${item.name} (${item.size})</h4>
                        <p>${formatRupiah(item.price)}</p>
                    </div>
                    <div class="item-actions" style="margin-left: auto; display:flex; gap: 10px;">
                         <button class="btn btn-secondary move-to-cart-btn" data-cart-id="${item.cartId}"><span data-lang-key="button_move_to_cart">${translations[currentLanguage].button_move_to_cart}</span></button>
                        <button class="btn btn-danger remove-from-saved-btn" data-cart-id="${item.cartId}"><i class="fas fa-trash"></i></button>
                    </div>`;
                savedForLaterContainer.appendChild(itemDiv);
            });
            savedForLaterContainer.querySelectorAll('.move-to-cart-btn').forEach(btn => btn.onclick = e => moveToCart(e.currentTarget.dataset.cartId));
            savedForLaterContainer.querySelectorAll('.remove-from-saved-btn').forEach(btn => {
                btn.onclick = e => {
                    const cartIdToRemove = e.currentTarget.dataset.cartId;
                    const item = savedForLater.find(i => i.cartId === cartIdToRemove);
                    if (!item) return;
                    showConfirmationModal(translations[currentLanguage].confirm_remove_from_cart(item.name, item.size), () => {
                        savedForLater = savedForLater.filter(i => i.cartId !== cartIdToRemove);
                        saveSavedForLater();
                        renderSavedForLater();
                        showToast('toast_removed_from_cart', 'info', { name: item.name, size: item.size });
                    });
                };
            });
        } else {
            savedForLaterSection.style.display = 'none';
        }
    }
    const saveSavedForLater = () => localStorage.setItem('savedForLater', JSON.stringify(savedForLater));

    checkoutForm.addEventListener('submit', e => {
        e.preventDefault();
        if (!validateStep(3)) return;
        const customerPhoneInput = document.getElementById('customer-phone').value;
        if (!/^[0-9]{10,15}$/.test(customerPhoneInput)) {
            showToast("invalid_whatsapp", "error");
            return;
        }
        const { total, subtotal, discount, shippingDiscount } = calculateCartTotals();
        const orderId = `LXVR-${orderCounter}`;
        const formData = new FormData(checkoutForm);
        const customerNotes = formData.get('customer-notes').trim();
        const notesText = customerNotes ? `*Catatan:* ${customerNotes}\n` : '';
        const shippingDiscountText = shippingDiscount > 0 ? `*Promo Ongkir (Jabodetabek):* -${formatRupiah(shippingDiscount)}\n` : '';
        let orderDetails = `*Order Baru dari Luxuliver Shop*\n\n` +
            `*ID Pesanan:* ${orderId}\n` +
            `*Nama:* ${formData.get('customer-name')}\n*Telepon:* ${formData.get('customer-phone')}\n*Alamat:* ${formData.get('customer-address')}\n` +
            notesText + `*Ekspedisi:* ${formData.get('expeditionMethod')}\n*Pembayaran:* ${formData.get('paymentMethod')}\n\n*Detail Pesanan:*\n` +
            cart.map(item => `- ${item.name} (${item.size}) x ${item.quantity} = ${formatRupiah(item.price * item.quantity)}`).join('\n') + `\n\n*Subtotal:* ${formatRupiah(subtotal)}\n` +
            `*Diskon Pembelian:* -${formatRupiah(discount)}\n` + shippingDiscountText + `*Total Pembayaran:* ${formatRupiah(total)}\n\n` + `Terima kasih! Detail biaya pengiriman (setelah promo) akan diinfokan oleh admin kami.`;
        pendingOrder = { orderId, date: new Date().toISOString(), items: [...cart], total };
        window.open(`https://wa.me/${sellerInfo.whatsappAdmin}?text=${encodeURIComponent(orderDetails)}`, '_blank');
        openModal(whatsappConfirmationModal);
    });

    whatsappConfirmYesBtn.addEventListener('click', () => {
        if (pendingOrder) {
            let orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
            orderHistory.unshift(pendingOrder);
            localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
            orderCounter++;
            localStorage.setItem('orderCounter', orderCounter.toString());
            saveAddress();
            cart = [];
            saveCart();
            refreshAllCartViews();
            renderOrderHistory();
            checkoutForm.reset();
            closeModal(whatsappConfirmationModal);
            showToast("toast_order_confirmed", "success");
            pendingOrder = null;
        }
    });

    whatsappConfirmNoBtn.addEventListener('click', () => {
        pendingOrder = null;
        closeModal(whatsappConfirmationModal);
        showToast("toast_order_cancelled", "warning");
    });

    const renderSkeletonLoaders = (container, count) => {
        container.innerHTML = Array(count).fill(0).map(() => `
            <div class="skeleton-card">
                <div class="skeleton-image"></div>
                <div class="skeleton-info">
                    <div class="skeleton-text skeleton-text-lg"></div>
                    <div class="skeleton-text skeleton-text-sm"></div>
                    <div class="skeleton-text-xs"></div>
                    <div class="skeleton-button-group">
                        <div class="skeleton-button-main"></div>
                        <div class="skeleton-button-secondary"></div>
                        <div class="skeleton-button-secondary"></div>
                    </div>
                </div>
            </div>`).join('');
    };

    const createProductCardHTML = (product) => {
        const isFavorited = favorites.some(fav => fav.id === product.id);
        const price = getPriceBySize(product.basePrice, 'M');
        const lowStockLabel = product.stock > 0 && product.stock <= 5 ? `<div class="low-stock-badge">${translations[currentLanguage].stock_limited}</div>` : '';
        const outOfStockLabel = product.stock === 0 ? `<div class="out-of-stock-badge">${translations[currentLanguage].stock_out}</div>` : '';
        const totalReviews = product.reviews ? product.reviews.length : 0;
        const averageRating = totalReviews > 0 ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews : 0;
        const ratingHTML = `<div class="product-rating" title="${averageRating.toFixed(1)} dari 5 bintang">${generateStarsHTML(Math.round(averageRating))}<span class="rating-count">(${totalReviews})</span></div>`;
        return `
            <div class="product-card" data-product-id="${product.id}">
                ${lowStockLabel}${outOfStockLabel}
                <div class="product-image-container"><img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.onerror=null;this.src='placeholder.jpg';"></div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    ${ratingHTML}
                    <p class="price">${formatRupiah(price)}</p>
                    <div class="size-options">${product.sizes.map(size => `<span class="size-option" data-size="${size}">${size}</span>`).join('')}</div>
                    <div class="product-actions">
                        <button class="btn btn-primary add-to-cart" ${product.stock === 0 ? 'disabled' : ''}><i class="fas fa-shopping-cart"></i> <span data-lang-key="${product.stock === 0 ? 'stock_out' : 'add_button'}">${product.stock === 0 ? translations[currentLanguage].stock_out : translations[currentLanguage].add_button}</span></button>
                        <button class="btn quick-view-btn"><i class="fas fa-eye"></i></button>
                        <button class="btn add-to-favorite ${isFavorited ? 'favorited' : ''}"><i class="${isFavorited ? 'fas' : 'far'} fa-heart"></i></button>
                    </div>
                </div>
            </div>`;
    };

    const renderProducts = (productsToRender, container, noResultsEl) => {
        container.innerHTML = '';
        noResultsEl.style.display = productsToRender.length === 0 ? 'block' : 'none';
        productsToRender.forEach(product => container.insertAdjacentHTML('beforeend', createProductCardHTML(product)));
        attachProductCardListeners(container);
    };

    const renderAllProductShowcases = (searchTerm = '') => {
        if (searchTerm) {
            activeFilters = { availability: 'all', color: 'all', design: 'all' };
            updateFilterUI();
            searchInput.value = searchTerm;
        }
        let filteredProducts = [...products];
        const currentSearchTerm = searchInput.value.trim().toLowerCase();
        if (currentSearchTerm) filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(currentSearchTerm));
        if (activeFilters.availability === 'in_stock') filteredProducts = filteredProducts.filter(p => p.stock > 0);
        if (activeFilters.color !== 'all') filteredProducts = filteredProducts.filter(p => p.color === activeFilters.color);
        if (activeFilters.design !== 'all') filteredProducts = filteredProducts.filter(p => p.design === activeFilters.design);
        const container = productList;
        const visibleProductIds = new Set(filteredProducts.map(p => p.id));
        Array.from(container.children).forEach(card => {
            if (!visibleProductIds.has(card.dataset.productId) && !card.classList.contains('hidden')) card.classList.add('hidden');
        });
        setTimeout(() => {
            renderProducts(filteredProducts, container, noResultsMessage);
            requestAnimationFrame(() => {
                container.querySelectorAll('.product-card').forEach(card => {
                    card.classList.remove('visible');
                    void card.offsetWidth;
                    card.classList.add('visible');
                });
            });
        }, 500);
        const isFilterOrSearchActive = activeFilters.availability !== 'all' || activeFilters.color !== 'all' || activeFilters.design !== 'all' || currentSearchTerm;
        ['#keranjang', '.section-divider', '#favorit', '#riwayat-pesanan', '#faq'].forEach(sel => {
            document.querySelectorAll(sel).forEach(el => el.style.display = isFilterOrSearchActive ? 'none' : 'block');
        });
        const kolekasiH2 = document.querySelector('#koleksi h2');
        if (isFilterOrSearchActive) {
            let titleParts = [];
            if (activeFilters.availability !== 'all') titleParts.push(translations[currentLanguage].sidebar_in_stock);
            if (activeFilters.color !== 'all') titleParts.push(`${translations[currentLanguage].sidebar_color} ${translations[currentLanguage]['color_' + activeFilters.color]}`);
            if (activeFilters.design !== 'all') titleParts.push(`${translations[currentLanguage].sidebar_design} ${translations[currentLanguage]['design_' + activeFilters.design]}`);
            if (currentSearchTerm) titleParts.push(`Pencarian "${searchInput.value.trim()}"`);
            kolekasiH2.textContent = titleParts.join(' & ').replace(/&/g, 'dan');
        } else {
            kolekasiH2.textContent = translations[currentLanguage].all_collections_title;
        }
        document.querySelectorAll('section, footer, .product-card:not(.visible)').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.9 && rect.bottom >= 0) el.classList.add('visible');
        });
    };

    const saveCart = () => localStorage.setItem('cart', JSON.stringify(cart));

   const calculateCartTotals = () => {
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const productDiscount = totalItems >= 5 ? subtotal * 0.02 : 0;
    let shippingDiscount = 0;
    const addressInput = document.getElementById('customer-address');

    if (cart.length > 0 && addressInput && addressInput.value) {
        const address = addressInput.value.toLowerCase();
        const jabodetabekCities = ['jakarta', 'bogor', 'depok', 'tangerang', 'bekasi'];

        const addressParts = address.split(',');

        const lastTwoParts = addressParts.slice(-2).map(part => part.trim());

        const isJabodetabek = lastTwoParts.some(part =>
            jabodetabekCities.some(city => part.includes(city))
        );

        if (isJabodetabek) {
            shippingDiscount = 2000;
        }
    }

    const total = subtotal - productDiscount - shippingDiscount;
    return { subtotal, totalItems, discount: productDiscount, shippingDiscount, total };
};

    const saveFavorites = () => localStorage.setItem('favorites', JSON.stringify(favorites));

    const toggleFavorite = (productId, buttonElement) => {
        const product = products.find(p => p.id === productId);
        if (!product) return;
        const favoriteIndex = favorites.findIndex(item => item.id === productId);
        if (favoriteIndex > -1) {
            favorites.splice(favoriteIndex, 1);
            showToast('toast_removed_from_favorites', 'info', { name: product.name });
        } else {
            favorites.push({ id: product.id });
            showToast('toast_added_to_favorites', 'success', { name: product.name });
        }
        saveFavorites();
        renderFavorites();
        updateAllFavoriteButtons();
    };

    const renderFavorites = () => {
        const favProducts = products.filter(p => favorites.some(fav => fav.id === p.id));
        favoriteProductsList.innerHTML = '';
        emptyFavoritesMessage.style.display = favProducts.length === 0 ? 'block' : 'none';
        favProducts.forEach(product => favoriteProductsList.insertAdjacentHTML('beforeend', createProductCardHTML(product)));
        attachProductCardListeners(favoriteProductsList);
        favoriteCountSpan.textContent = favorites.length;
        favoriteCountSidebar.textContent = favorites.length;
    };

    const updateAllFavoriteButtons = () => {
        document.querySelectorAll('.add-to-favorite').forEach(button => {
            const card = button.closest('.product-card, .modal-content');
            if (!card) return;
            const productId = card.dataset.productId || (card.querySelector('.modal-add-to-favorite')?.dataset.id);
            if (!productId) return;
            const isFavorited = favorites.some(fav => fav.id === productId);
            button.classList.toggle('favorited', isFavorited);
            button.querySelector('i').className = `fa-heart ${isFavorited ? 'fas' : 'far'}`;
        });
    };

    const renderReviews = (product) => {
        const reviewsContainer = document.getElementById('modal-reviews-list-container');
        const reviewsSummary = document.querySelector('.reviews-summary');
        const noReviewsMessage = document.getElementById('modal-no-reviews');
        if (!product.reviews || product.reviews.length === 0) {
            reviewsSummary.style.display = 'none';
            reviewsContainer.innerHTML = '';
            noReviewsMessage.style.display = 'block';
            return;
        }
        reviewsSummary.style.display = 'block';
        noReviewsMessage.style.display = 'none';
        const totalReviews = product.reviews.length;
        const averageRating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews;
        document.getElementById('modal-average-rating-value').textContent = averageRating.toFixed(1);
        document.getElementById('modal-total-reviews').textContent = totalReviews;
        document.getElementById('modal-average-rating-stars').innerHTML = generateStarsHTML(Math.round(averageRating));
        reviewsContainer.innerHTML = product.reviews.map(review => `
        <div class="review-item">
            <div class="review-header">
                <strong class="review-author">${review.author}</strong>
                <span class="review-date">${new Date(review.date + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</span>
            </div>
            <div class="review-rating">${generateStarsHTML(review.rating)}</div>
            <p class="review-text">${review.text}</p>
        </div>`).join('');
};

    let confirmCallback = null;
    const showConfirmationModal = (message, callback) => {
        confirmMessage.textContent = message;
        confirmCallback = callback;
        openModal(confirmationModal);
    };

    const transitionToCartView = () => {
        checkoutFormContainer.classList.add('section-fade-out');
        setTimeout(() => {
            checkoutFormContainer.style.display = 'none';
            checkoutFormContainer.classList.remove('section-fade-out');
            renderCart();
            renderSavedForLater();
            document.getElementById('keranjang').scrollIntoView({ behavior: 'smooth' });
        }, 400);
    };

    const updateCheckoutUI = () => {
        progressBar.className = `progress-bar step-${currentStep}`;
        document.querySelectorAll('.progress-step').forEach(step => step.classList.toggle('active', parseInt(step.dataset.step) <= currentStep));
        checkoutSteps.forEach(step => step.classList.toggle('active', parseInt(step.dataset.step) === currentStep));
        prevStepBtn.style.display = 'inline-flex';
        nextStepBtn.style.display = currentStep < 3 ? 'inline-flex' : 'none';
        submitOrderBtn.style.display = currentStep === 3 ? 'inline-flex' : 'none';
    };

    const validateStep = (stepNumber) => {
        const stepDiv = document.querySelector(`.checkout-step[data-step="${stepNumber}"]`);
        const inputs = stepDiv.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        for (const input of inputs) {
            if (input.type === 'radio') {
                const radioGroup = stepDiv.querySelectorAll(`input[name="${input.name}"]`);
                if (![...radioGroup].some(r => r.checked)) {
                    isValid = false;
                    break;
                }
            } else if (!input.value.trim()) {
                isValid = false;
                break;
            }
        }
        if (!isValid) showToast('toast_step_not_complete', 'warning', { step: stepNumber });
        return isValid;
    };

    const renderFinalSummary = () => {
        const { subtotal, totalItems, discount, shippingDiscount, total } = calculateCartTotals();
        const formData = new FormData(checkoutForm);
        const expedition = formData.get('expeditionMethod') || 'Belum dipilih';
        const payment = formData.get('paymentMethod') || 'Belum dipilih';
        const shippingDiscountHTML = shippingDiscount > 0 ? `<p><span>Promo Ongkir (Jabodetabek):</span> <span>- ${formatRupiah(shippingDiscount)}</span></p>` : '';
        finalOrderSummaryContainer.innerHTML = `
            <p><span>Total Barang:</span> <span>${totalItems} pcs</span></p>
            <p><span>Subtotal:</span> <span>${formatRupiah(subtotal)}</span></p>
            <p><span>Diskon Pembelian:</span> <span>-${formatRupiah(discount)}</span></p>
            ${shippingDiscountHTML}
            <hr style="border: none; border-top: 1px dashed var(--border-color); margin: 1rem 0;">
            <p><span>Ekspedisi:</span> <span>${expedition}</span></p>
            <p><span>Pembayaran:</span> <span>${payment}</span></p>
            <p class="total-row"><span>Total Akhir:</span> <span>${formatRupiah(total)}</span></p>`;
    };

    const renderOrderHistory = () => {
        const history = JSON.parse(localStorage.getItem('orderHistory')) || [];
        orderHistoryList.innerHTML = '';
        emptyHistoryMessage.style.display = history.length === 0 ? 'block' : 'none';
        history.forEach(order => {
            const orderDate = new Date(order.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
            const orderCard = document.createElement('div');
            orderCard.className = 'order-history-card';
            orderCard.innerHTML = `
                <div class="order-history-header">
                    <div>
                        <h4>${translations[currentLanguage].history_order}: ${order.orderId}</h4>
                        <p>${translations[currentLanguage].history_date}: ${orderDate}</p>
                    </div>
                    <div class="order-status completed"><i class="fas fa-check-circle"></i> ${translations[currentLanguage].history_status_completed}</div>
                </div>
                <div class="order-history-body"><ul class="order-item-list">${order.items.map(item => `
                    <li class="order-item-detail">
                        <img src="${item.image}" alt="${item.name}" class="order-item-image">
                        <div class="order-item-info">
                            <span class="order-item-name">${item.name} (${item.size})</span>
                            <span class="order-item-qty">Kuantitas: ${item.quantity}</span>
                        </div>
                        <span class="order-item-price">${formatRupiah(item.price * item.quantity)}</span>
                    </li>`).join('')}</ul></div>
                <div class="order-history-footer">
                    <div class="order-total"><strong>Total Pesanan: ${formatRupiah(order.total)}</strong></div>
                    <div class="order-actions">
                        <button class="btn btn-secondary btn-sm track-order-btn">${translations[currentLanguage].history_track_order}</button>
                        <button class="btn btn-primary btn-sm buy-again-btn">${translations[currentLanguage].history_buy_again}</button>
                    </div>
                </div>`;
            orderCard.querySelector('.track-order-btn').onclick = () => window.open('https://cekresi.com/', '_blank');
            orderCard.querySelector('.buy-again-btn').addEventListener('click', () => {
                if (checkoutFormContainer.style.display === 'block') {
                    showToast('checkout_in_progress_warning', 'warning');
                    return;
                }
                let itemsAddedCount = 0;
                order.items.forEach(item => {
                    const product = products.find(p => p.id === item.id);
                    if (product && product.stock >= item.quantity) {
                        addToCart(item.id, item.size, item.quantity, null);
                        itemsAddedCount++;
                    } else {
                        showToast('toast_stock_not_enough', "error", { name: item.name, size: item.size });
                    }
                });
                if (itemsAddedCount > 0) {
                    showToast('toast_order_rebought', 'success', { orderId: order.orderId });
                    document.getElementById('keranjang').scrollIntoView({ behavior: 'smooth' });
                }
            });
            orderHistoryList.appendChild(orderCard);
        });
    };

    const applyTheme = (theme) => {
        body.classList.toggle('dark-mode', theme === 'dark');
        darkModeToggle.innerHTML = `<i class="fas fa-${theme === 'dark' ? 'sun' : 'moon'}"></i>`;
    };

    const renderSearchSuggestions = (query) => {
        if (!query) {
            searchSuggestionsContainer.style.display = 'none';
            return;
        }
        const filteredProducts = products.filter(p => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5);
        if (filteredProducts.length > 0) {
            searchSuggestionsContainer.innerHTML = filteredProducts.map(product => `
                <div class="suggestion-item" data-product-name="${product.name}">
                    <img src="${product.image}" alt="${product.name}">
                    <span>${product.name}</span>
                </div>`).join('');
            searchSuggestionsContainer.querySelectorAll('.suggestion-item').forEach(item => {
                item.addEventListener('click', () => {
                    searchInput.value = item.dataset.productName;
                    searchSuggestionsContainer.style.display = 'none';
                    renderAllProductShowcases(item.dataset.productName);
                });
            });
            searchSuggestionsContainer.style.display = 'block';
        } else {
            searchSuggestionsContainer.style.display = 'none';
        }
    };

    const initializeNavigation = () => {
        document.querySelectorAll('#main-nav a, .sidebar-menu a').forEach(link => {
            link.addEventListener('click', e => {
                const href = e.currentTarget.getAttribute('href');
                const isMainNavLink = e.currentTarget.closest('#main-nav');

                if (isMainNavLink) {
                    if (checkoutFormContainer.style.display === 'block') {
                        checkoutFormContainer.style.display = 'none';
                        renderCart();
                        renderSavedForLater();
                    }
                    ['#keranjang', '.section-divider', '#favorit', '#riwayat-pesanan', '#faq'].forEach(sel => {
                        document.querySelectorAll(sel).forEach(el => {
                            el.style.display = 'block';
                        });
                    });
                }

                if (href && href.startsWith('#') && href !== '#notification-modal') {
                    e.preventDefault();
                    if (href === '#hero') {
                        searchInput.value = '';
                        activeFilters = { availability: 'all', color: 'all', design: 'all' };
                        updateFilterUI();
                        renderAllProductShowcases();
                    }

                    const targetElement = document.querySelector(href);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }

                    document.querySelectorAll('#main-nav a, .sidebar-menu a').forEach(l => {
                        l.classList.toggle('active', l.getAttribute('href') === href);
                    });

                    if (body.classList.contains('sidebar-open')) {
                        toggleSidebar();
                    }
                }
            });
        });
    };

    const handleScrollProgress = () => {
        const progressBar = document.querySelector('.scroll-progress-bar');
        if (!progressBar) return;
        const totalScrollableHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        progressBar.style.width = totalScrollableHeight <= 0 ? '0%' : `${(window.scrollY / totalScrollableHeight) * 100}%`;
    };

    const toggleSidebar = () => {
        body.classList.toggle('sidebar-open');
        body.classList.toggle('no-scroll', body.classList.contains('sidebar-open'));
    };

    const updateResetButtonVisibility = () => {
        if (resetFiltersBtn) {
            resetFiltersBtn.style.display = Object.values(activeFilters).some(v => v !== 'all') ? 'block' : 'none';
        }
    };

    const updateFilterUI = () => {
        sidebarSubmenus.forEach(submenu => {
            const filterType = submenu.dataset.filterType;
            if (filterType) {
                submenu.querySelectorAll('.sidebar-filter').forEach(link => {
                    link.classList.toggle('active', link.dataset.filterValue === activeFilters[filterType]);
                });
            }
        });
    };

    const initializeSidebar = () => {
        sidebarToggleBtn.addEventListener('click', toggleSidebar);
        sidebarCloseBtn.addEventListener('click', toggleSidebar);
        sidebarOverlay.addEventListener('click', toggleSidebar);
        document.querySelectorAll('.sidebar-category-toggle').forEach(toggle => {
            toggle.addEventListener('click', e => {
                e.preventDefault();
                toggle.parentElement.classList.toggle('open');
            });
        });
        sidebarSubmenus.forEach(submenu => {
            submenu.addEventListener('click', e => {
                const target = e.target.closest('.sidebar-filter');
                if (!target) return;
                e.preventDefault();
                activeFilters[submenu.dataset.filterType] = target.dataset.filterValue;
                searchInput.value = '';
                renderAllProductShowcases();
                updateFilterUI();
                updateResetButtonVisibility();
                setTimeout(toggleSidebar, 200);
            });
        });
        resetFiltersBtn.addEventListener('click', () => {
            activeFilters = { availability: 'all', color: 'all', design: 'all' };
            searchInput.value = '';
            updateFilterUI();
            renderAllProductShowcases();
            updateResetButtonVisibility();
            setTimeout(toggleSidebar, 200);
        });
        videoGalleryBtn.addEventListener('click', e => {
            e.preventDefault();
            toggleSidebar();
            setTimeout(() => {
                openModal(videoGalleryModal);
                videoGalleryModal.querySelectorAll('video').forEach(video => {
                    video.play().catch(error => console.error("Error attempting to autoplay video:", error));
                });
            }, 300);
        });
    };

    document.getElementById('sidebar-contact-admin').addEventListener('click', e => {
        e.preventDefault();
        window.open(`https://wa.me/${sellerInfo.whatsappAdmin}`, '_blank');
    });

    const setLanguage = (lang) => {
        currentLanguage = lang;
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;
        document.querySelectorAll('[data-lang-key]').forEach(el => {
            const key = el.dataset.langKey;
            if (translations[lang]?.[key] && typeof translations[lang][key] !== 'function') {
                if (el.matches('.faq-question span, .policy-content p, .policy-content h3, .footer-section .social-media span, .recommendations-title')) {
                    el.innerHTML = translations[lang][key];
                } else {
                    const icon = el.querySelector('i');
                    const textNode = [...el.childNodes].find(node => node.nodeType === 3 && node.textContent.trim());
                    if (textNode) textNode.textContent = ` ${translations[lang][key]} `;
                    else if (el.querySelector('span[data-lang-key]')) el.querySelector('span[data-lang-key]').textContent = translations[lang][key];
                    else {
                        el.innerHTML = translations[lang][key];
                        if (icon) el.prepend(icon);
                    }
                }
            }
        });
        document.querySelectorAll('[data-lang-key-placeholder]').forEach(el => {
            const key = el.dataset.langKeyPlaceholder;
            if (translations[lang]?.[key]) el.placeholder = translations[lang][key];
        });
        languageToggleButtons.querySelectorAll('.lang-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));
        renderAllProductShowcases();
        refreshAllCartViews();
        renderFavorites();
        renderRecentlyViewed();
        renderOrderHistory();
    };

    const initializeFAQ = () => {
        document.querySelectorAll('.faq-question').forEach(q => q.addEventListener('click', () => q.parentElement.classList.toggle('active')));
    };

    const initializePolicyModals = () => {
        document.querySelectorAll('a[data-modal-target]').forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                const modal = document.getElementById(link.dataset.modalTarget);
                if (modal) openModal(modal);
            });
        });
    };

    const initializeNotifications = () => {
        notificationSidebarBtn?.addEventListener('click', e => {
            e.preventDefault();
            renderNotifications('all');
            notificationTabs?.querySelectorAll('.notification-tab-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.filter === 'all');
            });
            openModal(notificationModal);
            if (body.classList.contains('sidebar-open')) {
                toggleSidebar();
            }
        });

        notificationTabs?.addEventListener('click', e => {
            const target = e.target.closest('.notification-tab-btn');
            if (target) {
                notificationTabs.querySelectorAll('.notification-tab-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                target.classList.add('active');
                renderNotifications(target.dataset.filter);
            }
        });
    };

    function applyRippleEffect() {
        document.addEventListener('click', function(e) {
            const target = e.target.closest('.btn');
            if (target) {
                target.querySelector(".ripple")?.remove();
                const rect = target.getBoundingClientRect();
                const ripple = document.createElement('span');
                const diameter = Math.max(target.clientWidth, target.clientHeight);
                const radius = diameter / 2;
                Object.assign(ripple.style, { width: `${diameter}px`, height: `${diameter}px`, left: `${e.clientX - rect.left - radius}px`, top: `${e.clientY - rect.top - radius}px` });
                ripple.classList.add('ripple');
                target.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
            }
        });
    }

    function implementSharedElementTransition(startElement, targetModal, onTransitionEndCallback) {
        const startRect = startElement.getBoundingClientRect();
        const clone = startElement.cloneNode(true);
        clone.classList.add('shared-element-clone');
        Object.assign(clone.style, { top: `${startRect.top}px`, left: `${startRect.left}px`, width: `${startRect.width}px`, height: `${startRect.height}px` });
        document.body.appendChild(clone);
        targetModal.style.transition = 'none';
        targetModal.classList.add('show');
        const modalImage = targetModal.querySelector('.modal-body img');
        const modalContent = targetModal.querySelector('.modal-content');
        modalContent.style.opacity = '0';
        modalImage.style.opacity = '0';
        const endRect = modalImage.getBoundingClientRect();
        const reverseAnimation = () => {
            const currentStartRect = startElement.getBoundingClientRect();
            Object.assign(clone.style, { transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)', top: `${currentStartRect.top}px`, left: `${currentStartRect.left}px`, width: `${currentStartRect.width}px`, height: `${currentStartRect.height}px`, borderRadius: 'var(--border-radius-base)', opacity: '1' });
            modalContent.style.transition = 'opacity 0.3s ease-out';
            modalContent.style.opacity = '0';
            clone.addEventListener('transitionend', () => {
                clone.remove();
                targetModal.classList.remove('show');
                targetModal.style.transition = '';
                document.body.classList.remove('no-scroll');
                targetModal.removeEventListener('click', closeListener);
            }, { once: true });
        };
        const closeListener = e => { if (e.target === targetModal || e.target.classList.contains('close-button')) reverseAnimation(); };
        targetModal.addEventListener('click', closeListener);
        requestAnimationFrame(() => Object.assign(clone.style, { top: `${endRect.top}px`, left: `${endRect.left}px`, width: `${endRect.width}px`, height: `${endRect.height}px`, borderRadius: '0' }));
        clone.addEventListener('transitionend', () => {
            modalImage.style.opacity = '1';
            modalContent.style.transition = 'opacity 0.4s ease-in';
            modalContent.style.opacity = '1';
            clone.style.opacity = '0';
            if (onTransitionEndCallback) onTransitionEndCallback();
        }, { once: true });
        document.body.classList.add('no-scroll');
    }

    searchButton.addEventListener('click', () => {
        renderAllProductShowcases(searchInput.value.trim());
        searchSuggestionsContainer.style.display = 'none';
    });
    searchInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            renderAllProductShowcases(searchInput.value.trim());
            searchSuggestionsContainer.style.display = 'none';
        }
    });
    searchInput.addEventListener('input', () => renderSearchSuggestions(searchInput.value.trim()));
    document.addEventListener('click', e => {
        if (!e.target.closest('.search-input-wrapper')) searchSuggestionsContainer.style.display = 'none';
    });

    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            showToast('empty_cart', 'warning');
            return;
        }
        const elementsToHide = [cartSummary, cartItemsContainer, emptyCartMessage, savedForLaterSection];
        elementsToHide.forEach(el => el?.classList.add('section-fade-out'));
        setTimeout(() => {
            elementsToHide.forEach(el => {
                if (el) {
                    el.style.display = 'none';
                    el.classList.remove('section-fade-out');
                }
            });
            checkoutFormContainer.style.display = 'block';
            Object.assign(checkoutFormContainer.style, { opacity: '1', transform: 'none' });
            currentStep = 1;
            updateCheckoutUI();
            useSavedAddressBtn.style.display = localStorage.getItem('savedAddress') ? 'inline-flex' : 'none';
            checkoutFormContainer.scrollIntoView({ behavior: 'smooth' });
        }, 400);
    });

    nextStepBtn.addEventListener('click', () => {
        if (validateStep(currentStep)) {
            currentStep++;
            if (currentStep === 3) renderFinalSummary();
            updateCheckoutUI();
        }
    });

    prevStepBtn.addEventListener('click', () => {
        if (currentStep === 1) transitionToCartView();
        else {
            currentStep--;
            updateCheckoutUI();
        }
    });

    quickViewModal.querySelector('.modal-add-to-favorite').addEventListener('click', e => toggleFavorite(e.currentTarget.dataset.id, e.currentTarget));
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', e => {
            if (!modal.querySelector('.shared-element-clone') && (e.target === modal || e.target.classList.contains('close-button'))) closeModal(modal);
        });
    });

    confirmYesBtn.addEventListener('click', () => {
        if (confirmCallback) confirmCallback();
        closeModal(confirmationModal);
    });
    confirmNoBtn.addEventListener('click', () => closeModal(confirmationModal));
    modalSizeGuideBtn.addEventListener('click', renderSizeGuide);
    
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
       backToTopButton.classList.toggle('show', window.scrollY > 300);
        handleScrollProgress();
        document.querySelectorAll('section, footer, .product-card:not(.visible)').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight * 0.85) el.classList.add('visible');
        });
    });

    backToTopButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    darkModeToggle.addEventListener('click', () => applyTheme(body.classList.contains('dark-mode') ? 'light' : 'dark'));
    languageToggleButtons.addEventListener('click', e => {
        const target = e.target.closest('.lang-btn');
        if (target) setLanguage(target.dataset.lang);
    });
    useSavedAddressBtn.addEventListener('click', loadSavedAddress);

    const initializeApp = () => {
        applyTheme(localStorage.getItem('theme') || 'light');
        handleScrollProgress();
        initializeNavigation();
        initializeSidebar();
        initializeFAQ();
        initializePolicyModals();
        initializeNotifications();
        renderRadioOptions('expedition-method', expeditionMethods, 'expeditionMethod');
        renderRadioOptions('payment-method', paymentMethods, 'paymentMethod');
        renderSkeletonLoaders(productList, 6);
        updateResetButtonVisibility();
        applyRippleEffect();

        setTimeout(() => {
            setLanguage(localStorage.getItem('language') || 'id');
            renderRecentlyViewed();
            renderOrderHistory();
            updateAllFavoriteButtons();
            currentYearSpan.textContent = new Date().getFullYear().toString();
            if (sellerAddressSpan) sellerAddressSpan.textContent = sellerInfo.address;
            if (sellerPhoneSpan) sellerPhoneSpan.textContent = sellerInfo.phone;
            if (sellerEmailSpan) sellerEmailSpan.textContent = sellerInfo.email;
            if (sellerPhoneLink) sellerPhoneLink.href = `mailto:${sellerInfo.email}`;
            if (sellerEmailLink) sellerEmailLink.href = `mailto:${sellerInfo.email}`;
            document.querySelectorAll('section, footer, .product-card:not(.visible)').forEach(el => {
                if (el.getBoundingClientRect().top < window.innerHeight * 0.9) el.classList.add('visible');
            });
            body.classList.remove('no-scroll');
        }, 1200);
    };

    const startApp = () => {
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            loadingScreen.addEventListener('transitionend', () => { loadingScreen.style.display = 'none'; }, { once: true });
        }
        initializeApp();
    };

    if (loadingVideo) {
        loadingVideo.addEventListener('ended', startApp);
        loadingVideo.addEventListener('error', () => {
            console.error("Video loading screen gagal dimuat.");
            startApp();
        });
    } else {
        startApp();
    }
});