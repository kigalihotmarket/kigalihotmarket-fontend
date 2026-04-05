// IMAGE IMPORTS
import logo from "/images/brand/logo.png";

import momo from "/icons/momo.webp";
import airtel from "/icons/airtel.jpg";
import card from "/icons/credit-card.png";

import user1 from "/images/users/1.webp";
import user2 from "/images/users/2.webp";
import user3 from "/images/users/3.webp";

import testimonialImage1 from "/images/users/1.webp";
import testimonialImage2 from "/images/users/2.webp";
import testimonialImage3 from "/images/users/3.webp";

import bugesera from "/images/location/bugesera.jpg";
import gasabo from "/images/location/gasabo.jpg";
import kamonyi from "/images/location/kamonyi.jpg";
import kicukiro from "/images/location/kicukiro.jpg";
import ngoma from "/images/location/ngoma.jpg";
import rwamagana from "/images/location/rwamagana.jpg";

import partner1 from "/images/partner/cok.png";
import partner2 from "/images/partner/equity.png";
import partner3 from "/images/partner/im.png";
import partner4 from "/images/partner/nla.png";
import partner5 from "/images/partner/equity.png";
import partner6 from "/images/partner/im.png";
import partner7 from "/images/partner/nla.png";

// ICONS IMPORT
import buy_icon from "/icons/buy-icon.svg";
import rent_icon from "/icons/rent-icon.svg";

import search_icon from "/icons/search-icon.svg";
import work_icon1 from "/icons/work-icon-1.svg";
import work_icon2 from "/icons/work-icon-2.svg";
import work_icon3 from "/icons/work-icon-3.svg";

import property_icon1 from "/icons/property-icon-1.svg";
import property_icon2 from "/icons/property-icon-2.svg";
import property_icon3 from "/icons/property-icon-3.svg";
import property_icon4 from "/icons/property-icon-3.svg";
import property_icon5 from "/icons/property-icon-4.svg";

import counter1 from "/icons/counter-icon-1.svg";
import counter2 from "/icons/counter-icon-2.svg";
import counter3 from "/icons/counter-icon-3.svg";
import counter4 from "/icons/counter-icon-4.svg";

import pointer from "/icons/pointer.png";

// REACT_ICONS
import { MdPool } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";

export const assets = {
  images: {
    logo: logo,
    faqImg: logo,
    heroBg: logo,
    about1: user1,
    about2: user2,
    about3: user3,
    award: logo,
    contact: logo,
    authBg: logo,
    users: logo,
    user1,
    user2,
    user3,
    defaultImg: user1,
  },
  icons: {
    buy_icon: buy_icon,
    rent_icon: rent_icon,
    search_icon: search_icon,
    pointer_icon: pointer,
    momo,
    bank:card,
    mtn: momo,
    airtel,
  },
};

// HOW IT WORKS - homepage
export const howItWork = [
  {
    icon: work_icon1,
    title: "01. Search for Location",
    description:
      "Find your ideal property location using our advanced search tools.",
  },
  {
    icon: work_icon2,
    title: "02. Select Property Type",
    description: "Choose from a variety of property types that suit your needs.",
  },
  {
    icon: work_icon3,
    title: "03. Book Your Property",
    description:
      "Schedule a visit to your chosen property and confirm your booking.",
  },
];

// EXPLORE BY PROPERTY TYPE - homepage
export const exploreByPropertyType = [
  {
    icon: property_icon1,
    title: "Apartment",
    count: 1,
  },
  {
    icon: property_icon2,
    title: "Villa",
    count: 3,
  },
  {
    icon: property_icon3,
    title: "Residential",
    count: 28,
  },
  {
    icon: property_icon4,
    title: "Plot",
    count: 87,
  },
  {
    icon: property_icon5,
    title: "Commercial",
    count: 3,
  },
];

// ADS FOR YOU - homepage
export const adsForYou = [
  {
    thumbnail: property_icon1,
    title: "Land for Sale",
    location: "Bugesera - Maranyundo",
    description:
      "Discover an excellent opportunity for land on sale, located in Maranyundo - Bugesera..",
  },
  {
    thumbnail: property_icon1,
    title: "Plot for Sale",
    location: "Rusororo - Gasagara",
    description: "Large plot of land for sale located in 2km away from main road",
  },
  {
    thumbnail: property_icon1,
    title: "Plot for Sale",
    location: "Bugesera - Mayange",
    description:
      "Discover an excellent opportunity for land on sale, located in Mayange - Bugesera.. ",
  },
  {
    thumbnail: property_icon1,
    title: "Land for Sale",
    location: "Bugesera - Ntarama",
    description:
      "Discover an excellent opportunity for land on sale, located in Ntarama - Bugesera",
  },
];

