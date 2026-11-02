// Intentional dogfood race: tests choose fast/slow response times from a reproducible seed.
const delay=Math.max(10,Math.min(2000,Number(new URLSearchParams(location.search).get('delay'))||10));
document.getElementById('load-preview').addEventListener('click',()=>setTimeout(()=>{document.getElementById('preview').textContent='Preview ready';},delay));
