import React from 'react';
import PropTypes from 'prop-types';
import {
  Form, Row, Col, Button,
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const ArrayFieldAntd = ({
  name, label, addLabel, removable, children,
}) => (
  <Form.List name={name} label={label}>
    {(fields, { add, remove }) => (
      <div>
        {fields.map((field) => (
          <Row key={field.key}>
            <Col>
              {children(field)}
            </Col>
            {removable && (
              <Col flex="none">
                <MinusCircleOutlined
                  className="dynamic-delete-button"
                  onClick={() => {
                    remove(field.name);
                  }}
                />
              </Col>
            )}
          </Row>
        ))}
        <Form.Item>
          <Button
            type="dashed"
            onClick={() => add()}
            style={{ width: '100%' }}
          >
            <PlusOutlined />
            {addLabel}
          </Button>
        </Form.Item>
      </div>
    )}
  </Form.List>
);

ArrayFieldAntd.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  addLabel: PropTypes.string.isRequired,
  removable: PropTypes.bool,

  children: PropTypes.func.isRequired,
};

export default ArrayFieldAntd;
