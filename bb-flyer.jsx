// ========== B&B LINDEZAS — Story flyer generator ==========
const { useState: useStateF, useRef: useRefF, useEffect: useEffectF, useCallback: useCallbackF, useMemo: useMemoF } = React;

function FlyerSparkles({count=22}){
  const sparkles = useMemoF(() => Array.from({length: count}).map(()=>({
    left: Math.random()*100, top: Math.random()*100,
    delay: Math.random()*3, size: 3 + Math.random()*5,
  })), [count]);
  return (
    <>
      {sparkles.map((s,i)=>(
        <span key={i} className="sparkle" style={{
          left:`${s.left}%`, top:`${s.top}%`,
          width:`${s.size}px`, height:`${s.size}px`,
          animationDelay:`${s.delay}s`
        }}/>
      ))}
    </>
  );
}

function FlyerConfetti({count=14}){
  const items = useMemoF(()=> Array.from({length: count}).map(()=>({
    left: Math.random()*100,
    duration: 8 + Math.random()*8,
    delay: -Math.random()*10,
    size: 10 + Math.random()*16,
    color: Math.random() > .5 ? '#ff75bb' : '#fff4cc',
  })), [count]);
  return (
    <div className="confetti">
      {items.map((it,i)=>(
        <svg key={i} className="confetti-heart" viewBox="0 0 24 24" style={{
          left:`${it.left}%`,
          width:`${it.size}px`, height:`${it.size}px`,
          animationDuration:`${it.duration}s`,
          animationDelay:`${it.delay}s`,
          color: it.color,
        }}>
          <path d="M12 21s-7-4.5-9.5-9C.7 8.6 2.6 4 7 4c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 4.4 0 6.3 4.6 4.5 8C19 16.5 12 21 12 21z" fill="currentColor"/>
        </svg>
      ))}
    </div>
  );
}