export const ads = [
  {
    id: 1,
    title: "Luxury Apartment in Kigali",
    description: "A fully furnished 2-bedroom apartment with a stunning city view.",
    location: "Nyarutarama, Kigali",
    thumbnail: {
      path: "https://via.placeholder.com/300x200?text=Luxury+Apartment",
    },
    createdAt: "2025-03-10T08:30:00.000Z",
    updatedAt: "2025-03-12T10:15:00.000Z",
  },
  {
    id: 2,
    title: "Modern Villa for Sale",
    description: "A spacious 4-bedroom villa with a private garden and pool.",
    location: "Rebero, Kigali",
    thumbnail: {
      path: "https://via.placeholder.com/300x200?text=Modern+Villa",
    },
    createdAt: "2025-03-05T11:00:00.000Z",
    updatedAt: "2025-03-07T09:45:00.000Z",
  },
  {
    id: 3,
    title: "Office Space in Kicukiro",
    description: "Affordable office space available in a prime location.",
    location: "Kicukiro, Kigali",
    thumbnail: {
      path: "https://via.placeholder.com/300x200?text=Office+Space",
    },
    createdAt: "2025-03-02T15:20:00.000Z",
    updatedAt: "2025-03-04T17:35:00.000Z",
  },
  {
    id: 4,
    title: "Affordable Studio Apartment",
    description:
      "A budget-friendly studio apartment ideal for students and young professionals.",
    location: "Nyamirambo, Kigali",
    thumbnail: {
      path: "https://via.placeholder.com/300x200?text=Studio+Apartment",
    },
    createdAt: "2025-02-28T12:40:00.000Z",
    updatedAt: "2025-03-01T14:50:00.000Z",
  },
  {
    id: 5,
    title: "Luxury Penthouse with City View",
    description: "A high-end penthouse offering breathtaking views of Kigali.",
    location: "Kimihurura, Kigali",
    thumbnail: {
      path: "https://via.placeholder.com/300x200?text=Luxury+Penthouse",
    },
    createdAt: "2025-02-25T09:10:00.000Z",
    updatedAt: "2025-02-27T11:20:00.000Z",
  },
];

