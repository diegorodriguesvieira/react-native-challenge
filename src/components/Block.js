import PropTypes from "prop-types";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import colors from "../constants/colors";

const Block = ({ title, description }) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

Block.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.contentBackgroundGray,
    borderRadius: 2,
    marginTop: 4,
    padding: 8
  },
  title: {
    color: colors.blue,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.5,
    marginBottom: 6
  },
  description: {
    color: colors.text,
    fontSize: 14,
    letterSpacing: 0.25,
    lineHeight: 20
  }
});

export default Block;
