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
        <InnerBlocks
          //  allowedBlocks can target which gutenberg block you want it specifically can only be used
          allowedBlocks={['themename-blocks/team-member']}
          // template allows you to put array of blocks that will appear automatically when you create something
          template={[
            // 2nd param: of the array of object allows you to add attribute automatically. In this case it's title, since the attribute already lives in TeamMembers.js file
            ['themename-blocks/team-member', { title: 'Dummy Title for team member' }],
            ['themename-blocks/team-member'],
          ]}
          // This can lock by inserting new blocks or re-rodering blocks inside your block
          // https://developer.wordpress.org/block-editor/reference-guides/block-api/block-templates/#locking
          templateLock='insert'
        />
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
