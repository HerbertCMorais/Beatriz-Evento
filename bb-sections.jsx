// ========== B&B LINDEZAS — Page sections ==========
const { useState, useRef, useEffect, useCallback, useMemo } = React;

// =====================================================
// Animated background — gradient + floating particles
// =====================================================
function HeroBackground(){
  const particles = useMemo(()=>{
    return Array.from({length: 40}).map((_,i)=>({
      left: Math.random()*100,
      delay: -Math.random()*20,
      duration: 14 + Math.random()*16,
      size: 8 + Math.random()*22,
      kind: Math.random() < .5 ? 'heart' : (Math.random()<.5 ? 'spark' : 'dot'),
      color: ['#fff4cc','#ff75bb','#fff','#ffb1d4'][Math.floor(Math.random()*4)],
      drift: (Math.random()-.5)*60,
    }));
  },[]);
  return (
    <div className="hero-bg" aria-hidden="true">
      <div className="hero-blob blob-a"/>
      <div className="hero-blob blob-b"/>
      <div className="hero-blob blob-c"/>
      <div className="hero-particles">
        {particles.map((p,i)=> (
          <span key={i}
                className={`particle p-${p.kind}`}
                style={{
                  left:`${p.left}%`,
                  width:`${p.size}px`, height:`${p.size}px`,
                  animationDelay:`${p.delay}s`,
                  animationDuration:`${p.duration}s`,
                  color:p.color,
                  '--drift':`${p.drift}px`,
                }}>
            {p.kind === 'heart' && (
              <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 21s-7-4.5-9.5-9C.7 8.6 2.6 4 7 4c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 4.4 0 6.3 4.6 4.5 8C19 16.5 12 21 12 21z"/></svg>
            )}
            {p.kind === 'spark' && (
              <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 0 L14 9 L24 12 L14 15 L12 24 L10 15 L0 12 L10 9 Z"/></svg>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

// =====================================================
// Hero
// =====================================================
function Hero({onCTA, eventDate}){
  const [scrolled, setScrolled] = useState(0);
  useEffect(()=>{
    const h = ()=> setScrolled(Math.min(window.scrollY, 600));
    window.addEventListener('scroll', h, {passive:true});
    return ()=> window.removeEventListener('scroll', h);
  },[]);

  return (
    <section className="hero" data-screen-label="01 Hero">
      <HeroBackground/>

      <div className="hero-floats" style={{transform:`translateY(${scrolled*0.15}px)`}}>
        <div className="float float-db1"><Dumbbell/></div>
        <div className="float float-db2"><Dumbbell hue={20}/></div>
        <div className="float float-heart1"><HeartSticker/></div>
      </div>

      <nav className="topnav">
        <div className="brand">
          <div className="brand-logo"><Logo/></div>
          <div className="brand-text">
            <div className="brand-title">B&amp;B LINDEZAS</div>
            <div className="brand-sub">1ª edição · aulão</div>
          </div>
        </div>
        <div className="nav-cta">
          <a href="#programacao">Programação</a>
          <a href="#instrutoras">Instrutoras</a>
          <a href="#flyer">Meu story</a>
          <button className="btn primary small" onClick={onCTA}>Eu vou!</button>
        </div>
      </nav>

      <div className="hero-inner">
        <div className="hero-badge">
          <SparkleSVG style={{width:14, height:14, color:'#fff4cc'}}/>
          <span>DOMINGO · 31 DE MAIO · 10H</span>
          <SparkleSVG style={{width:14, height:14, color:'#fff4cc'}}/>
        </div>

        <h1 className="hero-title">
          <AnimatedTitle text="B&B"/>
          <span className="row lindezas"><AnimatedTitle text="LINDEZAS" delay={.25}/></span>
        </h1>

        <p className="hero-tag">
          O aulão mais rosa, suado e cheio de amor do ano.<br/>
          Treino, comunidade, brindes e muita lindeza.
        </p>

        <div className="hero-ctas">
          <button className="btn primary huge" onClick={onCTA}>
            <IconHeart size={24}/> Garantir minha vaga
          </button>
          <a href="#flyer" className="btn ghost huge">
            <IconCamera size={24}/> Quero meu story
          </a>
        </div>

        <div className="hero-stats">
          <div className="stat"><div className="stat-n">2</div><div className="stat-l">professoras</div></div>
          <div className="stat-sep"/>
          <div className="stat"><div className="stat-n">4h</div><div className="stat-l">de aulão</div></div>
          <div className="stat-sep"/>
          <div className="stat"><div className="stat-n">+</div><div className="stat-l">brindes</div></div>
        </div>
      </div>

      <div className="hero-marquee" aria-hidden="true">
        <div className="marquee-track">
          {Array.from({length:2}).map((_,i)=>(
            <div className="marquee-row" key={i}>
              <span>EU VOU!</span><span className="dot">♥</span>
              <span>B&amp;B LINDEZAS</span><span className="dot">♥</span>
              <span>1ª EDIÇÃO</span><span className="dot">♥</span>
              <span>AULÃO</span><span className="dot">♥</span>
              <span>31 DE MAIO</span><span className="dot">♥</span>
              <span>SUA VAGA TÁ AQUI</span><span className="dot">♥</span>
            </div>
          ))}
        </div>
      </div>

      <button className="scroll-cue" onClick={()=> document.getElementById('countdown')?.scrollIntoView({behavior:'smooth'})}>
        <span>role para descobrir</span>
        <IconChevron size={20}/>
      </button>
    </section>
  );
}

function AnimatedTitle({text, delay=0}){
  return (
    <span className="row">
      {text.split('').map((ch,i)=> (
        <span key={i} className="letter" style={{animationDelay: `${(i*0.08 + delay).toFixed(2)}s`}}>
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </span>
  );
}

// =====================================================
// Countdown
// =====================================================
function Countdown({target}){
  const [now, setNow] = useState(Date.now());
  useEffect(()=>{
    const t = setInterval(()=> setNow(Date.now()), 1000);
    return ()=> clearInterval(t);
  },[]);
  const diff = Math.max(0, target - now);
  const d = Math.floor(diff/86400000);
  const h = Math.floor(diff/3600000)%24;
  const m = Math.floor(diff/60000)%60;
  const s = Math.floor(diff/1000)%60;
  const items = [['DIAS', d],['HORAS', h],['MIN', m],['SEG', s]];
  return (
    <section className="countdown" id="countdown" data-screen-label="02 Contagem">
      <Reveal>
        <div className="section-eyebrow"><span className="line"/> a contagem regressiva começou <span className="line"/></div>
        <h2 className="section-title">FALTAM POUCAS LINDEZAS</h2>
      </Reveal>
      <Reveal delay={.1}>
        <div className="countdown-grid">
          {items.map(([label, val],i)=> (
            <div key={label} className="cd-card" style={{animationDelay:`${i*.08}s`}}>
              <div className="cd-num">
                <span key={val} className="cd-flip">{String(val).padStart(2,'0')}</span>
              </div>
              <div className="cd-label">{label}</div>
              <div className="cd-glow"/>
            </div>
          ))}
        </div>
      </Reveal>
      <Reveal delay={.2}>
        <div className="cd-info">
          <div className="cd-info-item"><IconCalendar size={18}/> <span>Domingo, 31 de maio</span></div>
          <div className="cd-info-item"><IconClock size={18}/> <span>10h00 — 14h00</span></div>
          <div className="cd-info-item"><IconPin size={18}/> <span>Rua Branquilho, 166 · Salão de Festa</span></div>
        </div>
      </Reveal>
    </section>
  );
}

// =====================================================
// O que te espera
// =====================================================
const FEATURES = [
  { icon: IconBolt, title: 'AULÃO INTENSO', text: 'Três blocos de treino guiados pelas suas treinadoras favoritas. Energia lá em cima do início ao fim.'},
  { icon: IconUsers, title: 'COMUNIDADE', text: 'O encontro das lindezas. Conhece gente nova, faz amiga e troca aquele abraço apertado.'},
  { icon: IconGift, title: 'BRINDES & SURPRESAS', text: 'Kit oficial do evento, sorteios ao vivo e parceiros queridos com mimos pra todo mundo.'},
  { icon: IconMusic, title: 'DJ SET AO VIVO', text: 'Trilha sonora caprichada pra cada bloco. Pra ninguém parar de mexer.'},
  { icon: IconCamera, title: 'STORY OFICIAL', text: 'Seu story personalizado pronto pra postar no Insta com a sua foto na arte oficial.'},
  { icon: IconHeart, title: 'CAFÉ DAS LINDEZAS', text: 'Pós-aulão com café da manhã saudável, frutinhas e papo gostoso entre amigas.'},
];

function OQueTeEspera(){
  return (
    <section className="experience" data-screen-label="03 Experiencia">
      <div className="exp-bg" aria-hidden="true">
        <div className="exp-glow exp-glow-1"/>
        <div className="exp-glow exp-glow-2"/>
      </div>
      <Reveal>
        <div className="section-eyebrow light"><span className="line"/> o que rola no dia <span className="line"/></div>
        <h2 className="section-title light">O QUE TE ESPERA</h2>
        <p className="section-sub">Uma manhã completa pra você se mexer, rir, fazer amigas e voltar pra casa cheia de energia.</p>
      </Reveal>
      <div className="feature-grid">
        {FEATURES.map((f,i)=>(
          <Reveal key={f.title} delay={i*.06}>
            <article className="feature-card">
              <div className="feature-icon"><f.icon size={28} sw={2.4}/></div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-text">{f.text}</p>
              <div className="feature-corner">
                <SparkleSVG style={{width:18,height:18,color:'#ff4fa6'}}/>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// =====================================================
// Programação (timeline)
// =====================================================
const SCHEDULE = [
  {time:'10h00', title:'RECEPÇÃO & COFFEE BREAK', text:'Chegou? Vem tomar um café com a gente e dar oi pras lindezas.', icon: IconTicket},
  {time:'10h30', title:'ALONGAMENTO + FUNCIONAL', text:'Aulão de funcional com a Desiree pra ativar o corpo todo.', icon: IconBolt},
  {time:'11h30', title:'PAUSA COM FRUTAS', text:'Repõe a energia com frutinhas frescas 🍎🍌 antes do próximo bloco.', icon: IconHeart},
  {time:'12h00', title:'FIT DANCE', text:'Pista liberada com a Karen Loys. Vai todo mundo entrar no story.', icon: IconMusic},
  {time:'13h00', title:'SORTEIOS & BRINDES', text:'Hora de levar mimo pra casa. Sorteios ao vivo 🎁', icon: IconGift},
  {time:'13h30', title:'FOTOS & ENCERRAMENTO', text:'Fotos oficiais da turma 📸 e até a próxima edição ✨', icon: IconStar},
];

function Programacao(){
  return (
    <section className="schedule" id="programacao" data-screen-label="04 Programacao">
      <Reveal>
        <div className="section-eyebrow"><span className="line"/> minuto a minuto <span className="line"/></div>
        <h2 className="section-title">PROGRAMAÇÃO</h2>
      </Reveal>
      <ol className="timeline">
        {SCHEDULE.map((s,i)=>(
          <Reveal key={s.time} delay={i*.05}>
            <li className="timeline-item">
              <div className="timeline-dot">
                <s.icon size={20} sw={2.4}/>
              </div>
              <div className="timeline-body">
                <div className="timeline-time">{s.time}</div>
                <div className="timeline-title">{s.title}</div>
                <div className="timeline-text">{s.text}</div>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

// =====================================================
// Instrutoras
// =====================================================
const INSTRUCTORS = [
  {name:'DESIREE SOUZA'},
  {name:'KAREN LOYS'},
];

function Instrutoras(){
  return (
    <section className="instructors" id="instrutoras" data-screen-label="05 Instrutoras">
      <Reveal>
        <div className="section-eyebrow"><span className="line"/> as donas do palco <span className="line"/></div>
        <h2 className="section-title">SUAS INSTRUTORAS</h2>
      </Reveal>
      <div className="instr-grid names-only">
        {INSTRUCTORS.map((it,i)=>(
          <Reveal key={it.name} delay={i*.1}>
            <article className="instr-card name-only">
              <h3 className="instr-name">{it.name}</h3>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// =====================================================
// Reveal on scroll
// =====================================================
function Reveal({children, delay=0}){
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(()=>{
    if(!ref.current) return;
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){ setVis(true); io.disconnect(); }
      });
    }, {threshold: .15, rootMargin: '0px 0px -50px 0px'});
    io.observe(ref.current);
    return ()=> io.disconnect();
  },[]);
  return (
    <div ref={ref} className={`reveal ${vis?'in':''}`} style={{transitionDelay: `${delay}s`}}>
      {children}
    </div>
  );
}

// =====================================================
// Footer
// =====================================================
function Footer(){
  return (
    <footer className="site-footer" data-screen-label="08 Footer">
      <div className="foot-marquee" aria-hidden="true">
        <div className="marquee-track">
          {Array.from({length:2}).map((_,i)=>(
            <div className="marquee-row big" key={i}>
              <span>EU VOU!</span><span className="dot">♥</span>
              <span>14 · JUN</span><span className="dot">♥</span>
              <span>B&amp;B LINDEZAS</span><span className="dot">♥</span>
              <span>SUA VAGA TÁ AQUI</span><span className="dot">♥</span>
            </div>
          ))}
        </div>
      </div>

      <div className="foot-inner">
        <div className="foot-left">
          <div className="brand">
            <div className="brand-logo" style={{width:64}}><Logo mono/></div>
            <div className="brand-text">
              <div className="brand-title light">B&amp;B LINDEZAS</div>
              <div className="brand-sub light">1ª edição · aulão</div>
            </div>
          </div>
          <p className="foot-tag">Treino, comunidade e muito amor.<br/>Te esperamos no dia 31 de maio. 💖</p>
        </div>
        <div className="foot-right">
          <button className="btn primary big" onClick={()=> document.getElementById('flyer')?.scrollIntoView({behavior:'smooth'})}>
            <IconCamera size={20}/> Quero meu story
          </button>
          <div className="foot-socials">
            <a className="soc" href="#" aria-label="Instagram"><IconInstagram size={20}/></a>
            <a className="soc" href="#" aria-label="WhatsApp"><IconWhatsapp size={20}/></a>
          </div>
        </div>
      </div>
      <div className="foot-bottom">
        <span>© 2026 B&amp;B LINDEZAS</span>
        <span>feito com ♥ em São Paulo</span>
      </div>
    </footer>
  );
}

Object.assign(window, {
  Hero, Countdown, OQueTeEspera, Programacao, Instrutoras, Footer, Reveal, AnimatedTitle,
});