function FlyerSection(){
  const [image, setImage] = useStateF(null);
  const [name, setName] = useStateF('');
  const [dragOver, setDragOver] = useStateF(false);
  const [toast, setToast] = useStateF('');
  const fileRef = useRefF(null);
  const storyRef = useRefF(null);
  const toastTimer = useRefF(null);

  const showToast = useCallbackF((msg)=>{
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(()=> setToast(''), 2400);
  },[]);

  const handleFile = (file) => {
    if(!file) return;
    if(!file.type.startsWith('image/')){ showToast('Envie uma imagem por favor'); return; }
    const reader = new FileReader();
    reader.onload = e => { setImage(e.target.result); showToast('Foto adicionada! ✨'); };
    reader.readAsDataURL(file);
  };

  const onPick = () => fileRef.current && fileRef.current.click();
  const onDrop = (e) => {
    e.preventDefault(); setDragOver(false);
    handleFile(e.dataTransfer.files && e.dataTransfer.files[0]);
  };

  const download = async () => {
    if(!storyRef.current) return;
    try{
      showToast('Gerando seu story…');
      const dataUrl = await window.htmlToImage.toPng(storyRef.current, {
        pixelRatio: 3, cacheBust:true, backgroundColor:'#f6b8d2',
      });
      const link = document.createElement('a');
      link.download = `bb-lindezas-${(name||'eu-vou').toLowerCase().replace(/\s+/g,'-')}.png`;
      link.href = dataUrl; link.click();
      showToast('Pronto! Compartilhe no Instagram 💖');
    }catch(err){ console.error(err); showToast('Ops, tente novamente'); }
  };

  const share = async () => {
    if(!storyRef.current) return;
    try{
      const dataUrl = await window.htmlToImage.toPng(storyRef.current, {
        pixelRatio: 3, cacheBust:true, backgroundColor:'#f6b8d2',
      });
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], 'bb-lindezas.png', {type:'image/png'});
      if(navigator.canShare && navigator.canShare({files:[file]})){
        await navigator.share({files:[file], title:'B&B Lindezas — Eu Vou!', text:'Eu vou no Aulão B&B Lindezas! 💖'});
      }else{ download(); }
    }catch(err){ console.error(err); showToast('Compartilhamento indisponível, fazendo download…'); download(); }
  };

  const reset = () => { setImage(null); showToast('Foto removida'); };

  return (
    <section className="flyer-section" id="flyer" data-screen-label="06 Story">
      <div className="flyer-bg" aria-hidden="true">
        <div className="flyer-glow flyer-glow-a"/>
        <div className="flyer-glow flyer-glow-b"/>
      </div>

      <Reveal>
        <div className="section-eyebrow"><span className="line"/> mostre pro mundo <span className="line"/></div>
        <h2 className="section-title">SEU STORY <span style={{color:'#fff4cc'}}>OFICIAL</span></h2>
        <p className="section-sub">Sobe sua foto, baixa a arte personalizada e posta no Insta marcando @bb.lindezas. Bora avisar todo mundo que você vai? 💖</p>
      </Reveal>

      <Reveal delay={.1}>
        <div className="flyer-stage">
          <div className="story-wrap">
            <div className="story" ref={storyRef} style={{containerType:'inline-size'}}>
              <FlyerConfetti count={14}/>
              <FlyerSparkles count={20}/>

              <div className="logo-wrap"><div className="logo-svg"><Logo/></div></div>

              <div className="title">
                <span className="row">
                  {'B&B'.split('').map((ch,i)=>(
                    <span key={i} className="letter" style={{animationDelay:`${i*.08}s`}}>{ch}</span>
                  ))}
                </span>
                <span className="row lindezas">
                  {'LINDEZAS'.split('').map((ch,i)=>(
                    <span key={i} className="letter" style={{animationDelay:`${i*.08 + .25}s`}}>{ch}</span>
                  ))}
                </span>
              </div>

              <div className={`frame ${dragOver?'drag-over':''} ${image?'has-image':''}`}
                   onClick={()=> !image && onPick()}
                   onDragOver={(e)=>{e.preventDefault(); setDragOver(true);}}
                   onDragLeave={()=> setDragOver(false)}
                   onDrop={onDrop}>
                {image ? (
                  <>
                    <img src={image} className="frame-photo" alt="Sua foto"/>
                    <button className="replace-badge" onClick={(e)=>{e.stopPropagation(); onPick();}}>
                      <IconRefresh size={14}/> Trocar
                    </button>
                  </>
                ) : (
                  <div className="frame-prompt">
                    <IconUpload size={44}/>
                    <div className="big">SUA FOTO AQUI</div>
                    <div className="small">toque para enviar · ou arraste a imagem</div>
                  </div>
                )}
              </div>

              <div className="dumbbell"><Dumbbell/></div>
              <div className="heart"><HeartSticker/></div>
              <div className="eu-vou"><EuVouSticker/></div>

              <div className="bottom-text">
                <div className="line1">1ª EDIÇÃO</div>
                <div className="line2">AULÃO · 14 JUN</div>
              </div>

              {name && <div className="name-banner">EU SOU {name.toUpperCase()} ♥</div>}

              <div className="shimmer"/>
            </div>
          </div>

          <div className="flyer-controls">
            <h3 className="flyer-controls-title">
              <span className="num">01</span>
              Sua foto
            </h3>
            <input ref={fileRef} type="file" accept="image/*" className="file-input"
                   onChange={(e)=> handleFile(e.target.files && e.target.files[0])}/>
            <div className="btn-row">
              <button className="btn secondary" onClick={onPick}>
                <IconUpload size={16}/> {image ? 'Trocar foto' : 'Enviar foto'}
              </button>
              <button className="btn ghost-dark" onClick={reset} disabled={!image}
                      style={{opacity: image?1:.4, cursor: image?'pointer':'not-allowed'}}>
                <IconRefresh size={16}/> Limpar
              </button>
            </div>

            <h3 className="flyer-controls-title" style={{marginTop:18}}>
              <span className="num">02</span>
              Seu nome <span className="optional">(opcional)</span>
            </h3>
            <input className="name-input" type="text" placeholder="Ex: Bia"
                   value={name} onChange={(e)=> setName(e.target.value.slice(0,16))}/>

            <h3 className="flyer-controls-title" style={{marginTop:18}}>
              <span className="num">03</span>
              Baixar &amp; compartilhar
            </h3>
            <button className="btn primary big full" onClick={download}>
              <IconDownload size={18}/> Baixar para o Instagram
            </button>
            <button className="btn secondary big full" onClick={share}>
              <IconShare size={18}/> Compartilhar agora
            </button>

            <ul className="flyer-tips">
              <li><IconCheck size={14}/> Imagem 1080×1920 — perfeita pro Stories</li>
              <li><IconCheck size={14}/> Marque <b>@bb.lindezas</b> no post</li>
              <li><IconCheck size={14}/> Use a #BBLindezas2026 pra entrar no mural</li>
            </ul>
          </div>
        </div>
      </Reveal>

      <div className={`toast ${toast?'show':''}`}>{toast}</div>
    </section>
  );
}

// =====================================================
// Gallery — image-slot grid for community photos
// =====================================================
function Gallery(){
  const items = useMemoF(()=> Array.from({length:8}).map((_,i)=>({
    id:`gallery-${i}`,
    rotate: ((i%5)-2)*1.5,
    hue: (i*30)%360,
  })),[]);
  return (
    <section className="gallery" id="galeria" data-screen-label="07 Galeria">
      <Reveal>
        <div className="section-eyebrow light"><span className="line"/> mural das lindezas <span className="line"/></div>
        <h2 className="section-title light">A GALERA QUE JÁ FOI</h2>
        <p className="section-sub">Adicione suas fotos preferidas pra montar seu próprio mural — arrasta na moldura.</p>
      </Reveal>
      <div className="gallery-grid">
        {items.map((it,i)=> (
          <Reveal key={it.id} delay={i*.05}>
            <div className="gallery-slot" style={{transform:`rotate(${it.rotate}deg)`}}>
              <image-slot id={it.id} shape="rect" radius="14"
                          placeholder="arrasta uma foto"
                          style={{width:'100%',height:'100%'}}></image-slot>
              <div className="gallery-tape"/>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { FlyerSection, Gallery });
