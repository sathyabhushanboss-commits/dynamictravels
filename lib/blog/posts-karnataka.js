// Blog posts (part 1). Rendered by app/blog. Images: `img` is a path without
// extension — the page loads `${img}.webp` and `${img}-sm.webp`.

const D = '/images/destinations';
const B = '/images/blog';

export const postsKarnataka = [
  {
    slug: 'bangalore-to-mysore-road-trip-guide',
    place: 'Mysore',
    title: 'Mysore in a Day (or Two): Palaces, Jasmine and the Best Dosa of Your Life',
    excerpt:
      'Mysore rewards the traveller who slows down. Here is how to spend a day — or better, two — in the city of palaces, from the Chamundi steps to the Sunday night lights.',
    description:
      'A complete Bangalore to Mysore road trip guide: Mysore Palace timings and lights, Chamundi Hills, Devaraja Market, Srirangapatna, Brindavan Gardens and where to eat.',
    keywords: ['Bangalore to Mysore road trip', 'Mysore sightseeing', 'Mysore Palace lights', 'one day trip from Bangalore', 'Mysore cab from Bangalore'],
    date: '2026-06-14',
    hero: { img: `${D}/mysore`, alt: 'The front façade of Mysore Palace under a bright blue sky' },
    facts: { distance: '~145 km', drive: '2.5–3 hrs', best: 'Oct – Feb', stay: '1–2 days' },
    gallery: [
      { after: 3, img: `${B}/mysore-chamundi`, alt: 'Chamundeshwari Temple gopuram on Chamundi Hills', caption: 'The Chamundeshwari temple tower, reached by road or by roughly a thousand stone steps.' },
      { after: 7, img: `${B}/mysore-brindavan`, alt: 'Brindavan Gardens fountains lit in colour at night', caption: 'Brindavan Gardens after dark, when the fountains come alive.' },
    ],
    sections: [
      {
        h: 'Why Mysore deserves more than a rushed day trip',
        p: [
          'Most people treat Mysore as a tick-box: leave Bengaluru at dawn, walk through the palace, eat something sweet, drive back in the dark. It works, and if a day is all you have, go. But Mysore is a city that opens up slowly. The mornings are cooler than Bengaluru, the roads are wider, and there is a quietness to the old quarters that you only notice once you stop checking the time.',
          'If you can, give it a night. You get the palace in daylight and again when it is lit, an unhurried breakfast, and the hill temple before the crowds. That one extra night changes the whole trip from a sprint into something you will actually remember.',
        ],
      },
      {
        h: 'The drive: expressway, Srirangapatna and a coffee stop',
        p: [
          'The Bengaluru–Mysuru expressway has cut the drive to around two and a half hours on a clear morning. Leave before seven and you skip the city traffic entirely. The road is fast, so a driver who knows the exits and the toll lanes saves you more time than any shortcut.',
          'Just before Mysore, take the turn for Srirangapatna. Tipu Sultan’s summer palace, Daria Daulat Bagh, is a modest wooden building covered inside with painted murals, and the Ranganathaswamy temple sits on an island in the Kaveri. Forty-five minutes here is enough, and it breaks the journey nicely.',
        ],
      },
      {
        h: 'Mysore Palace by day: look up, then look closer',
        p: [
          'The palace you see today was completed in 1912 after the older wooden one burned down, and it shows the confidence of that era — Indo-Saracenic domes, stained glass from Glasgow, cast-iron pillars, mosaic floors. Take the audio guide. Without it, the rooms blur together; with it, the wedding hall and the Durbar Hall suddenly have stories.',
          'Go early, ideally when the gates open. By late morning the school groups arrive and you shuffle rather than walk. Footwear is left outside, so wear something easy to slip off, and keep your phone camera rules in mind — photography inside has been restricted in the past, so check at the counter.',
        ],
      },
      {
        h: 'Chamundi Hills: the thousand steps or the road',
        p: [
          'There are two ways up Chamundi Hills. The road takes twenty minutes. The steps take an hour or so, passing the great granite Nandi about two-thirds of the way up, and they are a lovely, slightly sweaty ritual if you start before the sun gets strong. Many families climb up and take a cab down.',
          'At the top, the Chamundeshwari temple is busiest on Fridays and festival days. On a regular weekday morning you can walk around it calmly and look out over the whole city, with the palace domes catching the light below you.',
        ],
      },
      {
        h: 'Devaraja Market and the smell of Mysore',
        p: [
          'If the palace is Mysore’s face, Devaraja Market is its heartbeat. Pyramids of kumkum and turmeric, bananas of a dozen kinds, betel leaves stacked like books, and above all the jasmine — Mysore mallige, sold by the arm’s length and threaded while you watch.',
          'Go in the late morning when the flower stalls are at their fullest. Vendors are used to visitors photographing their stalls, but asking first earns you a smile and, often, a free sprig of jasmine. It is the best few minutes you will spend in the city.',
        ],
      },
      {
        h: 'What to eat: Mylari dosa, Mysore pak and a proper meals plate',
        p: [
          'Mysore food is honest and buttery. The soft, spongy Mylari-style dosa — served with a dollop of white butter and a thin chutney — is the breakfast people drive from Bengaluru for. Expect a short queue on weekends; it moves fast.',
          'For lunch, find a traditional meals place and eat off a banana leaf. Finish with Mysore pak from one of the old sweet shops around the palace. The original is dense and grainy, closer to fudge than the soft versions you get elsewhere. Buy an extra box. You will regret it otherwise.',
        ],
      },
      {
        h: 'Silk and sandalwood: shopping that’s worth the bag space',
        p: [
          'Mysore silk is the real thing here — pure, with zari woven in — and the government-run silk factory and showroom are the safest places to buy without second-guessing prices. Even if you are not buying, watching the looms is fascinating.',
          'Sandalwood is the other Mysore signature: soap, oil, incense and small carvings. Stick to government emporiums for genuine sandalwood, because the market is full of convincing imitations.',
        ],
      },
      {
        h: 'Brindavan Gardens at sunset',
        p: [
          'About twenty kilometres out, below the Krishna Raja Sagara dam, the Brindavan Gardens are terraced lawns and fountains that look their best in the evening, when the musical fountain show begins and the whole place is lit in colour.',
          'It is unashamedly old-fashioned and that is the charm. Time it with the show, keep a light jacket for the breeze off the reservoir, and agree with your driver on a pickup point, because the car park gets chaotic once the show ends.',
        ],
      },
      {
        h: 'The Sunday night palace lights — and Dasara',
        p: [
          'On Sunday evenings and public holidays, the palace is lit with close to a hundred thousand bulbs for a short window after seven. Seeing it switch on is genuinely moving, even for people who think they have seen it in photos. Check the current schedule before you plan around it.',
          'During Dasara, usually in October, the whole city is lit every night and the Jamboo Savari procession fills the streets on Vijayadashami. It is spectacular and very crowded. Book your stay and your cab well ahead if you want to be there.',
        ],
      },
      {
        h: 'Planning your Mysore trip: a simple itinerary',
        p: [
          'Day one: leave Bengaluru by seven, Srirangapatna by nine, palace by eleven, lunch, Devaraja Market, and Brindavan Gardens in the evening. Day two: Chamundi Hills at sunrise, breakfast, silk shopping, and an easy drive home before the evening traffic.',
          'A chauffeur-driven car makes this relaxed rather than rushed — no parking hunts near the palace, no navigating the market lanes. An Innova Crysta suits families; a sedan is perfect for two. Either way, you get to look out of the window instead of at the road.',
        ],
        tips: ['Leave Bengaluru before 7 AM', 'Palace early, market late morning', 'Carry a light jacket for Brindavan', 'Check palace light timings before Sunday'],
      },
    ],
  },

  {
    slug: 'coorg-travel-guide-from-bangalore',
    place: 'Coorg',
    title: 'Coorg Slowly: Coffee Mornings, Misty Hills and the Kitchen of the Kodavas',
    excerpt:
      'Coorg is not a checklist destination. It is coffee on a homestay verandah, a waterfall after rain and the best pandi curry you will ever eat. Here is how to do it right.',
    description:
      'Coorg travel guide from Bangalore: best time to visit, Madikeri, Raja’s Seat, Abbey Falls, Dubare elephant camp, Namdroling Monastery, Kodava food and homestays.',
    keywords: ['Coorg trip from Bangalore', 'Coorg tourist places', 'Madikeri sightseeing', 'Coorg homestay', 'Bangalore to Coorg cab'],
    date: '2026-07-02',
    hero: { img: `${D}/coorg`, alt: 'Abbey Falls in Coorg tumbling through green forest' },
    facts: { distance: '~260 km', drive: '5.5–6 hrs', best: 'Oct – Mar (green in monsoon)', stay: '2–3 days' },
    gallery: [
      { after: 3, img: `${B}/coorg-namdroling`, alt: 'Namdroling Monastery golden temple at Bylakuppe', caption: 'Namdroling Monastery at Bylakuppe, an easy stop on the way into Coorg.' },
      { after: 6, img: `${B}/coorg-dubare`, alt: 'An elephant walking at Dubare elephant camp', caption: 'Morning at Dubare, on the banks of the Kaveri.' },
    ],
    sections: [
      {
        h: 'What makes Coorg feel different',
        p: [
          'Coorg — Kodagu, to the people who live there — is not just hill country. It has its own language, its own martial traditions, its own food and a fierce pride in all three. The land is mostly coffee, grown under tall shade trees with pepper vines climbing them, so even the plantations feel like forest.',
          'The secret is to stay somewhere small. A homestay on a working estate, with a family who cooks for you, will tell you more about Coorg in one dinner than any sightseeing list.',
        ],
      },
      {
        h: 'Getting there: the drive and the best stops',
        p: [
          'Coorg is about five and a half to six hours from Bengaluru, through Mysore or via the Hunsur road towards Kushalnagar. Leave early, have breakfast on the highway, and you will be in coffee country by lunch.',
          'The last hour is the best part — the road narrows, the air cools, and the first glossy coffee bushes appear. A driver familiar with these ghat roads matters, especially after rain, when the bends are slick and visibility drops fast.',
        ],
      },
      {
        h: 'Namdroling Monastery at Bylakuppe',
        p: [
          'Just before Kushalnagar is Bylakuppe, one of the largest Tibetan settlements in India. Namdroling Monastery, often called the Golden Temple, houses three enormous gilded statues, and the prayer hall is a riot of colour and murals.',
          'Visit in the afternoon if you can, when the young monks often gather for prayers and the whole hall hums with chanting. Dress modestly, walk clockwise and pick up some momos at one of the small cafés outside.',
        ],
      },
      {
        h: 'Madikeri, Raja’s Seat and the evening light',
        p: [
          'Madikeri is Coorg’s small, hilly capital. It is not pretty in the postcard sense, but the old fort and the Omkareshwara temple are worth a quiet hour.',
          'Raja’s Seat is where the Kodava kings are said to have watched the sun go down, and it is still the place to be at dusk. The valley drops away beneath you in layers of blue, and on misty days the clouds roll through the garden itself.',
        ],
      },
      {
        h: 'Abbey Falls and the waterfall season',
        p: [
          'Abbey Falls is a short drive from Madikeri, down a lane through coffee and cardamom to a hanging bridge facing the falls. It is at its most dramatic just after the monsoon, roughly August to October, when the water roars.',
          'The steps down are steep and can be slippery, so wear shoes with grip. In peak monsoon some viewpoints close for safety — check locally rather than being disappointed at the gate.',
        ],
      },
      {
        h: 'Dubare elephant camp on the Kaveri',
        p: [
          'At Dubare, the forest department’s elephants are brought down to the river in the morning to be bathed and fed. You cross the Kaveri by boat, and the gentle routine of the mahouts and their elephants is lovely to watch.',
          'Get there early — the elephant activities happen in the morning and the camp gets busy quickly. In the monsoon, when the river runs high, crossings can be suspended, so ask your homestay before you set off.',
        ],
      },
      {
        h: 'Talacauvery and Bhagamandala: where the Kaveri begins',
        p: [
          'High in the Brahmagiri hills, Talacauvery is the source of the Kaveri — a small tank and shrine at the top of a long flight of steps, with sweeping views across the Western Ghats.',
          'On the way down, stop at Bhagamandala, where three rivers meet at the Triveni Sangama and the temple has a striking Kerala-style roof. It is a calm, spiritual drive, best done in the morning before the mist rises.',
        ],
      },
      {
        h: 'Coffee estates and homestays: the real Coorg',
        p: [
          'Ask your homestay host for an estate walk. You learn to tell arabica from robusta, see pepper being picked off the shade trees, and understand why Coorg coffee tastes the way it does. Many estates sell beans roasted that week — the best souvenir you can bring home.',
          'Homestays range from simple family rooms to restored estate bungalows. Book directly when you can, and mention any food preferences early, because most meals are cooked fresh for the guests.',
        ],
      },
      {
        h: 'Eating like a Kodava',
        p: [
          'Kodava food is its own world. Pandi curry — pork cooked dark and tangy with kachampuli, a black vinegar made from a local fruit — is the dish people talk about. Eat it with kadambuttu, soft steamed rice balls, or akki otti, thin rice rotis.',
          'Vegetarians are well looked after too: bamboo shoot curry in season, mushroom dishes, and fresh greens from the estate. And there is always coffee, strong and sweet.',
        ],
      },
      {
        h: 'Best time to visit and how to plan',
        p: [
          'October to March brings clear, cool days and comfortable walks. The monsoon, from June to September, turns Coorg intensely green and misty, but brings leeches, slippery roads and the occasional landslide. Both seasons are beautiful in their own way; plan accordingly.',
          'Two nights is the sweet spot: Bylakuppe and Raja’s Seat on day one, falls and Dubare on day two, Talacauvery on the way home. With a chauffeured car, the winding roads become part of the pleasure rather than a chore.',
        ],
        tips: ['Stay at an estate homestay', 'Dubare early in the morning', 'Raja’s Seat at sunset', 'Pack leech socks in monsoon'],
      },
    ],
  },

  {
    slug: 'chikmagalur-coffee-trail-guide',
    place: 'Chikmagalur',
    title: 'Chikmagalur: Seven Beans, the Highest Peak in Karnataka and a Lot of Good Coffee',
    excerpt:
      'Indian coffee began on a hill here. Today Chikmagalur is all mist, estate bungalows and winding roads to the top of Karnataka. A guide to doing it properly.',
    description:
      'Chikmagalur travel guide from Bangalore: Mullayanagiri, Baba Budangiri, Hebbe Falls, Kemmangundi, coffee estate stays, best time to visit and a 2-day itinerary.',
    keywords: ['Chikmagalur trip from Bangalore', 'Mullayanagiri trek', 'Chikmagalur tourist places', 'coffee estate stay Karnataka', 'Bangalore to Chikmagalur cab'],
    date: '2026-07-21',
    hero: { img: `${D}/chikmagalur`, alt: 'Green slopes of Baba Budangiri covered in mist' },
    facts: { distance: '~245 km', drive: '5 hrs', best: 'Sep – Feb', stay: '2 days' },
    gallery: [
      { after: 3, img: `${B}/chikmagalur-mullayanagiri`, alt: 'Western Ghats seen from Mullayanagiri', caption: 'The view from Mullayanagiri, the highest point in Karnataka.' },
      { after: 6, img: `${B}/chikmagalur-hebbe`, alt: 'Hebbe Falls dropping through thick forest', caption: 'Hebbe Falls, reached by jeep through the estates near Kemmangundi.' },
    ],
    sections: [
      {
        h: 'The town where Indian coffee began',
        p: [
          'The story goes that in the seventeenth century a Sufi saint, Baba Budan, returned from pilgrimage with seven coffee beans hidden in his robes — exporting them from Yemen was forbidden — and planted them in the hills above Chikmagalur. Whether every detail is true hardly matters. Those hills still carry his name, and the coffee never left.',
          'That history is everywhere here: in the estates that line every road, in the smell of roasting beans in town, and in the pride with which locals will tell you their coffee is the best in India.',
        ],
      },
      {
        h: 'The drive from Bengaluru',
        p: [
          'It is roughly five hours via Hassan. The highway is easy until Hassan; after that the land begins to rise and fold, and the first estates appear with their silver oaks and pepper vines.',
          'Make a short stop at Belur on the way — it is only about twenty-five kilometres from Chikmagalur and its Hoysala temple is one of the finest in the country. It turns a simple drive into a day with a story.',
        ],
      },
      {
        h: 'Mullayanagiri: on top of Karnataka',
        p: [
          'At about 1,930 metres, Mullayanagiri is the highest peak in the state. A narrow road climbs most of the way up, then a stretch of stone steps leads to a small temple at the summit. On a clear morning the Western Ghats unfold in every direction.',
          'Go early. Mist often rolls in by late morning and the views vanish. The road is single-lane in places with steep drops, so this is exactly where an experienced hill driver earns their keep. On weekends, local authorities sometimes regulate vehicle numbers — check before you go.',
        ],
      },
      {
        h: 'Baba Budangiri and the shrine on the hill',
        p: [
          'The range across from Mullayanagiri is Baba Budangiri, where the saint’s cave shrine is revered by both Hindus and Muslims. The drive along the ridge is spectacular, with grassland and shola forest falling away on both sides.',
          'In the monsoon these hills are wrapped in cloud and dotted with small waterfalls. In winter, the grass turns gold and the views stretch to the horizon. Either way, it is one of the most beautiful drives in Karnataka.',
        ],
      },
      {
        h: 'Kemmangundi and Hebbe Falls',
        p: [
          'Kemmangundi is an old hill station — the Wodeyar kings came here for the summer — with a formal garden and a famous sunset point. It feels pleasantly frozen in time.',
          'From near Kemmangundi, jeeps run through private coffee estates to Hebbe Falls, the last stretch on foot through the forest. The falls drop in two stages into a cold, clear pool. It is the most rewarding detour in the region, especially after the rains.',
        ],
      },
      {
        h: 'Jhari Falls and the buttermilk water',
        p: [
          'Jhari, also called Buttermilk Falls for the milky white of the water, is reached by a bumpy jeep ride through estates near the Baba Budangiri road. It is smaller than Hebbe but wonderfully atmospheric.',
          'The jeep tracks are rough and not suitable for regular cars. Leave your vehicle at the starting point and let the local jeep drivers, who know every rut, take over.',
        ],
      },
      {
        h: 'Staying on a coffee estate',
        p: [
          'This is the real reason to come. Estate stays range from simple cottages to grand colonial bungalows with verandahs, fireplaces and home-cooked Malnad food. Waking up to mist over the coffee and a pot brewed from beans grown a few metres away is a very particular kind of happiness.',
          'Most estates offer plantation walks. Take one. You see how coffee is grown, picked, dried and processed, and you never look at a cup the same way again.',
        ],
      },
      {
        h: 'Malnad food and where to eat',
        p: [
          'The cuisine of this hill region is understated and comforting: akki rotti with chutney, kadubu, bamboo shoot in season, and generous meals with sambar, palya and plenty of rice. Non-vegetarians should try the local chicken and pork preparations, often cooked with fresh pepper.',
          'Town has a few dependable vegetarian restaurants for breakfast. But honestly, the best meals here are the ones cooked by your estate hosts.',
        ],
      },
      {
        h: 'When to go',
        p: [
          'September to February is ideal — the monsoon has washed everything green, waterfalls are full, and the air is cool. December and January bring crisp mornings and clear views from the peaks.',
          'The monsoon months are stunning but wet; some trekking trails and viewpoints close for safety. Summers are pleasant compared with the plains but hazier.',
        ],
      },
      {
        h: 'A relaxed two-day Chikmagalur plan',
        p: [
          'Day one: leave Bengaluru early, stop at Belur, check in to your estate by lunch, and take a plantation walk in the afternoon. Day two: Mullayanagiri at sunrise, the Baba Budangiri ridge, Jhari Falls by jeep, and an easy evening.',
          'If you have a third day, add Kemmangundi and Hebbe Falls. With a chauffeur handling the hairpins, you are free to enjoy the views — and the coffee — without watching the road.',
        ],
        tips: ['Climb Mullayanagiri before 8 AM', 'Use local jeeps for Hebbe and Jhari', 'Buy fresh beans from your estate', 'Pair the trip with Belur'],
      },
    ],
  },

  {
    slug: 'hampi-travel-guide-ruins-and-boulders',
    place: 'Hampi',
    title: 'Hampi: Walking Through the Ruins of an Empire That Once Dazzled the World',
    excerpt:
      'A boulder-strewn landscape, a living temple and the remains of one of the richest cities of its age. How to see Hampi with time, curiosity and comfortable shoes.',
    description:
      'Hampi travel guide from Bangalore: Virupaksha Temple, Vittala Temple stone chariot, Hemakuta Hill sunset, Matanga Hill sunrise, coracle rides, best time and a 2-day itinerary.',
    keywords: ['Hampi trip from Bangalore', 'Hampi tourist places', 'Vittala temple stone chariot', 'Hampi itinerary 2 days', 'Bangalore to Hampi cab'],
    date: '2026-08-09',
    hero: { img: `${D}/hampi`, alt: 'Temples and ruins of Hampi among granite boulders' },
    facts: { distance: '~340 km', drive: '6–7 hrs', best: 'Oct – Feb', stay: '2–3 days' },
    gallery: [
      { after: 2, img: `${B}/hampi-virupaksha`, alt: 'Virupaksha Temple seen from Hemakuta Hill', caption: 'The Virupaksha tower from Hemakuta Hill, the classic sunset spot.' },
      { after: 4, img: `${B}/hampi-chariot`, alt: 'The stone chariot at Vittala Temple', caption: 'The stone chariot at Vittala Temple — Hampi’s most famous image.' },
    ],
    sections: [
      {
        h: 'An empire written in stone',
        p: [
          'Five centuries ago, Hampi was Vijayanagara — the capital of an empire whose markets were described by foreign visitors as rivalling Rome. Traders sold horses, silks and precious stones in its bazaars. Then, after the Battle of Talikota in 1565, the city was sacked and slowly abandoned.',
          'What remains is extraordinary: over a thousand monuments scattered across a landscape of giant, rounded granite boulders, all of it a UNESCO World Heritage Site. You do not visit Hampi so much as wander into it.',
        ],
      },
      {
        h: 'The road to Hampi',
        p: [
          'The drive from Bengaluru takes six to seven hours via Chitradurga and Hosapete. Chitradurga’s hilltop fort makes a fine stop to stretch your legs — its walls snake across the rocks in a way that hints at what is to come.',
          'Most visitors stay in Hosapete or in Kamalapura, close to the royal centre. Arrive by early afternoon and you still have time for Hemakuta Hill at sunset on day one.',
        ],
      },
      {
        h: 'Virupaksha Temple: the heart that never stopped beating',
        p: [
          'Unlike much of Hampi, the Virupaksha Temple has been in worship continuously for centuries. Its tall gopuram dominates the village, and inside, the rhythm of prayer, bells and offerings feels unbroken by history.',
          'Look for the small chamber where a pinhole effect projects an inverted image of the gopuram onto the wall — a quiet marvel most people walk straight past. Ask a local guide to show you.',
        ],
      },
      {
        h: 'Hemakuta Hill at sunset',
        p: [
          'Right beside the Virupaksha temple, Hemakuta Hill is a smooth granite slope covered in small early temples. Climb it in the late afternoon, find a spot facing west, and watch the boulders turn orange, then pink, then grey.',
          'It is one of those places where people fall silent without being asked. Carry water and leave well before dark, since the rock surface is uneven.',
        ],
      },
      {
        h: 'Vittala Temple and the stone chariot',
        p: [
          'The Vittala complex is the high point of Hampi’s art. The stone chariot in its courtyard — the one on the back of India’s fifty-rupee note — is even more impressive in person, its carved wheels once able to turn.',
          'The temple’s famous musical pillars produce notes when struck, but visitors are no longer allowed to tap them, to protect the stone. Get there when it opens; the carvings glow in the soft morning light and the crowds are thin.',
        ],
      },
      {
        h: 'The royal centre: Lotus Mahal, elephant stables and the Queen’s Bath',
        p: [
          'The royal enclosure shows a different side of Vijayanagara — palaces, pavilions and water tanks built with real engineering skill. The Lotus Mahal, with its arches and Indo-Islamic touches, is elegant; the elephant stables, a long row of domed chambers, are vast.',
          'Do not miss the Hazara Rama temple, whose walls carry long friezes of the Ramayana in relief. It is easy to spend an hour just following the story around the outer walls.',
        ],
      },
      {
        h: 'Matanga Hill at sunrise',
        p: [
          'For the best view of Hampi, climb Matanga Hill before dawn. As the sun rises, temple towers emerge one by one from the morning haze, with the Tungabhadra glinting among the boulders.',
          'The climb takes about thirty to forty minutes and involves some scrambling. Go with a local guide or in a group, carry a torch, and wear proper shoes.',
        ],
      },
      {
        h: 'Coracles on the Tungabhadra',
        p: [
          'Round coracles — woven baskets sealed with tar — still ferry people along the Tungabhadra. A gentle ride past the riverside shrines and boulders is a peaceful way to see Hampi from a different angle.',
          'Rides depend on water levels and are often suspended when the river is high after heavy rain. Agree the price and duration before you set off.',
        ],
      },
      {
        h: 'How to get around and when to visit',
        p: [
          'Hampi is spread out over many square kilometres. Many visitors combine a car for the longer hops with bicycles or e-bikes in the core area. Hiring a registered guide for the first day makes a huge difference — the stones come alive when someone tells you who built them and why.',
          'October to February is the best season. Summer days are fiercely hot on the rocks; if you travel then, start at dawn, rest at midday and return in the late afternoon. Hampi Utsav, usually held in the cooler months, brings music and dance to the ruins.',
        ],
      },
      {
        h: 'A two-day Hampi itinerary',
        p: [
          'Day one: drive in, Virupaksha Temple, Hemakuta Hill for sunset. Day two: Matanga Hill at sunrise, Vittala Temple at opening, the royal centre and Hazara Rama in the afternoon, and a coracle ride if the river allows.',
          'With a third day, add the Tungabhadra dam, the Anegundi side across the river, or a slower day simply sitting among the boulders. Hampi rewards those who do not rush.',
        ],
        tips: ['Vittala Temple at opening time', 'Matanga sunrise with a guide', 'Carry water and a hat', 'Hire a registered guide on day one'],
      },
    ],
  },

  {
    slug: 'belur-halebidu-shravanabelagola-day-trip',
    place: 'Belur & Halebidu',
    title: 'Belur, Halebidu and Shravanabelagola: A Day With the Hoysala Sculptors',
    excerpt:
      'Temples carved like jewellery, a giant statue on a hilltop, and a UNESCO story that deserves to be better known. The perfect long day trip from Bengaluru.',
    description:
      'Belur Halebidu Shravanabelagola trip from Bangalore: Chennakeshava Temple, Hoysaleswara Temple, Gommateshwara statue, UNESCO Hoysala temples, timings and a one-day plan.',
    keywords: ['Belur Halebidu trip from Bangalore', 'Hoysala temples UNESCO', 'Shravanabelagola Gommateshwara', 'heritage day trip Karnataka', 'Bangalore to Belur cab'],
    date: '2026-08-27',
    hero: { img: `${D}/belur`, alt: 'Chennakeshava Temple complex at Belur under a blue sky' },
    facts: { distance: '~220 km', drive: '4–4.5 hrs', best: 'Oct – Mar', stay: '1 day or a night in Hassan' },
    gallery: [
      { after: 4, img: `${D}/halebidu`, alt: 'Hoysaleswara Temple at Halebidu with lawns in front', caption: 'The Hoysaleswara Temple at Halebidu, carved in soft soapstone.' },
      { after: 7, img: `${D}/shravanabelagola`, alt: 'Gommateshwara statue at Shravanabelagola', caption: 'Gommateshwara at Shravanabelagola, carved from a single block of granite.' },
    ],
    sections: [
      {
        h: 'Why the Hoysala temples stop people in their tracks',
        p: [
          'Between the eleventh and fourteenth centuries, the Hoysala kings ruled much of present-day Karnataka and commissioned temples so intricately carved that they look more like ivory or sandalwood than stone. In 2023, Belur, Halebidu and Somanathapura were inscribed together on the UNESCO World Heritage List as the Sacred Ensembles of the Hoysalas.',
          'If you have only seen photographs, prepare to be surprised by the detail. Every bracket, pillar and wall frieze rewards a closer look.',
        ],
      },
      {
        h: 'Planning the route from Bengaluru',
        p: [
          'Belur is about four to four and a half hours away via Hassan, and Halebidu is just sixteen kilometres from Belur. Shravanabelagola sits on the way, about an hour before Hassan, so all three fit neatly into one long day.',
          'Leave by six. Shravanabelagola first, while the rock is still cool to climb, then Belur, lunch, and Halebidu in the afternoon light. You will be home late, tired and very happy.',
        ],
      },
      {
        h: 'Shravanabelagola: the climb to Gommateshwara',
        p: [
          'On top of Vindhyagiri hill stands Gommateshwara, also known as Bahubali — a fifty-seven-foot statue carved from a single block of granite more than a thousand years ago. It is one of the most important pilgrimage sites in Jainism and one of the largest monolithic statues in the world.',
          'The climb is over six hundred steps cut into the rock, done barefoot. Go early, before the stone heats up, carry socks if your feet are sensitive, and take your time. The view of the town and its temple tank from the top is lovely.',
        ],
      },
      {
        h: 'The Mahamastakabhisheka',
        p: [
          'Once every twelve years, the statue is anointed from head to toe with milk, saffron, sandalwood paste and flowers poured from a scaffold above — the Mahamastakabhisheka. The last one was in 2018, so the next is expected around 2030.',
          'Even on an ordinary day, the calm expression on Bahubali’s face and the vines carved climbing his legs, a sign of how long he stood in meditation, are unforgettable.',
        ],
      },
      {
        h: 'Chennakeshava Temple, Belur',
        p: [
          'King Vishnuvardhana consecrated the Chennakeshava Temple in 1117, and the work is said to have continued for about a century. The temple stands on a raised platform, its outer walls covered in friezes of elephants, lions, horsemen and scenes from the epics.',
          'Inside, the lathe-turned pillars are a wonder — each one different, some polished so smoothly they shine. The famous Narasimha pillar was once said to rotate on its base.',
        ],
      },
      {
        h: 'The madanikas: Belur’s celestial dancers',
        p: [
          'Look up at the brackets where the walls meet the roof. Here are the madanikas — graceful female figures caught mid-dance, playing instruments, or adorning themselves. The most famous, Darpana Sundari, gazes into a hand mirror.',
          'Their jewellery is carved so finely that some ornaments hang free of the stone. Hire one of the official guides at the gate; they point out details you would never find on your own.',
        ],
      },
      {
        h: 'Hoysaleswara Temple, Halebidu',
        p: [
          'Halebidu was once Dwarasamudra, the Hoysala capital, until it was raided in the fourteenth century — its name literally means “old city”. The Hoysaleswara Temple has twin shrines dedicated to Shiva, each facing a large Nandi pavilion.',
          'The outer walls are the real treasure: band after band of carving running around the entire temple — elephants, lions, scrolling vines, horsemen and dense mythological panels. Walk the full circuit slowly.',
        ],
      },
      {
        h: 'The stone that made it possible',
        p: [
          'The Hoysala sculptors worked in a soapstone known as chloritic schist, which is soft when freshly quarried and hardens over time. That is what allowed such delicate detail — and why it has survived nearly nine centuries.',
          'Notice how crisp the carving still is in the sheltered areas. The fine lines of fingers, beads and fabric folds are a reminder of the patience behind every panel.',
        ],
      },
      {
        h: 'Practical tips for temple visits',
        p: [
          'Wear clothing that covers shoulders and knees, and footwear you can slip off quickly; you will remove shoes at every temple. Carry water and a hat, since the courtyards are open to the sun.',
          'Weekdays are much quieter than weekends. Lunch options around Belur and Hassan are simple but good — a hot vegetarian meals plate will set you up for the afternoon.',
        ],
      },
      {
        h: 'A perfect one-day heritage plan',
        p: [
          'Leave Bengaluru at six, reach Shravanabelagola by half past eight and climb before nine. Belur by noon with a guide, lunch in town, Halebidu by three, and start back by five.',
          'It is a long day of driving, so a chauffeured car makes all the difference — you can rest between stops and enjoy the temples with full attention. If you prefer to slow down, stay the night in Hassan and add Somanathapura or Chikmagalur the next day.',
        ],
        tips: ['Start at 6 AM', 'Climb Shravanabelagola before the rock heats up', 'Hire an official guide at Belur', 'Dress for temple visits'],
      },
    ],
  },
];
