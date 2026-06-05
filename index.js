// جلب البيانات من التخزين المحلي للمتصفح أو البدء بمصفوفة فارغة إذا لم تكن هناك بيانات
let storedData = localStorage.getItem('my_apps_store');
let appsDatabase = storedData ? JSON.parse(storedData) : [];

// قائمة التطبيقات الافتراضية المطلوب تواجدها دائماً
const defaultApps = [
    {
        id: 1,
        name: "تحميل كوكل كروم للكمبيوتر",
        category: "متصفحات", 
        size: "120 MB",
        version: "أحدث إصدار",
        desc: "يعتبر متصفح جوجل كروم المتصفح الأكثر سرعة وأماناً وتوافقاً مع معايير الويب الحديثة، مما يوفر تجربة تصفح مثالية لمستخدمي الكمبيوتر.",
        downloadLink: "https://www.google.com/chrome/",
        publishDate: "2024-01-01", // تاريخ قديم حتى لا يظهر في "الجديدة"
        icon: "https://cdn.icon-icons.com/icons2/2107/PNG/512/google_chrome_icon_134011.png"
    },
    {
        id: 2,
        name: "WinRAR",
        category: "أدوات مساعدة",
        size: "5 MB",
        version: "أحدث إصدار",
        desc: "برنامج WinRAR لفك ضغط الملفات هو أداة قوية وموثوقة لإدارة الملفات المضغوطة، ويدعم العديد من التنسيقات مثل RAR وZIP.",
        downloadLink: "https://www.win-rar.com/download.html",
        publishDate: "2024-01-01",
        icon: "https://cdn.icon-icons.com/icons2/2699/PNG/512/winrar_logo_icon_168864.png"
    },
    {
        id: 3,
        name: "تحميل مشغل الوسائط VLC",
        category: "الوسائط",
        size: "40 MB",
        version: "3.0.20",
        desc: "VLC هو مشغل وسائط حر ومفتوح المصدر، قادر على تشغيل معظم ملفات الوسائط بالإضافة إلى الأقراص المدمجة وبروتوكولات البث.",
        downloadLink: "https://www.videolan.org/vlc/",
        publishDate: "2024-01-01",
        icon: "https://cdn.icon-icons.com/icons2/2699/PNG/512/vlc_media_player_logo_icon_168661.png"
    },
    {
        id: 4,
        name: "Internet Download Manager",
        category: "أدوات مساعدة",
        size: "10 MB",
        version: "6.42",
        desc: "أداة قوية لزيادة سرعات التنزيل حتى 5 مرات، واستئناف التنزيلات المجدولة وتنظيمها.",
        downloadLink: "https://www.internetdownloadmanager.com/download.html",
        publishDate: new Date().toISOString(), // هذا سيظهر في قسم البرامج الجديدة
        icon: "https://cdn.icon-icons.com/icons2/2368/PNG/512/internet_download_manager_idm_icon_143714.png"
    }
];

// التأكد من إضافة التطبيقات الافتراضية إذا لم تكن موجودة مسبقاً في المتصفح
defaultApps.forEach(defApp => {
    if (!appsDatabase.some(app => app.id === defApp.id)) {
        appsDatabase.push(defApp);
    }
});

// تحديث التخزين المحلي لضمان حفظ التطبيقات الجديدة
localStorage.setItem('my_apps_store', JSON.stringify(appsDatabase));

// إطلاق وتحميل البيانات في الواجهة فور تشغيل المتصفح مباشرة
document.addEventListener("DOMContentLoaded", function() {
    renderStoreApps(appsDatabase);
    initRevealOnScroll();
});

