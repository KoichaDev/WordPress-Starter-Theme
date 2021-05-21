const { RichText } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
const { Dashicon } = wp.components;

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
  // Object for images
  id: {
    type: 'number',
  },
  alt: {
    type: 'string',
    source: 'attribute',
    selector: 'img',
    attribute: 'alt',
    default: '',
  },
  url: {
    type: 'string',
    source: 'attribute',
    selector: 'img',
    attribute: 'src',
  },
  social: {
    type: 'array',
    default: [
      { link: 'https://facebook.com', icon: 'facebook-alt' },
      { link: 'https://twitter.com', icon: 'twitter' },
    ],
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
    const { title, info, url, alt, id, social } = attributes;
    return (
      <div>
        {/* adding the class name of wp-image-${id]} will get your image responsive */}
        {url && <img src={url} alt={alt} className={id ? `wp-image-${id}` : null} />}
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
        {social.length > 0 && (
          <div className='wp-block-themename-blocks-team-members__social-icon'>
            <ul>
              {social.map((socialItem, index) => {
                return (
                  <li key={index}>
                    <a href={socialItem.link} target='_blank' rel='noopener noreferr'>
                      <Dashicon icon={socialItem.icon} />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  },
});
