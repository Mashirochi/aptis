const ALL_WRITING_DATA = [
  {
    club_name: "Art club",
    key: 1,
    questions1: {
      question1_1: "How are you?",
      question1_2: "Which is your favorite season?",
      question1_3: "Which sports is the most popular in your country?",
      question1_4: "What are you wearing today?",
      question1_5: "What is your favorite kind of music?",
    },
    questions1_answer: {
      question1_1_answer: "I'm doing great, thanks!",
      question1_2_answer: "I love the spring.",
      question1_3_answer: "Football is popular.",
      question1_4_answer: "I’m wearing a dress.",
      question1_5_answer: "I enjoy listening to pop.",
    },
    questions3: {
      question3_1:
        "I kept a painting for a long time. Tell me a thing that you have had for a long time.",
      question3_2:
        "I would like to learn painting, but I have not found an effective way. Should I take a course at my local college? Please, give me some advice.",
      question3_3:
        "Street art – where people paint on the building – is becoming popular. However, some people criticize that it is bad. What is your opinion?",
    },
    questions3_answer: {
      question3_1_answer:
        "I’ve had my old sketchbook for years. It holds a lot of memories, sketches from different stages of my life, and always reminds me of how much my art has evolved over time.",
      question3_2_answer:
        "If you're serious about learning painting, taking a course at your local college could be a great idea. Structured lessons with an experienced instructor can really boost your skills and provide useful feedback.",
      question3_3_answer:
        "I think street art can be a beautiful form of expression, but it also depends on the context and location. It’s important to respect the space, but when done well, it can really enhance a community's atmosphere.",
    },
    question4_1_text:
      "Write a short email to your friend (about 50 words). Tell your friend your feelings about this and what you plan to do.",
    question4_2_text:
      "Write an email to the president of the club (about 120-150 words). Tell them your thoughts about this and what you would like to do.",
    question4_1_text_answer:
      "Hi Linh, <br> \r\n    I just heard that our music club is going to be closed. I'm really sad because I love spending time there with you and everyone. I plan to talk to the club president to see if there's anything we can do to keep it running. \r\n    <br>Let me know what you decide! \r\n    <br>Looking forward to hearing from you soon!\r\n    <br>Best, \r\n    <br>Phuong",
    question4_2_text_answer:
      "Dear Club President, \r\n    <br> I was very surprised and disappointed to hear that the music club might be closed. The club means a lot to many students, including me, as it's a great place to relax, share our love for music, and make friends. I believe we should find ways to keep it active.  \r\n    <br> I would like to suggest organizing a fundraising event or asking the school for support. I'm also happy to volunteer to help with organizing activities or promoting the club to attract more members. Please consider giving us a chance to keep the club alive.  \r\n    <br> Best regards,  \r\n    <br> Jimmy",
  },
  {
    club_name: "Beautiful homes club",
    key: 2,
    questions1: {
      question1_1: "What is your favorite time of the year?",
      question1_2: "What is your favorite sport?",
      question1_3: "Where do you wanna go on holiday?",
      question1_4: "What is the weather today?",
      question1_5: "What do you like to do in the evening?",
    },
    questions1_answer: {
      question1_1_answer: "I like summer.",
      question1_2_answer: "I enjoy football.",
      question1_3_answer: "I want to visit Japan.",
      question1_4_answer: "It's sunny today.",
      question1_5_answer: "I watch TV shows.",
    },
    questions3: {
      question3_1:
        "I have a bad relationship with my neighbors because they often make noise. Tell me how is your relationship with your neighbors?",
      question3_2:
        "Do you prefer living in old buildings or modern buildings? Why?",
      question3_3:
        "The house should be designed in a way that is good for the environment. Do you agree?",
    },
    questions3_answer: {
      question3_1_answer:
        "I have a good relationship with my neighbors. We often help each other out and respect each other's space, so there are rarely any conflicts. Communication is key in maintaining a peaceful atmosphere.",
      question3_2_answer:
        "I prefer living in modern buildings because they tend to have better facilities, are more energy-efficient, and are designed with current trends in mind. Old buildings, though charming, often lack these features.",
      question3_3_answer:
        "Yes, I completely agree. Designing houses with environmental considerations, such as using sustainable materials, energy-efficient systems, and reducing waste, can help minimize our ecological footprint and promote a healthier planet.",
    },
    question4_1_text: "Write a short email to your friend (about 50 words).",
    question4_2_text:
      "Write an email to the president of the club (about 120-150 words).",
    question4_1_text_answer:
      "Hi Linh, <br> \r\n    I just heard that the government has proposed knocking down old buildings to make space for modern blocks. I think it’s a great idea because maintaining old buildings is expensive, and modern buildings would be more energy-efficient. What do you think? \r\n    <br>Looking forward to hearing your thoughts! \r\n    <br>Best, \r\n    <br>Phuong",
    question4_2_text_answer:
      "Dear President, \r\n    <br> I am writing to express my opinion on the government’s proposal to knock down old buildings and replace them with modern blocks. While I understand that maintaining old buildings can be costly, I believe we should carefully consider the impact on local communities and historical sites before proceeding. It might be beneficial to explore ways to preserve some of these buildings while still allowing for modern development in other areas. I suggest we engage with local residents and architects to discuss the best course of action. \r\n    <br> I look forward to your response and hope we can find a solution that benefits everyone.  \r\n    <br> Best regards,  \r\n    <br> Jimmy",
  },
  {
    club_name: "Book club",
    key: 3,
    questions1: {
      question1_1: "What’s your favorite hobby?",
      question1_2: "How do you get to work?",
      question1_3: "What do you like to do in the evening?",
      question1_4: "What kinds of movies do you like?",
      question1_5: "What’s your favorite food?",
    },
    questions1_answer: {
      question1_1_answer: "I love painting.",
      question1_2_answer: "I drive my car.",
      question1_3_answer: "I watch TV shows.",
      question1_4_answer: "I enjoy comedies.",
      question1_5_answer: "I love pizza.",
    },
    questions2_answer: {
      question2:
        "I usually visit libraries, search online databases, and use academic platforms like Google Scholar and JSTOR to find relevant materials. These sources help me gather books, journals, and papers for my research.",
    },
    questions3: {
      question3_1:
        "Hi! Welcome to the club. When and where do you like reading books?",
      question3_2:
        "Hi! I would like to give my friend a book. What would you suggest for me to buy?",
      question3_3:
        "Online books replace traditional books? What do you think about that?",
    },
    questions3_answer: {
      question3_1_answer:
        "I like to read books in the evenings when I can relax. I usually read at home, in my cozy corner, with a cup of tea. It's a great way to unwind after a busy day.",
      question3_2_answer:
        "If your friend enjoys fiction, I'd recommend a bestseller like 'The Night Circus.' For non-fiction, something motivational or educational, like 'Atomic Habits,' would be a great choice to inspire them.",
      question3_3_answer:
        "Online books are convenient and portable, but they don't fully replace traditional books. The experience of reading a physical book is unique and many still prefer the tactile feel and scent of paper.",
    },
    question4_1_text: "Write a short email to your friend (about 50 words).",
    question4_2_text:
      "Write an email to the president of the club (about 120-150 words).",
    question4_1_text_answer:
      "Hi Linh, <br> \r\n    I just received an update that starting next month, we won't be able to get one free book each month anymore. Additionally, there will be delays in delivery, so expect your orders to arrive in 4-6 weeks. \r\n    <br>Let's catch up soon! \r\n    <br>Best, \r\n    <br>Phuong",
    question4_2_text_answer:
      "Dear Club President, \r\n    <br> I was surprised to learn that we will no longer be able to receive a free book each month and that there will be significant delays in delivery. As a loyal member, I rely on these benefits, and this news is quite disappointing. I understand that delivery issues can happen, but I hope the club can find alternative solutions to continue offering books or communicate any updates in advance. It would be greatly appreciated if the club could work on improving the service and offer alternative options for the members. \r\n    <br> Best regards,  \r\n    <br> Linh",
  },
  {
    club_name: "Business club",
    key: 4,
    questions1: {
      question1_1: "What is your hobby?",
      question1_2: "What is your favourite food?",
      question1_3: "What is your favourite time of a day?",
      question1_4: "How do you get to work?",
      question1_5: "Where are you from?",
    },
    questions1_answer: {
      question1_1_answer: "I like listening to music.",
      question1_2_answer: "I love Pizza.",
      question1_3_answer: "The evening.",
      question1_4_answer: "I ride my bike.",
      question1_5_answer: "I'm From Vietnam.",
    },
    questions2_answer: {
      question2:
        "I usually shop at premium stores in the city center for business attire and essentials. For gadgets, I prefer specialized outlets or online platforms.",
    },
    questions3: {
      question3_1:
        "I know there are a lot of successful small businesses these days. Tell me about a successful small business in your area.",
      question3_2:
        "I have a friend who wants to open a second coffee shop. She opened her first one a year ago and it was quite successful. What advice do you have to help her be more successful in her second shop?",
      question3_3:
        "Can you tell me what qualities and skills are needed to create a successful small business?",
    },
    questions3_answer: {
      question3_1_answer:
        "In my area, a bakery has become successful due to its high-quality products and friendly service. It expanded by offering unique recipes and became a local favorite. People recommend it to others.",
      question3_2_answer:
        "For the second shop, she should maintain product quality and focus on customer service. Choosing a good location, promoting on social media, and creating special promotions can help attract more customers and keep them loyal.",
      question3_3_answer:
        "To build a successful small business, one needs qualities like perseverance, creativity, and adaptability. Important skills include problem-solving, communication, marketing, and the ability to understand customer needs and provide quality service.",
    },
    question4_1_text:
      "Write a short email to your friend (about 50 words). Write a letter to a friend about your choice and the idea.",
    question4_2_text:
      "Write an email to the president of the club (about 120-150 words). Write a letter to the club manager about your choice and why.",
    question4_1_text_answer:
      "Hi Hang, <br>\r\n    I hope you're doing well! Our Business Club has two proposals: a call center for customer support or free courses for local universities. I think the free courses would be a better option as they would help students prepare for real-world challenges and create long-term benefits. <br>\r\n    Let me know what you think! <br>\r\n    Best, <br>\r\n    Nguyen",
    question4_2_text_answer:
      "Dear Club President, <br>\r\n    I hope this email finds you well. I am writing in response to the club's plan to support local individuals in starting small businesses. After considering the two proposals, I believe creating free courses for local universities nearby would be the better option. These courses can help students gain essential knowledge about running a business and prepare them for future challenges. Additionally, offering these courses would create a strong connection between the club and the community. <br>\r\n    I appreciate your consideration of my opinion and look forward to hearing more about the club's plans. <br>\r\n    Best regards, <br>\r\n    Nguyen Van Hung",
  },
  {
    club_name: "Car club",
    key: 5,
    questions1: {
      question1_1: "What is your favourite colour?",
      question1_2: "What is the weather like today?",
      question1_3: "How are you?",
      question1_4: "Which is your favorite season?",
      question1_5: "What do you do on the weekend?",
    },
    questions1_answer: {
      question1_1_answer: "Blue.",
      question1_2_answer: "It's sunny.",
      question1_3_answer: "I'm doing great.",
      question1_4_answer: "I love the spring.",
      question1_5_answer: "I relax at home.",
    },
    questions3: {
      question3_1: "Tell me about a time you traveled by car.",
      question3_2: "Tell me about memories when traveling by car.",
      question3_3: "Should we take public transportation or buy a car?",
    },
    questions3_answer: {
      question3_1_answer:
        "I once traveled by car to a nearby beach. It was a scenic drive, and we stopped at some small towns along the way. The trip was smooth and enjoyable, with great conversations and beautiful views.",
      question3_2_answer:
        "One memorable car trip was when my family drove to the mountains. We played music, shared stories, and had fun stops for snacks. It was one of those trips that felt timeless and unforgettable.",
      question3_3_answer:
        "Whether to take public transportation or buy a car depends on your needs. If you live in a city with good transport, public transit may be better. However, owning a car gives flexibility and convenience for trips.",
    },
    question4_1_text:
      "Write a short email to your friend (about 50 words). Do you have any suggestions for the above positions.",
    question4_2_text:
      "Write an email to the president of the club (about 120-150 words). Do you have any suggestions for the above positions.",
    question4_1_text_answer:
      "Hi Linh, <br> \r\n    I heard about the car program across Europe. I think you should be the main driver because you have excellent driving skills. As for the passenger, I suggest I take the role since I'm good with navigation and assisting. \r\n    <br>Let me know your thoughts! \r\n    <br>Best, \r\n    <br>Phuong",
    question4_2_text_answer:
      "Dear Club President, \r\n    <br> I am excited to hear about the car program running across Europe. I have a suggestion for the positions. For the main driver, I recommend someone with strong driving skills and experience, like Linh. As for the passenger, I believe someone who is good at navigation and assisting with the trip details would be ideal, and I’d be happy to take on that role if needed. This way, we can ensure a smooth and enjoyable trip. \r\n    <br> I look forward to hearing your thoughts.  \r\n    <br> Best regards,  \r\n    <br> Phuong",
  },
  {
    club_name: "Cinema club",
    key: 6,
    questions1: {
      question1_1: "What is your job?",
      question1_2: "What is your favorite food?",
      question1_3: "What do you usually do in the morning?",
      question1_4: "Where did you go last night?",
      question1_5: "What do you like doing with your friend?",
    },
    questions1_answer: {
      question1_1_answer: "I’m a teacher.",
      question1_2_answer: "I love pizza.",
      question1_3_answer: "I read the news.",
      question1_4_answer: "I stayed at home.",
      question1_5_answer: "We watch movies together.",
    },
    questions2_answer: {
      question2:
        "I usually watch films in the evenings after work. I try to watch at least two movies a week, mostly on weekends when I have more free time.",
    },
    questions3: {
      question3_1:
        "I like to sit near the screen when I go to the cinema? I never drink or eat anything during the film. What about you?",
      question3_2:
        "I don’t like watching old back-and-white. They are boring. I prefer modern films, which do you prefer, and why?",
      question3_3:
        "Some people say we don’t need cinemas anymore. We can watch everything on TV or online at home? What do you think about this?",
    },
    questions3_answer: {
      question3_1_answer:
        "I prefer sitting closer to the screen for a better experience, and I enjoy some snacks during the film. It helps me relax and enjoy the movie more. How about you?",
      question3_2_answer:
        "I also prefer modern films because of the high-quality visuals and advanced technology. They are more engaging and entertaining, while black-and-white films feel less dynamic and harder to connect with.",
      question3_3_answer:
        "While watching films online is convenient, I think cinemas offer a unique experience with a large screen and immersive sound. Watching in a theater still feels special and brings people together.",
    },
    question4_1_text:
      "Write a short email to your friend (about 50 words). Tell your friend what suggestions you will make and why?",
    question4_2_text:
      "Write an email to the president of the club (about 120-150 words). Write about your ideas and what you think about the situation.",
    question4_1_text_answer:
      "Hi Linh, <br> \r\n    I heard about the issue with people using their phones during the films. I think banning mobile phones could be a good solution. Alternatively, we could create a designated area for phone users, away from the main seating area. What do you think? <br> \r\n    Best, <br> \r\n    Phuong",
    question4_2_text_answer:
      "Dear Club President, \r\n    <br> I understand the frustration regarding people using their mobile phones during film screenings. While banning phones could be effective, I suggest we first try a “phone-free” zone. People who prefer to use their phones could sit there, which would keep the main areas free from distractions. Alternatively, we could provide phone holders that encourage people to store their phones securely before the film begins. This could help resolve the problem without taking drastic measures. \r\n    <br> I hope these suggestions help. I look forward to hearing your thoughts. \r\n    <br> Best regards,  \r\n    <br> Phuong",
  },
  {
    club_name: "College club",
    key: 7,
    questions1: {
      question1_1: "Which sport do you like to play the most?",
      question1_2: "What did you do last night?",
      question1_3: "Do you like shopping?",
      question1_4: "What are you wearing today?",
      question1_5: "What is your favorite kind of music?",
    },
    questions1_answer: {
      question1_1_answer: "I like football.",
      question1_2_answer: "I watched TV.",
      question1_3_answer: "Yes, I do.",
      question1_4_answer: "I’m wearing jeans.",
      question1_5_answer: "I enjoy pop music.",
    },
    questions2_answer: {
      question2:
        "I am available on weekends, mainly on Saturday afternoons. I would love to study painting, especially focusing on modern art techniques and experimenting with different mediums.",
    },
    questions3: {
      question3_1:
        "Hi! Welcome to the college. What course are you doing and why did you choose it?",
      question3_2: "Welcome! How do you feel about the college so far?",
      question3_3:
        "Did you hear that the college sports club has closed? What do you think about this?",
    },
    questions3_answer: {
      question3_1_answer:
        "I’m studying graphic design because I’ve always been passionate about creativity and visual communication. This course will help me develop my skills and open up career opportunities in the creative industry.",
      question3_2_answer:
        "So far, I’m really enjoying the college. The campus is vibrant and welcoming, and I’ve met some friendly people. The professors are knowledgeable and make learning engaging, which I appreciate.",
      question3_3_answer:
        "Yes, I heard about the sports club closing. It's disappointing because many students enjoyed the activities and it was a great way to stay active. I hope they reconsider or offer alternatives in the future.",
    },
    question4_1_text:
      "Write a short email to your friend (about 50 words). Tell them what you think the college should do about the situation.",
    question4_2_text:
      "Write an email to the president of the club (about 120-150 words). Tell them what you think the college should do about the situation.",
    question4_1_text_answer:
      "Hi Linh, <br> \r\n    I just heard that the exams have been moved up two weeks. I think the college should give us more notice and maybe adjust the study schedule. It’s going to be really stressful. What do you think? <br> \r\n    Best, <br> \r\n    Phuong",
    question4_2_text_answer:
      "Dear Club President, \r\n    <br> I was informed that the end-of-course exams have been moved up two weeks earlier than originally planned. This sudden change is quite concerning, and many students, including myself, are finding it difficult to adjust our study plans in such a short time. I believe the college should have given more notice to avoid causing unnecessary stress for students. It might be helpful to offer additional support, such as extra study sessions or extending the revision period. I also suggest the college communicates more clearly and in advance about such important changes. \r\n    <br> I hope you will consider this feedback and help make adjustments for the benefit of all students. \r\n    <br> Best regards,  \r\n    <br> Phuong",
  },
  {
    club_name: "Community club",
    key: 8,
    questions1: {
      question1_1: "Which sport is the most popular in your country?",
      question1_2: "What is your favorite animal?",
      question1_3: "What is the weather like today?",
      question1_4: "Where did you go last night?",
      question1_5: "What is your favorite time of year?",
    },
    questions1_answer: {
      question1_1_answer: "Football is popular.",
      question1_2_answer: "I love dogs.",
      question1_3_answer: "It's sunny today.",
      question1_4_answer: "I stayed home.",
      question1_5_answer: "I love the spring.",
    },
    questions2_answer: {
      question2:
        "I joined the Community club to meet new people, participate in activities, and contribute to local causes. I enjoy being part of a group that makes a positive impact.",
    },
    questions3: {
      question3_1:
        "My friend wants to go to the hair salon, but her car isn't working. Can you suggest some ways for her to get there?",
      question3_2:
        "Volunteering provides great learning opportunities and helps others a lot. Do you agree with this?",
      question3_3:
        "Do you agree with the view that volunteering is a form of learning, especially for young people? Why?",
    },
    questions3_answer: {
      question3_1_answer:
        "She can use public transportation or take a taxi. Alternatively, she could ask a friend or family member for a ride, or even use a ride-sharing service like Uber or Lyft.",
      question3_2_answer:
        "Yes, volunteering not only helps others but also provides valuable learning experiences. It teaches practical skills, empathy, and the importance of contributing to the community, benefiting both the volunteer and those served.",
      question3_3_answer:
        "I agree that volunteering is a form of learning, especially for young people. It offers hands-on experiences, teaches responsibility, and fosters important social skills, all of which are crucial for personal and professional development.",
    },
    question4_1_text:
      "Write a short email to your friend (about 50 words). Write about your feelings and what you would like to do.",
    question4_2_text:
      "Write an email to the president of the club (about 120-150 words). Write about your feelings and what you would like to do.",
    question4_1_text_answer:
      "Hi Linh, <br> \r\n    I just heard that our club needs more members and creative ideas to improve. I think we could organize some fun events and invite new members. We should also brainstorm fresh ideas for activities. What do you think? <br> \r\n    Best, <br> \r\n    Phuong",
    question4_2_text_answer:
      "Dear Club President, \r\n    <br> I’m glad to hear the club is actively working to grow and improve this year. To support our projects, I suggest hosting interactive workshops or social events to encourage new members to join and participate. Additionally, we could organize a brainstorming session to gather creative ideas for future activities. This would engage both current and potential members and help us develop exciting initiatives. I’d love to contribute to these efforts by helping organize events and promote them on social media to attract more people. \r\n    <br> I look forward to hearing your thoughts. \r\n    <br> Best regards,  \r\n    <br> Phuong",
  },
  {
    club_name: "Computer club",
    key: 9,
    questions1: {
      question1_1: "What is your job?",
      question1_2: "What is your favorite subject in high school?",
      question1_3: "What is your favorite color?",
      question1_4: "What do you like to do in the evening?",
      question1_5: "What is your favorite food?",
    },
    questions1_answer: {
      question1_1_answer: "I’m a teacher.",
      question1_2_answer: "I like math.",
      question1_3_answer: "I love blue.",
      question1_4_answer: "I read books.",
      question1_5_answer: "I love pizza.",
    },
    questions2_answer: {
      question2:
        "I use a computer every day at home and at work. I primarily use it for work tasks, browsing the internet, and staying connected with friends through social media.",
    },
    questions3: {
      question3_1:
        "My grandmother doesn’t know how to use the computer. Your solutions.",
      question3_2: "The last time you used your computer. Your purpose.",
      question3_3:
        "Nowadays people use computers a lot. This is not good. Your opinion.",
    },
    questions3_answer: {
      question3_1_answer:
        "I would suggest teaching her the basics step by step, starting with simple tasks like browsing the web or using email. It would be helpful to provide a patient, hands-on approach.",
      question3_2_answer:
        "The last time I used my computer was to finish some work tasks. I used it for writing reports and responding to emails. It’s an essential tool for productivity in my job.",
      question3_3_answer:
        "While computers are useful tools, I believe overuse can lead to physical and mental health issues. It’s important to balance screen time with outdoor activities and personal interactions to maintain overall well-being.",
    },
    question4_1_text: "Write a short email to your friend (about 50 words).",
    question4_2_text:
      "Write an email to the president of the club (about 120-150 words).",
    question4_1_text_answer:
      "Hi Linh, <br> \r\n    I just heard that the club plans to improve the website to attract more members. I think it’s a great idea! A more user-friendly design and highlighting our events can really help. What do you think? <br>\r\n    Best, <br> \r\n    Phuong",
    question4_2_text_answer:
      "Dear Club President, \r\n    <br> I’m excited to hear that the club is planning to enhance the website to attract more members. This is a great step forward! I suggest making the website more visually appealing and easy to navigate. Additionally, we could highlight upcoming events, member testimonials, and success stories to show the benefits of joining the club. Another idea would be to create an interactive blog or forum to engage potential members. Promoting the club on social media and through email newsletters would also help spread the word. \r\n    <br> I’m happy to assist with any tasks to help improve the website. \r\n    <br> Best regards,  \r\n    <br> Phuong",
  },
  {
    club_name: "Cooking club",
    key: 10,
    questions1: {
      question1_1: "What do you do on the weekend?",
      question1_2: "Which sport do you like to play the most?",
      question1_3: "What did you do last night?",
      question1_4: "Do you like shopping?",
      question1_5: "What do you usually do in the morning?",
    },
    questions1_answer: {
      question1_1_answer: "I relax at home.",
      question1_2_answer: "I like football.",
      question1_3_answer: "I watched TV.",
      question1_4_answer: "Yes, I do.",
      question1_5_answer: "I read the news.",
    },
    questions2_answer: {
      question2:
        "I can join the club on Saturday afternoons. I would love to cook pasta with tomato sauce, or perhaps try making some homemade pizza. I enjoy cooking Italian food.",
    },
    questions3: {
      question3_1:
        "Hi! Welcome to the club. Why did you decide to join the club?",
      question3_2:
        "Hi! What do you think about the club’s price/ membership fee?",
      question3_3: "How often do you go to the club?",
    },
    questions3_answer: {
      question3_1_answer:
        "I decided to join the club because I wanted to meet new people, learn new skills, and participate in interesting activities. It seemed like a fun and engaging community to be a part of.",
      question3_2_answer:
        "I think the club’s membership fee is quite reasonable considering the activities and benefits offered. It’s affordable, and the variety of events makes it worth the cost for me.",
      question3_3_answer:
        "I usually go to the club twice a week. I try to attend the events that interest me most, such as workshops and social gatherings, to make the most of my membership.",
    },
    question4_1_text:
      "Write a short email to your friend (about 50 words). Tell your friend your feelings about this and what you plan to do.",
    question4_2_text:
      "Write an email to the president of the club (about 120-150 words). Tell them your thoughts about this and what you would like to do.",
    question4_1_text_answer:
      "Hi Linh, <br> \r\n    I just heard that all classes are canceled next week because the instructor is going on holiday. I’m disappointed because I was looking forward to attending. I plan to wait for the next announcement. <br>\r\n    Best, <br>\r\n    Phuong",
    question4_2_text_answer:
      "Dear Club President, \r\n    <br> I was disappointed to hear that all classes are canceled next week due to the instructor's holiday. While I understand the situation, I was looking forward to the lessons. I suggest organizing some alternative activities during this time, such as practice sessions or discussions, to keep the participants engaged. Additionally, it would be helpful if the club could provide more notice in the future to better manage expectations. I look forward to hearing more about the upcoming schedule and any changes. \r\n    <br> Best regards,  \r\n    <br> Phuong",
  },
  {
    club_name: "Debate club",
    key: 11,
    questions1: {
      question1_1: "Where are you from?",
      question1_2: "What’s the weather like today?",
      question1_3: "What do you do in your free time?",
      question1_4: "First language?",
      question1_5: "Who do you usually go to the movies with?",
    },
    questions1_answer: {
      question1_1_answer: "I’m from Vietnam.",
      question1_2_answer: "It’s sunny today.",
      question1_3_answer: "I read books.",
      question1_4_answer: "My first language is Vietnamese.",
      question1_5_answer: "I go with friends.",
    },
    questions2_answer: {
      question2:
        "I usually talk with my friends about school, hobbies, and future plans. Sometimes we also share funny stories, discuss films, or chat about our favorite music together.",
    },
    questions3: {
      question3_1:
        "There are many ways to follow the news nowadays. How do you learn about world issues?",
      question3_2:
        "I will take part in a debate in front of 50 people next week. How can I make a good impression?",
      question3_3:
        "Before making a decision about an issue, you should consider both sides of it. What do you think about this?",
    },
    questions3_answer: {
      question3_1_answer:
        "I usually keep up with world issues by reading news articles, watching documentaries, and following updates on social media. I also listen to podcasts and discussions to get a broader perspective.",
      question3_2_answer:
        "To make a good impression, stay calm, confident, and well-prepared. Make eye contact, speak clearly, and back up your arguments with facts. Engaging with the audience and being respectful is key.",
      question3_3_answer:
        "I completely agree. Considering both sides of an issue allows for a more balanced perspective, helps make informed decisions, and shows an open-minded approach. It’s crucial for critical thinking.",
    },
    question4_1_text: "Write a short email to your friend (about 50 words).",
    question4_2_text:
      "Write an email to the president of the club (about 120-150 words).",
    question4_1_text_answer:
      "Hi Linh, <br>\r\n    I think learning debate and public speaking has great benefits. First, it helps improve communication skills. Second, it builds confidence in expressing ideas clearly and persuasively. This could be great for attracting new members! <br>\r\n    Best, <br>\r\n    Phuong",
    question4_2_text_answer:
      "Dear Club President, <br>\r\n    I believe learning debate and public speaking offers two major benefits that could attract new members to the club. Firstly, it greatly improves communication skills, allowing participants to express their thoughts clearly and persuasively. Secondly, it helps boost confidence, enabling members to speak in front of audiences and present ideas effectively. These skills are not only useful for personal growth but also beneficial for the club, as they can encourage more engagement in club activities. I would suggest incorporating more public speaking and debate-focused workshops to help new members develop these abilities. <br>\r\n    Best regards, <br>\r\n    Phuong",
  },
  {
    club_name: "English club",
    key: 12,
    questions1: {
      question1_1: "What do you like doing with your friend?",
      question1_2: "How are you?",
      question1_3: "Where do you wanna go on holiday?",
      question1_4: "What is your favorite sport?",
      question1_5: "What is your favorite time of the year?",
    },
    questions1_answer: {
      question1_1_answer: "We love playing games.",
      question1_2_answer: "I'm doing great!",
      question1_3_answer: "I want to visit Japan.",
      question1_4_answer: "I enjoy playing basketball.",
      question1_5_answer: "I love the spring.",
    },
    questions2_answer: {
      question2:
        "I usually use the internet for browsing social media, watching videos, reading news, shopping online, and researching information for my work or studies.",
    },
    questions3: {
      question3_1:
        "I usually spend 6 hours a day studying English. How do you learn English?",
      question3_2:
        "English is a popular language in the world. What are your thoughts on this idea?",
      question3_3: "When do you usually use English?",
    },
    questions3_answer: {
      question3_1_answer:
        "I learn English by practicing speaking, listening to podcasts, reading books, and watching English movies. I also take online courses to improve my grammar and writing skills regularly.",
      question3_2_answer:
        "English's popularity is due to its use in international business, education, and communication. It's a global language that connects people across cultures, making it essential for global interaction and understanding.",
      question3_3_answer:
        "I usually use English when communicating with friends, reading articles online, watching movies or shows, and during my work. It's also essential when traveling or attending international events.",
    },
    question4_1_text: "Write a short email to your friend (about 50 words).",
    question4_2_text:
      "Write an email to the president of the club (about 120-150 words). ",
    question4_1_text_answer:
      "Hi Linh, <br> \r\n    I've been thinking a lot about the recent debate on new words being added to the language. Some people accept it while others want stricter rules. I personally think language evolves naturally and shouldn't be restricted. What do you think? \r\n    <br>Looking forward to your thoughts! \r\n    <br>Best, \r\n    <br>Phuong",
    question4_2_text_answer:
      "Dear Club President, \r\n    <br> I wanted to share my thoughts on the recent concerns regarding the addition of new words and phrases to our language. While many people are excited about these changes, some argue for stricter rules to maintain clarity. In my opinion, language is constantly evolving, and this adaptation should be embraced. It reflects society’s growth and diverse culture.\r\n    <br> I believe it's important to find a balance between preserving language integrity and allowing it to grow. Perhaps we could organize a discussion or workshop to explore both sides of this issue. \r\n    <br> I look forward to hearing your thoughts.\r\n    <br> Best regards,  \r\n    <br> Jimmy",
  },
  {
    club_name: "Film club",
    key: 13,
    questions1: {
      question1_1: "What’s your favorite sport?",
      question1_2: "How many people in your family?",
      question1_3: "What did you do yesterday?",
      question1_4: "How do you go to school?",
      question1_5: "What’s your hobby?",
    },
    questions1_answer: {
      question1_1_answer: "I love football.",
      question1_2_answer: "There are four people.",
      question1_3_answer: "I went to work.",
      question1_4_answer: "I go by bike.",
      question1_5_answer: "I enjoy reading books.",
    },
    questions2_answer: {
      question2:
        "Some of my favorite films are 'Inception' and 'The Dark Knight'. I enjoy them for their complex plots, amazing visuals, and the incredible performances by the actors.",
    },
    questions3: {
      question3_1: "Hi. Welcome to the club. How often do you watch films?",
      question3_2:
        "Hi. Can you remember the first film you what? What was it like?",
      question3_3: "What would you like to learn from the film club?",
    },
    questions3_answer: {
      question3_1_answer:
        "I watch films about 2-3 times a week, mostly on weekends. I enjoy a variety of genres, from action to drama, and I love discussing them with friends afterward.",
      question3_2_answer:
        "The first film I watched was a cartoon when I was very young. It was colorful and exciting, and I still remember how much it fascinated me at that time.",
      question3_3_answer:
        "From the film club, I would like to learn more about different film genres, improve my film analysis skills, and engage in discussions that enhance my understanding of storytelling techniques.",
    },
    question4_1_text:
      "Write an email to your friend. Write about your feelings and what you would like to do (50 words).",
    question4_2_text:
      "Write an email the the manager of the club. Write about your feelings and possible alternatives (120 – 150 words)",
    question4_1_text_answer:
      "Hi Linh, <br> \r\n    I just heard that James McAvoy won't be able to give the talk at our next meeting, which is such a disappointment! I was really looking forward to it. I hope we can reschedule for March or January next year. \r\n    <br>Let me know your thoughts! \r\n    <br>Best, \r\n    <br>Phuong",
    question4_2_text_answer:
      "Dear Club Manager, \r\n    <br> I was disappointed to hear that James McAvoy won't be able to attend the meeting due to personal reasons. It’s unfortunate because we were all really looking forward to his talk. However, I completely understand, and I hope we can reschedule for either January or March next year as suggested. I believe this delay will give us all the chance to look forward to the talk even more.  \r\n    <br> In the meantime, I’m excited about the discussion on the advantages and disadvantages of learning on the internet. I’m sure it will be an engaging topic! Perhaps we could also consider inviting another guest speaker to fill in, or organize a fun activity related to the internet learning theme.  \r\n    <br> I look forward to your feedback and suggestions.  \r\n    <br> Best regards,  \r\n    <br> Jimmy",
  },
  {
    club_name: "Fitness club",
    key: 14,
    questions1: {
      question1_1: "What is your hobby?",
      question1_2: "What's the weather like today?",
      question1_3: "How do you relax?",
      question1_4: "What do you usually do in your free time?",
      question1_5: "Why do you learn English?",
    },
    questions1_answer: {
      question1_1_answer: "I love reading books.",
      question1_2_answer: "It's sunny and warm.",
      question1_3_answer: "I listen to music.",
      question1_4_answer: "I watch movies.",
      question1_5_answer: "To communicate globally.",
    },
    questions2_answer: {
      question2:
        "The last time I went for a run was last weekend. It felt refreshing, and I ran for about 30 minutes in the park, enjoying the fresh air and nature.",
    },
    questions3: {
      question3_1:
        "I live in a tall building, I usually walk downstairs to exercise, how do you usually exercise?",
      question3_2:
        "I usually get up early to run in the morning because I usually get tired in the evening. What about you?",
      question3_3:
        "Nowadays, technology makes people's lives easier, but it also makes them lazy and dislike exercise. Do you agree with this opinion?",
    },
    questions3_answer: {
      question3_1_answer:
        "I usually exercise by going to the gym or doing home workouts like yoga or bodyweight exercises. I find them effective for staying fit without needing a lot of space or equipment.",
      question3_2_answer:
        "I prefer exercising in the evening when I have more energy. I usually go for a jog or take a brisk walk around my neighborhood. It helps me relax after a busy day.",
      question3_3_answer:
        "I do agree that technology has made life more convenient, but it often leads to less physical activity. While tech helps in many ways, it’s essential to make time for regular exercise.",
    },
    question4_1_text: "Write a short email to your friend (about 50 words). ",
    question4_2_text:
      "Write an email to the president of the club (about 120-150 words). ",
    question4_1_text_answer:
      "Hi Linh, <br> \r\n    I just heard that the club is planning a sponsorship event to raise money for new sports equipment. I think it’s a great idea! Some people also want to raise membership fees. What do you think? \r\n    <br>Let me know! \r\n    <br>Best, \r\n    <br>Phuong",
    question4_2_text_answer:
      "Dear Club President, \r\n    <br> I understand that some of the equipment in our club is getting old, and I think hosting a sponsorship event to raise funds is a good idea. It would help us upgrade our sports equipment and improve our overall facilities. \r\n    <br> However, I have heard that some members suggest raising the membership fee by 50%. I believe this could lead to dissatisfaction among many members, especially those who already struggle with the current fees. \r\n    <br> I would like to propose exploring other options to raise funds, such as hosting charity events or reaching out to local businesses for donations. I am happy to help organize any activities or events that could support the club’s goals. \r\n    <br> I look forward to hearing your thoughts on this matter.  \r\n    <br> Best regards,  \r\n    <br> Jimmy",
  },
  {
    club_name: "Food club",
    key: 15,
    questions1: {
      question1_1: "What is your full name?",
      question1_2: "What is your surname?",
      question1_3: "What did you do yesterday / last night / last week?",
      question1_4:
        "What do you like to do every morning / in the afternoon / in the evening?",
      question1_5: "What do you do in the free time?",
    },
    questions1_answer: {
      question1_1_answer: "Nguyen Van An.",
      question1_2_answer: "My surname is Nguyen.",
      question1_3_answer: "I stayed at home.",
      question1_4_answer: "I read books every morning.",
      question1_5_answer: "I enjoy watching movies.",
    },
    questions2_answer: {
      question2:
        "I usually have breakfast at home around 7 AM, lunch at work or school around noon, and dinner at home around 7 PM. I prefer eating with family.",
    },
    questions3_answer: {
      question3_1_answer:
        "The last time I had a great meal was at a family gathering last weekend. We had grilled fish, fried rice, and a delicious dessert. Everything was so tasty and satisfying.",
      question3_2_answer:
        "If you visit my country, I highly recommend trying pho, banh mi, and fresh spring rolls. These dishes are famous for their unique flavors and are a must-try when you're here.",
      question3_3_answer:
        "I agree that pizza is delicious but not very healthy. It’s high in fat and calories, so it should be eaten in moderation. It’s fine as an occasional treat but not a regular meal.",
    },
    question4_1_text:
      "Write a short email to your friend (about 50 words). Tell your friend what suggestions you will make and why?",
    question4_2_text:
      "Write an email to the president of the club (about 120-150 words). Tell the manager what suggestions you will make and why?",
    question4_1_text_answer:
      "Hi Linh, <br> \r\n    I just heard that the club needs volunteers to be guest speakers for the talk show with the famous chef. I plan to suggest talking about healthy cooking tips. What do you think? \r\n    <br>Let me know soon! \r\n    <br>Best, \r\n    <br>Phuong",
    question4_2_text_answer:
      "Dear Club President, \r\n    <br> I’m excited to hear about the opportunity to volunteer as a guest speaker for the upcoming talk show with the famous chef. I would love to talk about healthy cooking techniques and how to prepare simple yet nutritious meals at home. I believe this topic will be useful for many club members, and it can inspire others to focus more on health-conscious cooking. \r\n    <br> I am passionate about this subject and would be happy to share some easy recipes and tips. Please let me know if you would like me to participate.  \r\n    <br> Best regards,  \r\n    <br> Phuong",
  },
  {
    club_name: "Garden club",
    key: 16,
    questions1: {
      question1_1: "Where are you from?",
      question1_2: "What’s the weather like today?",
      question1_3: "What did you do last night?",
      question1_4: "First language?",
      question1_5: "What is your favorite color?",
    },
    questions1_answer: {
      question1_1_answer: "I’m from Vietnam.",
      question1_2_answer: "It’s sunny today.",
      question1_3_answer: "I watched a movie.",
      question1_4_answer: "My first language is Vietnamese.",
      question1_5_answer: "I like blue.",
    },
    questions2_answer: {
      question2:
        "I joined the garden club because I love plants and gardening. I want to learn more about growing different types of plants and how to take care of them.",
    },
    questions3: {
      question3_1: "Describe your garden?",
      question3_2: "Do people in your country like gardening?",
      question3_3: "What is your favorite season? Why?",
    },
    questions3_answer: {
      question3_1_answer:
        "My garden is small but cozy, with lots of flowers and a few vegetable plants. I have a small area for relaxing, and I love spending time there, especially in the morning.",
      question3_2_answer:
        "Yes, gardening is quite popular in my country. Many people enjoy growing flowers, vegetables, and fruits. It’s a great way to relax and connect with nature while having fresh produce.",
      question3_3_answer:
        "My favorite season is spring because the weather is mild, and everything starts to bloom. It’s a time of renewal, and I love seeing the flowers and trees come to life.",
    },
    question4_1_text: "Write a short email to your friend (about 50 words). ",
    question4_2_text:
      "Write an email to the president of the club (about 120-150 words).",
    question4_1_text_answer:
      'Hi Linh, <br> \r\n    I just heard that the talk on "The Gardens of Japan" has been canceled because Mr. Seiko is ill. Mr. Jones will give his talk on "The Gardens of England" again. I’ve heard him before, but I think it’ll still be interesting. \r\n    <br>Let me know if you plan to attend! \r\n    <br>Best, \r\n    <br>Phuong',
    question4_2_text_answer:
      'Dear Club President, \r\n    <br> I was disappointed to hear that the talk and slide show on "The Gardens of Japan" by Mr. Seiko has been canceled due to his illness. It’s unfortunate, as I was looking forward to it. However, I’m happy to hear that Mr. Jones will give his talk on "The Gardens of England" again. I’ve attended his previous talks, and I believe they are always informative and enjoyable.  \r\n    <br> In terms of suggestions, perhaps we could plan a future event on Japanese gardens once Mr. Seiko has recovered. Additionally, I would love to hear more about other international gardens or new gardening techniques in upcoming talks.  \r\n    <br> Thank you for your efforts in organizing these events. I look forward to hearing Mr. Jones again!  \r\n    <br> Best regards,  \r\n    <br> Jimmy',
  },
  {
    club_name: "Healthy club",
    key: 17,
    questions1: {
      question1_1: "What do you usually do on weekends?",
      question1_2: "What do you do to keep fit?",
      question1_3: "What are you wearing today?",
      question1_4: "What language do you speak?",
      question1_5: "What is your first language?",
    },
    questions1_answer: {
      question1_1_answer: "I usually relax and read.",
      question1_2_answer: "I jog and do yoga.",
      question1_3_answer: "I’m wearing a jacket.",
      question1_4_answer: "I speak Vietnamese.",
      question1_5_answer: "My first language is Vietnamese.",
    },
    questions2_answer: {
      question2:
        "I would like to take yoga and cardio classes. I’m available on weekdays in the evenings, preferably around 6 PM. Weekend morning sessions would also work for me.",
    },
    questions3: {
      question3_1: "Hi! Welcome to the club. How did you hear about the club?",
      question3_2: "Hi! What do you hope to achieve by joining the club?",
      question3_3:
        "A manager of Fitness club has an announcement for club’s members",
    },
    questions3_answer: {
      question3_1_answer:
        "I heard about the club from a friend who has been a member for a while. She recommended it because of the great facilities and friendly atmosphere, so I decided to join.",
      question3_2_answer:
        "By joining the club, I hope to improve my overall fitness, learn new exercises, and make healthier lifestyle choices. I also want to meet new people who share similar fitness goals.",
      question3_3_answer:
        "The manager of the Fitness Club has announced new fitness classes starting next month. Members can sign up for a variety of classes including yoga, pilates, and high-intensity training.",
    },
    question4_1_text: "Write a short email to your friend (about 50 words). ",
    question4_2_text:
      "Write an email to the president of the club (about 120-150 words).",
    question4_1_text_answer:
      "Hi Linh, <br> \r\n    I just heard that the instructor will be away for the next two weeks. We will have to use the facilities on our own during this time. It might be challenging, but we’ll manage. \r\n    <br>Let me know if you need help! \r\n    <br>Best, \r\n    <br>Phuong",
    question4_2_text_answer:
      "Dear Club President, \r\n    <br> I understand that due to personal reasons, the instructor will be absent for the next two weeks, and we will be using the facilities without assistance. Although it’s unfortunate, I believe we can manage by following the usual routines and helping each other out. It might be a good opportunity for us to learn more independently and improve our skills.  \r\n    <br> However, if any members feel uncertain, I suggest we organize a few group sessions where we can support each other. Additionally, it might be helpful to have a guideline available for everyone during this period.  \r\n    <br> I hope everything goes well, and I look forward to seeing everyone continue their training.  \r\n    <br> Best regards,  \r\n    <br> Jimmy",
  },
  {
    club_name: "Home living club",
    key: 18,
    questions1: {
      question1_1: "What is your first school?",
      question1_2: "What’s the weather like today?",
      question1_3: "What is your favorite type of music?",
      question1_4: "What kinds of movies do you like?",
      question1_5: "What is your favorite film?",
    },
    questions1_answer: {
      question1_1_answer: "My first school was ABC.",
      question1_2_answer: "It's sunny today.",
      question1_3_answer: "I love pop music.",
      question1_4_answer: "I like action movies.",
      question1_5_answer: "My favorite film is Inception.",
    },
    questions2_answer: {
      question2:
        "I live in Hanoi, the capital of Vietnam. It's a bustling city known for its rich history, beautiful lakes, ancient temples, and vibrant street food culture.",
    },
    questions3: {
      question3_1:
        "You have to stay in the bedroom but have to share with your brother. How do you feel?",
      question3_2:
        "It is better to live in the city than in the countryside. Do you agree? Why?",
      question3_3:
        "It is better to live in the city than in the countryside. Do you agree? Why?",
    },
    questions3_answer: {
      question3_1_answer:
        "Sharing a bedroom with my brother can be challenging, but it also has its benefits. We get to spend time together, and it helps build a stronger bond despite the limited space.",
      question3_2_answer:
        "Living in the city offers many conveniences such as better job opportunities, healthcare, and entertainment. However, the countryside provides peace, fresh air, and a slower pace of life, which some people prefer.",
      question3_3_answer:
        "I agree that living in the city has its advantages, like access to modern amenities and social opportunities. However, I also appreciate the tranquility and natural beauty that the countryside offers.",
    },
    question4_1_text: "Write a short email to your friend (about 50 words).",
    question4_2_text:
      "Write an email to the president of the club (about 120-150 words).",
    question4_1_text_answer:
      "Hi Linh, <br> \r\n    I just heard that the club is asking for suggestions on how to help young families find a home. I think we could suggest offering affordable housing options and providing helpful resources like financial advice.\r\n    <br>Let me know what you think!\r\n    <br>Best, \r\n    <br>Phuong",
    question4_2_text_answer:
      "Dear Club President, \r\n    <br> I understand that many young families are currently looking to buy a home or apartment. I believe the club can make a positive impact by offering practical suggestions to help them in their search.  \r\n    <br> First, I suggest organizing a workshop where experts can provide advice on affordable housing options, mortgages, and how to find the best deals. Additionally, we could provide a list of trusted real estate agents and financial consultants who specialize in first-time home buyers. \r\n    <br> Lastly, creating a community of people who have successfully purchased homes could be helpful for sharing their experiences and advice. I believe these steps will assist young families in their search and make the process easier for them.  \r\n    <br> Thank you for considering these suggestions. I look forward to your feedback.  \r\n    <br> Best regards,  \r\n    <br> Jimmy",
  },
  {
    club_name: "Language club",
    key: 19,
    questions1: {
      question1_1: "What is your favorite animal?",
      question1_2: "What is your favorite hobby?",
      question1_3: "What is your favorite food?",
      question1_4: "What is your favorite time of the day?",
      question1_5: "What is your favorite season?",
    },
    questions1_answer: {
      question1_1_answer: "I love cats.",
      question1_2_answer: "I enjoy reading.",
      question1_3_answer: "I love pizza.",
      question1_4_answer: "I prefer the evening.",
      question1_5_answer: "I love the spring.",
    },
    questions2_answer: {
      question2:
        "In my free time, I enjoy reading books, listening to music, and practicing languages. I also love traveling and learning about different cultures to improve my language skills.",
    },
    questions3: {
      question3_1: "Why did you choose this course?",
      question3_2:
        "How have you found the course so far? What’s been difficult?",
      question3_3: "What are you hoping to do when you finish the course?",
    },
    questions3_answer: {
      question3_1_answer:
        "I chose this course because I want to improve my language skills, especially in speaking and writing. It seemed like a great opportunity to practice with others and expand my knowledge.",
      question3_2_answer:
        "The course has been quite interesting so far, but I find the grammar lessons a bit challenging. However, I enjoy the conversations and interactive activities which make learning more fun.",
      question3_3_answer:
        "After finishing the course, I hope to become fluent and confident in speaking the language. I also plan to use it for travel and potentially work opportunities in countries where it's spoken.",
    },
    question4_1_text:
      "Write a short email to your friend (about 50 words). Write about your feelings and recommend the course to her/him .",
    question4_2_text:
      "Write an email to the president of the club (about 120-150 words). You have registered for an English course at A Level Speaking Center but in the end you can’t arrange the time to attend the course. Write about your feelings, the reason why you can’t attend and what you would like to do.",
    question4_1_text_answer:
      "Hi Linh, <br> \r\n    I’ve been attending an English course at the American Dream Center for two months now, and it’s been really effective! The lessons are useful and the teachers are great. I recommend it to you if you’re looking to improve your English! \r\n    <br>Best, \r\n    <br>Phuong",
    question4_2_text_answer:
      "Dear Club President, \r\n    <br> I am writing to inform you that I have registered for the English course at A Level Speaking Center, but unfortunately, I am unable to attend due to scheduling conflicts. The course seems excellent, but my current commitments make it difficult to find time. I am disappointed as I was looking forward to improving my language skills. \r\n    <br> I would like to inquire about possible alternatives, such as rescheduling or enrolling in a future course. If possible, I would also appreciate any online learning options to stay on track. I am committed to improving my English and would love to continue with the center once I can arrange my schedule.\r\n    <br> Thank you for your understanding. I look forward to your advice. \r\n    <br> Best regards,  \r\n    <br> Jimmy",
  },
  {
    club_name: "Language club 2",
    key: 20,
    questions1: {
      question1_1: "Where are you from?",
      question1_2: "What’s the weather like today?",
      question1_3: "What do you do in your free time?",
      question1_4: "First language?",
      question1_5: "Who do you usually go to the movies with?",
    },
    questions1_answer: {
      question1_1_answer: "I’m from Hanoi.",
      question1_2_answer: "It’s sunny today.",
      question1_3_answer: "I read books.",
      question1_4_answer: "My first language is Vietnamese.",
      question1_5_answer: "I go with friends.",
    },
    questions2_answer: {
      question2:
        "I often use foreign languages when traveling, communicating with international friends, reading books or articles, and watching movies or shows in their original language to improve my skills.",
    },
    questions3: {
      question3_1:
        "I used to learn French and found it very interesting. Tell me about a memory you have with a foreign language?",
      question3_2:
        "I am very forgetful. Can you give me some tips on how to remember new words?",
      question3_3:
        "Some people learn English through videos and reading books. However, there are also many private classes and teachers. What do you think is the most effective way to learn?",
    },
    questions3_answer: {
      question3_1_answer:
        "I have a great memory of using English when traveling abroad. I practiced speaking with locals, which helped me improve my fluency and gave me the confidence to continue learning the language.",
      question3_2_answer:
        "To remember new words, try associating them with images, creating sentences, and reviewing them regularly. Flashcards and spaced repetition can also be helpful for reinforcing memory over time.",
      question3_3_answer:
        "I believe a combination of methods is most effective. Private classes with teachers provide structure and feedback, while videos and books help with immersion. A balanced approach accelerates learning.",
    },
    question4_1_text: "Write a short email to your friend (about 50 words).",
    question4_2_text:
      "Write an email to the president of the club (about 120-150 words).",
    question4_1_text_answer:
      "Hi Linh, <br> \r\n    I just heard that the club is organizing a lecture soon and is looking for a guest speaker. The theme will be about learning languages. It sounds like a great opportunity! \r\n    <br>Let me know if you’re interested! \r\n    <br>Best, \r\n    <br>Phuong",
    question4_2_text_answer:
      "Dear Club President, \r\n    <br> I was excited to hear about the upcoming lecture the club is organizing, and I believe it’s a wonderful opportunity to discuss the theme of learning languages. I would like to suggest a few ideas for the guest speaker and the presentation.  \r\n    <br> For the guest speaker, I recommend inviting someone who has experience in language learning, perhaps a polyglot or a language teacher. They could share practical tips and strategies for mastering a new language. As for the theme, I believe focusing on methods like immersive learning and language exchange would engage our members and provide them with valuable insights.  \r\n    <br> I’m happy to assist with organizing or reaching out to potential speakers. I look forward to hearing your thoughts on these suggestions.  \r\n    <br> Best regards,  \r\n    <br> Jimmy",
  },
  {
    club_name: "Movie club",
    key: 21,
    questions1: {
      question1_1: "What is your favorite sport?",
      question1_2: "What is your favorite color?",
      question1_3: "What is your favorite device?",
      question1_4: "What do you do?",
      question1_5: "Which job would you like to do in the future?",
    },
    questions1_answer: {
      question1_1_answer: "I love football.",
      question1_2_answer: "My favorite color is blue.",
      question1_3_answer: "I like my phone.",
      question1_4_answer: "I’m a student.",
      question1_5_answer: "I’d like to be a teacher.",
    },
    questions2_answer: {
      question2:
        "I joined the movie club because I love watching films and discussing them with others. It's a great way to discover new movies and share thoughts with fellow movie enthusiasts.",
    },
    questions3: {
      question3_1: "Hi! When and where do you usually watch movies?",
      question3_2:
        "I want to make movies for young children. Give me some suggestions?",
      question3_3:
        "How do you think technology affects the way we watch movies in the future?",
    },
    questions3_answer: {
      question3_1_answer:
        "I usually watch movies in the evenings at home with friends or family. Sometimes, I go to the theater for new releases. I enjoy watching a mix of genres depending on my mood.",
      question3_2_answer:
        "For making movies for young children, I suggest focusing on colorful visuals, engaging characters, and simple yet meaningful stories. Keep the content educational, fun, and age-appropriate to hold their attention.",
      question3_3_answer:
        "Technology will revolutionize the way we watch movies by offering more immersive experiences through VR and AR. Streaming services will continue to grow, and interactive films may become more common in the future.",
    },
    question4_1_text: "Write a short email to your friend (about 50 words).",
    question4_2_text:
      "Write an email to the president of the club (about 120-150 words).",
    question4_1_text_answer:
      "Hi Linh, <br> \r\n    I just heard that the club is going to be repaired. We need to find an alternative place to meet. How about meeting at the park or organizing an outdoor activity for now? Let me know!\r\n    <br>Best, \r\n    <br>Phuong",
    question4_2_text_answer:
      "Dear Club President, \r\n    <br> I was informed that the club will be undergoing repairs soon, and I understand the situation. While we wait for the renovation to be completed, I would like to suggest organizing meetings at an alternative location, such as a nearby park or community center. We could also plan some outdoor activities or small workshops that will allow members to continue meeting and interacting. \r\n    <br> If possible, we could even host a virtual event or discussion for members who are unable to attend in person. I believe these alternatives would help keep the members engaged and maintain the sense of community during this period of transition. \r\n    <br> I hope these suggestions are helpful, and I look forward to hearing your thoughts.  \r\n    <br> Best regards,  \r\n    <br> Jimmy",
  },
  {
    club_name: "Museum club",
    key: 22,
    questions1: {
      question1_1: "How do you go to school?",
      question1_2: "How do you get to work?",
      question1_3: "How do you relax?",
      question1_4: "How are you?",
      question1_5: "How many people are there in your family?",
    },
    questions1_answer: {
      question1_1_answer: "I go by bike.",
      question1_2_answer: "I drive to work.",
      question1_3_answer: "I listen to music.",
      question1_4_answer: "I'm doing great!",
      question1_5_answer: "There are four people.",
    },
    questions2_answer: {
      question2:
        "The last time I went to a museum was last month. I visited the History Museum in my city, and it was fascinating to learn about the culture and artifacts.",
    },
    questions3: {
      question3_1:
        "Please talk about the first museum you visited when you were a child?",
      question3_2: "What kind of museum do you like?",
      question3_3:
        "Nowadays, many museums use technology to create online exhibitions. Do you think that will be successful?",
    },
    questions3_answer: {
      question3_1_answer:
        "The first museum I visited was a children's museum. I remember being fascinated by the interactive exhibits and learning about science and nature in a fun, hands-on way. It left a lasting impression.",
      question3_2_answer:
        "I like museums that focus on history and culture, especially those that showcase ancient artifacts or art. I enjoy learning about the past and how it shapes our present world.",
      question3_3_answer:
        "I believe online exhibitions can be very successful, especially in making museums more accessible. However, physical visits will still offer a more immersive and engaging experience that technology can't fully replicate.",
    },
    question4_1_text:
      "Write a short email to your friend (about 50 words). Please give your opinions.",
    question4_2_text:
      "Write an email to the president of the club (about 120-150 words). Please give your opinions.",
    question4_1_text_answer:
      "Hi Linh, <br> \r\n    I just heard that the museum club is considering charging a fee for visits. I think it's a great idea as it could help maintain the museum, but it might discourage some people from visiting. What do you think?\r\n    <br>Let me know! \r\n    <br>Best, \r\n    <br>Phuong",
    question4_2_text_answer:
      "Dear Club President, \r\n    <br> I recently learned that the museum club is considering implementing a fee for visiting the museum. While I understand that it could generate funds for maintenance and improvements, I am concerned that it may limit access for some members.  \r\n    <br> Perhaps we could explore alternative funding methods such as organizing events or applying for grants. Another idea could be offering a membership system where paying members could get discounts or exclusive access. I believe these options could ensure the museum remains accessible while still being financially sustainable. \r\n    <br> Thank you for considering my suggestions. I look forward to hearing your thoughts.  \r\n    <br> Best regards,  \r\n    <br> Jimmy",
  },
  {
    club_name: "Music club",
    key: 23,
    questions1: {
      question1_1: "How many phones do you have?",
      question1_2: "How often do you go shopping?",
      question1_3: "Where are you from?",
      question1_4: "Where do you live?",
      question1_5: "Where would you like to live?",
    },
    questions1_answer: {
      question1_1_answer: "I have two phones.",
      question1_2_answer: "I shop once a week.",
      question1_3_answer: "I’m from Hanoi.",
      question1_4_answer: "I live in Hanoi.",
      question1_5_answer: "I’d like to live abroad.",
    },
    questions2_answer: {
      question2:
        "When I listen to music, I usually relax, close my eyes, and enjoy the rhythm. Sometimes, I sing along or focus on the lyrics to understand the song better.",
    },
    questions3: {
      question3_1:
        "There are songs that make me relax and there are songs that make me sad. What about you?",
      question3_2:
        "Playing loud music annoys people around you, what do you think?",
      question3_3:
        "I want to learn how to play music and I want to find a good teacher. Can you give me some advice?",
    },
    questions3_answer: {
      question3_1_answer:
        "I agree! Some songs really help me relax, especially slow instrumental music. But there are also songs that bring back memories and make me feel sad, depending on the mood.",
      question3_2_answer:
        "I think playing loud music can be disruptive, especially in shared spaces. It's important to respect others by using headphones or keeping the volume at a reasonable level when possible.",
      question3_3_answer:
        "To learn music, I recommend starting with simple instruments like piano or guitar. Look for a teacher who can adapt to your learning pace. Online lessons or local music schools are good options.",
    },
    question4_1_text:
      "Write a short email to your friend (about 50 words). Write an email about why you want to be a volunteer and contribute your ideas to the event.",
    question4_2_text:
      "Write an email to the president of the club (about 120-150 words). Write an email about why you want to be a volunteer and contribute your ideas to the event.",
    question4_1_text_answer:
      "Hi Linh, <br> \r\n    I just heard that the club is looking for volunteers to help organize the event. I think it’s a great opportunity to contribute and share my ideas. I’m available in the evenings, so I’d love to participate!\r\n    <br>Let me know if you want to join!\r\n    <br>Best, \r\n    <br>Phuong",
    question4_2_text_answer:
      "Dear Club President, \r\n    <br> I am excited to hear that the club is looking for volunteers to organize the upcoming event. I would love to contribute by helping with the planning and execution. I believe my experience in organizing smaller events can bring value to the team.  \r\n    <br> I would also like to share some ideas for the event, such as incorporating interactive activities and creating a social media campaign to promote it. I’m available in the evenings, and I’m happy to contribute my time to make this event successful.  \r\n    <br> I look forward to working with the team and contributing to the success of the event.  \r\n    <br> Best regards,  \r\n    <br> Jimmy",
  },
  {
    club_name: "Nature club",
    key: 24,
    questions1: {
      question1_1: "Where do you like to go in the summer?",
      question1_2: "A place you would like to visit in your country?",
      question1_3: "When and where do you usually listen to music?",
      question1_4: "When do you usually watch TV?",
      question1_5: "When was the last time you went out?",
    },
    questions1_answer: {
      question1_1_answer: "I like going to the beach.",
      question1_2_answer: "I want to visit Hanoi.",
      question1_3_answer: "I listen to music in the evening.",
      question1_4_answer: "I watch TV at night.",
      question1_5_answer: "I went out last weekend.",
    },
    questions2_answer: {
      question2:
        "In my free time, I enjoy reading books, watching movies, and listening to music. I also like exploring new places, cooking, and spending time with my friends and family.",
    },
    questions3: {
      question3_1: "Hi! Welcome to the club. Where do you like to visit?",
      question3_2: "Hi! Why did you decide to join the club?",
      question3_3:
        "The bigger the club, the more environmentally conscious people are, right?",
    },
    questions3_answer: {
      question3_1_answer:
        "I like to visit natural places like mountains, beaches, and national parks. I enjoy exploring new environments, connecting with nature, and experiencing different cultures through travel.",
      question3_2_answer:
        "I decided to join the club because I love meeting new people, sharing common interests, and learning from others. I believe it's a great way to expand my knowledge and have fun.",
      question3_3_answer:
        "While having a larger club can encourage more environmentally conscious behavior, it's not guaranteed. A club's size doesn't necessarily correlate with its members' level of awareness or commitment to the environment.",
    },
    question4_1_text: "Write a short email to your friend (about 50 words).",
    question4_2_text:
      "Write an email to the president of the club (about 120-150 words).",
    question4_1_text_answer:
      "Hi Linh, <br> \r\n    I just heard that the club is planning to create a program to encourage young people to be more active instead of staying home playing games. I think it's a great idea! Let me know your thoughts.\r\n    <br>Best, \r\n    <br>Phuong",
    question4_2_text_answer:
      "Dear Club President, \r\n    <br> I understand that many young people prefer staying at home and playing games, and this is affecting their physical and social activities. I think the club can help by organizing events that encourage them to be more active and engage with others.  \r\n    <br> My suggestion is to create a fun and interactive program where young people can participate in games, sports, and team-building activities. These events should also include educational sessions about balancing technology use and physical activity.  \r\n    <br> I would be happy to assist in organizing such events and believe this could help make a positive impact on the younger generation. Thank you for considering my ideas, and I look forward to your feedback.  \r\n    <br> Best regards,  \r\n    <br> Jimmy",
  },
  {
    club_name: "Outdoor club",
    key: 25,
    questions1: {
      question1_1: "Who do you usually go to the movies with?",
      question1_2: "Do you like to take photos?",
      question1_3: "Where do you like to go on holiday?",
      question1_4: "What’s your favorite color?",
      question1_5: "What did you do last night?",
    },
    questions1_answer: {
      question1_1_answer: "I go with friends.",
      question1_2_answer: "Yes, I love it.",
      question1_3_answer: "I love the beach.",
      question1_4_answer: "My favorite color is blue.",
      question1_5_answer: "I watched a movie.",
    },
    questions2_answer: {
      question2:
        "I enjoy hiking, cycling, and playing badminton. These activities help me stay active, relax, and enjoy nature. I also love the social aspect of outdoor sports with friends.",
    },
    questions3: {
      question3_1:
        "Hi! Welcome to the club. Tell me about the outdoor activities in the bad weather",
      question3_2: "Hi! Please give your ideas and advice for hiking?",
      question3_3:
        "What are the most popular outdoor activities in your country?",
    },
    questions3_answer: {
      question3_1_answer:
        "In bad weather, indoor activities like indoor cycling, gym workouts, or even indoor rock climbing are great alternatives. You can still stay active and have fun while staying dry.",
      question3_2_answer:
        "For hiking, I recommend wearing comfortable shoes, carrying enough water, and checking the weather forecast. It’s important to pace yourself and carry a first-aid kit, especially on longer hikes.",
      question3_3_answer:
        "In my country, football, badminton, and cycling are very popular outdoor activities. Many people also enjoy hiking, running, and going to the beach, especially during the warm months.",
    },
    question4_1_text: "Write a short email to your friend (about 50 words).",
    question4_2_text:
      "Write an email to the president of the club (about 120-150 words).",
    question4_1_text_answer:
      "Hi Linh, <br> \r\n    I just heard that the club is organizing a summer trip. I’m thinking of suggesting both the mountains and the coast as options. The mountains are great for hiking and relaxation, while the coast is perfect for beach activities. \r\n    <br>Let me know what you think!\r\n    <br>Best, \r\n    <br>Phuong",
    question4_2_text_answer:
      "Dear Club President, \r\n    <br> I’m excited to hear that the club is organizing a summer trip. I believe both the mountains and the coast offer great options for our members, and it’s important to cater to both young and old people.  \r\n    <br> For younger members, I suggest activities like hiking, swimming, and beach sports at the coast. It’s a perfect chance for them to have fun and stay active. For the older generation, a peaceful trip to the mountains with sightseeing and nature walks would be a great idea. \r\n    <br> This way, we can offer something enjoyable for all ages, and everyone can appreciate the beauty of nature in their own way. I’d be happy to help organize or promote the trip!\r\n    <br> Best regards,  \r\n    <br> Jimmy",
  },
  {
    club_name: "Photography club",
    key: 26,
    questions1: {
      question1_1: "Who do you usually go to the movies with?",
      question1_2: "Who do you like spending time with?",
      question1_3: "Do you like taking photos?",
      question1_4: "Do you often use Facebook?",
      question1_5: "Tell me the last time you watched TV.",
    },
    questions1_answer: {
      question1_1_answer: "I go with friends.",
      question1_2_answer: "I like spending time alone.",
      question1_3_answer: "Yes, I love it.",
      question1_4_answer: "I use Facebook occasionally.",
      question1_5_answer: "I watched TV last night.",
    },
    questions2_answer: {
      question2:
        "The last time I took a picture was during a weekend trip to the mountains. I captured the beautiful scenery, with clear skies and vibrant greenery, which was truly breathtaking.",
    },
    questions3: {
      question3_1: "Hi! Welcome to the club. How to have a beautiful picture?",
      question3_2:
        "I often save my photos as files on my computer or print them out. How do you save your photos?",
      question3_3: "What skills do you need to take good photos?",
    },
    questions3_answer: {
      question3_1_answer:
        "To have a beautiful picture, it's important to focus on lighting, composition, and framing. Also, using the right camera settings and editing afterward can enhance the image's appeal.",
      question3_2_answer:
        "I usually save my photos both digitally on cloud storage and on an external hard drive. I also occasionally print them out to create albums or frame my favorite shots.",
      question3_3_answer:
        "To take good photos, you need skills in composition, understanding lighting, choosing the right angles, and mastering camera settings. Editing also plays an important role in enhancing the final image.",
    },
    question4_1_text: "Write a short email to your friend (about 50 words).",
    question4_2_text:
      "Write an email to the president of the club (about 120-150 words).",
    question4_1_text_answer:
      "Hi Linh, <br> \r\n    I just heard that the club is organizing an exhibition to display the best photographs. I think it’s a great idea! We should ensure the exhibition is engaging for both young and old people. \r\n    <br>Let me know if you’re interested in helping out!\r\n    <br>Best, \r\n    <br>Phuong",
    question4_2_text_answer:
      "Dear Club President, \r\n    <br> I am excited to hear that the club is organizing an exhibition to display members' best photographs. I believe it is important to make the exhibition appealing to both young and old members.  \r\n    <br> To cater to everyone, we could consider displaying a variety of photography styles, such as landscape, portraits, and black-and-white photos, so there’s something for everyone to enjoy. Additionally, interactive elements like a photo voting system or a digital slideshow could keep visitors engaged.  \r\n    <br> I would be happy to volunteer to help organize the event, assist with curating the photographs, or help with promoting it. I believe this exhibition will be a great opportunity for all members to showcase their work.  \r\n    <br> Best regards,  \r\n    <br> Jimmy",
  },
  {
    club_name: "Reading club",
    key: 27,
    questions1: {
      question1_1: "How is the weather today?",
      question1_2: "What is your favorite season of the year?",
      question1_3: "What do you like to do every morning?",
      question1_4: "What do you like to do in your free time?",
      question1_5: "What is your job?",
    },
    questions1_answer: {
      question1_1_answer: "The weather is sunny.",
      question1_2_answer: "I love the spring.",
      question1_3_answer: "I like to read.",
      question1_4_answer: "I enjoy reading books.",
      question1_5_answer: "I’m a student.",
    },
    questions2_answer: {
      question2:
        "The last time I read a book was last week. It was a mystery novel, and I enjoyed it a lot. The plot was exciting, and the characters were very engaging.",
    },
    questions3: {
      question3_1:
        "I like reading sports magazines. What genre of books do you like to read? Why?",
      question3_2:
        "I have a lot of books for my studies, but I can't remember everything I read. Do you have any suggestions for me?",
      question3_3:
        "Children nowadays prefer playing games to reading books. Do you think this is worrying, why?",
    },
    questions3_answer: {
      question3_1_answer:
        "I enjoy reading fiction, especially mystery and fantasy books. I love how these genres allow me to escape into different worlds and stimulate my imagination with complex plots and characters.",
      question3_2_answer:
        "To retain information, try summarizing key points after reading, and review your notes regularly. Additionally, breaking the material into smaller sections and studying in intervals can improve memory retention.",
      question3_3_answer:
        "It is worrying that children prefer playing games over reading, as reading helps with cognitive development, language skills, and imagination. We should encourage children to balance both activities for their growth.",
    },
    question4_1_text: "Write a short email to your friend (about 50 words).",
    question4_2_text:
      "Write an email to the president of the club (about 120-150 words).",
    question4_1_text_answer:
      "Hi Linh, <br> \r\n    I just heard that the club is asked to help redesign the national library. I think it’s a great chance! We should make the library more interactive with modern technology and events. \r\n    <br>What do you think?\r\n    <br>Best, \r\n    <br>Phuong",
    question4_2_text_answer:
      "Dear Club President, \r\n    <br> I am excited to hear that the club has been invited to contribute to the redesign of the national library. I believe this is a great opportunity to make the library a more engaging and modern place for both young and old.  \r\n    <br> To make the library more appealing, we could add interactive exhibits, digital learning tools, and areas for social events. Incorporating comfortable seating areas, cafes, and art exhibitions would also attract more visitors. Additionally, hosting workshops, book clubs, and educational events for all ages could make the library a lively community hub. \r\n    <br> I am happy to contribute my ideas and assist in any way needed to bring these ideas to life. Thank you for considering my suggestions.  \r\n    <br> Best regards,  \r\n    <br> Jimmy",
  },
  {
    club_name: "Science club",
    key: 28,
    questions1: {
      question1_1: "What is your favorite color?",
      question1_2: "What is your first school?",
      question1_3: "What do you do in your free time?",
      question1_4: "What is your favorite sport?",
      question1_5: "What did you do last night?",
    },
    questions1_answer: {
      question1_1_answer: "My favorite color is blue.",
      question1_2_answer: "My first school was ABC.",
      question1_3_answer: "I like reading books.",
      question1_4_answer: "I love football.",
      question1_5_answer: "I watched a movie.",
    },
    questions2_answer: {
      question2:
        "I like science because it helps me understand how the world works. It answers many questions and allows me to explore new discoveries and innovations that improve our lives.",
    },
    questions3: {
      question3_1:
        "Why did you decide to join our Science Club? How often can you go to the club?",
      question3_2:
        "In the past, you learnt about Science in school. Do you remember something about Science?",
      question3_3: "Who is your favorite inventor or scientist? Why?",
    },
    questions3_answer: {
      question3_1_answer:
        "I decided to join the Science Club because I’m passionate about learning new scientific concepts and experiments. I can attend meetings twice a week, as I enjoy the hands-on activities and discussions.",
      question3_2_answer:
        "Yes, I remember learning about the scientific method and topics like physics and biology in school. I especially enjoyed studying ecosystems and how different species interact with each other in nature.",
      question3_3_answer:
        "My favorite scientist is Albert Einstein because of his groundbreaking theories in physics. His work revolutionized our understanding of space, time, and energy, which continues to impact science today.",
    },
    question4_1_text: "Write a short email to your friend (about 50 words).",
    question4_2_text:
      "Write an email to the president of the club (about 120-150 words).",
    question4_1_text_answer:
      "Hi Linh, <br> \r\n    I just heard that our club is preparing for the science exhibition next month. I think it would be great if we could have interactive displays for all ages. Maybe we could issue tickets for entry, too. Let me know what you think!\r\n    <br>Best, \r\n    <br>Phuong",
    question4_2_text_answer:
      "Dear Club President, \r\n    <br> I’m excited to hear about the upcoming science exhibition next month! I believe this event is a wonderful opportunity for both young and old to engage with science in a fun and educational way.  \r\n    <br> To ensure the success of the exhibition, I suggest we have interactive displays and hands-on experiments. We could also offer workshops for all age groups, allowing them to learn and participate actively. As for the tickets, I think it might be a good idea to issue tickets to manage the number of participants and to raise funds for future events. \r\n    <br> I am happy to contribute my ideas and help organize the event. I believe this exhibition will be a fantastic learning experience for everyone. \r\n    <br> Best regards,  \r\n    <br> Jimmy",
  },
  {
    club_name: "Social club",
    key: 29,
    questions1: {
      question1_1: "What’s the weather like today?",
      question1_2: "How are you?",
      question1_3: "What’s your favorite hobby?",
      question1_4: "How do you get to work?",
      question1_5: "What do you like to do in the evening?",
    },
    questions1_answer: {
      question1_1_answer: "It’s sunny today.",
      question1_2_answer: "I’m doing great, thanks!",
      question1_3_answer: "I enjoy reading books.",
      question1_4_answer: "I drive to work.",
      question1_5_answer: "I like watching TV.",
    },
    questions2_answer: {
      question2:
        "My best friend is someone who is always supportive and understanding. We share common interests and have fun together, whether it's hanging out or working on projects.",
    },
    questions3: {
      question3_1: "What do you do when you go out with your friends?",
      question3_2: "Is it easier for young people to have friends?",
      question3_3:
        "It is much easier to make new friends these days because of computers and mobile phones. Do you agree? Why or why not?",
    },
    questions3_answer: {
      question3_1_answer:
        "When I go out with my friends, we often visit cafes, watch movies, or just hang out and chat. It’s always fun to catch up and relax together in a comfortable setting.",
      question3_2_answer:
        "Yes, I believe it’s easier for young people to make friends today. Social media and online platforms allow them to meet and connect with others, making it more accessible to build relationships.",
      question3_3_answer:
        "I agree that technology makes it easier to meet new people, but it’s important to build deeper connections in person. Online interactions can be helpful but might not always lead to meaningful friendships.",
    },
    question4_1_text: "Write a short email to your friend (about 50 words).",
    question4_2_text:
      "Write an email to the president of the club (about 120-150 words).",
    question4_1_text_answer:
      "Hi Linh, <br> \r\n    I just heard that the club is organizing monthly face-to-face meetings. I think meeting on weekends at a local park or community center would be great. It's convenient for both young and older people. \r\n    <br>Let me know what you think! \r\n    <br>Best, \r\n    <br>Phuong",
    question4_2_text_answer:
      "Dear Club President, \r\n    <br> I think organizing monthly face-to-face meetings is a fantastic idea. To make it accessible for both young and older members, I suggest holding the meetings at a central location like a local park or community center. Weekends would work best for most people, as it allows everyone to attend without interfering with work or school.  \r\n    <br> I also recommend considering different themes or activities for each meeting, like discussions, workshops, or outdoor activities, to keep it engaging for everyone. This will help build stronger connections between members while accommodating different preferences.  \r\n    <br> I’m happy to assist with organizing and promoting these meetings, and I look forward to seeing this idea come to life.  \r\n    <br> Best regards,  \r\n    <br> Jimmy",
  },
  {
    club_name: "Sports club",
    key: 30,
    questions1: {
      question1_1: "Tell me the last time you watched TV?",
      question1_2: "Why do you learn English?",
      question1_3: "What is your favorite subject in high school?",
      question1_4: "What do you like doing with your friend?",
      question1_5: "Where do you wanna go on holiday?",
    },
    questions1_answer: {
      question1_1_answer: "I watched TV last night.",
      question1_2_answer: "I learn English for travel.",
      question1_3_answer: "My favorite subject is Math.",
      question1_4_answer: "I like going shopping.",
      question1_5_answer: "I want to go to Paris.",
    },
    questions2_answer: {
      question2:
        "I joined the sports club to stay fit, meet new people, and enjoy playing sports. I love being active, and this club provides a great opportunity to do so regularly.",
    },
    questions3: {
      question3_1: "When was the last time you played sports?",
      question3_2:
        "I usually play sports with my friends and watch sports programs. What about you?",
      question3_3:
        "I like playing sports with my friend but my brother likes playing sports alone. What do you think about this issue?",
    },
    questions3_answer: {
      question3_1_answer:
        "The last time I played sports was last weekend. I went jogging in the park with a friend. It felt refreshing and helped me clear my mind after a busy week.",
      question3_2_answer:
        "I also play sports with my friends and enjoy watching sports events on TV. It’s a great way to bond with others and stay motivated to stay active and healthy.",
      question3_3_answer:
        "I think it’s perfectly fine for your brother to enjoy playing sports alone if that’s what he prefers. People have different preferences, and some enjoy solitary activities for peace and focus.",
    },
    question4_1_text: "Write a short email to your friend (about 50 words).",
    question4_2_text:
      "Write an email to the president of the club (about 120-150 words).",
    question4_1_text_answer:
      "Hi Linh, <br> \r\n    I just heard that the club is planning to organize a sports competition for young members. I think it would be fun to include a variety of sports like football, basketball, and running. \r\n    <br>Let me know your thoughts!\r\n    <br>Best, \r\n    <br>Phuong",
    question4_2_text_answer:
      "Dear Club President, \r\n    <br> I am excited to hear that the club is organizing a sports competition for young members. I think this event is a great way to engage everyone and promote a healthy lifestyle.  \r\n    <br> To make it more exciting and inclusive, I suggest organizing different types of activities such as football, basketball, and a relay race. We could also include fun games like tug-of-war or obstacle courses.  \r\n    <br> To attract more participants, we could offer small prizes or certificates for winners. I am happy to assist with organizing the event and helping in any way needed. Please let me know how I can contribute.\r\n    <br> Best regards,  \r\n    <br> Jimmy",
  },
  {
    club_name: "Technology club",
    key: 31,
    questions1: {
      question1_1: "How are you?",
      question1_2: "Which is your favorite season?",
      question1_3: "Which sports is the most popular in your country?",
      question1_4: "What are you wearing today?",
      question1_5: "What is your favorite kind of music?",
    },
    questions1_answer: {
      question1_1_answer: "I'm doing great, thanks!",
      question1_2_answer: "I love the spring.",
      question1_3_answer: "Football is popular.",
      question1_4_answer: "I’m wearing a dress.",
      question1_5_answer: "I enjoy listening to pop.",
    },
    questions2_answer: {
      question2:
        "I usually use my laptop for work, studying, and entertainment. I browse the internet, watch videos, do research, and sometimes play games or connect with friends online.",
    },
    questions3: {
      question3_1:
        "Do you often watch movies on your laptop or go to the theater?",
      question3_2:
        "I used to work on a laptop and it stopped and I lost all my notes. Tell me about a bad time with your computer?",
      question3_3:
        "Technological improvements have made our lives easier. what do you think?",
    },
    questions3_answer: {
      question3_1_answer:
        "I prefer watching movies in the theater because of the large screen and immersive sound. However, I do watch movies on my laptop when I want convenience and comfort at home.",
      question3_2_answer:
        "Once, my laptop crashed while I was working on an important project, and I lost all my notes. It was incredibly frustrating, but I learned to back up my data regularly afterward.",
      question3_3_answer:
        "Technological improvements have certainly made life easier. With advanced tools, we can communicate faster, work more efficiently, and have access to vast amounts of information right at our fingertips.",
    },
    question4_1_text: "Write a short email to your friend (about 50 words).",
    question4_2_text:
      "Write an email to the president of the club (about 120-150 words).",
    question4_1_text_answer:
      "Hi Linh, <br> \r\n    I just heard that the club is considering identifying users who post comments on the website. I think this is a good idea to prevent negativity and ensure more respectful interactions. \r\n    <br>Let me know your thoughts!\r\n    <br>Best, \r\n    <br>Phuong",
    question4_2_text_answer:
      "Dear Club President, \r\n    <br> I am aware of the negative comments on the club’s website recently, and I believe implementing a system that identifies users posting comments is a great idea to address the issue. This could help reduce disrespectful behavior and foster a more positive atmosphere within the club.  \r\n    <br> Additionally, I suggest we introduce guidelines for posting comments, encouraging members to express their opinions constructively. It may also help to appoint moderators to monitor content and ensure compliance.  \r\n    <br> I’m happy to assist in developing or enforcing these changes and believe that with these improvements, the club’s website will be a more welcoming and supportive space for all members.  \r\n    <br> Best regards,  \r\n    <br> Jimmy",
  },
  {
    club_name: "Television club",
    key: 32,
    questions1: {
      question1_1: "Who do you usually go to the movies with?",
      question1_2: "Do you like to take photos?",
      question1_3: "Where do you like to go on holiday?",
      question1_4: "What’s your favorite color?",
      question1_5: "What did you do last night?",
    },
    questions1_answer: {
      question1_1_answer: "I go with friends.",
      question1_2_answer: "Yes, I love it.",
      question1_3_answer: "I love the beach.",
      question1_4_answer: "My favorite color is blue.",
      question1_5_answer: "I watched a movie.",
    },
    questions2_answer: {
      question2:
        "I don't watch TV often, but I enjoy watching movies or series occasionally. I prefer streaming services because they offer more flexibility in what to watch.",
    },
    questions3: {
      question3_1: "What do you like to do when you watch TV?",
      question3_2: "Do you like watching TV alone or with others?",
      question3_3: "Is it good for children to watch TV programs too much?",
    },
    questions3_answer: {
      question3_1_answer:
        "When I watch TV, I like to relax and enjoy the show with a snack. Sometimes, I also multitask by browsing the internet or chatting with friends while watching.",
      question3_2_answer:
        "I enjoy watching TV with others, especially family or friends. It’s more fun to share reactions and discuss the plot, but I also enjoy some solo time with my favorite shows.",
      question3_3_answer:
        "It's not good for children to watch too much TV. It can lead to a sedentary lifestyle and affect their development. It’s important for kids to engage in other activities as well.",
    },
    question4_1_text: "Write a short email to your friend (about 50 words).",
    question4_2_text:
      "Write an email to the president of the club (about 120-150 words).",
    question4_1_text_answer:
      "Hi Linh, <br> \r\n    I just heard that our television club is organizing an event for foreigners. We should consider hosting it at a central location like a community hall or a public park. It would be great for accessibility!\r\n    <br>Let me know what you think! \r\n    <br>Best, \r\n    <br>Phuong",
    question4_2_text_answer:
      "Dear Club President, \r\n    <br> I am excited to hear that our television club is organizing an event for foreigners. I suggest hosting it at a location that's central and easy to reach, such as a community hall or public park. These places would offer enough space for a large crowd and ensure accessibility for everyone.  \r\n    <br> For the event itself, we could showcase popular TV shows, host Q&A sessions with directors or actors, and create interactive exhibits about television history. These activities will engage attendees of all ages and backgrounds.  \r\n    <br> I am happy to help organize and promote this event, and I believe it will be a great opportunity to bring people together.  \r\n    <br> Best regards,  \r\n    <br> Jimmy",
  },
  {
    club_name: "Travel club",
    key: 33,
    questions1: {
      question1_1: "What is your favorite subject in high school?",
      question1_2: "What do you like doing with your friend?",
      question1_3: "Where do you wanna go on holiday?",
      question1_4: "Why are you interested in travel?",
      question1_5: "Tell me a place you often visit?",
    },
    questions1_answer: {
      question1_1_answer: "I love studying math.",
      question1_2_answer: "I enjoy going shopping.",
      question1_3_answer: "I want to go to Paris.",
      question1_4_answer: "I love exploring new places.",
      question1_5_answer: "I often visit the park.",
    },
    questions2_answer: {
      question2:
        "I’m interested in travel because it allows me to experience different cultures, try new foods, and explore beautiful landscapes. It’s a great way to broaden my perspective and learn.",
    },
    questions3: {
      question3_1: "Tell me a time you had a trip in bad weather.",
      question3_2:
        "Traveling a long distance by some means of transportation is not good for the environment? Do you agree?",
      question3_3:
        "What are the most interesting places to visit in your country?",
    },
    questions3_answer: {
      question3_1_answer:
        "I once went on a hiking trip, and the weather turned bad with heavy rain and wind. Despite the tough conditions, we continued, and it became an unforgettable adventure. The weather made it more challenging but memorable.",
      question3_2_answer:
        "Yes, I agree that traveling long distances by transportation, especially air travel, negatively impacts the environment due to high carbon emissions. It's important to consider alternatives like trains or more eco-friendly options to reduce harm.",
      question3_3_answer:
        "Some of the most interesting places to visit in my country include Ha Long Bay, the ancient town of Hoi An, and the bustling city of Ho Chi Minh, each offering a unique cultural and natural experience.",
    },
    question4_1_text: "Write a short email to your friend (about 50 words).",
    question4_2_text:
      "Write an email to the president of the club (about 120-150 words).",
    question4_1_text_answer:
      "Hi Linh, <br> \r\n    I heard the Travel Club is planning to encourage tourists to visit the area. It’s important to ensure they behave politely. We could provide guidelines or even have guides to teach proper manners. \r\n    <br>What do you think?\r\n    <br>Best, \r\n    <br>Phuong",
    question4_2_text_answer:
      "Dear Club President, \r\n    <br> I’m excited to hear that the Travel Club is planning to promote tourism in the area. It’s important to ensure that visitors behave respectfully. I suggest providing clear guidelines on acceptable behavior for tourists, including respecting local customs and traditions.  \r\n    <br> We could also create welcome packages with information on etiquette and local norms. Organizing awareness sessions or having volunteers available to assist tourists would further encourage good behavior. Additionally, offering incentives for respectful tourists, like discounts at local businesses, could be effective.  \r\n    <br> I am happy to help implement these ideas and ensure that visitors have a positive experience while maintaining respect for the area.  \r\n    <br> Best regards,  \r\n    <br> Jimmy",
  },
  {
    club_name: "Travel club 2",
    key: 34,
    questions1: {
      question1_1: "Where are you from?",
      question1_2: "Where do you live?",
      question1_3: "Where would you like to live?",
      question1_4: "Where do you like to go in the summer?",
      question1_5: "A place you would like to visit in your country?",
    },
    questions1_answer: {
      question1_1_answer: "I’m from Hanoi.",
      question1_2_answer: "I live in Hanoi.",
      question1_3_answer: "I’d like to live in Paris.",
      question1_4_answer: "I like going to the beach.",
      question1_5_answer: "I’d like to visit Hoi An.",
    },
    questions2_answer: {
      question2:
        "I often visit a nearby park. It’s a peaceful place where I enjoy walking, reading, or just relaxing. I love the natural surroundings and the fresh air there.",
    },
    questions3: {
      question3_1: "What is the most exciting journey you’ve been on?",
      question3_2:
        "Can you remember the first time you went on a journey by yourself? What was it like?",
      question3_3:
        "Some people like taking photos when they have vacation. Your opinion?",
    },
    questions3_answer: {
      question3_1_answer:
        "The most exciting journey I’ve been on was a trip to the mountains last year. I hiked through beautiful trails, enjoyed stunning views, and experienced the thrill of being surrounded by nature.",
      question3_2_answer:
        "I remember my first solo journey when I traveled to a nearby city. It was both exciting and intimidating, but I learned so much about independence, navigation, and making new connections.",
      question3_3_answer:
        "I believe taking photos during vacations is a great way to preserve memories and capture beautiful moments. It allows us to relive the experiences and share them with others, making the trip more memorable.",
    },
    question4_1_text: "Write a short email to your friend (about 50 words).",
    question4_2_text:
      "Write an email to the president of the club (about 120-150 words).",
    question4_1_text_answer:
      "Hi Linh, <br> \r\n    I heard that the Travel Club is asking for ideas to help those traveling abroad for the first time. I think providing a guide on common phrases and using translation apps would be helpful.\r\n    <br>Let me know your thoughts! \r\n    <br>Best, \r\n    <br>Phuong",
    question4_2_text_answer:
      "Dear Club President, \r\n    <br> I’m excited to hear that the club is looking for ways to support travelers abroad, especially those traveling for the first time. I suggest providing a travel guide with common phrases in different languages to help with communication. Also, recommending useful apps like Google Translate and local language learning apps could ease the process.  \r\n    <br> Additionally, organizing workshops or online resources to familiarize members with cultural norms and etiquette in different countries would be valuable. It’s important to prepare travelers for common situations they might encounter abroad.  \r\n    <br> I am happy to assist in gathering resources or organizing these initiatives. I believe these efforts will make international travel a smoother experience for first-time travelers.  \r\n    <br> Best regards,  \r\n    <br> Jimmy",
  },
  {
    club_name: "Walking club",
    key: 35,
    questions1: {
      question1_1: "How is the weather today?",
      question1_2: "What is your favorite season of the year?",
      question1_3: "What do you usually do in your free time?",
      question1_4: "What is your favorite sport?",
      question1_5: "What is a place you would like to visit in your country?",
    },
    questions1_answer: {
      question1_1_answer: "It’s sunny today.",
      question1_2_answer: "I love the spring.",
      question1_3_answer: "I like reading books.",
      question1_4_answer: "I love football.",
      question1_5_answer: "I’d like to visit Hoi An.",
    },
    questions2_answer: {
      question2:
        "The last time I went for a walk was yesterday evening. I walked in the park, enjoyed the fresh air, and relaxed while watching the sunset. It was very refreshing.",
    },
    questions3: {
      question3_1: "I often go for a walk. What about you?",
      question3_2:
        "I prefer to go to the countryside for a walk. Walking in the city is stressful and noisy. What do you think?",
      question3_3:
        "In the past, people walked long distances as part of their lives. These days, they don't walk anymore. Why?",
    },
    questions3_answer: {
      question3_1_answer:
        "I also enjoy going for walks, especially in nature. I find it helps me relax, clear my mind, and stay active. Walking is a peaceful way to connect with the environment.",
      question3_2_answer:
        "I agree with you. The countryside offers a much more peaceful environment for walking compared to the city. The noise and traffic in urban areas can make walking stressful and less enjoyable.",
      question3_3_answer:
        "These days, many people rely on cars and public transport for convenience and speed. With modern technology, walking has become less necessary for most daily activities, leading to a more sedentary lifestyle.",
    },
    question4_1_text: "Write a short email to your friend (about 50 words).",
    question4_2_text:
      "Write an email to the president of the club (about 120-150 words).",
    question4_1_text_answer:
      "Hi Linh, <br> \r\n    I just heard that the Walking Club is planning a walk across European countries. While it might seem ambitious, I think it's a great idea! We could take it step by step and make it manageable. \r\n    <br>Let me know what you think! \r\n    <br>Best, \r\n    <br>Phuong",
    question4_2_text_answer:
      "Dear Club President, \r\n    <br> I was excited to hear about the plan to organize a walk across European countries. While some might find it unrealistic, I believe we can make it happen by starting with smaller regions or countries and gradually building up. This will allow us to gauge interest and adapt the plans as needed.  \r\n    <br> We can also involve local communities along the route, creating a cultural exchange and raising awareness about walking and healthy living. The event could be organized in stages over several years, making it more feasible.  \r\n    <br> I am happy to assist in organizing and promoting the event. I believe it will be an unforgettable experience that encourages healthy habits and fosters connections among participants.  \r\n    <br> Best regards,  \r\n    <br> Jimmy",
  },
  {
    club_name: "Writing club",
    key: 36,
    questions1: {
      question1_1: "What’s the weather like today?",
      question1_2: "How are you?",
      question1_3: "What’s your favorite hobby?",
      question1_4: "How do you get to work?",
      question1_5: "What do you like to do in the evening?",
    },
    questions1_answer: {
      question1_1_answer: "It’s sunny today.",
      question1_2_answer: "I’m doing great, thanks!",
      question1_3_answer: "I love reading books.",
      question1_4_answer: "I drive to work.",
      question1_5_answer: "I like watching TV.",
    },
    questions2_answer: {
      question2:
        "The last time I wrote something was when I completed a project report for work. It took some time, but I was satisfied with the outcome and learned new things.",
    },
    questions3: {
      question3_1: "I usually write at the coffee shop. What about you?",
      question3_2: "Do you prefer handwriting or typing?",
      question3_3:
        "There are many people who like to write, but only a few become writers. What makes a successful writer?",
    },
    questions3_answer: {
      question3_1_answer:
        "I usually write at home in a quiet space. I find it helps me concentrate better, allowing me to focus on my thoughts without distractions like noise or crowds.",
      question3_2_answer:
        "I prefer typing because it's faster and more efficient. I can also easily edit and organize my work. However, I sometimes enjoy handwriting for its personal touch and slower pace.",
      question3_3_answer:
        "A successful writer combines creativity, persistence, and a deep understanding of their audience. It’s not just about writing well, but also about being dedicated, disciplined, and constantly improving their craft.",
    },
    question4_1_text: "Write a short email to your friend (about 50 words).",
    question4_2_text:
      "Write an email to the president of the club (about 120-150 words).",
    question4_1_text_answer:
      "Hi Linh, <br> \r\n    I just heard that many people are complaining about the website being unprofessional and hard to use. I think we could suggest a more user-friendly design and improve its navigation.\r\n    <br>Let me know your thoughts! \r\n    <br>Best, \r\n    <br>Phuong",
    question4_2_text_answer:
      "Dear Club President, \r\n    <br> I was informed that many members are unhappy with the current state of the club website, citing it as unprofessional and difficult to navigate. I believe a website redesign is necessary to make it more user-friendly.  \r\n    <br> My suggestions include simplifying the layout, improving the search function, and making the design more visually appealing. Adding more interactive features, such as forums or a blog, could enhance the user experience and engagement.  \r\n    <br> I would be happy to assist in gathering feedback from members and working with a designer to bring these ideas to life. Improving the website would definitely improve members' satisfaction and participation.  \r\n    <br> Best regards,  \r\n    <br> Jimmy",
  },
  {
    club_name: "Fashion club",
    key: 37,
    questions1: {
      question1_1: "What are you wearing today?",
      question1_2: "How many people are in your family?",
      question1_3: "What did you do yesterday?",
      question1_4: "How do you go to school?",
      question1_5: "What's your hobby?",
    },
    questions1_answer: {
      question1_1_answer: "I'm wearing a blue shirt.",
      question1_2_answer: "There are four people.",
      question1_3_answer: "I studied and watched TV.",
      question1_4_answer: "I go by bus.",
      question1_5_answer: "My hobby is reading.",
    },
    questions3: {
      question3_1:
        "Some people like to buy clothes to try on themselves. Some prefer to buy online. How do you like it and why?",
      question3_2: "Hi! Why did you decide to join the club?",
      question3_3: "Why do people like fashion?",
    },
    questions3_answer: {
      question3_1_answer:
        "I prefer to buy clothes online because it’s more convenient and I can easily compare prices and styles. I also like reading reviews before making a purchase decision.",
      question3_2_answer:
        "I decided to join the fashion club because I am passionate about fashion trends and styling. I wanted to meet like-minded individuals and enhance my knowledge about the fashion industry.",
      question3_3_answer:
        "People like fashion because it allows them to express their creativity and individuality. It’s a way to stay connected to current trends, and for many, it’s also a form of art and self-confidence.",
    },
    question4_1_text: "Write a short email to your friend (about 50 words).",
    question4_2_text:
      "Write an email to the president of the club (about 120-150 words).",
    question4_1_text_answer:
      "Hi Linh, <br> \r\n    I have an idea for the upcoming event with the designer. We can have a fashion show that showcases both modern and classic styles. It should appeal to all ages, with something for both the young and the old. I think it would be great if we included interactive activities so that everyone feels involved. \r\n    <br> What do you think? \r\n    <br> Best, \r\n    <br> Phuong",
    question4_2_text_answer:
      "Dear Club President, \r\n    <br> I would like to suggest some ideas for the upcoming event with the famous designer. The event should offer a mix of contemporary and timeless fashion, with options that appeal to both younger and older attendees. Perhaps we could have a fashion showcase that includes different age groups, demonstrating how style evolves over time. Additionally, I believe we should include interactive activities such as styling workshops or discussions about the future of fashion, making the event enjoyable for everyone. \r\n    <br> I’m excited to help organize and contribute to the success of the event. Please let me know your thoughts.\r\n    <br> Best regards,  \r\n    <br> Jimmy",
  },
  {
    club_name: "English club 2",
    key: 38,
    questions1: {
      question1_1: "Where did you go last night?",
      question1_2: "What do you like doing with your friend?",
      question1_3: "Which sport do you like to play the most?",
      question1_4: "What did you do last night?",
      question1_5: "Do you like shopping?",
    },
    questions1_answer: {
      question1_1_answer: "I went to the cinema.",
      question1_2_answer: "I like watching movies.",
      question1_3_answer: "I love playing football.",
      question1_4_answer: "I watched a movie.",
      question1_5_answer: "Yes, I enjoy it.",
    },
    questions3: {
      question3_1: "Tell me about your English learning experience?",
      question3_2:
        "I can read and write, but I can't speak English. Do you have any advice for me?",
      question3_3:
        "English is a popular language in the world. What are your thoughts on this opinion?",
    },
    questions3_answer: {
      question3_1_answer:
        "My English learning experience has been quite challenging but rewarding. I started with basic grammar and vocabulary, then gradually moved on to speaking and listening practice through movies, books, and conversations.",
      question3_2_answer:
        "I suggest practicing speaking regularly, even if it's with yourself or language exchange partners. Listening to English podcasts and mimicking native speakers can help improve pronunciation and fluency in speaking.",
      question3_3_answer:
        "I agree that English is a global language. Its widespread use in business, media, and education makes it essential for communication across cultures, providing more opportunities for travel and career advancement.",
    },
    question4_1_text: "Write a short email to your friend (about 50 words).",
    question4_2_text:
      "Write an email to the president of the club (about 120-150 words).",
    question4_1_text_answer:
      "Hi Linh, <br> \r\n    I just heard about the talk that the English club is organizing. I think it’s a great idea to attract both young and old people. We could have some interactive activities and maybe a Q&A session. It’ll be fun! \r\n    <br> Let me know if you want to join! \r\n    <br> Best, \r\n    <br> Phuong",
    question4_2_text_answer:
      "Dear Club President, \r\n    <br> I am excited to hear about the upcoming talk organized by the English club. I think it’s a fantastic way to attract both young and older generations. To ensure the event is engaging for everyone, I suggest including a variety of activities, such as a discussion on current trends or an interactive segment where the audience can participate. It could also be interesting to invite a guest speaker who has experience with English language learning across ages. \r\n    <br> I believe this approach will help create a more inclusive atmosphere, attracting diverse audiences. I would be happy to assist in organizing the event or promoting it. \r\n    <br> Best regards,  \r\n    <br> Jimmy",
  },
  {
    club_name: "English club 3",
    key: 39,
    questions1: {
      question1_1: "What are you wearing today?",
      question1_2: "What language do you speak?",
      question1_3: "What is your first language?",
      question1_4: "What is your first school?",
      question1_5: "What’s the weather like today?",
    },
    questions1_answer: {
      question1_1_answer: "I’m wearing a shirt.",
      question1_2_answer: "I speak Vietnamese.",
      question1_3_answer: "My first language is Vietnamese.",
      question1_4_answer: "My first school was ABC School.",
      question1_5_answer: "It’s sunny today.",
    },
    questions3: {
      question3_1:
        "Hi! I heard that you attended a club meeting this afternoon. How do you feel about the meeting?",
      question3_2:
        "We have weekly meetings on Saturday afternoons. What topic are you expecting us to talk about?",
      question3_3:
        "We are thinking of holding some English games next week. Can you suggest some?",
    },
    questions3_answer: {
      question3_1_answer:
        "I really enjoyed the club meeting this afternoon. The discussions were engaging, and I liked how everyone shared their ideas. It was a great chance to learn something new.",
      question3_2_answer:
        "I'm hoping we will talk about improving our English communication skills. Maybe we could discuss some effective ways to practice speaking or introduce some interesting language games.",
      question3_3_answer:
        "For the English games, I suggest playing word association or a spelling bee competition. These games are fun and can help everyone improve their vocabulary and spelling skills.",
    },
    question4_1_text:
      "Write a short email to your friend (about 50 words). Write about your feelings and what you would like to do.",
    question4_2_text:
      "Write an email to the president of the club (about 120-150 words). Write about your feelings suggest possible.",
    question4_1_text_answer:
      "Hi Linh, <br> \r\n    I just heard that the Talk show has been canceled because the guests are busy. I'm really disappointed because I was looking forward to it. How about we hang out this week instead? \r\n    <br> Let me know! \r\n    <br> Best, \r\n    <br> Phuong",
    question4_2_text_answer:
      "Dear Club President, \r\n    <br> I was disappointed to hear that the Talk show has been canceled. Many of us were really looking forward to it. While I understand the situation, I believe we should find a way to keep members engaged. Perhaps we could reschedule the event with the guests or arrange another activity like a discussion session or a group chat to maintain excitement. Additionally, we could explore having other speakers or organizing smaller events in the meantime. \r\n    <br> Please consider these options to keep the club members engaged during this break. I am happy to help with any of these ideas. \r\n    <br> Best regards,  \r\n    <br> Jimmy",
  },
  {
    club_name: "Nature club 2",
    key: 40,
    questions1: {
      question1_1: "What's your favourite time of the year?",
      question1_2: "What's the weather like today?",
      question1_3: "What's your favourite sport?",
      question1_4: "What's your favourite season?",
      question1_5: "What's your favourite colour?",
    },
    questions1_answer: {
      question1_1_answer: "Tet holiday",
      question1_2_answer: "Sunny",
      question1_3_answer: "Soccer",
      question1_4_answer: "Spring",
      question1_5_answer: "Black",
    },
    questions2_answer: {
      question2:
        "I enjoy playing sports like football and basketball, hiking in the mountains, and spending time with friends outdoors, which helps me stay active and healthy.",
    },
    questions3: {
      question3_1:
        "I went for a walk in the forest last month and I got lost. Can you tell me about a time when you got lost?",
      question3_2:
        "I like visiting the mountains because they are so peaceful. What kinds of places do you like to visit and why?",
      question3_3:
        "Large group holidays in areas of natural beauty are becoming more and more popular. I'm not sure that's a good thing. Do you agree? Why or why not?",
    },
    questions3_answer: {
      question3_1_answer:
        "Last year, my friends and I visited a remote beach. After enjoying the view, we wandered off and got lost for a while. It was challenging but an adventure in itself.",
      question3_2_answer:
        "I enjoy visiting places like beaches, forests, and lakes. They provide a peaceful atmosphere where I can relax, enjoy nature, and disconnect from the stress of daily life. It's rejuvenating.",
      question3_3_answer:
        "I understand the popularity of large group holidays, but I feel they can impact the environment negatively. Smaller, sustainable trips would preserve nature and offer a more personal experience.",
    },
    question4_1_text:
      "Write an email to your friend, who is also a member of the club. Write about your ideas and how to communicate them. Write about 50 words.",
    question4_2_text:
      "Write an email to the manager of the club. Tell the manager your suggestions for promoting nature to young people and how best to communicate them. Write 120-150 words.",
    question4_1_text_answer:
      "Hi Linh, <br> \r\n    I just got an email from the Nature Club asking for ideas to get kids more involved with nature. I think organizing fun outdoor activities like hiking or sports competitions could help. Also, promoting these activities on social media can reach more kids. What do you think?  \r\n    <br>Best, <br>Phuong",
    question4_2_text_answer:
      "Dear Club Manager,  \r\n    <br>I received your email about encouraging children to explore nature more. I believe we should organize outdoor events like nature walks, camping trips, and environmental workshops to engage them. Additionally, using social media to share stories, photos, and videos of nature experiences could inspire them to step outside. We could also collaborate with schools to promote these events directly to students.  \r\n    <br>Best regards,  \r\n    <br>Denis",
  },
];
