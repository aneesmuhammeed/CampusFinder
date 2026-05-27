import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing existing database...');
  await prisma.savedItem.deleteMany({});
  await prisma.review.deleteMany({});
  await prisma.cutoff.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.college.deleteMany({});

  console.log('Seeding new data...');

  const collegesData = [
    {
      name: 'Indian Institute of Technology, Bombay (IITB)',
      description: 'Established in 1958, IIT Bombay is one of the premier public engineering universities in India, globally recognized for its rigorous academics, world-class research facility, and unparalleled placements. The green campus is situated next to Powai Lake in Mumbai.',
      location: 'Mumbai',
      state: 'Maharashtra',
      fees: 220000,
      rating: 4.8,
      established: 1958,
      type: 'IIT',
      logoUrl: 'https://picsum.photos/seed/3r4nro/150/150',
      coverUrl: 'https://picsum.photos/seed/bdw7c/1200/600',
      website: 'https://www.iitb.ac.in',
      placementAvg: 23.5,
      placementHighest: 168.0,
      courses: {
        create: [
          { name: 'B.Tech Computer Science & Engineering', duration: '4 Years', fees: 220000, eligibility: 'JEE Advanced' },
          { name: 'B.Tech Electronics & Communication', duration: '4 Years', fees: 220000, eligibility: 'JEE Advanced' },
          { name: 'B.Tech Mechanical Engineering', duration: '4 Years', fees: 220000, eligibility: 'JEE Advanced' },
          { name: 'B.Tech Chemical Engineering', duration: '4 Years', fees: 220000, eligibility: 'JEE Advanced' },
        ]
      },
      cutoffs: {
        create: [
          { exam: 'JEE Advanced', branch: 'Computer Science & Engineering', category: 'General', closingRank: 67 },
          { exam: 'JEE Advanced', branch: 'Computer Science & Engineering', category: 'OBC', closingRank: 42 },
          { exam: 'JEE Advanced', branch: 'Computer Science & Engineering', category: 'SC', closingRank: 20 },
          { exam: 'JEE Advanced', branch: 'Computer Science & Engineering', category: 'ST', closingRank: 10 },
          { exam: 'JEE Advanced', branch: 'Electronics & Communication', category: 'General', closingRank: 290 },
          { exam: 'JEE Advanced', branch: 'Electronics & Communication', category: 'OBC', closingRank: 180 },
          { exam: 'JEE Advanced', branch: 'Mechanical Engineering', category: 'General', closingRank: 1400 },
          { exam: 'JEE Advanced', branch: 'Chemical Engineering', category: 'General', closingRank: 2500 },
        ]
      },
      reviews: {
        create: [
          { userName: 'Aarav Mehta', rating: 5, comment: 'Exceptional peer group and placement opportunities. The campus life is amazing with festivals like Mood Indigo.' },
          { userName: 'Neha Sharma', rating: 4.5, comment: 'Superb professors and academic rigor. Main building library has every resource you will ever need.' }
        ]
      }
    },
    {
      name: 'Indian Institute of Technology, Delhi (IITD)',
      description: 'IIT Delhi is a top public research university in New Delhi. Known for its highly competitive startup culture, incubation centers, and strategic location in the capital city, it regularly ranks among the top 2 colleges in NIRF.',
      location: 'New Delhi',
      state: 'Delhi',
      fees: 225000,
      rating: 4.7,
      established: 1961,
      type: 'IIT',
      logoUrl: 'https://picsum.photos/seed/af4y2c/150/150',
      coverUrl: 'https://picsum.photos/seed/ok668s/1200/600',
      website: 'https://home.iitd.ac.in',
      placementAvg: 21.9,
      placementHighest: 150.0,
      courses: {
        create: [
          { name: 'B.Tech Computer Science & Engineering', duration: '4 Years', fees: 225000, eligibility: 'JEE Advanced' },
          { name: 'B.Tech Electrical Engineering', duration: '4 Years', fees: 225000, eligibility: 'JEE Advanced' },
          { name: 'B.Tech Mechanical Engineering', duration: '4 Years', fees: 225000, eligibility: 'JEE Advanced' },
        ]
      },
      cutoffs: {
        create: [
          { exam: 'JEE Advanced', branch: 'Computer Science & Engineering', category: 'General', closingRank: 115 },
          { exam: 'JEE Advanced', branch: 'Computer Science & Engineering', category: 'OBC', closingRank: 75 },
          { exam: 'JEE Advanced', branch: 'Computer Science & Engineering', category: 'SC', closingRank: 35 },
          { exam: 'JEE Advanced', branch: 'Electrical Engineering', category: 'General', closingRank: 550 },
          { exam: 'JEE Advanced', branch: 'Mechanical Engineering', category: 'General', closingRank: 1800 },
        ]
      },
      reviews: {
        create: [
          { userName: 'Rahul Gupta', rating: 5, comment: 'The tech and entrepreneurial spirit here is unmatched. Extremely supportive alumni network.' },
          { userName: 'Anjali Verma', rating: 4, comment: 'Great labs and infrastructure, but the academic pressure during major exams can get very intense.' }
        ]
      }
    },
    {
      name: 'BITS Pilani (Pilani Campus)',
      description: 'Birla Institute of Technology and Science, Pilani is India\'s top private science and engineering institute. Known for its unique "No Attendance Policy" and robust Practice School (internship) system, it attracts the top 1% of scorers.',
      location: 'Pilani',
      state: 'Rajasthan',
      fees: 480000,
      rating: 4.6,
      established: 1964,
      type: 'Private',
      logoUrl: 'https://picsum.photos/seed/n2zuu/150/150',
      coverUrl: 'https://picsum.photos/seed/i17g6/1200/600',
      website: 'https://www.bits-pilani.ac.in',
      placementAvg: 19.5,
      placementHighest: 60.7,
      courses: {
        create: [
          { name: 'B.E. Computer Science', duration: '4 Years', fees: 480000, eligibility: 'BITSAT' },
          { name: 'B.E. Electronics & Instrumentation', duration: '4 Years', fees: 480000, eligibility: 'BITSAT' },
          { name: 'B.E. Mechanical Engineering', duration: '4 Years', fees: 480000, eligibility: 'BITSAT' },
        ]
      },
      cutoffs: {
        create: [
          { exam: 'BITSAT', branch: 'Computer Science', category: 'General', closingRank: 320 }, // out of 390
          { exam: 'BITSAT', branch: 'Electronics & Instrumentation', category: 'General', closingRank: 266 },
          { exam: 'BITSAT', branch: 'Mechanical Engineering', category: 'General', closingRank: 223 },
        ]
      },
      reviews: {
        create: [
          { userName: 'Ishaan Sen', rating: 5, comment: 'The freedom of BITS is incredible. Zero attendance requirement lets you explore your coding or startup interests freely.' }
        ]
      }
    },
    {
      name: 'National Institute of Technology, Trichy (NITT)',
      description: 'NIT Trichy is consistently ranked as the number one National Institute of Technology in India. Spread across an expansive 800-acre campus, it offers excellent placements, academic rigor, and a highly active student community.',
      location: 'Tiruchirappalli',
      state: 'Tamil Nadu',
      fees: 145000,
      rating: 4.5,
      established: 1964,
      type: 'NIT',
      logoUrl: 'https://picsum.photos/seed/ppic6/150/150',
      coverUrl: 'https://picsum.photos/seed/qhqeko/1200/600',
      website: 'https://www.nitt.edu',
      placementAvg: 15.8,
      placementHighest: 52.8,
      courses: {
        create: [
          { name: 'B.Tech Computer Science & Engineering', duration: '4 Years', fees: 145000, eligibility: 'JEE Main' },
          { name: 'B.Tech Electronics & Communication', duration: '4 Years', fees: 145000, eligibility: 'JEE Main' },
          { name: 'B.Tech Electrical & Electronics', duration: '4 Years', fees: 145000, eligibility: 'JEE Main' },
        ]
      },
      cutoffs: {
        create: [
          { exam: 'JEE Main', branch: 'Computer Science & Engineering', category: 'General', closingRank: 1000 },
          { exam: 'JEE Main', branch: 'Computer Science & Engineering', category: 'OBC', closingRank: 450 },
          { exam: 'JEE Main', branch: 'Computer Science & Engineering', category: 'SC', closingRank: 220 },
          { exam: 'JEE Main', branch: 'Electronics & Communication', category: 'General', closingRank: 3200 },
          { exam: 'JEE Main', branch: 'Electrical & Electronics', category: 'General', closingRank: 6400 },
        ]
      },
      reviews: {
        create: [
          { userName: 'Karthik Raja', rating: 4.5, comment: 'Superb coding culture and amazing college festivals like Festember and Pragyan. Hostels are decent.' }
        ]
      }
    },
    {
      name: 'Delhi Technological University (DTU)',
      description: 'Formerly known as Delhi College of Engineering (DCE), DTU is a premier state public university in Rohini, New Delhi. Famous for its massive batch sizes and outstanding placement statistics, particularly in tech roles.',
      location: 'New Delhi',
      state: 'Delhi',
      fees: 219000,
      rating: 4.4,
      established: 1941,
      type: 'Central',
      logoUrl: 'https://picsum.photos/seed/6pol1/150/150',
      coverUrl: 'https://picsum.photos/seed/8d8yn/1200/600',
      website: 'https://www.dtu.ac.in',
      placementAvg: 16.2,
      placementHighest: 109.0,
      courses: {
        create: [
          { name: 'B.Tech Computer Science & Engineering', duration: '4 Years', fees: 219000, eligibility: 'JEE Main' },
          { name: 'B.Tech Software Engineering', duration: '4 Years', fees: 219000, eligibility: 'JEE Main' },
          { name: 'B.Tech Electronics & Communication', duration: '4 Years', fees: 219000, eligibility: 'JEE Main' },
        ]
      },
      cutoffs: {
        create: [
          { exam: 'JEE Main', branch: 'Computer Science & Engineering', category: 'General', closingRank: 4800 },
          { exam: 'JEE Main', branch: 'Computer Science & Engineering', category: 'OBC', closingRank: 12000 },
          { exam: 'JEE Main', branch: 'Computer Science & Engineering', category: 'SC', closingRank: 32000 },
          { exam: 'JEE Main', branch: 'Software Engineering', category: 'General', closingRank: 8500 },
          { exam: 'JEE Main', branch: 'Electronics & Communication', category: 'General', closingRank: 14000 },
        ]
      },
      reviews: {
        create: [
          { userName: 'Vikram Singh', rating: 4, comment: 'DTU has an excellent location advantage. Tech opportunities are at par with top IITs, though the student intake is quite large.' }
        ]
      }
    },
    {
      name: 'Vellore Institute of Technology (VIT Vellore)',
      description: 'VIT Vellore is a private research university famous for its high-tech campus, structured administration, and dynamic placement outcomes. Its "Fully Flexible Credit System" (FFCS) lets students choose their classes and teachers.',
      location: 'Vellore',
      state: 'Tamil Nadu',
      fees: 198000,
      rating: 4.1,
      established: 1984,
      type: 'Private',
      logoUrl: 'https://picsum.photos/seed/mmmyls/150/150',
      coverUrl: 'https://picsum.photos/seed/apirto/1200/600',
      website: 'https://vit.ac.in',
      placementAvg: 9.2,
      placementHighest: 44.0,
      courses: {
        create: [
          { name: 'B.Tech Computer Science & Engineering', duration: '4 Years', fees: 198000, eligibility: 'VITEEE' },
          { name: 'B.Tech Information Technology', duration: '4 Years', fees: 198000, eligibility: 'VITEEE' },
          { name: 'B.Tech Electronics & Communication', duration: '4 Years', fees: 198000, eligibility: 'VITEEE' },
        ]
      },
      cutoffs: {
        create: [
          { exam: 'VITEEE', branch: 'Computer Science & Engineering', category: 'General', closingRank: 9500 }, // Category 1 cutoffs
          { exam: 'VITEEE', branch: 'Information Technology', category: 'General', closingRank: 15000 },
          { exam: 'VITEEE', branch: 'Electronics & Communication', category: 'General', closingRank: 25000 },
        ]
      },
      reviews: {
        create: [
          { userName: 'Sameer Gupta', rating: 4, comment: 'Amazing infrastructure and smart classrooms. Extremely diverse campus, though hostel rules can be slightly strict.' }
        ]
      }
    },
    {
      name: 'Manipal Institute of Technology (MIT Manipal)',
      description: 'MIT Manipal is a private self-financing engineering college situated in Manipal, Karnataka. Set amidst picturesque coastal hills, it offers a vibrant student town culture, superb labs, and extensive global exchange programs.',
      location: 'Manipal',
      state: 'Karnataka',
      fees: 335000,
      rating: 4.3,
      established: 1957,
      type: 'Private',
      logoUrl: 'https://picsum.photos/seed/vciva/150/150',
      coverUrl: 'https://picsum.photos/seed/oq661f/1200/600',
      website: 'https://manipal.edu',
      placementAvg: 12.5,
      placementHighest: 54.7,
      courses: {
        create: [
          { name: 'B.Tech Computer Science & Engineering', duration: '4 Years', fees: 335000, eligibility: 'MET' },
          { name: 'B.Tech Data Science', duration: '4 Years', fees: 335000, eligibility: 'MET' },
          { name: 'B.Tech Mechanical Engineering', duration: '4 Years', fees: 280000, eligibility: 'MET' },
        ]
      },
      cutoffs: {
        create: [
          { exam: 'MET', branch: 'Computer Science & Engineering', category: 'General', closingRank: 850 },
          { exam: 'MET', branch: 'Data Science', category: 'General', closingRank: 1600 },
          { exam: 'MET', branch: 'Mechanical Engineering', category: 'General', closingRank: 8500 },
        ]
      },
      reviews: {
        create: [
          { userName: 'Varun Joshi', rating: 4.5, comment: 'Manipal is the best student town in India. Placements for CSE are amazing and the technical clubs are very active.' }
        ]
      }
    },
    {
      name: 'National Institute of Technology, Surathkal (NITK)',
      description: 'NITK Surathkal is a premier public engineering college located in Mangalore. It is the only engineering college in India with its own private beach! Famous for its strong core engineering and stellar placement record.',
      location: 'Mangaluru',
      state: 'Karnataka',
      fees: 152000,
      rating: 4.6,
      established: 1960,
      type: 'NIT',
      logoUrl: 'https://picsum.photos/seed/j9g6u/150/150',
      coverUrl: 'https://picsum.photos/seed/6li5nj/1200/600',
      website: 'https://www.nitk.ac.in',
      placementAvg: 18.2,
      placementHighest: 57.5,
      courses: {
        create: [
          { name: 'B.Tech Computer Science & Engineering', duration: '4 Years', fees: 152000, eligibility: 'JEE Main' },
          { name: 'B.Tech Information Technology', duration: '4 Years', fees: 152000, eligibility: 'JEE Main' },
          { name: 'B.Tech Mechanical Engineering', duration: '4 Years', fees: 152000, eligibility: 'JEE Main' },
        ]
      },
      cutoffs: {
        create: [
          { exam: 'JEE Main', branch: 'Computer Science & Engineering', category: 'General', closingRank: 1400 },
          { exam: 'JEE Main', branch: 'Computer Science & Engineering', category: 'OBC', closingRank: 620 },
          { exam: 'JEE Main', branch: 'Information Technology', category: 'General', closingRank: 2500 },
          { exam: 'JEE Main', branch: 'Mechanical Engineering', category: 'General', closingRank: 11000 },
        ]
      },
      reviews: {
        create: [
          { userName: 'Pranav Pai', rating: 5, comment: 'Having a beach right across the highway is the ultimate college experience. Placements are legendary here.' }
        ]
      }
    }
  ];

  for (const college of collegesData) {
    const created = await prisma.college.create({
      data: college
    });
    console.log(`Seeded college: ${created.name}`);
  }

  // Create a default demo user for authentication and saved item testing
  const demoUser = await prisma.user.create({
    data: {
      email: 'demo@qurocare.com',
      password: 'password123', // Under production, this would be hashed
      name: 'Demo Student'
    }
  });
  console.log(`Seeded demo user: ${demoUser.email}`);

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
