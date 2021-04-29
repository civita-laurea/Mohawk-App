import { v4 as uuid } from 'uuid';

// Test course data
export default [
  {
    id: uuid(),
    createdAt: '27/03/2019',
    description: 'Taught By: Katarina Smith',
    media:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/200px-No_image_3x4.svg.png',
    title: 'Biology - BIO101',
    totalDownloads: '24',
  },
];
