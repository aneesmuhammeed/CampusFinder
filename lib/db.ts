import prisma from './prisma';

// Define the core types to match our Prisma schema
export interface CollegeDetail {
  id: string;
  name: string;
  description: string;
  location: string;
  state: string;
  fees: number;
  rating: number;
  established: number;
  type: string;
  logoUrl: string;
  coverUrl: string;
  website: string;
  placementAvg: number;
  placementHighest: number;
  courses: {
    id: string;
    name: string;
    duration: string;
    fees: number;
    eligibility: string;
  }[];
  cutoffs: {
    id: string;
    exam: string;
    branch: string;
    category: string;
    gender: string;
    closingRank: number;
  }[];
  reviews: {
    id: string;
    userName: string;
    rating: number;
    comment: string;
    createdAt: string | Date;
  }[];
}

// Highly realistic mock fallback dataset in case the database is not ready
const MOCK_COLLEGES: CollegeDetail[] = [
  {
    id: 'iit-bombay-id',
    name: 'Indian Institute of Technology, Bombay (IITB)',
    description: 'Established in 1958, IIT Bombay is one of the premier public engineering universities in India, globally recognized for its rigorous academics, world-class research facility, and unparalleled placements. The green campus is situated next to Powai Lake in Mumbai.',
    location: 'Mumbai',
    state: 'Maharashtra',
    fees: 220000,
    rating: 4.8,
    established: 1958,
    type: 'IIT',
    logoUrl: 'https://picsum.photos/seed/iitb-logo/150/150',
    coverUrl: 'https://picsum.photos/seed/iitb-cover/1200/600',
    website: 'https://www.iitb.ac.in',
    placementAvg: 23.5,
    placementHighest: 168.0,
    courses: [
      { id: 'iitb-c1', name: 'B.Tech Computer Science & Engineering', duration: '4 Years', fees: 220000, eligibility: 'JEE Advanced' },
      { id: 'iitb-c2', name: 'B.Tech Electronics & Communication', duration: '4 Years', fees: 220000, eligibility: 'JEE Advanced' },
      { id: 'iitb-c3', name: 'B.Tech Mechanical Engineering', duration: '4 Years', fees: 220000, eligibility: 'JEE Advanced' },
      { id: 'iitb-c4', name: 'B.Tech Chemical Engineering', duration: '4 Years', fees: 220000, eligibility: 'JEE Advanced' },
    ],
    cutoffs: [
      { id: 'iitb-f1', exam: 'JEE Advanced', branch: 'Computer Science & Engineering', category: 'General', gender: 'Gender-Neutral', closingRank: 67 },
      { id: 'iitb-f2', exam: 'JEE Advanced', branch: 'Computer Science & Engineering', category: 'OBC', gender: 'Gender-Neutral', closingRank: 42 },
      { id: 'iitb-f3', exam: 'JEE Advanced', branch: 'Computer Science & Engineering', category: 'SC', gender: 'Gender-Neutral', closingRank: 20 },
      { id: 'iitb-f4', exam: 'JEE Advanced', branch: 'Computer Science & Engineering', category: 'ST', gender: 'Gender-Neutral', closingRank: 10 },
      { id: 'iitb-f5', exam: 'JEE Advanced', branch: 'Electronics & Communication', category: 'General', gender: 'Gender-Neutral', closingRank: 290 },
      { id: 'iitb-f6', exam: 'JEE Advanced', branch: 'Mechanical Engineering', category: 'General', gender: 'Gender-Neutral', closingRank: 1400 },
      { id: 'iitb-f7', exam: 'JEE Advanced', branch: 'Chemical Engineering', category: 'General', gender: 'Gender-Neutral', closingRank: 2500 },
    ],
    reviews: [
      { id: 'iitb-r1', userName: 'Aarav Mehta', rating: 5, comment: 'Exceptional peer group and placement opportunities. The campus life is amazing with festivals like Mood Indigo.', createdAt: '2026-02-12T10:00:00Z' },
      { id: 'iitb-r2', userName: 'Neha Sharma', rating: 4.5, comment: 'Superb professors and academic rigor. Main building library has every resource you will ever need.', createdAt: '2026-03-24T14:30:00Z' }
    ]
  },
  {
    id: 'iit-delhi-id',
    name: 'Indian Institute of Technology, Delhi (IITD)',
    description: 'IIT Delhi is a top public research university in New Delhi. Known for its highly competitive startup culture, incubation centers, and strategic location in the capital city, it regularly ranks among the top 2 colleges in NIRF.',
    location: 'New Delhi',
    state: 'Delhi',
    fees: 225000,
    rating: 4.7,
    established: 1961,
    type: 'IIT',
    logoUrl: 'https://picsum.photos/seed/iitd-logo/150/150',
    coverUrl: 'https://picsum.photos/seed/iitd-cover/1200/600',
    website: 'https://home.iitd.ac.in',
    placementAvg: 21.9,
    placementHighest: 150.0,
    courses: [
      { id: 'iitd-c1', name: 'B.Tech Computer Science & Engineering', duration: '4 Years', fees: 225000, eligibility: 'JEE Advanced' },
      { id: 'iitd-c2', name: 'B.Tech Electrical Engineering', duration: '4 Years', fees: 225000, eligibility: 'JEE Advanced' },
      { id: 'iitd-c3', name: 'B.Tech Mechanical Engineering', duration: '4 Years', fees: 225000, eligibility: 'JEE Advanced' },
    ],
    cutoffs: [
      { id: 'iitd-f1', exam: 'JEE Advanced', branch: 'Computer Science & Engineering', category: 'General', gender: 'Gender-Neutral', closingRank: 115 },
      { id: 'iitd-f2', exam: 'JEE Advanced', branch: 'Computer Science & Engineering', category: 'OBC', gender: 'Gender-Neutral', closingRank: 75 },
      { id: 'iitd-f3', exam: 'JEE Advanced', branch: 'Computer Science & Engineering', category: 'SC', gender: 'Gender-Neutral', closingRank: 35 },
      { id: 'iitd-f4', exam: 'JEE Advanced', branch: 'Electrical Engineering', category: 'General', gender: 'Gender-Neutral', closingRank: 550 },
      { id: 'iitd-f5', exam: 'JEE Advanced', branch: 'Mechanical Engineering', category: 'General', gender: 'Gender-Neutral', closingRank: 1800 },
    ],
    reviews: [
      { id: 'iitd-r1', userName: 'Rahul Gupta', rating: 5, comment: 'The tech and entrepreneurial spirit here is unmatched. Extremely supportive alumni network.', createdAt: '2026-01-15T09:15:00Z' },
      { id: 'iitd-r2', userName: 'Anjali Verma', rating: 4, comment: 'Great labs and infrastructure, but the academic pressure during major exams can get very intense.', createdAt: '2026-04-02T11:45:00Z' }
    ]
  },
  {
    id: 'bits-pilani-id',
    name: 'BITS Pilani (Pilani Campus)',
    description: 'Birla Institute of Technology and Science, Pilani is India\'s top private science and engineering institute. Known for its unique "No Attendance Policy" and robust Practice School (internship) system, it attracts the top 1% of scorers.',
    location: 'Pilani',
    state: 'Rajasthan',
    fees: 480000,
    rating: 4.6,
    established: 1964,
    type: 'Private',
    logoUrl: 'https://picsum.photos/seed/bits-logo/150/150',
    coverUrl: 'https://picsum.photos/seed/bits-cover/1200/600',
    website: 'https://www.bits-pilani.ac.in',
    placementAvg: 19.5,
    placementHighest: 60.7,
    courses: [
      { id: 'bits-c1', name: 'B.E. Computer Science', duration: '4 Years', fees: 480000, eligibility: 'BITSAT' },
      { id: 'bits-c2', name: 'B.E. Electronics & Instrumentation', duration: '4 Years', fees: 480000, eligibility: 'BITSAT' },
      { id: 'bits-c3', name: 'B.E. Mechanical Engineering', duration: '4 Years', fees: 480000, eligibility: 'BITSAT' },
    ],
    cutoffs: [
      { id: 'bits-f1', exam: 'BITSAT', branch: 'Computer Science', category: 'General', gender: 'Gender-Neutral', closingRank: 320 },
      { id: 'bits-f2', exam: 'BITSAT', branch: 'Electronics & Instrumentation', category: 'General', gender: 'Gender-Neutral', closingRank: 266 },
      { id: 'bits-f3', exam: 'BITSAT', branch: 'Mechanical Engineering', category: 'General', gender: 'Gender-Neutral', closingRank: 223 },
    ],
    reviews: [
      { id: 'bits-r1', userName: 'Ishaan Sen', rating: 5, comment: 'The freedom of BITS is incredible. Zero attendance requirement lets you explore your coding or startup interests freely.', createdAt: '2026-05-10T12:00:00Z' }
    ]
  },
  {
    id: 'nit-trichy-id',
    name: 'National Institute of Technology, Trichy (NITT)',
    description: 'NIT Trichy is consistently ranked as the number one National Institute of Technology in India. Spread across an expansive 800-acre campus, it offers excellent placements, academic rigor, and a highly active student community.',
    location: 'Tiruchirappalli',
    state: 'Tamil Nadu',
    fees: 145000,
    rating: 4.5,
    established: 1964,
    type: 'NIT',
    logoUrl: 'https://picsum.photos/seed/nitt-logo/150/150',
    coverUrl: 'https://picsum.photos/seed/nitt-cover/1200/600',
    website: 'https://www.nitt.edu',
    placementAvg: 15.8,
    placementHighest: 52.8,
    courses: [
      { id: 'nitt-c1', name: 'B.Tech Computer Science & Engineering', duration: '4 Years', fees: 145000, eligibility: 'JEE Main' },
      { id: 'nitt-c2', name: 'B.Tech Electronics & Communication', duration: '4 Years', fees: 145000, eligibility: 'JEE Main' },
      { id: 'nitt-c3', name: 'B.Tech Electrical & Electronics', duration: '4 Years', fees: 145000, eligibility: 'JEE Main' },
    ],
    cutoffs: [
      { id: 'nitt-f1', exam: 'JEE Main', branch: 'Computer Science & Engineering', category: 'General', gender: 'Gender-Neutral', closingRank: 1000 },
      { id: 'nitt-f2', exam: 'JEE Main', branch: 'Computer Science & Engineering', category: 'OBC', gender: 'Gender-Neutral', closingRank: 450 },
      { id: 'nitt-f3', exam: 'JEE Main', branch: 'Computer Science & Engineering', category: 'SC', gender: 'Gender-Neutral', closingRank: 220 },
      { id: 'nitt-f4', exam: 'JEE Main', branch: 'Electronics & Communication', category: 'General', gender: 'Gender-Neutral', closingRank: 3200 },
      { id: 'nitt-f5', exam: 'JEE Main', branch: 'Electrical & Electronics', category: 'General', gender: 'Gender-Neutral', closingRank: 6400 },
    ],
    reviews: [
      { id: 'nitt-r1', userName: 'Karthik Raja', rating: 4.5, comment: 'Superb coding culture and amazing college festivals like Festember and Pragyan. Hostels are decent.', createdAt: '2026-05-18T16:20:00Z' }
    ]
  },
  {
    id: 'dtu-delhi-id',
    name: 'Delhi Technological University (DTU)',
    description: 'Formerly known as Delhi College of Engineering (DCE), DTU is a premier state public university in Rohini, New Delhi. Famous for its massive batch sizes and outstanding placement statistics, particularly in tech roles.',
    location: 'New Delhi',
    state: 'Delhi',
    fees: 219000,
    rating: 4.4,
    established: 1941,
    type: 'Central',
    logoUrl: 'https://picsum.photos/seed/dtu-logo/150/150',
    coverUrl: 'https://picsum.photos/seed/dtu-cover/1200/600',
    website: 'https://www.dtu.ac.in',
    placementAvg: 16.2,
    placementHighest: 109.0,
    courses: [
      { id: 'dtu-c1', name: 'B.Tech Computer Science & Engineering', duration: '4 Years', fees: 219000, eligibility: 'JEE Main' },
      { id: 'dtu-c2', name: 'B.Tech Software Engineering', duration: '4 Years', fees: 219000, eligibility: 'JEE Main' },
      { id: 'dtu-c3', name: 'B.Tech Electronics & Communication', duration: '4 Years', fees: 219000, eligibility: 'JEE Main' },
    ],
    cutoffs: [
      { id: 'dtu-f1', exam: 'JEE Main', branch: 'Computer Science & Engineering', category: 'General', gender: 'Gender-Neutral', closingRank: 4800 },
      { id: 'dtu-f2', exam: 'JEE Main', branch: 'Computer Science & Engineering', category: 'OBC', gender: 'Gender-Neutral', closingRank: 12000 },
      { id: 'dtu-f3', exam: 'JEE Main', branch: 'Computer Science & Engineering', category: 'SC', gender: 'Gender-Neutral', closingRank: 32000 },
      { id: 'dtu-f4', exam: 'JEE Main', branch: 'Software Engineering', category: 'General', gender: 'Gender-Neutral', closingRank: 8500 },
      { id: 'dtu-f5', exam: 'JEE Main', branch: 'Electronics & Communication', category: 'General', gender: 'Gender-Neutral', closingRank: 14000 },
    ],
    reviews: [
      { id: 'dtu-r1', userName: 'Vikram Singh', rating: 4, comment: 'DTU has an excellent location advantage. Tech opportunities are at par with top IITs, though the student intake is quite large.', createdAt: '2026-03-30T10:00:00Z' }
    ]
  },
  {
    id: 'vit-vellore-id',
    name: 'Vellore Institute of Technology (VIT Vellore)',
    description: 'VIT Vellore is a private research university famous for its high-tech campus, structured administration, and dynamic placement outcomes. Its "Fully Flexible Credit System" (FFCS) lets students choose their classes and teachers.',
    location: 'Vellore',
    state: 'Tamil Nadu',
    fees: 198000,
    rating: 4.1,
    established: 1984,
    type: 'Private',
    logoUrl: 'https://picsum.photos/seed/vit-logo/150/150',
    coverUrl: 'https://picsum.photos/seed/vit-cover/1200/600',
    website: 'https://vit.ac.in',
    placementAvg: 9.2,
    placementHighest: 44.0,
    courses: [
      { id: 'vit-c1', name: 'B.Tech Computer Science & Engineering', duration: '4 Years', fees: 198000, eligibility: 'VITEEE' },
      { id: 'vit-c2', name: 'B.Tech Information Technology', duration: '4 Years', fees: 198000, eligibility: 'VITEEE' },
      { id: 'vit-c3', name: 'B.Tech Electronics & Communication', duration: '4 Years', fees: 198000, eligibility: 'VITEEE' },
    ],
    cutoffs: [
      { id: 'vit-f1', exam: 'VITEEE', branch: 'Computer Science & Engineering', category: 'General', gender: 'Gender-Neutral', closingRank: 9500 },
      { id: 'vit-f2', exam: 'VITEEE', branch: 'Information Technology', category: 'General', gender: 'Gender-Neutral', closingRank: 15000 },
      { id: 'vit-f3', exam: 'VITEEE', branch: 'Electronics & Communication', category: 'General', gender: 'Gender-Neutral', closingRank: 25000 },
    ],
    reviews: [
      { id: 'vit-r1', userName: 'Sameer Gupta', rating: 4, comment: 'Amazing infrastructure and smart classrooms. Extremely diverse campus, though hostel rules can be slightly strict.', createdAt: '2026-04-18T13:40:00Z' }
    ]
  },
  {
    id: 'mit-manipal-id',
    name: 'Manipal Institute of Technology (MIT Manipal)',
    description: 'MIT Manipal is a private self-financing engineering college situated in Manipal, Karnataka. Set amidst picturesque coastal hills, it offers a vibrant student town culture, superb labs, and extensive global exchange programs.',
    location: 'Manipal',
    state: 'Karnataka',
    fees: 335000,
    rating: 4.3,
    established: 1957,
    type: 'Private',
    logoUrl: 'https://picsum.photos/seed/mit-logo/150/150',
    coverUrl: 'https://picsum.photos/seed/mit-cover/1200/600',
    website: 'https://manipal.edu',
    placementAvg: 12.5,
    placementHighest: 54.7,
    courses: [
      { id: 'mit-c1', name: 'B.Tech Computer Science & Engineering', duration: '4 Years', fees: 335000, eligibility: 'MET' },
      { id: 'mit-c2', name: 'B.Tech Data Science', duration: '4 Years', fees: 335000, eligibility: 'MET' },
      { id: 'mit-c3', name: 'B.Tech Mechanical Engineering', duration: '4 Years', fees: 280000, eligibility: 'MET' },
    ],
    cutoffs: [
      { id: 'mit-f1', exam: 'MET', branch: 'Computer Science & Engineering', category: 'General', gender: 'Gender-Neutral', closingRank: 850 },
      { id: 'mit-f2', exam: 'MET', branch: 'Data Science', category: 'General', gender: 'Gender-Neutral', closingRank: 1600 },
      { id: 'mit-f3', exam: 'MET', branch: 'Mechanical Engineering', category: 'General', gender: 'Gender-Neutral', closingRank: 8500 },
    ],
    reviews: [
      { id: 'mit-r1', userName: 'Varun Joshi', rating: 4.5, comment: 'Manipal is the best student town in India. Placements for CSE are amazing and the technical clubs are very active.', createdAt: '2026-05-02T10:15:00Z' }
    ]
  },
  {
    id: 'nit-surathkal-id',
    name: 'National Institute of Technology, Surathkal (NITK)',
    description: 'NITK Surathkal is a premier public engineering college located in Mangalore. It is the only engineering college in India with its own private beach! Famous for its strong core engineering and stellar placement record.',
    location: 'Mangaluru',
    state: 'Karnataka',
    fees: 152000,
    rating: 4.6,
    established: 1960,
    type: 'NIT',
    logoUrl: 'https://picsum.photos/seed/nitk-logo/150/150',
    coverUrl: 'https://picsum.photos/seed/nitk-cover/1200/600',
    website: 'https://www.nitk.ac.in',
    placementAvg: 18.2,
    placementHighest: 57.5,
    courses: [
      { id: 'nitk-c1', name: 'B.Tech Computer Science & Engineering', duration: '4 Years', fees: 152000, eligibility: 'JEE Main' },
      { id: 'nitk-c2', name: 'B.Tech Information Technology', duration: '4 Years', fees: 152000, eligibility: 'JEE Main' },
      { id: 'nitk-c3', name: 'B.Tech Mechanical Engineering', duration: '4 Years', fees: 152000, eligibility: 'JEE Main' },
    ],
    cutoffs: [
      { id: 'nitk-f1', exam: 'JEE Main', branch: 'Computer Science & Engineering', category: 'General', gender: 'Gender-Neutral', closingRank: 1400 },
      { id: 'nitk-f2', exam: 'JEE Main', branch: 'Computer Science & Engineering', category: 'OBC', gender: 'Gender-Neutral', closingRank: 620 },
      { id: 'nitk-f3', exam: 'JEE Main', branch: 'Information Technology', category: 'General', gender: 'Gender-Neutral', closingRank: 2500 },
      { id: 'nitk-f4', exam: 'JEE Main', branch: 'Mechanical Engineering', category: 'General', gender: 'Gender-Neutral', closingRank: 11000 },
    ],
    reviews: [
      { id: 'nitk-r1', userName: 'Pranav Pai', rating: 5, comment: 'Having a beach right across the highway is the ultimate college experience. Placements are legendary here.', createdAt: '2026-05-12T11:00:00Z' }
    ]
  }
];

