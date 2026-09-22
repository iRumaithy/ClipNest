ClipNest v1.8.2 — True Sync

التحديث:
- مزامنة سجلية مستقلة لكل محفوظ/طلب/حذف بدل مزامنة Snapshot كامل.
- الحذف ينتقل بين الأجهزة كـ tombstone ولا يمكن لجهاز قديم إعادته.
- Realtime + فحص احتياطي كل 4 ثوانٍ.
- قائمة مزامنة محلية persistent عند انقطاع الإنترنت.
- Service Worker جديد: Network-first للصفحة لمنع بقاء نسخة قديمة على iOS.
- زر التحديث والساعة والتاريخ العربي مستمران.

استبدل جميع ملفات المستودع بهذه الملفات.


تحديث v1.8.2:
- معالجة الوميض الناتج عن إعادة رسم الواجهة الدورية وتحميل شعارات التطبيقات من الشبكة.
- مزامنة تفاضلية: لا يعاد رسم الواجهة إلا عند وجود تغيير حقيقي.
- شعارات التطبيقات المعروفة مدمجة محليًا وثابتة.
- فلتر جديد لفرز المحفوظات حسب التطبيق مثل Instagram وTikTok وYouTube وغيرها.


v1.8.2:
- All known app/store icons are embedded locally as SVG (no runtime favicon downloads).
- Fixed Amazon/noon/Temu and other known store logo blanks.
- Improved app-icon fidelity and removed logo-network flicker.
