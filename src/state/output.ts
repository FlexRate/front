import { atom } from 'recoil';

export const output = atom({
  key: 'output',
  default: {
    Score: '',
    maxRate: '',
    minRate: '',
  },
});