// Helper to check if DB is working
let isPrismaConnected = true;

async function checkDbConnection(): Promise<boolean> {
  if (!isPrismaConnected) return false;
  try {
    // Quick probe
    await prisma.$executeRawUnsafe('SELECT 1');
    isPrismaConnected = true;
    return true;
  } catch (e) {
    console.warn('DB Connection not available, falling back to static Mock Database layer.');
    isPrismaConnected = false;
    return false;
  }
}

// 1. Fetch Colleges with complex filtering & search
export async function getColleges(filters: {
  search?: string;
  state?: string;
  type?: string;
  feeMax?: number;
  ratingMin?: number;
  savedIds?: string[];
}) {
  const { search, state, type, feeMax, ratingMin, savedIds } = filters;

  const dbConnected = await checkDbConnection();

  if (dbConnected) {
    try {
      // Build Prisma query dynamically
      const whereClause: any = {};

      if (search) {
        whereClause.OR = [
          { name: { contains: search } },
          { location: { contains: search } },
          { state: { contains: search } }
        ];
      }

      if (state) {
        whereClause.state = { contains: state };
      }

      if (type && type !== 'All') {
        whereClause.type = type;
      }

      if (feeMax) {
        whereClause.fees = { lte: feeMax };
      }

      if (ratingMin) {
        whereClause.rating = { gte: ratingMin };
      }

      if (savedIds && savedIds.length > 0) {
        whereClause.id = { in: savedIds };
      }

      const colleges = await prisma.college.findMany({
        where: whereClause,
        orderBy: { rating: 'desc' }
      });

      return colleges;
    } catch (e) {
      console.error('Error fetching colleges from Prisma, falling back to Mock', e);
    }
  }

  // Fallback Mock Logic
  return MOCK_COLLEGES.filter(col => {
    if (search) {
      const query = search.toLowerCase();
      const match = col.name.toLowerCase().includes(query) || 
                    col.location.toLowerCase().includes(query) || 
                    col.state.toLowerCase().includes(query);
      if (!match) return false;
    }

    if (state && !col.state.toLowerCase().includes(state.toLowerCase())) {
      return false;
    }

    if (type && type !== 'All' && col.type !== type) {
      return false;
    }

    if (feeMax && col.fees > feeMax) {
      return false;
    }

    if (ratingMin && col.rating < ratingMin) {
      return false;
    }

    if (savedIds && savedIds.length > 0 && !savedIds.includes(col.id)) {
      return false;
    }

    return true;
  });
}

