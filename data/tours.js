/* Brooks Tours & Travels — tour catalogue (source of truth for all pages).
   image / gallery hold catalogue names from assets/img (use NAME-sm.webp in cards, NAME.webp in heroes).
   months: 1–12, the months we recommend the trip (used by the home trip-finder ?month= filter). */
window.BROOKS_TOURS = [
  {
    slug: "gorilla-express-3d",
    title: "Gorilla Express: Bwindi in 3 Days",
    days: 3, nights: 2,
    countries: ["uganda"],
    experiences: ["gorillas", "hiking"],
    style: "Mid-range",
    priceFrom: 1650,
    badge: "Short break",
    image: "gorilla-family",
    gallery: ["gorilla-family", "gorilla-baby", "bunyonyi", "rwanda-hills"],
    summary: "The fastest way to sit with mountain gorillas: land in Kigali, cross into southern Bwindi and trek the Rushaga gorilla families the next morning.",
    highlights: [
      "One Uganda gorilla trekking permit ($800) included and pre-booked",
      "Short 4-hour transfer from Kigali via the Cyanika border instead of a 9-hour drive from Entebbe",
      "Trek a habituated family in Bwindi's Rushaga sector with expert Uganda Wildlife Authority rangers",
      "Two nights at Rushaga Gorilla Camp, a short walk from the trailhead",
      "Optional Batwa community walk on the afternoon after your trek",
      "Private 4x4 Land Cruiser with pop-up roof and English-speaking driver-guide throughout"
    ],
    bestMonths: "Jun–Sep and Dec–Feb (drier trails); possible all year",
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    groupSize: "Private, 2–8",
    itinerary: [
      { day: "1", title: "Kigali to Rushaga, Bwindi", text: "Your guide meets you at Kigali International Airport. Drive north through terraced Rwandan hills to the Cyanika border, then on past the Virunga volcanoes and Lake Mutanda to Rushaga in southern Bwindi. Afternoon at leisure with a sundowner overlooking the forest.", overnight: "Rushaga Gorilla Camp", meals: "L/D" },
      { day: "2", title: "Mountain gorilla trek", text: "Briefing at 7:30am at the Rushaga ranger post, then set off with trackers in search of your assigned family. Treks last 2–6 hours through steep, muddy forest; once you find the gorillas you spend a precious hour with them. Porters are available for around $20. Return to camp for a hot shower and certificate presentation.", overnight: "Rushaga Gorilla Camp", meals: "B/L/D" },
      { day: "3", title: "Return to Kigali", text: "After breakfast, drive back across the border to Kigali. Time permitting, stop at the Kigali Genocide Memorial before your evening flight (book departures after 6pm).", overnight: "End of tour", meals: "B/L" }
    ],
    included: ["Uganda gorilla trekking permit ($800)", "2 nights full-board accommodation", "Private 4x4 safari vehicle, fuel and driver-guide", "Kigali airport meet-and-greet and transfers", "Bottled water in the vehicle", "Government taxes and park entry fees"],
    excluded: ["International flights", "Uganda visa ($50, or East Africa Tourist Visa $100)", "Porters and tips", "Travel insurance", "Drinks at the lodge", "Optional Batwa experience ($40 pp)"],
    offer: false
  },
  {
    slug: "uganda-primate-classic-10d",
    title: "Uganda Primate Classic",
    days: 10, nights: 9,
    countries: ["uganda"],
    experiences: ["gorillas", "chimps", "big-five", "birding", "culture"],
    style: "Mid-range",
    priceFrom: 4850,
    oldPrice: 5390,
    badge: "Best seller",
    image: "chimpanzee",
    gallery: ["chimpanzee", "gorilla-baby", "kazinga", "lion-tree", "bunyonyi"],
    summary: "Uganda's greatest hits at an unhurried pace: chimps in Kibale, tree-climbing lions and Kazinga Channel hippos in Queen Elizabeth, gorillas in Bwindi and three slow days on Lake Bunyonyi.",
    highlights: [
      "Chimpanzee tracking in Kibale Forest, home to over 1,500 chimps (permit $250 included)",
      "Mountain gorilla trek in Bwindi Impenetrable Forest (permit $800 included)",
      "Afternoon boat cruise on the Kazinga Channel among elephants, hippos and buffalo",
      "Search for the tree-climbing lions of Ishasha",
      "Bigodi Wetland walk for great blue turacos and eight primate species",
      "Canoe on Lake Bunyonyi and unwind before flying home"
    ],
    bestMonths: "Jun–Sep and Dec–Feb; green season Mar–May brings lower prices",
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    groupSize: "Private, 2–8",
    itinerary: [
      { day: "1", title: "Arrive Entebbe", text: "Met on arrival at Entebbe International Airport and transferred to your lakeside hotel. If time allows, stroll the Entebbe Botanical Gardens before dinner.", overnight: "Protea Hotel Entebbe", meals: "D" },
      { day: "2", title: "Drive to Kibale Forest", text: "Head west via Mubende and Fort Portal, with Rwenzori Mountains views on clear days. Arrive in time to explore the crater lakes on foot.", overnight: "Primate Lodge Kibale", meals: "B/L/D" },
      { day: "3", title: "Chimpanzee tracking and Bigodi swamp", text: "Morning chimp tracking from Kanyanchu with Uganda Wildlife Authority guides; chimps are usually found within 1–3 hours. Afternoon guided walk through Bigodi Wetland Sanctuary for red colobus, l'Hoest's monkeys and over 200 bird species.", overnight: "Primate Lodge Kibale", meals: "B/L/D" },
      { day: "4", title: "Queen Elizabeth National Park", text: "Drive south across the equator into Queen Elizabeth National Park. Afternoon game drive on the Kasenyi plains for Uganda kob, lion and elephant.", overnight: "Mweya Safari Lodge", meals: "B/L/D" },
      { day: "5", title: "Kasenyi and the Kazinga Channel", text: "Dawn game drive when the cats are most active, then the classic two-hour afternoon launch along the Kazinga Channel, which holds one of Africa's densest hippo populations.", overnight: "Mweya Safari Lodge", meals: "B/L/D" },
      { day: "6", title: "Ishasha to Bwindi", text: "Game drive through the remote Ishasha sector looking for lions lounging in fig trees, then continue to Buhoma on the northern edge of Bwindi Impenetrable Forest.", overnight: "Buhoma Lodge", meals: "B/L/D" },
      { day: "7", title: "Gorilla trekking", text: "The day you came for. After the 7:45am briefing, trek into the forest to find a habituated mountain gorilla family and spend an unforgettable hour in their company.", overnight: "Buhoma Lodge", meals: "B/L/D" },
      { day: "8", title: "Lake Bunyonyi", text: "Scenic drive through the Kigezi highlands, known as the Switzerland of Africa, to Lake Bunyonyi and its 29 islands. Afternoon dugout canoe paddle.", overnight: "Birdnest Resort Bunyonyi", meals: "B/L/D" },
      { day: "9", title: "Lake Mburo National Park", text: "Drive to Lake Mburo, the only park in western Uganda with zebra, eland and impala. Late-afternoon boat trip or guided walk.", overnight: "Mihingo Lodge", meals: "B/L/D" },
      { day: "10", title: "Return to Entebbe", text: "Morning game drive, then return to Entebbe with a stop at the Equator monument. Day room and transfer for your evening flight.", overnight: "End of tour", meals: "B/L" }
    ],
    included: ["Gorilla permit ($800) and chimp permit ($250)", "9 nights accommodation as listed, full board on safari", "Private 4x4 Land Cruiser with pop-up roof", "English-speaking driver-guide throughout", "Kazinga Channel launch cruise", "Bigodi Wetland walk", "All park entry fees", "Airport transfers and bottled water"],
    excluded: ["International flights", "Uganda visa ($50)", "Travel insurance", "Tips and porters", "Drinks and laundry", "Optional activities not listed"],
    offer: true,
    offerNote: "Save $540 per person on green-season departures (April–May 2027) — same lodges, lush forests and quieter trails.",
    offerValid: "2027-05-31"
  },
  {
    slug: "uganda-wildlife-gorillas-8d",
    title: "Uganda Wildlife & Gorillas",
    days: 8, nights: 7,
    countries: ["uganda"],
    experiences: ["gorillas", "big-five", "birding"],
    style: "Mid-range",
    priceFrom: 3950,
    badge: "Great value",
    image: "murchison",
    gallery: ["murchison", "rhino", "elephant-queen", "gorilla-family", "shoebill"],
    summary: "Rhinos on foot at Ziwa, the thundering Murchison Falls, Nile boat safaris and a gorilla trek in Bwindi — Uganda's savannah and forest in a single week.",
    highlights: [
      "Track southern white rhinos on foot at Ziwa Rhino Sanctuary",
      "Hike to the top of Murchison Falls, where the Nile forces itself through a 7-metre gap",
      "Nile launch cruise to the foot of the falls and a game drive on the Buligi tracks",
      "Shoebill search in the papyrus of the Victoria Nile delta (seasonal)",
      "Gorilla trek in Bwindi (permit $800 included)",
      "Kazinga Channel cruise in Queen Elizabeth National Park"
    ],
    bestMonths: "Dec–Feb and Jun–Sep for game viewing; all year for gorillas",
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    groupSize: "Private, 2–8",
    itinerary: [
      { day: "1", title: "Kampala to Ziwa and Murchison", text: "Early pickup and drive north to Ziwa Rhino Sanctuary for a guided rhino walk, then continue to Murchison Falls National Park.", overnight: "Paraa Safari Lodge", meals: "L/D" },
      { day: "2", title: "Game drive and Nile cruise", text: "Dawn game drive on the Buligi peninsula for Rothschild's giraffe, lion and Jackson's hartebeest. Afternoon boat cruise to the base of the falls.", overnight: "Paraa Safari Lodge", meals: "B/L/D" },
      { day: "3", title: "Top of the Falls to Fort Portal", text: "Hike to the top of Murchison Falls, then drive south along the Albertine Rift escarpment to Fort Portal.", overnight: "Kyaninga Lodge", meals: "B/L/D" },
      { day: "4", title: "Queen Elizabeth National Park", text: "Continue to Queen Elizabeth with an afternoon game drive on the Kasenyi plains.", overnight: "Mweya Safari Lodge", meals: "B/L/D" },
      { day: "5", title: "Kazinga Channel to Bwindi", text: "Morning Kazinga Channel cruise, then drive through Ishasha to Buhoma, scanning the fig trees for climbing lions.", overnight: "Buhoma Lodge", meals: "B/L/D" },
      { day: "6", title: "Gorilla trekking", text: "Trek with rangers to a habituated gorilla family for a once-in-a-lifetime hour. Optional afternoon Buhoma village walk.", overnight: "Buhoma Lodge", meals: "B/L/D" },
      { day: "7", title: "Lake Mburo National Park", text: "Drive east to Lake Mburo for zebra, eland and a sunset boat trip on the lake.", overnight: "Mihingo Lodge", meals: "B/L/D" },
      { day: "8", title: "Return to Entebbe", text: "Morning nature walk, then drive to Entebbe via the Equator for your onward flight.", overnight: "End of tour", meals: "B/L" }
    ],
    included: ["Gorilla permit ($800)", "Ziwa rhino tracking", "7 nights full-board accommodation", "Private 4x4 Land Cruiser and driver-guide", "Nile and Kazinga Channel boat cruises", "All park entry fees", "Airport transfers"],
    excluded: ["International flights", "Uganda visa ($50)", "Travel insurance", "Tips and porters", "Drinks", "Murchison shoebill boat trip ($60 pp)"],
    offer: false
  },
  {
    slug: "fly-in-gorilla-6d",
    title: "Fly-in Gorillas & Chimps in Style",
    days: 6, nights: 5,
    countries: ["uganda"],
    experiences: ["gorillas", "chimps", "big-five"],
    style: "Fly-in",
    priceFrom: 7400,
    badge: "Fly-in",
    image: "gorilla-baby",
    gallery: ["gorilla-baby", "chimp-kyambura", "kazinga", "safari-lodge"],
    summary: "Swap long drives for scenic light-aircraft hops: Entebbe to Kihihi for gorillas at Bwindi Lodge, then Kyambura Gorge for chimps and the wildlife of Queen Elizabeth.",
    highlights: [
      "Scheduled Aerolink flights between Entebbe, Kihihi and Mweya — no long road transfers",
      "Gorilla trek from Bwindi Lodge, perched on the forest edge (permit $800 included)",
      "Chimp tracking in the sunken forest of Kyambura Gorge",
      "Private game drives and Kazinga Channel boat safari",
      "Luxury lodges with private bandas, guiding and laundry included",
      "Ideal for travellers short on time or who prefer not to drive"
    ],
    bestMonths: "Jun–Sep and Dec–Feb (drier); treks run all year",
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    groupSize: "Private, 2–8",
    itinerary: [
      { day: "1", title: "Arrive Entebbe", text: "Private transfer to a garden hotel on the shores of Lake Victoria for a restful first night.", overnight: "The Boma Entebbe", meals: "D" },
      { day: "2", title: "Fly to Kihihi, transfer to Bwindi", text: "Morning Aerolink flight over the Rwenzori foothills to Kihihi, then a scenic 90-minute drive to Buhoma. Afternoon forest walk with a lodge naturalist.", overnight: "Bwindi Lodge", meals: "B/L/D" },
      { day: "3", title: "Gorilla trekking", text: "Your lodge guide accompanies you to the briefing before you trek to a habituated family. Return to a massage and a fireside dinner.", overnight: "Bwindi Lodge", meals: "B/L/D" },
      { day: "4", title: "To Queen Elizabeth via Ishasha", text: "Game drive north through Ishasha's fig-tree lion country to the Kyambura Gorge escarpment, arriving for sundowners over the plains.", overnight: "Kyambura Gorge Lodge", meals: "B/L/D" },
      { day: "5", title: "Kyambura chimps and Kazinga Channel", text: "Descend into Kyambura Gorge with rangers to track its isolated chimpanzee community. Afternoon private boat safari on the Kazinga Channel.", overnight: "Kyambura Gorge Lodge", meals: "B/L/D" },
      { day: "6", title: "Fly back to Entebbe", text: "Early game drive on Kasenyi, then fly from Mweya airstrip to Entebbe to connect with your international flight.", overnight: "End of tour", meals: "B/L" }
    ],
    included: ["Domestic Aerolink flights (15 kg soft-bag limit)", "Gorilla permit ($800) and Kyambura chimp permit", "5 nights luxury accommodation, full board", "Local drinks at Bwindi Lodge and Kyambura Gorge Lodge", "Private guided game drives and boat safari", "Park fees and airport transfers"],
    excluded: ["International flights", "Uganda visa ($50)", "Premium drinks and champagne", "Tips and porters", "Travel insurance"],
    offer: false
  },
  {
    slug: "rwanda-gorillas-golden-monkeys-4d",
    title: "Rwanda Gorillas & Golden Monkeys",
    days: 4, nights: 3,
    countries: ["rwanda"],
    experiences: ["gorillas", "hiking", "culture"],
    style: "Mid-range",
    priceFrom: 3450,
    badge: "Rwanda",
    image: "golden-monkey",
    gallery: ["golden-monkey", "virunga-volcanoes", "gorilla-family", "kigali"],
    summary: "Kigali to the Virunga volcanoes in under three hours: trek mountain gorillas in Volcanoes National Park, follow playful golden monkeys through bamboo and visit Kigali's moving memorial.",
    highlights: [
      "Rwanda gorilla permit ($1,500) included — Volcanoes National Park, Musanze",
      "Golden monkey tracking in the bamboo zone of Mount Sabyinyo ($100 permit included)",
      "Optional hike to Dian Fossey's grave at the former Karisoke research station",
      "Kigali city tour including the Kigali Genocide Memorial",
      "Smooth tarmac road the whole way — perfect for a short break",
      "Stay at Five Volcanoes Boutique Hotel, minutes from the park HQ at Kinigi"
    ],
    bestMonths: "Jun–Sep and Dec–Feb (drier); treks run all year",
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    groupSize: "Private, 2–8",
    itinerary: [
      { day: "1", title: "Kigali city and drive to Musanze", text: "Morning arrival and guided Kigali tour: the Genocide Memorial, Kimironko market and the Inema Arts Centre. Afternoon drive north to Musanze with views of the Virunga chain.", overnight: "Five Volcanoes Boutique Hotel", meals: "L/D" },
      { day: "2", title: "Mountain gorilla trek", text: "Report to Kinigi park headquarters at 7am for traditional dance and your briefing, then trek to one of the park's habituated families for a magical hour.", overnight: "Five Volcanoes Boutique Hotel", meals: "B/L/D" },
      { day: "3", title: "Golden monkeys and Dian Fossey hike", text: "Track the endemic golden monkey through bamboo on the slopes of Sabyinyo. Afternoon at leisure or a strenuous optional hike to Dian Fossey's grave ($75).", overnight: "Five Volcanoes Boutique Hotel", meals: "B/L/D" },
      { day: "4", title: "Return to Kigali", text: "Optional morning visit to the Iby'Iwacu cultural village or the Ellen DeGeneres Campus of the Dian Fossey Gorilla Fund, then drive to Kigali for your flight.", overnight: "End of tour", meals: "B/L" }
    ],
    included: ["Rwanda gorilla permit ($1,500)", "Golden monkey permit ($100)", "3 nights full-board accommodation", "Private 4x4 vehicle and driver-guide", "Kigali city tour and memorial visit", "Airport transfers and bottled water"],
    excluded: ["International flights", "Rwanda visa ($50 on arrival)", "Dian Fossey hike ($75)", "Tips and porters ($10–20)", "Travel insurance", "Drinks"],
    offer: false
  },
  {
    slug: "kenya-mara-amboseli-7d",
    title: "Kenya Classic: Amboseli, Naivasha & the Mara",
    days: 7, nights: 6,
    countries: ["kenya"],
    experiences: ["big-five", "migration", "birding", "culture"],
    style: "Mid-range",
    priceFrom: 3280,
    oldPrice: 3690,
    badge: "Big Five",
    image: "elephants-amboseli",
    gallery: ["elephants-amboseli", "kilimanjaro", "masai-mara", "lion-mara", "maasai-people"],
    summary: "Elephants beneath Kilimanjaro, boat rides among Lake Naivasha's hippos and three nights in the Masai Mara — Kenya's classic circuit with private game drives throughout.",
    highlights: [
      "Big tuskers of Amboseli framed by snow-capped Kilimanjaro",
      "Boat ride and walking safari on Crescent Island, Lake Naivasha",
      "Three nights in the Masai Mara for lion, cheetah and leopard",
      "River crossings of the Great Migration on July–October departures",
      "Visit to a Maasai manyatta guided by community members",
      "Private 4x4 safari vehicle with pop-up roof and charging points"
    ],
    bestMonths: "Jul–Oct for the migration; Jan–Mar for calving and fewer crowds",
    months: [1, 2, 3, 7, 8, 9, 10, 12],
    groupSize: "Private, 2–8",
    itinerary: [
      { day: "1", title: "Nairobi to Amboseli", text: "Collected from your Nairobi hotel or the airport and driven south to Amboseli National Park, arriving for an afternoon game drive as Kilimanjaro emerges from the clouds.", overnight: "Ol Tukai Lodge", meals: "L/D" },
      { day: "2", title: "Full day in Amboseli", text: "Morning and afternoon game drives across the swamps and dry lake bed, with time at Observation Hill for panoramic views over the herds.", overnight: "Ol Tukai Lodge", meals: "B/L/D" },
      { day: "3", title: "Lake Naivasha", text: "Drive to the Rift Valley and Lake Naivasha. Afternoon boat ride among hippos and fish eagles, then a walk on Crescent Island among giraffe and zebra.", overnight: "Lake Naivasha Sopa Resort", meals: "B/L/D" },
      { day: "4", title: "Into the Masai Mara", text: "Descend the Rift Valley escarpment and cross Maasai country to the Mara. Afternoon game drive.", overnight: "Ashnil Mara Camp", meals: "B/L/D" },
      { day: "5", title: "Masai Mara full day", text: "Full-day game drive with picnic lunch, heading for the Mara River in migration season. Optional sunrise hot-air balloon flight ($495).", overnight: "Ashnil Mara Camp", meals: "B/L/D" },
      { day: "6", title: "Mara and Maasai village", text: "Dawn game drive, then a visit to a Maasai village to learn about cattle, beadwork and warrior traditions.", overnight: "Ashnil Mara Camp", meals: "B/L/D" },
      { day: "7", title: "Return to Nairobi", text: "Final morning drive, then return by road to Nairobi (or upgrade to a 45-minute flight from the Mara).", overnight: "End of tour", meals: "B/L" }
    ],
    included: ["6 nights full-board accommodation", "Private 4x4 safari vehicle and driver-guide", "Park and conservancy fees", "Lake Naivasha boat ride", "Maasai village visit", "Airport transfers and bottled water"],
    excluded: ["International flights", "Kenya eTA ($32)", "Hot-air balloon ($495)", "Tips", "Travel insurance", "Drinks"],
    offer: true,
    offerNote: "Book by 31 January 2027 for travel between January and March 2027 and save $410 per person.",
    offerValid: "2027-01-31"
  },
  {
    slug: "tanzania-serengeti-ngorongoro-8d",
    title: "Tanzania Northern Circuit",
    days: 8, nights: 7,
    countries: ["tanzania"],
    experiences: ["big-five", "migration", "birding"],
    style: "Mid-range",
    priceFrom: 3980,
    badge: "Popular",
    image: "serengeti",
    gallery: ["serengeti", "ngorongoro", "giraffe", "leopard", "zebras"],
    summary: "Baobabs and elephants in Tarangire, three nights in the endless Serengeti and a descent into the Ngorongoro Crater — Tanzania's northern circuit done properly.",
    highlights: [
      "Tarangire's giant baobabs and herds of up to 300 elephants",
      "Three nights in the central Serengeti, Africa's best big-cat territory",
      "Game drive on the floor of Ngorongoro Crater for black rhino",
      "Lake Manyara's flamingos and forest",
      "Visit to Olduvai Gorge, the cradle of humankind",
      "Private safari Land Cruiser with roof hatch"
    ],
    bestMonths: "Jun–Oct dry season; Jan–Feb for the southern Serengeti calving",
    months: [1, 2, 6, 7, 8, 9, 10],
    groupSize: "Private, 2–8",
    itinerary: [
      { day: "1", title: "Arrive Kilimanjaro, transfer to Arusha", text: "Meet-and-greet at Kilimanjaro International Airport and transfer to a coffee-farm lodge on the slopes of Mount Meru.", overnight: "Arusha Coffee Lodge", meals: "D" },
      { day: "2", title: "Tarangire National Park", text: "Drive to Tarangire for a full afternoon among baobabs, elephants and the Tarangire River's resident lions.", overnight: "Tarangire Safari Lodge", meals: "B/L/D" },
      { day: "3", title: "Lake Manyara to Karatu", text: "Morning in Lake Manyara National Park, then climb to the green highlands of Karatu.", overnight: "Gibb's Farm", meals: "B/L/D" },
      { day: "4", title: "Into the Serengeti via Olduvai", text: "Cross the Ngorongoro Conservation Area, stop at Olduvai Gorge and enter the Serengeti at Naabi Hill. Game drive to your lodge.", overnight: "Serengeti Serena Safari Lodge", meals: "B/L/D" },
      { day: "5", title: "Central Serengeti", text: "Full day exploring the Seronera Valley, famous for leopard in the sausage trees and lion on the kopjes.", overnight: "Serengeti Serena Safari Lodge", meals: "B/L/D" },
      { day: "6", title: "Serengeti to the Crater rim", text: "Morning game drive, then back to the Ngorongoro highlands for dinner on the crater rim.", overnight: "Ngorongoro Serena Safari Lodge", meals: "B/L/D" },
      { day: "7", title: "Ngorongoro Crater", text: "Descend 600 metres to the crater floor at dawn for black rhino, lion, flamingo-lined soda lakes and a picnic by the hippo pool.", overnight: "Ngorongoro Serena Safari Lodge", meals: "B/L/D" },
      { day: "8", title: "Return to Arusha", text: "Drive back to Arusha for lunch and your onward flight, or continue to Zanzibar.", overnight: "End of tour", meals: "B/L" }
    ],
    included: ["7 nights accommodation, full board on safari", "Private 4x4 Land Cruiser and driver-guide", "All park fees and Ngorongoro crater service fee", "Olduvai Gorge entry", "Airport transfers", "Bottled water and flying doctors' evacuation cover"],
    excluded: ["International flights", "Tanzania visa ($50, $100 for US citizens)", "Tips", "Travel insurance", "Drinks", "Balloon safari ($599)"],
    offer: false
  },
  {
    slug: "great-migration-10d",
    title: "The Great Migration: Serengeti to Mara",
    days: 10, nights: 9,
    countries: ["tanzania", "kenya"],
    experiences: ["migration", "big-five"],
    style: "Luxury",
    priceFrom: 11900,
    badge: "Jul–Oct only",
    image: "migration",
    gallery: ["migration", "balloon", "lion-mara", "serengeti", "masai-mara"],
    summary: "Follow 1.5 million wildebeest across the northern Serengeti and Kenya's Masai Mara, with fly-in transfers, river-crossing vigils and the region's finest camps.",
    highlights: [
      "Prime Mara River crossings from Kogatende and the Lamai Triangle",
      "Sunrise hot-air balloon over the Serengeti with champagne breakfast",
      "Four Seasons Safari Lodge Serengeti and its waterhole-facing infinity pool",
      "Three nights at Governors' Camp on the banks of the Mara River",
      "Light-aircraft transfers between parks and across the border",
      "Expert private guides who know where the herds are each day"
    ],
    bestMonths: "Jul–Oct (northern Serengeti and Masai Mara crossings)",
    months: [7, 8, 9, 10],
    groupSize: "Private, 2–8",
    itinerary: [
      { day: "1", title: "Arrive Arusha", text: "Welcome at Kilimanjaro International Airport and transfer to your plantation lodge.", overnight: "Arusha Coffee Lodge", meals: "D" },
      { day: "2", title: "Fly to central Serengeti", text: "Light-aircraft flight to Seronera and afternoon game drive en route to your lodge.", overnight: "Four Seasons Safari Lodge Serengeti", meals: "B/L/D" },
      { day: "3", title: "Balloon over the Serengeti", text: "Pre-dawn balloon flight over the Seronera Valley, champagne bush breakfast, then a leisurely game drive.", overnight: "Four Seasons Safari Lodge Serengeti", meals: "B/L/D" },
      { day: "4", title: "North to Kogatende", text: "Fly north to Kogatende, where the herds gather on the banks of the Mara River.", overnight: "Lemala Kuria Hills Lodge", meals: "B/L/D" },
      { day: "5", title: "Mara River crossings", text: "Full days at the river with packed lunches, waiting with your guide for the herds to commit to the crossing.", overnight: "Lemala Kuria Hills Lodge", meals: "B/L/D" },
      { day: "6", title: "Lamai Triangle", text: "Explore the remote Lamai Triangle and its crossing points, often with only a handful of vehicles.", overnight: "Lemala Kuria Hills Lodge", meals: "B/L/D" },
      { day: "7", title: "Cross the border to Kenya", text: "Fly to Migori to clear Kenyan immigration and on to the Masai Mara. Afternoon game drive along the river.", overnight: "Governors' Camp", meals: "B/L/D" },
      { day: "8", title: "Masai Mara", text: "Full day in the Mara with the Marsh Pride, cheetah coalitions and the tail end of the herds.", overnight: "Governors' Camp", meals: "B/L/D" },
      { day: "9", title: "Masai Mara", text: "Dawn drive and an optional guided walk with Maasai rangers, then a farewell bush dinner.", overnight: "Governors' Camp", meals: "B/L/D" },
      { day: "10", title: "Fly to Nairobi", text: "Scheduled flight to Wilson Airport and transfer to Jomo Kenyatta International for your flight home.", overnight: "End of tour", meals: "B" }
    ],
    included: ["All light-aircraft flights and the cross-border routing", "Hot-air balloon safari with champagne breakfast", "9 nights luxury accommodation, all meals", "Most drinks at camps, laundry", "Private guides and vehicles", "All park and conservancy fees", "Flying doctors' evacuation cover"],
    excluded: ["International flights", "Tanzania visa and Kenya eTA", "Premium wines and spirits", "Tips", "Travel insurance"],
    offer: false
  },
  {
    slug: "kenya-uganda-luxury-12d",
    title: "Giraffe Manor to Gorillas: Kenya & Uganda Luxury",
    days: 12, nights: 11,
    countries: ["kenya", "uganda"],
    experiences: ["big-five", "gorillas", "chimps", "migration", "culture"],
    style: "Luxury",
    priceFrom: 13200,
    badge: "Signature",
    image: "nairobi-giraffe",
    gallery: ["nairobi-giraffe", "masai-mara", "gorilla-baby", "chimpanzee", "safari-lodge"],
    summary: "Breakfast with Rothschild's giraffes at Giraffe Manor, the predators of the Masai Mara, then fly to Uganda for chimps in Kibale and gorillas in Bwindi — East Africa's most complete luxury journey.",
    highlights: [
      "Two nights at the iconic Giraffe Manor in Nairobi",
      "Three nights at Governors' Il Moran Camp in the Masai Mara",
      "Chimp tracking in Kibale from Kyaninga Lodge, overlooking a crater lake",
      "Two gorilla treks in Bwindi from Clouds Mountain Gorilla Lodge",
      "Charter and scheduled flights throughout — no long drives",
      "A dedicated Brooks host on call 24 hours a day"
    ],
    bestMonths: "Jun–Oct and Dec–Feb",
    months: [1, 2, 6, 7, 8, 9, 10, 12],
    groupSize: "Private, 2–8",
    itinerary: [
      { day: "1", title: "Arrive Nairobi", text: "VIP meet-and-greet and transfer to Giraffe Manor, where the resident giraffes may join you at the window.", overnight: "Giraffe Manor", meals: "D" },
      { day: "2", title: "Nairobi in depth", text: "Private visits to the Sheldrick Wildlife Trust elephant orphanage, the Karen Blixen Museum and the Kazuri bead workshop.", overnight: "Giraffe Manor", meals: "B/L/D" },
      { day: "3", title: "Fly to the Masai Mara", text: "Fly from Wilson Airport to the Mara. Afternoon game drive along the river.", overnight: "Governors' Il Moran Camp", meals: "B/L/D" },
      { day: "4", title: "Masai Mara", text: "Full day following lion, leopard and cheetah, with migration crossings from July to October.", overnight: "Governors' Il Moran Camp", meals: "B/L/D" },
      { day: "5", title: "Masai Mara", text: "Optional balloon flight, guided bush walk and a sundowner on the escarpment.", overnight: "Governors' Il Moran Camp", meals: "B/L/D" },
      { day: "6", title: "Fly to Entebbe", text: "Fly to Nairobi and connect to Entebbe. Evening at a lakeside villa.", overnight: "The Boma Entebbe", meals: "B/L/D" },
      { day: "7", title: "Fly to Kibale", text: "Charter flight to Kasese and short drive to Kyaninga Lodge, with the Rwenzori Mountains on the horizon.", overnight: "Kyaninga Lodge", meals: "B/L/D" },
      { day: "8", title: "Chimpanzee tracking", text: "Chimp tracking in Kibale Forest, then a relaxed afternoon at the lodge pool.", overnight: "Kyaninga Lodge", meals: "B/L/D" },
      { day: "9", title: "Fly to Bwindi", text: "Fly to Kisoro and drive to the high ridge of Nkuringo.", overnight: "Clouds Mountain Gorilla Lodge", meals: "B/L/D" },
      { day: "10", title: "First gorilla trek", text: "Trek with Nkuringo rangers to a habituated family.", overnight: "Clouds Mountain Gorilla Lodge", meals: "B/L/D" },
      { day: "11", title: "Second gorilla trek", text: "A second encounter with a different family, or a Batwa forest experience if you prefer.", overnight: "Clouds Mountain Gorilla Lodge", meals: "B/L/D" },
      { day: "12", title: "Fly to Entebbe", text: "Return flight to Entebbe and assisted check-in for your international departure.", overnight: "End of tour", meals: "B/L" }
    ],
    included: ["Two gorilla permits ($1,600) and one chimp permit ($250)", "11 nights luxury accommodation, all meals", "Most drinks at Giraffe Manor, Il Moran and Clouds", "All domestic and regional flights", "Private guiding and vehicles", "Park and conservancy fees", "24/7 Brooks host"],
    excluded: ["International flights", "Kenya eTA and Uganda visa", "Balloon safari", "Tips and porters", "Travel insurance"],
    offer: false
  },
  {
    slug: "rwanda-uganda-gorilla-combo-9d",
    title: "Rwanda & Uganda Primate Combo",
    days: 9, nights: 8,
    countries: ["rwanda", "uganda"],
    experiences: ["gorillas", "chimps", "hiking", "birding", "culture"],
    style: "Mid-range",
    priceFrom: 4650,
    oldPrice: 5150,
    badge: "Two countries",
    image: "nyungwe",
    gallery: ["nyungwe", "lake-kivu", "golden-monkey", "gorilla-family", "bunyonyi"],
    summary: "Chimps and the canopy walkway in Nyungwe, the shores of Lake Kivu, golden monkeys in the Virungas, then cross into Uganda for a Bwindi gorilla trek at Uganda's lower permit price.",
    highlights: [
      "Chimpanzee tracking in Nyungwe Forest ($150 permit included)",
      "Nyungwe canopy walkway, 50 metres above the forest floor",
      "Lazy afternoon on the beaches of Lake Kivu at Kibuye",
      "Golden monkey trek in Volcanoes National Park",
      "Gorilla trek in Bwindi's Rushaga sector (Uganda permit $800 included)",
      "Lake Bunyonyi island canoe trip"
    ],
    bestMonths: "Jun–Sep and Dec–Feb (drier); treks run all year",
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    groupSize: "Private, 2–8",
    itinerary: [
      { day: "1", title: "Arrive Kigali", text: "Welcome to Rwanda. Afternoon Kigali tour and a visit to the Genocide Memorial.", overnight: "Heaven Boutique Hotel", meals: "D" },
      { day: "2", title: "Drive to Nyungwe", text: "Drive south via the King's Palace Museum in Nyanza to the misty montane forest of Nyungwe.", overnight: "One&Only Nyungwe House", meals: "B/L/D" },
      { day: "3", title: "Chimps and canopy walk", text: "Early chimp tracking in the Cyamudongo or Uwinka area, then the canopy walkway in the afternoon.", overnight: "One&Only Nyungwe House", meals: "B/L/D" },
      { day: "4", title: "Lake Kivu", text: "Follow the Congo Nile Trail road to Kibuye on Lake Kivu. Afternoon boat trip to Napoleon's Island.", overnight: "Cormoran Lodge", meals: "B/L/D" },
      { day: "5", title: "Musanze and the volcanoes", text: "Drive along the lake to Musanze in the shadow of the Virunga volcanoes.", overnight: "Mountain Gorilla View Lodge", meals: "B/L/D" },
      { day: "6", title: "Golden monkeys", text: "Morning golden monkey tracking, then cross the Cyanika border into Uganda and on to Rushaga.", overnight: "Rushaga Gorilla Camp", meals: "B/L/D" },
      { day: "7", title: "Gorilla trekking in Bwindi", text: "Trek one of Rushaga's habituated families — Uganda's permits cost about half of Rwanda's.", overnight: "Rushaga Gorilla Camp", meals: "B/L/D" },
      { day: "8", title: "Lake Bunyonyi", text: "Short drive to Lake Bunyonyi for a canoe trip among its terraced islands.", overnight: "Birdnest Resort Bunyonyi", meals: "B/L/D" },
      { day: "9", title: "Return to Kigali", text: "Drive back to Kigali via the Katuna border for your evening flight.", overnight: "End of tour", meals: "B/L" }
    ],
    included: ["Uganda gorilla permit ($800)", "Nyungwe chimp permit ($150) and canopy walk", "Golden monkey permit ($100)", "8 nights accommodation, full board on safari", "Private 4x4 vehicle and driver-guide", "Lake Kivu boat trip", "Park fees and airport transfers"],
    excluded: ["International flights", "East Africa Tourist Visa ($100, covers both countries)", "Tips and porters", "Travel insurance", "Drinks"],
    offer: true,
    offerNote: "Early-bird saving of $500 per person for June–September 2027 departures confirmed with a deposit before 31 December 2026.",
    offerValid: "2026-12-31"
  },
  {
    slug: "tanzania-zanzibar-honeymoon-12d",
    title: "Serengeti & Zanzibar Honeymoon",
    days: 12, nights: 11,
    countries: ["tanzania", "zanzibar"],
    experiences: ["big-five", "migration", "beach", "culture"],
    style: "Luxury",
    priceFrom: 8950,
    oldPrice: 9850,
    badge: "Honeymoon",
    image: "zanzibar",
    gallery: ["zanzibar", "serengeti", "balloon", "ngorongoro", "sunset-acacia"],
    summary: "Seven nights of private safari in Tarangire, the Serengeti and Ngorongoro, then fly to Zanzibar for Stone Town's spice-scented lanes and five barefoot days on the Indian Ocean.",
    highlights: [
      "Private safari with romantic touches: bush dinners, starbed nights and balloon flight",
      "Ngorongoro Crater game drive from a lodge on the rim",
      "Three nights in the Serengeti following the migration",
      "Stone Town walking tour and sunset dhow cruise",
      "Five nights at a beachfront villa on Zanzibar's east coast",
      "Honeymoon gifts and room upgrades where available"
    ],
    bestMonths: "Jun–Oct and late Dec–Feb (avoid the long rains in April–May)",
    months: [1, 2, 6, 7, 8, 9, 10, 12],
    groupSize: "Private, 2–8",
    itinerary: [
      { day: "1", title: "Arrive Arusha", text: "Welcome to Tanzania and transfer to a peaceful coffee estate.", overnight: "Arusha Coffee Lodge", meals: "D" },
      { day: "2", title: "Tarangire", text: "Afternoon game drive among baobabs and elephants, with a private sundowner.", overnight: "Tarangire Treetops", meals: "B/L/D" },
      { day: "3", title: "To the Ngorongoro rim", text: "Drive to the highlands for a crater-view dinner.", overnight: "The Highlands Ngorongoro", meals: "B/L/D" },
      { day: "4", title: "Ngorongoro Crater", text: "Dawn descent to the crater floor for a full day of game viewing.", overnight: "The Highlands Ngorongoro", meals: "B/L/D" },
      { day: "5", title: "Into the Serengeti", text: "Drive via Olduvai Gorge into the Serengeti.", overnight: "Four Seasons Safari Lodge Serengeti", meals: "B/L/D" },
      { day: "6", title: "Balloon safari", text: "Sunrise balloon flight and champagne breakfast in the bush.", overnight: "Four Seasons Safari Lodge Serengeti", meals: "B/L/D" },
      { day: "7", title: "Serengeti", text: "Full day following the herds and big cats, ending with a private bush dinner.", overnight: "Four Seasons Safari Lodge Serengeti", meals: "B/L/D" },
      { day: "8", title: "Fly to Zanzibar", text: "Fly from Seronera to Zanzibar. Sunset dhow cruise from Stone Town.", overnight: "Emerson Spice Hotel", meals: "B/D" },
      { day: "9", title: "Stone Town and spices", text: "Guided walk through Stone Town's UNESCO-listed lanes and a spice farm tour, then transfer to the east coast.", overnight: "Zuri Zanzibar", meals: "B/D" },
      { day: "10", title: "Beach days", text: "Free days to snorkel Mnemba Atoll, visit Jozani Forest's red colobus or simply relax.", overnight: "Zuri Zanzibar", meals: "B/D" },
      { day: "11", title: "Beach days", text: "Another day of sea, sun and spa treatments at your leisure.", overnight: "Zuri Zanzibar", meals: "B/D" },
      { day: "12", title: "Depart Zanzibar", text: "Transfer to Abeid Amani Karume International Airport for your flight home.", overnight: "End of tour", meals: "B" }
    ],
    included: ["Private safari vehicle and guide", "Balloon safari with champagne breakfast", "Arusha–Serengeti–Zanzibar flights", "11 nights accommodation (full board on safari, half board in Zanzibar)", "Sunset dhow cruise and Stone Town tour", "Park fees, crater fee and transfers", "Honeymoon touches"],
    excluded: ["International flights", "Tanzania visa", "Zanzibar infrastructure tax ($5 per night) and mandatory travel insurance ($44)", "Tips", "Drinks in Zanzibar"],
    offer: true,
    offerNote: "Honeymooners save $900 per person on this 12-night journey, plus a complimentary couples' massage in Zanzibar.",
    offerValid: "2027-06-30"
  },
  {
    slug: "kidepo-murchison-explorer-9d",
    title: "Kidepo & Murchison Explorer",
    days: 9, nights: 8,
    countries: ["uganda"],
    experiences: ["big-five", "birding", "culture"],
    style: "Mid-range",
    priceFrom: 4250,
    badge: "Off the beaten track",
    image: "kidepo",
    gallery: ["kidepo", "murchison", "rhino", "buffalo", "shoebill"],
    summary: "Uganda's wild north: rhinos at Ziwa, the Nile at Murchison Falls and the remote Narus Valley of Kidepo, where cheetah, ostrich and huge buffalo herds roam beneath rugged mountains.",
    highlights: [
      "Kidepo Valley, ranked among Africa's finest true wilderness parks",
      "Lion, cheetah and buffalo herds of more than 1,000 in the Narus Valley",
      "Visit to a Karamojong manyatta with community guides",
      "Murchison Falls by boat and on foot",
      "Rhino tracking on foot at Ziwa Rhino Sanctuary",
      "Shoebill boat trip in the Nile delta"
    ],
    bestMonths: "Sep–Mar when Kidepo's grass is short and game gathers near water",
    months: [1, 2, 3, 9, 10, 11, 12],
    groupSize: "Private, 2–8",
    itinerary: [
      { day: "1", title: "Entebbe to Ziwa", text: "Drive north to Ziwa Rhino Sanctuary for an afternoon rhino walk.", overnight: "Amuka Safari Lodge", meals: "L/D" },
      { day: "2", title: "Murchison Falls National Park", text: "Continue to Murchison, visiting the Top of the Falls on the way in.", overnight: "Paraa Safari Lodge", meals: "B/L/D" },
      { day: "3", title: "Game drive and Nile cruise", text: "Morning game drive on the northern bank, afternoon launch to the falls.", overnight: "Paraa Safari Lodge", meals: "B/L/D" },
      { day: "4", title: "Shoebill and the delta", text: "Early boat trip to the Nile delta in search of the prehistoric shoebill.", overnight: "Paraa Safari Lodge", meals: "B/L/D" },
      { day: "5", title: "Drive to Kidepo via Gulu", text: "A long but rewarding drive through Gulu and Kitgum into Kidepo Valley National Park.", overnight: "Apoka Safari Lodge", meals: "B/L/D" },
      { day: "6", title: "Narus Valley", text: "Morning and evening game drives in the Narus Valley.", overnight: "Apoka Safari Lodge", meals: "B/L/D" },
      { day: "7", title: "Kidepo and the Karamojong", text: "Guided walk with rangers and a visit to a Karamojong homestead.", overnight: "Apoka Safari Lodge", meals: "B/L/D" },
      { day: "8", title: "Kidepo Valley and Kanangorok", text: "Drive to the Kidepo Valley and Kanangorok hot springs on the South Sudan border.", overnight: "Apoka Safari Lodge", meals: "B/L/D" },
      { day: "9", title: "Fly to Entebbe", text: "Scheduled AeroLink flight from Apoka airstrip back to Entebbe.", overnight: "End of tour", meals: "B" }
    ],
    included: ["Ziwa rhino tracking", "8 nights accommodation, full board", "Private 4x4 Land Cruiser and driver-guide", "Nile launch and shoebill boat trip", "Karamojong cultural visit", "Kidepo–Entebbe flight", "Park fees"],
    excluded: ["International flights", "Uganda visa ($50)", "Tips", "Travel insurance", "Drinks"],
    offer: false
  }
];

