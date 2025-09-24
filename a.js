const data = [
  {
    key: 2,
    title: "Travel in the past was very different from nowadays.",
    sentences: [
      "In the past, only rich people could afford to travel.",
      "The invention of trains and cars made travel easier and affordable for everyone.",
      "After these two means of transportation, travel was also made easier with airplanes.",
      "Flying was so fast so it helps people to travel especially for holiday and business.",
      "Nowadays, traveling to different parts of the world is easier due to ongoing improvements in transportation technology.",
    ],
  },
  {
    key: 3,
    title:
      "Over the years, people’s eating habits have changed a lot as they become more aware of their health.",
    sentences: [
      "In the past, meals were often filled with sugar and unhealthy fats.",
      "Limited access to fresh produce made healthy eating much more difficult years ago.",
      "Modern diets now focus on fresh, whole foods rather than processed ones.",
      "Nutritionists today educate people on how to plan balanced and nutritious meals.",
      "Nowadays, mobile apps help track calories and suggest healthy recipes to support a healthier lifestyle.",
    ],
  },
  {
    key: 0,
    title:
      "Many people dream of becoming a famous singer, but only a few achieve it.",
    sentences: [
      "He is a famous singer who is loved by many fans.",
      "At the age of fifteen, he studied music at a special school.",
      "Before becoming famous, he had to practice very hard every day.",
      "With his unique style and clothes, he soon attracted attention.",
      "Thanks to his talent and style, he became more and more famous and well-known.",
    ],
  },
  {
    key: 0,
    title:
      "Last weekend, it was good weather, so the town had a family sport day in the park.",
    sentences: [
      "It started on early Saturday morning with a ten-mile race for adults.",
      "Sixty men and women ran in this, and Ms Kamur won with a very fast time.",
      "After receiving her prize, the children's activities and competitions began.",
      "These included football, swimming and jumping and the children had lots of fun.",
      "They were all hungry after all of these, so the children had tasty food and drinks with their parents.",
    ],
  },
  {
    key: 0,
    title:
      "Writing about places is an exciting way to share your knowledge and experience.",
    sentences: [
      "Before writing about a place, you need to do some research on it.",
      "It is important to learn about the people and the history there carefully.",
      "Even if you cannot visit the place, your writing will still look similar to real experiences.",
      "You should also compare that place with your own country.",
      "Such comparisons will make your writing more interesting and meaningful.",
    ],
  },
  {
    key: 0,
    title:
      "Last night I went to the cafe opening The Corner Cafe near my house.",
    sentences: [
      "It was full of people and the staff were busy on their opening day.",
      "Despite the crowd, they got me a nice table and gave me the menu.",
      "When I first looked at it, I was disappointed because I hoped for a variety of dishes.",
      "I had to choose one so I chose the most expensive sandwich.",
      "It tasted really good with cheese topping and I will definitely return here.",
    ],
  },
  {
    key: 0,
    title:
      "Last weekend, the community organized a special event to inspire people to live healthier lives.",
    sentences: [
      "The wellness fair took place on Saturday afternoon, promoting healthy habits and lifestyles.",
      "Over sixty participants joined the event, with Dr. Patel leading an exciting fitness workshop.",
      "The fair also featured activities such as cooking demonstrations, mindfulness sessions, and a fun run.",
      "After the workshops, prizes were given to those with the most creative health posters.",
      "Families had a great time sampling healthy snacks and learning useful tips about overall wellness.",
    ],
  },
  {
    key: 1,
    title:
      "In 1985, the Grand Café in France showed the first ever commercial film.",
    sentences: [
      "Films from that period were very different from films of today.",
      "This is because they were all in black and white, and they had no sound.",
      "In addition to technical limitations, the film producers also had a limited budget.",
      "This lack of money affected mainly actors, and they didn't earn a lot of money.",
      "Things have changed over time, and some of them now earn millions of dollars after appearing in films.",
    ],
  },
  {
    key: 0,
    title:
      "Last Sunday, the community organized a cultural festival to honor traditions and bring people together.",
    sentences: [
      "The cultural festival was held on Sunday, celebrating local traditions.",
      "About 70 people participated, with Ms. Nguyen leading a dance group.",
      "Activities included pottery workshops, folk music, and food tasting.",
      "Families enjoyed the event, taking photos and sharing meals.",
      "After the main event, awards were given for the best costume.",
    ],
  },
  {
    key: 1,
    title: "This year, the university will hold its Open Day in June.",
    sentences: [
      "Before the open day, you should call or email us so that we can take your personal details.",
      "With this information, we will create an identification card for you to collect on arrival.",
      "You must show it to access the introductory talk and the morning lectures.",
      "Each visitor can join a question-and-answer session with current students.",
      "Following these presentations, you will have the opportunity to visit different departments.",
    ],
  },
  {
    key: 0,
    title: "Last Saturday, a live music show was held in town park.",
    sentences: [
      "The local government planned, funded and paid for everything.",
      "Because it was free, more than 5,000 people attended.",
      "People came early and sat in nearby shops waiting for the start time.",
      "The staff were very busy but still closed the shop early to watch the singer.",
      "The singer performed for 2 hours, everyone had great fun.",
    ],
  },
  {
    key: 1,
    title:
      "Last Saturday the town hosted a major music event that drew people from across the region.",
    sentences: [
      "The event was carefully planned, fully financed, and strongly supported by the local authorities.",
      "As a result, entry was completely free, and nearly five thousand people attended.",
      "Many visitors came early and spent time browsing the local shops before the program officially started.",
      "Even though it was a very busy day, workers managed to finish everything ahead of schedule and then watched the famous singer perform.",
      "The two-hour performance truly thrilled the audience, leaving everyone in high spirits and full of excitement.",
    ],
  },
  {
    key: 2,
    title:
      "The following description shows how one employee organizes her day at the office.",
    sentences: [
      "The office has flexible hours to accommodate employee schedules.",
      "Her desk is white, standing out in the open-plan office.",
      "She uses a calendar to plan her tasks for the shortened workweek.",
      "For lunch, she packs a homemade sandwich with fresh ingredients.",
      "After work, they relax by reading books on productivity and wellness.",
    ],
  },
  {
    key: 3,
    title:
      "The following passage describes a fun sports event that brought adults and children together.",
    sentences: [
      "It started on Saturday morning, there was a 10-lane race for adults.",
      "There were sixty men and women, and among them, Ms. Kamus won the race with the fastest time.",
      "After she received the prize, the following time was dedicated to children's activities.",
      "Activities included football, swimming, skipping rope, and the children played happily together.",
      "After playing, the children were very hungry and ate with their parents.",
    ],
  },
  {
    key: 0,
    title:
      "The following passage describes a fun sports event that brought adults and children together.",
    sentences: [
      "It started on Saturday morning, there was a 10-lane race for adults.",
      "There were sixty men and women, and among them, Ms. Kamus won the race with the fastest time.",
      "After she received the prize, the following time was dedicated to children.",
      "Activities included football, swimming, skipping rope, and the children played happily together.",
      "After playing, the children were very hungry and ate with their parents.",
    ],
  },
  {
    key: 1,
    title:
      "The following description shows how one employee organizes her day at the office.",
    sentences: [
      "The office has flexible hours to accommodate employee schedules.",
      "Her desk is white, standing out in the open-plan office.",
      "She uses a calendar to plan her tasks for the shortened workweek.",
      "For lunch, she packs a homemade sandwich with fresh ingredients.",
      "After work, they relax by reading books on productivity and wellness.",
    ],
  },
  {
    key: 2,
    title: "Mae’s father was a skilled worker and her mother was a teacher.",
    sentences: [
      "With the support of her parents, she went to the university and studied science.",
      "Her degree in this subject enabled her to get a place on a training course in the USA.",
      "This was about space and it helped Mae to become one of the members of a research team.",
      "As a part of this group, she travelled to space and did a lot of experiments there.",
      "Some of those were about growing plants and some animals in a spaceship.",
    ],
  },
  {
    key: 3,
    title:
      "This weekend, our city organized a special tech fair to highlight creativity and innovation.",
    sentences: [
      "The tech fair was held on Saturday morning, showcasing exciting new gadgets.",
      "Over 50 exhibitors took part, with Dr. Lee presenting an impressive robot demo.",
      "The fair featured engaging activities such as VR gaming, coding workshops, and thrilling drone races.",
      "After the demonstrations, awards were presented for the most innovative product.",
      "Visitors enjoyed complimentary coffee and snacks while exploring the interactive exhibits.",
    ],
  },
  {
    key: 4,
    title:
      "This article introduces the growing impact of the Internet of Things on our daily lives.",
    sentences: [
      "The Internet of Things connects everyday devices to enhance functionality.",
      "Early IoT devices were limited by slow internet speeds and compatibility issues.",
      "High development costs restricted IoT adoption in the past.",
      "Engineers now design smart devices for homes and industries.",
      "Modern IoT systems enable real-time data monitoring and automation.",
    ],
  },
  {
    key: 5,
    title: "Our company organized a special wellness day for all employees.",
    sentences: [
      "The wellness day was held on Friday, promoting work-life balance.",
      "Over 50 employees participated, with Mr. Nguyen leading a stress-relief workshop.",
      "Activities included team yoga, time management talks, and a group walk.",
      "After the workshops, awards were given for the best wellness idea.",
      "Employees enjoyed healthy snacks and shared tips for managing stress.",
    ],
  },
  {
    key: 6,
    title:
      "Workplaces have changed significantly from the past to the present.",
    sentences: [
      "In the past, employees followed strict nine-to-five schedules.",
      "Limited technology once restricted remote work possibilities.",
      "Modern workplaces are adopting more flexible work models.",
      "Managers now use software to track project progress remotely.",
      "Today, companies experiment with shorter workweeks to boost productivity.",
    ],
  },
  {
    key: 7,
    title:
      "Tourism has changed significantly over time, from the way trips were planned in the past to the diverse experiences available today.",
    sentences: [
      "Modern tourism now offers far more options than in the past.",
      "In earlier times, travelers often relied mainly on guidebooks and paper maps.",
      "However, limited technology back then also meant fewer booking options were available.",
      "Today, online platforms make it much easier to plan carefully and book trips quickly.",
    ],
  },
  {
    key: 8,
    title:
      "In recent years, artificial intelligence (AI) has become a powerful force in technology, attracting global attention for its potential to reshape society.",
    sentences: [
      "Artificial intelligence has transformed industries over the past decade.",
      "Early AI systems were limited to basic pattern recognition tasks.",
      "High computational costs restricted AI development in the past.",
      "Today, AI engineers create advanced models for tasks like language translation.",
      "Modern AI tools help businesses analyze data and improve decision-making.",
    ],
  },
  {
    key: 9,
    title: "Introduction to the Tech Innovation Expo",
    sentences: [
      "The tech expo was held on Sunday morning, showcasing cutting-edge innovations.",
      "Over 75 participants attended, with Ms. Tony presenting a smart home device.",
      "Activities included 3D printing demos, AI workshops, and virtual reality trials.",
      "After the presentations, awards were given for the most creative prototype.",
      "Attendees enjoyed networking over coffee and exploring interactive displays.",
    ],
  },
  {
    key: 10,
    title: "Our class is working on group presentations this week.",
    sentences: [
      "First, we prepare materials for our group presentation.",
      "Then, we present our topic for five minutes.",
      "During the presentation, we use pictures and our own words to explain the ideas.",
      "After the presentation, the other students ask questions.",
      "Finally, group members take turns answering the questions.",
    ],
  },
  {
    key: 11,
    title:
      "Over the past two decades, social media has transformed the way people connect and share information.",
    sentences: [
      "In the past, limited internet speeds made it difficult to stream or upload video content.",
      "Early platforms only offered simple features, such as text posts and basic images.",
      "Over the years, social media platforms have evolved significantly in both design and functionality.",
      "Modern platforms now rely on algorithms to personalize and shape each user’s feed.",
      "Today, influencers earn money mainly through sponsorships and online advertisements.",
    ],
  },
];

const fs = require("fs");

const updatedData = data.map((item, index) => ({
  ...item,
  key: index + 1,
}));

// Write to a.json with pretty formatting
fs.writeFileSync(
  "a.json",
  JSON.stringify(updatedData, null, 2), // null,2 = pretty indent
  "utf8"
);

console.log("✅ File a.json has been created with updated keys!");
