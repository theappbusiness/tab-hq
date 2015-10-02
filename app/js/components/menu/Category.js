'use strict';

var React = require('react/addons');
var MenuSections = require('./MenuSections');
var classNames = require('classnames');
var CategoryActionCreators = require('../../actions/CategoryActionCreators');

var Category = React.createClass({

  getInitialState: function() {
    return {
      isVisible: false,
      isEditing: false,
      categoryName: this.props.category.title
    };
  },

  deleteCategory() {
    var categoryId = this.props.category.id;
    CategoryActionCreators.deleteCategory(categoryId);
  },

  updateCategory() {
    if (event.keyCode === 13) {
      var categoryId = this.props.category.id;
      var categoryName = this.state.categoryName;
      CategoryActionCreators.updateCategory(categoryId, {title: categoryName});
      this.setState({
        isEditing: false
      });
    }
  },

  handleClick: function() {
    if (!this.state.isVisible) {
      this.setState({
        isVisible: true
      });
    } else {
      this.setState({
        isVisible: false
      });
    }
  },

  handleEditTitle() {
    this.setState({
      isEditing: true
    }, function() {
      React.findDOMNode(this.refs.theInput).focus();
    });
  },

  handleInputChange(event) {
    this.setState({
      categoryName: event.target.value
    });
  },

  render: function () {
    var category = this.props.category;
    var isVisible = this.state.isVisible;
    var currentSection = this.props.currentSection;
    var classes = classNames(
      {'has-sections' : true },
      {'open' : isVisible}
    );
    var toggleClasses = classNames(
      {'fa fa-caret-down' : isVisible},
      {'fa fa-caret-right' : !isVisible}
    );
    var titleInputStyle = { display: this.state.isEditing ? 'block' : 'none' };
    var titleStyle = { display: !this.state.isEditing ? 'block' : 'none' };
    var actions = <div className="category-actions actions right">
      <i className={ toggleClasses }></i>
    </div>;
    var categoryName = <div>
      <span style={titleStyle}>{category.title}</span>
    </div>;
    var deleteAction;
    var isAdmin = this.props.isAdmin;

    if (isAdmin) {
      deleteAction = <div className="actions left">
        <i className="fa fa-remove" onClick={this.deleteCategory}></i>
      </div>;
      actions = <div className="category-actions actions right" draggable="true" data-parent="true" onDragStart={this.props.dragStart} onDragEnd={this.props.dragEnd} onMouseDown={this.props.mouseDown}>
        <i className={ toggleClasses }></i>
        <i className="fa fa-reorder ui-sortable-handle drag-controller"></i>
      </div>;
      categoryName = <div>
        <input style={titleInputStyle} type="text" maxLength="20" ref="theInput" name="title" value={this.state.categoryName} onChange={this.handleInputChange} onKeyDown={this.updateCategory} />
        <span style={titleStyle}>{category.title}
          <i className="fa fa-pencil" onClick={this.handleEditTitle}></i>
        </span>
      </div>
    }

    return (
        <div data-order={category.order} data-droppable="category" style={{pointerEvents: 'all'}}>
          {deleteAction}
          {actions}
          <h3 className={ classes } onClick={this.handleClick}>
            {categoryName}
          </h3>
          <MenuSections isAdmin={isAdmin} category={category} isVisible={this.state.isVisible} currentSection={currentSection} />
        </div>
      );
  }
});

module.exports = Category;
