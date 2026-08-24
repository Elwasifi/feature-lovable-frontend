// Storytelling / marketing profiles for each governorate page.
// English is the base copy; Arabic is authored for the RTL audience.

import cairo from "@/assets/gov/cairo.jpg";
import giza from "@/assets/gov/giza.jpg";
import qalyubia from "@/assets/gov/qalyubia.jpg";
import alexandria from "@/assets/gov/alexandria.jpg";
import beheira from "@/assets/gov/beheira.jpg";
import matrouh from "@/assets/gov/matrouh.jpg";
import kafrElSheikh from "@/assets/gov/kafr-el-sheikh.jpg";
import gharbia from "@/assets/gov/gharbia.jpg";
import monufia from "@/assets/gov/monufia.jpg";
import dakahlia from "@/assets/gov/dakahlia.jpg";
import damietta from "@/assets/gov/damietta.jpg";
import portSaid from "@/assets/gov/port-said.jpg";
import ismailia from "@/assets/gov/ismailia.jpg";
import suez from "@/assets/gov/suez.jpg";
import northSinai from "@/assets/gov/north-sinai.jpg";
import southSinai from "@/assets/gov/south-sinai.jpg";
import sharqia from "@/assets/gov/sharqia.jpg";
import faiyum from "@/assets/gov/faiyum.jpg";
import beniSuef from "@/assets/gov/beni-suef.jpg";
import minya from "@/assets/gov/minya.jpg";
import asyut from "@/assets/gov/asyut.jpg";
import sohag from "@/assets/gov/sohag.jpg";
import qena from "@/assets/gov/qena.jpg";
import luxor from "@/assets/gov/luxor.jpg";
import aswan from "@/assets/gov/aswan.jpg";
import redSea from "@/assets/gov/red-sea.jpg";
import newValley from "@/assets/gov/new-valley.jpg";

export type Bilingual = { en: string; ar: string };

export type GovernorateProfile = {
  image: string;
  tagline: Bilingual;
  story: Bilingual;
  history: Bilingual;
  highlights: Bilingual[];
};

