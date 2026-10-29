/* Uganda region by region — rendered on destination.html?d=uganda (assets/js/destination.js)
   western: the classic western circuit in road order from Kampala, starting on the Masaka road.
   northern: the route north from Kampala, looping back south-east via Karamoja and Mount Elgon.
   driveFromKampala is the direct drive from Kampala to that stop, not the leg from the previous one.
   short: label used on the route strip.
   image: base name in assets/img (cards use NAME-sm.webp). */
window.BROOKS_UGANDA_PLACES = [
  /* ===================== WESTERN UGANDA ===================== */
  {
    id: "equator-kayabwe", name: "Uganda Equator at Kayabwe", short: "Equator", region: "western", order: 1,
    district: "Mpigi", driveFromKampala: "1.5 hrs · 72 km", image: "equator-kayabwe",
    tagline: "One foot in each hemisphere",
    about: "The concrete equator rings at Kayabwe stand right beside the Kampala–Masaka highway and make the classic first stop of any trip west. Local guides run the famous water demonstration, showing water draining in opposite directions a few metres either side of the line, and the craft shops and cafés make it an easy leg-stretch.",
    highlights: ["Photo straddling the line at the equator monument", "The water-draining demonstration either side of 0°", "Craft shops selling barkcloth, baskets and Ugandan coffee", "A coffee break before the drive on to Masaka or Lake Mburo"],
    bestFor: ["Culture", "Scenery"],
    bestTime: "Year-round, as a stop on the way west",
    stayAt: ["Day stop: most guests overnight at Lake Mburo", "Hotel Brovad, Masaka (1 hr on)"],
    tourSlugs: ["uganda-primate-classic-10d", "uganda-wildlife-gorillas-8d"]
  },
  {
    id: "masaka-nabugabo", name: "Masaka & Lake Nabugabo", short: "Masaka", region: "western", order: 2,
    district: "Masaka", driveFromKampala: "2.5 hrs · 140 km", image: "lake-nabugabo",
    tagline: "A quiet lake off the main road",
    about: "Lake Nabugabo is a small satellite lake cut off from Lake Victoria by a sand bar, about 15 km east of Masaka town. It is known for its sandy shore, its own endemic cichlid fish and its low-key resorts, making it a calm first night out of Kampala or a weekend escape.",
    highlights: ["Swimming and canoeing from the sandy beach", "Birding in the surrounding forest and papyrus", "Endemic haplochromine cichlids that evolved in the lake", "Masaka town as a base for the Ssese ferry at Bukakata"],
    bestFor: ["Relaxing", "Birding", "Scenery"],
    bestTime: "Jun–Sep and Dec–Feb for dry, sunny beach days",
    stayAt: ["Nabugabo Holiday Centre", "Hotel Brovad, Masaka"],
    tourSlugs: []
  },
  {
    id: "ssese-islands", name: "Ssese Islands", short: "Ssese Islands", region: "western", order: 3,
    district: "Kalangala", driveFromKampala: "3.5 hrs + ferry · 170 km", image: "ssese-islands",
    tagline: "84 islands on Lake Victoria",
    about: "The Ssese archipelago is a group of 84 islands in the north-west of Lake Victoria, with Bugala the largest and most visited. Reach it by driving to Bukakata near Masaka for the one-hour car ferry to Luku, or by the MV Kalangala from Entebbe, about 3.5 hours. Expect palm-fringed beaches, forest walks and fresh tilapia.",
    highlights: ["Beach time and sunsets on Bugala Island", "Forest walks and monkeys around Kalangala", "Boat trips between the smaller islands", "Fresh fish suppers on the shore"],
    bestFor: ["Relaxing", "Scenery", "Birding"],
    bestTime: "Jun–Aug and Dec–Feb, when the lake is calmer for crossings",
    stayAt: ["Brovad Sands Lodge"],
    tourSlugs: []
  },
  {
    id: "lake-mburo", name: "Lake Mburo National Park", short: "Lake Mburo", region: "western", order: 4,
    district: "Kiruhura", driveFromKampala: "4 hrs · 240 km", image: "zebras",
    tagline: "Zebra, eland and walking safaris",
    about: "At about 370 km², Lake Mburo is Uganda's smallest savannah park and the closest to Kampala. It is the only park in Uganda with impala and the best place to see zebra and eland, and with no elephants and very few lions you can explore on foot, by bike, on horseback and by boat.",
    highlights: ["Guided walking safaris among zebra and eland", "Boat trip on Lake Mburo for hippos, crocodiles and African finfoot", "Horseback safaris from Mihingo Lodge", "Night game drives for leopard and bushbabies"],
    bestFor: ["Big game", "Birding", "Hiking"],
    bestTime: "Jun–Sep and Dec–Feb (dry); good year-round",
    stayAt: ["Mihingo Lodge", "Arcadia Cottages Lake Mburo"],
    tourSlugs: ["uganda-primate-classic-10d", "uganda-wildlife-gorillas-8d"]
  },
  {
    id: "igongo", name: "Igongo Cultural Centre", short: "Igongo", region: "western", order: 5,
    district: "Mbarara", driveFromKampala: "4.5 hrs · 255 km", image: "igongo",
    tagline: "The story of the Ankole kingdom",
    about: "Igongo, at Biharwe just before Mbarara, is a museum and cultural centre devoted to the Banyankole and the wider south-west. Its galleries cover the Ankole kingdom, the long-horned Ankole cattle and traditional homesteads, and its restaurant serves local dishes, so it makes an ideal lunch stop on the road to the gorillas.",
    highlights: ["Museum of the Ankole kingdom and south-western cultures", "Long-horned Ankole cattle and a traditional homestead", "Ugandan buffet lunch at the Eitaramiro restaurant", "The Biharwe Eclipse Monument next door"],
    bestFor: ["Culture"],
    bestTime: "Year-round",
    stayAt: ["Igongo Country Hotel"],
    tourSlugs: ["uganda-primate-classic-10d"]
  },
  {
    id: "kabale-bunyonyi", name: "Kabale & Lake Bunyonyi", short: "Bunyonyi", region: "western", order: 6,
    district: "Kabale / Rubanda", driveFromKampala: "7 hrs · 420 km", image: "bunyonyi",
    tagline: "The lake of little birds",
    about: "Lake Bunyonyi sits in terraced hills just west of Kabale and is scattered with 29 islands. It is free of crocodiles, hippos and bilharzia, so you can swim, and it is the classic place to rest for a night or two after gorilla trekking in southern Bwindi.",
    highlights: ["Dugout-canoe and boat trips between the islands", "Swimming and paddling in a bilharzia-free lake", "Hikes on the terraced hills above the water", "Punishment Island and the stories of the Bakiga"],
    bestFor: ["Relaxing", "Scenery", "Hiking"],
    bestTime: "Jun–Aug and Dec–Feb; lovely year-round",
    stayAt: ["Birdnest@Bunyonyi", "Arcadia Cottages"],
    tourSlugs: ["uganda-primate-classic-10d", "rwanda-uganda-gorilla-combo-9d"]
  },
  {
    id: "lake-mutanda", name: "Lake Mutanda & Kisoro", short: "Mutanda", region: "western", order: 7,
    district: "Kisoro", driveFromKampala: "8.5 hrs · 490 km", image: "lake-mutanda",
    tagline: "Volcanoes reflected in still water",
    about: "Lake Mutanda lies just north of Kisoro with the Virunga volcanoes of Muhabura, Gahinga and Sabyinyo rising behind it. It is a peaceful base for Bwindi's Rushaga and Nkuringo sectors and for Mgahinga, with canoeing, community walks and some of Uganda's best views.",
    highlights: ["Canoeing at dawn with views of the Virunga volcanoes", "Community walks through Bafumbira villages", "Kisoro market and the road to the Rwandan border", "Short drives to Rushaga, Nkuringo and Mgahinga"],
    bestFor: ["Scenery", "Relaxing", "Culture"],
    bestTime: "Jun–Aug and Dec–Feb for the clearest volcano views",
    stayAt: ["Mutanda Lake Resort", "Chameleon Hill Lodge"],
    tourSlugs: ["rwanda-uganda-gorilla-combo-9d"]
  },
  {
    id: "mgahinga", name: "Mgahinga Gorilla National Park", short: "Mgahinga", region: "western", order: 8,
    district: "Kisoro", driveFromKampala: "9 hrs · 510 km", image: "golden-monkey",
    tagline: "Gorillas and golden monkeys on the volcanoes",
    about: "Uganda's share of the Virunga volcanoes is a small 34 km² park bordering Rwanda and Congo. It has one habituated gorilla family, Nyakagezi, tracked on the same $800 permit as Bwindi, plus golden monkey tracking in the bamboo and day climbs of Muhabura, Gahinga and Sabyinyo.",
    highlights: ["Gorilla trekking with the Nyakagezi family ($800 permit)", "Golden monkey tracking in the bamboo forest", "Climbing Mount Muhabura (4,127 m) or Sabyinyo, where three countries meet", "The Batwa Trail, led by the forest's original people"],
    bestFor: ["Gorillas", "Hiking", "Culture"],
    bestTime: "Jun–Sep and Dec–Feb (drier trails); open year-round",
    stayAt: ["Mount Gahinga Lodge", "Mutanda Lake Resort"],
    tourSlugs: ["rwanda-uganda-gorilla-combo-9d"]
  },
  {
    id: "bwindi", name: "Bwindi Impenetrable National Park", short: "Bwindi", region: "western", order: 9,
    district: "Kanungu / Kisoro / Rubanda", driveFromKampala: "8–10 hrs · 480–540 km", image: "bwindi-forest",
    tagline: "Home to almost half the world's mountain gorillas",
    about: "Bwindi is a 321 km² UNESCO World Heritage rainforest that shelters roughly half of the world's mountain gorillas, with more than 20 habituated families. It is divided into four trekking sectors: Buhoma in the north, Ruhija in the east, and Rushaga and Nkuringo in the south. A Uganda gorilla permit costs $800, and you can fly to Kihihi or Kisoro airstrips to skip the long drive.",
    highlights: ["Gorilla trekking in Buhoma, Ruhija, Rushaga or Nkuringo ($800 permit)", "The four-hour gorilla habituation experience in Rushaga", "Birding for Albertine Rift endemics around Ruhija", "Batwa cultural experience and Buhoma community walk"],
    bestFor: ["Gorillas", "Hiking", "Birding"],
    bestTime: "Jun–Sep and Dec–Feb (drier trails); trekking runs year-round",
    stayAt: ["Bwindi Lodge (Buhoma)", "Clouds Mountain Gorilla Lodge (Nkuringo)"],
    tourSlugs: ["gorilla-express-3d", "uganda-primate-classic-10d", "uganda-wildlife-gorillas-8d", "fly-in-gorilla-6d", "rwanda-uganda-gorilla-combo-9d", "kenya-uganda-luxury-12d"]
  },
  {
    id: "queen-elizabeth", name: "Queen Elizabeth National Park", short: "Queen Elizabeth", region: "western", order: 10,
    district: "Kasese / Rubirizi / Rukungiri", driveFromKampala: "6.5 hrs · 420 km", image: "kazinga",
    tagline: "Kazinga Channel, Mweya and the Ishasha lions",
    about: "Queen Elizabeth covers about 1,978 km² between Lake George and Lake Edward, which are joined by the 32 km Kazinga Channel. Boat cruises on the channel pass some of Africa's densest hippo and buffalo gatherings, the Mweya peninsula is the park's hub, and the southern Ishasha sector is famous for lions that rest in fig trees.",
    highlights: ["Kazinga Channel boat cruise from Mweya", "Morning game drives on the Kasenyi plains for lion and Uganda kob", "Tree-climbing lions in the Ishasha sector", "Over 600 bird species, from shoebills to flamingos on the crater lakes"],
    bestFor: ["Big game", "Birding", "Scenery"],
    bestTime: "Jun–Sep and Dec–Feb (dry); good year-round",
    stayAt: ["Mweya Safari Lodge", "Ishasha Wilderness Camp"],
    tourSlugs: ["uganda-primate-classic-10d", "uganda-wildlife-gorillas-8d", "fly-in-gorilla-6d"]
  },
  {
    id: "kyambura-gorge", name: "Kyambura Gorge", short: "Kyambura", region: "western", order: 11,
    district: "Rubirizi", driveFromKampala: "6 hrs · 400 km", image: "kyambura-gorge",
    tagline: "The valley of apes",
    about: "On the eastern edge of Queen Elizabeth, the Kyambura River has cut a forested gorge about 100 m deep into the flat savannah. A small habituated chimpanzee community lives in this sunken forest, and tracking them means a steep descent with a ranger to the river.",
    highlights: ["Chimpanzee tracking in a sunken rainforest", "Views from the gorge rim over the savannah", "Black-and-white colobus, red-tailed monkeys and forest birds", "Easy to combine with a Kazinga Channel cruise the same day"],
    bestFor: ["Chimps", "Hiking", "Scenery"],
    bestTime: "Jun–Sep and Dec–Feb (drier, less slippery trails)",
    stayAt: ["Kyambura Gorge Lodge", "Mweya Safari Lodge"],
    tourSlugs: ["fly-in-gorilla-6d"]
  },
  {
    id: "lake-katwe", name: "Lake Katwe & the Explosion Craters", short: "Katwe", region: "western", order: 12,
    district: "Kasese", driveFromKampala: "6.5 hrs · 430 km", image: "elephant-queen",
    tagline: "Salt pans and volcanic craters",
    about: "Lake Katwe is a crater salt lake where local families have mined salt by hand for centuries, working the pans in the shallow brine. Close by, the 27 km Explosion Craters drive inside Queen Elizabeth climbs between dozens of extinct volcanic craters to the Queen's Pavilion, with views over the Rift Valley floor.",
    highlights: ["Guided walk through the Lake Katwe salt pans", "The Explosion Craters drive to the Queen's Pavilion", "Crater lakes with views to the Rwenzori on clear days", "Flamingos on Lake Munyanyange at certain times of year"],
    bestFor: ["Culture", "Scenery"],
    bestTime: "Jun–Sep and Dec–Feb (dry; best for the salt pans)",
    stayAt: ["Mweya Safari Lodge"],
    tourSlugs: []
  },
  {
    id: "rwenzori", name: "Rwenzori Mountains National Park", short: "Rwenzori", region: "western", order: 13,
    district: "Kasese", driveFromKampala: "6 hrs · 375 km", image: "rwenzori",
    tagline: "The Mountains of the Moon",
    about: "The Rwenzori range rises on the Uganda–Congo border to Margherita Peak at 5,109 m, the third-highest summit in Africa, and is a UNESCO World Heritage Site. Its glaciers, bogs and giant lobelias make for one of Africa's great treks, from day hikes out of Kasese to the 7–9 day Central and Kilembe circuits.",
    highlights: ["Summit attempts on Margherita Peak (5,109 m)", "Multi-day treks on the Central Circuit or Kilembe Trail", "Giant groundsels and lobelias in the alpine zone", "Day hikes and Bakonzo community walks from the foothills"],
    bestFor: ["Hiking", "Scenery"],
    bestTime: "Jun–Aug and Dec–Feb (the drier months)",
    stayAt: ["Equator Snow Lodge", "Ruboni Community Camp"],
    tourSlugs: ["rwenzori-margherita-peak-8d", "rwenzori-mahoma-trail-3d"]
  },
  {
    id: "kibale", name: "Kibale National Park", short: "Kibale", region: "western", order: 14,
    district: "Kamwenge / Kabarole", driveFromKampala: "5.5 hrs · 335 km", image: "kibale-forest",
    tagline: "The primate capital of the world",
    about: "Kibale is a 795 km² rainforest with 13 primate species and around 1,500 chimpanzees, the highest density of primates in East Africa. Tracking from Kanyanchu has success rates above 90%, and a Kibale chimp permit costs $250, or you can spend a full day with a group on the chimpanzee habituation experience.",
    highlights: ["Chimpanzee tracking from Kanyanchu ($250 permit)", "The full-day chimpanzee habituation experience", "Red colobus, L'Hoest's monkeys and grey-cheeked mangabeys", "Night forest walks for pottos and bushbabies"],
    bestFor: ["Chimps", "Birding", "Hiking"],
    bestTime: "Jun–Sep and Dec–Feb; chimp tracking runs year-round",
    stayAt: ["Ndali Lodge", "Primate Lodge Kibale"],
    tourSlugs: ["uganda-primate-classic-10d", "kenya-uganda-luxury-12d"]
  },
  {
    id: "bigodi", name: "Bigodi Wetland Sanctuary", short: "Bigodi", region: "western", order: 15,
    district: "Kamwenge", driveFromKampala: "5.5 hrs · 340 km", image: "bigodi",
    tagline: "Community-run swamp walk",
    about: "Just outside Kibale, Bigodi is a papyrus swamp protected and run by the local community group KAFRED, with fees funding schools and village projects. The guided boardwalk trail is one of Uganda's best birding walks, known for the great blue turaco, and primates often feed along the edge.",
    highlights: ["Guided 4.5 km boardwalk trail through the papyrus", "Great blue turaco and more than 130 other bird species", "Red colobus and black-and-white colobus at the forest edge", "Lunch and coffee with the Bigodi community"],
    bestFor: ["Birding", "Culture"],
    bestTime: "Year-round; mornings are best for birds",
    stayAt: ["Primate Lodge Kibale", "Ndali Lodge"],
    tourSlugs: ["uganda-primate-classic-10d"]
  },
  {
    id: "fort-portal", name: "Fort Portal Crater Lakes & Tooro Kingdom", short: "Fort Portal", region: "western", order: 16,
    district: "Kabarole", driveFromKampala: "5 hrs · 300 km", image: "crater-lakes",
    tagline: "Tea country and crater lakes",
    about: "Fort Portal is the seat of the Tooro Kingdom, whose Karuziika palace looks out over the town from Kabarole hill. South of town, the Ndali–Kasenda field holds dozens of deep crater lakes framed by tea estates and forest, with the Rwenzori on the horizon.",
    highlights: ["Crater-lake walks around Nkuruba, Nyinabulitwa and Lake Kyaninga", "The Tooro Kingdom palace and its royal history", "Tea plantation visits outside town", "Views of the Rwenzori from the crater rims"],
    bestFor: ["Scenery", "Hiking", "Culture", "Relaxing"],
    bestTime: "Jun–Aug and Dec–Feb; green and lovely year-round",
    stayAt: ["Kyaninga Lodge", "Ndali Lodge"],
    tourSlugs: ["uganda-wildlife-gorillas-8d", "uganda-primate-classic-10d"]
  },
  {
    id: "amabere", name: "Amabere ga Nyinamwiru Caves", short: "Amabere", region: "western", order: 17,
    district: "Kabarole", driveFromKampala: "5 hrs · 310 km", image: "amabere",
    tagline: "The caves of a legendary princess",
    about: "About 8 km from Fort Portal at Nyakasura, these limestone caves are named after the stalactites said to be the breasts of Princess Nyinamwiru, daughter of the legendary King Bukuku. A short guided walk takes in the caves, a waterfall and the nearby crater views, an easy half-day from Fort Portal.",
    highlights: ["Guided walk through the caves and their legend", "The waterfall at the cave entrance", "Crater-rim viewpoints over the surrounding lakes", "An easy half-day trip from Fort Portal"],
    bestFor: ["Culture", "Scenery"],
    bestTime: "Year-round; drier months for the trail",
    stayAt: ["Kyaninga Lodge", "Mountains of the Moon Hotel, Fort Portal"],
    tourSlugs: []
  },
  {
    id: "semuliki", name: "Semuliki National Park & Sempaya Hot Springs", short: "Semuliki", region: "western", order: 18,
    district: "Bundibugyo", driveFromKampala: "6.5 hrs · 360 km", image: "sempaya",
    tagline: "Where East Africa meets the Congo Basin",
    about: "Across the Rwenzori from Fort Portal, Semuliki protects a lowland forest that is an eastern extension of the Congo's Ituri forest. It holds Central African birds found nowhere else in East Africa, and the Sempaya hot springs, where the female spring Nyasimbi boils hot enough for guides to cook eggs in it.",
    highlights: ["The male and female Sempaya hot springs", "Birding for Congo Basin species such as hornbills and Nkulengu rail", "Forest walks on the Kirumia trail", "The scenic road over the Rwenzori shoulder from Fort Portal"],
    bestFor: ["Birding", "Hiking", "Scenery"],
    bestTime: "Jun–Sep and Dec–Feb (drier forest trails)",
    stayAt: ["Semuliki Safari Lodge", "Kyaninga Lodge"],
    tourSlugs: []
  },
  {
    id: "lake-albert", name: "Lake Albert", short: "Lake Albert", region: "western", order: 19,
    district: "Hoima / Kikuube", driveFromKampala: "4.5 hrs · 260 km", image: "lake-albert",
    tagline: "The Albertine Rift's great lake",
    about: "Lake Albert fills the floor of the Albertine Rift on the Congo border, backed by the steep rift escarpment and the Blue Mountains of Congo. Its shores are lined with fishing villages, and its papyrus margins are one of Uganda's quieter places to look for the shoebill.",
    highlights: ["Boat trips on the lake for shoebill and fish eagles", "Sport fishing for Nile perch", "Views down the rift escarpment from Kabwoya", "Fishing villages and landing sites along the shore"],
    bestFor: ["Birding", "Scenery", "Relaxing"],
    bestTime: "Jun–Sep and Dec–Feb (calmer water)",
    stayAt: ["Lake Albert Safari Lodge", "Semuliki Safari Lodge"],
    tourSlugs: []
  },
  {
    id: "budongo", name: "Budongo Forest", short: "Budongo", region: "western", order: 20,
    district: "Masindi", driveFromKampala: "4 hrs · 245 km", image: "budongo",
    tagline: "East Africa's great mahogany forest",
    about: "Budongo, on the southern edge of Murchison Falls, is the largest natural mahogany forest in East Africa. Chimpanzees are tracked at Kaniyo Pabidi, and the Royal Mile, an old forest road, is one of Uganda's most famous birding trails.",
    highlights: ["Chimpanzee tracking at Kaniyo Pabidi", "Birding on the Royal Mile for Puvel's illadopsis and chocolate-backed kingfisher", "Giant mahogany and ironwood trees", "Easy to add to a Murchison Falls safari"],
    bestFor: ["Chimps", "Birding", "Hiking"],
    bestTime: "Jun–Sep and Dec–Feb; good year-round",
    stayAt: ["Budongo Eco Lodge", "Masindi Hotel"],
    tourSlugs: ["uganda-wildlife-gorillas-8d"]
  },

  /* ===================== NORTHERN UGANDA ===================== */
  {
    id: "ziwa", name: "Ziwa Rhino Sanctuary", short: "Ziwa", region: "northern", order: 1,
    district: "Nakasongola", driveFromKampala: "3 hrs · 176 km", image: "rhino",
    tagline: "Uganda's rhinos, tracked on foot",
    about: "Rhinos were wiped out in Uganda by the early 1980s, and Ziwa is where they are being brought back. The 70 km² sanctuary now holds more than 40 southern white rhinos, which you track on foot with a ranger, for about $50 per person. It sits right on the road to Murchison Falls.",
    highlights: ["Rhino tracking on foot (about $50 pp)", "Shoebill canoe trips in the Lugogo swamp", "Birding and nature walks in the sanctuary", "The perfect stop on the drive to Murchison"],
    bestFor: ["Big game", "Birding"],
    bestTime: "Year-round",
    stayAt: ["Amuka Safari Lodge"],
    tourSlugs: ["uganda-wildlife-gorillas-8d", "kidepo-murchison-explorer-9d"]
  },
  {
    id: "murchison", name: "Murchison Falls National Park", short: "Murchison", region: "northern", order: 2,
    district: "Masindi / Nwoya / Buliisa", driveFromKampala: "5.5 hrs · 305 km", image: "murchison",
    tagline: "The Nile forced through a 7 m gorge",
    about: "Uganda's largest park, at about 3,840 km², is split by the Victoria Nile, which squeezes through a gap of about 7 m and drops 43 m at the falls. Launch trips run upstream to the foot of the falls and downstream to the Nile delta for shoebill, and the north bank's Buligi plains have giraffe, elephant, buffalo and lion.",
    highlights: ["Hike to the Top of the Falls", "Boat cruise to the foot of the falls past hippos and crocodiles", "Shoebill search in the Nile delta where it meets Lake Albert", "North bank game drives for Rothschild's giraffe, elephant and lion"],
    bestFor: ["Big game", "Birding", "Scenery"],
    bestTime: "Dec–Feb and Jun–Sep (dry); game drives best late in the dry season",
    stayAt: ["Nile Safari Lodge", "Paraa Safari Lodge"],
    tourSlugs: ["uganda-wildlife-gorillas-8d", "kidepo-murchison-explorer-9d"]
  },
  {
    id: "karuma-falls", name: "Karuma Falls", short: "Karuma", region: "northern", order: 3,
    district: "Kiryandongo", driveFromKampala: "4.5 hrs · 265 km", image: "karuma-falls",
    tagline: "Nile rapids on the road north",
    about: "At Karuma the Kampala–Gulu highway crosses the Victoria Nile over a run of white-water rapids, a natural pause on the drive north. Local legend says a spirit named Karuma placed the rocks in the river. The stretch also marks the eastern edge of Murchison Falls Conservation Area.",
    highlights: ["Views of the rapids from the Karuma bridge area", "Olive baboons along the roadside", "Sundowners on the Nile at Chobe Safari Lodge", "Gateway to Murchison's quiet eastern sector"],
    bestFor: ["Scenery"],
    bestTime: "Year-round",
    stayAt: ["Chobe Safari Lodge"],
    tourSlugs: ["kidepo-murchison-explorer-9d"]
  },
  {
    id: "pakwach", name: "Pakwach & the Albert Nile", short: "Pakwach", region: "northern", order: 4,
    district: "Pakwach", driveFromKampala: "6 hrs · 360 km", image: "nile-pakwach",
    tagline: "Gateway to West Nile",
    about: "Pakwach is where the main road into West Nile crosses the Albert Nile, just downstream of where the river leaves Lake Albert. It is a lively river town and a handy base for the north-western corner of Murchison Falls and the delta.",
    highlights: ["Crossing the Albert Nile on the Pakwach bridge", "Sunset boat trips on the Albert Nile", "Easy access to Murchison's north bank and the delta", "Fish markets and riverside life"],
    bestFor: ["Scenery", "Culture", "Birding"],
    bestTime: "Dec–Feb and Jun–Sep (dry)",
    stayAt: ["Pakuba Safari Lodge", "Fort Murchison"],
    tourSlugs: []
  },
  {
    id: "ajai", name: "Ajai Wildlife Reserve", short: "Ajai", region: "northern", order: 5,
    district: "Madi-Okollo (Arua)", driveFromKampala: "8 hrs · 450 km", image: "buffalo",
    tagline: "A wild floodplain on the Albert Nile",
    about: "Ajai is a 166 km² reserve on the west bank of the Albert Nile, named after a local chief and once known for its white rhinos. Today it is a quiet, little-visited mix of savannah, woodland and seasonal swamp with Uganda kob, sitatunga and hippos, best combined with a trip to Arua and West Nile.",
    highlights: ["Game walks and drives with Uganda kob and sitatunga", "Hippos and birdlife along the Albert Nile", "The seasonal swamp 'island' at the reserve's heart", "Pairing with Arua town and West Nile culture"],
    bestFor: ["Big game", "Birding"],
    bestTime: "Dec–Mar (dry season, when tracks are passable)",
    stayAt: ["Desert Breeze Hotel, Arua", "UWA bandas at Ajai (basic)"],
    tourSlugs: []
  },
  {
    id: "gulu-patiko", name: "Gulu & Fort Patiko", short: "Gulu", region: "northern", order: 6,
    district: "Gulu", driveFromKampala: "5.5 hrs · 365 km", image: "fort-patiko",
    tagline: "Acholi culture and Baker's Fort",
    about: "Gulu is the lively heart of Acholiland and the gateway to Kidepo. About 30 km north, Fort Patiko, also called Baker's Fort, was built by Sir Samuel Baker in 1872 among granite outcrops that slave traders had used as a holding camp. Its trenches and stone ruins are now a moving historical site.",
    highlights: ["Guided visit to Fort Patiko and its slave-trade history", "Acholi cultural performances such as the larakaraka dance", "Gulu's markets and post-war community projects", "A comfortable overnight on the way to Kidepo"],
    bestFor: ["Culture"],
    bestTime: "Year-round",
    stayAt: ["Bomah Hotel, Gulu", "Acholi Inn, Gulu"],
    tourSlugs: ["kidepo-murchison-explorer-9d"]
  },
  {
    id: "aruu-falls", name: "Aruu Falls", short: "Aruu Falls", region: "northern", order: 7,
    district: "Pader", driveFromKampala: "6.5 hrs · 400 km", image: "aruu-falls",
    tagline: "A hidden waterfall in Acholiland",
    about: "Aruu Falls is a series of cascades where the Aruu River tumbles over granite rock in Pader district, east of Gulu. It sees few visitors and makes a peaceful picnic and photo stop on the road between Gulu and Kitgum on the way to Kidepo.",
    highlights: ["Walks around the cascades and rock pools", "A picnic stop on the road to Kidepo", "Rural Acholi villages along the way", "Fullest flow after the rains"],
    bestFor: ["Scenery", "Relaxing"],
    bestTime: "Apr–Nov for the strongest flow; easier access in the dry months",
    stayAt: ["Bomah Hotel, Gulu"],
    tourSlugs: []
  },
  {
    id: "kidepo", name: "Kidepo Valley National Park", short: "Kidepo", region: "northern", order: 8,
    district: "Kaabong", driveFromKampala: "10–11 hrs · 570 km", image: "kidepo",
    tagline: "Uganda's most remote wilderness",
    about: "Kidepo lies in the far north-east on the borders of South Sudan and Kenya, a 1,442 km² park of open valleys framed by mountains. The Narus Valley holds lions, big buffalo herds, elephant and zebra, and it is Uganda's best park for cheetah and ostrich, both rare elsewhere in the country. Most guests drive in via Gulu and fly back, a two-hour flight to Entebbe.",
    highlights: ["Game drives in the Narus Valley for lion, buffalo and elephant", "Cheetah, ostrich and kongoni, rare elsewhere in Uganda", "The sand river of the Kidepo Valley and Kanangorok hot springs", "Visits to Karamojong manyattas and the Ik on Mount Morungole"],
    bestFor: ["Big game", "Culture", "Scenery"],
    bestTime: "Sep–Mar (dry season, animals gather in the Narus Valley)",
    stayAt: ["Apoka Safari Lodge", "Kidepo Savannah Lodge"],
    tourSlugs: ["kidepo-murchison-explorer-9d"]
  },
  {
    id: "karamoja-moroto", name: "Karamoja & Mount Moroto", short: "Moroto", region: "northern", order: 9,
    district: "Moroto", driveFromKampala: "8 hrs · 450 km", image: "mount-moroto",
    tagline: "Pastoral culture under a 3,083 m peak",
    about: "Karamoja is the semi-arid north-east, home to the Karamojong, whose cattle-herding life shapes the land. Moroto town sits beneath Mount Moroto (3,083 m), where guided hikes climb through Tepeth villages to forest and views over the plains.",
    highlights: ["Hikes up Mount Moroto with Tepeth guides", "Visits to Karamojong manyattas and cattle kraals", "Moroto's markets and beadwork", "Wide-open landscapes on the road to Kidepo"],
    bestFor: ["Culture", "Hiking", "Scenery"],
    bestTime: "Oct–Mar (dry; hot by midday)",
    stayAt: ["Mt Moroto Hotel"],
    tourSlugs: ["kidepo-murchison-explorer-9d"]
  },
  {
    id: "pian-upe", name: "Pian Upe Wildlife Reserve", short: "Pian Upe", region: "northern", order: 10,
    district: "Nakapiripirit / Amudat", driveFromKampala: "6 hrs · 330 km", image: "pian-upe",
    tagline: "Wide plains below Mount Kadam",
    about: "At about 2,788 km², Pian Upe is Uganda's second-largest protected area and holds the country's last population of roan antelope. It is open, wild savannah beneath Mount Kadam with very few visitors, best on a road loop between Kidepo and Mount Elgon.",
    highlights: ["Roan antelope, found nowhere else in Uganda", "Walking and driving safaris with almost no other visitors", "Views of Mount Kadam and Mount Elgon", "Pokot and Karamojong culture around the reserve"],
    bestFor: ["Big game", "Scenery", "Culture"],
    bestTime: "Oct–Mar (dry season)",
    stayAt: ["UWA bandas at the reserve (basic)", "Sipi River Lodge (2.5 hrs south)"],
    tourSlugs: []
  },
  {
    id: "sipi-falls", name: "Sipi Falls & Mount Elgon", short: "Sipi", region: "northern", order: 11,
    district: "Kapchorwa", driveFromKampala: "5 hrs · 275 km", image: "sipi-falls",
    tagline: "Three waterfalls on the way home",
    about: "On the drive back south from Karamoja, Sipi's three waterfalls drop off the slopes of Mount Elgon, the highest about 100 m. Cool air, coffee farms and big views over the plains make it a favourite last stop before Kampala.",
    highlights: ["Guided hike to all three waterfalls", "Arabica coffee tours with Bugisu farmers", "Abseiling beside the main fall", "Starting point for Mount Elgon treks"],
    bestFor: ["Hiking", "Scenery", "Relaxing"],
    bestTime: "Jun–Aug and Dec–Mar (drier trails)",
    stayAt: ["Sipi River Lodge", "Lacam Lodge"],
    tourSlugs: []
  }
];
