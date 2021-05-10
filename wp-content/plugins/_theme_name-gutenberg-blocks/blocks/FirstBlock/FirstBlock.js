const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;

registerBlockType('myfirst-blocks/firstblock', {
  title: __('First Block', 'myfirst-blocks'),
  description: __('Our first block', 'myfirst-blocks'),
  category: 'layout',
  edit: () => 'Editor',
  save: () => 'Saved Content',
});