export const governorateProfiles: Record<string, GovernorateProfile> = {
  cairo: {
    image: cairo,
    tagline: { en: "The city of a thousand minarets", ar: "مدينة الألف مئذنة" },
    story: {
      en: "Cairo never sleeps and never repeats itself: a Fatimid alley, a Mamluk dome, a Nile terrace and a glass tower can all sit inside one sunset.",
      ar: "القاهرة لا تنام ولا تتكرر: حارة فاطمية، وقبة مملوكية، وشرفة على النيل، وبرج زجاجي، كلها تجتمع داخل غروب واحد.",
    },
    history: {
      en: "Founded as Fustat in 641 CE and crowned by the Fatimids in 969, Cairo has been the political heart of the Arab world for over a millennium.",
      ar: "تأسست كالفسطاط عام 641م وتوّجها الفاطميون عام 969، لتظل القلب السياسي للعالم العربي لأكثر من ألف عام.",
    },
    highlights: [
      { en: "Islamic Cairo, a UNESCO World Heritage quarter", ar: "القاهرة الإسلامية، حي مدرج في التراث العالمي" },
      { en: "Coptic Cairo and the Hanging Church", ar: "مصر القديمة والكنيسة المعلقة" },
      { en: "Khan El Khalili night markets", ar: "أسواق خان الخليلي الليلية" },
    ],
  },
  giza: {
    image: giza,
    tagline: { en: "Where the last wonder still stands", ar: "حيث تقف الأعجوبة الباقية" },
    story: {
      en: "Stand on the plateau at dawn and 4,500 years compress into one breath — then walk minutes to the Grand Egyptian Museum and meet the same civilisation restored in light.",
      ar: "قف على الهضبة عند الفجر لتتكثّف 4500 سنة في نفس واحد، ثم امشِ دقائق إلى المتحف المصري الكبير لتلتقي الحضارة نفسها مرمّمة في الضوء.",
    },
    history: {
      en: "Necropolis of the Fourth Dynasty, home to Khufu's Great Pyramid and the Sphinx, and to Saqqara and Dahshur nearby.",
      ar: "جبانة الأسرة الرابعة، بها هرم خوفو الأكبر وأبو الهول، وبجوارها سقارة ودهشور.",
    },
    highlights: [
      { en: "Pyramids of Giza and the Sphinx", ar: "أهرامات الجيزة وأبو الهول" },
      { en: "The Grand Egyptian Museum", ar: "المتحف المصري الكبير" },
      { en: "Saqqara step pyramid and Dahshur", ar: "هرم سقارة المدرج ودهشور" },
    ],
  },
  qalyubia: {
    image: qalyubia,
    tagline: { en: "The Delta's northern gate", ar: "بوابة الدلتا الشمالية" },
    story: {
      en: "Green fields begin the moment Cairo ends: orchards, canals and market towns that feed the capital every morning before sunrise.",
      ar: "تبدأ الحقول الخضراء حيث تنتهي القاهرة: بساتين وترع ومدن أسواق تُطعم العاصمة كل صباح قبل الشروق.",
    },
    history: {
      en: "Ancient Athribis (Tell Atrib) near Banha was a Delta capital in the Late Period, and Qalyubia remains a bridge between Cairo and the Delta.",
      ar: "أثريبيس القديمة (تل أتريب) قرب بنها كانت عاصمة دلتاوية في العصر المتأخر، وتظل القليوبية جسرًا بين القاهرة والدلتا.",
    },
    highlights: [
      { en: "Tell Atrib archaeological site", ar: "منطقة تل أتريب الأثرية" },
      { en: "Banha citrus and dairy markets", ar: "أسواق بنها للموالح والألبان" },
      { en: "Nile Barrages riverside gardens", ar: "حدائق القناطر الخيرية" },
    ],
  },
  alexandria: {
    image: alexandria,
    tagline: { en: "The Mediterranean bride", ar: "عروس البحر المتوسط" },
    story: {
      en: "A city that reads: sea light on limestone, a corniche of cafés, and a library that resurrected the world's most famous lost collection.",
      ar: "مدينة تقرأ نفسها: ضوء البحر على الحجر الجيري، وكورنيش من المقاهي، ومكتبة أعادت أشهر مجموعة ضائعة في التاريخ.",
    },
    history: {
      en: "Founded by Alexander the Great in 331 BCE, capital of Ptolemaic Egypt and home of the ancient Lighthouse and Library.",
      ar: "أسسها الإسكندر الأكبر عام 331 ق.م، عاصمة مصر البطلمية وموطن الفنار والمكتبة القديمة.",
    },
    highlights: [
      { en: "Bibliotheca Alexandrina", ar: "مكتبة الإسكندرية" },
      { en: "Qaitbay Citadel on the old lighthouse site", ar: "قلعة قايتباي على موقع الفنار" },
      { en: "Catacombs of Kom El Shoqafa", ar: "مقابر كوم الشقافة" },
    ],
  },
  beheira: {
    image: beheira,
    tagline: { en: "Where the Nile signs its name", ar: "حيث يوقّع النيل اسمه" },
    story: {
      en: "Rosetta's Ottoman houses glow red at sunset over the branch where the river finally reaches the sea — and where a single stone unlocked hieroglyphs.",
      ar: "بيوت رشيد العثمانية تتوهج حمراء عند الغروب فوق الفرع الذي يصل فيه النهر إلى البحر، وحيث فك حجر واحد رموز الهيروغليفية.",
    },
    history: {
      en: "The Rosetta Stone was found here in 1799; the province has guarded Egypt's western Delta approaches since antiquity.",
      ar: "عُثر على حجر رشيد هنا عام 1799، وظلت المحافظة تحرس مداخل غرب الدلتا منذ القدم.",
    },
    highlights: [
      { en: "Rosetta (Rashid) heritage houses", ar: "بيوت رشيد التراثية" },
      { en: "Idku Lake fishing communities", ar: "مجتمعات الصيد ببحيرة إدكو" },
      { en: "Damanhur agricultural markets", ar: "أسواق دمنهور الزراعية" },
    ],
  },
  matrouh: {
    image: matrouh,
    tagline: { en: "Turquoise coast, desert oracle", ar: "ساحل فيروزي وواحة النبوءة" },
    story: {
      en: "Swim in water so clear it looks edited, then drive south to Siwa where salt lakes, mudbrick fortresses and olive groves keep their own calendar.",
      ar: "اسبح في مياه شديدة الصفاء، ثم اتجه جنوبًا إلى سيوة حيث البحيرات المالحة وقلاع الطين وبساتين الزيتون تحتفظ بتقويمها الخاص.",
    },
    history: {
      en: "Alexander crossed this desert to consult the Oracle of Amun at Siwa; the coast later hosted the decisive El Alamein battles.",
      ar: "عبر الإسكندر هذه الصحراء ليستشير معبد آمون بسيوة، واحتضن الساحل لاحقًا معارك العلمين الحاسمة.",
    },
    highlights: [
      { en: "Agiba and Cleopatra beaches", ar: "شاطئا عجيبة وكليوباترا" },
      { en: "Siwa Oasis and the Shali fortress", ar: "واحة سيوة وقلعة شالي" },
      { en: "El Alamein war memorials", ar: "مقابر ومتاحف العلمين" },
    ],
  },
  "kafr-el-sheikh": {
    image: kafrElSheikh,
    tagline: { en: "Lake of birds and fishermen", ar: "بحيرة الطيور والصيادين" },
    story: {
      en: "At Burullus, dawn is a soundscape: oars, reeds and thousands of migrating birds settling over Egypt's quietest lake.",
      ar: "في البرلس يكون الفجر مشهدًا صوتيًا: مجاديف وبوص وآلاف الطيور المهاجرة فوق أهدأ بحيرات مصر.",
    },
    history: {
      en: "Ancient Buto (Tell El Farain) was the Delta capital of Lower Egypt and the seat of the cobra goddess Wadjet.",
      ar: "بوتو القديمة (تل الفراعين) كانت عاصمة مصر السفلى ومقر المعبودة واجيت.",
    },
    highlights: [
      { en: "Burullus Lake bird sanctuary", ar: "محمية طيور بحيرة البرلس" },
      { en: "Tell El Farain (Buto) ruins", ar: "آثار تل الفراعين (بوتو)" },
      { en: "Baltim Mediterranean beaches", ar: "شواطئ بلطيم" },
    ],
  },
  gharbia: {
    image: gharbia,
    tagline: { en: "Cotton, festivals and faith", ar: "قطن ومَولد وإيمان" },
    story: {
      en: "Tanta's autumn moulid draws millions; the rest of the year the province spins the world's finest cotton into thread.",
      ar: "مولد طنطا في الخريف يجذب الملايين، وطوال العام تغزل المحافظة أجود قطن في العالم.",
    },
    history: {
      en: "Home of the Sufi saint Ahmad al-Badawi and of Mahalla El Kubra, Egypt's textile capital since the Middle Ages.",
      ar: "موطن السيد أحمد البدوي والمحلة الكبرى، عاصمة النسيج المصري منذ العصور الوسطى.",
    },
    highlights: [
      { en: "Ahmad al-Badawi Mosque, Tanta", ar: "مسجد السيد البدوي بطنطا" },
      { en: "Mahalla El Kubra textile mills", ar: "مصانع نسيج المحلة الكبرى" },
      { en: "Delta cotton field tours", ar: "جولات حقول القطن" },
    ],
  },
  monufia: {
    image: monufia,
    tagline: { en: "Heart of the green Delta", ar: "قلب الدلتا الخضراء" },
    story: {
      en: "Villages of stitched fields and family workshops — the province that exported presidents, poets and the country's best mangoes.",
      ar: "قرى من حقول متجاورة وورش عائلية — المحافظة التي صدّرت رؤساء وشعراء وأفضل مانجو في البلاد.",
    },
    history: {
      en: "A medieval administrative heartland between the Damietta and Rosetta branches, long known for its agricultural wealth.",
      ar: "قلب إداري منذ العصور الوسطى بين فرعي دمياط ورشيد، اشتهرت طويلاً بثرائها الزراعي.",
    },
    highlights: [
      { en: "Shibin El Kom heritage centre", ar: "مركز شبين الكوم التراثي" },
      { en: "Farm-to-table village experiences", ar: "تجارب المزرعة إلى المائدة" },
      { en: "Traditional weaving workshops", ar: "ورش النسيج التقليدية" },
    ],
  },
  dakahlia: {
    image: dakahlia,
    tagline: { en: "Mansoura, city of victory", ar: "المنصورة، مدينة النصر" },
    story: {
      en: "A wide Nile, lit bridges and a corniche that turns every evening into a promenade — with a house museum where a crusade ended.",
      ar: "نيل عريض وكباري مضيئة وكورنيش يحوّل كل مساء إلى نزهة، وبيت-متحف انتهت عنده حملة صليبية.",
    },
    history: {
      en: "In 1250 the Egyptians captured King Louis IX here; the Dar Ibn Luqman house still tells the story.",
      ar: "في 1250 أسر المصريون الملك لويس التاسع هنا، ولا يزال بيت ابن لقمان يروي القصة.",
    },
    highlights: [
      { en: "Dar Ibn Luqman museum", ar: "متحف دار ابن لقمان" },
      { en: "Mansoura Nile corniche", ar: "كورنيش النيل بالمنصورة" },
      { en: "Gamasa beach resorts", ar: "منتجعات شاطئ جمصة" },
    ],
  },
  damietta: {
    image: damietta,
    tagline: { en: "Furniture, fish and river mouth", ar: "أثاث وسمك ومصبّ النهر" },
    story: {
      en: "Watch the Nile meet the Mediterranean at Ras El Bar, then walk workshops where walnut becomes heirloom furniture exported worldwide.",
      ar: "شاهد التقاء النيل بالمتوسط في رأس البر، ثم تجوّل في ورش يتحول فيها الجوز إلى أثاث يُصدَّر للعالم.",
    },
    history: {
      en: "A medieval Mediterranean port besieged in three crusades, and Egypt's furniture capital since the Ottoman era.",
      ar: "ميناء متوسطي حوصر في ثلاث حملات صليبية، وعاصمة الأثاث المصري منذ العهد العثماني.",
    },
    highlights: [
      { en: "Ras El Bar where two waters meet", ar: "رأس البر حيث يلتقي الماءان" },
      { en: "Damietta furniture ateliers", ar: "ورش أثاث دمياط" },
      { en: "Manzala Lake fishing trips", ar: "رحلات صيد ببحيرة المنزلة" },
    ],
  },
  "port-said": {
    image: portSaid,
    tagline: { en: "Balconies over the canal", ar: "شرفات فوق القناة" },
    story: {
      en: "Wooden verandas from 1869 watch container giants glide past — a city built the same year the Suez Canal opened.",
      ar: "شرفات خشبية من 1869 تراقب عمالقة الحاويات وهي تمر — مدينة بُنيت في عام افتتاح قناة السويس.",
    },
    history: {
      en: "Created in 1859 as the canal's northern gateway; its resistance in 1956 became national legend.",
      ar: "أُنشئت عام 1859 كبوابة القناة الشمالية، وصارت مقاومتها عام 1956 أسطورة وطنية.",
    },
    highlights: [
      { en: "Suez Canal ship-watching corniche", ar: "كورنيش مشاهدة سفن القناة" },
      { en: "Port Said Military Museum", ar: "متحف بورسعيد الحربي" },
      { en: "Colonial wooden architecture trail", ar: "مسار العمارة الخشبية" },
    ],
  },
  ismailia: {
    image: ismailia,
    tagline: { en: "Garden city on the water", ar: "مدينة الحدائق على الماء" },
    story: {
      en: "Tree-lined avenues, a freshwater lake and canal beaches make Ismailia the calmest place to watch global trade pass by.",
      ar: "شوارع مشجّرة وبحيرة عذبة وشواطئ على القناة تجعل الإسماعيلية أهدأ مكان لمشاهدة تجارة العالم تمر.",
    },
    history: {
      en: "Built in 1863 for canal engineers; the De Lesseps house and antiquities museum keep that era alive.",
      ar: "بُنيت عام 1863 لمهندسي القناة، ويحفظ بيت ديليسبس ومتحف الآثار ذلك العصر.",
    },
    highlights: [
      { en: "Lake Timsah beaches", ar: "شواطئ بحيرة التمساح" },
      { en: "Ismailia Antiquities Museum", ar: "متحف الإسماعيلية للآثار" },
      { en: "Canal-side cycling routes", ar: "مسارات الدراجات بجوار القناة" },
    ],
  },
  suez: {
    image: suez,
    tagline: { en: "Gateway of two seas", ar: "بوابة البحرين" },
    story: {
      en: "Where the desert mountains drop into a harbour of tankers, and Egypt's newest industrial zone rewrites the map of global logistics.",
      ar: "حيث تهبط جبال الصحراء إلى ميناء الناقلات، وتعيد المنطقة الصناعية الجديدة رسم خريطة اللوجستيات العالمية.",
    },
    history: {
      en: "An ancient Red Sea port on the route to Punt, and the southern anchor of the Suez Canal since 1869.",
      ar: "ميناء قديم على البحر الأحمر في طريق بلاد بونت، والمرساة الجنوبية لقناة السويس منذ 1869.",
    },
    highlights: [
      { en: "Suez Canal southern entrance", ar: "المدخل الجنوبي لقناة السويس" },
      { en: "Ain Sokhna beach resorts", ar: "منتجعات العين السخنة" },
      { en: "Suez Canal Economic Zone tours", ar: "جولات المنطقة الاقتصادية للقناة" },
    ],
  },
  "north-sinai": {
    image: northSinai,
    tagline: { en: "Palms, dunes and the old military road", ar: "نخيل وكثبان وطريق حورس القديم" },
    story: {
      en: "The Mediterranean edge of Sinai: date palms to the horizon, Bedouin hospitality and the caravan road that armies and prophets both walked.",
      ar: "حافة سيناء المتوسطية: نخيل حتى الأفق، وكرم بدوي، وطريق القوافل الذي سلكته الجيوش والأنبياء.",
    },
    history: {
      en: "The Ways of Horus, Egypt's ancient fortified highway to Asia, ran through here — Tell El Habua guards its ruins.",
      ar: "طريق حورس الحربي القديم إلى آسيا مرّ من هنا، وتحرس تل الحبوة بقاياه.",
    },
    highlights: [
      { en: "El Arish palm coast", ar: "ساحل النخيل بالعريش" },
      { en: "Tell El Habua (Tharu) fortress", ar: "قلعة تل الحبوة (ثارو)" },
      { en: "Bedouin craft and cuisine", ar: "حرف ومأكولات بدوية" },
    ],
  },
  "south-sinai": {
    image: southSinai,
    tagline: { en: "Reefs below, revelation above", ar: "شعاب في الأسفل ووحي في الأعلى" },
    story: {
      en: "Dive Ras Mohammed at noon and climb Mount Sinai before dawn — few places on earth pair coral and scripture this closely.",
      ar: "غُص في رأس محمد ظهرًا واصعد جبل موسى قبل الفجر — قليلة هي الأماكن التي تجمع المرجان والنص المقدس بهذا القرب.",
    },
    history: {
      en: "Saint Catherine's Monastery has operated continuously since the 6th century, the oldest working monastery on earth.",
      ar: "دير سانت كاترين يعمل بلا انقطاع منذ القرن السادس، أقدم دير عامل في العالم.",
    },
    highlights: [
      { en: "Ras Mohammed National Park", ar: "محمية رأس محمد" },
      { en: "Saint Catherine and Mount Sinai", ar: "سانت كاترين وجبل موسى" },
      { en: "Dahab and Blue Hole diving", ar: "دهب والبلو هول للغوص" },
    ],
  },
  sharqia: {
    image: sharqia,
    tagline: { en: "Fields over a buried capital", ar: "حقول فوق عاصمة مدفونة" },
    story: {
      en: "Under Sharqia's clover lie Tanis and Bubastis — royal cities whose golden burials rival Tutankhamun's, still half asleep in the soil.",
      ar: "تحت برسيم الشرقية ترقد تانيس وبوباستيس — مدن ملكية بكنوز ذهبية تنافس كنوز توت عنخ آمون، ما زالت نائمة في التراب.",
    },
    history: {
      en: "Tanis served as capital in the 21st–22nd dynasties; Bubastis was the cult city of the cat goddess Bastet.",
      ar: "كانت تانيس عاصمة في الأسرتين 21 و22، وبوباستيس مدينة المعبودة القطة باستت.",
    },
    highlights: [
      { en: "Tanis (San El Hagar) royal tombs", ar: "مقابر تانيس الملكية (صان الحجر)" },
      { en: "Bubastis temple of Bastet", ar: "معبد باستت ببوباستيس" },
      { en: "Zagazig horse and market culture", ar: "ثقافة الخيول والأسواق بالزقازيق" },
    ],
  },
  faiyum: {
    image: faiyum,
    tagline: { en: "Egypt's original oasis", ar: "الواحة المصرية الأولى" },
    story: {
      en: "Waterwheels turn all day, waterfalls fall into desert, and whale skeletons rest in a valley that was once an ocean.",
      ar: "سواقٍ تدور طوال النهار، وشلالات تسقط في الصحراء، وهياكل حيتان ترقد في وادٍ كان محيطًا.",
    },
    history: {
      en: "Home of the Middle Kingdom's Lake Moeris projects and of the Faiyum mummy portraits, the most human faces of antiquity.",
      ar: "موطن مشروعات بحيرة موريس في الدولة الوسطى، وبورتريهات مومياوات الفيوم، أكثر وجوه العصور القديمة إنسانية.",
    },
    highlights: [
      { en: "Wadi El Hitan (Valley of Whales), UNESCO", ar: "وادي الحيتان، تراث عالمي" },
      { en: "Lake Qarun and Wadi El Rayan", ar: "بحيرة قارون ووادي الريان" },
      { en: "Tunis village pottery school", ar: "مدرسة فخار قرية تونس" },
    ],
  },
  "beni-suef": {
    image: beniSuef,
    tagline: { en: "Pyramids without the crowds", ar: "أهرامات بلا زحام" },
    story: {
      en: "Meidum's strange tower-pyramid stands almost alone in the desert — proof of the engineering leap that made Giza possible.",
      ar: "هرم ميدوم الغريب يقف وحيدًا في الصحراء تقريبًا — شاهد على القفزة الهندسية التي جعلت الجيزة ممكنة.",
    },
    history: {
      en: "Ancient Herakleopolis Magna ruled Egypt during the First Intermediate Period from here.",
      ar: "حكمت إهناسيا المدينة (هيراكليوبوليس) مصر من هنا في عصر الانتقال الأول.",
    },
    highlights: [
      { en: "Meidum Pyramid", ar: "هرم ميدوم" },
      { en: "Herakleopolis (Ihnasya) ruins", ar: "آثار إهناسيا المدينة" },
      { en: "Wadi Sannur cave", ar: "مغارة وادي سنور" },
    ],
  },
  minya: {
    image: minya,
    tagline: { en: "Bride of Upper Egypt", ar: "عروس الصعيد" },
    story: {
      en: "Cliff tombs painted with wrestling matches and harvests, and the ghost city where a pharaoh tried to change the gods of Egypt.",
      ar: "مقابر منحوتة في الجبل مزيّنة بمشاهد المصارعة والحصاد، ومدينة أشباح حاول فيها فرعون تغيير آلهة مصر.",
    },
    history: {
      en: "Akhenaten founded Amarna here in 1346 BCE; nearby Beni Hasan preserves Middle Kingdom daily life in colour.",
      ar: "أسس إخناتون أخيتاتون (العمارنة) هنا عام 1346 ق.م، وتحفظ بني حسن القريبة حياة الدولة الوسطى بالألوان.",
    },
    highlights: [
      { en: "Tell El Amarna, Akhenaten's capital", ar: "تل العمارنة، عاصمة إخناتون" },
      { en: "Beni Hasan painted tombs", ar: "مقابر بني حسن المصوّرة" },
      { en: "Tuna El Gebel catacombs", ar: "جبانة تونا الجبل" },
    ],
  },
  asyut: {
    image: asyut,
    tagline: { en: "Crossroads of the caravans", ar: "ملتقى القوافل" },
    story: {
      en: "The last stop of the Darb El Arbaeen caravan route, wrapped in cliffs, monasteries and the silver-threaded shawls its women still weave.",
      ar: "المحطة الأخيرة لدرب الأربعين، محاطة بالجبال والأديرة وشيلان الفضة التي ما زالت نساؤها ينسجنها.",
    },
    history: {
      en: "Ancient Lycopolis, capital of the 13th nome; the Holy Family sheltered at Deir El Muharraq nearby.",
      ar: "أسيوط القديمة (ليكوبوليس)، عاصمة الإقليم الثالث عشر، ولجأت العائلة المقدسة إلى دير المحرق القريب.",
    },
    highlights: [
      { en: "Deir El Muharraq monastery", ar: "دير المحرق" },
      { en: "Asyut Barrage on the Nile", ar: "قناطر أسيوط" },
      { en: "Silver-thread shawl workshops", ar: "ورش الشيلان بخيوط الفضة" },
    ],
  },
  sohag: {
    image: sohag,
    tagline: { en: "Where kingship was invented", ar: "حيث وُلدت الملكية" },
    story: {
      en: "Abydos is Egypt's spiritual first chapter — the burial ground of the earliest kings and a temple with the finest reliefs ever carved.",
      ar: "أبيدوس هي الفصل الروحي الأول لمصر — جبانة أقدم الملوك ومعبد بأدق نقوش عرفها التاريخ.",
    },
    history: {
      en: "First-dynasty rulers were buried at Abydos c. 3100 BCE; Seti I's temple holds the famous King List.",
      ar: "دُفن ملوك الأسرة الأولى في أبيدوس نحو 3100 ق.م، ويضم معبد سيتي الأول قائمة الملوك الشهيرة.",
    },
    highlights: [
      { en: "Abydos temple of Seti I", ar: "معبد سيتي الأول بأبيدوس" },
      { en: "The White and Red Monasteries", ar: "الدير الأبيض والدير الأحمر" },
      { en: "Akhmim weaving heritage", ar: "تراث النسيج بأخميم" },
    ],
  },
  qena: {
    image: qena,
    tagline: { en: "The zodiac ceiling", ar: "سقف الأبراج" },
    story: {
      en: "Dendera's colours survived 2,000 years of soot: turquoise stars, gold suns and Hathor's face repeated across every column.",
      ar: "نجت ألوان دندرة من ألفي عام من السخام: نجوم فيروزية وشموس ذهبية ووجه حتحور مكرر على كل عمود.",
    },
    history: {
      en: "The Ptolemaic temple of Hathor was raised over far older sanctuaries, and its zodiac reshaped European astronomy.",
      ar: "بُني معبد حتحور البطلمي فوق مقادس أقدم بكثير، وأعادت دائرة أبراجه تشكيل علم الفلك الأوروبي.",
    },
    highlights: [
      { en: "Dendera Temple complex", ar: "مجمع معابد دندرة" },
      { en: "Qena pottery workshops", ar: "ورش فخار قنا" },
      { en: "Nile cruise stopovers", ar: "محطات الرحلات النيلية" },
    ],
  },
  luxor: {
    image: luxor,
    tagline: { en: "The world's greatest open-air museum", ar: "أعظم متحف مفتوح في العالم" },
    story: {
      en: "One third of the planet's monuments sit within a morning's walk: temples on the east bank for life, royal valleys on the west for eternity.",
      ar: "ثلث آثار العالم داخل مسافة نزهة صباحية: معابد الشرق للحياة، وأودية الملوك في الغرب للخلود.",
    },
    history: {
      en: "Ancient Thebes, capital of the New Kingdom, ruled an empire from the Euphrates to Nubia.",
      ar: "طيبة القديمة، عاصمة الدولة الحديثة، حكمت إمبراطورية من الفرات إلى النوبة.",
    },
    highlights: [
      { en: "Karnak and Luxor temples", ar: "معبدا الكرنك والأقصر" },
      { en: "Valley of the Kings", ar: "وادي الملوك" },
      { en: "Sunrise balloon flights", ar: "رحلات البالون عند الشروق" },
    ],
  },
  aswan: {
    image: aswan,
    tagline: { en: "Nubian light on granite", ar: "ضوء نوبي على الجرانيت" },
    story: {
      en: "The Nile slows here between black rocks and yellow dunes; feluccas drift, Nubian houses glow blue, and Abu Simbel waits upstream.",
      ar: "يتباطأ النيل هنا بين الصخور السوداء والكثبان الصفراء؛ تنساب الفلوكة، وتتوهج البيوت النوبية زرقاء، وينتظر أبو سمبل في الجنوب.",
    },
    history: {
      en: "Ancient Swenett was Egypt's southern frontier and quarry; Abu Simbel was famously relocated stone by stone in the 1960s.",
      ar: "سونو القديمة كانت حدود مصر الجنوبية ومحاجرها، ونُقل أبو سمبل حجرًا حجرًا في الستينيات.",
    },
    highlights: [
      { en: "Abu Simbel temples", ar: "معابد أبو سمبل" },
      { en: "Philae Temple of Isis", ar: "معبد إيزيس بفيلة" },
      { en: "Nubian villages and felucca sailing", ar: "القرى النوبية والإبحار بالفلوكة" },
    ],
  },
  "red-sea": {
    image: redSea,
    tagline: { en: "Coral, marinas and desert stars", ar: "مرجان ومارينا ونجوم الصحراء" },
    story: {
      en: "1,000 km of reef-lined coast: dive with dolphins at dawn, dock a yacht at noon, sleep under a Bedouin sky in the eastern desert.",
      ar: "ألف كيلومتر من الساحل المرجاني: غُص مع الدلافين فجرًا، وارسُ يختك ظهرًا، ونم تحت سماء بدوية في الصحراء الشرقية.",
    },
    history: {
      en: "Pharaonic fleets sailed to Punt from these shores; Roman emperors quarried imperial porphyry in the mountains behind.",
      ar: "أبحرت أساطيل الفراعنة إلى بلاد بونت من هذه الشواطئ، ونحت الرومان البورفير الإمبراطوري في جبالها.",
    },
    highlights: [
      { en: "Hurghada and El Gouna marinas", ar: "مارينا الغردقة والجونة" },
      { en: "Marsa Alam and Elphinstone reefs", ar: "شعاب مرسى علم والإلفنستون" },
      { en: "Eastern Desert Roman quarries", ar: "محاجر الرومان بالصحراء الشرقية" },
    ],
  },
  "new-valley": {
    image: newValley,
    tagline: { en: "Oases the size of a country", ar: "واحات بحجم دولة" },
    story: {
      en: "Egypt's largest governorate is mostly silence: chalk sculptures in the White Desert, hot springs at dusk and mudbrick towns older than memory.",
      ar: "أكبر محافظات مصر صمت في معظمها: منحوتات طباشيرية في الصحراء البيضاء، وعيون ساخنة عند الغسق، ومدن طينية أقدم من الذاكرة.",
    },
    history: {
      en: "Kharga and Dakhla were caravan lifelines and Roman frontier posts; Al Qasr's medieval town still stands.",
      ar: "كانت الخارجة والداخلة شرايين القوافل ومراكز حدودية رومانية، ولا تزال بلدة القصر الإسلامية قائمة.",
    },
    highlights: [
      { en: "White Desert chalk formations", ar: "تكوينات الصحراء البيضاء" },
      { en: "Al Qasr medieval mudbrick town", ar: "بلدة القصر الإسلامية الطينية" },
      { en: "Hibis Temple, Kharga", ar: "معبد هيبس بالخارجة" },
    ],
  },
};
