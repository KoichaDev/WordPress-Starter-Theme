const { Component } = wp.element;
const { RichText } = wp.editor;
const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import './TeamMembers';
import EditMembers from './Components/EditTeamMembers';

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

registerBlockType('themename-blocks/team-members', {
  title: __('Nested Team members Block', 'themename-blocks'),
  description: __('Example of how nested Team Members works', 'themename-blocks'),
  category: 'layout',
  icon,
  keywords,
  attributes,
  edit: EditMembers,
  save: ({ className }) => null,
});
