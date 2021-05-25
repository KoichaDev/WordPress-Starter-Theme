import LatestPostsEdit from './LatestPostsEdit';
const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;

registerBlockType('themename-block/latest-posts', {
  title: __('Latest Posts', 'themename-blocks'),
  description: __('Our first block', 'themename-blocks'),
  category: 'layout',
  icon: {
    background: '#f03',
    foreground: '#fff',
    src: 'admin-post',
  },
  keywords: [__('photo', 'themename-block'), __('image', 'themename-hello-world')],
  edit: LatestPostsEdit,
  save: () => {
    // This is important, since we returning dynamic block and not static HTML
    // Posts will be displayed in the front-end will be generated using some server-side PHP code
    return null;
  },
});
