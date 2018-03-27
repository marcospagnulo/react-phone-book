import React from 'react';

export default class FormField extends React.Component {

    render() {
        return (
            <div className="pb-3">
                <strong><i className={"pr-2 " + this.props.iconClass}></i>{this.props.fieldLabel}</strong>
                {
                    this.props.fieldType === "textarea" ?
                        <textarea
                            name={this.props.fieldName}
                            onChange={(evt) => this.props.onFieldChange(evt)} /> :
                        <input
                            type={this.props.fieldType ? this.props.fieldType : "text"}
                            name={this.props.fieldName}
                            className="form-control"
                            readOnly={!this.props.edit}
                            onChange={(evt) => this.props.onFieldChange(evt)}
                            value={this.props.fieldValue} />
                }
            </div>
        )
    }
}