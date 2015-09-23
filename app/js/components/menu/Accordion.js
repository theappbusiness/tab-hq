'use strict';

var React = require('react/addons');
var Category = require('./Category');
var ReorderMixin = require('../../mixins/ReorderMixin');
var AppActions = require('../../actions/AppActions');
var NewCategory = require('./NewCategory');
var _ = require('lodash');

var Accordion = React.createClass({
  mixins: [ReorderMixin],

  getInitialState: function() {
    return {
      visibleCategory: null,
      activeMenuSection: {}
    };
  },

  setDraggableData: function(categories) {
    AppActions.sortCategories(categories);
  },

  handleClick: function(category) {
    if (this.state.visibleCategory !== category) {
      this.setState({
        visibleCategory: category
      });
    } else {
      this.setState({
        visibleCategory: null
      });
    }
  },

  render: function () {

    var categories = [];
    var items = this.props.categories;
    var currentSection = this.props.currentSection;

    this.loadDraggableData(this.props.categories);

    items = _.sortBy(items, 'order');
    items.map(function(item) {
      categories.push(<Category key={item.id} category={item} currentSection={currentSection} dragEnd={this.dragEnd} dragStart={this.dragStart} dragHover={this.dragHover} />);
    }.bind(this));

    return (
        <div id="categories" className="Accordion" onDragOver={this.dragOver}>
          {categories}
          <NewCategory categories={categories} />
        </div>
      );
  }
});

module.exports = Accordion;
