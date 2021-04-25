import React from "react";
import { ActivityIndicator, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Block from "./Block";
import colors from "../constants/colors";

const Blocks = ({ blocks }) => {
  const { loading, error, data } = blocks;

  if (loading) {
    return <ActivityIndicator size="small" />;
  }

  if (error) {
    return <Text style={styles.text}>{error}</Text>;
  }

  if (Array.isArray(data) && data.length) {
    return data.map(item => (
      <Block
        key={item.id}
        title={`${item.attributes.index}`.padStart(3, "0")}
        description={item.attributes.data}
      />
    ));
  }

  return <Text style={styles.text}>No data found.</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: colors.text,
    fontSize: 14,
    marginTop: 4
  }
});

Blocks.propTypes = {
  blocks: PropTypes.object.isRequired
};

export default Blocks;