// 2. Fetch single college detail
export async function getCollegeById(id: string): Promise<CollegeDetail | null> {
  const dbConnected = await checkDbConnection();

  if (dbConnected) {
    try {
      const college = await prisma.college.findUnique({
        where: { id },
        include: {
          courses: true,
          cutoffs: true,
          reviews: {
            orderBy: { createdAt: 'desc' }
          }
        }
      });
      if (college) {
        return college as unknown as CollegeDetail;
      }
    } catch (e) {
      console.error(`Error fetching college id ${id} from Prisma, falling back to Mock`, e);
    }
  }

  // Fallback Mock search
  const found = MOCK_COLLEGES.find(col => col.id === id);
  return found || null;
}

// 3. Add dynamic user review
export async function addReview(collegeId: string, userName: string, rating: number, comment: string) {
  const dbConnected = await checkDbConnection();

  if (dbConnected) {
    try {
      const newReview = await prisma.review.create({
        data: {
          collegeId,
          userName,
          rating,
          comment
        }
      });

      // Dynamically recalculate average college rating
      const reviews = await prisma.review.findMany({ where: { collegeId } });
      const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
      
      await prisma.college.update({
        where: { id: collegeId },
        data: { rating: parseFloat(avgRating.toFixed(1)) }
      });

      return newReview;
    } catch (e) {
      console.error('Error inserting review inside Prisma, saving to local list', e);
    }
  }

  // Fallback Mock insertion
  const college = MOCK_COLLEGES.find(col => col.id === collegeId);
  if (college) {
    const newMockReview = {
      id: `mock-r-${Date.now()}`,
      userName,
      rating,
      comment,
      createdAt: new Date().toISOString()
    };
    college.reviews.unshift(newMockReview);

    // Recalculate average
    const avg = college.reviews.reduce((sum, r) => sum + r.rating, 0) / college.reviews.length;
    college.rating = parseFloat(avg.toFixed(1));
    return newMockReview;
  }

  return null;
}