/* Shared helpers for any page that renders tours (cards on home, tours, offers, tour pages). */
window.BROOKS_COUNTRY_NAMES = { uganda: "Uganda", rwanda: "Rwanda", kenya: "Kenya", tanzania: "Tanzania", zanzibar: "Zanzibar" };
window.BROOKS_EXPERIENCE_NAMES = { gorillas: "Gorilla trekking", chimps: "Chimpanzees", "big-five": "Big Five", migration: "Great Migration", birding: "Birding", beach: "Beach", hiking: "Hiking", culture: "Culture" };
window.brooksMoney = function (n) { return "$" + Number(n).toLocaleString("en-US"); };
window.brooksEsc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
window.brooksTourCard = function (t) {
  var esc = window.brooksEsc, href = "tour.html?t=" + encodeURIComponent(t.slug);
  var countries = t.countries.map(function (c) { return window.BROOKS_COUNTRY_NAMES[c] || c; }).join(" · ");
  var price = t.oldPrice
    ? 'From <s>' + window.brooksMoney(t.oldPrice) + '</s> <strong>' + window.brooksMoney(t.priceFrom) + '</strong> pp'
    : 'From <strong>' + window.brooksMoney(t.priceFrom) + '</strong> pp';
  return '<article class="tour-card"><a href="' + href + '" class="tour-card__media">' +
    '<img src="assets/img/' + t.image + '-sm.webp" alt="' + esc(t.title) + '" width="720" height="480" loading="lazy">' +
    (t.badge ? '<span class="badge">' + esc(t.badge) + '</span>' : '') + '</a>' +
    '<div class="tour-card__body"><div class="tour-card__meta"><span>' + t.days + ' Days</span><span>' + countries + '</span></div>' +
    '<h3><a href="' + href + '">' + esc(t.title) + '</a></h3><p>' + esc(t.summary) + '</p>' +
    '<div class="tour-card__foot"><span class="price">' + price + '</span><a class="link-arrow" href="' + href + '">View trip →</a></div></div></article>';
};

/* Inline --hero:url('assets/img/..') is resolved relative to style.css when used inside .page-hero::after,
   so rewrite it to an absolute URL (works on file:// and GitHub Pages). */
window.brooksFixHeroes = function (root) {
  (root || document).querySelectorAll('[style*="--hero"]').forEach(function (el) {
    var m = /url\(['"]?([^'")]+)['"]?\)/.exec(el.style.getPropertyValue("--hero"));
    if (m && !/^(https?:|file:|data:)/.test(m[1])) el.style.setProperty("--hero", 'url("' + new URL(m[1], document.baseURI).href + '")');
  });
};
window.brooksFixHeroes();