// PROPERTIES
export const properties = [
  {
    id: 1,
    title: "Luxury 3-Bedroom Villa in Kigali",
    thumbnail: logo,
    description: `
        <h1>Spacious 3-Bedroom Villa</h1>
        <p>This modern villa is located in the heart of Kigali, offering stunning city views.</p>
        <h2>Key Features</h2>
        <ul>
          <li>3 Bedrooms</li>
          <li>2 Bathrooms</li>
          <li>Modern Kitchen</li>
          <li>Spacious Living Room</li>
         </ul>
        <p>The villa offers ample space for a family, with a large garden and a private swimming pool.</p>
  `,
    price: "$ 250,000",
    location: "Kigali, Kabeza",
    locationLink: "https://maps.app.goo.gl/d5c52MA99uNNDUjP9",
    amenities: ["Swimming Pool", "Garden", "Parking", "Gym", "Security"],
    reviews: {
      rating: 4.5,
      count: 45,
      testimonials: [
        {
          id: 1,
          star: 4,
          name: "John Doe",
          position: "Property Investor",
          testimonial:
            "This villa was exactly what we were looking for! The space and views are amazing. Highly recommend!",
          image: testimonialImage1,
        },
        {
          id: 2,
          star: 5,
          name: "Sarah Williams",
          position: "Homebuyer",
          testimonial:
            "Fantastic property! The attention to detail is impressive, and the neighborhood is perfect for families.",
          image: testimonialImage2,
        },
      ],
    },
    propertyDetails: {
      rooms: 3,
      bathrooms: 2,
      garages: 1,
      size: 2500,
      parking: "2 Spaces",
      propertyType: "Villa",
      propertyStatus: "for rent",
      yearBuilt: 2020,
      galleryImages: [],
      video: "https://www.example.com/video-link",
      neighborhood:
        "Kigali city center, near schools, hospitals, and shopping malls.",
    },
    featured: true,
    agent: "Agent Name",
    contact: "+250 788 123 456",
  },
  {
    id: 2,
    title: "Affordable 2-Bedroom Apartment",
    thumbnail: logo,
    description: `<h1>Affordable Apartment Based in Remera</h1>
                        <p>This 2-bedroom apartment is a perfect choice for young professionals or small families.</p>
                        <h2>Amenities</h2>
                        <ul>
                          <li>2 Bedrooms</li>
                          <li>1 Bathroom</li>
                          <li>Balcony</li>
                          <li>Parking Available</li>
                        </ul>
                        <p>Located in a quiet neighborhood, this apartment is just 10 minutes away from downtown.</p>`,
    price: "$80,000",
    location: "Gisenyi, Rwanda",
    locationLink:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15949.981282365528!2d30.0641191!3d-1.9552699500000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca42991d5abed%3A0xcad912f40dd45dc5!2sKiyovu%2C%20Kigali%2C%20Rwanda!5e0!3m2!1sen!2snl!4v1738414952208!5m2!1sen!2snl",
    amenities: ["Parking", "Balcony", "Security"],
    reviews: {
      rating: 4.0,
      count: 30,
      testimonials: [
        {
          id: 1,
          star: 4.0,
          name: "Emma K.",
          position: "First-Time Buyer",
          testimonial:
            "This apartment was an affordable choice for my first home. Great value for money, and the location is ideal.",
          image: testimonialImage1,
        },
        {
          id: 2,
          star: 3.5,
          name: "Michael Brown",
          position: "Tenant",
          testimonial:
            "I rented this apartment for a few years and was very satisfied with it. Quiet neighborhood and easy access to amenities.",
          image: testimonialImage2,
        },
      ],
    },
    propertyDetails: {
      rooms: 2,
      size: 3500,
      bathrooms: 1,
      garages: 0,
      parking: "1 Space",
      propertyType: "Apartment",
      propertyStatus: "for sale",
      yearBuilt: 2018,
      galleryImages: [],
      video: "https://www.youtube.com/embed/vYCUyZy0pkc?si=HZaLEyZgfJNeQJcz",
      neighborhood: "Close to bus stations, shops, and schools.",
    },
    featured: false,
    agent: "Agent Name",
    contact: "250788123457",
  },
  {
    id: 3,
    title: "Modern Office Space for Rent",
    thumbnail: logo,
    description: `<h1>Prime Office Space in Kigali</h1>
                        <p>This office space offers the perfect setup for your business.</p>
                        <h2>Included Amenities</h2>
                        <ul>
                          <li>High-Speed Internet</li>
                          <li>Air Conditioning</li>
                          <li>Parking for Employees</li>
                          <li>Meeting Rooms</li>
                        </ul>
                        <p>Located in the heart of Kigali, the office is easily accessible by public transport.</p>`,
    price: "$1,500/month",
    location: "Kigali, Rwanda",
    locationLink: "https://maps.app.goo.gl/vv4DKZ7nAuZBN9V26",
    amenities: ["Internet", "Parking", "Meeting Rooms"],
    reviews: {
      rating: 4.2,
      count: 20,
      testimonials: [
        {
          id: 1,
          star: 4.5,
          name: "David Miller",
          position: "Business Owner",
          testimonial:
            "Great office space! It’s spacious, well-lit, and perfectly located. Our team loves it.",
          image: testimonialImage1,
        },
        {
          id: 2,
          star: 5,
          name: "Linda White",
          position: "Entrepreneur",
          testimonial:
            "Excellent space for my growing business. The amenities provided are top-notch and the location is ideal.",
          image: testimonialImage2,
        },
      ],
    },
    propertyDetails: {
      size: 6500,
      rooms: 5,
      bathrooms: 2,
      garages: 0,
      parking: "3 Spaces",
      propertyType: "Office",
      propertyStatus: "design",
      yearBuilt: 2015,
      galleryImages: [],
      video: "https://www.youtube.com/embed/vYCUyZy0pkc?si=HZaLEyZgfJNeQJcz",
      neighborhood:
        "Kigali business district, near restaurants and public transport.",
    },
    featured: true,
    agent: "Agent Name",
    contact: "+250 788 123 458",
  },
  {
    id: 4,
    title: "Prime Land for Sale in Bugesera",
    thumbnail: logo,
    description: `<h1>Premium Land in Bugesera</h1>
                  <p>This parcel of land is strategically located near key amenities, offering immense value for residential or commercial use.</p>
                  <h2>Details</h2>
                  <ul>
                    <li>Land Size: 2500 sqm</li>
                    <li>10 minutes from Kigali Airport</li>
                    <li>Easy access to the main road</li>
                  </ul>
                  <p>An excellent opportunity for investors or developers looking for prime land in Bugesera.</p>`,
    price: "$50,000",
    location: "Bugesera, Rwanda",
    locationLink: "https://maps.app.goo.gl/DwuetbkFBhiDSYaK9",
    amenities: ["10 min from airport", "3 min from market", "Near main road"],
    reviews: {
      rating: 4.0,
      count: 15,
      testimonials: [
        {
          id: 1,
          star: 4,
          name: "Alex Johnson",
          position: "Investor",
          testimonial:
            "The location is perfect for development. Highly recommended for its proximity to major amenities.",
          image: testimonialImage1,
        },
      ],
    },
    propertyDetails: {
      size: 2500,
      propertyType: "Land",
      propertyStatus: "for sale",
      galleryImages: [],
      video: "https://www.example.com/video-link",
      neighborhood: "Close to Kigali airport, markets, and the business district.",
    },
    featured: true,
    agent: "Agent Name",
    contact: "+250 788 123 459",
  },
];

