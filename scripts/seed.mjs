import {createHash} from 'node:crypto';
export function delayForRun(seed,index){if(!Number.isInteger(index)||index<1||index>100)throw Error('Invalid run index');const draw=createHash('sha256').update(`${seed}:${index}`).digest().readUInt32BE(0)/2**32;return draw<0.4?1000:10;}
