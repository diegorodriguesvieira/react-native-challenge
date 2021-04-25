import React from "react";
import PropTypes from "prop-types";
import { ScrollView, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/nodes";
import * as nodeBlocksActions from "../actions/nodeBlocks";
import Node from "../components/Node";
import { Heading } from "material-bread";

export class Nodes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedNodeURL: null
    };
    this.toggleNodeExpanded = this.toggleNodeExpanded.bind(this);
  }

  componentDidMount() {
    this.props.actions.checkNodeStatuses(this.props.nodes.list);
  }

  toggleNodeExpanded(node) {
    const nodeURL = node.url === this.state.expandedNodeURL ? null : node.url;
    this.setState({
      expandedNodeURL: nodeURL
    });
    if (nodeURL) {
      this.props.nodeBlocksActions.getNodeBlocks(nodeURL);
    }
  }

  render() {
    const { nodes, blocks } = this.props;
    return (
      <ScrollView>
        <Heading style={styles.heading} type={4}>
          Nodes
        </Heading>
        {nodes.list.map(node => (
          <Node
            node={node}
            key={node.url}
            expanded={node.url === this.state.expandedNodeURL}
            toggleNodeExpanded={this.toggleNodeExpanded}
            blocks={blocks[node.url]}
          />
        ))}
      </ScrollView>
    );
  }
}

Nodes.propTypes = {
  actions: PropTypes.object.isRequired,
  nodeBlocksActions: PropTypes.object.isRequired,
  nodes: PropTypes.object.isRequired,
  blocks: PropTypes.object.isRequired
};
const styles = StyleSheet.create({
  heading: { marginLeft: 30, marginTop: 45, fontWeight: "700" }
});

function mapStateToProps({ nodes, blocks }) {
  return {
    nodes,
    blocks
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    nodeBlocksActions: bindActionCreators(nodeBlocksActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nodes);
