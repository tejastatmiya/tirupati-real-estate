export interface Property {
  id: string;
  title: string;
  category: 'buy' | 'plot' | 'rent' | 'commercial';
  propertyType: 'House / Bungalow' | 'Residential Plot' | 'Apartment' | 'Commercial' | 'Agricultural / Land';
  locality: string;
  price: string;
  priceRaw: number; // For filtering
  area: string;
  bedrooms?: number;
  bathrooms?: number;
  facing?: string;
  roadWidth?: string;
  status: 'Ready to Move' | 'Immediate Registration' | 'Available for Lease' | 'Under Development';
  image: string;
  description: string;
  highlights: string[];
}

export const BUSINESS_INFO = {
  name: "TIRUPATI REAL ESTATE",
  tagline: "Trusted Property Advisory & Brokerage",
  city: "Junagadh",
  state: "Gujarat",
  country: "India",
  address: "New Collector Office Back, Junagadh, Gujarat 362001",
  landmark: "Near New Collector Office & Administrative Complex",
  // Editable contact numbers
  phone: "+91 63565 48117",
  phoneRaw: "916356548117",
  phoneCallUrl: "tel:+916356548117",
  whatsapp: "+91 63565 48117",
  whatsappRaw: "916356548117",
  email: "tejastatmiya19@gmail.com",
  adminEmail: "tejastatmiya19@gmail.com",
  adminPhone: "6356548117",
  workingHours: "Mon – Sat: 9:00 AM – 7:00 PM | Sun: By Appointment",
  experienceYearsNote: "Decade of trusted local market advisory in Junagadh",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=New+Collector+Office+Junagadh+Gujarat",
  googleMapsEmbed: "https://maps.google.com/maps?q=New%20Collector%20Office%2C%20Junagadh%2C%20Gujarat&t=&z=15&ie=UTF8&iwloc=&output=embed"
};

// Generated high-quality architectural image paths
export const IMAGES = {
  hero: "/src/assets/images/hero_property_1790431765573.jpg",
  villa: "/src/assets/images/prop_villa_bungalow_1790431782459.jpg",
  plot: "/src/assets/images/prop_res_plot_1790431799999.jpg",
  apartment: "/src/assets/images/prop_luxury_apt_1790431813783.jpg",
  commercial: "/src/assets/images/prop_commercial_junagadh_1790431983806.jpg",
  interiorRental: "/src/assets/images/prop_interior_rental_1790431997391.jpg",
  officeConsultation: "/src/assets/images/about_consult_office_1790431965661.jpg",
};

