const { Component } = wp.element;
const { RichText } = wp.blockEditor;
const { __ } = wp.i18n;

import './EditTeamMember.scss';
class EditTeamMembers extends Component {
  onChangetitle = (title) => this.props.setAttributes({ title });

  onChangeInfo = (info) => this.props.setAttributes({ info });

  render() {
    const { className, attributes } = this.props;
    const { title, info } = attributes;
    return (
      <div className={className}>
        <RichText
          tagName='h4'
          className='wp-block-themename-blocks-team-members__title'
          onChange={this.onChangetitle}
          value={title}
          placeholder={__('Member name', 'themename-edit')}
          allowedFormats={[]} // Disable formatting stuff
        />

        <RichText
          tagName='p'
          className='wp-block-themename-blocks-team-members__info'
          onChange={this.onChangeInfo}
          value={info}
          placeholder={__('Member info', 'themename-edit')}
          allowedFormats={[]} // Disable formatting stuff
        />
      </div>
    );
  }
}

export default EditTeamMembers;
