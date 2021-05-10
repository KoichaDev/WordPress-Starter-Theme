const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;

registerBlockType('themename-blocks/firstblock', {
  title: __('First Block', 'themename-blocks'),
  description: __('Our first block', 'themename-blocks'),
  category: 'layout',
  edit: () => 'Editor',
  save: () => 'Saved Content',
});
