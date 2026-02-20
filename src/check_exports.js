import * as mod from './dados.js';

console.log('exports:', Object.keys(mod));
console.log('gerarNovoId type:', typeof mod.gerarNovoId);
if (typeof mod.gerarNovoId === 'function') {
  console.log('gerarNovoId() =>', mod.gerarNovoId());
}
