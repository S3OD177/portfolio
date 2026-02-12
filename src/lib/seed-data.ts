import { prisma } from "@/lib/prisma";

export async function seedDatabase() {
  // Clear existing data
  await prisma.language.deleteMany();
  await prisma.membership.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.education.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.project.deleteMany();
  await prisma.contactInfo.deleteMany();
  await prisma.about.deleteMany();

  // About
  await prisma.about.create({
    data: {
      fullName: "Saud Albin Zaid",
      title: "IT Specialist",
      summary:
        "A proactive Computer Science graduate from King Faisal University with experience in IT support, systems administration, and e-learning technology. Skilled in troubleshooting, system configuration, and network management, with hands-on experience as an IT Specialist at SyncStore. Certified in cybersecurity and technical support, committed to enhancing system performance and reliability.",
    },
  });

  // Contact Info
  await prisma.contactInfo.create({
    data: {
      email: "salbinzaid@gmail.com",
      phone: "+966 535 787 635",
      location: "Saudi Arabia",
      linkedinUrl: "https://www.linkedin.com/in/saud-albin-zaid",
    },
  });

  // Experiences
  await prisma.experience.createMany({
    data: [
      {
        company: "Al-Matjar Al-Mutazamin Commercial (SyncStore)",
        position: "IT Specialist",
        location: "Saudi Arabia",
        startDate: new Date("2020-03-01"),
        description:
          "Providing assistance and troubleshooting for users experiencing technical problems. Configuring and overseeing the operation of systems and network infrastructure. Managing regular updates and ensuring the functionality of hardware and software systems. Ensuring system performance and reliability through ongoing monitoring and maintenance.",
        isCurrent: true,
        sortOrder: 1,
      },
      {
        company: "King Faisal University",
        position: "Cooperative Training - E-Learning and Information Technology",
        location: "Saudi Arabia",
        startDate: new Date("2024-06-01"),
        endDate: new Date("2024-08-31"),
        description:
          "Assisted in managing and troubleshooting e-learning platforms and provided technical support. Collaborated with faculty to develop e-learning materials. Collected and analyzed engagement data to generate reports and improve e-learning strategies. Supported faculty training and created user guides.",
        isCurrent: false,
        sortOrder: 2,
      },
    ],
  });

  // Education
  await prisma.education.create({
    data: {
      institution: "King Faisal University",
      degree: "Bachelor's Degree",
      fieldOfStudy: "Computer Science",
      endDate: new Date("2024-01-01"),
      description: "Accredited by ABET",
      sortOrder: 1,
    },
  });

  // Certificates
  await prisma.certificate.createMany({
    data: [
      {
        name: "ITIL\u00AE 4 Foundation",
        issuer: "PeopleCert",
        issueDate: new Date("2025-01-01"),
        sortOrder: 1,
      },
      {
        name: "Cyber Threat Management",
        issuer: "Cisco",
        issueDate: new Date("2024-01-01"),
        sortOrder: 2,
      },
      {
        name: "Endpoint Security",
        issuer: "Cisco",
        issueDate: new Date("2024-01-01"),
        sortOrder: 3,
      },
      {
        name: "Technical Support Fundamentals",
        issuer: "Google (Coursera)",
        issueDate: new Date("2022-01-01"),
        sortOrder: 4,
      },
    ],
  });

  // Skills
  await prisma.skill.createMany({
    data: [
      { name: "Network Configuration & Monitoring", category: "TECHNICAL", sortOrder: 1 },
      { name: "System Administration", category: "TECHNICAL", sortOrder: 2 },
      { name: "Serverless Platforms (Vercel, Netlify, CloudFlare)", category: "TECHNICAL", sortOrder: 3 },
      { name: "Cloud Computing Fundamentals", category: "TECHNICAL", sortOrder: 4 },
      { name: "IT Project Management", category: "TECHNICAL", sortOrder: 5 },
      { name: "PostgreSQL", category: "TECHNICAL", sortOrder: 6 },
      { name: "Git & GitHub", category: "TECHNICAL", sortOrder: 7 },
      { name: "Endpoint Security", category: "TECHNICAL", sortOrder: 8 },
      { name: "Troubleshooting & Technical Support", category: "TECHNICAL", sortOrder: 9 },
      { name: "CI/CD", category: "TECHNICAL", sortOrder: 10 },
      { name: "Adaptability", category: "SOFT", sortOrder: 11 },
      { name: "Analytical Skills", category: "SOFT", sortOrder: 12 },
      { name: "Critical Thinking", category: "SOFT", sortOrder: 13 },
      { name: "Problem-Solving", category: "SOFT", sortOrder: 14 },
      { name: "Attention to Detail", category: "SOFT", sortOrder: 15 },
      { name: "Time Management", category: "SOFT", sortOrder: 16 },
      { name: "Communication Skills", category: "SOFT", sortOrder: 17 },
      { name: "Teamwork", category: "SOFT", sortOrder: 18 },
      { name: "Creativity", category: "SOFT", sortOrder: 19 },
      { name: "Continuous Learning", category: "SOFT", sortOrder: 20 },
    ],
  });

  // Projects
  await prisma.project.create({
    data: {
      title: "FolioHub",
      description:
        "A cloud-based portfolio platform enabling professionals to create, manage, and share their portfolios online.",
      techStack: ["Next.js", "PostgreSQL", "Tailwind CSS", "Vercel"],
      isFeatured: true,
      sortOrder: 1,
    },
  });

  // Memberships
  await prisma.membership.create({
    data: {
      organization: "Saudi Council of Engineers (SCE)",
      role: "Specialist Member",
      sortOrder: 1,
    },
  });

  // Languages
  await prisma.language.createMany({
    data: [
      { name: "Arabic", proficiency: "NATIVE", sortOrder: 1 },
      { name: "English", proficiency: "FLUENT", sortOrder: 2 },
    ],
  });
}
