import { motion } from 'framer-motion'; 
import Slides, { type SlideData } from './components/Slides';
import QuizSlide, { type QuizOption } from './components/QuizSlide';
import FloatingMemory from './components/FloatingMemory';
import '../public/css/App.css';

function App() {
  const sweetTalkQuizOptions: QuizOption[] = [
    { id: 'soul', content: { kind: 'text', value: 'bshamil' }, isCorrect: false },
    { id: 'heart', content: { kind: 'text', value: 'ma7shy' }, isCorrect: false },
    { id: 'life', content: { kind: 'text', value: 'hmam' }, isCorrect: false },
    { id: 'love', content: { kind: 'text', value: 'fata' }, isCorrect: true }
  ];

  const clayDateTalkQuizOptions: QuizOption[] = [
    { id: 'soul', content: { kind: 'text', value: '147085' }, isCorrect: false },
    { id: 'heart', content: { kind: 'text', value: '260605' }, isCorrect: false },
    { id: 'life', content: { kind: 'text', value: '193168' }, isCorrect: false },
    { id: 'love', content: { kind: 'text', value: '168193' }, isCorrect: true }
  ];

  const passwordQuizOptions: QuizOption[] = [
    { id: 'soul', content: { kind: 'text', value: '147085' }, isCorrect: false },
    { id: 'heart', content: { kind: 'text', value: '260605' }, isCorrect: false },
    { id: 'life', content: { kind: 'text', value: '193168' }, isCorrect: false },
    { id: 'love', content: { kind: 'text', value: '168193' }, isCorrect: true }
  ];

  const memoryGuessQuizOptions: QuizOption[] = [
    {
      id: 'concert-glow',
      content: { kind: 'image', src: '/imgs/quiz2.jpeg', alt: 'Concert lights memory' },
      isCorrect: false
    },
    {
      id: 'sunset-giggles',
      content: { kind: 'image', src: '/imgs/quiz1.jpeg', alt: 'Sunset giggles' },
      isCorrect: true
    },
    {
      id: 'coffee-date',
      content: { kind: 'image', src: '/imgs/quiz3.jpeg', alt: 'Coffee date selfie' },
      isCorrect: false
    },
    {
      id: 'grad-steps',
      content: { kind: 'image', src: '/imgs/quiz4.jpeg', alt: 'Graduation steps pose' },
      isCorrect: false
    }
  ];




  const floatingMemories = [
    { id: 'memory-one', src: '/imgs/5awl.jpeg', x: -170, y: -170, size: 135 },
    { id: 'memory-two', src: '/imgs/blackAndWhite.jpeg', x: -20, y: -130, size: 115 },
    { id: 'memory-three', src: '/imgs/closeUp1.jpeg', x: 170, y: -100, size: 120 },
    { id: 'memory-four', src: '/imgs/darkRedHijab.jpeg', x: 170, y: 60, size: 105 },
    { id: 'memory-five', src: '/imgs/lightRedHijab.jpeg', x: -180, y: 70, size: 110 },
    { id: 'memory-six', src: '/imgs/mask.jpeg', x: 80, y: 180, size: 100 },
    { id: 'memory-seven', src: '/imgs/toung.jpeg', x: -60, y: 190, size: 95 }
  ];

  const floatingHearts = Array.from({ length: 14 }, (_, index) => ({
    id: `heart-${index}`,
    left: (index * 7 + 5) % 100,
    delay: index * 0.35,
    duration: 4 + (index % 4) * 0.6,
    size: 1 + (index % 5) * 0.2
  }));

  const slides: SlideData[] = [
    {
      id: 1,
      bgColor: 'linear-gradient(135deg, #f8dbe6 0%, #ff95b3 55%, #9dc4ff 100%)',
      introTexts: ['Get ready...', 'Here we go🤩!'],
      content: (
        <div className="slide-container">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Welcome to rortyy's Birthday🥰
          </motion.h1>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            style={{ fontSize: '5rem', marginTop: '20px' }}
          >
            <img 
              src='/imgs/Young Arwa.jpeg'
              style={{ 
                width: '200px', 
                height: '300px', 
                objectFit: 'cover',
                borderRadius: '8px'
              }}
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.8 }}
            style={{ marginTop: '20px' }}
          >
            Tap right to continue and left to go back
          </motion.p>
        </div>
      )
    },
    
    {
      id: 2,
      bgColor: 'linear-gradient(135deg, #f6d6b8 0%, #ff89a5 55%, #a7c0ff 100%)',
      introTexts: ['This year was amazing...', 'So many moments!'],
      content: (<div className="slide-container">
          <motion.h2
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            Lets begin with some stats🤓
          </motion.h2>
        </div>
      )
    },
    {
      id: 3,
      bgColor: 'linear-gradient(135deg, #f2c88c 0%, #f674c3 55%, #5b82e0 100%)',
      introTexts: ['اتصورنا كتييييير مع بعض',"اتصورنا"],
      content: (
        <div
          className="slide-container"
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            padding: '2rem',
            overflow: 'hidden'
          }}
        >
          <motion.h1
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
          264 صوره 📸♥️
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ marginTop: '1rem', color: 'rgba(35,25,55,0.85)' }}
          >
          
          </motion.p>
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            {floatingMemories.map(memory => (
              <FloatingMemory key={memory.id} {...memory} />
            ))}
          </div>
        </div>
      )
    },
    {
      id: 4,
      bgColor: 'linear-gradient(135deg, #f2c596 0%, #ffa055 55%, #5ed1dd 100%)',
      introTexts: ['بس طبعا كان في صور هي الفيفوريت🤩',],
      content: (
        <div className="slide-container">
          <motion.h2
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            style={{ fontSize: '1.85rem', marginBottom: '0.5rem' }}
          >
            أحلى خمس صور
          </motion.h2>
          <motion.ul
            style={{
              listStyle: 'none',
              padding: 0,
              marginTop: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            {[
              { text: '', image: '/imgs/fav1.jpeg'},
              { text: '', image: '/imgs/fav2.jpeg'},
              { text: '', image: '/imgs/fav3.jpeg'},
              { text: '', image: '/imgs/fav4.jpeg'},
              { text: '', image: '/imgs/fav5.jpeg'}
            ].map((item, i) => (
              <motion.li
                key={item.text}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.2 }}
                style={{ 
                  fontSize: '1.15rem', 
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <span style={{ fontWeight: 'bold', minWidth: '24px' }}>{i + 1}</span>
                <img 
                  src={item.image} 
                  alt={item.text}
                  style={{ 
                    width: '80px', 
                    height: '80px', 
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }} 
                />
                <span>{item.text}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      )
    },
    {
      id: 6,
      bgColor: 'linear-gradient(135deg, #f4cdbd 0%, #ff8475 55%, #7dc2f8 100%)',
      introTexts: ['خرجنا سوا'],
      content: (
        <div className="slide-container">
          <motion.h1
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
          3 مرات يبووووووي 😱
          </motion.h1>
        
        </div>
      )
    },
    {
      id: 7,
      bgColor: 'linear-gradient(135deg, #f3c3d8 0%, #ff7f9b 55%, #9d90ff 100%)',
      introTexts: ['ٌاتخانقنا كام مرة😠'],
      content: (
        <div className="slide-container">
          <motion.h1
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
          ♾️infinity
          
          </motion.h1>
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            
          </div>
        </div>
      )
    },
    {
      id: 9,
      bgColor: 'linear-gradient(135deg, #f3c2a4 0%, #ff884f 55%, #5dbcf9 100%)',
      introTexts: ['كويز على السريع'],
      content: (
        <QuizSlide
          question="EH aktar akla bahebha?"
          options={sweetTalkQuizOptions}
          accentColor="#5cffb6"
          revealMessage="عقبال ما اكلها من ايدك"
        />
      )
    },
    {
      id: 10,
      bgColor: 'linear-gradient(135deg, #f5cab4 0%, #ffad4a 55%, #55c4bd 100%)',
      introTexts: ["اكتر صورة بحبها🤔"],
      content: (
        <QuizSlide
          question="اكتر صورة بحبه🤔"
          options={memoryGuessQuizOptions}
          accentColor="#ff8ddf"
          revealMessage="قمر في كله كده كده"
        />
      )
    },
    {
      id: 15,
      bgColor: 'linear-gradient(135deg, #eec35f 0%, #ff946f 55%, #4db0f3 100%)',
      introTexts: ['This year was amazing',"filled with sad and happy moments","Bas keda keda","what made these moments special","Was YOU🫵❤️"],
      content: (
        <div
          className="slide-container"
          style={{ position: 'relative', overflow: 'hidden', height: '100%', paddingBottom: '4rem' }}
        >
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
          كل سنه وانتي طيبه يا روح قلبي وعقبال مليون سنه وتكوني جنبي ربنا يخليكي ليا وميحرمنيش منك سنه عدت وهتعدي غيرها وهكون جنبك ومش هتغير وهفضل اقرفك علطول بحبك يا قلبي وحياتي❤️
          </motion.h2>
          <div className="heart-rain">
            {floatingHearts.map(heart => (
              <motion.span
                key={heart.id}
                className="floating-heart"
                initial={{ y: '-10%', opacity: 0, scale: 0.8 }}
                animate={{ y: '200%', opacity: [0, 1, 1, 0], scale: [0.8, 1.1, 0.9] }}
                transition={{
                  duration: heart.duration,
                  delay: heart.delay,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                style={{
                  left: `${heart.left}%`,
                  fontSize: `${heart.size}rem`
                }}
              >
                ❤️
              </motion.span>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 16,
      bgColor: 'linear-gradient(135deg, #efa6b5 0%, #ff856a 55%, #8c63f4 100%)',
      content: (
        <div className="slide-container">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          >
            Thank You!``
          </motion.h1>
          <div style={{ marginTop: '2rem' }}>
            <img
              src="/imgs/thankyou.gif"
              alt="Goodbye animation"
              style={{ width: '220px', height: '220px', objectFit: 'cover', borderRadius: '12px' }}
            />
          </div>
        </div>
      )
    }
  ];

  return (
    <Slides slides={slides} />
  );
}

export default App