// NEIGHBOURHOODS
export const neighborhoods = [
  { img: bugesera, name: "Bugesera", count: 7, url: "/" },
  { img: gasabo, name: "Gasabo", count: 12, url: "/" },
  {
    img: kamonyi,
    name: "Kamonyi",
    count: 5,
    url: "/",
  },
  {
    img: kicukiro,
    name: "Kicukiro",
    count: 8,
    url: "/",
  },
  {
    img: ngoma,
    name: "Ngoma",
    count: 3,
    url: "/",
  },
  {
    img: rwamagana,
    name: "Rwamagana",
    count: 6,
    url: "/",
  },
];

// COUNTERS - homepage
export const counterNum = [
  {
    icon: counter1,
    num: "124+",
    title: "Listing Added",
  },
  {
    icon: counter2,
    num: "4",
    title: "Registered Agents",
  },
  {
    icon: counter3,
    num: "1000+",
    title: "Sales Completed",
  },
  {
    icon: counter4,
    num: "2530+",
    title: "Daily Visits",
  },
];

// CTA IMAGES ON HOMEPAGE
export const homeCta = [
  {
    thumbnail: logo,
    text: "Buy a Property",
    url: "https://",
  },
  {
    thumbnail: logo,
    text: "Sell a Property",
    url: "https://",
  },
  {
    thumbnail: logo,
    text: "Rent a Property",
    url: "https://",
  },
];

// PARTNERS homepage
export const partners = [
  { img: partner1, title: "City Of Kigali" },
  { img: partner2, title: "Equity Bank" },
  { img: partner3, title: "I&M Bank" },
  { img: partner4, title: "NLA" },
  { img: partner5, title: "Equity" },
  { img: partner6, title: "Equity" },
  { img: partner7, title: "Equity" },
];

// TESTIMONIALS
export const testimonials = [
  {
    id: 1,
    name: "Jean Pierre ITANGISHAKA",
    rating: 4,
    message:
      "I'm always following your posts and I like the way you provide for us affordable properties and every body can afford especially youth!!",
  },
  {
    id: 2,
    name: "Jay P. ITANGISHAKA",
    rating: 4.5,
    message:
      "I'm always following your posts and I like the way you provide for us affordable properties and",
  },
  {
    id: 3,
    name: "Jay P. ITANGISHAKA",
    rating: 4.5,
    message:
      "I'm always following your posts and I like the way you provide for us affordable properties and",
  },
  {
    id: 4,
    name: "Jay P. ITANGISHAKA",
    rating: 4.5,
    message:
      "I'm always following your posts and I like the way you provide for us affordable properties and",
  },
  {
    id: 5,
    name: "Jay P. ITANGISHAKA",
    rating: 4.5,
    message:
      "I'm always following your posts and I like the way you provide for us affordable properties and",
  },
  {
    id: 6,
    name: "Jay P. ITANGISHAKA",
    rating: 4.5,
    message:
      "I'm always following your posts and I like the way you provide for us affordable properties and",
  },
];

//  FAQ - home
export const faq = [
  {
    question: "Do you offer property management services?",
    solution:
      "Yes, we offer comprehensive property management services. Our team can handle everything from tenant placement and rent collection to maintenance and repairs. Please contact us for more details about our property management solutions",
  },
  {
    question: "What areas do you serve?",
    solution:
      "We primarily serve Rwanda and its surrounding regions. Our property listings include residential, commercial, and land properties in various cities and towns across the country.",
  },
  {
    question: "How can i Communicate with the agent or peroperty owner?",
    solution:
      "You can communicate with the agent or property owner directly through our website's messaging system. Additionally, you can contact them via the contact information provided on the property listing page.",
  },
  {
    question: "How do you handle scheduled visits?",
    solution:
      "Once you schedule a visit, you will receive a confirmation via email or WhatsApp. On the visit date, you will receive a reminder with the visit details. If you need to reschedule or cancel, you can do so through the confirmation message. Our system ensures seamless communication and timely reminders.",
  },
  {
    question: "How do you handle negative reviews?",
    solution:
      "We take all feedback seriously and strive to address any issues promptly. If you leave a negative review, our team will reach out to you to understand the problem and work towards a resolution. We believe in maintaining transparency and building trust with our clients.",
  },
];