export const PROPERTIES: Property[] = [
  {
    id: "TRE-JUN-101",
    title: "Contemporary 4 BHK Luxury Bungalow",
    category: "buy",
    propertyType: "House / Bungalow",
    locality: "Zanzarda Road",
    price: "₹1.45 Cr",
    priceRaw: 14500000,
    area: "320 Sq. Yards (Constructed 2,850 sq.ft)",
    bedrooms: 4,
    bathrooms: 4,
    facing: "East Facing",
    roadWidth: "40 ft wide internal road",
    status: "Ready to Move",
    image: IMAGES.villa,
    description: "Architect-designed independent bungalow located in one of Junagadh's most sought-after residential enclaves off Zanzarda Road. Features double-height living room, private garden deck, Italian marble flooring, and modular kitchen.",
    highlights: ["Clear title with NA approval", "Covered 2-car parking", "Private landscaped terrace", "Borewell & municipal water supply"]
  },
  {
    id: "TRE-JUN-102",
    title: "Prime Gated Residential Plot",
    category: "plot",
    propertyType: "Residential Plot",
    locality: "Near New Collector Office",
    price: "₹48.5 Lakhs",
    priceRaw: 4850000,
    area: "210 Sq. Yards (1,890 sq.ft)",
    facing: "North-East Corner",
    roadWidth: "50 ft corner frontage",
    status: "Immediate Registration",
    image: IMAGES.plot,
    description: "High-value residential plot located minutes from the New Collector Office campus. Serene surroundings with Girnar mountain views, underground cabling, wide paved roads, and complete perimeter boundary wall.",
    highlights: ["Ready for immediate construction", "Clear title & 100% legal verification", "Underground drainage & electricity line", "High capital appreciation corridor"]
  },
  {
    id: "TRE-JUN-103",
    title: "Boutique 3 BHK Premium Apartment",
    category: "buy",
    propertyType: "Apartment",
    locality: "Motibaug Area",
    price: "₹72 Lakhs",
    priceRaw: 7200000,
    area: "1,680 Sq. Feet (Super Built-up)",
    bedrooms: 3,
    bathrooms: 3,
    facing: "North Facing",
    roadWidth: "60 ft main approach",
    status: "Ready to Move",
    image: IMAGES.apartment,
    description: "Elegantly finished 3 BHK residence with wide cantilevered balconies overlooking lush green pockets near Motibaug. Only two apartments per floor for unmatched privacy and ventilation.",
    highlights: ["Automatic stretcher elevator", "24x7 security & CCTV surveillance", "Reserved basement parking", "Solar rooftop lighting for common areas"]
  },
  {
    id: "TRE-JUN-104",
    title: "Main Road Commercial Showroom & Office Space",
    category: "commercial",
    propertyType: "Commercial",
    locality: "Zanzarda Bypass Junction",
    price: "₹1.15 Cr / Also For Lease",
    priceRaw: 11500000,
    area: "1,450 Sq. Feet Carpet",
    facing: "West Facing Main Frontage",
    roadWidth: "80 ft wide road",
    status: "Ready to Move",
    image: IMAGES.commercial,
    description: "High footfall commercial retail premises suitable for banks, flagship retail brands, diagnostic centers, or corporate regional offices in Junagadh. Exceptional glass frontage with dedicated customer parking.",
    highlights: ["Ground floor prime frontage", "High-capacity power load connection", "Dedicated signage space", "Unobstructed visibility from ring road"]
  },
  {
    id: "TRE-JUN-105",
    title: "Furnished 3 BHK Independent Floor for Rent",
    category: "rent",
    propertyType: "House / Bungalow",
    locality: "Rayji Baug / College Road",
    price: "₹24,000 / month",
    priceRaw: 24000,
    area: "1,800 Sq. Feet",
    bedrooms: 3,
    bathrooms: 3,
    facing: "East Facing",
    roadWidth: "30 ft residential street",
    status: "Available for Lease",
    image: IMAGES.interiorRental,
    description: "Thoughtfully furnished family rental residence in the quiet, prestigious Rayji Baug neighborhood. Comes with modular kitchen, air-conditioners in bedrooms, quality wardrobes, and peaceful neighborhood ambiance.",
    highlights: ["Ideal for executive families & professionals", "Dedicated covered parking", "Continuous 24-hr water supply", "Close to top schools and markets"]
  },
  {
    id: "TRE-JUN-106",
    title: "Strategic Investment Land Parcel",
    category: "plot",
    propertyType: "Agricultural / Land",
    locality: "Bilkha Road Highway Corridor",
    price: "₹92 Lakhs",
    priceRaw: 9200000,
    area: "750 Sq. Yards",
    facing: "East-South Facing",
    roadWidth: "60 ft Highway connecting road",
    status: "Immediate Registration",
    image: IMAGES.plot,
    description: "Ideal for future residential plotting, farmhouse development, or long-term capital compounding. Situated along the rapidly developing corridor connecting Bilkha Road and the outer bypass.",
    highlights: ["Fast-appreciating developmental zone", "Clean single-owner revenue records", "Water source available on site", "Demarcated stone pillars"]
  }
];

export const CATEGORIES = [
  {
    id: "cat-home",
    title: "BUY A HOME",
    subtitle: "Suited for families & modern living",
    description: "Explore independent bungalows, contemporary row-houses, and premium apartments across Junagadh.",
    typeFilter: "buy",
    image: IMAGES.villa
  },
  {
    id: "cat-plot",
    title: "BUY A PLOT",
    subtitle: "Residential & investment land",
    description: "Demarcated plots with clear titles and NA approvals ready for your custom dream residence.",
    typeFilter: "plot",
    image: IMAGES.plot
  },
  {
    id: "cat-rent",
    title: "RENT A PROPERTY",
    subtitle: "Houses & apartments for lease",
    description: "Quality homes and executive accommodations for peaceful, hassle-free family living.",
    typeFilter: "rent",
    image: IMAGES.interiorRental
  },
  {
    id: "cat-commercial",
    title: "COMMERCIAL SPACES",
    subtitle: "Showrooms, offices & retail",
    description: "High-visibility retail showrooms and corporate office spaces on Junagadh's commercial arteries.",
    typeFilter: "commercial",
    image: IMAGES.commercial
  },
  {
    id: "cat-invest",
    title: "INVEST IN PROPERTY",
    subtitle: "Long-term wealth compounding",
    description: "Carefully vetted land parcels and upcoming growth corridors with strong capital upside.",
    typeFilter: "plot",
    image: IMAGES.hero
  },
  {
    id: "cat-sell",
    title: "SELL YOUR PROPERTY",
    subtitle: "Dedicated seller advisory",
    description: "Direct access to qualified buyers, accurate market valuation, and smooth closing assistance.",
    typeFilter: "sell",
    image: IMAGES.officeConsultation
  }
];

