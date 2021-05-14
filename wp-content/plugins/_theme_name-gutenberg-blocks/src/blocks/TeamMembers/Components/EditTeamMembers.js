const { Component } = wp.element;
const { RichText } = wp.editor;
const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;

class EditTeamMembers extends Component {
  onChangetitle = (title) => this.props.setAttributes({ title });

  onChangeInfo = (info) => this.props.setAttributes({ info });

  render() {
    const { className, attributes, setAttributes } = this.props;
    const { title, info } = attributes;
    return (
      <div className={className}>
        <RichText
          tagName='h4'
          className='.wp-block-themename-block-team-member__title'
          onChange={this.onChangetitle}
          value={this.title}
          placeholder={__('Member name', 'themename-edit')}
          formattingControls={[]} // Disable formatting stuff
        />

        <RichText
          tagName='p'
          className='.wp-block-themename-block-team-member__info'
          onChange={this.onChangeInfo}
          value={this.info}
          placeholder={__('Member info', 'themename-edit')}
          formattingControls={[]} // Disable formatting stuff
        />
      </div>
    );
  }
}

export default EditTeamMembers;