// BECOME AGENT - homepage
export const becomeAgent = {
  description:
    "Join our team of professional real estate agents and take your career to new heights. Get access to exclusive listings and top-notch resources.",
  title: "Become Our Real Estate Agent",
  url: "/",
};

// BLOGS
export const blogs = [
  {
    id: 1,
    title: "Rwanda’s Real Estate Boom: Prices Surge as Demand Soars",
    thumbnail: logo,
    teaser: "Kigali's property prices are skyrocketing—what's driving the surge?",
    description: `
      <h2>Rising Demand for Housing in Kigali</h2>
      <p>Rwanda's real estate sector is experiencing rapid growth, with property prices in Kigali increasing by over <b>15% in 2024</b>.</p>
      <ul>
        <li><b>High Demand:</b> Increased urban migration is driving up housing needs.</li>
        <li><b>Government Support:</b> Infrastructure projects and policies are fueling real estate expansion.</li>
        <li><b>Investment Hotspots:</b> Areas like Nyarutarama, Rebero, and Kicukiro are witnessing significant growth.</li>
      </ul>
      <p>Experts predict that Rwanda's real estate market will continue expanding in 2025.</p>
    `,
    category: "Market Trends",
    date: "February 1, 2025",
    likes: 220,
    views: 4200,
    featured: true,
  },
  {
    id: 2,
    title: "Affordable Housing Projects in Rwanda: Are They Solving the Crisis?",
    thumbnail: logo,
    teaser: "Is Rwanda's affordable housing plan truly helping low-income citizens?",
    description: `
      <h2>Government and Private Sector Push for Low-Cost Housing</h2>
      <p>Rwanda is increasing efforts to provide affordable housing for its growing population. The government has partnered with developers to build over <b>10,000 low-cost homes</b> in the next five years.</p>
      <ul>
        <li><b>New Developments:</b> Key projects are underway in Bugesera, Masaka, and Kanombe.</li>
        <li><b>Challenges:</b> Land costs, financing issues, and high construction expenses remain obstacles.</li>
        <li><b>Future Outlook:</b> Experts suggest more incentives are needed to attract private investors.</li>
      </ul>
    `,
    category: "Housing & Development",
    date: "January 28, 2025",
    likes: 180,
    views: 3500,
    featured: false,
  },
  {
    id: 3,
    title: "Kigali’s Luxury Real Estate Market is Growing Fast: Who Can Afford It?",
    thumbnail: logo,
    teaser: "Luxury homes in Kigali are selling for millions—who’s buying them?",
    description: `
      <h2>High-End Properties Becoming More Popular</h2>
      <p>Kigali’s luxury real estate market is attracting investors, with properties in areas like Nyarutarama and Gacuriro selling for <b>over $500,000</b>.</p>
      <ul>
        <li><b>Demand Surge:</b> Rising incomes and foreign investments are driving growth.</li>
        <li><b>Premium Locations:</b> New gated communities and smart apartments are being developed.</li>
        <li><b>Investment Potential:</b> Rental yields remain strong, making Kigali a hotspot for high-end investors.</li>
      </ul>
      <p>However, affordability remains a challenge for many Rwandans, with calls for more mid-range housing options.</p>
    `,
    category: "Luxury Real Estate",
    date: "January 24, 2025",
    likes: 250,
    views: 4700,
    featured: true,
  },
  {
    id: 4,
    title: "Foreign Investors Eye Rwanda’s Real Estate Sector in 2025",
    thumbnail: logo,
    teaser: "Why are foreign investors pouring money into Rwanda’s property market?",
    description: `
      <h2>Why International Investors Are Choosing Rwanda</h2>
      <p>Rwanda's stable economy and investor-friendly policies are attracting foreign real estate buyers.</p>
      <ul>
        <li><b>Key Investors:</b> Developers from China, UAE, and the U.S. are increasing their presence.</li>
        <li><b>Attractive Sectors:</b> Commercial properties, luxury apartments, and mixed-use developments.</li>
        <li><b>Government Incentives:</b> New tax benefits and simplified property registration processes.</li>
      </ul>
      <p>Rwanda’s real estate sector is projected to see <b>over $500 million</b> in foreign direct investments by 2026.</p>
    `,
    category: "Investment & Economy",
    date: "January 20, 2025",
    likes: 190,
    views: 3800,
    featured: false,
  },
  {
    id: 5,
    title: "Land Prices in Rwanda Hit Record Highs in 2025",
    thumbnail: logo,
    teaser: "Kigali land prices have hit all-time highs—should you buy now?",
    description: `
      <h2>Growing Demand Drives Up Land Costs</h2>
      <p>Rwanda's land prices have surged in major cities, with prime plots in Kigali selling for <b>over $300 per square meter</b>.</p>
      <ul>
        <li><b>Key Areas:</b> High demand in Nyarutarama, Kacyiru, and Kimironko.</li>
        <li><b>Speculation:</b> Investors are buying and holding land for future profits.</li>
        <li><b>Government Response:</b> Plans to regulate speculative land buying and promote development.</li>
      </ul>
      <p>While real estate growth is promising, experts warn that land inflation may impact affordability.</p>
    `,
    category: "Land & Property",
    date: "January 15, 2025",
    likes: 210,
    views: 4000,
    featured: true,
  },
  {
    id: 6,
    title:
      "Rwanda’s Rental Market in 2025: What Tenants and Landlords Should Expect",
    thumbnail: logo,
    teaser: "Rent prices in Kigali are rising—what does this mean for tenants?",
    description: `
      <h2>Rental Prices on the Rise</h2>
      <p>Rental costs in Kigali and other urban areas have increased by <b>10-20%</b> in the past year.</p>
      <ul>
        <li><b>Tenant Concerns:</b> Rising costs make housing less affordable for middle-income earners.</li>
        <li><b>Landlord Opportunities:</b> Higher rental demand is boosting profits.</li>
        <li><b>Future Trends:</b> More furnished apartments and co-living spaces are emerging.</li>
      </ul>
      <p>As Rwanda’s population grows, the demand for rental properties will continue increasing.</p>
    `,
    category: "Rental & Leasing",
    date: "January 10, 2025",
    likes: 170,
    views: 3200,
    featured: false,
  },
];