// 4. Prediction Matching Logic
export async function predictColleges(filters: {
  exam: string;
  rank: number;
  category: string;
}) {
  const { exam, rank, category } = filters;

  const dbConnected = await checkDbConnection();

  if (dbConnected) {
    try {
      // Find cutoffs where closingRank >= rank matching exam and category
      const matchingCutoffs = await prisma.cutoff.findMany({
        where: {
          exam,
          category,
          closingRank: { gte: rank }
        },
        include: {
          college: true
        },
        orderBy: {
          closingRank: 'asc' // Best fit close to cutoff first
        }
      });

      // Deduplicate colleges and categorize probability
      const resultsMap = new Map<string, any>();
      for (const cutoff of matchingCutoffs) {
        if (!resultsMap.has(cutoff.collegeId)) {
          // Probability calculation
          // If rank is far below closing rank (e.g. rank is 200, closing rank is 1000): highly likely
          // If rank is very close (e.g. rank is 950, closing rank is 1000): reach
          const diff = cutoff.closingRank - rank;
          const ratio = diff / cutoff.closingRank;
          
          let probability: 'Highly Likely' | 'Target' | 'Reach' = 'Reach';
          if (ratio > 0.40) probability = 'Highly Likely';
          else if (ratio > 0.10) probability = 'Target';

          resultsMap.set(cutoff.collegeId, {
            college: cutoff.college,
            branch: cutoff.branch,
            closingRank: cutoff.closingRank,
            probability
          });
        }
      }

      return Array.from(resultsMap.values());
    } catch (e) {
      console.error('Error calculating predictions with Prisma, using Mock data instead', e);
    }
  }

  // Fallback Mock Prediction Logic
  const results: any[] = [];
  for (const col of MOCK_COLLEGES) {
    const matchingCutoff = col.cutoffs.find(
      cut => cut.exam === exam && cut.category === category && cut.closingRank >= rank
    );

    if (matchingCutoff) {
      const diff = matchingCutoff.closingRank - rank;
      const ratio = diff / matchingCutoff.closingRank;

      let probability: 'Highly Likely' | 'Target' | 'Reach' = 'Reach';
      if (ratio > 0.40) probability = 'Highly Likely';
      else if (ratio > 0.10) probability = 'Target';

      results.push({
        college: {
          id: col.id,
          name: col.name,
          location: col.location,
          state: col.state,
          fees: col.fees,
          rating: col.rating,
          logoUrl: col.logoUrl,
          coverUrl: col.coverUrl,
          placementAvg: col.placementAvg,
          placementHighest: col.placementHighest,
          type: col.type
        },
        branch: matchingCutoff.branch,
        closingRank: matchingCutoff.closingRank,
        probability
      });
    }
  }

  return results.sort((a, b) => a.closingRank - b.closingRank);
}
