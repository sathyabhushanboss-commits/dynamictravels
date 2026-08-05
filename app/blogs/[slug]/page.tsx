// app/blogs/[slug]/page.tsx
import { Calendar, MapPin, Clock, User, ArrowLeft, Share2, Bookmark, Heart } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// This would come from your CMS/database in production
const blogPosts = [
  {
    id: '1',
    title: 'The Royal Heritage of Mysore: A Journey Through Palaces and Culture',
    slug: 'royal-heritage-mysore-palaces-culture',
    excerpt: 'Discover the majestic Mysore Palace, vibrant Dasara celebrations, and the rich cultural tapestry of Karnataka\'s royal city.',
    content: `Mysore, the cultural capital of Karnataka, stands as a testament to the grandeur of South Indian royalty. The city's crown jewel, the Mysore Palace, illuminates the night sky with its 100,000 light bulbs, creating a spectacle that draws visitors from across the globe. This architectural masterpiece blends Hindu, Muslim, Rajput, and Gothic styles, reflecting the cosmopolitan nature of the Wodeyar dynasty that ruled for over 500 years.

    Walking through the palace's ornate halls, you'll encounter stained glass ceilings, intricate ivory work, and chandeliers that transport you to an era of opulence. The Durbar Hall, with its gold-plated throne, still resonates with the echoes of royal ceremonies. Beyond the palace, Mysore offers a sensory journey through the vibrant Devaraja Market, where the air fills with the fragrance of jasmine and sandalwood.

    The city's most spectacular event, the Dasara festival, transforms Mysore into a carnival of lights, music, and dance. The 10-day celebration culminates in a grand procession featuring decorated elephants, traditional performers, and the golden howdah carrying the idol of Goddess Chamundeshwari. This UNESCO-recognized intangible heritage draws over a million visitors annually.

    For history enthusiasts, the Tipu Sultan Palace and Srirangapatna, the former capital of Hyder Ali and Tipu Sultan, provide fascinating glimpses into the region's military history. The Keshava Temple at Somanathapura, a masterpiece of Hoysala architecture, stands as a UNESCO World Heritage site showcasing intricate stone carvings that have survived eight centuries.

    Mysore's culinary scene deserves equal attention. The famous Mysore Masala Dosa, served with coconut chutney and sambar, is a breakfast ritual for locals and tourists alike. The city's sweet shops offer the legendary Mysore Pak, a gram flour-based sweet that melts in your mouth. Complete your Mysore experience with a visit to the Brindavan Gardens, where musical fountains dance to classical tunes under the moonlight.`,
    destination: 'Mysore',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&h=600&fit=crop',
    author: 'Sathyabhushan M N',
    date: 'August 6, 2026',
    readTime: '7 min read',
    tags: ['Heritage', 'Palaces', 'Culture', 'Karnataka']
  },
  {
    id: '2',
    title: 'Ooty: The Queen of Hill Stations - A Complete Travel Guide',
    slug: 'ooty-queen-hill-stations-travel-guide',
    excerpt: 'From the scenic Nilgiri Mountain Railway to the enchanting Botanical Gardens, explore the best of Ooty.',
    content: `Perched at an elevation of 2,240 meters in the Nilgiri Hills, Ooty (Udhagamandalam) has earned its title as the "Queen of Hill Stations" for good reason. The town's British colonial heritage is evident in its charming stone cottages, gothic churches, and the iconic Nilgiri Mountain Railway, a UNESCO World Heritage site that chugs through 108 kilometers of breathtaking mountain scenery.

    The journey to Ooty itself is an adventure. The mountain railway traverses 16 tunnels and 250 bridges, offering panoramic views of tea plantations, eucalyptus forests, and the dramatic Doddabetta Peak, the highest point in Tamil Nadu. The train's whistle echoes through valleys carpeted with wildflowers, creating a magical experience that has inspired poets and filmmakers for generations.

    Once in Ooty, the Government Botanical Gardens await with their collection of 650 species of plants, including a 20-million-year-old fossilized tree. The gardens burst into color during the annual flower show, attracting horticulturists from around the world. Nearby, the Ooty Lake offers boating opportunities against a backdrop of misty hills, while the Deer Park provides close encounters with the region's wildlife.

    The town's tea plantations produce some of India's finest brews. A visit to the Tea Factory reveals the fascinating process from leaf to cup, with opportunities to sample different grades of Nilgiri tea. The aroma of freshly processed tea leaves mingles with the crisp mountain air, creating an unforgettable sensory experience.

    For adventure seekers, Ooty offers trekking trails through the Mukurthi National Park, home to the endangered Nilgiri Tahr. The park's high-altitude grasslands provide a habitat for diverse wildlife, including elephants, gaurs, and the rare Nilgiri langur. The trek to the park's summit rewards visitors with panoramic views that extend to the Mysore plateau on clear days.

    Ooty's culinary landscape reflects its colonial past with a unique blend of British and South Indian flavors. The town's bakeries serve freshly baked breads and pastries alongside traditional vadas and dosas. The famous Ooty chocolates and homemade jams make perfect souvenirs, capturing the essence of this hill station's charm.`,
    destination: 'Ooty',
    image: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=1200&h=600&fit=crop',
    author: 'Sathyabhushan M N',
    date: 'August 5, 2026',
    readTime: '6 min read',
    tags: ['Hill Station', 'Nature', 'Tea Gardens', 'Tamil Nadu']
  },
  {
    id: '3',
    title: 'Coorg: Scotland of India - Coffee, Mist, and Adventure',
    slug: 'coorg-scotland-india-coffee-mist-adventure',
    excerpt: 'Immerse yourself in the aromatic coffee plantations, gushing waterfalls, and thrilling adventures of Coorg.',
    content: `Coorg, officially known as Kodagu, emerges from the Western Ghats like a green jewel, earning its moniker "Scotland of India" for its rolling hills, misty landscapes, and abundant rainfall. This district of Karnataka is India's largest coffee-producing region, with plantations that paint the hillsides in shades of green, punctuated by red coffee cherries during harvest season.

    The journey through Coorg reveals a landscape of stunning diversity. The Abbey Falls cascade through lush vegetation, their waters creating a symphony that harmonizes with the calls of hornbills and parakeets. The Raja's Seat, a simple pavilion overlooking a valley of mist, offers sunsets that transform the sky into a canvas of orange and purple, a spectacle that has inspired countless poets.

    Coorg's coffee estates offer immersive experiences that go beyond mere sightseeing. Visitors can participate in coffee-picking during the harvest season, learn about the roasting process, and sample different grades of Arabica and Robusta. The plantations, often centuries-old, are home to diverse flora and fauna, with wild orchids and ferns hanging from ancient trees like natural chandeliers.

    The region's martial history adds another layer of intrigue. The Madikeri Fort, built in the 17th century, stands as a testament to the region's warrior clans. The Omkareshwara Temple, with its blend of Islamic and Gothic architecture, reflects the cultural synthesis that characterizes Coorg's history. The nearby Raja's Tomb complex houses the graves of Kodava kings, their stories etched in stone.

    For adventure enthusiasts, Coorg offers opportunities for white-water rafting on the Barapole River, ziplining through coffee plantations, and trekking to the Tadiandamol peak, the highest point in Kodagu. The trek takes you through shola forests, where giant tree ferns create a prehistoric atmosphere, and grasslands that offer sweeping views of the Western Ghats.

    The local Kodava cuisine, known for its robust flavors, features dishes like Pandi Curry (pork curry) and Kadambuttu (rice dumplings), often accompanied by the local fiery chili chutney. The region's homemade wines, made from cashew apples and coffee berries, provide unique taste experiences. Coorg's traditional attire, the Kupya Chale, and its martial dance forms add vibrant cultural dimensions to any visit.`,
    destination: 'Coorg',
    image: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=1200&h=600&fit=crop',
    author: 'Sathyabhushan M N',
    date: 'August 4, 2026',
    readTime: '7 min read',
    tags: ['Coffee Plantations', 'Waterfalls', 'Adventure', 'Karnataka']
  },
  {
    id: '4',
    title: 'Chikmagalur: Where Coffee Meets the Clouds',
    slug: 'chikmagalur-coffee-meets-clouds',
    excerpt: 'Uncover the magic of Chikmagalur\'s coffee estates, trek to the highest peak in Karnataka.',
    content: `Chikmagalur, nestled in the foothills of the Mullayanagiri range, is where coffee meets the clouds. The town's name literally translates to "younger daughter's town," and this hill station has grown to become Karnataka's most beloved coffee destination. The region's coffee story began in the 17th century when Baba Budan, a Sufi saint, smuggled seven coffee beans from Yemen, planting them in the hills that now bear his name.

    The Mullayanagiri peak, standing at 1,930 meters, is Karnataka's highest point. The trek to its summit is a pilgrimage for adventure enthusiasts. The trail winds through shola forests, where the air is thick with the scent of wildflowers and damp earth. From the top, on clear days, you can see the Arabian Sea glimmering in the distance. The temple at the summit, dedicated to Lord Shiva, adds a spiritual dimension to the climb.

    Chikmagalur's coffee plantations offer a glimpse into a world where time moves slowly. The estates, many of which are family-run for generations, open their doors to visitors for plantation walks, coffee-tasting sessions, and homestay experiences. The aroma of roasting coffee beans mingles with the fragrance of pepper vines and vanilla orchids that grow alongside the coffee plants.

    The Hebbe Falls, cascading from a height of 168 meters, is one of the region's most spectacular natural wonders. The journey to the falls involves a jeep ride through coffee plantations followed by a short trek. The pool at the base offers refreshing dips, while the surrounding rock formations create natural water slides, adding an element of adventure to the experience.

    The Bhadra Wildlife Sanctuary, spread over 492 square kilometers, offers opportunities to spot tigers, leopards, and elephants. The sanctuary's boat safari on the Bhadra Reservoir provides close encounters with wildlife against a backdrop of submerged forests. The area is also home to over 300 species of birds, making it a paradise for birdwatchers.

    Chikmagalur's culinary scene revolves around its coffee heritage. The traditional filter coffee, brewed with chicory, is a morning ritual. Local restaurants serve dishes like Akki Rotti (rice flatbread) and Neer Dosa (thin rice pancakes) with spicy chutneys. The region's homemade chocolates, infused with coffee and spices, make perfect gifts. Seasonal festivals like the Coffee Festival celebrate the region's heritage with music, dance, and coffee-themed events.`,
    destination: 'Chikmagalur',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=600&fit=crop',
    author: 'Sathyabhushan M N',
    date: 'August 3, 2026',
    readTime: '6 min read',
    tags: ['Coffee', 'Trekking', 'Western Ghats', 'Karnataka']
  },
  {
    id: '5',
    title: 'Wayanad: A Green Paradise in the Western Ghats',
    slug: 'wayanad-green-paradise-western-ghats',
    excerpt: 'Explore the lush green valleys, ancient caves, and wildlife sanctuaries of Wayanad.',
    content: `Wayanad, cradled in the Western Ghats of Kerala, is a green paradise that captivates every visitor with its unspoiled natural beauty. The district's name means "land of paddy fields," reflecting its agricultural heritage. Wayanad's landscape is a patchwork of paddy fields, tea and coffee plantations, and dense forests, all wrapped in a perpetual mist that lends the region an ethereal quality.

    The Edakkal Caves, perched on a hilltop, offer a journey back 8,000 years. The cave walls bear petroglyphs that depict scenes from the lives of prehistoric communities, providing a fascinating glimpse into human history. The trek to the caves passes through a wildlife sanctuary, where you might encounter elephants, sambar deer, and wild boars. The caves also offer panoramic views of the surrounding valleys, extending to the Karnataka border.

    Wayanad's wildlife sanctuaries are havens for biodiversity. The Wayanad Wildlife Sanctuary, part of the Nilgiri Biosphere Reserve, is home to tigers, leopards, and the endangered Nilgiri langur. The sanctuary's boat safari on the Kabini River offers opportunities to see herds of elephants and gaurs congregating at water holes. The region's birdlife is equally impressive, with sightings of the Malabar hornbill, flame-throated bulbul, and the great Indian hornbill.

    The Chembra Peak, the highest point in Wayanad, offers a trekking experience that culminates at a heart-shaped lake. The lake, perched at 2,100 meters, is a natural formation that has become a symbol of the region. The trek passes through tea plantations and grasslands, with views that extend to the Arabian Sea on clear days. The summit offers a 360-degree panorama of Wayanad's rolling hills and misty valleys.

    Wayanad's spice plantations are a sensory feast. Visitors can walk through plantations of cardamom, pepper, cloves, and nutmeg, learning about the cultivation and processing of these valuable spices. The aroma of freshly ground spices fills the air, creating an olfactory experience that stays with you long after you leave. Homestays in the plantations offer immersive experiences, including cooking classes using locally grown spices.

    The region's tribal culture adds a unique dimension to Wayanad's appeal. The Pookode Lake, surrounded by evergreen forests, is a popular spot for boating and picnicking. The lake's water reflects the surrounding greenery, creating mirror-like images that are perfect for photography. Wayanad's culinary offerings include traditional Kerala cuisine with a tribal influence, featuring dishes like Kumbilappam (steamed rice cakes) and Kozhi Achar (spicy chicken pickle).`,
    destination: 'Wayanad',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=600&fit=crop',
    author: 'Sathyabhushan M N',
    date: 'August 2, 2026',
    readTime: '7 min read',
    tags: ['Nature', 'Wildlife', 'Caves', 'Kerala']
  },
  {
    id: '6',
    title: 'Udupi: Temples, Beaches, and Authentic Coastal Cuisine',
    slug: 'udupi-temples-beaches-coastal-cuisine',
    excerpt: 'From the sacred Krishna Temple to the pristine beaches and mouthwatering seafood.',
    content: `Udupi, a coastal town in Karnataka, weaves together spirituality, natural beauty, and culinary excellence into an unforgettable tapestry. The town's fame begins with the Udupi Sri Krishna Temple, an 800-year-old shrine that attracts pilgrims from across India. The temple's unique feature is the Kanakana Kindi, a small window through which devotees can view the deity, a tradition that dates back to the temple's founding by Saint Madhvacharya.

    The temple complex is a masterpiece of architecture, with its copper-roofed shrines and elaborately carved pillars. The annual Paryaya festival, where temple administration rotates among eight family monasteries, is a major event that showcases Udupi's rich tradition. The temple's kitchen, which serves free meals to thousands of pilgrims daily, is a testament to the town's spirit of hospitality and community service.

    Udupi's coastline stretches along the Arabian Sea, offering some of Karnataka's most beautiful beaches. Kapu Beach, with its lighthouse that offers panoramic views of the coast, is a favorite among photographers. The beach's sunset views, where the sun melts into the Arabian Sea, are legendary. Malpe Beach, just a short drive from the town, offers water sports and boat rides to the St. Mary's Island, known for its unique columnar basalt formations.

    The St. Mary's Island, a geological wonder, features hexagonal rock formations that are believed to be millions of years old. The island's seclusion and raw beauty make it a popular destination for day trips. The surrounding coral reefs host diverse marine life, making it a spot for snorkeling and glass-bottom boat rides. The island's geological significance is recognized by UNESCO as part of the world's geological heritage.

    Udupi's cuisine is a celebration of coastal flavors. The town is the birthplace of the Udupi cuisine, which has gained global recognition. The iconic Udupi Masala Dosa, served with sambar and coconut chutney, originated in the town's temple kitchens. The restaurants around the temple, many of which are vegetarian, serve a range of dishes from Mangalore Buns to Goli Baje. The coastal influence is evident in the seafood offerings, with preparations like Anjal Tawa Fry and Kadle Manoli.

    Beyond the temple, Udupi offers cultural experiences through its Yakshagana performances, a traditional theater form that combines dance, music, and storytelling. The town's handloom industry produces the famous Udupi sarees, known for their fine cotton and intricate borders. The annual Udupi Food Festival celebrates the town's culinary heritage with chefs from around the world participating. Udupi's blend of spirituality, nature, and gastronomy creates a travel experience that engages all the senses.`,
    destination: 'Udupi',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=600&fit=crop',
    author: 'Sathyabhushan M N',
    date: 'August 1, 2026',
    readTime: '6 min read',
    tags: ['Temples', 'Beaches', 'Cuisine', 'Karnataka']
  }
];

