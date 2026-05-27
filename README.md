# B&B Lindezas — Página do Evento

Página de evento animada com gerador de Story para Instagram.

## 🚀 Deploy

### Vercel (mais fácil)
1. Crie um repositório no GitHub e suba todos os arquivos desta pasta.
2. Em [vercel.com](https://vercel.com), clique em **Add New → Project**.
3. Importe o repositório. Não precisa configurar nada — é HTML puro.
4. Clique em **Deploy**. Pronto! 💖

### GitHub Pages
1. Suba os arquivos pro seu repositório.
2. Em **Settings → Pages**, selecione a branch `main` e a pasta raiz (`/`).
3. Acesse `https://<seu-usuario>.github.io/<seu-repo>/`.

### Local (testar antes)
Como tem arquivos `.jsx` carregados por `<script src>`, precisa de um servidor local — abrir o `index.html` direto no navegador NÃO funciona por causa de CORS.

```bash
# Python
python3 -m http.server 8000

# Node
npx serve .
```

Depois abra `http://localhost:8000`.

## 📁 Arquivos

- `index.html` — página principal com todo CSS
- `bb-stickers.jsx` — componentes SVG (logo, halteres, coração, ícones)
- `bb-sections.jsx` — Hero, Countdown, Experience, Schedule, Instrutoras, Footer
- `bb-flyer.jsx` — gerador de story + galeria
- `image-slot.js` — componente de upload de imagem (drag &amp; drop)

## ✏️ Personalizar

| O que mudar | Onde |
|---|---|
| Data do evento | `index.html` → procure `2026-06-14T09:00:00` |
| Textos do hero | `bb-sections.jsx` → função `Hero` |
| Programação | `bb-sections.jsx` → constante `SCHEDULE` |
| Instrutoras | `bb-sections.jsx` → constante `INSTRUCTORS` |
| Features (o que te espera) | `bb-sections.jsx` → constante `FEATURES` |
| Cores | `index.html` → bloco `:root` no topo do `<style>` |
