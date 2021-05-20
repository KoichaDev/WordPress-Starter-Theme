const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
const { InnerBlocks, InspectorControls } = wp.blockEditor;
const { PanelBody, RangeControl } = wp.components;
import './GridComponent.editor.scss';

const attributes = {
  columns: {
    type: 'number',
    default: 2,
  },
};

registerBlockType('themename-blocks/team-members', {
  title: __('Team Members', 'themename-blocks'),
  description: __('Block for showing Team Members', 'themename-blocks'),
  icon: {
    background: 'purple',
    foreground: '#fff',
    src: 'grid-view',
  },
  supports: {
    html: false,
    align: ['wide', 'full'],
  },
  category: 'layout',
  keywords: [
    __('team', 'themename-blocks'),
    __('member', 'themename-blocks'),
    __('person', 'themename-blocks'),
  ],
  attributes,
  edit: ({ className, attributes, setAttributes }) => {
    const { columns } = attributes;

    return (
      <div className={`${className} has-${columns}-columns`}>
        <InspectorControls>
          <PanelBody>
            <RangeControl
              label='Columns'
              value={columns}
              onChange={(columns) => setAttributes({ columns })}
              min={1}
              max={6}
            />
          </PanelBody>
        </InspectorControls>
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
          // templateLock='insert'
        />
      </div>
    );
  },
  save: ({ attributes }) => {
    const { columns } = attributes;
    return (
      <div className={`has-${columns}-columns`}>
        <InnerBlocks.Content />
      </div>
    );
  },
});