// دالة مراقبة التمرير لتفعيل الأنميشن
function initRevealOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// دالة حقن وتوليد كروت التطبيقات والبرامج في المتجر العام باحترافية وتناسق عالي
function renderStoreApps(appsArray) {
    const grid = document.getElementById("product-grid"); // Changed ID to product-grid
    grid.innerHTML = "";

    if (appsArray.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center p-20 bg-slate-800 border border-slate-700 rounded-lg text-gray-400 font-bold reveal active">
                <i class="fa-solid fa-magnifying-glass-minus text-4xl mb-4 text-orange-500 block"></i>
                عذراً، لم يتم العثور على أي برنامج يطابق بحثك الحالي!
            </div>
        `;
        return;
    }

    appsArray.forEach((app, index) => {
        grid.innerHTML += `
            <div class="glow-card rounded-lg shadow-xl p-6 flex flex-col text-right reveal">
                <div class="flex justify-between items-start mb-4">
                    <span class="bg-blue-900/50 text-blue-300 text-[10px] font-bold px-3 py-1 rounded border border-blue-800/50 uppercase tracking-wider">${app.category}</span>
                    <span class="text-slate-400 text-xs font-bold"><i class="fa-solid fa-hard-drive ml-1"></i> ${app.size}</span>
                </div>
                <div class="flex items-center gap-4 mb-4">
                    <div class="w-12 h-12 bg-slate-700/50 rounded-lg flex items-center justify-center text-2xl text-orange-500 shadow-inner p-1">
                        <img 
                            src="${app.icon && app.icon.trim() !== '' ? app.icon : 'https://cdn-icons-png.flaticon.com/512/5164/5164023.png'}" 
                            alt="${app.name}" 
                            class="w-12 h-12 object-contain block"
                            loading="lazy"
                            onerror="this.onerror=null; this.src='https://cdn-icons-png.flaticon.com/512/5164/5164023.png';"
                        >
                    </div>
                    <div>
                        <h4 class="font-bold text-white text-lg tracking-tight">${app.name}</h4>
                        <p class="text-[10px] text-slate-400 font-bold uppercase" dir="ltr">الإصدار: <span class="text-orange-500">${app.version}</span></p>
                    </div>
                </div>
                <p class="text-sm text-slate-300 leading-relaxed line-clamp-3 mb-6 flex-grow font-medium">${app.desc}</p>
                
                <div class="pt-4 border-t border-slate-700/50">
                    <a href="${app.downloadLink}" target="_blank" rel="noopener noreferrer" class="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-md text-sm text-center flex items-center justify-center gap-2 transition duration-300 shadow-sm active:scale-95">
                        <i class="fa-solid fa-cloud-arrow-down"></i> تحميل مباشر مجاني
                    </a>
                </div>
            </div>
        `;
    });
    initRevealOnScroll(); // إعادة تفعيل مراقب التمرير للعناصر الجديدة
}

// دالة نشر وإضافة تطبيق جديد للمتجر من قبل الآدمن عبيدة
function publishNewApp(event) {
    event.preventDefault();

    const name = document.getElementById("app-name").value.trim();
    const category = document.getElementById("app-category").value;
    const size = document.getElementById("app-size").value.trim();
    const version = document.getElementById("app-version").value.trim();
    const link = document.getElementById("app-link").value.trim();
    const desc = document.getElementById("app-desc").value.trim();
    // جلب رابط الأيقونة إذا كان هناك حقل إدخال له بالمعرف app-icon
    const icon = document.getElementById("app-icon") ? document.getElementById("app-icon").value.trim() : "";

    // تشكيل كائن التطبيق الجديد
    const newApp = {
        id: Date.now(), // استخدام طابع زمني لضمان فرادة المعرف
        name: name,
        category: category,
        size: size,
        version: version,
        desc: desc,
        downloadLink: link,
        publishDate: new Date().toISOString(), // إضافة تاريخ النشر الفعلي
        icon: icon
    };

    // إضافته بأعلى قائمة البيانات لتظهر فوراً في أول المتجر العام
    appsDatabase.unshift(newApp);

    // حفظ التغييرات في التخزين المحلي للمتصفح لضمان عدم ضياع البيانات عند التحديث
    localStorage.setItem('my_apps_store', JSON.stringify(appsDatabase));

    // إعادة تصفير الاستمارة
    document.getElementById("app-name").value = "";
    document.getElementById("app-size").value = "";
    document.getElementById("app-version").value = "";
    document.getElementById("app-link").value = "";
    document.getElementById("app-desc").value = "";
    if (document.getElementById("app-icon")) document.getElementById("app-icon").value = "";

    // تحديث العرض في المتجر العام تلقائياً بالبرنامج الجديد
    renderStoreApps(appsDatabase);

    // تحويل تلقائي فوري للمتجر العام لرؤية التطبيق الجديد وهو منشور
    if (typeof switchTab === "function") switchTab('store');
}

// دالة تصفية البرامج الجديدة (خلال آخر 5 أيام)
function filterNewApps() {
    const now = new Date();
    const filtered = appsDatabase.filter(app => {
        if (!app.publishDate) return false;
        const pubDate = new Date(app.publishDate);
        const diffTime = Math.abs(now - pubDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 5;
    });
    renderStoreApps(filtered);
}

// دالة البحث الذكي
function searchApps() {
    const query = document.getElementById("search-input").value.trim().toLowerCase();
    const filtered = appsDatabase.filter(app => 
        app.name.toLowerCase().includes(query) || 
        app.category.toLowerCase().includes(query) || 
        app.desc.toLowerCase().includes(query)
    );
    renderStoreApps(filtered);
}

// دالة التنقل السلس بين الأقسام
function switchTab(tabId) {
    const target = document.getElementById('product-grid-section');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
}

// إضافة أنميشن ظهور البطاقات برمجياً
const style = document.createElement('style');
style.innerHTML = `
    /* Removed fadeInUp animation for Amazon-like simplicity */
    .no-scrollbar::-webkit-scrollbar { display: none; }
`;
document.head.appendChild(style);
