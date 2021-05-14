const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;

registerBlockType('themename-blocks/dummy-text', {
  title: __('Dummy Text Block', 'themename-blocks'),
  description: __('Our first block', 'themename-blocks'),
  category: 'layout',
  icon: {
    background: '#f03',
    foreground: '#fff',
    src: 'admin-network',
  },
  keywords: [__('photo', 'themename-blocks'), __('image', '__themename-blocks')],
  edit: () => 'Editor',
  save: () => 'Saved Content',
});