// agents
export const agents = [
  {
    id: 1,
    name: "Joseph KWIZERA",
    email: "josephkwizera@ejarealty.com",
    phone: "+250 788 123 456",
    photo: user1,
    listing: [],
    description: "Expert in commercial and residential property sales.",
    experience: "10+ years",
    speciality: [
      "Property Management",
      "Real Estate Appraising",
      "Apartment Brokerage",
    ],
    call: "250788123456",
    whatsapp: "250788123456",
    joined: "Aug 14, 2024",
    language: "English, Kinyarwanda",
    about:
      "Experienced Real Estate Broker with extensive knowledge in property valuation and market trends, ensuring clients find the best deals.",
    rating: 4.8,
    reviews: [
      {
        reviewer: "Alice M.",
        comment:
          "Joseph was extremely professional and helped me secure my dream apartment!",
        rating: 5,
      },
      {
        reviewer: "David R.",
        comment: "Very knowledgeable and responsive. Highly recommended!",
        rating: 4.7,
      },
      {
        reviewer: "Grace T.",
        comment: "Made the home-buying process seamless and stress-free.",
        rating: 4.8,
      },
    ],
  },
  {
    id: 2,
    name: "NDAMAGE Jean Chrisostome",
    email: "chrisostome@ejarealty.com",
    phone: "+250 788 654 321",
    photo: user2,
    listing: [{ id: 1 }],
    description:
      "Dedicated real estate consultant with a focus on luxury properties.",
    experience: "8+ years",
    speciality: ["Luxury Homes", "Investment Properties", "Market Analysis"],
    call: "250788654321",
    whatsapp: "250788654321",
    joined: "May 22, 2023",
    language: "English, French, Kinyarwanda",
    about:
      "NDAMAGE Jean Chrisostome - Experienced Real Estate Broker With extensive experience in the brokerage of properties, I have honed my skills in navigating the complexities of the real estate market. My deep understanding of property valuation, market trends, and client needs allows me to effectively match buyers with their ideal properties and sellers with the best deals. I am passionate about helping clients make informed decisions and achieve their real estate goals. My commitment to excellence and customer satisfaction has consistently driven successful transactions, fostering long-term relationships with clients and partners alike.",
    rating: 4.9,
    reviews: [
      {
        reviewer: "John K.",
        comment:
          "Sarah helped me find the perfect luxury villa. Her attention to detail is unmatched!",
        rating: 5,
      },
      {
        reviewer: "Pauline N.",
        comment: "Highly professional and provided great insights on market trends.",
        rating: 4.8,
      },
      {
        reviewer: "Eric S.",
        comment:
          "The best experience I've had with a real estate agent. Thank you, Sarah!",
        rating: 4.9,
      },
    ],
  },
  {
    id: 3,
    name: "Michael HABIMANA",
    email: "michaelhabimana@ejarealty.com",
    phone: "+250 788 777 999",
    photo: user3,
    listing: [],
    description: "Real estate strategist specializing in commercial properties.",
    experience: "12+ years",
    speciality: ["Commercial Properties", "Retail Spaces", "Property Investment"],
    call: "250788777999",
    whatsapp: "250788777999",
    joined: "Jan 10, 2022",
    language: "English, Swahili, Kinyarwanda",
    about:
      "Committed to helping businesses find the best commercial spaces to thrive and investors maximize their returns.",
    rating: 4.7,
    reviews: [
      {
        reviewer: "Sandra P.",
        comment:
          "Michael's knowledge of commercial spaces helped us land the perfect office.",
        rating: 4.8,
      },
      {
        reviewer: "James O.",
        comment:
          "A highly experienced agent with a great understanding of property investment.",
        rating: 4.7,
      },
      {
        reviewer: "Beatrice L.",
        comment: "Very professional and helped us secure a prime retail location.",
        rating: 4.6,
      },
    ],
  },
  {
    id: 4,
    name: "Eric NDAYISENGA",
    email: "ericndayisenga@ejarealty.com",
    phone: "+250 788 888 222",
    photo: user1,
    listing: [
      {
        id: 2,
      },
      { id: 4 },
    ],
    description:
      "Specialist in rental and lease agreements with a client-first approach.",
    experience: "6+ years",
    speciality: ["Rental Agreements", "Lease Negotiation", "Tenant Relations"],
    call: "250788888222",
    whatsapp: "250788888222",
    joined: "Nov 5, 2021",
    language: "English, Kinyarwanda",
    about:
      "Passionate about ensuring tenants and landlords have smooth rental experiences with fair agreements and excellent service.",
    rating: 4.6,
    reviews: [
      {
        reviewer: "Tom C.",
        comment:
          "Eric found me a great rental apartment in no time. Highly recommended!",
        rating: 4.7,
      },
      {
        reviewer: "Jessica A.",
        comment:
          "Helped negotiate my lease terms and saved me money. Great service!",
        rating: 4.5,
      },
      {
        reviewer: "Mark E.",
        comment: "Very reliable and always puts the client's interests first.",
        rating: 4.6,
      },
    ],
  },
];

