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
  const [canShareFiles, setCanShareFiles] = useStateF(false);
  // Ajuste de enquadramento da foto: posição (px relativos ao centro) + escala
  const [imgPos, setImgPos] = useStateF({x:0, y:0});
  const [imgScale, setImgScale] = useStateF(1);
  const fileRef = useRefF(null);
  const storyRef = useRefF(null);
  const frameRef = useRefF(null);
  const toastTimer = useRefF(null);
  // Refs para gestos (não disparam re-render durante drag/pinch)
  const dragState = useRefF({active:false, startX:0, startY:0, startPosX:0, startPosY:0});
  const pinchState = useRefF({active:false, startDist:0, startScale:1});

  useEffectF(()=>{
    try {
      const probe = new File([new Blob(['x'],{type:'image/png'})], 'p.png', {type:'image/png'});
      setCanShareFiles(!!(navigator.canShare && navigator.canShare({files:[probe]})));
    } catch(e){ setCanShareFiles(false); }
  },[]);

  const showToast = useCallbackF((msg)=>{
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(()=> setToast(''), 2400);
  },[]);

  const handleFile = (file) => {
    if(!file) return;
    if(!file.type.startsWith('image/')){ showToast('Envie uma imagem por favor'); return; }
    const reader = new FileReader();
    reader.onload = e => {
      setImage(e.target.result);
      // reseta posição/escala ao carregar nova foto
      setImgPos({x:0, y:0});
      setImgScale(1);
      showToast('Foto adicionada! Arraste pra enquadrar ✨');
    };
    reader.readAsDataURL(file);
  };

  const recenterImage = () => {
    setImgPos({x:0, y:0});
    setImgScale(1);
    showToast('Enquadramento centralizado');
  };

  // ===== Gestos de pan/zoom na foto =====
  const getTouchDist = (touches) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.hypot(dx, dy);
  };

  const onFrameMouseDown = (e) => {
    if(!image) return;
    if(e.target.closest && e.target.closest('.replace-badge, .frame-hint')) return;
    e.preventDefault();
    dragState.current = {
      active:true,
      startX: e.clientX,
      startY: e.clientY,
      startPosX: imgPos.x,
      startPosY: imgPos.y,
    };
  };

  const onFrameMouseMove = (e) => {
    if(!dragState.current.active) return;
    const dx = e.clientX - dragState.current.startX;
    const dy = e.clientY - dragState.current.startY;
    setImgPos({ x: dragState.current.startPosX + dx, y: dragState.current.startPosY + dy });
  };

  const onFrameMouseUp = () => { dragState.current.active = false; };

  const onFrameWheel = (e) => {
    if(!image) return;
    e.preventDefault();
    const delta = -e.deltaY * 0.0015;
    setImgScale(s => Math.max(0.5, Math.min(4, s + delta)));
  };

  const onFrameTouchStart = (e) => {
    if(!image) return;
    if(e.target.closest && e.target.closest('.replace-badge, .frame-hint')) return;
    if(e.touches.length === 1){
      dragState.current = {
        active:true,
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY,
        startPosX: imgPos.x,
        startPosY: imgPos.y,
      };
    } else if(e.touches.length === 2){
      dragState.current.active = false;
      pinchState.current = {
        active:true,
        startDist: getTouchDist(e.touches),
        startScale: imgScale,
      };
    }
  };

  const onFrameTouchMove = (e) => {
    if(!image) return;
    if(pinchState.current.active && e.touches.length === 2){
      e.preventDefault();
      const dist = getTouchDist(e.touches);
      const ratio = dist / Math.max(1, pinchState.current.startDist);
      setImgScale(Math.max(0.5, Math.min(4, pinchState.current.startScale * ratio)));
    } else if(dragState.current.active && e.touches.length === 1){
      e.preventDefault();
      const dx = e.touches[0].clientX - dragState.current.startX;
      const dy = e.touches[0].clientY - dragState.current.startY;
      setImgPos({ x: dragState.current.startPosX + dx, y: dragState.current.startPosY + dy });
    }
  };

  const onFrameTouchEnd = (e) => {
    if(e.touches.length === 0){
      dragState.current.active = false;
      pinchState.current.active = false;
    } else if(e.touches.length === 1){
      pinchState.current.active = false;
      // reinicia drag a partir do toque restante
      dragState.current = {
        active:true,
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY,
        startPosX: imgPos.x,
        startPosY: imgPos.y,
      };
    }
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
      showToast('Preparando seu story…');
      const dataUrl = await window.htmlToImage.toPng(storyRef.current, {
        pixelRatio: 3, cacheBust:true, backgroundColor:'#f6b8d2',
      });
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], `bb-lindezas-${(name||'eu-vou').toLowerCase().replace(/\s+/g,'-')}.png`, {type:'image/png'});
      if(navigator.canShare && navigator.canShare({files:[file]})){
        await navigator.share({
          files:[file],
          title:'B&B Lindezas — Eu Vou!',
          text:'Eu vou no 1º Aulão B&B Lindezas — 31/05! 💖 @bb.lindezas #BBLindezas2026'
        });
        showToast('Pronto! Escolhe o Instagram pra postar 💗');
      }else{
        showToast('Esse navegador não compartilha direto — baixando a foto pra você postar 💖');
        await download();
      }
    }catch(err){
      if(err && err.name === 'AbortError') return; // usuário cancelou — silencioso
      console.error(err); showToast('Ops, tente novamente');
    }
  };

  const reset = () => { setImage(null); showToast('Foto removida'); };

  return (
    <section className="flyer-section" id="flyer" data-screen-label="06 Story">
      <div className="flyer-bg" aria-hidden="true">
        <div className="flyer-glow flyer-glow-a"/>
        <div className="flyer-glow flyer-glow-b"/>
      </div>

      <Reveal>
        <div className="section-eyebrow big"><span className="line"/> ✨ mostre pro mundo ✨ <span className="line"/></div>
        <h2 className="section-title huge">SEU STORY <span style={{color:'#fff4cc'}}>OFICIAL</span></h2>
        <p className="section-sub big">Cria a SUA arte do aulão em <strong>10 segundos</strong> e posta direto no Instagram com um toque.<br/>Bora deixar todo mundo com vontade de ir também? 💖</p>
        <div className="flyer-quick-steps">
          <div className="qs"><span className="qs-num">1</span> Sua foto</div>
          <div className="qs-arrow">→</div>
          <div className="qs"><span className="qs-num">2</span> Seu nome</div>
          <div className="qs-arrow">→</div>
          <div className="qs"><span className="qs-num">3</span> Postar no Insta</div>
        </div>
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

              <div ref={frameRef}
                   className={`frame ${dragOver?'drag-over':''} ${image?'has-image':''}`}
                   onClick={()=> !image && onPick()}
                   onDragOver={(e)=>{e.preventDefault(); setDragOver(true);}}
                   onDragLeave={()=> setDragOver(false)}
                   onDrop={onDrop}
                   onMouseDown={onFrameMouseDown}
                   onMouseMove={onFrameMouseMove}
                   onMouseUp={onFrameMouseUp}
                   onMouseLeave={onFrameMouseUp}
                   onWheel={onFrameWheel}
                   onTouchStart={onFrameTouchStart}
                   onTouchMove={onFrameTouchMove}
                   onTouchEnd={onFrameTouchEnd}
                   onTouchCancel={onFrameTouchEnd}>
                {image ? (
                  <>
                    <img src={image} className="frame-photo" alt="Sua foto" draggable="false"
                         style={{transform:`translate(calc(-50% + ${imgPos.x}px), calc(-50% + ${imgPos.y}px)) scale(${imgScale})`}}/>
                    <button className="replace-badge" onClick={(e)=>{e.stopPropagation(); onPick();}}>
                      <IconRefresh size={14}/> Trocar
                    </button>
                    <div className="frame-hint">arraste · pinça / scroll p/ zoom</div>
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
                <div className="line2">AULÃO · 31 MAI</div>
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

            {image && (
              <div className="adjust-block">
                <div className="adjust-head">
                  <span className="adjust-title">Ajustar enquadramento</span>
                  <button type="button" className="adjust-reset" onClick={recenterImage}>
                    <IconRefresh size={12}/> centralizar
                  </button>
                </div>
                <div className="adjust-row">
                  <span className="adjust-label">Zoom</span>
                  <input type="range" min="0.5" max="4" step="0.01" value={imgScale}
                         className="adjust-range"
                         onChange={(e)=> setImgScale(parseFloat(e.target.value))}/>
                  <span className="adjust-value">{imgScale.toFixed(2)}×</span>
                </div>
                <div className="adjust-hint">
                  💡 Arraste a foto dentro do quadro pra mover · use pinça no celular ou scroll no PC pra ajuste fino
                </div>
              </div>
            )}

            <h3 className="flyer-controls-title" style={{marginTop:18}}>
              <span className="num">02</span>
              Seu nome <span className="optional">(opcional)</span>
            </h3>
            <input className="name-input" type="text" placeholder="Ex: Bia"
                   value={name} onChange={(e)=> setName(e.target.value.slice(0,16))}/>

            <h3 className="flyer-controls-title" style={{marginTop:22}}>
              <span className="num">03</span>
              Postar no seu Instagram
            </h3>
            <button className="btn btn-instagram big full" onClick={share}>
              <IconInstagram size={22}/> Postar agora no Instagram
            </button>
            <div className="share-hint">
              {canShareFiles
                ? '✨ Toque pra abrir o app do Instagram direto'
                : '📱 Funciona melhor no celular — abre o Instagram automaticamente'}
            </div>
            <button className="btn ghost-dark big full" onClick={download} style={{marginTop:10}}>
              <IconDownload size={16}/> Ou baixar pra postar depois
            </button>

            <ul className="flyer-tips">
              <li><IconCheck size={14}/> Imagem 1080×1920 — perfeita pro Stories</li>
              <li><IconCheck size={14}/> Marque <b>@bb.lindezas</b> no post</li>
              <li><IconCheck size={14}/> Use a <b>#BBLindezas2026</b> pra a gente reagir</li>
            </ul>
          </div>
        </div>
      </Reveal>

      <div className={`toast ${toast?'show':''}`}>{toast}</div>
    </section>
  );
}

Object.assign(window, { FlyerSection });
