const { RichText } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;

import './TeamMembers.scss';
import '../GridComponent';
import EditMembers from './EditTeamMembers';

const icon = {
  background: '#f03',
  foreground: '#fff',
  src: 'admin-network',
};

const attributes = {
  title: {
    type: 'string',
    source: 'html',
    selector: 'h4',
  },
  info: {
    type: 'string',
    source: 'html',
    selector: 'p',
  },
};

const keywords = [
  __('members', 'themename-blocks'),
  __('person', '__themename-blocks'),
  __('team', '__themename-blocks'),
];

registerBlockType('themename-blocks/team-member', {
  title: __('Nested Team members Block', 'themename-blocks'),
  description: __('Example of how nested Team Members works', 'themename-blocks'),
  // support key-property removes extra feature from the Gutenberg Block as default
  supports: {
    reusable: false,
    html: false,
  },
  category: 'layout',
  // 'parent'-key will make sure that this block can't access the general block on WP gutenberg.
  // Instead, it serves as a "child"-component
  parent: ['themename-blocks/team-member'],
  icon,
  keywords,
  attributes,
  edit: EditMembers,
  save: ({ attributes }) => {
    const { title, info } = attributes;
    return (
      <div>
        {title && (
          <RichText.Content
            tagName='h4'
            className='wp-block-themename-blocks-team-members__title'
            value={title}
          />
        )}
        {info && (
          <RichText.Content
            tagName='p'
            className='wp-block-themename-blocks-team-members__info'
            value={info}
          />
        )}
      </div>
    );
  },
});