// company details
export const companyDetails = {
  location:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255203.55383057077!2d29.96243136624063!3d-1.9297626221657935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca4258ed8e797%3A0xf32b36a5411d0bc8!2sKigali!5e0!3m2!1sen!2srw!4v1739362567251!5m2!1sen!2srw",
  address: {
    hq: "KG 1 Ave, Kigali - Rwanda",
    branch1: "NR 01, Bugesera",
  },
  name: "EJA REAL ESTATE LTD",
  logo: logo,
  description:
    "EJA Real Estate Ltd is a leading real estate company in Rwanda, providing top-notch services in property management, sales, and rentals. Our team of experienced agents is dedicated to delivering exceptional results and building long-lasting relationships with our clients.",
  website: "https://ejarealestate.com",
  email: {
    primary: "ejarealestate@gmail.com",
    secondary: "info@ejarealestate.com",
  },
  phone: {
    primary: "250788123456",
    secondary: "250781245678",
  },
};

//====================//
//  ADMIN DASHBOARD  //
//==================//

// users list
export const usersDummyList = [
  {
    id: 1,
    name: "John Doe",
    email: "johndoe@email.com",
    role: "admin",
    phone: "+250788123456",
    status: "active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "janesmith@email.com",
    role: "agent",
    phone: "+250788654321",
    status: "active",
  },
  {
    id: 3,
    name: "Alice Brown",
    email: "alicebrown@email.com",
    role: "client",
    phone: "+250784123456",
    status: "inactive",
  },
  {
    id: 4,
    name: "Robert Johnson",
    email: "robertjohnson@email.com",
    role: "admin",
    phone: "+250785123987",
    status: "active",
  },
  {
    id: 5,
    name: "Michael Williams",
    email: "michaelwilliams@email.com",
    role: "agent",
    phone: "+250783987654",
    status: "active",
  },
  {
    id: 6,
    name: "Emily Davis",
    email: "emilydavis@email.com",
    role: "client",
    phone: "+250786321654",
    status: "inactive",
  },
  {
    id: 7,
    name: "Chris Evans",
    email: "chrisevans@email.com",
    role: "agent",
    phone: "+250789654123",
    status: "active",
  },
  {
    id: 8,
    name: "Sophia Wilson",
    email: "sophiawilson@email.com",
    role: "client",
    phone: "+250788112233",
    status: "active",
  },
  {
    id: 9,
    name: "Daniel White",
    email: "danielwhite@email.com",
    role: "agent",
    phone: "+250782334455",
    status: "inactive",
  },
  {
    id: 10,
    name: "Olivia Thomas",
    email: "oliviathomas@email.com",
    role: "admin",
    phone: "+250785667788",
    status: "active",
  },
  {
    id: 11,
    name: "James Miller",
    email: "jamesmiller@email.com",
    role: "client",
    phone: "+250789998877",
    status: "active",
  },
  {
    id: 12,
    name: "Linda Anderson",
    email: "lindaanderson@email.com",
    role: "agent",
    phone: "+250787554433",
    status: "active",
  },
  {
    id: 13,
    name: "Brian Martin",
    email: "brianmartin@email.com",
    role: "client",
    phone: "+250781223344",
    status: "inactive",
  },
  {
    id: 14,
    name: "Nancy Clark",
    email: "nancyclark@email.com",
    role: "admin",
    phone: "+250780112233",
    status: "active",
  },
  {
    id: 15,
    name: "Kevin Walker",
    email: "kevinwalker@email.com",
    role: "agent",
    phone: "+250783445566",
    status: "active",
  },
  {
    id: 16,
    name: "Megan Hall",
    email: "meganhall@email.com",
    role: "client",
    phone: "+250785667788",
    status: "active",
  },
  {
    id: 17,
    name: "William Young",
    email: "williamyoung@email.com",
    role: "agent",
    phone: "+250782998877",
    status: "inactive",
  },
  {
    id: 18,
    name: "Emma Allen",
    email: "emmaallen@email.com",
    role: "admin",
    phone: "+250789334455",
    status: "active",
  },
  {
    id: 19,
    name: "David King",
    email: "davidking@email.com",
    role: "client",
    phone: "+250784556677",
    status: "active",
  },
  {
    id: 20,
    name: "Sarah Wright",
    email: "sarahwright@email.com",
    role: "agent",
    phone: "+250786778899",
    status: "active",
  },
  {
    id: 21,
    name: "Jason Scott",
    email: "jasonscott@email.com",
    role: "client",
    phone: "+250780334455",
    status: "inactive",
  },
  {
    id: 22,
    name: "Michelle Lewis",
    email: "michellelewis@email.com",
    role: "admin",
    phone: "+250783556677",
    status: "active",
  },
  {
    id: 23,
    name: "Paul Harris",
    email: "paulharris@email.com",
    role: "agent",
    phone: "+250788998877",
    status: "active",
  },
  {
    id: 24,
    name: "Rebecca Clark",
    email: "rebeccaclark@email.com",
    role: "client",
    phone: "+250785112233",
    status: "inactive",
  },
  {
    id: 25,
    name: "Andrew Robinson",
    email: "andrewrobinson@email.com",
    role: "admin",
    phone: "+250780998877",
    status: "active",
  },
  {
    id: 26,
    name: "Jessica Turner",
    email: "jessicaturner@email.com",
    role: "agent",
    phone: "+250789223344",
    status: "active",
  },
  {
    id: 27,
    name: "George Adams",
    email: "georgeadams@email.com",
    role: "client",
    phone: "+250784667788",
    status: "active",
  },
  {
    id: 28,
    name: "Patricia Baker",
    email: "patriciabaker@email.com",
    role: "admin",
    phone: "+250782334455",
    status: "active",
  },
  {
    id: 29,
    name: "Joshua Phillips",
    email: "joshuaphillips@email.com",
    role: "agent",
    phone: "+250788556677",
    status: "active",
  },
  {
    id: 30,
    name: "Karen Carter",
    email: "karencarter@email.com",
    role: "client",
    phone: "+250786778899",
    status: "inactive",
  },
  // Add more users up to 50...
];

