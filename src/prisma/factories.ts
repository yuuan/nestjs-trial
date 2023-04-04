import { defineUserFactory, defineFileFactory } from './fabbrica';
export { initialize } from './fabbrica';

export const UserFactory = defineUserFactory();

export const FileFactory = defineFileFactory({
  defaultData: {
    author: UserFactory,
    content: Buffer.from('ABC'),
  },
});
