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

const twitterIcon = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    enable-background='new 0 0 24 24'
    height='24px'
    viewBox='0 0 24 24'
    width='24px'
    fill='#000000'>
    <rect fill='none' height='24' width='24' />
    <path d='M22,12c0-5.52-4.48-10-10-10S2,6.48,2,12c0,4.84,3.44,8.87,8,9.8V15H8v-3h2V9.5C10,7.57,11.57,6,13.5,6H16v3h-2 c-0.55,0-1,0.45-1,1v2h3v3h-3v6.95C18.05,21.45,22,17.19,22,12z' />
  </svg>
);

const facebookSVG = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    enable-background='new 0 0 24 24'
    height='24px'
    viewBox='0 0 24 24'
    width='24px'
    fill='#000000'>
    <rect fill='none' height='24' width='24' />
    <path d='M22,12c0-5.52-4.48-10-10-10S2,6.48,2,12c0,4.84,3.44,8.87,8,9.8V15H8v-3h2V9.5C10,7.57,11.57,6,13.5,6H16v3h-2 c-0.55,0-1,0.45-1,1v2h3v3h-3v6.95C18.05,21.45,22,17.19,22,12z' />
  </svg>
);

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
    const { title, info, url, alt, id } = attributes;
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
      </div>
    );
  },
});