//latest properties
export const latestProperties = [
  { title: "Kigali, Kagarama", type: "sale", price: 33450, status: "sold" },
  {
    title: "Kigali, Nyarutarama",
    type: "rent",
    price: 1200,
    status: "available",
  },
  {
    title: "Kigali, Kicukiro",
    type: "sale",
    price: 45000,
    status: "available",
  },
  { title: "Kigali, Rebero", type: "rent", price: 1300, status: "available" },
  { title: "Kigali, Kimironko", type: "sale", price: 50000, status: "sold" },
  { title: "Kigali, Kagarama", type: "rent", price: 1000, status: "available" },
  { title: "Kigali, Nyarutarama", type: "sale", price: 60000, status: "sold" },
  {
    title: "Kigali, Kicukiro",
    type: "sale",
    price: 47000,
    status: "available",
  },
  { title: "Kigali, Rebero", type: "rent", price: 1500, status: "available" },
  { title: "Kigali, Kimironko", type: "sale", price: 52000, status: "sold" },
  {
    title: "Kigali, Kagarama",
    type: "sale",
    price: 34000,
    status: "available",
  },
  { title: "Kigali, Nyarutarama", type: "sale", price: 61000, status: "sold" },
  { title: "Kigali, Kicukiro", type: "rent", price: 1400, status: "available" },
  { title: "Kigali, Rebero", type: "sale", price: 49000, status: "sold" },
  {
    title: "Kigali, Kimironko",
    type: "rent",
    price: 1100,
    status: "available",
  },
];
