const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
const { InnerBlocks } = wp.editor;

registerBlockType('themename-blocks/team-members', {
  title: __('Team Members', 'themename-blocks'),
  description: __('Block for showing Team Members', 'themename-blocks'),
  icon: {
    background: 'purple',
    foreground: '#fff',
    src: 'grid-view',
  },
  category: 'layout',
  keywords: [
    __('team', 'themename-blocks'),
    __('member', 'themename-blocks'),
    __('person', 'themename-blocks'),
  ],

  edit: ({ className }) => {
    return (
      <div className={className}>
        {/* allowedBlocks can target which gutenberg block you want it specifically can only be used */}
        <InnerBlocks allowedBlocks={['themename-blocks/team-member']} />
      </div>
    );
  },
  save: () => {
    return (
      <div>
        <InnerBlocks.Content />
      </div>
    );
  },
});