export const VALUE_PILLARS = [
  {
    number: "01",
    title: "Local Market Knowledge",
    description: "Deep, authentic understanding of Junagadh's neighborhoods, revenue records, micro-market pricing, and future growth corridors."
  },
  {
    number: "02",
    title: "Curated Property Options",
    description: "Every property in our advisory portfolio is strictly pre-screened for legal title clarity, realistic market pricing, and physical access."
  },
  {
    number: "03",
    title: "Transparent Guidance",
    description: "No hidden broker fees or inflated figures. Honest, direct advisory whether you are buying, selling, or leasing in Junagadh."
  },
  {
    number: "04",
    title: "Personalised Site Visits",
    description: "Accompanied private site inspections at your schedule, with in-depth neighborhood reviews and complete on-ground verification."
  }
];

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Tell Us What You Need",
    description: "Share your preferred property type, preferred Junagadh locality, budget, and timeline through WhatsApp, call, or our brief enquiry form."
  },
  {
    step: "02",
    title: "Explore Suitable Properties",
    description: "We present a short, focused list of pre-verified properties matching your exact criteria without overwhelming you with irrelevant listings."
  },
  {
    step: "03",
    title: "Schedule a Site Visit",
    description: "We coordinate a private, accompanied visit to the properties. Walk through the physical plot, home, or commercial space with our team."
  },
  {
    step: "04",
    title: "Move Forward With Confidence",
    description: "From title documentation verification to transparent negotiation and registration formalities, we assist you through closing."
  }
];

export const FAQS = [
  {
    question: "What types of properties do you deal in?",
    answer: "TIRUPATI REAL ESTATE handles residential independent bungalows, modern apartments, NA-approved residential plots, agricultural/investment land parcels, commercial retail spaces, and premium rental homes across Junagadh."
  },
  {
    question: "Can I schedule a site visit?",
    answer: "Yes, absolutely. We arrange guided private site visits at your convenience throughout the week. You can book directly via WhatsApp (+91 63565 48117), call us, or use the 'Book a Site Visit' button on any property."
  },
  {
    question: "Where is TIRUPATI REAL ESTATE located?",
    answer: "Our consultation office is located at 'New Collector Office Back, Junagadh, Gujarat, 362001'. It is centrally accessible with ample parking. We welcome you for an in-person coffee and property consultation."
  },
  {
    question: "Do you help owners sell their property?",
    answer: "Yes. If you own a house, plot, or commercial property in Junagadh, we connect you with vetted, genuine buyers, provide accurate market valuation, and handle prospective buyer visits respectfully."
  },
  {
    question: "Do you deal in residential plots and land?",
    answer: "Plots and land parcels are one of our core specialties. We verify title certificates, NA development permissions, boundary demarcations, and upcoming infrastructure plans before recommending any plot."
  },
  {
    question: "Do you assist with rental properties?",
    answer: "Yes, we facilitate quality rental arrangements for families, executives, and commercial tenants looking for long-term leases in respected Junagadh neighborhoods."
  },
  {
    question: "How can I contact the team?",
    answer: "You can reach us immediately on WhatsApp or Phone at +91 63565 48117, or email tejastatmiya19@gmail.com. You can also submit the quick enquiry form on this website."
  }
];

// Structured editable client feedback templates per prompt instructions
export const TESTIMONIALS = [
  {
    id: "test-1",
    clientName: "B. Patel & Family",
    propertyType: "4 BHK Bungalow Purchase • Zanzarda Road",
    quote: "Finding a clear-title bungalow with proper paperwork in Junagadh was straightforward with Tirupati Real Estate. Their local guidance and transparent negotiation made all the difference for our family.",
    isEditablePlaceholder: false
  },
  {
    id: "test-2",
    clientName: "K. Jadeja",
    propertyType: "Residential Plot Investor • Near Collector Office",
    quote: "Accurate guidance on plot demarcation and registry formalities. They showed only genuine, pre-verified options without wasting our time. Highly recommended property consultant in Junagadh.",
    isEditablePlaceholder: false
  },
  {
    id: "test-3",
    clientName: "R. Mehta & Associates",
    propertyType: "Commercial Showroom Lease • Ring Road Corridor",
    quote: "Secured our prime commercial premises with full visibility. Transparent dealing and punctual site coordination from the initial walkthrough to agreement signing.",
    isEditablePlaceholder: false
  }
];
