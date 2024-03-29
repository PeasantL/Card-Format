import React, { useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

export const FormTextBox = ({ textValues, handleChange, includedKeys }) => {
  const textAreaRef = useRef({});

  const adjustHeight = (key, index = null) => {
    const refKey = index !== null ? `${key}-${index}` : key;
    const textarea = textAreaRef.current[refKey];
    if (textarea) {
      textarea.style.height = "inherit"; // Reset height to recalculate
      const computed = window.getComputedStyle(textarea);
      // Calculate the height
      const height =
        textarea.scrollHeight +
        parseInt(computed.borderTopWidth) +
        parseInt(computed.borderBottomWidth);
      textarea.style.height = `${height + 2}px`;
    }
  };

  useEffect(() => {
    includedKeys.forEach((key) => {
      if (textValues[key]) {
        // Check if the key exists in textValues
        if (Array.isArray(textValues[key])) {
          textValues[key].forEach((_, index) => adjustHeight(key, index));
        } else {
          adjustHeight(key);
        }
      }
    });
  }, [textValues, includedKeys]); // Include includedKeys in dependency array

  const handleDynamicChange = (e, index = null) => {
    if (includedKeys.includes(e.target.name)) {
      // Only handle change if key is included
      handleChange(e, index);
      adjustHeight(e.target.name, index);
    }
  };

  return (
    <>
      {includedKeys.map((key) =>
        textValues[key] && Array.isArray(textValues[key]) ? (
          textValues[key].map((value, index) => (
            <Form.Group
              key={`${key}-${index}`}
              controlId={`form${key}-${index}`}
            >
              <Form.Label>{`${key} [${index}]`}</Form.Label>
              <Form.Control
                as="textarea"
                ref={(el) => (textAreaRef.current[`${key}-${index}`] = el)}
                type="text"
                name={key}
                value={value}
                onChange={(e) => handleDynamicChange(e, index)}
                style={{ height: "auto" }}
              />
            </Form.Group>
          ))
        ) : (
          <Form.Group key={key} controlId={`form${key}`}>
            <Form.Label>{key}</Form.Label>
            <Form.Control
              as="textarea"
              ref={(el) => (textAreaRef.current[key] = el)}
              type="text"
              name={key}
              value={textValues[key]}
              onChange={handleDynamicChange}
              style={{ height: "auto" }}
            />
          </Form.Group>
        ),
      )}
    </>
  );
};

FormTextBox.propTypes = {
  textValues: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  includedKeys: PropTypes.array.isRequired,
};