// Function to get blog post by slug
function getBlogPost(slug: string) {
  return blogPosts.find(post => post.slug === slug);
}

// Generate static params for all blog posts
export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Main page component
export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);
  
  // If post not found, show 404
  if (!post) {
    notFound();
  }

  // Get related posts (excluding current)
  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Back button */}
        <Link 
          href="/blogs"
          className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to all blogs
        </Link>

        {/* Hero Image */}
        <div className="relative rounded-xl overflow-hidden mb-8 shadow-xl">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
            <div className="flex flex-wrap items-center gap-3 text-white text-sm">
              <span className="bg-emerald-600 px-3 py-1 rounded-full font-semibold">
                {post.destination}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" /> {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> {post.readTime}
              </span>
            </div>
          </div>
        </div>

        {/* Title and meta */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {post.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{post.author}</p>
                <p className="text-sm text-gray-500">Travel Writer</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Heart className="w-5 h-5 text-gray-600 hover:text-red-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Bookmark className="w-5 h-5 text-gray-600 hover:text-emerald-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Share2 className="w-5 h-5 text-gray-600 hover:text-blue-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag) => (
            <span key={tag} className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
              #{tag}
            </span>
          ))}
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          {post.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-gray-700 leading-relaxed mb-6 text-lg">
              {paragraph.trim()}
            </p>
          ))}
        </div>

        {/* Author bio */}
        <div className="mt-12 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
              {post.author.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{post.author}</h3>
              <p className="text-gray-600 mt-1">
                Travel writer and photographer with a passion for uncovering hidden gems 
                across India. Specializing in South Indian destinations, culture, and cuisine.
              </p>
            </div>
          </div>
        </div>

        {/* Related posts */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">You might also like</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Link 
                key={relatedPost.id}
                href={`/blogs/${relatedPost.slug}`}
                className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <img 
                  src={relatedPost.image}
                  alt={relatedPost.title}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4">
                  <h4 className="font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {relatedPost.title}
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">{relatedPost.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}